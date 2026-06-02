/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Dna, 
  TestTube, 
  Clock, 
  FileSpreadsheet, 
  MapPin, 
  Activity, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SimulatedScenario } from '../types';

interface LabViewProps {
  onBookDemoClick: () => void;
}

export default function LabView({ onBookDemoClick }: LabViewProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [typingState, setTypingState] = useState(false);
  const [simulatedChat, setSimulatedChat] = useState<{ sender: 'patient' | 'ai' | 'system'; text: string; time: string }[]>([]);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scenarios: SimulatedScenario[] = [
    {
      id: 'lab-scen-1',
      question: 'Do you do full blood count?',
      reply: 'Yes, we perform Full Blood Count (FBC/CBC) daily! It is handled by our hematology laboratory unit. Average turnaround time is 2 to 4 hours.',
      action: 'log',
      actionLabel: 'TEST MATRIX CHECK',
      actionDetails: 'Hematology panel matched: Full Blood Count (FBC)'
    },
    {
      id: 'lab-scen-2',
      question: 'How much is this test?',
      reply: 'Prices for common tests: Full Blood Count is ₦4,500, Lipid Profile Panel is ₦8,000, and Urinalysis is ₦2,000. Could you kindly upload a picture or type out the doctor’s prescription? I will parse the tests and give you a comprehensive pricing quote!',
      action: 'log',
      actionLabel: 'LOG PRESCRIPTION ENTRY',
      actionDetails: 'Captured: Outpatient pricing inquiry.'
    },
    {
      id: 'lab-scen-3',
      question: 'Do I need to fast?',
      reply: 'For general Lipid Panels, Fasting Blood Sugar, or metabolic chemistry profiles, you must completely fast (no food, coffee, or drinks except pure water) for exactly 8 to 12 hours before we collect your sample tomorrow morning.',
      action: 'log',
      actionLabel: 'LOG PREPARATION FAQ',
      actionDetails: 'Triggered Fasting Protocols Sheet Guide.'
    },
    {
      id: 'lab-scen-4',
      question: 'Is my result ready?',
      reply: 'Let me look that up for you! Could you please share your Lab Sample ID or Registration Number (e.g. LAB-2026-880)? Our system will instantly verify result status with our laboratory database.',
      action: 'escalate',
      actionLabel: 'DATABASE QUERY',
      actionDetails: 'Checking LIMS database logs for active sample ID...'
    },
    {
      id: 'lab-scen-5',
      question: 'Can you send my result by WhatsApp or email?',
      reply: 'Yes, absolutely! Once authorized and validated by our physical pathologist, your pathology report PDF is immediately dispatched secure and encrypted to your confirmed Email address or delivered directly here on WhatsApp as a password-protected zip/pdf document.',
      action: 'log',
      actionLabel: 'LOG DECOUPLE REPORT',
      actionDetails: 'Verified HIPAA Secure Report Outbound Flow active.'
    },
    {
      id: 'lab-scen-6',
      question: 'Do you do home sample collection?',
      reply: 'Yes, we certainly do! We support premium home sample collection with our mobile expert team of phlebotomists. May I get your general area location and preferred collection date to check booking openings?',
      action: 'book',
      actionLabel: 'SAMPLE REQUEST FILED',
      actionDetails: 'Outbound dispatch phlebotomist queue checked.'
    },
    {
      id: 'lab-scen-7',
      question: 'Where is your nearest branch?',
      reply: 'We have multi-branches across town. Corporate main branch: 1414 N Shepherd Drive. Annex Lab: Lekki Phase 1 outpatient center. Which facility location is closer to you?',
      action: 'log',
      actionLabel: 'GPS COORDINATES SENT',
      actionDetails: 'Branch locator lookup active.'
    },
    {
      id: 'lab-scen-8',
      question: 'Do you handle company medicals?',
      reply: 'Yes, we handle corporate staff screenings, structured executive checkups, and pre-employment medical examinations. I can route this corporate request directly to our Lab Business Director! Could you kindly share your corporate email address and company name?',
      action: 'remind',
      actionLabel: 'CORPORATE ROUTING',
      actionDetails: 'Escalating corporate inquiries queue to B2B Unit.'
    },
    {
      id: 'lab-scen-9',
      question: 'Do you accept HMO?',
      reply: 'Yes! We accept AXA Mansard, HMO Reliance, Avon, and several other private corporate diagnostic schemes for eligible tests. Please bring your authorized doctor prescription slip and HMO card with you to check in.',
      action: 'log',
      actionLabel: 'HMO LOG VERIFIED',
      actionDetails: 'Diagnostic coverage mapping enabled.'
    },
  ];

  const handleScenarioClick = (scen: SimulatedScenario) => {
    setSelectedScenario(scen.id);
    setTypingState(true);
    const systemTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSimulatedChat([
      {
        sender: 'patient',
        text: scen.question,
        time: systemTime
      }
    ]);

    setTimeout(() => {
      setTypingState(false);
      setSimulatedChat((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: scen.reply,
          time: systemTime
        }
      ]);
      if (scen.action) {
        setSimulatedChat((prev) => [
          ...prev,
          {
            sender: 'system',
            text: `[SYSTEM WORKFLOW] ${scen.actionLabel} • ${scen.actionDetails}`,
            time: systemTime
          }
        ]);
      }
    }, 1200);
  };

  const benefits = [
    {
      title: 'Fewer Repetitive Calls',
      desc: 'Routine diagnostic questions are completely automated, drastically reducing incoming call volume and allowing the desk team to work without distraction.',
    },
    {
      title: 'Better Patient Preparation',
      desc: 'Patients receive precise pre-test instructions (fasting status, timing guides), completely avoiding invalid check-ins or failed appointments.',
    },
    {
      title: 'Instant Result Notifications',
      desc: 'Instead of patients calling repeatedly asking "Is my test ready?", they are automatically notified the split second their LIMS outputs a validated file.',
    },
    {
      title: 'Phlebotomy Bookings Captured',
      desc: 'Phlebotomists can log automated home-sample-collection requests, and details are organized beautifully inside spreadsheets instantly.',
    },
    {
      title: 'Safe Integrity Boundaries',
      desc: 'Voxabot AI never attempts clinical result interpretation, maintaining 100% professional liability borders for pathology centers.',
    },
  ];

  const targetBestFor = [
    'Diagnostic centers',
    'Clinical laboratories',
    'Specialist pathology centers',
    'Medical imaging diagnostics & scans',
    'Multi-branch medical networks',
    'Hospital lab departments',
    'Corporate staff screening providers',
    'Home phlebotomy sample services',
  ];

  return (
    <div className="relative z-10 bg-brand-dark dark:bg-[#0A0A0A] bg-grid-ambient min-h-screen pb-16">
      
      {/* Visual Header Grid Gradient */}
      <div className="absolute top-0 inset-x-0 h-160 bg-[linear-gradient(to_bottom,rgba(0,82,255,0.03),transparent)] dark:bg-[linear-gradient(to_bottom,rgba(0,82,255,0.08),transparent)] -z-10" />
      <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-[#0052FF]/2 dark:bg-[#0052FF]/5 blur-3xl -z-10" />
 
      {/* Hero */}
      <section className="pt-20 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 xl:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-[#111111] px-4 py-2 text-[10px] font-bold text-[#0052FF] dark:text-blue-400 uppercase tracking-widest leading-none shadow-sm">
              <Dna className="h-3.5 w-3.5 shrink-0 animate-pulse text-[#0052FF] dark:text-blue-400" />
              <span>Voxabot Lab Assistant</span>
            </div>
 
            <h1 className="text-4xl md:text-[68px] leading-[0.85] text-slate-900 dark:text-white uppercase heading-inter-heavy tracking-tighter">
              Reduce Repetitive <br /><span className="text-[#0052FF] dark:text-blue-400">Lab Enquiries</span>
            </h1>
 
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl font-semibold">
              Answer test questions, send complex preparation instructions, notify patients when diagnostic results are ready, and capture phlebotomy collection requests — without overwhelming your laboratory staff.
            </p>
 
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onBookDemoClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] dark:bg-white dark:text-black dark:hover:bg-[#0052FF] dark:hover:text-white text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Book a Free Lab Demo</span>
              </button>
            </div>
 
            <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-6 max-w-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic font-medium">
                “Many laboratories receive the same repetitive questions all day—Fasting specs? Prices? Results ready? Voxabot Lab Assistant parses your test catalogue automatically, giving instant answers.”
              </p>
            </div>
          </motion.div>
 
          {/* Interactive Lab Mobile Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-5 relative"
          >
            <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] p-6 shadow-2xl aspect-[9/16] w-full max-w-[400px] mx-auto flex flex-col justify-between relative overflow-hidden neon-border-glow">
              
              {/* Simulator Screen title */}
              <div className="absolute top-0 inset-x-0 h-8 bg-slate-50 dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">LAB WORKFLOW SIMULATOR</span>
                </div>
                <div className="flex h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
              </div>
 
              {/* Chat list */}
              <div className="flex-1 h-96 overflow-y-auto pt-10 pb-4 space-y-4 flex flex-col justify-end">
                {selectedScenario === null ? (
                  <div className="text-center p-6 space-y-4 my-auto">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 text-[#0052FF] dark:text-blue-400">
                      <TestTube className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">Click a laboratory question</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed">Select any common diagnostic query to see how the Lab Assistant automates replies live.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {simulatedChat.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === 'patient' 
                            ? 'self-end items-end ml-auto' 
                            : msg.sender === 'ai' 
                            ? 'self-start items-start mr-auto'
                            : 'self-center items-center w-full max-w-full'
                        }`}
                      >
                        {msg.sender === 'system' ? (
                          <div className="bg-[#1A1A1A] dark:bg-zinc-800 text-white dark:text-zinc-100 rounded-lg px-2.5 py-1.5 text-[9px] font-mono font-bold tracking-wider uppercase text-center w-full shadow-inner">
                            {msg.text}
                          </div>
                        ) : (
                          <>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 mb-0.5 tracking-wider font-bold uppercase">{msg.sender === 'patient' ? 'INBOUND PATIENT' : 'VOXABOT LAB'} • {msg.time}</span>
                            <div className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed font-semibold shadow-sm ${
                              msg.sender === 'patient'
                                ? 'bg-[#0052FF] text-white rounded-tr-none'
                                : 'bg-brand-medium dark:bg-zinc-900 border border-black/5 dark:border-white/10 text-[#1A1A1A] dark:text-white rounded-tl-none'
                            }`}>
                              {msg.text}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
 
                    {typingState && (
                      <div className="self-start flex flex-col max-w-[85%] items-start animate-pulse mr-auto">
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 mb-0.5 font-bold uppercase">VOXABOT LAB AI TYPING...</span>
                        <div className="rounded-xl rounded-tl-none bg-brand-medium dark:bg-zinc-900 border border-black/5 dark:border-white/10 px-3 py-2 text-[11px] text-slate-600 dark:text-slate-350 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.2s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Scenarios selection panel */}
              <div className="border-t border-black/5 dark:border-white/10 pt-4">
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Simulated Laboratory Questions</p>
                <div className="grid grid-cols-2 gap-2 h-32 overflow-y-auto pr-1">
                  {scenarios.map((scen) => (
                    <button
                      key={scen.id}
                      onClick={() => handleScenarioClick(scen)}
                      className={`text-left rounded-lg p-2 text-[10px] leading-tight border transition-all truncate select-none cursor-pointer font-bold ${
                        selectedScenario === scen.id
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-[#0052FF] dark:border-blue-400 text-[#0052FF] dark:text-blue-300'
                          : 'bg-white dark:bg-zinc-900 border-black/15 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-black/30 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-zinc-800 shadow-sm'
                      }`}
                      id={`lab-scenario-${scen.id}`}
                    >
                      “{scen.question}”
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Lab Key Benefits */}
      <section className="py-24 border-t border-black/10 dark:border-white/10 bg-[#F4F4F0]/40 dark:bg-[#121212]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] dark:text-white uppercase leading-[0.95] heading-inter-heavy">
              Key Benefits Engineered Specifically for Diagnostic Labs
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              We understand diagnostic laboratory pipelines—minimizing test cancellation rates due to improper preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, bIdx) => (
              <motion.div
                key={bIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: bIdx * 0.1 }}
                className="rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#161616] p-6 md:p-8 hover:border-[#0052FF]/20 dark:hover:border-blue-500/20 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md hover-lift"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-[#0052FF] dark:text-blue-450 group-hover:scale-105 transition-transform animate-pulse">
                    {bIdx === 0 ? <Clock className="h-5 w-5" /> : 
                     bIdx === 1 ? <FileSpreadsheet className="h-5 w-5" /> :
                     bIdx === 2 ? <ShieldCheck className="h-5 w-5" /> :
                     bIdx === 3 ? <MapPin className="h-5 w-5" /> :
                     <Activity className="h-5 w-5" />}
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-[#1A1A1A] dark:text-white group-hover:text-[#0052FF] dark:group-hover:text-blue-400 transition-colors uppercase">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Injected recommended list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 5 * 0.1 }}
              className="rounded-3xl border border-dashed border-blue-500/20 dark:border-blue-400/20 bg-blue-50/20 dark:bg-blue-950/10 p-6 md:p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <h3 className="font-display text-[10px] font-bold text-[#0052FF] dark:text-blue-400 uppercase tracking-widest mb-4">Highly Recommended For</h3>
                <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-semibold w-full">
                  {targetBestFor.map((best, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] dark:bg-blue-400 shrink-0 animate-ping" />
                      <span>{best}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Safety clinical guidelines note for Pathology */}
      <section className="py-24 border-t border-black/10 dark:border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/10 p-8 flex flex-col sm:flex-row items-start gap-5 shadow-sm hover-lift"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-500 dark:text-rose-455 shrink-0 animate-pulse">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-display text-base font-extrabold text-rose-950 dark:text-rose-105 uppercase tracking-wide">Strict Pathology Communication Boundary</h4>
              <p className="text-sm text-rose-800 dark:text-rose-300 leading-relaxed font-semibold">
                Voxabot Lab Assistant under no circumstances interprets diagnostic, pathology or chemical laboratory results medically. It supports operational communication ONLY—verifying whether a patient’s laboratory file is ready for pick up or emailing. Any questions regarding medical definitions or clinical analysis are routed directly to qualified professionals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Bottom Call-to-Action Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed bottom-6 inset-x-4 z-40 max-w-xl mx-auto flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/75 dark:bg-zinc-900/75 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl text-slate-900 dark:text-white"
          >
            <div className="flex items-center gap-2.5 p-1">
              <div className="h-2.5 w-2.5 rounded-full bg-[#0052FF]" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">Pathology First</p>
                <p className="text-xs font-bold uppercase tracking-tight">Ready to Automate your Pathology Lab?</p>
              </div>
            </div>
            <button
              onClick={onBookDemoClick}
              className="bg-[#0052FF] hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-tighter px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer select-none shrink-0"
            >
              Book Lab Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
