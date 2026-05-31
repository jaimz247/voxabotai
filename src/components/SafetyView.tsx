/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ShieldAlert, Heart, Siren, AlertCircle } from 'lucide-react';

export default function SafetyView() {
  const helpsWith = [
    'Automated appointment enquiries & booking workflows',
    'Providing clinic opening hours & branch location directions',
    'Instant response to service catalogue & test pricing enquiries',
    'Delivering clear, approved pre-test preparation instructions',
    'Proactive result-readiness notifications & collection details',
    'Friendly, multi-channel appointment follow-ups & reminders',
    'Sending immediate alerts to human clinical staff for urgent attention',
    'Logging all inbound patient enquiries into an organized dashboard',
  ];

  const doesNotDo = [
    'Does NOT diagnose medical conditions or perform symptom checks',
    'Does NOT prescribe any medication or treatment plans',
    'Does NOT interpret laboratory test results clinically',
    'Does NOT attempt to replace standard doctors, nurses, or lab staff',
    'Does NOT handle life-threatening clinical emergencies independently',
    'Does NOT make clinical or therapeutic treatment decisions',
  ];

  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-slate-950 to-brand-dark overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest leading-none">
            <Heart className="h-3.5 w-3.5 shrink-0" />
            <span>Safety & Compliance Core</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-[0.95] heading-inter-heavy">
            Built to Support Healthcare Teams — <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Not Replace Them</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Voxabot AI is engineered specifically for non-clinical patient communications, administration, scheduling, and notifications. We strictly safeguard medical boundaries.
          </p>
        </div>

        {/* Dynamic Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Section 1: Help with */}
          <div className="rounded-2xl border border-emerald-500/10 bg-gradient-to-tr from-slate-900/60 to-emerald-950/10 p-8 sm:p-10 flex flex-col justify-between hover:border-emerald-500/20 transition-all relative group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/1 rounded-tr-2xl rounded-bl-3xl" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Voxabot AI Handles</h3>
                  <p className="text-xs text-emerald-500/70 uppercase font-medium">Administrative & Operational Tasks</p>
                </div>
              </div>

              <div className="space-y-4">
                {helpsWith.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-300 transition-colors group-hover:text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/10 text-xs text-emerald-400/80 bg-emerald-950/20 rounded-xl p-3 flex gap-2.5">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>Significantly reduces back-and-forth communication pressure, freeing human clinicians to attend directly to patients.</span>
            </div>
          </div>

          {/* Section 2: Does NOT do */}
          <div className="rounded-2xl border border-rose-500/10 bg-gradient-to-tr from-slate-900/60 to-rose-950/10 p-8 sm:p-10 flex flex-col justify-between hover:border-rose-500/20 transition-all relative group">
            <div className="absolute top-0 right-0 h-16 w-16 bg-rose-500/1 rounded-tr-2xl rounded-bl-3xl" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                  <ShieldAlert className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Voxabot AI Protects</h3>
                  <p className="text-xs text-rose-500/70 uppercase font-medium">Safe Clinical Boundaries</p>
                </div>
              </div>

              <div className="space-y-4">
                {doesNotDo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-950 text-rose-400 text-xs font-bold mt-0.5">
                      ✕
                    </span>
                    <p className="text-sm text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-500/10 text-xs text-rose-400/80 bg-rose-950/20 rounded-xl p-3 flex gap-2.5">
              <Siren className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-bounce" />
              <span>When a patient asks questions requiring medical human judgment, Voxabot instantly flags and securely routes the inquiry to your clinical team.</span>
            </div>
          </div>

        </div>

        {/* Central visual statement badge */}
        <div className="mt-12 rounded-2xl border border-white/5 bg-slate-900/30 p-6 text-center max-w-3xl mx-auto backdrop-blur-sm">
          <p className="text-sm text-slate-400 italic">
            "We believe that AI in medicine works best as a strong operational companion. By protecting the time of qualified clinical professionals and guaranteeing instant patient administrative feedback, patient experience skyrockets." 
          </p>
          <div className="flex justify-center items-center gap-2 mt-3.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-slate-500 tracking-wider">VOXABOT CLINICAL SAFETY FRAMEWORK v3.2</span>
          </div>
        </div>

      </div>
    </section>
  );
}
