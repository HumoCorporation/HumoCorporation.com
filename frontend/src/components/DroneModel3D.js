import React from 'react';
import { useApp } from '../context/AppContext';

const DroneModel3D = () => {
  const { theme } = useApp();

  return (
    <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="text-center p-8">
        <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'}`}>
          🚁
        </div>
        <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Q1 Rescue Drone - 3D Model
        </p>
        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Your custom drone model from Blender
        </p>
        <p className={`text-xs mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
          Advanced autonomous rescue system with AI capabilities
        </p>
      </div>
    </div>
  );
};

export default DroneModel3D;