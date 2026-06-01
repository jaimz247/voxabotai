/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from './types';
import { Language } from './locales';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import ClinicView from './components/ClinicView';
import LabView from './components/LabView';
import HowItWorksView from './components/HowItWorksView';
import DemoView from './components/DemoView';
import StaffDashboardView from './components/StaffDashboardView';
import PatientPortalView from './components/PatientPortalView';
import SafetyView from './components/SafetyView';
import FAQView from './components/FAQView';
import FooterView from './components/FooterView';
import { MessageCircle, Heart, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const onBookDemoClick = () => {
    setActiveTab('book-demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} language={language} />;
      case 'clinic-front-desk':
        return <ClinicView onBookDemoClick={onBookDemoClick} />;
      case 'lab-assistant':
        return <LabView onBookDemoClick={onBookDemoClick} />;
      case 'how-it-works':
        return <HowItWorksView onBookDemoClick={onBookDemoClick} />;
      case 'book-demo':
        return <DemoView />;
      case 'staff-dashboard':
        return <StaffDashboardView />;
      case 'patient-portal':
        return <PatientPortalView />;
      default:
        return <HomeView setActiveTab={setActiveTab} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark dark:bg-[#0A0A0A] dark:text-[#EDEEF0] flex flex-col justify-between selection:bg-[#0052FF]/10 selection:text-[#0052FF] transition-colors duration-300">
      
      {/* Top Reading Scroll Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-1 bg-transparent z-[150] pointer-events-none bg-black/5 dark:bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0052FF] via-cyan-500 to-emerald-400 origin-left shadow-sm shadow-[#0052FF]/40"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 }}
        />
      </div>

      {/* Sophisticated Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none -z-40 opacity-[0.03] dark:opacity-[0.015] transition-opacity" 
        style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* Structured Layout Header */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic auxiliary visual sections */}
        {activeTab !== 'how-it-works' && activeTab !== 'book-demo' && <SafetyView />}
        
        <FAQView />
      </main>

      {/* Floating Action Button - Direct WhatsApp Link */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <a
          href="https://wa.me/2348145956772"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0052FF] shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all text-white hover:bg-blue-600"
          title="Direct WhatsApp Live Chat"
          id="floating-whatsapp-btn"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </a>
        <span className="absolute right-16 bottom-3 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-black/10 text-xs font-semibold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
          Chat With Voxabot AI
        </span>
      </div>

      {/* Footer Area */}
      <FooterView setActiveTab={setActiveTab} />

    </div>
  );
}
