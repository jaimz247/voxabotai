/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Phone, Sparkles, Volume2, ShieldCheck, HelpCircle, ArrowUpRight } from 'lucide-react';

const ElevenLabsConvai = 'elevenlabs-convai' as any;

export default function VoxabotVoiceAgent() {
  const suggestedCommands = [
    { text: "Are you open on weekends?", desc: "Test operational hours inquiries" },
    { text: "Can I book an appointment for tomorrow?", desc: "Test clinical appointment scheduling" },
    { text: "Do you accept AXA Mansard or Reliance HMO?", desc: "Test health insurance coverage check" },
    { text: "What is your clinic location?", desc: "Test driving directions and location help" }
  ];

  return (
    <div className="relative rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-[#0E0E0F] p-6 sm:p-8 shadow-xl overflow-hidden group">
      {/* Dynamic Background Accents */}
      <div className="absolute -top-10 -right-10 h-36 w-36 bg-[#0052FF]/5 dark:bg-[#0052FF]/10 rounded-full blur-2xl transition-all group-hover:scale-110 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-5 mb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-[9px] font-black text-[#0052FF] uppercase tracking-widest leading-none">
            <Sparkles className="h-3 w-3 shrink-0" />
            <span>Interactive Voice Pilot</span>
          </div>
          <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            Speak with Voxabot AI <Volume2 className="h-5 w-5 text-[#0052FF] animate-pulse" />
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-wider">
          <span>MODULE: ELEVENLABS_CONVAI</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* Left Side: Voice Visualization & Native ElevenLabs Embed Element */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between items-center p-6 rounded-2xl bg-slate-50 dark:bg-[#161618] border border-black/5 dark:border-white/5 text-center min-h-[280px]">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#0052FF] dark:text-blue-400">Live Voice Stream</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Click the official phone assistant controller widget underneath to start a hands-free conversation.
            </p>
          </div>

          {/* Glowing Dial / Sound visualizer mockup wrapper */}
          <div className="relative my-6 flex items-center justify-center">
            
            {/* Pulsing visual circles */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.05, 0.15] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute h-32 w-32 rounded-full border border-blue-500 pointer-events-none" 
            />
            <motion.div 
              animate={{ scale: [1, 1.45, 1], opacity: [0.1, 0.02, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.4, ease: "easeInOut" }}
              className="absolute h-40 w-40 rounded-full border border-emerald-500 pointer-events-none" 
            />

            {/* Simulated Microphone / Call icon container */}
            <div className="relative h-20 w-20 rounded-full bg-slate-900 border-2 border-slate-800 dark:border-white/10 shadow-lg flex items-center justify-center text-white z-10 overflow-visible">
              <Phone className="h-6 w-6 text-emerald-400 animate-pulse" />
              
              {/* ElevenLabs Custom Widget Embed overlayed right at the center of the ring */}
              <div className="absolute inset-0 flex items-center justify-center overflow-visible scale-[1.5] cursor-pointer origin-center opacity-95 hover:opacity-100 transition-opacity">
                <ElevenLabsConvai agent-id="agent_1501kt1zj0agfjj86gkr57md9d47"></ElevenLabsConvai>
              </div>
            </div>
          </div>

          <div className="space-y-2 w-full pt-2">
            {/* Embedded Instruction Details */}
            <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400">
              <span className="h-1 text-emerald-600 dark:text-emerald-400 animate-ping">●</span>
              <span>Secure Full-Duplex Connection</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Complies with Medical Privacy</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Trial Prompt Suggestions */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-[#0052FF]" />
              <span>What can you ask the assistant?</span>
            </h4>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Our clinical voice pilot is customized to understand diverse outpatient scheduling workflows, service pricing, lab-result ready status checks, and common medical facility policies. Try speaking these templates:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {suggestedCommands.map((cmd, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131315] border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all"
                >
                  <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight line-clamp-2">
                    “{cmd.text}”
                  </p>
                  <p className="text-[9px] text-[#0052FF] dark:text-blue-400 mt-1 font-bold uppercase tracking-wider">
                    {cmd.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info footer */}
          <div className="p-3.5 rounded-2xl bg-[#0052FF]/2 border border-[#0052FF]/5 flex items-start gap-3">
            <span className="text-[10px] font-black text-[#0052FF] bg-[#0052FF]/10 px-1.5 py-0.5 rounded-md mt-0.5 select-none shrink-0 font-mono">ADVICE</span>
            <p className="text-[10px] text-slate-650 dark:text-slate-400 leading-normal font-semibold">
              For optimal test performance, please ensure you allow browser microphone permissions when prompted by the ElevenLabs widget once you initiate the talk loop.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
