import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contacts = () => {
  const { t, theme } = useApp();

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@humocorp.com',
      link: 'mailto:info@humocorp.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+998 (90) 123-45-67',
      link: 'tel:+998901234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Tashkent, Uzbekistan',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      </div>
    </section>
  );
};

export default Contacts;