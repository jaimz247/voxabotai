/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageSquareCode, PhoneCall, Calendar, Search, Sun, Moon, HelpCircle, FileText, BarChart3, Globe } from 'lucide-react';
import { ActiveTab } from '../types';
import { Language, translations } from '../locales';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Navigation({ activeTab, setActiveTab, darkMode, setDarkMode, language, setLanguage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations.en;

  const navItems = [
    { label: t.home, id: 'home' as ActiveTab },
    { label: t.clinic, id: 'clinic-front-desk' as ActiveTab },
    { label: t.lab, id: 'lab-assistant' as ActiveTab },
    { label: t.howItWorks, id: 'how-it-works' as ActiveTab },
    { label: language === 'fr' ? 'Suivis' : language === 'es' ? 'Seguimiento' : 'Staff Dashboard', id: 'staff-dashboard' as ActiveTab },
    { label: language === 'fr' ? 'Portail Patient' : language === 'es' ? 'Portal Paciente' : 'Patient Portal', id: 'patient-portal' as ActiveTab },
  ];

  const searchDataset = [
    {
      title: 'Clinic Front Desk AI Solutions',
      desc: '24/7 AI front desk for Patient enquiries, booking appointments, and sharing lab results.',
      type: 'Service Plan',
      tabId: 'clinic-front-desk' as ActiveTab,
    },
    {
      title: 'Lab Assistant AI Solutions',
      desc: 'Reduce repetitive lab inquiries, confirm test readiness, and fasting preparational guides.',
      type: 'Service Plan',
      tabId: 'lab-assistant' as ActiveTab,
    },
    {
      title: 'Deployment & Implementation Plan',
      desc: 'Overview of the deployment timeline, CRM integration, and staff training protocols.',
      type: 'Guide',
      tabId: 'how-it-works' as ActiveTab,
    },
    {
      title: 'Request Custom Pilot & Demo Sandbox',
      desc: 'Test clinical AI sandbox conversations, mock-calls trigger, and direct schedule booking.',
      type: 'Clinical Sandbox',
      tabId: 'book-demo' as ActiveTab,
    },
    {
      title: 'Efficiency & Conversion Metrics Compare',
      desc: 'Analytics chart measuring tradicional clinic vs Voxabot-powered office accuracy rates.',
      type: 'Performance Analytics',
      tabId: 'home' as ActiveTab,
      scrollId: 'efficiency-metrics',
    },
    {
      title: 'What is Voxabot AI?',
      desc: 'Administrative clinical communications assistant helping clinics with non-clinical FAQ.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-1',
    },
    {
      title: 'Is Voxabot AI only for large hospitals?',
      desc: 'Configurable for small private practice, laboratories, as medical office networks.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-2',
    },
    {
      title: 'Does Voxabot AI replace our front-desk staff?',
      desc: 'Bypasses replacements. Handles repetitive questions while humans focus on in-person patients.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-3',
    },
    {
      title: 'Can it work with WhatsApp?',
      desc: 'Full WhatsApp operational status updates, pre-test fasting instructions, and clinic FAQ.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-4',
    },
    {
      title: 'Can it answer phone calls?',
      desc: 'Missed-call recovery automations, instant WhatsApp follow-up triggers, out-of-hours assistance.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-5',
    },
    {
      title: 'Can it book appointments?',
      desc: 'Patient details, clinical services selection, and synchronized calendar appointment capture.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-6',
    },
    {
      title: 'Can it handle lab result questions?',
      desc: 'Result status tracking, collecting times reminder, and physical location information.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-7',
    },
    {
      title: 'Can Voxabot AI interpret lab results medically?',
      desc: 'No clinical feedback. Clinical topics are instantly flagged and forwarded to doctors.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-8',
    },
    {
      title: 'How long does a typical setup take?',
      desc: 'Simple custom trials setup under a week upon approving base medical materials.',
      type: 'FAQ',
      tabId: 'home' as ActiveTab,
      faqId: 'faq-9',
    },
  ];

  // Close search list on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setIsSearchFocused(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchResultSelect = (item: typeof searchDataset[number]) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    setActiveTab(item.tabId);
    setMobileMenuOpen(false);

    setTimeout(() => {
      if (item.faqId) {
        const accordionBtn = document.getElementById(`faq-btn-${item.faqId}`);
        if (accordionBtn) {
          accordionBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Open FAQ panel
          accordionBtn.click();
        } else {
          // If not home, wait and try after a delay matching transition
          window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
        }
      } else if (item.scrollId) {
        const scrollTarget = document.getElementById(item.scrollId);
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  const filteredResults = searchQuery
    ? searchDataset.filter(
        (x) =>
          x.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          x.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          x.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-[#1A1A1A] border-b border-black/10 py-2 px-4 text-center text-[11px] text-white/90 uppercase tracking-wider select-none">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
          </span>
          <span className="font-bold">Voxabot Network Status: Live & Operational</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-white/80">Supporting WhatsApp calls, automated SMS alerts & clinic database workflows.</span>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-brand-dark/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
            id="nav-logo-btn"
          >
            {!logoLoadError ? (
              <img 
                src="/logo-horizontal.png" 
                alt="VOXABOT" 
                onError={() => setLogoLoadError(true)}
                className="h-8 md:h-9 w-auto object-contain block dark:opacity-90 dark:brightness-110"
              />
            ) : (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0052FF] text-white shadow-md shadow-blue-500/10 transition-transform group-hover:scale-105 group-hover:rotate-6 duration-300">
                  <span className="font-display text-base font-black tracking-widest leading-none">V</span>
                </div>
                <div>
                  <span className="font-display text-lg font-black tracking-widest text-[#1A1A1A] dark:text-white flex items-center gap-1.5 uppercase">
                    VOXABOT <span className="text-white font-black text-[9px] tracking-widest px-2 py-0.5 rounded-full bg-[#1A1A1A] dark:bg-white dark:text-[#1A1A1A] shadow-sm">AI</span>
                  </span>
                  <p className="text-[8px] text-[#0052FF] dark:text-blue-400 tracking-[0.15em] font-black uppercase leading-none mt-0.5">Automating Clinical Workflows</p>
                </div>
              </>
            )}
          </button>

          {/* Desktop Navigation Paths */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-light/90 dark:bg-[#111111]/90 border border-black/5 dark:border-white/10 rounded-full p-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer select-none ${
                    isActive ? 'text-[#1A1A1A] dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Call to Actions & Theme Toggle on Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Selector */}
            <div className="relative inline-flex items-center gap-1 bg-brand-light dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5 shadow-sm">
              <Globe className="h-3.5 w-3.5 text-slate-400 dark:text-slate-300 shrink-0" />
              <select
                aria-label="Language Selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-[10px] font-black uppercase text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-1 leading-none"
              >
                <option value="en" className="text-black dark:bg-[#1A1A1A]">EN</option>
                <option value="fr" className="text-black dark:bg-[#1A1A1A]">FR</option>
                <option value="es" className="text-black dark:bg-[#1A1A1A]">ES</option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1A1A] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-slate-700 dark:text-amber-400 focus:outline-none"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-btn"
            >
              {darkMode ? (
                <Sun className="h-4.5 w-4.5 text-amber-400 shrink-0" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-600 shrink-0" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('book-demo')}
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs uppercase tracking-tighter font-black btn-heavy transition-all cursor-pointer shadow-sm ${
                activeTab === 'book-demo'
                  ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-[#1A1A1A] hover:bg-[#0052FF] text-white dark:bg-white dark:text-black dark:hover:bg-[#0052FF] dark:hover:text-white'
              }`}
              id="desktop-demo-btn"
            >
              <span>Book Demo</span>
              <Calendar className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Hamburger Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle for Mobile directly next to menu */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1A1A] text-slate-700 dark:text-amber-400 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer with horizontal slide-in and deep glassmorphism */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay Backdrop to prevent scrolling and close menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm md:hidden"
              />

              {/* Sidebar Menu Panel */}
              <motion.div
                initial={{ x: '100%', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 1 }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed inset-y-0 right-0 z-[150] w-80 max-w-[85vw] h-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-[64px] border-l border-black/10 dark:border-white/10 shadow-2xl md:hidden flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 dark:border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/logo-vertical.png" 
                      alt="VB" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="h-7 w-7 object-contain"
                    />
                    <span className="font-display text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase">
                      VOXABOT
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-5.5 w-5.5" />
                  </button>
                </div>

                {/* Content Inside Drawer */}
                <div className="flex-1 overflow-y-auto space-y-5 px-6 py-6">
                  {/* Mobile Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search FAQs, services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold rounded-full border border-black/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0052FF]"
                    />
                    <Search className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-400" />
                  </div>

                  {/* Mobile Search Results */}
                  {searchQuery && (
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-[#111111] p-1.5 space-y-1">
                      {filteredResults.length > 0 ? (
                        filteredResults.map((res, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: idx * 0.03 }}
                            onClick={() => handleSearchResultSelect(res)}
                            className="w-full text-left p-2 rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors flex flex-col cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-800 dark:text-white line-clamp-1">{res.title}</span>
                              <span className="text-[8px] font-black uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded leading-none shrink-0 ml-2">
                                {res.type}
                              </span>
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <p className="text-[10px] text-center text-slate-400 py-2">No results matching "{searchQuery}"</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                            isActive 
                              ? 'bg-blue-50 dark:bg-blue-950/30 text-[#0052FF] dark:text-blue-400 border-l-2 border-[#0052FF]' 
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                          id={`mobile-nav-item-${item.id}`}
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-50" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Language Switcher */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-brand-dark/30 border border-black/5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-[#0052FF]" />
                      <span>Language / Langue</span>
                    </span>
                    <div className="flex gap-2">
                      {(['en', 'fr', 'es'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md border ${
                            language === lang
                              ? 'bg-[#0052FF] text-white border-transparent shadow-sm'
                              : 'bg-white dark:bg-black text-slate-600 dark:text-slate-300 border-black/10 dark:border-white/10'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions inside Sidebar (Sticky at Bottom) */}
                <div className="border-t border-black/10 dark:border-white/10 p-5 bg-white/40 dark:bg-black/40 backdrop-blur-md grid grid-cols-2 gap-3 shrink-0">
                  <button
                    onClick={() => handleNavClick('book-demo')}
                    className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-4 py-3 text-xs font-black uppercase tracking-tighter text-slate-800 dark:text-white hover:bg-slate-50 btn-heavy"
                    id="mobile-demo-btn-outline"
                  >
                    <Calendar className="h-4 w-4 text-[#0052FF]" />
                    <span>Book Demo</span>
                  </button>
                  <a
                    href="https://wa.me/2348145956772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] dark:bg-white dark:text-black dark:hover:bg-blue-600 dark:hover:text-white px-4 py-3 text-xs font-black uppercase tracking-tighter text-white shadow-md transition-all btn-heavy"
                    id="mobile-whatsapp-btn"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
