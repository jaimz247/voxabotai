/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Lock, 
  Dna,
  Printer
} from 'lucide-react';

interface PatientAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
}

interface TestSchedule {
  id: string;
  testName: string;
  date: string;
  time: string;
  preparationInstructions: string;
  laboratory: string;
}

interface CompletedLabResult {
  id: string;
  testName: string;
  releasedDate: string;
  doctorApproved: string;
  status: 'Ready to Download' | 'Pending Interpretation';
  fileSize: string;
  simulatedFileName: string;
}

export default function PatientPortalView() {
  const [phoneNumber, setPhoneNumber] = useState('2348031234567');
  const [isLogged, setIsLogged] = useState(true); // Default true for direct preview satisfaction, let them toggle
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState('');

  const patientProfile = {
    name: 'Sarah Adebayo',
    patientId: 'VX-5092-B',
    age: 34,
    gender: 'Female',
    bloodType: 'O+'
  };

  const appointments: PatientAppointment[] = [
    {
      id: 'app-1',
      doctor: 'Dr. Evelyn Peters',
      specialty: 'Clinical Endocrinology',
      date: 'May 30, 2026 - 10:30 AM',
      status: 'Upcoming'
    },
    {
      id: 'app-2',
      doctor: 'Dr. Evelyn Peters',
      specialty: 'Clinical Endocrinology',
      date: 'May 16, 2026 - 02:15 PM',
      status: 'Completed'
    },
    {
      id: 'app-3',
      doctor: 'Dr. John Mensah',
      specialty: 'Pathology Diagnostics',
      date: 'May 10, 2026 - 08:00 AM',
      status: 'Completed'
    }
  ];

  const testSchedules: TestSchedule[] = [
    {
      id: 'test-1',
      testName: 'Fast Serum Glucose & HbA1c',
      date: 'June 04, 2026',
      time: '08:30 AM',
      preparationInstructions: 'Strict fast for 12 hours preceding blood draw. Water only is permitted.',
      laboratory: 'Main Clinical Lab A'
    },
    {
      id: 'test-2',
      testName: 'Lipid Lipid Fractionation Panel',
      date: 'June 04, 2026',
      time: '08:45 AM',
      preparationInstructions: 'Refrain from alcohol for 24 hours and fat-dense foods.',
      laboratory: 'Main Clinical Lab A'
    }
  ];

  const labResults: CompletedLabResult[] = [
    {
      id: 'res-1',
      testName: 'Comprehensive Metabolic Panel (CMP-14)',
      releasedDate: 'May 24, 2026',
      doctorApproved: 'Dr. John Mensah',
      status: 'Ready to Download',
      fileSize: '1.4 MB',
      simulatedFileName: 'CMP_SarahAdebayo_May24.pdf'
    },
    {
      id: 'res-2',
      testName: 'Complete Blood Count with Differential (CBC)',
      releasedDate: 'May 24, 2026',
      doctorApproved: 'Dr. John Mensah',
      status: 'Ready to Download',
      fileSize: '820 KB',
      simulatedFileName: 'CBC_SarahAdebayo_May24.pdf'
    },
    {
      id: 'res-3',
      testName: 'Thyroid Stimulating Hormone (Ultra-Sensitive)',
      releasedDate: 'May 11, 2026',
      doctorApproved: 'Dr. Evelyn Peters',
      status: 'Ready to Download',
      fileSize: '1.1 MB',
      simulatedFileName: 'TSH_SarahAdebayo_May11.pdf'
    }
  ];

  const handleSimulateDownload = (result: CompletedLabResult) => {
    setActiveReportId(result.id);
    
    // Simulate API delay and download triggering
    setTimeout(() => {
      setActiveReportId(null);
      // Create and trigger simulated download
      const content = `VOXABOT PATHOLOGY OUTPATIENT PORTAL
===========================================
PATIENT: ${patientProfile.name}
PATIENT ID: ${patientProfile.patientId}
TEST COMPLETED: ${result.testName}
COMPLETION DATE: ${result.releasedDate}
APPROVED BY: ${result.doctorApproved}
STATUS: PASSED - STANDARD OUTPATIENT RANGE REFERRAL.
===========================================
This is an official certified diagnostic report.`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', result.simulatedFileName.replace('.pdf', '_Report.txt'));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccessMessage(`Secure Outpatient Report "${result.simulatedFileName}" successfully downloaded to your device.`);
      setTimeout(() => setDownloadSuccessMessage(''), 4000);
    }, 1500);
  };

  const handlePatientLogin = (e: FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length > 6) {
      setIsLogged(true);
    }
  };

  return (
    <div className="relative z-10 bg-brand-dark dark:bg-[#0A0A0A] bg-grid-ambient min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        {/* Dynamic Header Block */}
        <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] px-4 py-2 text-[10px] font-bold text-[#0052FF] uppercase tracking-widest leading-none shadow-sm">
          <HeartPulse className="h-3.5 w-3.5 shrink-0 text-[#0052FF]" />
          <span>Voxabot Patient Hub Portals</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-[0.95] heading-inter-heavy">
          Secure Patient Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-sans font-medium text-sm sm:text-base max-w-3xl leading-relaxed">
          Access your appointment timelines, view preparatory diagnostic guidelines, and safely download authorized lab results verified by hospital pathologists.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isLogged ? (
          /* Authentication Screen Simulator */
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto my-12 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col gap-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0052FF] mx-auto">
              <Lock className="h-6 w-6" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Patient Identification Access</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-relaxed">
                Enter your registered outpatient phone number linked to your diagnostics files.
              </p>
            </div>

            <form onSubmit={handlePatientLogin} className="space-y-4 pt-2">
              <div>
                <label className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Registered OUTBOUND Phone (with country code)</label>
                <input
                  type="text"
                  placeholder="e.g. 2348031234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#0052FF]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-tighter py-4 shadow-md transition-all cursor-pointer btn-heavy"
              >
                <span>Authorize &amp; Fetch Records</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            </form>
          </motion.div>
        ) : (
          /* Active Portal View */
          <motion.div 
            key="portal-main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left side card: Patient info and diagnostics downloads */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Patient Badge summary */}
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="absolute top-0 left-0 bottom-0 bg-[#0052FF] w-1.5" />
                <div className="flex items-center gap-4 pl-2">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-[#1A1A1A] text-[#0052FF] dark:text-blue-400 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{patientProfile.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Patient ID: <code className="text-slate-700 dark:text-slate-300">{patientProfile.patientId}</code></p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center text-xs font-semibold text-slate-500 border-l border-black/5 dark:border-white/10 pl-6 shrink-0">
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Age</p>
                    <p className="text-slate-900 dark:text-white font-bold">{patientProfile.age}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Gender</p>
                    <p className="text-slate-900 dark:text-white font-bold">{patientProfile.gender}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Blood Type</p>
                    <p className="text-rose-500 font-extrabold">{patientProfile.bloodType}</p>
                  </div>
                </div>
              </div>

              {/* Lab Results section with Download buttons */}
              <div className="bg-white dark:bg-[#111111] rounded-3xl border border-black/5 dark:border-white/5 p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                  <Dna className="h-5 w-5 text-[#0052FF]" />
                  <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Completed Laboratory Files</h3>
                </div>

                {downloadSuccessMessage && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 dark:text-emerald-400 text-xs font-semibold shadow-sm">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>{downloadSuccessMessage}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {labResults.map((result) => (
                    <div key={result.id} className="group border border-black/5 dark:border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-black/10 dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-[#1A1A1A]/20 transition-all">
                      <div className="text-left space-y-1.5 pl-1">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">{result.testName}</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Released: {result.releasedDate} &bull; Clinical Approver: {result.doctorApproved}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                        <span className="text-[10px] text-slate-400 font-extrabold font-mono uppercase bg-slate-50 dark:bg-[#1A1A1A] border border-black/5 px-2 py-1 rounded-md leading-none">
                          {result.fileSize}
                        </span>
                        <button
                          onClick={() => handleSimulateDownload(result)}
                          disabled={activeReportId === result.id}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#0052FF] hover:bg-blue-600 text-white font-black text-[9px] uppercase tracking-tighter px-4 py-2.5 transition-all shadow-sm select-none cursor-pointer disabled:opacity-50"
                        >
                          {activeReportId === result.id ? (
                            <>
                              <Printer className="h-3.5 w-3.5 animate-spin" />
                              <span>Decrypting...</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-3.5 w-3.5" />
                              <span>Download file</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side widgets: Upcoming test schedules and Appointment history */}
            <div className="lg:col-span-4 space-y-6">
              {/* Upcoming schedules */}
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                  <Calendar className="h-5 w-5 text-[#0052FF]" />
                  <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Upcoming Diagnostics</h3>
                </div>

                <div className="space-y-4">
                  {testSchedules.map((schedule) => (
                    <div key={schedule.id} className="border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-3 bg-slate-50/50 dark:bg-brand-dark/40">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wide leading-normal">
                          {schedule.testName}
                        </h4>
                        <div className="flex gap-4 text-[10px] text-[#0052FF] font-bold uppercase tracking-wider mt-1.5">
                          <span>{schedule.date}</span>
                          <span>&bull;</span>
                          <span>{schedule.time}</span>
                        </div>
                      </div>

                      <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 text-[10px] text-amber-800 dark:text-amber-400 font-semibold leading-relaxed">
                        <div className="flex items-center gap-1.5 mb-1 text-amber-900 dark:text-amber-300 font-extrabold">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span className="uppercase text-[8px] tracking-wider font-sans leading-none">Special Preparation instructions</span>
                        </div>
                        {schedule.preparationInstructions}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation / Appointment history list */}
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                  <Clock className="h-5 w-5 text-[#0052FF]" />
                  <h3 className="font-display text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Care Log History</h3>
                </div>

                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div key={app.id} className="flex justify-between items-center p-3 rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="text-left">
                        <p className="text-xs font-black text-slate-800 dark:text-white">{app.doctor}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">{app.specialty}</p>
                        <p className="text-[10px] text-slate-500 font-semibold mt-1.5">{app.date}</p>
                      </div>

                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        app.status === 'Completed' 
                          ? 'bg-slate-100 text-slate-600'
                          : app.status === 'Upcoming'
                          ? 'bg-blue-100 text-[#0052FF]'
                          : 'bg-rose-100 text-rose-600'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsLogged(false)}
                  className="w-full text-center text-[10px] font-black uppercase text-slate-400 hover:text-[#0052FF] transition-colors leading-none"
                >
                  Disconnect Secure Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
