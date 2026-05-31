/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Quote, Star, Sparkles, ShieldCheck } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  facility: string;
  avatarText: string;
  category: 'Clinic' | 'Lab';
}

export default function TestimonialsView() {
  const testimonials: Testimonial[] = [
    {
      quote: "Voxabot has completely transformed our front-of-house operations. Outpatient bookings are synchronized instantly without putting pressure on our nurses. Highly recommended!",
      author: "Dr. Chinedu Okafor",
      role: "Medical Director",
      facility: "Crestview Outpatient Practice",
      avatarText: "CO",
      category: "Clinic"
    },
    {
      quote: "Our diagnostic lab was receiving hundreds of repetitive calls checking on fasting rules or result availability. Voxabot handles these completely, saving our phlebotomists 20+ hours a week.",
      author: "Sarah Mensah",
      role: "Operations Chief",
      facility: "Apex Diagnostics Group",
      avatarText: "SM",
      category: "Lab"
    },
    {
      quote: "Patients show up perfectly prepared for laser consultations now because of the automatic preparation workflows on WhatsApp. We have registered zero calendar slot cancellations.",
      author: "Dr. Elizabeth Vance",
      role: "Lead Dermatologist",
      facility: "Vance Aesthetic Center",
      avatarText: "EV",
      category: "Clinic"
    },
    {
      quote: "Integrating this was completely non-disruptive. It runs on top of our existing clinic number. We can capture weekend dental appointment queries even when our doors are closed.",
      author: "Marcus Adebayo",
      role: "Practice Manager",
      facility: "Lakeside Orthodontics",
      avatarText: "MA",
      category: "Clinic"
    },
    {
      quote: "The patient satisfaction rates have soared. They get instant, accurate consulting fees and HMO coverage specifications at 11:00 PM without waiting for tomorrow's business hours.",
      author: "Fatima Abubakar",
      role: "Lead Pathologist",
      facility: "Abubakar Pathology Lab",
      avatarText: "FA",
      category: "Lab"
    },
  ];

  // Duplicate for seamless infinite marquee scrolling
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 border-t border-black/10 bg-[#FCD34D]/5 overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 inset-x-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,82,255,0.01),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0052FF]/10 bg-blue-50 px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-[#0052FF] shrink-0" />
          <span>Validated Partner Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1A1A] uppercase leading-[0.95] heading-inter-heavy">
          Loved by Clinics &amp; Laboratory Partners
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-semibold">
          Discover how modern medical coordinators and pathologists are achieving absolute communication coverage.
        </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full flex overflow-x-hidden py-4 select-none">
        {/* Shadow Overlays for depth */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-brand-dark to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-brand-dark to-transparent z-10" />

        {/* Carousel Tracks using Framer Motion */}
        <motion.div 
          className="flex gap-6 pr-6 py-2 shrink-0 w-max"
          animate={{ x: [0, -2000] }}
          transition={{ 
            ease: "linear", 
            duration: 45, 
            repeat: Infinity 
          }}
        >
          {marqueeItems.map((test, index) => (
            <div 
              key={index}
              className="w-[340px] md:w-[400px] shrink-0 rounded-3xl border border-black/10 bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm hover:border-[#0052FF]/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border leading-none ${
                    test.category === 'Clinic'
                      ? 'bg-blue-50 border-blue-100 text-[#0052FF]'
                      : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                  }`}>
                    {test.category} partner
                  </span>
                </div>
                
                <p className="text-sm text-slate-700 leading-relaxed font-semibold italic">
                  “{test.quote}”
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-black/5 mt-6">
                <div className="h-10 w-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs uppercase tracking-wider">
                  {test.avatarText}
                </div>
                <div>
                  <h4 className="font-display text-sm font-extrabold text-[#1A1A1A] leading-tight">
                    {test.author}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mt-1">
                    {test.role} • <span className="text-[#0052FF]">{test.facility}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
