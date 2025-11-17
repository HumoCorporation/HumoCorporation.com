import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import axios from 'axios';

const Contacts = () => {
  const { t, theme } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${BACKEND_URL}/api/contact`, formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(t('messageError'));
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      icon: Mail,
      label: t('email'),
      value: 'Humocorp0223@gmail.com',
      link: 'mailto:Humocorp0223@gmail.com',
    },
    {
      icon: Phone,
      label: t('phoneNumber'),
      value: '+7 (**) ***-**-**',
      link: null,
    },
    {
      icon: MapPin,
      label: t('location'),
      value: t('locationValue'),
      link: null,
    },
  ];

  return (
    <section
      id="contacts"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      data-testid="contacts-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
            {t('contactTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('contactSubtitle')}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700 hover:border-cyan-500' : 'bg-gray-50 border border-gray-200 hover:border-blue-500'} text-center hover:transform hover:scale-105 transition-all`}
            >
              <contact.icon
                className={`mx-auto mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}
                size={48}
              />
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {contact.label}
              </h3>
              {contact.link ? (
                <a
                  href={contact.link}
                  className={`text-xl font-bold ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                >
                  {contact.value}
                </a>
              ) : (
                <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {contact.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('contactForm')}
            </h3>

            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-2 text-green-400">
                <Check size={20} />
                <span>{t('messageSent')}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    data-testid="contact-fullname-input"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    data-testid="contact-company-input"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('subject')} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  data-testid="contact-subject-input"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none`}
                  data-testid="contact-message-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all flex items-center justify-center gap-2`}
                data-testid="contact-submit-btn"
              >
                {loading ? t('sending') : (
                  <>
                    <Send size={20} />
                    {t('sendMessage')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;