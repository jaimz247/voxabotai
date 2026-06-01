/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { MessageCircle, Heart, Shield, Activity, X, Volume2, VolumeX, Send, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false;
  });

  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowPulse(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleInteraction = () => {
    setHasInteracted(true);
    setShowPulse(false);
  };

  const handleQuickFaqClick = (faqId: string) => {
    setShowContextMenu(false);
    const element = document.getElementById(`faq-btn-${faqId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        // Find if the FAQ is folded or not, and click it
        element.click();
      }, 500);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(prevState => !prevState);
    playNotificationSound();
  };

  const playNotificationSound = () => {
    if (isSoundMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      
      // Crisp premium medical-app double-chime synth
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.08); // A5
      gain2.gain.setValueAtTime(0, now + 0.08);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.10);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.35);
    } catch (err) {
      console.log('Audio feedback play error: ', err);
    }
  };

  const handleBtnClick = () => {
    handleInteraction();
    playNotificationSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      
      // Smoothly hide floating action button when scrolling down, and show at top
      if (window.scrollY > 120) {
        setShowFloatingButton(false);
      } else {
        setShowFloatingButton(true);
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

      {/* Floating Action Button - Direct WhatsApp Link & Quick Console */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 select-none text-slate-800 dark:text-white">
        
        {/* Advanced Context Menu above the button */}
        <AnimatePresence>
          {showContextMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              className="w-76 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0E0E0F]/95 backdrop-blur-[64px] p-4.5 shadow-2xl flex flex-col gap-3.5 mb-2 z-50"
            >
              {/* Context Menu Header */}
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0052FF] flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  <span>Voxabot Console</span>
                </span>
                <button
                  onClick={() => setShowContextMenu(false)}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white" />
                </button>
              </div>

              {/* Pulse Speed Selector (Clinic Operating Status Indicator) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pulse / Clinic Volume</span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500">
                    {pulseSpeed === 'fast' ? 'Peak Hours' : pulseSpeed === 'slow' ? 'Night Shift' : 'Standard'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-black/5 dark:bg-white/5 rounded-lg p-1">
                  {(['slow', 'normal', 'fast'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPulseSpeed(spd);
                        playNotificationSound();
                        handleInteraction();
                      }}
                      className={`text-[9px] font-black tracking-widest uppercase py-1.5 rounded-md transition-all cursor-pointer ${
                        pulseSpeed === spd
                          ? 'bg-[#0052FF] text-white shadow-sm'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-300'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top 3 FAQs Links */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Popular Clinic FAQs</span>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'faq-1', text: 'What is Voxabot AI?' },
                    { id: 'faq-4', text: 'Can it work with WhatsApp?' },
                    { id: 'faq-6', text: 'Can it book appointments?' }
                  ].map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleQuickFaqClick(faq.id)}
                      className="w-full text-left p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 transition-all text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group/faq cursor-pointer"
                    >
                      <span>{faq.text}</span>
                      <span className="text-[10px] text-[#0052FF] opacity-0 group-hover/faq:opacity-100 transition-opacity font-black select-none">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Container */}
        <div className="relative group">
          <motion.a
            id="floating-whatsapp-btn"
            href="https://wa.me/2348145956772"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-14 items-center justify-center rounded-full bg-[#0052FF] text-white select-none transition-all duration-300 cursor-pointer overflow-hidden max-w-[calc(100vw-32px)]"
            onMouseEnter={() => {
              setIsHovered(true);
              handleInteraction();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => {
              setIsHovered(true);
              handleInteraction();
            }}
            onBlur={() => setIsHovered(false)}
            onClick={handleBtnClick}
            onContextMenu={handleContextMenu}
            
            // Mobile Long Press Integration
            onTouchStart={(e) => {
              handleInteraction();
              const timer = setTimeout(() => {
                setShowContextMenu(true);
                playNotificationSound();
              }, 600);
              (window as any)._longPressTimer = timer;
            }}
            onTouchEnd={() => {
              if ((window as any)._longPressTimer) {
                clearTimeout((window as any)._longPressTimer);
              }
            }}
            
            animate={{
              width: isHovered ? 410 : 56,
              scale: showFloatingButton ? 1 : 0,
              opacity: showFloatingButton ? 1 : 0,
              boxShadow: isHovered 
                ? '0 0 25px 6px rgba(0, 82, 255, 0.5)'
                : "0 10px 25px -5px rgba(0, 82, 255, 0.3)",
              ...(showPulse && showFloatingButton && !isHovered ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 20px -5px rgba(0, 82, 255, 0.3)",
                  "0 10px 30px 5px rgba(0, 82, 255, 0.5)",
                  "0 10px 20px -5px rgba(0, 82, 255, 0.3)"
                ]
              } : {})
            }}
            transition={showPulse && !isHovered ? {
              duration: pulseSpeed === 'fast' ? 0.9 : pulseSpeed === 'slow' ? 3.5 : 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0.3, ease: 'easeOut' }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Flex alignment layout */}
            <div className="flex items-center justify-between gap-2.5 px-4 h-full w-full">
              
              {/* WhatsApp Trigger & Slide Text */}
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-6 w-6 shrink-0 text-white" />
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 20, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: 10, width: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                      className="text-[11px] font-black tracking-widest uppercase whitespace-nowrap overflow-hidden select-none"
                    >
                      Live Support Active
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Instant support request & sound setting */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 15 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2.5 shrink-0"
                    onClick={(e) => {
                      // Prevent clicks inside text/controls from triggering navigation
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    {/* Vertical Divider */}
                    <div className="h-5 w-[1px] bg-white/20" />

                    {/* Instant support message form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!quickMessage.trim()) return;
                        
                        console.log('Sending instant clinical support request:', quickMessage);
                        setQuickMessage('');
                        setShowMessageSuccess(true);
                        playNotificationSound();
                        
                        setTimeout(() => {
                          setShowMessageSuccess(false);
                        }, 2500);
                      }}
                      className="relative flex items-center bg-white/10 dark:bg-black/25 hover:bg-white/15 dark:hover:bg-black/35 rounded-full px-2.5 py-1 text-xs text-white max-w-[170px]"
                    >
                      {showMessageSuccess ? (
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-400 select-none px-1 py-0.5 animate-pulse">
                          <Check className="h-3.5 w-3.5" />
                          <span>Sent!</span>
                        </div>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={quickMessage}
                            onChange={(e) => setQuickMessage(e.target.value)}
                            onKeyDown={(e) => {
                              // Prevent layout space/scrolling keys from sliding view
                              e.stopPropagation();
                            }}
                            placeholder="SUPPORT REQUEST..."
                            className="bg-transparent border-none text-[9px] placeholder:text-white/50 focus:outline-none focus:ring-0 text-white w-24 sm:w-28 font-black uppercase p-0 select-text"
                          />
                          <button
                            type="submit"
                            title="Send support request"
                            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                          >
                            <Send className="h-3 w-3" />
                          </button>
                        </>
                      )}
                    </form>

                    {/* Sound control button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsSoundMuted(!isSoundMuted);
                      }}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
                      title={isSoundMuted ? "Unmute support sound" : "Mute support sound"}
                    >
                      {isSoundMuted ? (
                        <VolumeX className="h-4 w-4 text-white/50" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Live active indicator dot */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white dark:border-[#0A0A0A]"></span>
            </span>
          </motion.a>

          {/* Quick context info button below on hover / mini notice */}
          <span className="absolute right-full mr-3 top-4 px-2.5 py-1.5 rounded-lg bg-[#1A1A1A]/95 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Right-click / Long-press for Console
          </span>
        </div>
      </div>

      {/* Footer Area */}
      <FooterView setActiveTab={setActiveTab} />

    </div>
  );
}
