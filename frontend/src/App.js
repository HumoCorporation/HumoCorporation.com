import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DroneSection from './components/DroneSection';
import SolarSection from './components/SolarSection';
import AboutUs from './components/AboutUs';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Contacts from './components/Contacts';
import AITerminal from './components/AITerminal';
import DeveloperTerminal from './components/DeveloperTerminal';
import SecretDocument from './components/SecretDocument';
import Footer from './components/Footer';

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
      <Footer />
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
