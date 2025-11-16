import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Lock, Unlock } from 'lucide-react';
import { aiAPI } from '../utils/api';

const AITerminal = () => {
  const { t, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hello! I am Red Queen AI. How can I assist you with Humo Corporation technologies today?'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.query({
        query: input,
        session_id: sessionId.current,
        mode: isDeveloperMode ? 'developer' : 'user',
        developer_password: isDeveloperMode ? devPassword : undefined,
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.response
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: Unable to process request. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeveloperMode = () => {
    if (!isDeveloperMode) {
      setShowPasswordPrompt(true);
    } else {
      setIsDeveloperMode(false);
      setDevPassword('');
      setMessages([{
        role: 'assistant',
        content: 'Switched to User Mode. How can I assist you?'
      }]);
    }
  };

  const activateDeveloperMode = () => {
    if (devPassword) {
      setIsDeveloperMode(true);
      setShowPasswordPrompt(false);
      setMessages([{
        role: 'assistant',
        content: 'Developer Mode activated. Full system access granted. How may I assist you?'
      }]);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} text-white transform hover:scale-110 transition-all`}
        data-testid="ai-terminal-toggle-btn"
      >
        <Bot size={28} />
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-96 h-[32rem] rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} flex flex-col overflow-hidden`} data-testid="ai-terminal">
          {/* Header */}
          <div className={`p-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <Bot className="text-white" size={24} />
              <div>
                <div className="text-white font-bold">{t('aiTerminal')}</div>
                <div className="text-xs text-white/80">
                  {isDeveloperMode ? t('aiDeveloperMode') : t('aiUserMode')}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className={`p-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-between`}>
            <button
              onClick={handleDeveloperMode}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${isDeveloperMode ? theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-500 text-white' : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} transition-colors`}
              data-testid="dev-mode-toggle-btn"
            >
              {isDeveloperMode ? <Unlock size={16} /> : <Lock size={16} />}
              {isDeveloperMode ? t('switchToUserMode') : t('switchToDevMode')}
            </button>
          </div>

          {/* Password Prompt */}
          {showPasswordPrompt && (
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-gray-50'}`}>
              <input
                type="password"
                value={devPassword}
                onChange={(e) => setDevPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && activateDeveloperMode()}
                placeholder={t('enterDevPassword')}
                className={`w-full px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                data-testid="dev-password-input"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={activateDeveloperMode}
                  className="flex-1 px-3 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setDevPassword('');
                  }}
                  className={`px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'} rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? theme === 'dark' ? 'bg-cyan-600 text-white' : 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'} text-sm shadow-md`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'} animate-bounce`} />
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'} animate-bounce delay-100`} />
                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-blue-500'} animate-bounce delay-200`} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder={t('typeMessage')}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50`}
                data-testid="ai-message-input"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-500 hover:bg-blue-600'} text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                data-testid="ai-send-btn"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AITerminal;