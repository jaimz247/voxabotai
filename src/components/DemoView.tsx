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
  AlertCircle,
  Calendar,
  Lock,
  ArrowRight,
  Volume2
} from 'lucide-react';
import { DemoSubmission, ActiveTab } from '../types';
import VoxabotVoiceAgent from './VoxabotVoiceAgent';

interface DemoViewProps {
  setActiveTab?: (tab: ActiveTab) => void;
}

export default function DemoView({ setActiveTab }: DemoViewProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    facilityName: '',
    role: '',
    whatsAppNumber: '',
    email: '',
    facilityType: 'Private Clinic',
    location: '',
    mainChallenge: 'Missed calls',
  });

  const [formStep, setFormStep] = useState<'details' | 'calendar'>('details');
  const [selectedDate, setSelectedDate] = useState<string>('23-06-03'); // default target date format or day representation
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [routingEmail, setRoutingEmail] = useState<string>('hello@voxabot.ai');
  const [notifyByEmail, setNotifyByEmail] = useState<boolean>(true);
  const [notifiedEmailStatus, setNotifiedEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [schedulerMode, setSchedulerMode] = useState<'iframe' | 'mock'>('iframe');
  const [schedulerLink, setSchedulerLink] = useState('https://calendly.com/voxabot-ai/demo-consultation');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sandboxActive, setSandboxActive] = useState(false);
  const [sandboxState, setSandboxState] = useState<'idle' | 'answering' | 'completed'>('idle');
  const [sandboxMessages, setSandboxMessages] = useState<{ sender: 'patient' | 'ai' | 'system'; text: string; time: string }[]>([]);

  // Five high-converting available calendar dates for active simulation
  const availableCalendarDates = [
    { id: '23-06-03', label: 'Wed', day: '03', month: 'Jun', fullName: 'Wednesday, June 3, 2026', slots: ['09:00 AM', '10:00 AM', '11:15 AM', '02:00 PM', '04:30 PM'] },
    { id: '23-06-04', label: 'Thu', day: '04', month: 'Jun', fullName: 'Thursday, June 4, 2026', slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
    { id: '23-06-05', label: 'Fri', day: '05', month: 'Jun', fullName: 'Friday, June 5, 2026', slots: ['08:30 AM', '11:00 AM', '12:15 PM', '02:30 PM', '04:00 PM'] },
    { id: '23-06-08', label: 'Mon', day: '08', month: 'Jun', fullName: 'Monday, June 8, 2026', slots: ['09:30 AM', '10:45 AM', '01:30 PM', '03:15 PM', '04:45 PM'] },
    { id: '23-06-09', label: 'Tue', day: '09', month: 'Jun', fullName: 'Tuesday, June 9, 2026', slots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:30 PM'] },
  ];

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

  const handleProceedToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('calendar');
    
    // Automatically pre-select first valid slot of first date
    setSelectedDate(availableCalendarDates[0].id);
    setSelectedTimeSlot(availableCalendarDates[0].slots[0]);
  };

  const handleConfirmReservation = () => {
    setLoading(true);
    setNotifiedEmailStatus('sending');

    const selectedDayObj = availableCalendarDates.find(d => d.id === selectedDate) || availableCalendarDates[0];

    // Build the new lead submission profile with specific calendar metadata
    const leadRecord: DemoSubmission = {
      id: `lead_${Date.now()}`,
      fullName: formData.fullName,
      facilityName: formData.facilityName,
      role: formData.role,
      whatsAppNumber: formData.whatsAppNumber,
      email: formData.email,
      facilityType: formData.facilityType,
      location: formData.location,
      mainChallenge: formData.mainChallenge,
      timestamp: new Date().toLocaleString(),
      scheduledDate: selectedDayObj.fullName,
      scheduledTime: selectedTimeSlot
    };

    // Store securely into local storage CRM repository
    try {
      const storedLeads = localStorage.getItem('voxabot_demo_leads');
      const leadsList = storedLeads ? JSON.parse(storedLeads) : [];
      localStorage.setItem('voxabot_demo_leads', JSON.stringify([leadRecord, ...leadsList]));
    } catch (err) {
      console.error('Failed to append to Local CRM array:', err);
    }

    // Simulate reliable CRM & Email push actions (can be connected to official email via post request easily)
    setTimeout(() => {
      setNotifiedEmailStatus('sent');
      setLoading(false);
      setSubmitted(true);
      setSandboxActive(true);
      initializeSandbox();
    }, 1800);
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
                key={formStep === 'details' ? 'booking-form-details' : 'booking-form-calendar'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 md:p-12 shadow-xl relative"
              >
                {/* Decorative border bar */}
                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-[#0052FF]" />
                
                {formStep === 'details' ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] tracking-tight uppercase">Step 1: Facility Questionnaire</h3>
                        <p className="text-xs text-slate-500 font-semibold">Captured under strict medical encryption standards.</p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>Page 1 of 2</span>
                      </div>
                    </div>

                    <form onSubmit={handleProceedToCalendar} className="space-y-6">
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
                          className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] hover:scale-105 active:scale-95 text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg"
                          id="demo-submit-btn"
                        >
                          <span>Proceed to Calendar Reservation</span>
                          <ArrowRight className="h-4.5 w-4.5 shrink-0" />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] tracking-tight uppercase flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-[#0052FF]" />
                          <span>Step 2: Reserve Strategy Slot</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold text-left">Synchronizes with your Calendar for direct integration.</p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0052FF]/10 px-3 py-1.5 text-[10px] font-bold text-[#0052FF] uppercase tracking-wider">
                        <span>Page 2 of 2</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                      {/* Left Sidebar inside Calendar: Captured Details Summary & Notification Settings */}
                      <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-black/5 flex flex-col justify-between space-y-5">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Booking Context DNA</h4>
                          
                          <div className="space-y-3 font-semibold text-xs">
                            <div className="p-2.5 rounded-lg bg-white border border-black/5">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Facility Interest</span>
                              <span className="text-slate-950 font-extrabold">{formData.facilityName || 'My Outpatient Clinic'}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white border border-black/5">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Contact Agent</span>
                              <span className="text-slate-950 font-extrabold">{formData.fullName} ({formData.role})</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-white border border-black/5">
                              <span className="text-[9px] uppercase text-slate-400 block mb-0.5">Main Challenge</span>
                              <span className="text-slate-950 font-extrabold block truncate">{formData.mainChallenge}</span>
                            </div>
                          </div>
                        </div>

                        {/* Notification parameters setup block */}
                        <div className="border-t border-black/5 pt-4 space-y-3.5">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-[#0052FF]" />
                            <span>Dispatch Alerts Config</span>
                          </h4>

                          <div className="space-y-3">
                            <div>
                              <label htmlFor="routingEmail" className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Official Notification Email</label>
                              <input 
                                type="email"
                                id="routingEmail"
                                name="routingEmail"
                                value={routingEmail}
                                onChange={(e) => setRoutingEmail(e.target.value)}
                                className="w-full text-xs font-semibold p-2 rounded-lg border border-black/10 bg-white focus:outline-none focus:border-[#0052FF]"
                                placeholder="official-leads@yourclinic.com"
                              />
                            </div>

                            <label className="flex items-start gap-2.5 cursor-pointer text-[10px] font-semibold text-slate-600">
                              <input 
                                type="checkbox"
                                checked={notifyByEmail}
                                onChange={(e) => setNotifyByEmail(e.target.checked)}
                                className="mt-0.5 accent-[#0052FF]"
                              />
                              <span>Simulate sending instant lead and booking alerts to official email</span>
                            </label>
                          </div>
                        </div>

                        {/* Scheduler Embed Mode and Config */}
                        <div className="border-t border-black/5 pt-4 space-y-3.5 text-left">
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#0052FF]" />
                            <span>Scheduler Engine Setup</span>
                          </h4>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-wider mb-1">Scheduler Method</label>
                              <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-full border border-black/5">
                                <button
                                  type="button"
                                  onClick={() => setSchedulerMode('iframe')}
                                  className={`px-2 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                    schedulerMode === 'iframe'
                                      ? 'bg-white dark:bg-slate-800 text-[#0052FF] shadow-sm'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  Live Embed
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSchedulerMode('mock')}
                                  className={`px-2 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                    schedulerMode === 'mock'
                                      ? 'bg-white dark:bg-slate-800 text-[#0052FF] shadow-sm'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  Simulated Slots
                                </button>
                              </div>
                            </div>

                            {schedulerMode === 'iframe' && (
                              <div>
                                <label htmlFor="schedulerLink" className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Custom Live Scheduler Link</label>
                                <input 
                                  type="text"
                                  id="schedulerLink"
                                  name="schedulerLink"
                                  value={schedulerLink}
                                  onChange={(e) => setSchedulerLink(e.target.value)}
                                  className="w-full text-xs font-semibold p-2 rounded-lg border border-[#0052FF] bg-white focus:outline-none"
                                  placeholder="https://calendly.com/your-clinic"
                                />
                                <span className="text-[9px] text-slate-400 font-semibold block mt-1 leading-normal">
                                  Accepts and loads any scheduling portal inside the secure Step 2 view frame.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Panel: Interactive Calendar Scheduler GRID or LIVE IFRAME EMBED */}
                      <div className="lg:col-span-8 space-y-6">
                        {schedulerMode === 'iframe' ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                              <span className="text-xs font-black uppercase text-[#0052FF] tracking-wider font-mono flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Live Scheduler Connected</span>
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase">Timezone Auto-detected</span>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-slate-50 overflow-hidden h-[450px] relative shadow-inner">
                              {schedulerLink ? (
                                <iframe 
                                  src={schedulerLink} 
                                  title="Live Appointment Scheduling Portal" 
                                  className="w-full h-full border-0 bg-white"
                                  allow="camera; microphone; geolocation"
                                />
                              ) : (
                                <div className="p-8 text-center h-full flex flex-col items-center justify-center text-slate-500 font-semibold text-xs">
                                  <AlertCircle className="h-8 w-8 text-[#0052FF] mb-2 animate-bounce" />
                                  <p>Please supply your custom live scheduler link in the sidebar workspace panel to the left.</p>
                                </div>
                              )}
                            </div>

                            <div className="rounded-xl bg-blue-50/50 p-3 flex items-start gap-2 border border-blue-100">
                              <Lock className="h-4 w-4 text-[#0052FF] shrink-0 mt-0.5" />
                              <p className="text-[10px] text-slate-500 leading-normal font-semibold text-left">
                                <strong>Interactive Embed Frame:</strong> Book a slot directly above. Once selected, tap the <strong>Deploy Sandbox</strong> button below to instantly load and configure your clinic trials.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                              <span className="text-xs font-black uppercase text-[#1A1A1A] tracking-wider font-mono">Select Booking Date</span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase">Timezone: Lagos (GMT+1)</span>
                            </div>

                            {/* Month / Horizontal dates slider scrollbar mock */}
                            <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
                              {availableCalendarDates.map((d) => (
                                <button
                                  key={d.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDate(d.id);
                                    setSelectedTimeSlot(d.slots[0]); // auto select first slot
                                  }}
                                  className={`p-3 shrink-0 rounded-xl border flex flex-col items-center justify-center min-w-[70px] cursor-pointer transition-all ${
                                    selectedDate === d.id
                                      ? 'bg-[#0052FF] text-white border-transparent shadow-md scale-105'
                                      : 'bg-white text-slate-800 border-black/10 hover:border-[#0052FF]'
                                  }`}
                                >
                                  <span className="text-[9px] uppercase font-black tracking-widest opacity-80">{d.label}</span>
                                  <span className="text-xl font-black font-display tracking-tight leading-none mt-1">{d.day}</span>
                                  <span className="text-[9px] uppercase font-bold tracking-wider opacity-70 mt-1">{d.month}</span>
                                </button>
                              ))}
                            </div>

                            {/* Grid of Time Slots */}
                            <div className="space-y-3">
                              <span className="text-xs font-black uppercase text-slate-600 tracking-wider font-mono block">Available Consultation Slots</span>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {(availableCalendarDates.find(d => d.id === selectedDate) || availableCalendarDates[0]).slots.map((slot) => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedTimeSlot(slot)}
                                    className={`py-3 px-4 rounded-xl text-xs font-black font-mono transition-all border text-center cursor-pointer ${
                                      selectedTimeSlot === slot
                                        ? 'bg-[#1A1A1A] text-white border-transparent scale-[1.02] shadow-sm'
                                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-black/5'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Verification & compliance badge */}
                            <div className="rounded-xl bg-blue-50/50 p-3.5 border border-blue-100 flex items-start gap-2.5">
                              <Lock className="h-4.5 w-4.5 text-[#0052FF] shrink-0 mt-0.5" />
                              <p className="text-[10px] text-slate-600 leading-normal font-semibold text-left">
                                <strong>Instant Deployment:</strong> Voxabot automatically configures local sandbox resources immediately upon confirmation. A secure on-call invitation will be sent to <strong>{formData.email}</strong> and <strong>{formData.whatsAppNumber}</strong>.
                              </p>
                            </div>
                          </>
                        )}

                        {/* Multi-step action triggers */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
                          <button
                            type="button"
                            onClick={() => setFormStep('details')}
                            className="text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 cursor-pointer text-left"
                          >
                            ← Back to edit questionnaire
                          </button>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={handleConfirmReservation}
                            className="inline-flex items-center gap-2 rounded-full bg-[#0052FF] hover:bg-emerald-500 hover:scale-105 active:scale-95 text-white px-8 py-4.5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg"
                          >
                            {loading ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                              <>
                                <span>Confirm Appointment & Deploy Companion Workspace</span>
                                <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                              </>
                            )}
                          </button>
                        </div>

                      </div>
                    </div>
                  </>
                )}
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
                      <span className="text-[10px] uppercase font-bold text-[#0052FF] font-mono tracking-widest">Pilot Sandbox & Strategy Session Reserved</span>
                      <h3 className="font-display text-2xl font-extrabold text-[#1A1A1A] tracking-tight uppercase mt-1">Stunning Success!</h3>
                    </div>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                      Thank you, <strong className="text-slate-900 font-extrabold">{formData.fullName}</strong>. We have set up a customized sandbox workspace for <span className="text-slate-900 font-extrabold">"{formData.facilityName}"</span>, and locked in your live clinical AI strategy session on our calendar.
                    </p>
                    <div className="space-y-3.5 pt-2 text-left">
                      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-black/5">
                        <CalendarCheck2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="font-semibold">
                          <p className="text-slate-900 font-extrabold text-[13px]">Locked strategy consultation slot</p>
                          <p className="text-[#0052FF] font-black mt-1 text-xs">
                            {(availableCalendarDates.find(d => d.id === selectedDate) || availableCalendarDates[0]).fullName} @ {selectedTimeSlot}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-black/5">
                        <Mail className="h-5 w-5 text-[#0052FF] shrink-0 mt-0.5" />
                        <div className="font-semibold">
                          <p className="text-slate-900 font-extrabold text-[13px]">Email Dispatch Protocol Active</p>
                          <p className="text-slate-500 mt-1 font-semibold">
                            Calendar invite sent to <strong className="text-slate-800">{formData.email}</strong>.
                          </p>
                          {notifyByEmail && (
                            <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-wider mt-1.5 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Copy synchronized to admin: {routingEmail}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-black/5 mt-6">
                      {setActiveTab && (
                        <button
                          onClick={() => {
                            setActiveTab('staff-dashboard');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-4.5 px-5 rounded-2xl bg-slate-900 hover:bg-[#0052FF] text-white flex items-center justify-between text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md group border border-transparent cursor-pointer"
                          id="open-staff-dashboard-btn"
                        >
                          <span>Open Staff Dashboard Realtime CRM</span>
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSandboxActive(false);
                        setFormStep('details');
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

          {/* ElevenLabs Interactive Phone Voice Demo */}
          <div className="mt-12">
            <VoxabotVoiceAgent />
          </div>
        </div>
 
       </div>
     </section>
   );
}
