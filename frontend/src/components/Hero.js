import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { t, theme } = useApp();

  const scrollToNext = () => {
    const drone = document.getElementById('drone');
    if (drone) drone.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-blue-100 to-gray-100'}`}
      data-testid="hero-section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute w-96 h-96 ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-500/10'} rounded-full blur-3xl -top-20 -left-20 animate-pulse`} />
        <div className={`absolute w-96 h-96 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'} rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000`} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-8">
            <img 
              src="/assets/images/humo-logo.jpg" 
              alt="Humo Corporation" 
              className="h-32 w-32 rounded-3xl object-cover shadow-2xl animate-pulse"
            />
          </div>
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600'} animate-gradient`}>
            {t('heroTitle')}
          </h1>
          <h2 className={`text-2xl md:text-4xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('heroSubtitle')}
          </h2>
          <p className={`text-lg md:text-xl mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            {t('heroDescription')}
          </p>
          <button
            onClick={scrollToNext}
            className={`px-8 py-4 rounded-full font-semibold text-white ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50'} transform hover:scale-105 transition-all duration-300`}
            data-testid="explore-more-btn"
          >
            {t('exploreMore')}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;