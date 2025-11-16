import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

const Timeline = () => {
  const { t, theme } = useApp();

  const events = [
    { year: '2020', title: 'Company Foundation', description: 'Humo Corporation established with vision for innovative rescue technologies' },
    { year: '2021', title: 'Research & Development', description: 'Initial R&D phase for autonomous systems and AI integration' },
    { year: '2022', title: 'Q1 Drone Prototype', description: 'First successful prototype of rescue drone with AI capabilities' },
    { year: '2023', title: 'Solar Station S1 Development', description: 'Development of smart solar energy system with Helios AI' },
    { year: '2024', title: 'System Integration', description: 'Integration of all systems and field testing' },
    { year: '2025', title: 'Commercial Launch', description: 'Official launch of Q1 Rescue Drone and Solar Station S1' },
  ];

  return (
    <section
      id="timeline"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      data-testid="timeline-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'}`}>
            {t('timelineTitle')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('timelineSubtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${theme === 'dark' ? 'bg-gradient-to-b from-purple-500 to-pink-500' : 'bg-gradient-to-b from-purple-400 to-pink-400'} hidden md:block`} />

          {/* Timeline Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-block px-8 py-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} hover:transform hover:scale-105 transition-all`}>
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
                      <Calendar className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={24} />
                      <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{event.year}</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{event.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-400 to-pink-400'} border-4 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} z-10 hidden md:block`} />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;