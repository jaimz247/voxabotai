/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  X, 
  PhoneMissed, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  Stethoscope,
  Dna,
  Database,
  Calculator,
  TrendingUp,
  Sliders,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import TestimonialsView from './TestimonialsView';
import { ActiveTab } from '../types';
import { Language, translations } from '../locales';
import VoxabotVoiceAgent from './VoxabotVoiceAgent';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
}

export default function HomeView({ setActiveTab, language }: HomeViewProps) {
  const t = translations[language] || translations.en;

  // Operational Savings Calculator State
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [monthlyVolumeValue, setMonthlyVolumeValue] = useState(1500);
  const [costPerCallValue, setCostPerCallValue] = useState(1500); // Defaults to Naira (₦1500 matches roughly $1)
  const [percentRepetitiveValue, setPercentRepetitiveValue] = useState(70);
  const [resolutionRateValue, setResolutionRateValue] = useState(85);

  const FX_RATE = 1500;

  // Deriving cost per call in both currencies
  const costPerCallNGN = currency === 'NGN' ? costPerCallValue : Math.round(costPerCallValue * FX_RATE);
  const costPerCallUSD = currency === 'USD' ? costPerCallValue : (costPerCallValue / FX_RATE);

  // Dynamic calculations for savings
  const totalInboundAutomated = Math.round(monthlyVolumeValue * (percentRepetitiveValue / 100) * (resolutionRateValue / 100));
  
  // Real-time currency metrics
  const currentCostNGN = Math.round(monthlyVolumeValue * costPerCallNGN);
  const currentCostUSD = Math.round(monthlyVolumeValue * costPerCallUSD);

  const voxabotCostNGN = Math.round((totalInboundAutomated * 300) + 150000);
  const voxabotCostUSD = Math.round((totalInboundAutomated * 0.20) + 100);

  const monthlySavingsNGN = Math.max(0, currentCostNGN - voxabotCostNGN);
  const monthlySavingsUSD = Math.max(0, currentCostUSD - voxabotCostUSD);

  const repetitiveHoursSaved = Math.round((totalInboundAutomated * 4) / 60);
  const roiMultiplier = voxabotCostNGN > 0 ? ((monthlySavingsNGN / voxabotCostNGN) * 100).toFixed(0) : '0';

  const chartData = [
    { name: language === 'fr' ? 'Manuel' : language === 'es' ? 'Manual' : 'Current manual', value: currency === 'NGN' ? currentCostNGN : currentCostUSD },
    { name: language === 'fr' ? 'Voxabot IA' : language === 'es' ? 'Voxabot IA' : 'Voxabot hybrid', value: currency === 'NGN' ? voxabotCostNGN : voxabotCostUSD }
  ];

  const handleCurrencyChange = (newCurrency: 'NGN' | 'USD') => {
    if (newCurrency === currency) return;
    setCurrency(newCurrency);
    if (newCurrency === 'USD') {
      const converted = Math.max(0.5, Math.min(15, Math.round((costPerCallValue / FX_RATE) * 2) / 2));
      setCostPerCallValue(converted);
    } else {
      const converted = Math.max(200, Math.min(5000, Math.round(costPerCallValue * FX_RATE / 100) * 100));
      setCostPerCallValue(converted);
    }
  };
  
  const handleCTAWhatsAppClick = () => {
    setActiveTab('clinic-front-desk');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBookDemoClick = () => {
    setActiveTab('book-demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const problems = [
    {
      icon: PhoneMissed,
      title: 'Missed calls during peak periods',
      desc: 'When your physical front desk team is in the middle of check-ins, patient calls frequently ring out and go unanswered.',
    },
    {
      icon: Clock,
      title: 'Delayed WhatsApp patient replies',
      desc: 'Patients expect instant feedback. A 2-hour delay in answering basic details can lead to drop-offs to other providers.',
    },
    {
      icon: AlertTriangle,
      title: 'Patients forgetting appointments',
      desc: 'No-show rates increase dramatically when patient follow-up confirmations and reminders are handled manually.',
    },
    {
      icon: HelpCircle,
      title: 'Repetitive front-desk questions',
      desc: 'Staff lose valuable hours daily answering the exact same FAQ queries about opening hours, directions, and consulting costs.',
    },
    {
      icon: Database,
      title: 'Lab result-status confusion',
      desc: 'Incoming laboratory lines are often blocked by outpatients calling manually to check if their blood or imaging result file is ready.',
    },
    {
      icon: X,
      title: 'Missed after-hours inquiries',
      desc: 'Many healthcare enquiries happen during evenings or weekends when your facility is closed—resulting in lost clinic opportunities.',
    },
  ];

  return (
    <div className="relative z-10 bg-grid-ambient pb-12">
      
      {/* Hero Visual Area Background */}
      <div className="absolute top-0 inset-x-0 h-200 bg-[linear-gradient(to_bottom,rgba(0,82,255,0.03),transparent)] dark:bg-[linear-gradient(to_bottom,rgba(0,82,255,0.08),transparent)] -z-10" />
      <div className="absolute -top-40 right-1/4 h-120 w-120 rounded-full bg-[#0052FF]/2 dark:bg-[#0052FF]/5 blur-3xl -z-10" />
      <div className="absolute top-60 left-10 h-96 w-96 rounded-full bg-[#0052FF]/2 dark:bg-[#0052FF]/5 blur-3xl -z-10" />
 
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Animated Promo Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 px-4 py-2 text-[10px] font-bold text-[#0052FF] dark:text-blue-400 uppercase tracking-widest leading-none select-none shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0052FF] dark:text-blue-400 animate-pulse" />
            <span>{language === 'fr' ? 'Présentation de Voxabot Healthcare v2.5' : language === 'es' ? 'Presentamos Voxabot Healthcare v2.5' : 'Introducing Voxabot Healthcare Release 2.5'}</span>
          </div>
 
          {/* Large display Heading */}
          <h1 className="mx-auto max-w-5xl text-5xl md:text-[72px] lg:text-[88px] leading-[0.85] text-slate-900 dark:text-white uppercase heading-inter-heavy tracking-tighter">
            {t.heroTitle}
          </h1>
 
          {/* Subheading */}
          <p className="mx-auto max-w-3xl text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
            {t.heroSub}
          </p>
 
          {/* Buttons CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={handleBookDemoClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] dark:bg-white dark:text-black dark:hover:bg-[#0052FF] dark:hover:text-white text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg hover:scale-105 active:scale-95"
              id="hero-book-demo-btn"
            >
              <span>{t.bookDemoBtn}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <a
              href="https://wa.me/2348145956772"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/10 bg-white dark:bg-[#151515] hover:bg-slate-50 dark:hover:bg-white/5 px-8 py-5 text-xs font-black uppercase tracking-tighter text-[#1A1A1A] dark:text-white btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-sm hover:scale-105 active:scale-95"
              id="hero-whatsapp-demo-btn"
            >
              <MessageSquare className="h-4 w-4 text-[#0052FF] dark:text-blue-400 shrink-0" />
              <span>{t.whatsappDemoBtn}</span>
            </a>
          </div>
 
          {/* WhatsApp Agent Live Call & Message Announcement */}
          <div className="flex items-center justify-center pt-1 pb-2">
            <p className="text-[11px] font-bold text-[#0052FF] dark:text-blue-400 uppercase tracking-wider flex items-center justify-center gap-2 bg-[#0052FF]/5 dark:bg-[#0052FF]/10 px-4.5 py-2.5 rounded-full border border-[#0052FF]/10 dark:border-blue-500/20 text-center max-w-2xl backdrop-blur-sm">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Our Live WhatsApp Agent is active: Text or Place a WhatsApp Voice Call directly to <a href="https://wa.me/2348145956772" className="underline hover:text-blue-700 dark:hover:text-blue-300 font-extrabold" target="_blank" rel="noopener noreferrer">+234 814 595 6772</a> for an instant demo!</span>
            </p>
          </div>
 
          {/* Brand Stats Strip */}
          <div className="pt-12 border border-black/5 dark:border-white/5 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center bg-white dark:bg-[#111111] p-8 rounded-3xl shadow-sm neon-border-glow">
            <div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#1A1A1A] dark:text-white">24/7/365</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Autonomous Availability</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#0052FF] dark:text-blue-400">0.8 seconds</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">AI Reply Latency</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#0052FF] dark:text-blue-400">100%</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Non-Disruptive Setup</p>
            </div>
          </div>
 
          {/* Core Support Copy Panel */}
          <div className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#111111] p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto text-left relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 h-2 bg-[#0052FF] inset-x-0" />
            <h3 className="font-display text-xs font-bold text-[#0052FF] dark:text-blue-400 uppercase tracking-widest mb-4">Patient Realities &amp; Solutions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
              Patients call. They send WhatsApp messages. They ask about appointments, test results, opening hours, prices, and directions. 
              But when your front desk is busy, those enquiries can easily become missed opportunities.
              <br className="my-3 block"/>
              <span className="text-[#1A1A1A] dark:text-white font-extrabold">Voxabot AI helps your healthcare team respond faster, capture more enquiries, reduce front-desk pressure, and improve the patient experience — without replacing your current software systems.</span>
            </p>
          </div>
 
          {/* ElevenLabs Interactive Phone Voice Demo */}
          <div className="max-w-4xl mx-auto text-left mt-8">
            <VoxabotVoiceAgent />
          </div>
 
        </div>
      </section>
 
      {/* Problem Section */}
      <section className="py-24 border-t border-black/10 dark:border-white/10 bg-[#F4F4F0]/40 dark:bg-[#121212]/40 relative">
        <div className="absolute inset-0 bg-grid-ambient opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white uppercase leading-[0.95] heading-inter-heavy">
              Your Front Desk Is Busy. <br /><span className="text-[#0052FF] dark:text-blue-400">Your Patients Still Expect Instant Answers.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Every day, healthcare teams deal with repetitive calls, WhatsApp messages, appointment requests, missed calls, lab enquiries, and follow-up questions. When responses are slow, patients go elsewhere.
            </p>
          </div>
 
          {/* Grid Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#161616] hover-lift p-6 transition-all flex flex-col justify-between group shadow-sm hover:border-black/10 dark:hover:border-white/12"
                >
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5 text-[#0052FF] dark:text-blue-400 group-hover:bg-[#0052FF] dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-extrabold text-[#1A1A1A] dark:text-white group-hover:text-[#0052FF] dark:group-hover:text-blue-400 transition-colors tracking-tight uppercase">
                      {prob.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
 
          {/* Short Punchline block */}
          <div className="mt-12 text-center">
            <p className="text-base sm:text-lg font-display font-medium text-[#0052FF] dark:text-blue-300 inline-flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Voxabot AI helps your team stay responsive — even when your staff are busy.</span>
            </p>
          </div>
 
        </div>
      </section>

      {/* Efficiency Metrics Section */}
      <section className="py-24 border-t border-black/10 bg-[#1A1A1A] text-white overflow-hidden relative" id="efficiency-metrics">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0052FF]/5 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-none">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span>Data-Backed Clinic Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-[0.95] heading-inter-heavy">
              Performance &amp; Efficiency Metrics
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Compare the operational metrics between a traditional staff-only front desk and a Voxabot-powered, autonomous healthcare office.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Legend & Summary Side */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">How automation changes outpatient operations</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-semibold">
                  By handling routine FAQs, logging patient booking preferences, and instantly replying to incoming requests or WhatsApp missed calls, Voxabot closes the leakage gap completely.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="text-xs font-bold uppercase text-slate-300">Response Delays</span>
                  </div>
                  <span className="text-sm font-black text-rose-400">Reduced from 42m to &lt; 1s</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-[#0052FF]" />
                    <span className="text-xs font-bold uppercase text-slate-300">Patient Conversion</span>
                  </div>
                  <span className="text-sm font-black text-emerald-400">Increased from 64% to 100%</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase text-slate-300">Staff Repetitive Hours Freed</span>
                  </div>
                  <span className="text-sm font-black text-emerald-400">82% time saved</span>
                </div>
              </div>
            </div>

            {/* Recharts Chart Side */}
            <div className="lg:col-span-12 xl:col-span-7 rounded-3xl border border-white/10 bg-[#151515] p-6 lg:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden h-[420px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Operational Analytics Comparison</span>
                  <span className="text-sm font-black text-white uppercase tracking-tight">Traditional vs. Voxabot Desk</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="text-slate-400">Traditional</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#0052FF]" />
                    <span className="text-[#0052FF]">Voxabot-Powered</span>
                  </div>
                </div>
              </div>

              {/* Chart container */}
              <div className="flex-1 w-full h-full min-h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Patient Conversion %', traditional: 64, voxabot: 100 },
                      { name: 'Missed Call Recovery %', traditional: 15, voxabot: 95 },
                      { name: 'Staff Operational Relief %', traditional: 0, voxabot: 82 },
                      { name: 'Information Accuracy %', traditional: 78, voxabot: 99 }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    barGap={8}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      fontFamily="Space Grotesk"
                      fontWeight={600}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      domain={[0, 100]}
                      fontFamily="Space Grotesk"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      labelStyle={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', color: '#94a3b8' }}
                      itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="traditional" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Traditional" />
                    <Bar dataKey="voxabot" fill="#0052FF" radius={[4, 4, 0, 0]} name="Voxabot-Powered" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Social Proof Partners Testimonials */}
      <TestimonialsView />

      {/* Services Overview Selector Section */}
      <section className="py-24 border-t border-black/10 dark:border-white/10 bg-[#FDFDFB] dark:bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-grid-ambient opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white uppercase leading-[0.95] heading-inter-heavy">
              AI Front Desk Solutions Built for Healthcare Teams
            </h2>
            <p className="text-slate-600 dark:text-slate-350 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Voxabot AI provides practical, medical-compliant AI communication assistants for healthcare businesses. No complicated software replacements, no heavy setup, and no disruption to your workflow.
            </p>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
            
            {/* Solution 1: Voxabot Clinic Front Desk */}
            <div className="bg-white dark:bg-[#111111] p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all duration-300 group relative">
              <div className="absolute top-0 right-0 h-16 w-16 bg-[#0052FF]/2 rounded-tr-3xl rounded-bl-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-blue-400 mb-6 group-hover:bg-[#0052FF] dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">Voxabot Clinic</h3>
                <p className="text-[10px] uppercase font-bold text-[#0052FF] dark:text-blue-400 tracking-widest mt-1">Hospitals &amp; Private Clinics</p>
                
                <h4 className="font-display text-base font-extrabold text-slate-800 dark:text-slate-200 mt-6 mb-2">
                  Answer calls, reply on WhatsApp, book appointments, send reminders, and recover missed enquiries — 24/7.
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mb-6">
                  Supports clinics, hospitals, and medical practices by responding faster to inbound outpatient inquiries. Answer general FAQs, register patient context, log preferred calendar times, and alert nursing teams when urgent compliance attention is needed.
                </p>
              </div>
 
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <button
                  onClick={() => {
                    setActiveTab('clinic-front-desk');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter text-[#0052FF] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors group/btn cursor-pointer btn-heavy"
                  id="overview-clinic-btn"
                >
                  <span>See Clinic Front Desk Demo</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>
 
            {/* Solution 2: Voxabot Lab Assistant */}
            <div className="bg-white dark:bg-[#111111] p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all duration-300 group relative">
              <div className="absolute top-0 right-0 h-16 w-16 bg-[#0052FF]/2 rounded-tr-3xl rounded-bl-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-blue-400 mb-6 group-hover:bg-[#0052FF] dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Dna className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">Voxabot Lab</h3>
                <p className="text-[10px] uppercase font-bold text-[#0052FF] dark:text-blue-400 tracking-widest mt-1">Diagnostic Centers &amp; Pathology</p>
 
                <h4 className="font-display text-base font-extrabold text-slate-800 dark:text-slate-200 mt-6 mb-2">
                  Help your lab answer repetitive enquiries, share preparation instructions, and send result notifications automatically.
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mb-6">
                  Specifically designed for diagnostic centres, pathology laboratories, and hospital imaging departments that receive hundreds of the same pre-test preparation inquiries every single day. Keep clinical interpretation with qualified professionals while automating pricing, availability charts, and dispatch requests.
                </p>
              </div>
 
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <button
                  onClick={() => {
                    setActiveTab('lab-assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter text-[#0052FF] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors group/btn cursor-pointer btn-heavy"
                  id="overview-lab-btn"
                >
                  <span>{language === 'fr' ? 'Voir Démo Lab' : language === 'es' ? 'Ver Demo de Lab' : 'See Lab Assistant Demo'}</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>
 
          </div>
 
        </div>
      </section>

      {/* Interactive Operational Savings Calculator */}
      <section className="py-24 border-t border-black/10 bg-slate-50/50 dark:bg-[#0E0E0E]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
              <Calculator className="h-4 w-4 shrink-0 text-[#0052FF]" />
              <span>{t.calcTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase leading-none heading-inter-heavy">
              {language === 'fr' ? 'CALCULEZ VOS SYNERGIES FINANCIÈRES' : language === 'es' ? 'CALCULE SUS SINERGIAS FINANCIERAS' : 'CALCULATE CLINICAL SYNERGIES'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm font-semibold">
              {t.calcSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Input Parameters Sliders */}
            <div className="lg:col-span-7 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-black/5 dark:border-white/5 pb-4 mb-6">
                  <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="h-4.5 w-4.5 text-[#0052FF]" />
                    <span>Manual Input Parameters</span>
                  </h3>
                  
                  {/* Highly polished Currency Toggle */}
                  <div className="inline-flex rounded-full bg-slate-100 dark:bg-black p-1 border border-black/5 dark:border-white/10 select-none self-start sm:self-auto shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('NGN')}
                      className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                        currency === 'NGN'
                          ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold'
                      }`}
                      id="calc-currency-ngn"
                    >
                      ₦ Naira (NGN)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('USD')}
                      className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold'
                      }`}
                      id="calc-currency-usd"
                    >
                      $ Dollar (USD)
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Slider 1: Monthly Call Volume */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                      <span className="text-slate-700 dark:text-slate-300">{t.monthlyCallVolume}</span>
                      <span className="text-[#0052FF] font-mono text-sm">{monthlyVolumeValue.toLocaleString()} contacts / mo</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={monthlyVolumeValue}
                      onChange={(e) => setMonthlyVolumeValue(parseInt(e.target.value))}
                      className="w-full accent-[#0052FF] cursor-ew-resize h-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800"
                    />
                  </div>

                  {/* Slider 2: Average Cost Per Call */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                      <span className="text-slate-700 dark:text-slate-300">{t.avgCostPerCall}</span>
                      <span className="text-[#0052FF] font-mono text-sm">
                        {currency === 'NGN' 
                          ? `₦${costPerCallNGN.toLocaleString()} (~$${costPerCallUSD.toFixed(2)})` 
                          : `$${costPerCallUSD.toFixed(2)} (~₦${Math.round(costPerCallNGN).toLocaleString()})`
                        }
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currency === 'NGN' ? "200" : "0.5"}
                      max={currency === 'NGN' ? "5000" : "15"}
                      step={currency === 'NGN' ? "100" : "0.5"}
                      value={costPerCallValue}
                      onChange={(e) => setCostPerCallValue(parseFloat(e.target.value))}
                      className="w-full accent-[#0052FF] cursor-ew-resize h-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800"
                    />
                  </div>

                  {/* Slider 3: Percent Repetitive */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                      <span className="text-slate-700 dark:text-slate-300">{t.percentRepetitive}</span>
                      <span className="text-[#0052FF] font-mono text-sm">{percentRepetitiveValue}% of inquiries</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={percentRepetitiveValue}
                      onChange={(e) => setPercentRepetitiveValue(parseInt(e.target.value))}
                      className="w-full accent-[#0052FF] cursor-ew-resize h-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800"
                    />
                  </div>

                  {/* Slider 4: Resolution Rate */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                      <span className="text-slate-700 dark:text-slate-300">{t.automatedSuccessRate}</span>
                      <span className="text-[#0052FF] font-mono text-sm">{resolutionRateValue}% resolved</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="95"
                      step="5"
                      value={resolutionRateValue}
                      onChange={(e) => setResolutionRateValue(parseInt(e.target.value))}
                      className="w-full accent-[#0052FF] cursor-ew-resize h-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-6">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                  {t.calcExplanation}
                </p>
              </div>
            </div>

            {/* Calculations Dashboard Outputs */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-white/5 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#0052FF]/10 rounded-full blur-2xl -z-10" />
              
              <div className="space-y-6">
                <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                  <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
                  <span>Real-Time Business Outcomes</span>
                </h3>

                {/* Outputs grids */}
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1.5">{t.totalCurrentCost}</p>
                    <p className="text-2xl font-black font-mono text-slate-100">
                      ₦{currentCostNGN.toLocaleString()} <span className="text-xs text-slate-400 font-bold">/ ${currentCostUSD.toLocaleString()} / mo</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest leading-none mb-1">{t.calculatedSavings}</p>
                    <p className="text-3xl font-black font-mono text-emerald-400">
                      ₦{monthlySavingsNGN.toLocaleString()} <span className="text-sm text-emerald-500 font-extrabold">saved / mo</span>
                    </p>
                    <p className="text-[11px] font-bold text-emerald-400/80">
                      Approx. ${monthlySavingsUSD.toLocaleString()} / mo saved
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1.5">{t.hoursFreed}</p>
                      <p className="text-lg font-black font-mono text-white">{repetitiveHoursSaved} hrs</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1.5">Estimated ROI</p>
                      <p className="text-lg font-black font-mono text-[#0052FF]">{roiMultiplier}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleBookDemoClick}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-tighter py-4 shadow-lg transition-all cursor-pointer btn-heavy"
                  id="calc-book-demo-btn"
                >
                  <span>{t.bookDemoBtn}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 font-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
