/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
  FileText
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-left">
      <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
          <Sliders className="h-3.5 w-3.5 shrink-0" />
          <span>Voxabot Clinic Control Suite</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-[0.95] heading-inter-heavy">
          WhatsApp Follow-up Cadence Builder
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-sans font-medium text-sm sm:text-base max-w-3xl leading-relaxed">
          Configure physical appointment workflows, edit triggers, and design conversational templates. Voxabot AI automatically dispatches interactive check-ins on behalf of doctors, alerting nurses if a patient reports elevated pain or requests live escalation.
        </p>
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
    </div>
  );
}
