import React from 'react';
import { useApp } from '../context/AppContext';
import { User } from 'lucide-react';

const Team = () => {
  const { t, theme } = useApp();

  return (
    <section
      id="team"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
      data-testid="team-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600'}`}>
            {t('teamTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('teamSubtitle')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className={`max-w-md p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} hover:transform hover:scale-105 transition-all`}>
            <div className={`w-48 h-48 mx-auto mb-6 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-green-400 to-emerald-400' : 'bg-gradient-to-br from-green-500 to-emerald-500'} flex items-center justify-center`}>
              <User size={96} className="text-white" />
            </div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Jurabek Kayumov
            </h3>
            <p className={`text-center mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} font-semibold`}>
              {t('ceo')}
            </p>
            <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Visionary leader and inventor behind Humo Corporation's innovative technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;