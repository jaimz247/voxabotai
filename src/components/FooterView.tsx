/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, ShieldCheck, HeartPulse, ExternalLink, ArrowRight, MessageSquareCode } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function FooterView({ setActiveTab }: FooterViewProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950 pt-20 pb-12 overflow-hidden">
      {/* Absolute background graphics */}
      <div className="absolute -bottom-80 left-1/3 -z-10 h-120 w-120 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute top-12 left-10 -z-10 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-cyan-400 shadow-md">
                <MessageSquareCode className="h-5.5 w-5.5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Voxabot<span className="text-emerald-400">AI</span>
                </span>
                <p className="text-[10px] text-slate-400 tracking-wider uppercase">Clinical Communication Assistant </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Never miss another patient opportunity. Empowering healthcare clinics, diagnostic centers, and hospitals with automated 24/7 front desk flows.
            </p>

            <div className="flex flex-col gap-3.5 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <span>Fully compliant operational workflows logs</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                <span>Supports healthcare staff, never replaces clinical judgment</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">Solutions</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => handleNavClick('clinic-front-desk')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  id="footer-link-clinic"
                >
                  <span>Clinic Front Desk AI</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('lab-assistant')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  id="footer-link-lab"
                >
                  <span>Lab Assistant AI</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('how-it-works')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  id="footer-link-how"
                >
                  <span>How It Works</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('book-demo')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  id="footer-link-demo"
                >
                  <span>Request Custom Pilot</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">Connect with Us</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4 space-y-3">
                <a 
                  href="https://wa.me/2348145956772" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">WhatsApp 24/7</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-emerald-400 transition-colors">+234 814 595 6772</p>
                  </div>
                </a>

                <div className="border-t border-white/5 my-2.5"></div>

                <a 
                  href="mailto:teamlead@voxabotai.com" 
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Email Business Inquiries</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">teamlead@voxabotai.com</p>
                  </div>
                </a>

                <div className="border-t border-white/5 my-2.5"></div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    <ExternalLink className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Domain</p>
                    <p className="text-sm font-medium text-slate-300">voxabotai.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal and disclaimer notice */}
        <div className="border-t border-white/5 pt-8 text-xs text-slate-500 space-y-4">
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-400">Important Operational & Clinical Disclaimer:</span>{' '}
            Voxabot AI is designed to support patient operational communication, administrative front-desk support, sample registration, appointment workflows, reminders, and generic outpatient FAQ routing. 
            <strong> Voxabot AI is not a diagnostic system, does not prescribe medication, does not interpret medical laboratory result files clinically, and never replaces qualified doctors, nurses, pathologists, or clinical personnel.</strong> All clinical inquiries, diagnostic files interpretation, or acute clinical symptoms are automatically flagged and securely escalated to our clients' healthcare professionals instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <p>
              &copy; {currentYear} Voxabot AI. All rights reserved. Designed for high-performing clinic and diagnostic laboratory operations.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-500">HIPAA Compliant Data Integrity Protocols</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-500">SSL Encrypted WhatsApp Workflows</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
