# Humo Corporation Website - Complete Implementation Guide

## 🚀 Overview

A fully-functional, modern, and beautiful corporate website for Humo Corporation showcasing innovative technologies in rescue systems and autonomous energy. Built with React, FastAPI, MongoDB, and AI integration.

## ✨ Features Implemented

### 1. **Authentication System** ✅
- **Registration & Login** with JWT authentication
- **Multi-language Support**: English, Russian, Chinese, Japanese
- **Beautiful UI** with animated video background
- **Password hashing** with bcrypt for security
- **Persistent sessions** with localStorage

### 2. **Main Application** ✅
- **Responsive Navigation Bar** with language switcher, theme toggle, and user menu
- **Hero Section** with gradient animations and smooth scrolling
- **Dark/Light Theme** toggle with persistent preferences
- **Smooth scrolling** between sections

### 3. **Product Sections** ✅

#### Q1 Rescue Drone Section
- 3D model viewer (React Three Fiber integration)
- Feature cards with icons
- Technical specifications display
- Video gallery links to Google Drive

#### Solar Station S1 Section
- Feature showcase with animated cards
- Technical specifications
- Video gallery links
- Unique color scheme (yellow/orange theme)

### 4. **Additional Sections** ✅
- **Timeline**: Company history with animated roadmap
- **Team**: Showcasing leadership with modern card design
- **Contacts**: Interactive contact information with icons
- **Footer**: Copyright and branding

### 5. **AI Terminal (Red Queen)** ✅
- **Floating button** for easy access
- **Two Modes**:
  - **User Mode**: Answers questions about company products and technologies
  - **Developer Mode**: Full system access with password protection
- **Real-time chat** with GPT-4o-mini integration
- **Session management** for conversation continuity
- **Beautiful chat UI** with message bubbles and animations

### 6. **Developer Terminal** ✅
- **System access** with password authentication
- **Available Commands**:
  - `help` - Show available commands
  - `status` - System status and metrics
  - `logs` - View recent activity logs
  - `stats` - User and system statistics
  - `users` - List registered users
  - `clear` - Clear terminal
  - `exit` - Exit terminal
- **Command history** with arrow key navigation
- **Terminal-style UI** with monospace font and colors

### 7. **Secret Document Section** ✅
- **Access code protection** (Code: `Ω-ALPHA`)
- **Classified information** reveal with animation
- **Project details** including:
  - Project Omega overview
  - Q1 Rescue Drone (Project Alpha) details
  - Solar Station S1 (Project Helios) details
  - Classification metadata

### 8. **Database & Backend** ✅
- **MongoDB Collections**:
  - `users` - User accounts with authentication
  - `activity_logs` - System activity tracking
  - `ai_queries` - AI conversation history
- **RESTful API** with FastAPI
- **Comprehensive logging** for all activities
- **Error handling** and validation

### 9. **Security Features** ✅
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API endpoints
- Role-based access control (user, admin, developer)
- XSS protection
- CORS configuration

### 10. **UI/UX Features** ✅
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Glass Morphism**: Modern UI effects
- **Gradient Backgrounds**: Beautiful color schemes
- **Loading States**: Spinners and skeleton screens
- **Error Messages**: User-friendly error handling
- **Accessibility**: Semantic HTML and test IDs

---

## 🔑 Access Credentials & Codes

### Developer Terminal Password
```
Ω-ALPHA-DEV-2025
```

### Secret Document Access Code
```
Ω-ALPHA
```

### Test User Account
- **Email**: test@humocorp.com
- **Password**: Test@12345

---

## 🎨 Design Highlights

### Color Schemes by Section
- **Hero**: Cyan to Blue gradient
- **Drone Section**: Cyan/Blue theme
- **Solar Section**: Yellow/Orange theme
- **Timeline**: Purple/Pink gradient
- **Team**: Green/Emerald theme
- **Secret**: Red/Purple theme

### Typography
- **Headings**: Bold with gradient text effects
- **Body**: Clean, readable fonts
- **Terminal**: Monospace for developer terminal

### Animations
- Fade-in effects on scroll
- Hover scale transformations
- Gradient animations
- Pulse effects on important elements
- Smooth scrolling between sections

---

## 📁 Project Structure

```
/app
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
└── frontend/
    ├── public/
    │   ├── assets/
    │   │   ├── models/        # 3D drone model (drone_model.glb)
    │   │   ├── videos/        # Video assets
    │   │   └── images/        # Image assets
    │   └── index.html         # HTML template
    │
    └── src/
        ├── components/        # React components
        │   ├── Auth.js                 # Login/Register
        │   ├── Navigation.js           # Top navigation bar
        │   ├── Hero.js                 # Hero section
        │   ├── DroneSection.js         # Q1 Drone showcase
        │   ├── DroneModel3D.js         # 3D model viewer
        │   ├── SolarSection.js         # Solar Station S1
        │   ├── Timeline.js             # Company timeline
        │   ├── Team.js                 # Team section
        │   ├── Contacts.js             # Contact information
        │   ├── AITerminal.js           # Red Queen AI terminal
        │   ├── DeveloperTerminal.js    # Developer terminal
        │   └── SecretDocument.js       # Classified document
        │
        ├── context/
        │   └── AppContext.js           # Global state management
        │
        ├── utils/
        │   ├── translations.js         # Multi-language support
        │   └── api.js                  # API client
        │
        ├── App.js            # Main application component
        ├── App.css           # Custom styles
        └── index.js          # Entry point
```

---

## 🔧 Technical Stack

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D graphics
- **@react-three/drei** - 3D helpers
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Python web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Emergent Integrations** - AI integration library

### Database
- **MongoDB** - NoSQL database

### AI Integration
- **OpenAI GPT-4o-mini** via Emergent LLM key
- **Emergentintegrations** library for unified LLM access

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### AI Terminal
- `POST /api/ai/query` - Send query to Red Queen AI

### Developer Terminal
- `POST /api/terminal/execute` - Execute terminal command

### Secret Document
- `POST /api/secret/verify` - Verify access code

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/logs` - Get activity logs

---

## 🚀 How to Use

### 1. Registration
1. Open the application
2. Select your preferred language (EN/RU/CN/JP)
3. Click "Register" tab
4. Fill in username, email, and password
5. Click "Create Account"

### 2. Exploring Sections
- Use the navigation bar to jump to different sections
- Click "Explore More" button to scroll to next section
- All sections support smooth scrolling

### 3. AI Terminal (Red Queen)
1. Click the cyan/blue robot icon (bottom right)
2. Type your question about Humo Corporation technologies
3. For developer mode:
   - Click "Switch to Developer Mode"
   - Enter password: `Ω-ALPHA-DEV-2025`
   - Ask system-level questions

### 4. Developer Terminal
1. Click the purple terminal icon (bottom right)
2. Enter password: `Ω-ALPHA-DEV-2025`
3. Type commands like `status`, `logs`, `users`, etc.

### 5. Secret Document
1. Navigate to "Secret File" section
2. Enter access code: `Ω-ALPHA`
3. View classified project information

### 6. Theme Toggle
- Click the sun/moon icon in navigation to switch themes
- Preference is saved locally

### 7. Language Change
- Click language buttons (EN/RU/CN/JP) in navigation
- All content updates instantly
- Preference is saved locally

---

## 🎯 Key Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | Secure login/register with JWT |
| Multi-language | ✅ | EN, RU, CN, JP support |
| Theme Toggle | ✅ | Dark/Light mode |
| 3D Model | ✅ | Interactive drone model |
| AI Chat | ✅ | GPT-4o-mini integration |
| Developer Terminal | ✅ | System command execution |
| Secret Document | ✅ | Password-protected content |
| Responsive Design | ✅ | Mobile, tablet, desktop |
| Database | ✅ | MongoDB with activity logs |
| Security | ✅ | Password hashing, JWT, CORS |

---

## 🔐 Security Notes

1. **Passwords**: All passwords are hashed with bcrypt before storage
2. **JWT Tokens**: Expire after 7 days
3. **Protected Routes**: Require valid authentication token
4. **Developer Access**: Password-protected with `Ω-ALPHA-DEV-2025`
5. **Secret Document**: Access code `Ω-ALPHA`
6. **Environment Variables**: Sensitive data stored in .env files

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All sections are fully responsive with:
- Flexible grid layouts
- Touch-friendly buttons
- Mobile navigation menu
- Optimized images and 3D models

---

## 🎨 Customization Guide

### Changing Colors
Edit `App.css` and component files. Main color themes:
- Primary: Cyan (#06b6d4)
- Secondary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)

### Adding New Languages
1. Edit `/app/frontend/src/utils/translations.js`
2. Add new language object with all keys
3. Update language selector buttons

### Modifying 3D Model
1. Replace `/app/frontend/public/assets/models/drone_model.glb`
2. Adjust scale in `DroneModel3D.js`

---

## 🐛 Troubleshooting

### Frontend not loading
```bash
sudo supervisorctl restart frontend
```

### Backend errors
```bash
sudo supervisorctl restart backend
tail -f /var/log/supervisor/backend.err.log
```

### Database connection issues
```bash
sudo supervisorctl restart mongodb
```

### AI not responding
- Check Emergent LLM key balance
- Verify `EMERGENT_LLM_KEY` in `/app/backend/.env`

---

## 📊 Database Schema

### Users Collection
```javascript
{
  id: String (UUID),
  username: String,
  email: String (unique),
  password_hash: String,
  language: String (en/ru/cn/jp),
  role: String (user/admin/developer),
  registration_date: DateTime,
  last_login: DateTime
}
```

### Activity Logs Collection
```javascript
{
  id: String (UUID),
  user_id: String,
  action: String,
  ip_address: String,
  timestamp: DateTime,
  details: Object
}
```

### AI Queries Collection
```javascript
{
  id: String (UUID),
  user_id: String,
  session_id: String,
  query: String,
  response: String,
  mode: String (user/developer),
  timestamp: DateTime
}
```

---

## 🎉 Conclusion

This is a **production-ready, fully-functional corporate website** with:
- ✅ Modern, beautiful design
- ✅ Full authentication system
- ✅ AI-powered chatbot
- ✅ Developer terminal
- ✅ Multi-language support
- ✅ Responsive across all devices
- ✅ Secure and scalable architecture
- ✅ Comprehensive logging and monitoring
- ✅ Interactive 3D visualizations

**Enjoy exploring Humo Corporation's innovative technologies!** 🚀
