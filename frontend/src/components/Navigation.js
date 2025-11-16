import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, User, LogOut, Menu, X } from 'lucide-react';

const Navigation = () => {
  const { t, theme, toggleTheme, language, changeLanguage, user, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: t('home') },
    { id: 'drone', label: t('dronePage') },
    { id: 'solar', label: t('solarPage') },
    { id: 'timeline', label: t('timeline') },
    { id: 'team', label: t('team') },
    { id: 'contacts', label: t('contacts') },
    { id: 'secret', label: t('secret') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-lg border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } shadow-lg`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              src="/assets/images/humo-logo.jpg" 
              alt="Humo Corporation" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <h1
              className={`text-2xl font-bold ${
                theme === 'dark'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}
            >
              Humo Corp
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                data-testid={`nav-${item.id}-btn`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {['en', 'ru', 'cn', 'jp'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all duration-300 ${
                    language === lang
                      ? theme === 'dark'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  data-testid={`nav-lang-${lang}-btn`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              data-testid="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid="user-menu-btn"
              >
                <User size={20} />
                <span className="text-sm font-medium">{user?.username}</span>
              </button>

              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } border ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    data-testid="logout-btn"
                  >
                    <LogOut size={16} className="mr-2" />
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-yellow-400'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
              data-testid="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex gap-1">
                {['en', 'ru', 'cn', 'jp'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      language === lang
                        ? 'bg-cyan-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-base font-medium ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-red-900/20'
                  : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <LogOut size={20} className="mr-2" />
              {t('logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;