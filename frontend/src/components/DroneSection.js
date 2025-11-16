import React, { Suspense, lazy, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Brain, Shield, Heart, Activity, Cloud, X } from 'lucide-react';

const DroneModel3D = lazy(() => import('./DroneModel3D'));

const DroneSection = () => {
  const { t, theme } = useApp();
  const [showModel, setShowModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const features = [
    { icon: Zap, text: t('droneFeature1') },
    { icon: Brain, text: t('droneFeature2') },
    { icon: Shield, text: t('droneFeature3') },
    { icon: Heart, text: t('droneFeature4') },
    { icon: Activity, text: t('droneFeature5') },
    { icon: Cloud, text: t('droneFeature6') },
  ];

  const specs = [
    { label: t('flightTime'), value: '120 min' },
    { label: t('maxPayload'), value: '5 kg' },
    { label: t('maxSpeed'), value: '80 km/h' },
    { label: t('operatingRange'), value: '25 km' },
  ];

  return (
    <section
      id="drone"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      data-testid="drone-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
            {t('droneTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('droneSubtitle')}
          </p>
        </div>

        {/* 3D Model */}
        <div className={`relative h-96 mb-16 rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          {showModel ? (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className={`animate-spin rounded-full h-12 w-12 border-4 ${theme === 'dark' ? 'border-cyan-500' : 'border-blue-500'} border-t-transparent mx-auto mb-4`} />
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading 3D Model...</p>
                </div>
              </div>
            }>
              <DroneModel3D />
            </Suspense>
          ) : (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setShowModel(true)}
                className={`px-8 py-4 rounded-lg font-semibold text-white ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} transform hover:scale-105 transition-all`}
              >
                Load 3D Model
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-16">
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto text-center`}>
            {t('droneDescription')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('features')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700 hover:border-cyan-500' : 'bg-gray-50 border border-gray-200 hover:border-blue-500'} transition-all duration-300 hover:transform hover:scale-105`}
              >
                <feature.icon className={`mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`} size={32} />
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
              <div key={index} className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>{spec.value}</p>
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
                className={`relative overflow-hidden rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                data-testid={`drone-photo-${num}`}
              >
                <img
                  src={`/assets/images/drone_photo_${num}.jpg`}
                  alt={`Q1 Rescue Drone - Photo ${num}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-gray-900/80 to-transparent' : 'bg-gradient-to-t from-gray-800/60 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6`}>
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
            data-testid="image-lightbox"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              data-testid="close-lightbox-btn"
            >
              <X className="text-white" size={32} />
            </button>
            <img
              src={`/assets/images/drone_photo_${selectedImage}.jpg`}
              alt={`Q1 Rescue Drone - Photo ${selectedImage}`}
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
            href="https://drive.google.com/file/d/1--vZ9twYEzpL8YWua2Wz3VsFW_hKOqfV/view"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 rounded-lg font-semibold text-center ${theme === 'dark' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transform hover:scale-105 transition-all`}
            data-testid="drone-video-btn"
          >
            {t('watchVideo')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DroneSection;