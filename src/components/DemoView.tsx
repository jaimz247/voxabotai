/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Send, 
  Sparkles, 
  Smartphone, 
  Mail, 
  User, 
  CheckCircle,
  Play,
  Activity,
  CalendarCheck2,
  AlertCircle
} from 'lucide-react';
import { DemoSubmission } from '../types';

export default function DemoView() {
  const [formData, setFormData] = useState({
    fullName: '',
    facilityName: '',
    role: '',
    whatsAppNumber: '',
    email: '',
    facilityType: 'Clinic',
    location: '',
    mainChallenge: 'Missed calls',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sandboxActive, setSandboxActive] = useState(false);
  const [sandboxState, setSandboxState] = useState<'idle' | 'answering' | 'completed'>('idle');
  const [sandboxMessages, setSandboxMessages] = useState<{ sender: 'patient' | 'ai' | 'system'; text: string; time: string }[]>([]);

  const facilityTypes = [
    'Private Clinic',
    'Specialist Practice',
    'Diagnostic Centre',
    'Medical Laboratory',
    'Imaging Centre',
    'Dental Clinic',
    'Eye/Aesthetic Clinic',
    'Multi-branch Lab/Hospital',
    'Other Outpatient Care',
  ];

  const mainChallenges = [
    { value: 'Missed calls', label: 'Missed inpatient/outpatient calls during busy hours' },
    { value: 'Slow WhatsApp replies', label: 'Delayed WhatsApp patient replies (dropoff rate)' },
    { value: 'Appointment booking', label: 'Fragmented or manual appointment booking flows' },
    { value: 'Patient reminders', label: 'Patients forgetting scheduled test or clinic visits' },
    { value: 'Lab result-status enquiries', label: 'Repetitive "Is my result ready?" phone calls' },
    { value: 'Test enquiries', label: 'Explaining test catalogue, fasting pre-reqs, and pricing' },
    { value: 'Sample collection requests', label: 'Capturing and routing home sample collections' },
    { value: 'Front-desk overload', label: 'Overwhelmed front desk teams doing repetitive desk work' },
    { value: 'Other', label: 'Other complex operational communication challenge' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate clinical database provisioning & setup
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSandboxActive(true);
      initializeSandbox();
    }, 2000);
  };

  const initializeSandbox = () => {
    setSandboxState('idle');
    const systemTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Injects a simulated conversation tailored exactly to their selected Facility Type and Main Challenge!
    setSandboxMessages([
      {
        sender: 'system',
        text: `🤖 Sandbox Trial Core initialized for [${formData.facilityName || 'Your Facility'}]. Testing automation flow for context error: "${formData.mainChallenge}".`,
        time: systemTime
      },
      {
        sender: 'patient',
        text: getInitialMessageByChallenge(formData.mainChallenge),
        time: systemTime
      }
    ]);
  };

  const getInitialMessageByChallenge = (challenge: string) => {
    switch (challenge) {
      case 'Missed calls':
        return 'Hello, I tried calling earlier but didn’t get an answer. Can I ask when you close? Or can I book for an appointment?';
      case 'Slow WhatsApp replies':
        return 'Good day, I wanted to schedule a consultation with the doctor, are there any slots today? Still awaiting a reply.';
      case 'Appointment booking':
        return 'Can I book an appointment for tomorrow around 10:00 AM? What are consultation charges?';
      case 'Patient reminders':
        return 'Do you send appointment reminders? I want to make sure I don’t forget my ultrasound visit scheduled next week.';
      case 'Lab result-status enquiries':
        return 'Hello, is my blood lipid panel test result ready yet? I did it yesterday morning.';
      case 'Test enquiries':
        return 'I need to do a fasting blood glucose test. Do I need to fast? How much is it?';
      case 'Sample collection requests':
        return 'Do you do home sample collection for tests? I am booking for an elderly parent who cannot visit the lab.';
      case 'Front-desk overload':
        return 'Hello, where is your clinic located? Do you accept HMO cards? Please reply soon, thanks.';
      default:
        return 'Are you open today? Can I ask about booking and test pricing?';
    }
  };

  const triggerAIResponse = () => {
    if (sandboxState !== 'idle') return;
    setSandboxState('answering');

    setTimeout(() => {
      const responseText = getAIResponseByChallenge(formData.mainChallenge, formData.facilityName);
      const systemTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setSandboxMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          time: systemTime
        },
        {
          sender: 'system',
          text: `⚡ Action Triggered: Auto-Logged to CRM • Alerts sent to administrative staff as [${formData.role}].`,
          time: systemTime
        }
      ]);
      setSandboxState('completed');
    }, 1800);
  };

  const getAIResponseByChallenge = (challenge: string, facility: string) => {
    const fn = facility || 'our facility';
    switch (challenge) {
      case 'Missed calls':
        return `Hello from ${fn} AI Front Desk! 👋 Apologies for missing your call—our physical front desk was extremely busy. We values your health. Yes, we are open until 6:00 PM today. Let's arrange that appointment! May I confirm your Full Name to help guide your request into our logs?`;
      case 'Slow WhatsApp replies':
        return `Hello! 👋 Fast response from ${fn} AI. Yes, we have standard clinic slots open this afternoon at 2:00 PM and 4:30 PM. Would you like us to assign either of these to you?`;
      case 'Appointment booking':
        return `Hello! 👋 We can absolutely assist with booking. Consultation fee is ₦15,000 for standard visits. May I collect your preferred time and full name to securely log this request?`;
      case 'Patient reminders':
        return `Welcome to ${fn} AI! 👋 Yes, we send automated WhatsApp confirmations and SMS reminders 24 hours before your appointment duration so you never miss a visit!`;
      case 'Lab result-status enquiries':
        return `Hello! 👋 I can check that for you. Lab results are completed securely. Could you please share your Lab Registration/ID Number? Our lab team will be notified with a status report instantly!`;
      case 'Test enquiries':
        return `Hello! 👋 Fast response. Yes, Fasting Blood Glucose is ₦2,500. Important preparation: please fast (do not eat or drink anything except pure water) for 8 to 12 hours before your sample collection tomorrow!`;
      case 'Sample collection requests':
        return `Welcome to ${fn} Lab Assistant! 🧪 Yes, we support automated expert home sample collection. Could you kindly share your area location, preferred date, and the list of tests? Our dispatch rider will be assigned immediately.`;
      case 'Front-desk overload':
        return `Hello! 👋 We are located at 1414 N Shepherd Drive. Yes, we accept all verified local HMO cards. Let us know if you would like me to book your diagnostic appointment today!`;
      default:
        return `Hello and welcome to ${fn} AI assistant. We are fully open. Let us know how we can assist with appointments, pricing, locations, or testing guides!`;
    }
  };

  return (
    <section className="relative z-10 py-24 bg-brand-dark/50" id="book-demo-section">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-140 w-140 rounded-full bg-[#0052FF]/2 blur-3xl opacity-50" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0052FF]" />
            <span>Voxabot Pilot Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
            {submitted ? 'Your Clinical Sandbox is Live!' : 'Request Your Healthcare AI Front Desk Demo'}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
            {submitted 
              ? 'Tell us about your facility challenge and instantly interact with a customized clinical AI mockup trained in real-time!' 
              : 'Tell us a little about your facility and we’ll show you a practical, highly customized demo styled around your operational workflow.'}
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl border border-black/10 bg-white p-8 sm:p-12 shadow-xl relative"
              >
                {/* Decorative border bar */}
                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-[#0052FF]" />
                
                <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] tracking-tight uppercase mb-2">Facility Details</h3>
                <p className="text-xs text-slate-500 font-semibold mb-8">All fields are securely captured under medical data-integrity protocols.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Full Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4.5 text-slate-400">
                          <User className="h-4.5 w-4.5" />
                        </span>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full rounded-full border border-black/15 bg-white py-3 pl-11.5 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                          placeholder="Dr. Sarah Johnson"
                        />
                      </div>
                    </div>

                    {/* Facility Name */}
                    <div className="space-y-2">
                      <label htmlFor="facilityName" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Facility Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4.5 text-slate-400">
                          <Building2 className="h-4.5 w-4.5" />
                        </span>
                        <input
                          type="text"
                          id="facilityName"
                          name="facilityName"
                          required
                          value={formData.facilityName}
                          onChange={handleInputChange}
                          className="w-full rounded-full border border-black/15 bg-white py-3 pl-11.5 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                          placeholder="St. Jude Outpatient Hub"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label htmlFor="role" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Your Role *</label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full rounded-full border border-black/15 bg-white py-3 px-5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                        placeholder="Clinic Manager / Chief Administrator"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-2">
                      <label htmlFor="whatsAppNumber" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">WhatsApp Number *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4.5 text-slate-400">
                          <Smartphone className="h-4.5 w-4.5" />
                        </span>
                        <input
                          type="tel"
                          id="whatsAppNumber"
                          name="whatsAppNumber"
                          required
                          value={formData.whatsAppNumber}
                          onChange={handleInputChange}
                          className="w-full rounded-full border border-black/15 bg-white py-3 pl-11.5 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Email Address *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4.5 text-slate-400">
                          <Mail className="h-4.5 w-4.5" />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-full border border-black/15 bg-white py-3 pl-11.5 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                          placeholder="manager@stjudehub.com"
                        />
                      </div>
                    </div>

                    {/* Facility Type dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="facilityType" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Facility Type *</label>
                      <select
                        id="facilityType"
                        name="facilityType"
                        value={formData.facilityType}
                        onChange={handleInputChange}
                        className="w-full rounded-full border border-black/15 bg-white py-3 px-5 text-sm text-slate-900 focus:border-[#0052FF] focus:outline-none transition-all cursor-pointer font-semibold"
                      >
                        {facilityTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="location" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Facility Location *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4.5 text-slate-400">
                          <MapPin className="h-4.5 w-4.5" />
                        </span>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full rounded-full border border-black/15 bg-white py-3 pl-11.5 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] focus:outline-none transition-all font-semibold"
                          placeholder="Lekki Phase 1, Lagos, Nigeria"
                        />
                      </div>
                    </div>

                    {/* Main Challenge Option */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="mainChallenge" className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">Main Operational Challenge *</label>
                      <select
                        id="mainChallenge"
                        name="mainChallenge"
                        value={formData.mainChallenge}
                        onChange={handleInputChange}
                        className="w-full rounded-full border border-black/15 bg-white py-3 px-5 text-sm text-slate-900 focus:border-[#0052FF] focus:outline-none transition-all cursor-pointer font-semibold"
                      >
                        {mainChallenges.map((challenge) => (
                          <option key={challenge.value} value={challenge.value}>
                            {challenge.label}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] hover:scale-105 active:scale-95 text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg"
                      id="demo-submit-btn"
                    >
                      {loading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <span>Request My Demo & Test Pilot</span>
                          <Send className="h-4.5 w-4.5 shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="sandbox-experience"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Success Card */}
                <div className="lg:col-span-12 xl:col-span-5 rounded-3xl border border-black/10 bg-white p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-[#0052FF]/2 rounded-full blur-3xl" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-[#0052FF]">
                      <CheckCircle className="h-6 w-6 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#0052FF] font-mono tracking-widest">Pilot Workspace Provisioned</span>
                      <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] tracking-tight uppercase mt-1">Stunning Success!</h3>
                    </div>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                      Thank you, <strong className="text-slate-900 font-extrabold">{formData.fullName}</strong>. We have set up a customized sandbox workspace for <span className="text-slate-900 font-extrabold">"{formData.facilityName}"</span>. 
                    </p>
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-black/5">
                        <CalendarCheck2 className="h-4.5 w-4.5 text-[#0052FF] shrink-0 mt-0.5" />
                        <div className="font-semibold">
                          <p className="text-slate-900 font-extrabold text-[13px]">Demo Invitation Code Issued</p>
                          <p className="text-slate-500 mt-0.5">Sent to WhatsApp: {formData.whatsAppNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-black/5">
                        <Mail className="h-4.5 w-4.5 text-[#0052FF] shrink-0 mt-0.5" />
                        <div className="font-semibold">
                          <p className="text-slate-900 font-extrabold text-[13px]">Workflow Outline Dispatched</p>
                          <p className="text-slate-500 mt-0.5">Sent to: {formData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSandboxActive(false);
                      }}
                      className="text-xs text-slate-500 hover:text-[#0052FF] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                      id="reset-form-btn"
                    >
                      ← submit another clinic?
                    </button>
                  </div>
                </div>

                {/* Chat Sandbox Simulator */}
                <div className="lg:col-span-12 xl:col-span-7 rounded-3xl border border-black/10 bg-white p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-10 bg-slate-100 border-b border-black/5 px-6 flex items-center justify-between z-10 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
                      <span className="font-bold text-[9px] text-slate-600 uppercase tracking-widest">{formData.facilityName || 'VOXABOT CLINIC'} SANDBOX</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-500">MODE: CLINICAL TEST</span>
                  </div>

                  {/* Chat logs screen */}
                  <div className="space-y-4 pt-10 pb-4 h-90 overflow-y-auto mb-4 flex flex-col justify-end mt-4">
                    {sandboxMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === 'patient' 
                            ? 'self-end items-end ml-auto' 
                            : msg.sender === 'ai' 
                            ? 'self-start items-start mr-auto'
                            : 'self-center items-center w-full max-w-full'
                        }`}
                      >
                        {msg.sender === 'system' ? (
                          <div className="bg-[#1A1A1A] text-white border border-transparent rounded-lg px-3.5 py-2 text-[10px] font-mono font-bold tracking-wider uppercase text-center w-full shadow-inner flex items-center justify-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-[#0052FF] shrink-0" />
                            <span>{msg.text}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-[9px] text-slate-500 mb-1 font-bold uppercase tracking-wider">{msg.sender === 'patient' ? 'OUTBOUND PATIENT' : 'VOXABOT CLINICAL AI'} • {msg.time}</span>
                            <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed font-semibold shadow-sm ${
                              msg.sender === 'patient'
                                ? 'bg-[#0052FF] text-white rounded-tr-none'
                                : 'bg-brand-medium border border-black/5 text-[#1A1A1A] rounded-tl-none'
                            }`}>
                              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* Typing state */}
                    {sandboxState === 'answering' && (
                      <div className="self-start flex flex-col max-w-[85%] items-start animate-pulse">
                        <span className="text-[9px] text-slate-500 mb-1 font-bold uppercase tracking-wider">VOXABOT CLINICAL AI IS TYPING...</span>
                        <div className="rounded-xl rounded-tl-none bg-brand-medium border border-black/5 px-4 py-2.5 text-xs text-slate-800 flex items-center gap-2">
                          <div className="flex gap-1 shrink-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.2s]" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.4s]" />
                          </div>
                          <span className="font-bold text-[10px] text-slate-600 uppercase tracking-wider">Processing context parameters</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulator Trigger controls */}
                  <div className="border-t border-black/5 pt-4">
                    {sandboxState === 'idle' ? (
                      <button
                        onClick={triggerAIResponse}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0052FF] hover:bg-blue-600 hover:scale-105 active:scale-95 text-white py-4.5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer shadow-lg"
                        id="trigger-sandbox-btn"
                      >
                        <Play className="h-4 w-4 text-white shrink-0 animate-pulse" />
                        <span>Simulate Immediate AI Response</span>
                      </button>
                    ) : sandboxState === 'answering' ? (
                      <div className="w-full border border-black/5 bg-slate-50 rounded-full py-4 text-xs font-bold text-slate-500 text-center select-none flex items-center justify-center gap-2 animate-pulse">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                        <span>AI Companion routing patient requirements...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-black/5 bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2 shadow-sm font-semibold">
                          <AlertCircle className="h-4 w-4 text-[#0052FF] shrink-0 mt-0.5" />
                          <p>This sandbox simulated how Voxabot AI responds instantly with precise clinical parameters, records details, and updates the dashboard.</p>
                        </div>
                        <button
                          onClick={initializeSandbox}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-[#F4F4F0] hover:bg-slate-100 text-slate-800 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                          id="reset-sandbox-btn"
                        >
                          Reset Test Simulation Flow
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
 
       </div>
     </section>
   );
}
