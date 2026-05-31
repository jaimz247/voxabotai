/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveTab = 'home' | 'clinic-front-desk' | 'lab-assistant' | 'how-it-works' | 'book-demo';

export interface DemoSubmission {
  id: string;
  fullName: string;
  facilityName: string;
  role: string;
  whatsAppNumber: string;
  email: string;
  facilityType: string;
  location: string;
  mainChallenge: string;
  timestamp: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'ai' | 'system' | 'staff';
  text: string;
  timestamp: string;
}

export interface SimulatedScenario {
  id: string;
  question: string;
  reply: string;
  action?: 'escalate' | 'remind' | 'book' | 'log';
  actionLabel?: string;
  actionDetails?: string;
}
