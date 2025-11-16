import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTranslation } from '../utils/translations';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedLang = localStorage.getItem('humo_language') || 'en';
    const savedTheme = localStorage.getItem('humo_theme') || 'dark';
    const savedUser = localStorage.getItem('humo_user');
    const savedToken = localStorage.getItem('humo_token');

    setLanguage(savedLang);
    setTheme(savedTheme);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('humo_user', JSON.stringify(userData));
    localStorage.setItem('humo_token', token);
    if (userData.language) {
      changeLanguage(userData.language);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('humo_user');
    localStorage.removeItem('humo_token');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('humo_language', lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('humo_theme', newTheme);
  };

  const t = (key) => getTranslation(language, key);

  return (
    <AppContext.Provider
      value={{
        user,
        language,
        theme,
        isAuthenticated,
        login,
        logout,
        changeLanguage,
        toggleTheme,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;