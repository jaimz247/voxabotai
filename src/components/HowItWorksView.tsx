/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Search, 
  Settings, 
  GitMerge, 
  BadgeCheck, 
  Rocket, 
  LineChart,
  Calendar,
  Sparkles
} from 'lucide-react';
import { StepItem } from '../types';

interface HowItWorksViewProps {
  onBookDemoClick: () => void;
}

export default function HowItWorksView({ onBookDemoClick }: HowItWorksViewProps) {
  const steps: (StepItem & { icon: any; color: string; badge: string })[] = [
    {
      number: 1,
      title: 'Discovery Phase',
      description: 'We learn how your facility currently handles patient enquiries, appointment requests, lab questions, missed calls, reminders, and patient follow-ups.',
      icon: Search,
      color: 'from-blue-500 to-indigo-500',
      badge: 'Analysis'
    },
    {
      number: 2,
      title: 'Workflow Design',
      description: 'We map out the most critical patient conversations your AI assistant should handle—including common FAQs, booking procedures, escalation rules, and staff notification alerts.',
      icon: GitMerge,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Strategy'
    },
    {
      number: 3,
      title: 'AI Assistant Setup',
      description: 'We configure Voxabot AI around your specific healthcare facility’s list of services, pricing structure, working hours, active branches, test catalog, and approved clinical responses.',
      icon: Settings,
      color: 'from-cyan-500 to-blue-500',
      badge: 'Development'
    },
    {
      number: 4,
      title: 'Validation & Testing',
      description: 'Your administrative and clinical teams test the assistant in real-time. We carefully refine the flow of replies, text language tone, escalation scenarios, and patient experience.',
      icon: BadgeCheck,
      color: 'from-purple-500 to-pink-500',
      badge: 'Quality'
    },
    {
      number: 5,
      title: 'Continuous Launch',
      description: 'Your customized AI front desk goes live! It begins responding instantly to patient enquiries, WhatsApp chat streams, appointment booking setups, reminders, or lab communications.',
      icon: Rocket,
      color: 'from-orange-500 to-amber-500',
      badge: 'Deployment'
    },
    {
      number: 6,
      title: 'Monitor & Optimize',
      description: 'We track overall interaction usage, unhandled questions, appointment conversion rates, missed call recoveries, and follow-up opportunities, improving the AI model continuously over time.',
      icon: LineChart,
      color: 'from-teal-500 to-emerald-500',
      badge: 'Growth'
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative z-10 py-24 bg-brand-dark overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 -z-10 h-112 w-112 rounded-full bg-[#0052FF]/2 blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 left-0 -z-10 h-112 w-112 rounded-full bg-[#0052FF]/2 blur-3xl opacity-60"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#0052FF]" />
            <span>Deployment Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
            Simple to Deploy. <br /><span className="text-[#0052FF]">Easy for Your Team to Use.</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
            Voxabot AI integrates directly with the existing software tools your healthcare team already uses — phones, WhatsApp numbers, calendars, spreadsheets, and front-desk workflows.
          </p>
        </div>

        {/* Dynamic Connected Pipeline Timeline */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative rounded-3xl border border-black/5 bg-white hover:bg-slate-50/50 p-8 hover:border-black/10 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Background active hover gradient bar */}
                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-slate-100 group-hover:bg-[#0052FF] transition-all duration-350" />

                <div className="space-y-6">
                  {/* Step No Badge & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#0052FF] transition-colors">
                      Phase 0{step.number}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-50 border border-black/5 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase text-slate-500">
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#0052FF] group-hover:scale-105 transition-transform">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-[#1A1A1A] group-hover:text-[#0052FF] transition-colors uppercase">
                      {step.title}
                    </h3>
                  </div>

                  {/* Body Copy */}
                  <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                    {step.description}
                  </p>
                </div>

                {/* Number Watermark at Bottom Right */}
                <div className="mt-8 pt-4 flex items-center justify-between border-t border-black/5">
                  <span className="text-xs text-slate-400 font-bold font-mono">STEP 0{step.number}/06</span>
                  <span className="font-display text-[48px] font-extrabold text-slate-100 group-hover:text-blue-100 select-none transition-colors leading-none">
                    {step.number}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Integration notice statement */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
            COMPATIBLE WITH CALENDLY • GOOGLE SHEETS • EXCEL • HUBSPOT • ACTIVE CAMPAIGN • PRACTICE DASHBOARDS
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onBookDemoClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] hover:bg-[#0052FF] hover:scale-105 active:scale-95 text-white px-8 py-5 text-xs font-black uppercase tracking-tighter btn-heavy transition-all cursor-pointer shadow-lg"
            >
              <span>Schedule Live Implementation Call</span>
              <Calendar className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
