/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Database
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

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function HomeView({ setActiveTab }: HomeViewProps) {
  
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
    <div className="relative z-10">
      
      {/* Hero Visual Area Background */}
      <div className="absolute top-0 inset-x-0 h-200 bg-[linear-gradient(to_bottom,rgba(0,82,255,0.03),transparent)] -z-10" />
      <div className="absolute -top-40 right-1/4 h-120 w-120 rounded-full bg-[#0052FF]/2 blur-3xl -z-10" />
      <div className="absolute top-60 left-10 h-96 w-96 rounded-full bg-[#0052FF]/2 blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Animated Promo Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none select-none shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0052FF]" />
            <span>Introducing Voxabot Healthcare Release 2.5</span>
          </div>

          {/* Large display Heading */}
          <h1 className="mx-auto max-w-5xl text-5xl md:text-[88px] leading-[0.85] text-slate-900 uppercase heading-inter-heavy">
            NEVER MISS ANOTHER <span className="text-[#0052FF]">PATIENT ENQUIRY.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-3xl text-sm sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-sans font-medium">
            Give your clinic or diagnostic centre a <span className="font-extrabold text-[#1A1A1A]">24/7 AI front desk</span> for calls, WhatsApp communications, booking appointments, and sharing lab results. <span className="text-[#1A1A1A] font-black block mt-3">Respond faster, capture more.</span>
          </p>

          {/* Buttons CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={handleBookDemoClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg hover:scale-105 active:scale-95"
              id="hero-book-demo-btn"
            >
              <span>Book a Free Demo</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <button
              onClick={handleCTAWhatsAppClick}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white hover:bg-slate-50 px-8 py-5 text-xs font-black uppercase tracking-tighter text-[#1A1A1A] btn-heavy transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-sm hover:scale-105 active:scale-95"
              id="hero-whatsapp-demo-btn"
            >
              <MessageSquare className="h-4 w-4 text-[#0052FF] shrink-0" />
              <span>Test Live WhatsApp Demo</span>
            </button>
          </div>

          {/* Brand Stats Strip */}
          <div className="pt-12 border border-black/5 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center bg-white p-8 rounded-3xl shadow-sm">
            <div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#1A1A1A]">24/7/365</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Autonomous Availability</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#0052FF]">0.8 seconds</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">AI Reply Latency</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-3xl sm:text-4xl font-display font-extrabold tracking-tighter text-[#0052FF]">100%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Non-Disruptive Setup</p>
            </div>
          </div>

          {/* Core Support Copy Panel */}
          <div className="border border-black/5 bg-white p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto text-left relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 h-2 bg-[#0052FF] inset-x-0" />
            <h3 className="font-display text-xs font-bold text-[#0052FF] uppercase tracking-widest mb-4">Patient Realities &amp; Solutions</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              Patients call. They send WhatsApp messages. They ask about appointments, test results, opening hours, prices, and directions. 
              But when your front desk is busy, those enquiries can easily become missed opportunities.
              <br className="my-3 block"/>
              <span className="text-[#1A1A1A] font-extrabold">Voxabot AI helps your healthcare team respond faster, capture more enquiries, reduce front-desk pressure, and improve the patient experience — without replacing your current software systems.</span>
            </p>
          </div>

        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-t border-black/10 bg-[#F4F4F0]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
              Your Front Desk Is Busy. <br /><span className="text-[#0052FF]">Your Patients Still Expect Instant Answers.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
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
                  className="rounded-3xl border border-black/5 bg-white hover:bg-slate-50/50 p-6 hover:border-black/10 transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-black/5 text-[#0052FF] group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-extrabold text-[#1A1A1A] group-hover:text-[#0052FF] transition-colors tracking-tight uppercase">
                      {prob.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Short Punchline block */}
          <div className="mt-12 text-center">
            <p className="text-base sm:text-lg font-display font-medium text-[#0052FF] inline-flex items-center gap-2">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Voxabot AI helps your team stay responsive — even when your staff are busy.</span>
            </p>
          </div>

        </div>
      </section>

      {/* Efficiency Metrics Section */}
      <section className="py-24 border-t border-black/10 bg-[#1A1A1A] text-white overflow-hidden relative">
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
      <section className="py-24 border-t border-black/10 bg-[#FDFDFB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
              AI Front Desk Solutions Built for Healthcare Teams
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              Voxabot AI provides practical, medical-compliant AI communication assistants for healthcare businesses. No complicated software replacements, no heavy setup, and no disruption to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10 border border-black/10 rounded-3xl overflow-hidden shadow-sm">
            
            {/* Solution 1: Voxabot Clinic Front Desk */}
            <div className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 transition-all duration-300 group relative">
              <div className="absolute top-0 right-0 h-16 w-16 bg-[#0052FF]/2 rounded-tr-3xl rounded-bl-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0052FF] mb-6 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Voxabot Clinic</h3>
                <p className="text-[10px] uppercase font-bold text-[#0052FF] tracking-widest mt-1">Hospitals &amp; Private Clinics</p>
                
                <h4 className="font-display text-base font-extrabold text-slate-800 mt-6 mb-2">
                  Answer calls, reply on WhatsApp, book appointments, send reminders, and recover missed enquiries — 24/7.
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold mb-6">
                  Supports clinics, hospitals, and medical practices by responding faster to inbound outpatient inquiries. Answer general FAQs, register patient context, log preferred calendar times, and alert nursing teams when urgent compliance attention is needed.
                </p>
              </div>

              <div className="pt-6 border-t border-black/5">
                <button
                  onClick={() => {
                    setActiveTab('clinic-front-desk');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter text-[#0052FF] hover:text-blue-600 transition-colors group/btn cursor-pointer btn-heavy"
                  id="overview-clinic-btn"
                >
                  <span>See Clinic Front Desk Demo</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            {/* Solution 2: Voxabot Lab Assistant */}
            <div className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 transition-all duration-300 group relative">
              <div className="absolute top-0 right-0 h-16 w-16 bg-[#0052FF]/2 rounded-tr-3xl rounded-bl-3xl" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0052FF] mb-6 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                  <Dna className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight uppercase">Voxabot Lab</h3>
                <p className="text-[10px] uppercase font-bold text-[#0052FF] tracking-widest mt-1">Diagnostic Centers &amp; Pathology</p>

                <h4 className="font-display text-base font-extrabold text-slate-800 mt-6 mb-2">
                  Help your lab answer repetitive enquiries, share preparation instructions, and send result notifications automatically.
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold mb-6">
                  Specifically designed for diagnostic centres, pathology laboratories, and hospital imaging departments that receive hundreds of the same pre-test preparation inquiries every single day. Keep clinical interpretation with qualified professionals while automating pricing, availability charts, and dispatch requests.
                </p>
              </div>

              <div className="pt-6 border-t border-black/5">
                <button
                  onClick={() => {
                    setActiveTab('lab-assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter text-[#0052FF] hover:text-blue-600 transition-colors group/btn cursor-pointer btn-heavy"
                  id="overview-lab-btn"
                >
                  <span>See Lab Assistant Demo</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
