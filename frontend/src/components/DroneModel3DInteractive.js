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
    <div className={`relative w-full h-full ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-50'} rounded-xl overflow-hidden`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className={`flex gap-2 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-lg p-2 shadow-lg`}>
          <button
            onClick={() => setCurrentImageIndex(0)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            data-testid="drone-view-front-btn"
          >
            Front View
          </button>
          <button
            onClick={() => setCurrentImageIndex(2)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            data-testid="drone-view-top-btn"
          >
            Top View
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              isRotating
                ? theme === 'dark'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="drone-auto-rotate-btn"
          >
            <RotateCw size={16} className={isRotating ? 'animate-spin' : ''} />
            {isRotating ? 'Stop' : 'Auto Rotate'}
          </button>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-lg p-2 shadow-lg`}>
          <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Drag to rotate • Click views to jump
          </div>
        </div>
      </div>

      {/* Interactive Image Viewer */}
      <div 
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseMove={handleDrag}
        onMouseDown={(e) => e.preventDefault()}
      >
        <img
          src={droneImages[currentImageIndex]}
          alt={`Q1 Rescue Drone - View ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none transition-opacity duration-300"
          draggable="false"
          style={{ userSelect: 'none' }}
        />
      </div>

      {/* View Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className={`flex gap-2 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-full px-4 py-2 shadow-lg`}>
          {droneImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? theme === 'dark'
                    ? 'bg-cyan-500 w-6'
                    : 'bg-blue-600 w-6'
                  : theme === 'dark'
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
              data-testid={`drone-view-indicator-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/90 text-gray-300' : 'bg-white/90 text-gray-700'} backdrop-blur-sm text-sm font-medium shadow-lg flex items-center gap-2`}>
          <ImageIcon size={16} />
          View {currentImageIndex + 1} of {droneImages.length}
        </div>
      </div>
    </div>
  );
};

export default DroneModel3DInteractive;
