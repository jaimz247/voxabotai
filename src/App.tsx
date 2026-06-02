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
import ProtectedStaffRoute from './components/ProtectedStaffRoute';
import PatientPortalView from './components/PatientPortalView';
import SafetyView from './components/SafetyView';
import FAQView from './components/FAQView';
import FooterView from './components/FooterView';
import { MessageCircle, Heart, Shield, Activity, X, Volume2, VolumeX, Send, Check, Search } from 'lucide-react';

const clinicalFaqsList = [
  { id: 'faq-1', question: 'What is Voxabot AI?' },
  { id: 'faq-2', question: 'Is Voxabot AI only for large hospitals?' },
  { id: 'faq-3', question: 'Does Voxabot AI replace our front-desk staff?' },
  { id: 'faq-4', question: 'Can it work with WhatsApp?' },
  { id: 'faq-5', question: 'Can it answer phone calls?' },
  { id: 'faq-6', question: 'Can it book appointments?' },
  { id: 'faq-7', question: 'Can it handle lab result questions?' },
  { id: 'faq-8', question: 'Can Voxabot AI interpret lab results medically?' },
  { id: 'faq-9', question: 'How long does a typical setup take?' },
  { id: 'faq-10', question: 'Do we need to replace our current software?' },
  { id: 'faq-11', question: 'How do we get started?' }
];

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
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [isFaqFiltering, setIsFaqFiltering] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (faqSearchQuery.trim() !== '') {
      setIsFaqFiltering(true);
      const timer = setTimeout(() => {
        setIsFaqFiltering(false);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setIsFaqFiltering(false);
    }
  }, [faqSearchQuery]);

  const filteredClinicalFaqs = faqSearchQuery.trim() === ''
    ? clinicalFaqsList.filter(faq => ['faq-1', 'faq-4', 'faq-6'].includes(faq.id))
    : clinicalFaqsList.filter(faq =>
        faq.question.toLowerCase().includes(faqSearchQuery.trim().toLowerCase())
      );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowPulse(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="convai-widget-embed"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

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
        return <DemoView setActiveTab={setActiveTab} />;
      case 'staff-dashboard':
        return (
          <ProtectedStaffRoute>
            <StaffDashboardView />
          </ProtectedStaffRoute>
        );
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

              {/* Dynamic FAQ Search Bar */}
              <div 
                className="relative bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-2.5 py-2 flex flex-col gap-1 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  {isFaqFiltering ? (
                    <span className="h-3.5 w-3.5 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  )}
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    placeholder="Search clinical FAQs..."
                    className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white placeholder:text-slate-450 p-0 focus:outline-none focus:ring-0 w-full font-medium"
                  />
                  {faqSearchQuery && (
                    <button
                      onClick={() => setFaqSearchQuery('')}
                      title="Clear search"
                      className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                {/* Horizontal Progress Bar */}
                <AnimatePresence>
                  {isFaqFiltering && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-[#0052FF]/70 to-blue-400 origin-left"
                    />
                  )}
                </AnimatePresence>
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

              {/* Top FAQs Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {faqSearchQuery.trim() === '' ? 'Popular Clinic FAQs' : 'Matching Clinical FAQs'}
                  </span>
                  <span className="text-[9.5px] font-black text-[#0052FF] bg-blue-500/10 dark:bg-blue-500/20 px-2 py-0.5 rounded-full ring-1 ring-blue-500/10 select-none transition-all duration-300 flex items-center gap-1.5">
                    {isFaqFiltering ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping inline-block" />
                    ) : null}
                    <span>{filteredClinicalFaqs.length} {filteredClinicalFaqs.length === 1 ? 'Result' : 'Results'}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-0.5 scrollbar-thin">
                  <AnimatePresence mode="popLayout">
                    {filteredClinicalFaqs.length > 0 ? (
                      filteredClinicalFaqs.map((faq, idx) => (
                        <motion.button
                          key={faq.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            type: 'spring',
                            stiffness: 280,
                            damping: 22,
                            delay: Math.min(idx * 0.04, 0.2)
                          }}
                          layout
                          onClick={() => handleQuickFaqClick(faq.id)}
                          className="w-full text-left p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 transition-colors text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group/faq cursor-pointer"
                        >
                          <span className="line-clamp-2 pr-1">{faq.question}</span>
                          <span className="text-[10px] text-[#0052FF] shrink-0 opacity-0 group-hover/faq:opacity-100 transition-opacity font-black select-none">→</span>
                        </motion.button>
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-slate-400 dark:text-slate-500 py-3 text-center italic leading-relaxed"
                      >
                        No matching FAQs found.<br />Try searching "WhatsApp" or "Result".
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              width: isHovered ? Math.min(windowWidth - 32, 410) : 56,
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
            <div className="flex items-center justify-between gap-1.5 px-4 h-full w-full font-sans">
              
              {/* WhatsApp Trigger & Slide Text */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 shrink-0 text-white" />
                  {/* Tiny visual sound toggle state indicator (mute/unmute) when sound is toggled off */}
                  {isSoundMuted && (
                    <span 
                      className="absolute -bottom-1 -right-1 bg-rose-600 text-white border border-[#0052FF] rounded-full p-[1.5px] scale-90 shadow-sm flex items-center justify-center" 
                      title="Muted"
                      style={{ transformOrigin: 'bottom right' }}
                    >
                      <VolumeX className="h-2.5 w-2.5 shrink-0 text-white" />
                    </span>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -15, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: -10, width: 0 }}
                      transition={{ type: 'spring', damping: 24, stiffness: 180, mass: 0.85 }}
                      className="text-[10px] font-black tracking-widest uppercase whitespace-nowrap overflow-hidden select-none text-white/90"
                    >
                      Live Desk
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Fast Reply Bubbles within hover-expanded state */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    className="flex items-center gap-1.5 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setActiveTab('book-demo');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2 py-1 rounded-full bg-white/15 hover:bg-white text-[9px] font-black text-white hover:text-[#0052FF] transition-all uppercase tracking-wider cursor-pointer shadow-sm shrink-0"
                    >
                      Book Now
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setQuickMessage('Pricing Inquiry');
                      }}
                      className="px-2 py-1 rounded-full bg-white/15 hover:bg-white text-[9px] font-black text-white hover:text-[#0052FF] transition-all uppercase tracking-wider cursor-pointer shadow-sm shrink-0"
                    >
                      Pricing
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setQuickMessage('Location Details');
                      }}
                      className="px-2 py-1 rounded-full bg-white/15 hover:bg-white text-[9px] font-black text-white hover:text-[#0052FF] transition-all uppercase tracking-wider cursor-pointer shadow-sm shrink-0"
                    >
                      Location
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Instant support request & sound setting */}
              <AnimatePresence>
                {isHovered && (
                  <div
                    className="flex items-center gap-2 shrink-0"
                    onClick={(e) => {
                      // Prevent clicks inside text/controls from triggering navigation
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    {/* Vertical Divider (Stagger 1) */}
                    <motion.div 
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 0.25, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.2, delay: 0.06 }}
                      className="h-5 w-[1px] bg-white" 
                    />

                    {/* Instant support message form (Stagger 2) */}
                    <motion.form
                      initial={{ opacity: 0, x: 15, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.92 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 190, delay: 0.12 }}
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
                            placeholder="SUPPORT..."
                            className="bg-transparent border-none text-[9px] placeholder:text-white/50 focus:outline-none focus:ring-0 text-white w-16 sm:w-20 font-black uppercase p-0 select-text"
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
                    </motion.form>

                    {/* Sound control button (Stagger 3) */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.75, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.75, rotate: -15 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 220, delay: 0.18 }}
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
                    </motion.button>
                  </div>
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
