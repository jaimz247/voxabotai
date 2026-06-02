/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQView() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq-1',
      question: 'What is Voxabot AI?',
      answer: 'Voxabot AI is an AI front-desk solution for healthcare businesses. It helps clinics, hospitals, labs, and diagnostic centres answer patient enquiries, manage WhatsApp conversations, support appointment booking, send automated reminders, and route complex or clinical issues immediately to human staff.',
    },
    {
      id: 'faq-2',
      question: 'Is Voxabot AI only for large hospitals?',
      answer: 'No. Voxabot AI is highly flexible and can be customized and configured for small private clinics, specialist practices, diagnostic centres, single clinical labs, as well as large multi-branch hospital systems.',
    },
    {
      id: 'faq-3',
      question: 'Does Voxabot AI replace our front-desk staff?',
      answer: 'No. Voxabot AI is designed to support and empower your existing front-desk team. It handles routine, repetitive questions (like directions, hours, basic pricing, status checks) and captures patient requests automatically. This allows your human staff to focus on critical, sensitive, or high-priority in-person tasks.',
    },
    {
      id: 'faq-4',
      question: 'Can it work with WhatsApp?',
      answer: 'Yes. Voxabot AI features complete, highly certified WhatsApp workflows, supporting FAQs, guiding appointment request capture, sending automated appointment notifications, lab-result readiness status, and pre-test preparation instructions.',
    },
    {
      id: 'faq-5',
      question: 'Can it answer phone calls?',
      answer: 'Yes. Voxabot AI can support multiple calling workflows, including missed-call recovery triggers (sending an immediate automated WhatsApp or SMS follow-up if a call is missed during busy hours), live call booking assistance, and out-of-hours answer assistance depending on your custom setup and workflow preferences.',
    },
    {
      id: 'faq-6',
      question: 'Can it book appointments?',
      answer: "Yes, absolutely. It naturally captures the patient's full name, contact information, preferred date and time, and the clinical service they are interested in. Voxabot then routes this formatted request directly into your calendar, spreadsheet, CRM, database, or existing workflow system.",
    },
    {
      id: 'faq-7',
      question: 'Can it handle lab result questions?',
      answer: 'It handles operational result-readiness workflows beautifully—letting patients know whether their laboratory results are ready for collection, explaining how they can receive them (email, pick up, or secure WhatsApp document download), and confirming opening hours for physical collection.',
    },
    {
      id: 'faq-8',
      question: 'Can Voxabot AI interpret lab results medically?',
      answer: 'No. Under no circumstances does Voxabot AI interpret clinical lab result files clinically or provide diagnostic feedback. Voxabot AI strictly supports administrative operations. Any clinical or diagnostic question requiring medical training is flagged and securely routed to your lab professionals instantly.',
    },
    {
      id: 'faq-9',
      question: 'How long does a typical setup take?',
      answer: 'A simple trial or pilot centered around your custom clinical FAQs, basic pricing table, working hours, and WhatsApp setup can usually be structured and deployed online in under a week once we receive your approved informational materials.',
    },
    {
      id: 'faq-10',
      question: 'Do we need to replace our current software?',
      answer: 'No replacements are required. Voxabot AI is engineered to integrate non-disruptively beside your current workflows—working seamlessly alongside your regular phones, WhatsApp numbers, calendars, spreadsheets, and front-desk processes.',
    },
    {
      id: 'faq-11',
      question: 'How do we get started?',
      answer: 'Simply request a free live demo! We’ll review your current patient intake process, pinpoint where calls or messages are being lost or delayed, and construct a custom Voxabot setup configured for your exact clinic or diagnostic lab workflow.',
    },
  ];

  return (
    <section className="relative z-10 py-24 bg-brand-dark dark:bg-[#0A0A0A] overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl opacity-60"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest leading-none">
            <HelpCircle className="h-3.5 w-3.5 leading-none shrink-0 text-emerald-650 dark:text-emerald-400" />
            <span>Operational FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white uppercase leading-[0.95] heading-inter-heavy">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
            Get quick answers on how Voxabot AI seamlessly operates alongside clinical staff, maintains compliance, and integrates into healthcare workflows.
          </p>
        </div>

        {/* Dynamic Accordion items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="group rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/70 hover:border-black/10 dark:hover:border-white/10 transition-all overflow-hidden shadow-sm dark:shadow-none"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer select-none"
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="font-display text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-950 group-hover:dark:text-white transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <motion.div 
                        initial={{ x: -12, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -12, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
                        className="border-t border-black/5 dark:border-white/5 px-6 pb-5 pt-4"
                      >
                        <p className="text-sm text-slate-655 dark:text-slate-400 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
