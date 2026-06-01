/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'fr' | 'es';

export const translations = {
  en: {
    // Nav Items
    home: 'Home',
    clinic: 'Clinic Front Desk',
    lab: 'Lab Assistant',
    howItWorks: 'How It Works',
    staffDashboard: 'Staff Dashboard',
    patientPortal: 'Patient Portal',
    bookDemo: 'Book Demo',
    language: 'Language',
    
    // Hero
    heroTitle: 'NEVER MISS ANOTHER PATIENT ENQUIRY.',
    heroSub: 'Give your clinic or diagnostic centre a 24/7 AI front desk for calls, WhatsApp communications, booking appointments, and sharing lab results. Respond faster, capture more.',
    bookDemoBtn: 'Book a Free Demo',
    whatsappDemoBtn: 'Test Live WhatsApp Demo',
    
    // Stats
    statAvailability: 'Autonomous Availability',
    statLatency: 'AI Reply Latency',
    statSetup: 'Non-Disruptive Setup',

    // Solutions Overview
    solutionsTitle: 'Integrated AI Solutions',
    solutionsSubtitle: 'Tailored automation packages designed specifically for clinical staff and patient operations.',
    voxabotClinic: 'Voxabot Clinic',
    voxabotClinicSub: 'Answer calls, reply on WhatsApp, book appointments, send reminders, and recover missed enquiries — 24/7.',
    voxabotLab: 'Voxabot Lab',
    voxabotLabSub: 'Help your lab answer repetitive enquiries, share preparation instructions, and send result notifications automatically.',
    seeDemo: 'See Demo',

    // Operational Savings Calculator
    calcTitle: 'Interactive Operational Savings Calculator',
    calcSubtitle: 'Input your clinic’s average monthly metrics to calculate potential cost savings and hours salvaged with Voxabot AI.',
    monthlyCallVolume: 'Monthly Inbound Contacts',
    avgCostPerCall: 'Estimated Staff Cost Per Call',
    percentRepetitive: 'Percentage of Repetitive / FAQ Enquiries',
    automatedSuccessRate: 'Voxabot Automated Resolution Rate',
    totalCurrentCost: 'Current Manual Handling Cost',
    calculatedSavings: 'Estimated Monthly Savings',
    hoursFreed: 'Repetitive Hours Freed / Month',
    roiLabel: 'Estimated Return on Investment (ROI)',
    calcExplanation: 'Calculations are based on average staff time saved (approx. 4 mins per repetitive enquiry resolved asynchronously) subtracting standard Voxabot operational resource maintenance.',

    // Lab Assistant view
    labHeroTitle: 'ELIMINATE PATHOLOGY CALL CLUTTER.',
    labHeroSub: 'Many laboratories receive identical queries all day. Voxabot Lab Assistant instantly handles preparational guides, pricing, and result status checks.',
    labSafety: 'Voxabot Lab Assistant under no circumstances interprets diagnostic, pathology or chemical laboratory results medically. It supports operational communication ONLY.',

    // Clinic Front Desk view
    clinicHeroTitle: 'THE AUTONOMOUS FRONT DESK FOR DENSE CLINICS.',
    clinicHeroSub: 'Transform frantic administrative front desk chaos into clean, smooth, reliable automation loops.',
    clinicSafety: 'Voxabot Clinic Front Desk supports operational patient queries and general reminders only. It does not diagnose clinical issues, prescribe therapeutic pills, or advise treatment.'
  },
  fr: {
    home: 'Accueil',
    clinic: 'Accueil Clinique',
    lab: 'Assistant Labo',
    howItWorks: 'Comment ça Marche',
    staffDashboard: 'Tableau de Bord',
    patientPortal: 'Portail Patient',
    bookDemo: 'Réserver Démo',
    language: 'Langue',
    
    heroTitle: 'NE MANQUEZ PLUS JAMAIS UN APPEL PATIENT.',
    heroSub: 'Offrez à votre clinique ou centre de diagnostic un accueil IA 24h/24 pour les appels, WhatsApp, la prise de rendez-vous et le partage de résultats de laboratoire. Répondez plus vite, capturez plus.',
    bookDemoBtn: 'Réserver une Démo Gratuite',
    whatsappDemoBtn: 'Tester Démo Directe WhatsApp',
    
    statAvailability: 'Disponibilité Autonome',
    statLatency: 'Temps de réponse IA',
    statSetup: 'Installation sans interruption',

    solutionsTitle: 'Solutions IA Intégrées',
    solutionsSubtitle: 'Forfaits d\'automatisation sur mesure conçus spécifiquement pour le personnel médical et les patients.',
    voxabotClinic: 'Voxabot Clinique',
    voxabotClinicSub: 'Répondez aux appels, via WhatsApp, planifiez les rendez-vous, envoyez les rappels et récupérez les demandes perdues — 24/7.',
    voxabotLab: 'Voxabot Laboratoire',
    voxabotLabSub: 'Aidez votre laboratoire à répondre aux questions répétitives, partager les consignes de préparation et envoyer les résultats automatiquement.',
    seeDemo: 'Voir la Démo',

    calcTitle: 'Calculateur d\'Économies Opérationnelles',
    calcSubtitle: 'Saisissez les métriques mensuelles de votre clinique pour calculer vos économies potentielles de coûts et de temps avec Voxabot IA.',
    monthlyCallVolume: 'Volume de contacts mensuel',
    avgCostPerCall: 'Coût estimé du personnel par appel',
    percentRepetitive: 'Pourcentage de demandes répétitives / FAQ',
    automatedSuccessRate: 'Taux de résolution de Voxabot',
    totalCurrentCost: 'Coût de traitement manuel actuel',
    calculatedSavings: 'Économies mensuelles estimées',
    hoursFreed: 'Heures de travail répétitif libérées / mois',
    roiLabel: 'Retour sur Investissement (ROI) Estimé',
    calcExplanation: 'Les calculs sont basés sur le temps moyen gagné par le personnel (environ 4 min par demande résolue) moins le coût de fonctionnement de Voxabot.',

    labHeroTitle: 'ÉLIMINEZ L\'ENCOMBREMENT DES APPELS EN LABORATOIRE.',
    labHeroSub: 'Les laboratoires reçoivent les mêmes questions toute la journée. Voxabot Lab gère instantanément les consignes, les tarifs et le suivi des résultats.',
    labSafety: 'Voxabot Lab Assistant n\'interprète en aucun cas les résultats d\'analyses médicales. Il prend en charge UNIQUEMENT la communication opérationnelle.',

    clinicHeroTitle: 'L\'ACCUEIL AUTONOME POUR LES CLINIQUES CHARGÉES.',
    clinicHeroSub: 'Transformez le chaos administratif de la réception en de parfaits processus d\'automatisation fluides et fiables.',
    clinicSafety: 'Voxabot Clinique prend en charge uniquement les questions administratives et rappels généraux. Il ne diagnostique pas et ne prescrit pas de traitement.'
  },
  es: {
    home: 'Inicio',
    clinic: 'Recepción Clínica',
    lab: 'Asistente de Laboratorio',
    howItWorks: 'Cómo Funciona',
    staffDashboard: 'Panel de Personal',
    patientPortal: 'Portal del Paciente',
    bookDemo: 'Reservar Demo',
    language: 'Idioma',
    
    heroTitle: 'NUNCA PIERDA OTRA CONSULTA DE PACIENTE.',
    heroSub: 'Brinde a su clínica o centro de diagnóstico una recepción de IA las 24 horas del día, los 7 días de la semana para llamadas, WhatsApp, programación de citas y entrega de resultados. Responda más rápido, capte más.',
    bookDemoBtn: 'Reservar Demo Gratis',
    whatsappDemoBtn: 'Probar Demo en Vivo WhatsApp',
    
    statAvailability: 'Disponibilidad Autónoma',
    statLatency: 'Latencia de Respuesta IA',
    statSetup: 'Configuración sin Interrupciones',

    solutionsTitle: 'Soluciones de IA Integradas',
    solutionsSubtitle: 'Paquetes de automatización personalizados diseñados específicamente para el personal clínico y la atención al paciente.',
    voxabotClinic: 'Voxabot Clínica',
    voxabotClinicSub: 'Conteste llamadas, responda por WhatsApp, agende citas, envíe recordatorios y recupere consultas perdidas - 24/7.',
    voxabotLab: 'Voxabot Laboratorio',
    voxabotLabSub: 'Ayude a su laboratorio a responder consultas repetitivas, compartir instrucciones de preparación y enviar avisos de resultados de forma automática.',
    seeDemo: 'Ver Demo',

    calcTitle: 'Calculadora de Ahorro Operativo',
    calcSubtitle: 'Ingrese las métricas mensuales de su clínica para calcular el ahorro de costos potencial y las horas recuperadas con Voxabot IA.',
    monthlyCallVolume: 'Volumen mensual de contactos',
    avgCostPerCall: 'Costo estimado del personal por llamada',
    percentRepetitive: 'Porcentaje de consultas repetitivas / FAQ',
    automatedSuccessRate: 'Tasa de resolución automatizada de Voxabot',
    totalCurrentCost: 'Costo de gestión manual actual',
    calculatedSavings: 'Ahorro mensual estimado',
    hoursFreed: 'Horas de trabajo repetitivo liberadas / mes',
    roiLabel: 'Retorno de Inversión (ROI) Estimado',
    calcExplanation: 'Los cálculos se basan en el promedio de tiempo del personal ahorrado (aprox. 4 minutos por consulta resuelta) menos el costo del servicio de Voxabot.',

    labHeroTitle: 'ELIMINE EL CAOS DE LLAMADAS EN EL LABORATORIO.',
    labHeroSub: 'Muchos laboratorios reciben las mismas consultas todo el día. Voxabot Lab Assistant gestiona al instante guías de preparación, precios y estado de resultados.',
    labSafety: 'Voxabot Lab Assistant bajo ninguna circunstancia interpreta pruebas de laboratorio o resultados médicos. Soporta ÚNICAMENTE comunicación operativa.',

    clinicHeroTitle: 'RECEPCIÓN AUTÓNOMA PARA CLÍNICAS DE ALTA DENSIDAD.',
    clinicHeroSub: 'Transforme el caótico día a día de la recepción administrativa en flujos de automatización limpios, fluidos y confiables.',
    clinicSafety: 'Voxabot Clinic soporta consultas operativas de pacientes y recordatorios generales únicamente. No diagnostica problemas clínicos ni prescribe tratamientos.'
  }
};
