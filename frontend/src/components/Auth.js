import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { authAPI } from '../utils/api';

const Auth = ({ onSuccess }) => {
  const { t, changeLanguage, language } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
        setWelcomeName(response.data.user.username);
        setShowWelcome(true);
        setTimeout(() => {
          onSuccess(response.data.user, response.data.token);
        }, 2000);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const response = await authAPI.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          language: language,
        });
        setWelcomeName(response.data.user.username);
        setShowWelcome(true);
        setTimeout(() => {
          onSuccess(response.data.user, response.data.token);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
      setLoading(false);
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse">
              Humo Corporation
            </div>
          </div>
          <div className="text-3xl text-white mb-4">
            {isLogin ? t('welcomeBack') : t('registrationSuccess')}
            <span className="text-cyan-400 font-semibold">{welcomeName}</span>
          </div>
          <div className="text-gray-400 text-lg">Initializing Red Queen...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-gray-900/95 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-49833-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Language Selector - Top Right */}
      <div className="absolute top-8 right-8 z-30 flex gap-2">
        {['en', 'ru', 'cn', 'jp'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              language === lang
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-white/10 text-white hover:bg-white/20'
            } backdrop-blur-sm`}
            data-testid={`language-${lang}-btn`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Auth Form */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/images/humo-logo.jpg" 
                alt="Humo Corporation" 
                className="h-20 w-20 rounded-2xl object-cover shadow-2xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              Humo Corporation
            </h1>
            <p className="text-gray-300 text-sm">{t('welcome')}</p>
          </div>

          {/* Toggle Login/Register */}
          <div className="flex mb-6 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md transition-all duration-300 ${
                isLogin
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              data-testid="login-tab-btn"
            >
              {t('login')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md transition-all duration-300 ${
                !isLogin
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              data-testid="register-tab-btn"
            >
              {t('register')}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  {t('username')}
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder={t('username')}
                  data-testid="username-input"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('email')}
                data-testid="email-input"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder={t('password')}
                data-testid="password-input"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  {t('confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder={t('confirmPassword')}
                  data-testid="confirm-password-input"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="auth-submit-btn"
            >
              {loading ? '...' : isLogin ? t('loginButton') : t('registerButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;