import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';
import { secretAPI } from '../utils/api';

const SecretDocument = () => {
  const { t, theme } = useApp();
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await secretAPI.verify({ code });
      if (response.data.access) {
        setIsUnlocked(true);
      } else {
        setError(t('accessDenied'));
      }
    } catch (err) {
      setError('Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="secret"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/20 via-gray-900 to-purple-900/20' : 'bg-gradient-to-br from-red-100/20 via-gray-50 to-purple-100/20'}`}
      data-testid="secret-section"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'}`}>
              {isUnlocked ? (
                <Unlock className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} size={64} />
              ) : (
                <Lock className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} size={64} />
              )}
            </div>
          </div>
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600'}`}>
            {t('secretTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('secretSubtitle')}
          </p>
        </div>

        {!isUnlocked ? (
          <div className={`max-w-md mx-auto p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} backdrop-blur-lg`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('enterAccessCode')}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-center text-xl tracking-widest`}
                  placeholder="Ω-XXXXX"
                  data-testid="secret-code-input"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                  <AlertTriangle className="text-red-400" size={20} />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !code}
                className={`w-full py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600' : 'bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700'} text-white disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all`}
                data-testid="verify-code-btn"
              >
                {loading ? 'Verifying...' : 'Verify Access'}
              </button>
            </form>
          </div>
        ) : (
          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border border-green-500/50' : 'bg-white border border-green-500'} backdrop-blur-lg`}>
            <div className="mb-6 text-center">
              <p className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {t('accessGranted')}
              </p>
            </div>

            <div className={`space-y-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Project Omega: Classified Information
                </h3>
                <p className="mb-4">
                  Humo Corporation was founded in 2020 with a singular mission: to revolutionize emergency response and sustainable energy through advanced AI and autonomous systems.
                </p>
              </div>

              <div>
                <h4 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Q1 Rescue Drone - Project Alpha
                </h4>
                <p className="mb-2">
                  Advanced autonomous rescue system with integrated AI for real-time decision making. Capable of operating in extreme weather conditions and hazardous environments.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>AI-powered threat assessment and route optimization</li>
                  <li>Thermal imaging and night vision capabilities</li>
                  <li>Two-way communication system for victim support</li>
                  <li>Automated emergency supplies delivery</li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'}`}>
                  Solar Station S1 - Project Helios
                </h4>
                <p className="mb-2">
                  Intelligent solar power system with predictive AI for maximum energy efficiency and autonomous grid management.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Advanced weather prediction algorithms</li>
                  <li>Self-cleaning and maintenance systems</li>
                  <li>Smart grid integration for optimal power distribution</li>
                  <li>Emergency backup power capabilities</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  <strong>Classification Level:</strong> Omega Alpha<br />
                  <strong>Access Restriction:</strong> Authorized Personnel Only<br />
                  <strong>Document ID:</strong> HC-2025-OMEGA-001
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecretDocument;