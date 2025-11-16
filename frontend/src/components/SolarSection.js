import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Zap, Cloud, Wifi, Settings, Eye } from 'lucide-react';

const SolarSection = () => {
  const { t, theme } = useApp();

  const features = [
    { icon: Sun, text: t('solarFeature1') },
    { icon: Zap, text: t('solarFeature2') },
    { icon: Cloud, text: t('solarFeature3') },
    { icon: Wifi, text: t('solarFeature4') },
    { icon: Settings, text: t('solarFeature5') },
    { icon: Eye, text: t('solarFeature6') },
  ];

  const specs = [
    { label: t('dimensions'), value: '10×8 m' },
    { label: t('panelCount'), value: '24' },
    { label: t('weight'), value: '850 kg' },
    { label: t('powerOutput'), value: '15 kW' },
  ];

  return (
    <section
      id="solar"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
      data-testid="solar-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600'}`}>
            {t('solarTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('solarSubtitle')}
          </p>
        </div>

        <div className="mb-16">
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto text-center`}>
            {t('solarDescription')}
          </p>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('features')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50 border border-gray-700 hover:border-yellow-500' : 'bg-white border border-gray-200 hover:border-orange-500'} transition-all duration-300 hover:transform hover:scale-105`}
              >
                <feature.icon className={`mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'}`} size={32} />
                <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-12">
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('specifications')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specs.map((spec, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-600'}`}>{spec.value}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{spec.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="https://drive.google.com/file/d/1j30m-m7NDV9DkOd7H-qIOvtMI2dWzyXH/view"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 rounded-lg font-semibold text-center ${theme === 'dark' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-orange-500 hover:bg-orange-600'} text-white transform hover:scale-105 transition-all`}
          >
            {t('watchVideo')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;