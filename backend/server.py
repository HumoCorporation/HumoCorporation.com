from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
from emergentintegrations.llm.chat import LlmChat, UserMessage
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
security = HTTPBearer()
JWT_SECRET = os.environ.get('JWT_SECRET', 'humo-corp-secret-2025-omega-alpha')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION = 7  # days

# Create the main app
app = FastAPI(title="Humo Corporation API")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============= MODELS =============

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    language: str = "en"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: EmailStr
    language: str = "en"
    role: str = "user"  # user, admin, developer
    registration_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_login: Optional[datetime] = None

class ActivityLog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    action: str
    ip_address: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    details: Optional[Dict[str, Any]] = None

class AIQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    session_id: str
    query: str
    response: str
    mode: str = "user"  # user, developer
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AIQueryRequest(BaseModel):
    query: str
    session_id: str
    mode: str = "user"
    developer_password: Optional[str] = None

class TerminalCommandRequest(BaseModel):
    command: str
    password: Optional[str] = None

class SecretCodeRequest(BaseModel):
    code: str

# ============= UTILITIES =============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(user_id: str, email: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRATION)
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": expiration
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> Dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    token = credentials.credentials
    payload = decode_token(token)
    user = await db.users.find_one({"id": payload["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

async def log_activity(user_id: str, action: str, details: Optional[Dict] = None, ip: Optional[str] = None):
    log = ActivityLog(
        user_id=user_id,
        action=action,
        ip_address=ip,
        details=details
    )
    doc = log.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.activity_logs.insert_one(doc)

# ============= AUTH ROUTES =============

@api_router.post("/auth/register")
async def register(user_data: UserRegister):
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = User(
        username=user_data.username,
        email=user_data.email,
        language=user_data.language
    )
    
    # Hash password and store separately
    hashed_pw = hash_password(user_data.password)
    
    user_doc = user.model_dump()
    user_doc['registration_date'] = user_doc['registration_date'].isoformat()
    user_doc['password_hash'] = hashed_pw
    
    await db.users.insert_one(user_doc)
    
    # Log activity
    await log_activity(user.id, "user_registered")
    
    # Create token
    token = create_access_token(user.id, user.email)
    
    return {
        "message": "Registration successful",
        "token": token,
        "user": user.model_dump()
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(credentials.password, user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Update last login
    await db.users.update_one(
        {"id": user['id']},
        {"$set": {"last_login": datetime.now(timezone.utc).isoformat()}}
    )
    
    # Log activity
    await log_activity(user['id'], "user_login")
    
    # Create token
    token = create_access_token(user['id'], user['email'])
    
    # Remove password hash from response
    user.pop('password_hash', None)
    user.pop('_id', None)
    
    return {
        "message": "Login successful",
        "token": token,
        "user": user
    }

@api_router.get("/auth/me")
async def get_me(current_user: Dict = Depends(get_current_user)):
    current_user.pop('password_hash', None)
    return current_user

# ============= AI TERMINAL ROUTES =============

@api_router.post("/ai/query")
async def ai_query(request: AIQueryRequest, current_user: Dict = Depends(get_current_user)):
    # Check if developer mode
    is_developer_mode = False
    if request.mode == "developer":
        if request.developer_password != os.environ.get('DEVELOPER_PASSWORD'):
            raise HTTPException(status_code=403, detail="Invalid developer password")
        is_developer_mode = True
    
    # Prepare system message based on mode
    if is_developer_mode:
        system_message = """You are Red Queen AI in Developer Mode. You have full access to system information.
        You can analyze databases, display user data, and access internal project information.
        Provide detailed technical responses. You are helpful, precise, and security-conscious.
        When asked about users, stats, or system info, provide detailed simulated data."""
    else:
        system_message = """You are Red Queen AI, the AI assistant for Humo Corporation.
        You help users learn about the company's innovative technologies:
        - Q1 Rescue Drone: Advanced autonomous drone with AI for emergency rescue operations
        - Smart Solar Station S1: Intelligent solar power system with AI named Helios
        Company mission: Developing breakthrough technologies for rescue operations and sustainable energy.
        Be helpful, professional, and enthusiastic about the technology."""
    
    try:
        # Initialize AI chat
        chat = LlmChat(
            api_key=os.environ['EMERGENT_LLM_KEY'],
            session_id=request.session_id,
            system_message=system_message
        ).with_model("openai", "gpt-4o-mini")
        
        # Create user message
        user_message = UserMessage(text=request.query)
        
        # Get response
        response = await chat.send_message(user_message)
        
        # Log the query
        ai_query_log = AIQuery(
            user_id=current_user['id'],
            session_id=request.session_id,
            query=request.query,
            response=response,
            mode=request.mode
        )
        doc = ai_query_log.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.ai_queries.insert_one(doc)
        
        return {
            "response": response,
            "mode": request.mode
        }
    except Exception as e:
        logger.error(f"AI query error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

# ============= DEVELOPER TERMINAL ROUTES =============

@api_router.post("/terminal/execute")
async def execute_terminal_command(request: TerminalCommandRequest, current_user: Dict = Depends(get_current_user)):
    # Verify developer password
    if request.password != os.environ.get('DEVELOPER_PASSWORD'):
        await log_activity(current_user['id'], "terminal_access_denied", {"command": request.command})
        return {"output": "ERROR: Access denied. Invalid credentials.", "error": True}
    
    # Log command
    await log_activity(current_user['id'], "terminal_command", {"command": request.command})
    
    command = request.command.strip().lower()
    
    # Simulate terminal commands
    if command == "help":
        output = """Available commands:
        help - Show this help message
        status - System status
        logs - View recent activity logs
        stats - User statistics
        users - List registered users
        clear - Clear terminal
        exit - Exit terminal"""
    elif command == "status":
        user_count = await db.users.count_documents({})
        log_count = await db.activity_logs.count_documents({})
        output = f"""System Status:
        Status: OPERATIONAL
        Users: {user_count}
        Activity Logs: {log_count}
        Database: CONNECTED
        AI Service: ACTIVE
        Last check: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}"""
    elif command == "logs":
        logs = await db.activity_logs.find().sort("timestamp", -1).limit(10).to_list(10)
        output = "Recent Activity Logs:\n"
        for log in logs:
            output += f"[{log.get('timestamp', 'N/A')}] User: {log.get('user_id', 'N/A')[:8]}... - {log.get('action', 'N/A')}\n"
    elif command == "stats":
        total_users = await db.users.count_documents({})
        total_queries = await db.ai_queries.count_documents({})
        total_logs = await db.activity_logs.count_documents({})
        output = f"""Statistics:
        Total Users: {total_users}
        AI Queries: {total_queries}
        Activity Logs: {total_logs}
        System Uptime: 99.9%"""
    elif command == "users":
        users = await db.users.find({}, {"username": 1, "email": 1, "role": 1, "registration_date": 1}).limit(20).to_list(20)
        output = "Registered Users:\n"
        for user in users:
            output += f"- {user.get('username', 'N/A')} ({user.get('email', 'N/A')}) - Role: {user.get('role', 'user')}\n"
    elif command in ["clear", "exit"]:
        output = ""
    else:
        output = f"Command '{request.command}' not recognized. Type 'help' for available commands."
    
    return {"output": output, "error": False}

# ============= SECRET DOCUMENT ROUTES =============

@api_router.post("/secret/verify")
async def verify_secret_code(request: SecretCodeRequest):
    if request.code == os.environ.get('SECRET_DOCUMENT_CODE'):
        return {"access": True, "message": "Access granted"}
    else:
        return {"access": False, "message": "Access denied"}

# ============= ADMIN ROUTES =============

@api_router.get("/admin/users")
async def get_all_users(current_user: Dict = Depends(get_current_user)):
    # Only admins can access
    if current_user.get('role') != 'admin':
        raise HTTPException(status_code=403, detail="Admin access required")
    
    users = await db.users.find({}, {"_id": 0, "password_hash": 0}).to_list(1000)
    return users

@api_router.get("/admin/logs")
async def get_activity_logs(current_user: Dict = Depends(get_current_user)):
    if current_user.get('role') != 'admin':
        raise HTTPException(status_code=403, detail="Admin access required")
    
    logs = await db.activity_logs.find({}, {"_id": 0}).sort("timestamp", -1).limit(100).to_list(100)
    return logs

# ============= GENERAL ROUTES =============

@api_router.get("/")
async def root():
    return {
        "message": "Humo Corporation API",
        "version": "1.0.0",
        "status": "operational"
    }

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)