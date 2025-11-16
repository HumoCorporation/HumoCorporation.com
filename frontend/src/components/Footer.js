import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const { t, theme } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      // In production, this would call a newsletter API
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: t('home'), id: 'hero' },
    { label: t('dronePage'), id: 'drone' },
    { label: t('solarPage'), id: 'solar' },
    { label: t('aboutUs'), id: 'about' },
    { label: t('timeline'), id: 'timeline' },
    { label: t('team'), id: 'team' },
    { label: t('contacts'), id: 'contacts' },
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`py-12 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/images/humo-logo.jpg" 
                alt="Humo Corporation" 
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Humo Corporation
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('heroSubtitle')}
                </p>
              </div>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('heroDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`text-sm hover:text-cyan-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('followUs')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-cyan-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600'} transition-all`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('newsletter')}
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('newsletterDesc')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailAddress')}
                className={`w-full px-4 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
              <button
                type="submit"
                className={`w-full py-2 rounded-lg text-sm font-semibold text-white ${theme === 'dark' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} transition-colors flex items-center justify-center gap-2`}
              >
                <Mail size={16} />
                {subscribed ? t('subscribed') : t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Humo Corporation. {t('allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <button className={`text-sm hover:text-cyan-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('privacyPolicy')}
              </button>
              <button className={`text-sm hover:text-cyan-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('termsOfService')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
