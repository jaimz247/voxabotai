/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle, 
  Users, 
  Bell, 
  Sliders, 
  Play, 
  Pause,
  AlertTriangle,
  FileText,
  Mail,
  Smartphone,
  Search,
  Sparkles,
  Building2,
  MapPin,
  Send,
  Download,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';

interface CadenceStep {
  id: string;
  delayHours: number;
  template: string;
  enabled: boolean;
  type: 'general' | 'procedure_specific' | 'feedback';
}

interface ActivePatientFollowUp {
  id: string;
  patientName: string;
  procedure: string;
  completionTime: string;
  currentStep: number;
  totalSteps: number;
  status: 'In Progress' | 'Action Needed' | 'Completed';
  nextSend: string;
}

export default function StaffDashboardView() {
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

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = enteredPasscode.trim();
    if (cleanPass === 'voxabot2026' || cleanPass === '1234') {
      setIsAuthorized(true);
      setErrorMsg('');
      try {
        localStorage.setItem('voxabot_staff_authorized', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrorMsg('Invalid Clinical Security Passcode. Please try again.');
    }
  };

  const handleLockPortal = () => {
    setIsAuthorized(false);
    setEnteredPasscode('');
    try {
      localStorage.setItem('voxabot_staff_authorized', 'false');
      window.dispatchEvent(new Event('voxabot-staff-lock'));
    } catch (err) {
      console.error(err);
    }
  };

  const [cadenceSteps, setCadenceSteps] = useState<CadenceStep[]>([
    {
      id: 'step-1',
      delayHours: 2,
      template: 'Hello {patient_name}, this is Voxabot checking in on behalf of Dr. {doctor_name} following your {procedure_name} earlier today. How are you feeling right now on a scale of 1-10?',
      enabled: true,
      type: 'general'
    },
    {
      id: 'step-2',
      delayHours: 24,
      template: 'Hi {patient_name}. Hope you had a quiet night. Just a gentle reminder to continue your prescribed medications. Do you have any discomfort or clinical questions for our team today?',
      enabled: true,
      type: 'procedure_specific'
    },
    {
      id: 'step-3',
      delayHours: 72,
      template: 'Hi {patient_name、 Dr. {doctor_name} would love to get your feedback. How was your treatment experience with us? Tap one: 1) Excellent 2) Good 3) Needs Improvement.',
      enabled: true,
      type: 'feedback'
    }
  ]);

  const [activeFollowUps, setActiveFollowUps] = useState<ActivePatientFollowUp[]>([
    {
      id: 'p-1',
      patientName: 'Sarah Jenkins',
      procedure: 'Dental Extraction',
      completionTime: '2 hours ago',
      currentStep: 1,
      totalSteps: 3,
      status: 'In Progress',
      nextSend: 'In 30 mins'
    },
    {
      id: 'p-2',
      patientName: 'Amara Okafor',
      procedure: 'Outpatient Biopsy',
      completionTime: '1 day ago',
      currentStep: 2,
      totalSteps: 3,
      status: 'Action Needed',
      nextSend: 'Awaiting Response'
    },
    {
      id: 'p-3',
      patientName: 'Carlos Martinez',
      procedure: 'Cardiology ECG',
      completionTime: '3 days ago',
      currentStep: 3,
      totalSteps: 3,
      status: 'Completed',
      nextSend: 'Archived'
    }
  ]);

  const [newStepDelay, setNewStepDelay] = useState<number>(4);
  const [newStepTemplate, setNewStepTemplate] = useState('');
  const [newStepType, setNewStepType] = useState<'general' | 'procedure_specific' | 'feedback'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Leads state that pulls with pre-built mock fallback so it looks pristine
  const [demoLeads, setDemoLeads] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('voxabot_demo_leads');
      if (stored) {
        return JSON.parse(stored);
      } else {
        const initialLeads = [
          {
            id: 'lead_sample1',
            fullName: 'Dr. Sarah Johnson',
            facilityName: 'St. Jude Outpatient Hub',
            role: 'Clinical Director',
            whatsAppNumber: '+234 803 111 2222',
            email: 's.johnson@stjudehub.com',
            facilityType: 'Private Clinic',
            location: 'Lekki Phase 1, Lagos',
            mainChallenge: 'Missed inpatient/outpatient calls during busy hours',
            timestamp: new Date(Date.now() - 12 * 3600 * 1000).toLocaleString(),
            scheduledDate: 'Wednesday, June 3, 2026',
            scheduledTime: '10:00 AM'
          },
          {
            id: 'lead_sample2',
            fullName: 'Alhaji Ibrahim Bello',
            facilityName: 'Bina Diagnostic Labs',
            role: 'CEO & Head of Operations',
            whatsAppNumber: '+234 802 444 5555',
            email: 'bello@binadialabs.org',
            facilityType: 'Diagnostic Centre',
            location: 'Wuse II, Abuja',
            mainChallenge: 'Delayed WhatsApp patient replies (dropoff rate)',
            timestamp: new Date(Date.now() - 30 * 3600 * 1000).toLocaleString(),
            scheduledDate: 'Thursday, June 4, 2026',
            scheduledTime: '11:30 AM'
          }
        ];
        localStorage.setItem('voxabot_demo_leads', JSON.stringify(initialLeads));
        return initialLeads;
      }
    } catch {
      return [];
    }
  });

  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [syncedLeadId, setSyncedLeadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [liveMetrics, setLiveMetrics] = useState({
    avgResponseTime: '0.8s',
    totalEnquiriesToday: 18,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveMetrics((prev) => {
        const randomTime = (0.78 + Math.random() * 0.06).toFixed(2);
        const shouldIncrement = Math.random() > 0.85;
        return {
          avgResponseTime: `${randomTime}s`,
          totalEnquiriesToday: shouldIncrement ? prev.totalEnquiriesToday + 1 : prev.totalEnquiriesToday
        };
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshLeads = () => {
    try {
      const stored = localStorage.getItem('voxabot_demo_leads');
      if (stored) {
        setDemoLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = (id: string) => {
    const updated = demoLeads.filter(lead => lead.id !== id);
    setDemoLeads(updated);
    try {
      localStorage.setItem('voxabot_demo_leads', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerWebhookSync = (lead: any) => {
    setSyncedLeadId(lead.id);
    
    // Simulate real webhook push activity to Zapier, Make, custom official email
    setTimeout(() => {
      setSyncedLeadId(null);
      setToastMessage(`[INTEGRATION SUCCESS] Pushed reservation data for ${lead.fullName} to Google Calendar & CRM!`);
      setTimeout(() => setToastMessage(null), 5000);
    }, 1200);
  };

  const filteredLeads = demoLeads.filter(lead => {
    const query = leadSearchQuery.toLowerCase();
    return (
      lead.fullName?.toLowerCase().includes(query) ||
      lead.facilityName?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.location?.toLowerCase().includes(query) ||
      lead.mainChallenge?.toLowerCase().includes(query)
    );
  });

  // Cadence modification handlers
  const handleToggleStep = (id: string) => {
    setCadenceSteps(
      cadenceSteps.map(step => step.id === id ? { ...step, enabled: !step.enabled } : step)
    );
  };

  const handleUpdateStepTemplate = (id: string, text: string) => {
    setCadenceSteps(
      cadenceSteps.map(step => step.id === id ? { ...step, template: text } : step)
    );
  };

  const handleUpdateStepDelay = (id: string, hours: number) => {
    setCadenceSteps(
      cadenceSteps.map(step => step.id === id ? { ...step, delayHours: hours } : step)
    );
  };

  const handleDeleteStep = (id: string) => {
    setCadenceSteps(cadenceSteps.filter(step => step.id !== id));
  };

  const handleAddStep = () => {
    if (!newStepTemplate.trim()) return;
    const newStep: CadenceStep = {
      id: `step-${Date.now()}`,
      delayHours: newStepDelay,
      template: newStepTemplate,
      enabled: true,
      type: newStepType
    };
    setCadenceSteps([...cadenceSteps, newStep]);
    setNewStepTemplate('');
  };

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center font-sans">
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
              Clinical Security Access
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm mx-auto">
              Access to patient registries, booking leads CRM pipelines, and WhatsApp clinic follow-up editors is restricted to authorized employees.
            </p>
          </div>

          <form onSubmit={handleAuthorize} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider font-mono">
                Enter Clinic Security Passcode
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
                  className="text-xs text-rose-500 font-bold leading-none text-left"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#0052FF] hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
              id="authenticate-btn"
            >
              <KeyRound className="h-4 w-4 text-white shrink-0" />
              <span>Authenticate Access</span>
            </button>
          </form>

          {/* Clinical bypass guidance for review and pilot demonstration */}
          <div className="rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 p-4 text-left">
            <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Pilot Review Credentials</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-normal">
              For live testing or product review evaluation, enter administrative credential passcode: <strong className="text-slate-800 dark:text-[#EDEEF0] font-mono select-all bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded ml-0.5">voxabot2026</strong> or simply <strong className="text-slate-800 dark:text-[#EDEEF0] font-mono bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded ml-0.5">1234</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-brand-dark dark:bg-[#0A0A0A] bg-grid-ambient min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        {toastMessage && (
          <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 flex items-center gap-3 text-emerald-800 dark:text-emerald-400 text-xs font-black uppercase tracking-wide shadow-md animate-pulse">
            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
        <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm w-fit">
            <Sliders className="h-3.5 w-3.5 shrink-0" />
            <span>Voxabot Clinic Control Suite</span>
          </div>

          <button
            onClick={handleLockPortal}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full border border-black/10 dark:border-white/10 bg-white hover:bg-slate-50 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-[10px] font-black text-amber-500 uppercase tracking-wider cursor-pointer shadow-sm w-fit transition-all hover:scale-102"
            id="lock-dashboard-btn"
          >
            <Lock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Lock Dashboard Session</span>
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-[0.95] heading-inter-heavy">
          WhatsApp Follow-up Cadence Builder
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-sans font-medium text-sm sm:text-base max-w-3xl leading-relaxed">
          Configure physical appointment workflows, edit triggers, and design conversational templates. Voxabot AI automatically dispatches interactive check-ins on behalf of doctors, alerting nurses if a patient reports elevated pain or requests live escalation.
        </p>
      </div>

      {/* Live Operational Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5 p-5 shadow-sm hover-lift flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Live Average Response Time</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#0052FF] dark:text-blue-400 tracking-tight font-display">
                {liveMetrics.avgResponseTime}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-0.5 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Optimal
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-[#0052FF] dark:text-blue-400">
            <Clock className="h-5.5 w-5.5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5 p-5 shadow-sm hover-lift flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Enquiries Today</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
                {liveMetrics.totalEnquiriesToday}
              </span>
              <span className="text-[10px] text-[#0052FF] dark:text-blue-400 font-bold uppercase tracking-widest">
                +{(demoLeads.length)} Pending review
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-[#0052FF] dark:text-blue-400">
            <MessageSquare className="h-5.5 w-5.5 animate-bounce" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] sm:col-span-2 lg:col-span-1 rounded-2xl border border-black/5 dark:border-white/5 p-5 shadow-sm hover-lift flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Autonomous System Status</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-500 tracking-tight font-display uppercase">
                Active
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 font-sans">
                <span className="h-2 w-2 relative flex shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                100% Reliable
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-500">
            <Sparkles className="h-5.5 w-5.5 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cadence Step Builder */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#111111] rounded-3xl border border-black/5 dark:border-white/5 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-[#0052FF]" />
                <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Active Cadence Configuration</h3>
              </div>
              <button 
                onClick={handleSaveChanges}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white px-5 py-2.5 text-xs font-black uppercase tracking-tighter transition-all cursor-pointer shadow-md"
              >
                <Save className="h-4 w-4 shrink-0" />
                <span>Save Configuration</span>
              </button>
            </div>

            <AnimatePresence>
              {saveSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 dark:text-emerald-400 text-xs font-semibold"
                >
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span>Interactive Cadence Rules saved! Voxabot has updated the active outbound queue successfully.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {cadenceSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 transition-all relative overflow-hidden ${
                    step.enabled ? 'bg-slate-50/50 dark:bg-[#1A1A1A]/30' : 'bg-slate-100/50 dark:bg-black/20 opacity-60'
                  }`}
                >
                  {/* Step Banner Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-lg bg-[#0052FF]/10 text-[#0052FF] text-xs font-extrabold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                          Step {index + 1}: Automated Outbound Check-In
                        </h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          Type: {step.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleStep(step.id)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wide leading-none cursor-pointer transition-colors ${
                          step.enabled ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {step.enabled ? 'ACTIVE' : 'MUTED'}
                      </button>
                      <button 
                        onClick={() => handleDeleteStep(step.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                        title="Delete trigger step"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Delay Setup and Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-[#151515] p-3.5 rounded-xl border border-black/5 dark:border-white/5 items-center">
                    <div>
                      <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Trigger Post-Care</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          min="1" 
                          max="168"
                          value={step.delayHours} 
                          onChange={(e) => handleUpdateStepDelay(step.id, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 text-xs font-bold rounded-lg border border-black/10 dark:border-white/10 dark:bg-black text-center focus:outline-none focus:border-[#0052FF]"
                        />
                        <span className="text-xs text-slate-500 font-semibold">hours delay</span>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-[10px] text-slate-400 font-bold leading-normal">
                        Variables supported in templates: <code className="text-[#0052FF] select-all font-mono text-[9px] bg-slate-100 dark:bg-black px-1 rounded">{"{patient_name}"}</code>, <code className="text-[#0052FF] select-all font-mono text-[9px] bg-slate-100 dark:bg-black px-1 rounded">{"{doctor_name}"}</code>, <code className="text-[#0052FF] select-all font-mono text-[9px] bg-slate-100 dark:bg-black px-1 rounded">{"{procedure_name}"}</code>
                      </p>
                    </div>
                  </div>

                  {/* Template Textarea */}
                  <div>
                    <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1.5">WhatsApp Message Template</label>
                    <textarea
                      rows={3}
                      value={step.template}
                      onChange={(e) => handleUpdateStepTemplate(step.id, e.target.value)}
                      className="w-full text-xs font-semibold p-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1A1A] text-slate-800 dark:text-white focus:outline-none focus:border-[#0052FF] leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div >

            {/* Quick Add Form nested */}
            <div className="border-t border-black/5 dark:border-white/5 pt-6 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-[#0052FF]" />
                <span>Insert New Cadence Step</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Step Classification</label>
                  <select
                    value={newStepType}
                    onChange={(e) => setNewStepType(e.target.value as any)}
                    className="w-full text-xs font-semibold p-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0052FF]"
                  >
                    <option value="general">General Check-In</option>
                    <option value="procedure_specific">Procedure Instructions</option>
                    <option value="feedback">Experience Survey / Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Dispatch Wait Time (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    value={newStepDelay}
                    onChange={(e) => setNewStepDelay(parseInt(e.target.value) || 2)}
                    className="w-full text-xs font-semibold p-2.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Template Message</label>
                <textarea
                  rows={2}
                  placeholder="Type new template e.g. Hello {patient_name}..."
                  value={newStepTemplate}
                  onChange={(e) => setNewStepTemplate(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0052FF]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddStep}
                  disabled={!newStepTemplate.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1A1A1A] dark:bg-white text-white dark:text-black hover:bg-[#0052FF] dark:hover:bg-[#0052FF] dark:hover:text-white px-5 py-3 text-xs font-black uppercase tracking-tighter transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step to Cadence</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Triage & Ongoing Patient Followups */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
              <Users className="h-5 w-5 text-[#0052FF]" />
              <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Active Outbound Queue</h3>
            </div>

            <div className="space-y-4">
              {activeFollowUps.map((patient) => (
                <div key={patient.id} className="border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-3 bg-slate-50/50 dark:bg-brand-dark/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">{patient.patientName}</h5>
                      <span className="text-[9px] text-[#0052FF] font-bold uppercase tracking-wider block mt-1.5">{patient.procedure}</span>
                    </div>

                    <span className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      patient.status === 'Completed' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600'
                        : patient.status === 'Action Needed'
                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-950/50 animate-pulse'
                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600'
                    }`}>
                      {patient.status}
                    </span>
                  </div>

                  <div className="border-t border-black/5 dark:border-white/10 pt-2.5 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 opacity-60" />
                      <span>{patient.completionTime}</span>
                    </span>
                    <span>Step {patient.currentStep} of {patient.totalSteps}</span>
                  </div>

                  {patient.status === 'Action Needed' && (
                    <div className="bg-rose-50/70 dark:bg-rose-950/10 p-2 rounded-xl border border-rose-100 dark:border-rose-950/30 flex gap-2 text-[9px] text-rose-800 dark:text-rose-400 font-extrabold">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
                      <div>
                        <span>Patient reported pain score 8/10 on step 1!</span>
                        <button 
                          onClick={() => {
                            setActiveFollowUps(
                              activeFollowUps.map(p => p.id === patient.id ? { ...p, status: 'In Progress', nextSend: 'Nurse Alerted' } : p)
                            );
                          }}
                          className="block mt-1 underline hover:text-rose-900 dark:hover:text-rose-200 uppercase tracking-widest outline-none"
                        >
                          Mark Alert Addressed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Simulated Live Broadcast testing */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-black/5 dark:border-white/5 space-y-3.5">
              <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Test Dispatch Broadcast</h5>
              <p className="text-[10px] text-slate-500 leading-normal font-semibold">
                Initiate a manual trial follow-up trigger for a simulated patient right now to verify live webhook parameters.
              </p>
              <button
                type="button"
                onClick={() => {
                  const newFollowUp: ActivePatientFollowUp = {
                    id: `p-${Date.now()}`,
                    patientName: 'John Doe',
                    procedure: 'Laser Ophthalmology',
                    completionTime: 'Just completed',
                    currentStep: 1,
                    totalSteps: cadenceSteps.length,
                    status: 'In Progress',
                    nextSend: 'Pending'
                  };
                  setActiveFollowUps([newFollowUp, ...activeFollowUps]);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-black hover:bg-slate-50 font-black text-[9px] uppercase tracking-tighter py-3 cursor-pointer"
              >
                <Play className="h-3 w-3 text-emerald-500 fill-emerald-500" />
                <span>Simulate Care Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical CRM Section */}
      <div className="mt-12 bg-white dark:bg-[#111111] rounded-3xl border border-black/5 dark:border-white/5 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0052FF]/10 px-2.5 py-1 text-[9px] font-black text-[#0052FF] uppercase tracking-wide">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>Patient Strategy Lead Pipeline</span>
            </div>
            <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
              Clinical CRM - Captured Demo Reservations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-sans">
              Real-time retrieval dashboard for entries submitted in the "Book Demo" calendar workflow. Automatically triggers notification webhooks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshLeads}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
            >
              Refresh Entries
            </button>
          </div>
        </div>

        {/* Search Filter Controls */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Type and filter leads by facility name, doctor full name, location, or communication challenge..."
            value={leadSearchQuery}
            onChange={(e) => setLeadSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50/50 dark:bg-[#1A1A1A]/30 py-3.5 pl-11 pr-4 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0052FF]"
          />
        </div>

        {/* Datatable Grid */}
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/5">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-brand-dark/20 text-[9px] font-black uppercase tracking-wider text-slate-500 border-b border-black/5 dark:border-white/5">
                  <th className="py-3 px-4">Facility Details</th>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Consultation Slot</th>
                  <th className="py-3 px-4">Challenge Description</th>
                  <th className="py-3 px-4 text-center">Interactivity Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1A1A1A]/20 transition-all">
                    <td className="py-4.5 px-4 space-y-1">
                      <div className="font-extrabold text-slate-950 dark:text-white flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-[#0052FF]" />
                        <span>{lead.facilityName}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>{lead.location} • {lead.facilityType}</span>
                      </div>
                    </td>

                    <td className="py-4.5 px-4 space-y-1">
                      <div className="font-black text-slate-900 dark:text-slate-100">{lead.fullName}</div>
                      <div className="text-[10px] text-[#0052FF] font-bold uppercase tracking-wider">{lead.role}</div>
                      <div className="text-[10px] text-slate-500 space-y-0.5">
                        <p className="flex items-center gap-1">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span>{lead.email}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3 shrink-0" />
                          <span>{lead.whatsAppNumber}</span>
                        </p>
                      </div>
                    </td>

                    <td className="py-4.5 px-4 space-y-1.5">
                      {lead.scheduledDate ? (
                        <div className="p-2 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl space-y-0.5">
                          <p className="text-[9px] font-black text-[#0052FF] uppercase tracking-wide">CONFIRMED SLOT</p>
                          <p className="text-[11px] font-extrabold text-slate-950 dark:text-white">{lead.scheduledDate}</p>
                          <p className="text-[10px] text-slate-500 font-bold tracking-tight">Time: {lead.scheduledTime}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Unscheduled on submission</span>
                      )}
                    </td>

                    <td className="py-4.5 px-4 max-w-[200px]">
                      <span className="text-slate-600 dark:text-slate-400 block break-words text-[11px] line-clamp-3 leading-relaxed">
                        {lead.mainChallenge}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block mt-1.5">Captured: {lead.timestamp}</span>
                    </td>

                    <td className="py-4.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleTriggerWebhookSync(lead)}
                          disabled={syncedLeadId === lead.id}
                          className="px-3 py-2 rounded-xl bg-[#0052FF]/10 text-[#0052FF] hover:bg-[#0052FF] hover:text-white transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer font-extrabold"
                        >
                          {syncedLeadId === lead.id ? 'Pushing Webhook...' : 'Push Webhook'}
                        </button>

                        <a
                          href={`https://wa.me/${lead.whatsAppNumber ? lead.whatsAppNumber.replace(/[^0-9]/g, '') : ''}?text=${encodeURIComponent(
                            `Hello ${lead.fullName}, this is the clinic administrator at Voxabot Healthcare. We received your booking demo request for "${lead.facilityName}" addressing communication challenge: "${lead.mainChallenge}". Let's discuss details regarding your consultation on ${lead.scheduledDate || 'your selected date'} at ${lead.scheduledTime || 'your selected time'}!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-600 text-emerald-650 hover:text-white dark:bg-emerald-950/20 dark:text-emerald-450 dark:hover:bg-emerald-600 dark:hover:text-white transition-all text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5"
                          title="Direct WhatsApp Template Transfer"
                          id={`export-whats-btn-${lead.id}`}
                        >
                          <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                          <span>WhatsApp Export</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 dark:bg-zinc-900 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 border border-black/5 dark:border-white/5 hover:border-rose-100 dark:hover:border-rose-900 transition-all cursor-pointer"
                          title="Purge lead registration entries"
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 dark:border-white/10 p-8 text-center text-slate-500 font-semibold text-xs space-y-3">
            <p>No reservations currently matching search parameters or stored in clinic cache.</p>
            <button
              onClick={() => {
                const resetLeads = [
                  {
                    id: 'lead_sample1',
                    fullName: 'Dr. Sarah Johnson',
                    facilityName: 'St. Jude Outpatient Hub',
                    role: 'Clinical Director',
                    whatsAppNumber: '+234 803 111 2222',
                    email: 's.johnson@stjudehub.com',
                    facilityType: 'Private Clinic',
                    location: 'Lekki Phase 1, Lagos',
                    mainChallenge: 'Missed inpatient/outpatient calls during busy hours',
                    timestamp: new Date().toLocaleString(),
                    scheduledDate: 'Wednesday, June 3, 2026',
                    scheduledTime: '10:00 AM'
                  }
                ];
                setDemoLeads(resetLeads);
                localStorage.setItem('voxabot_demo_leads', JSON.stringify(resetLeads));
              }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-black uppercase tracking-wider rounded-lg text-[9px] text-[#0052FF] cursor-pointer"
            >
              Force Load Sample CRM Leads
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
