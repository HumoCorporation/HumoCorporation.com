import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react';

const AboutUs = () => {
  const { t, theme } = useApp();

  const values = [
    {
      icon: Lightbulb,
      title: t('valueInnovation'),
      description: t('valueInnovationDesc'),
    },
    {
      icon: Heart,
      title: t('valueSafety'),
      description: t('valueSafetyDesc'),
    },
    {
      icon: Users,
      title: t('valueCollaboration'),
      description: t('valueCollaborationDesc'),
    },
    {
      icon: Award,
      title: t('valueExcellence'),
      description: t('valueExcellenceDesc'),
    },
  ];

  const achievements = [
    { number: '2020', label: t('founded') },
    { number: '50+', label: t('patents') },
    { number: '15+', label: t('countries') },
    { number: '1000+', label: t('deployments') },
  ];

  return (
    <section
      id="about"
      className={`min-h-screen py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'}`}>
            {t('aboutUs')}
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Company Overview */}
        <div className={`mb-16 p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
          <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('aboutDescription1')}
          </p>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('aboutDescription2')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-700/50' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200'}`}>
            <Target className={`mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} size={48} />
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('ourMission')}
            </h3>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('missionDescription')}
            </p>
          </div>

          <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'}`}>
            <Eye className={`mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} size={48} />
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('ourVision')}
            </h3>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('visionDescription')}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('coreValues')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border border-gray-700 hover:border-purple-500' : 'bg-gray-50 border border-gray-200 hover:border-purple-500'} transition-all duration-300 hover:transform hover:scale-105`}
              >
                <value.icon className={`mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} size={40} />
                <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-700' : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300'}`}>
          <h3 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('achievements')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'}`}>
                  {achievement.number}
                </div>
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' })}
            className={`px-8 py-4 rounded-lg font-semibold text-white ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'} transform hover:scale-105 transition-all shadow-lg`}
            data-testid="about-contact-cta"
          >
            {t('getInTouch')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;