/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageSquareCode, PhoneCall, Calendar } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' as ActiveTab },
    { label: 'Clinic Front Desk AI', id: 'clinic-front-desk' as ActiveTab },
    { label: 'Lab Assistant AI', id: 'lab-assistant' as ActiveTab },
    { label: 'How It Works', id: 'how-it-works' as ActiveTab },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-brand-dark/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0052FF] text-white shadow-md shadow-blue-500/10 transition-transform group-hover:scale-105 group-hover:rotate-6 duration-300">
              <span className="font-display text-base font-black tracking-tighter leading-none">V</span>
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tighter text-[#1A1A1A] flex items-center gap-1 uppercase">
                VOXABOT <span className="text-white font-black text-[10px] tracking-widest px-2 py-0.5 rounded-full bg-[#1A1A1A]">AI</span>
              </span>
              <p className="text-[8px] text-[#0052FF] tracking-[0.15em] font-black uppercase leading-none mt-0.5">Automating Clinical Workflows</p>
            </div>
          </button>

          {/* Desktop Navigation Paths */}
          <nav className="hidden md:flex items-center gap-1 bg-brand-light/90 border border-black/5 rounded-full p-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer select-none ${
                    isActive ? 'text-[#1A1A1A]' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white border border-black/5 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Call to Actions on Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('book-demo')}
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs uppercase tracking-tighter font-black btn-heavy transition-all cursor-pointer shadow-sm ${
                activeTab === 'book-demo'
                  ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-[#1A1A1A] hover:bg-[#0052FF] text-white'
              }`}
              id="desktop-demo-btn"
            >
              <span>Book Demo</span>
              <Calendar className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Hamburger Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-black/5 hover:text-black transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-black/10 bg-white overflow-hidden"
            >
              <div className="space-y-1.5 px-4 pb-6 pt-3">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-[#0052FF] border-l-2 border-[#0052FF]' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                      id={`mobile-nav-item-${item.id}`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-50" />
                    </button>
                  );
                })}
                <div className="border-t border-black/10 pt-4 mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNavClick('book-demo')}
                    className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-tighter text-slate-800 hover:bg-slate-50 btn-heavy"
                    id="mobile-demo-btn-outline"
                  >
                    <Calendar className="h-4 w-4 text-[#0052FF]" />
                    <span>Book Demo</span>
                  </button>
                  <a
                    href="https://wa.me/2348145956772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] px-4 py-3 text-xs font-black uppercase tracking-tighter text-white shadow-md transition-all btn-heavy"
                    id="mobile-whatsapp-btn"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
