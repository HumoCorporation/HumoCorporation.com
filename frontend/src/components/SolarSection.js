import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Zap, Cloud, Wifi, Settings, Eye, X } from 'lucide-react';

const SolarSection = () => {
  const { t, theme } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);

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

        {/* Photo Gallery */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('viewGallery')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onClick={() => setSelectedImage(num)}
                className={`relative overflow-hidden rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                data-testid={`solar-photo-${num}`}
              >
                <img
                  src={`/assets/images/solar_photo_${num}.jpg`}
                  alt={`Smart Solar Station S1 - Photo ${num}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-orange-900/80 to-transparent' : 'bg-gradient-to-t from-orange-800/60 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6`}>
                  <p className="text-white font-semibold text-lg">View Full Size</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            data-testid="solar-image-lightbox"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              data-testid="close-solar-lightbox-btn"
            >
              <X className="text-white" size={32} />
            </button>
            <img
              src={`/assets/images/solar_photo_${selectedImage}.jpg`}
              alt={`Smart Solar Station S1 - Photo ${selectedImage}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold">
              Photo {selectedImage} of 5
            </div>
          </div>
        )}

        {/* Videos */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="https://drive.google.com/file/d/1j30m-m7NDV9DkOd7H-qIOvtMI2dWzyXH/view"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 rounded-lg font-semibold text-center ${theme === 'dark' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-orange-500 hover:bg-orange-600'} text-white transform hover:scale-105 transition-all`}
            data-testid="solar-video-btn"
          >
            {t('watchVideo')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;