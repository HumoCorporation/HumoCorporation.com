import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { terminalAPI } from '../utils/api';

const DeveloperTerminal = () => {
  const { t, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticatedPassword, setAuthenticatedPassword] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Humo Corporation Terminal v1.0.0' },
    { type: 'system', text: 'Enter password to access terminal...' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputEndRef = useRef(null);

  const scrollToBottom = () => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  const handleAuth = async () => {
    if (!password) return;

    try {
      const response = await terminalAPI.execute({
        command: 'status',
        password: password,
      });

      if (!response.data.error) {
        setIsAuthenticated(true);
        setAuthenticatedPassword(password);
        setOutput([
          { type: 'success', text: 'Access granted. Welcome to Humo Terminal.' },
          { type: 'info', text: 'Type "help" for available commands.' },
        ]);
        setPassword('');
      } else {
        setOutput(prev => [...prev, { type: 'error', text: 'Access denied. Invalid password.' }]);
        setPassword('');
      }
    } catch (error) {
      setOutput(prev => [...prev, { type: 'error', text: 'Authentication failed. ' + (error.response?.data?.detail || error.message || 'Please try again.') }]);
      setPassword('');
    }
  };

  const handleCommand = async () => {
    if (!input.trim()) return;

    const command = input.trim();
    setOutput(prev => [...prev, { type: 'input', text: `> ${command}` }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setInput('');
    setLoading(true);

    try {
      const response = await terminalAPI.execute({
        command: command,
        password: authenticatedPassword,
      });

      if (response.data.output) {
        const lines = response.data.output.split('\n').filter(line => line.trim());
        if (lines.length === 0) {
          setOutput(prev => [...prev, { type: 'output', text: ' ' }]);
        } else {
          lines.forEach(line => {
            setOutput(prev => [...prev, {
              type: response.data.error ? 'error' : 'output',
              text: line
            }]);
          });
        }
      } else {
        setOutput(prev => [...prev, { type: 'error', text: 'No response from server.' }]);
      }
    } catch (error) {
      let errorMessage = 'Command execution failed. ';
      if (error.response?.status === 403 || error.response?.status === 401) {
        errorMessage = 'Permission denied. Invalid credentials.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage += error.message;
      }
      setOutput(prev => [...prev, { type: 'error', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-24 z-50 p-4 rounded-full shadow-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'} text-white transform hover:scale-110 transition-all`}
        data-testid="dev-terminal-toggle-btn"
      >
        <TerminalIcon size={28} />
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-24 z-50 w-[40rem] h-[32rem] rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-gray-100 border border-gray-300'} flex flex-col overflow-hidden font-mono`} data-testid="dev-terminal">
          {/* Header */}
          <div className={`p-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <TerminalIcon className="text-white" size={24} />
              <div>
                <div className="text-white font-bold">{t('devTerminal')}</div>
                <div className="text-xs text-white/80">
                  {isAuthenticated ? 'Authenticated' : 'Locked'}
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

          {/* Output */}
          <div className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-900'} text-sm`}>
            {output.map((line, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'success'
                    ? 'text-green-400'
                    : line.type === 'info'
                    ? 'text-cyan-400'
                    : line.type === 'input'
                    ? 'text-yellow-400'
                    : theme === 'dark' ? 'text-green-400' : 'text-gray-700'
                }`}
              >
                {line.text}
              </div>
            ))}
            {loading && (
              <div className="text-cyan-400 animate-pulse">Processing...</div>
            )}
            <div ref={outputEndRef} />
          </div>

          {/* Input */}
          {!isAuthenticated ? (
            <div className={`p-4 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
              <div className="flex gap-2 items-center">
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-gray-700'}>Password:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder={t('enterPassword')}
                  className={`flex-1 px-3 py-2 rounded font-mono text-sm ${theme === 'dark' ? 'bg-black border-gray-700 text-green-400' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  data-testid="terminal-password-input"
                />
              </div>
            </div>
          ) : (
            <div className={`p-4 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
              <div className="flex gap-2 items-center">
                <span className={theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}>$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleCommand()}
                  onKeyDown={handleKeyDown}
                  placeholder={t('typeCommand')}
                  disabled={loading}
                  className={`flex-1 px-3 py-2 rounded font-mono text-sm ${theme === 'dark' ? 'bg-black border-gray-700 text-green-400' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50`}
                  data-testid="terminal-command-input"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DeveloperTerminal;
