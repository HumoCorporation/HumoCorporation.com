import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DroneSection from './components/DroneSection';
import SolarSection from './components/SolarSection';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Contacts from './components/Contacts';
import AITerminal from './components/AITerminal';
import DeveloperTerminal from './components/DeveloperTerminal';
import SecretDocument from './components/SecretDocument';

const AppContent = () => {
  const { isAuthenticated, login, theme } = useApp();

  if (!isAuthenticated) {
    return <Auth onSuccess={login} />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`} data-testid="main-app">
      <Navigation />
      
      <main>
        <Hero />
        <DroneSection />
        <SolarSection />
        <Timeline />
        <Team />
        <Contacts />
        <SecretDocument />
      </main>

      {/* Floating Terminal Buttons */}
      <AITerminal />
      <DeveloperTerminal />
      
      {/* Footer */}
      <footer className={`py-8 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/images/humo-logo.jpg" 
                alt="Humo Corporation" 
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Humo Corporation
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Innovative Technologies for Tomorrow
                </p>
              </div>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              © 2025 Humo Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
