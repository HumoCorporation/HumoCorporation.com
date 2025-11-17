import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCw, Image as ImageIcon, Maximize2 } from 'lucide-react';

const DroneModel3DInteractive = () => {
  const { theme } = useApp();
  const [modelType, setModelType] = useState('open');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Use drone photos for 360° view
  const droneImages = [
    '/assets/images/drone_photo_1.jpg',
    '/assets/images/drone_photo_2.jpg',
    '/assets/images/drone_photo_3.jpg',
    '/assets/images/drone_photo_4.jpg',
    '/assets/images/drone_photo_5.jpg',
  ];

  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % droneImages.length);
      }, 1000); // Change image every second
    }
    return () => clearInterval(interval);
  }, [isRotating, droneImages.length]);

  const handleDrag = (e) => {
    if (e.buttons === 1) {
      const movement = e.movementX;
      if (Math.abs(movement) > 5) {
        setCurrentImageIndex((prev) => {
          const newIndex = movement > 0 
            ? (prev + 1) % droneImages.length 
            : (prev - 1 + droneImages.length) % droneImages.length;
          return newIndex;
        });
      }
    }
  };

  return (
    <div className={`relative w-full h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl overflow-hidden`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className={`flex gap-2 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-lg p-2`}>
          <button
            onClick={() => setModelType('open')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              modelType === 'open'
                ? theme === 'dark'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="drone-model-open-btn"
          >
            Open Version
          </button>
          <button
            onClick={() => setModelType('closed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              modelType === 'closed'
                ? theme === 'dark'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="drone-model-closed-btn"
          >
            Closed Version
          </button>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-lg p-2`}>
          <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Drag to rotate • Scroll to zoom
          </div>
        </div>
      </div>

      {/* 3D Model Viewer */}
      {!isLoading && typeof window !== 'undefined' && window.customElements && window.customElements.get('model-viewer') ? (
        <model-viewer
          src={modelPath}
          alt="Humo Q1 Rescue Drone 3D Model"
          auto-rotate
          auto-rotate-delay="1000"
          rotation-per-second="30deg"
          camera-controls
          touch-action="pan-y"
          disable-zoom={false}
          style={{
            width: '100%',
            height: '100%',
            background: theme === 'dark' ? '#1f2937' : '#f3f4f6'
          }}
          camera-orbit="45deg 75deg 2.5m"
          min-camera-orbit="auto auto 1m"
          max-camera-orbit="auto auto 10m"
          field-of-view="45deg"
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
        >
          {/* Loading spinner */}
          <div slot="poster" className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <div className={`animate-spin rounded-full h-16 w-16 border-4 ${theme === 'dark' ? 'border-cyan-500' : 'border-blue-500'} border-t-transparent mx-auto mb-4`} />
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Loading 3D Model...
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div slot="progress-bar" className="absolute bottom-4 left-4 right-4">
            <div className={`h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full overflow-hidden`}>
              <div className={`h-full ${theme === 'dark' ? 'bg-cyan-500' : 'bg-blue-500'} transition-all duration-300`} />
            </div>
          </div>
        </model-viewer>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center p-8">
            <div className={`animate-spin rounded-full h-16 w-16 border-4 ${theme === 'dark' ? 'border-cyan-500' : 'border-blue-500'} border-t-transparent mx-auto mb-4`} />
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Initializing 3D Viewer...
            </p>
          </div>
        </div>
      )}

      {/* Info Badge */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/90 text-gray-300' : 'bg-white/90 text-gray-700'} backdrop-blur-sm text-sm font-medium`}>
          {modelType === 'open' ? '🚁 Open Configuration' : '📦 Closed Configuration'}
        </div>
      </div>
    </div>
  );
};

export default DroneModel3DInteractive;
