/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  Calendar, 
  Activity, 
  Users, 
  Clock, 
  Compass,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { SimulatedScenario } from '../types';
import MapWithDirections from './MapWithDirections';

interface ClinicViewProps {
  onBookDemoClick: () => void;
}

export default function ClinicView({ onBookDemoClick }: ClinicViewProps) {
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
      id: 'clinic-scen-1',
      question: 'Are you open today?',
      reply: 'Yes, we are open today! Our standard consulting hours are from 8:00 AM to 6:00 PM. Doctors are currently on-site for both scheduled appointments and walk-in consultation reviews.',
      action: 'log',
      actionLabel: 'LOG STATUS CHECK',
      actionDetails: 'Triggered Standard Outbound Informational Flow.'
    },
    {
      id: 'clinic-scen-2',
      question: 'Where are you located?',
      reply: 'We are located at 1414 N Shepherd Drive, Houston, Texas. You can reach our physical clinic easily—Google Map link: https://maps.google.com/example. Direct parking is available in front of the lobby entrance for all patient vehicles.',
      action: 'log',
      actionLabel: 'LOG GPS ROUTING',
      actionDetails: 'Inbound FAQ: Navigation Guidelines Delivered.'
    },
    {
      id: 'clinic-scen-3',
      question: 'Can I book an appointment?',
      reply: 'I can absolutely help you schedule that! We have visual openings with our Consultant Physician tomorrow at 9:30 AM and 11:00 AM. May I get your Full Name and preferred time duration to block the slot for you?',
      action: 'book',
      actionLabel: 'BOOKING FUNNEL INITIATED',
      actionDetails: 'Initiating intake workflow calendar mapping...'
    },
    {
      id: 'clinic-scen-4',
      question: 'How much is consultation?',
      reply: 'Standard general physician consultation is ₦15,000. Specialist consultation reviews start at ₦35,000 depending on your requested department. Let me know if you would like me to book a general or specialist slot today!',
      action: 'log',
      actionLabel: 'LOG PRICING FAQ',
      actionDetails: 'Pricing Matrix category: General Medical'
    },
    {
      id: 'clinic-scen-5',
      question: 'Do you accept HMO?',
      reply: 'Yes, we accept all verified HMO medical cards, including AXA Mansard, Reliance Health, Hygeia, Avon HMO, and several general corporate networks. Kindly bring your physical HMO identity card with you during check-in.',
      action: 'log',
      actionLabel: 'LOG HMO COVERAGE',
      actionDetails: 'Matching internal HMO lists database...'
    },
    {
      id: 'clinic-scen-6',
      question: 'Can I see a doctor today?',
      reply: 'We have 2 immediate walk-in consultation slots open today between 3:00 PM and 5:00 PM. Our triage nurse will receive you upon arrival. Would you like me to register your intent to check in?',
      action: 'remind',
      actionLabel: 'STAFF NOTIFIED',
      actionDetails: 'Walk-in request alert dispatched to clinic nurse console.'
    },
    {
      id: 'clinic-scen-7',
      question: 'Can I reschedule my appointment?',
      reply: 'Certainly! Could you kindly share your registered Patient ID Number or Mobile Number? I will search our calendar logs and present alternative time slots for your convenience.',
      action: 'escalate',
      actionLabel: 'CALENDAR SYNC',
      actionDetails: 'Inbound reschedule parameters triggered.'
    },
    {
      id: 'clinic-scen-8',
      question: 'I called earlier but no one picked.',
      reply: 'I apologize sincerely! Our human team was heavily engaged with inpatient check-ins earlier. I am the Voxabot Clinical Representative. I can answer all your booking, pricing, and timing questions right now. How may I support you?',
      action: 'remind',
      actionLabel: 'MISSED CALL RECOVERED',
      actionDetails: 'Inbound missed call resolved via automatic fallback flow.'
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

  const keyBenefits = [
    {
      title: 'Faster Patient Response',
      desc: 'Patients get quick, instant answers to urgent, common questions about session appointments, location directions, service catalogue details, and general operational hours.',
    },
    {
      title: 'More Booked Appointments',
      desc: 'Every inbound communication is guided towards proper appointment capture instead of being lost inside unanswered WhatsApp lines or delayed phone chats.',
    },
    {
      title: 'Fewer Missed Enquiries',
      desc: 'Inbound clinical missed calls automatically trigger localized follow-up prompts so potential outpatient bookings are never forgotten.',
    },
    {
      title: 'Less Front Desk Pressure',
      desc: 'Routine, repetitive administrative questions are fully handled automatically, allowing your physical team to focus on urgent and sensitive inpatient care.',
    },
    {
      title: 'Better Patient Experience',
      desc: 'Outpatients receive clearer automated reminders, direct calendar confirmations, guidelines, and administrative operational support.',
    },
  ];

  const bestFor = [
    'Private Outpatient Clinics',
    'Specialist Medical Practices',
    'Dental and Orthodontic Practices',
    'Eye Clinics & Optometrists',
    'Fertility & In-Vitro Centres',
    'Aesthetic & Dermatology clinics',
    'Physiotherapy & Rehabilitation Outposts',
    'Small and Medium Multi-department Hospitals',
  ];

  const functionalWorkflowSteps = [
    {
      id: 'cws-1',
      title: 'Patient Triggers Workflow',
      desc: 'An outpatient initiates contact by requesting an appointment, querying consultation cost, or following up on hours via call or chat.'
    },
    {
      id: 'cws-2',
      title: 'Voxabot Responds Instantly',
      desc: 'The clinical assistant handles APPROVED FAQs based on your customized pricing tables, location GPS, and operational rule books.'
    },
    {
      id: 'cws-3',
      title: 'Request Is Auto-Logged',
      desc: 'Patient contact, name, and service interests are safely structured and logged to your centralized dashboard or sheets files.'
    },
    {
      id: 'cws-4',
      title: 'Escalation Alert Shipped',
      desc: 'If a patient expresses clinical discomfort, symptoms, or acute demands, Voxabot triggers immediate notification alerting physical nurses.'
    },
    {
      id: 'cws-5',
      title: 'Follow-up Loop Sent',
      desc: 'Patients automatically receive check-in alerts and appointment reminders 24 hours prior, reducing no-show ratios dramatically.'
    }
  ];

  return (
    <div className="relative z-10 bg-brand-dark">
      
      {/* Hero Visual Area Backdrop */}
      <div className="absolute top-0 inset-x-0 h-160 bg-[linear-gradient(to_bottom,rgba(0,82,255,0.03),transparent)] -z-10" />
      <div className="absolute top-40 right-10 h-96 w-96 rounded-full bg-[#0052FF]/2 blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 xl:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0052FF]" />
              <span>VOXABOT CLINIC FRONT DESK</span>
            </div>
            
            <h1 className="text-4xl md:text-[68px] leading-[0.85] text-slate-900 uppercase heading-inter-heavy">
              Give Your Clinic a <br /><span className="text-[#0052FF]">24/7 AI Front Desk</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl font-semibold">
              Voxabot Clinic Front Desk helps healthcare teams answer patient enquiries, book appointments, send reminders, and recover missed calls through instant WhatsApp and phone workflows.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onBookDemoClick}
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] hover:scale-105 active:scale-95 text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer shadow-lg"
              >
                <span>Book a Free Clinic Demo</span>
              </button>
            </div>

            <div className="border-t border-black/5 pt-6 mt-6 max-w-xl">
              <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
                “If your clinic misses an outbound enquiry or answers WhatsApp delayed, that patient may simply contact another outpatient provider. Voxabot guarantees 100% immediate connectivity.”
              </p>
            </div>
          </motion.div>

          {/* Interactive Screen Simulator Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-5 relative"
          >
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl aspect-[9/16] w-full max-w-[400px] mx-auto flex flex-col justify-between relative overflow-hidden">
              
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-8 bg-slate-50 border-b border-black/5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">VOXABOT CLINIC SIMULATOR</span>
                </div>
                <div className="flex h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
              </div>

              {/* Chat Area */}
              <div className="flex-1 h-96 overflow-y-auto pt-10 pb-4 space-y-4 flex flex-col justify-end">
                {selectedScenario === null ? (
                  <div className="text-center p-6 space-y-4 my-auto">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-[#0052FF]">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-extrabold text-slate-900 uppercase tracking-wide">Click a patient inquiry below</h4>
                      <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">Select any simulated outpatient question to trigger the AI Clinical flow live!</p>
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
                          <div className="bg-[#1A1A1A] text-white rounded-lg px-2.5 py-1.5 text-[9px] font-mono font-bold tracking-wider uppercase text-center w-full shadow-inner">
                            {msg.text}
                          </div>
                        ) : (
                          <>
                            <span className="text-[9px] text-slate-500 mb-0.5 tracking-wider font-bold uppercase">{msg.sender === 'patient' ? 'PATIENT ENQUIRY' : 'VOXABOT AI'} • {msg.time}</span>
                            <div className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed font-semibold shadow-sm ${
                              msg.sender === 'patient'
                                ? 'bg-[#0052FF] text-white rounded-tr-none'
                                : 'bg-brand-medium border border-black/5 text-[#1A1A1A] rounded-tl-none'
                            }`}>
                              {msg.text}
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {typingState && (
                      <div className="self-start flex flex-col max-w-[85%] items-start animate-pulse mr-auto">
                        <span className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase">VOXABOT AI TYPING...</span>
                        <div className="rounded-xl rounded-tl-none bg-brand-medium border border-black/5 px-3 py-2 text-[11px] text-slate-600 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.2s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Patient question options */}
              <div className="border-t border-black/5 pt-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Simulated Outpatient Questions</p>
                <div className="grid grid-cols-2 gap-2 h-32 overflow-y-auto pr-1">
                  {scenarios.map((scen) => (
                    <button
                      key={scen.id}
                      onClick={() => handleScenarioClick(scen)}
                      className={`text-left rounded-lg p-2 text-[10px] leading-tight border transition-all truncate select-none cursor-pointer font-bold ${
                        selectedScenario === scen.id
                          ? 'bg-blue-50 border-[#0052FF] text-[#0052FF]'
                          : 'bg-white border-black/15 text-slate-700 hover:border-black/30 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                      }`}
                      id={`scenario-${scen.id}`}
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

      {/* Benefits Bento Grid */}
      <section className="py-24 border-t border-black/10 bg-[#F4F4F0]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
              Key Benefits for Clinic Admin and Healthcare Teams
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              We empower clinics and specialist centers by transforming chaotic administrative enquiries into smooth automation loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border border-black/5 bg-white p-6 md:p-8 hover:border-[#0052FF]/20 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#0052FF] group-hover:scale-105 transition-transform">
                    {index === 0 ? <Clock className="h-5 w-5" /> : 
                     index === 1 ? <Calendar className="h-5 w-5" /> :
                     index === 2 ? <FileCheck2 className="h-5 w-5" /> :
                     index === 3 ? <Users className="h-5 w-5" /> :
                     <Activity className="h-5 w-5" />}
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-[#1A1A1A] group-hover:text-[#0052FF] transition-colors uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
 
            {/* Injected Best For Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 5 * 0.1 }}
              className="rounded-3xl border border-dashed border-blue-500/20 bg-blue-50/20 p-6 md:p-8 lg:col-span-1 flex flex-col justify-between shadow-sm"
            >
              <div>
                <h3 className="font-display text-[10px] font-bold text-[#0052FF] uppercase tracking-widest mb-4">Highly Recommended For</h3>
                <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-700 font-semibold">
                  {bestFor.map((best, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] shrink-0" />
                      <span>{best}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flow Steps specifico layout */}
      <section className="py-24 border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
              How the Clinic Inpatient/Outpatient Flow Operates
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
              We connect smoothly to your outpatient number. Setup requires zero software change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {functionalWorkflowSteps.map((s, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl border border-black/5 bg-white p-5 mt-4 flex flex-col gap-4 shadow-sm"
              >
                <span className="absolute top-4 right-4 text-3xl font-display font-extrabold text-slate-100">0{idx + 1}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0052FF] text-xs font-bold font-mono">
                  0{idx + 1}
                </div>
                <h4 className="font-display text-sm font-extrabold text-[#1A1A1A] tracking-tight uppercase">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* safety note clinical integration box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-3xl border border-rose-200 bg-rose-50/40 p-6 flex items-start gap-4 max-w-4xl mx-auto shadow-sm"
          >
            <AlertCircle className="h-5.5 w-5.5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-extrabold text-rose-950 uppercase tracking-wide">Clinical Safety Protocols Enforced</h4>
              <p className="text-xs text-rose-800 leading-relaxed mt-1 font-semibold">
                Voxabot Clinic Front Desk supports operational patient queries and general reminders only. It does not diagnose clinical issues, prescribe therapeutic pills, or advise treatment. Medical complaints or urgent diagnostic checkups are securely routed to the physical clinical nurse team instantly.
              </p>
            </div>
          </motion.div>

          {/* Real-time driving directions and locator map */}
          <div className="mt-16 pt-16 border-t border-black/5">
            <MapWithDirections />
          </div>

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
                <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">Clinicians First</p>
                <p className="text-xs font-bold uppercase tracking-tight">Ready to Automate your Front Desk?</p>
              </div>
            </div>
            <button
              onClick={onBookDemoClick}
              className="bg-[#0052FF] hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-tighter px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer select-none shrink-0"
            >
              Book Clinic Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
