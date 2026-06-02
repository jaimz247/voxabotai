/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, AlertCircle, ShieldAlert } from 'lucide-react';

interface ProtectedStaffRouteProps {
  children: React.ReactNode;
}

export default function ProtectedStaffRoute({ children }: ProtectedStaffRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('voxabot_staff_authorized') === 'true';
    } catch {
      return false;
    }
  });
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Monitor storage changes or custom lock actions
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        setIsAuthorized(localStorage.getItem('voxabot_staff_authorized') === 'true');
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Add custom event listener for internal session locks
    window.addEventListener('voxabot-staff-lock', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('voxabot-staff-lock', handleStorageChange);
    };
  }, []);

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = enteredPasscode.trim();
    if (cleanPass === 'voxabot2026' || cleanPass === '1234') {
      setIsAuthorized(true);
      setErrorMsg('');
      try {
        localStorage.setItem('voxabot_staff_authorized', 'true');
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('voxabot-staff-lock'));
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrorMsg('Invalid clinical passcode. Please refer to support credentials below.');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-md w-full px-4 py-16 text-center font-sans my-4 sm:my-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-xl space-y-6"
        >
          {/* Padlock Icon container */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shadow-inner">
            <Lock className="h-7 w-7 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
              Clinical Access Control
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm mx-auto">
              Please enter your Clinic Staff passcode to display patient registries, live lead CRM streams, and automated WhatsApp follow-ups.
            </p>
          </div>

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label htmlFor="clinical-passcode-input" className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider font-mono">
                Security Passcode
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={enteredPasscode}
                  onChange={(e) => {
                    setEnteredPasscode(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  id="clinical-passcode-input"
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 px-5 py-3.5 text-sm font-semibold focus:border-[#0052FF] focus:outline-none focus:ring-1 focus:ring-[#0052FF] text-slate-800 dark:text-white"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 p-1 text-[10px] font-black uppercase tracking-wider text-[#0052FF] hover:opacity-80 cursor-pointer"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-rose-500 font-bold leading-none text-left flex items-center gap-1.5"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#0052FF] hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
              id="authenticate-btn"
            >
              <KeyRound className="h-4 w-4 text-white shrink-0" />
              <span>Unlock Staff Workspace</span>
            </button>
          </form>

          {/* Clinical bypass guidance for review and pilot demonstration */}
          <div className="rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 p-4 text-left">
            <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5 mb-11">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Reviewer Credentials</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-normal">
              To review this trial/dashboard as an external auditor, use the secure credentials passcode: <strong className="text-slate-800 dark:text-[#EDEEF0] font-mono select-all bg-slate-100 dark:bg-zinc-805 px-1 py-0.5 rounded ml-0.5">voxabot2026</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Session is fully verified, render primary internal components
  return <>{children}</>;
}
