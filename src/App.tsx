/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Brain,
  Upload,
  Activity,
  Shield,
  Volume2,
  TrendingUp,
  UserRound,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronRight,
  Download,
  Cpu,
  Copy,
  Check,
  Layers,
  Video,
  Info,
  FileText,
  ExternalLink,
  Share2,
  Heart,
  Lock,
  Sparkles,
  Clock,
  ChevronLeft,
  Search,
  BadgeAlert
} from "lucide-react";

// Types for app state and records
interface CaseReport {
  id: string;
  name: string;
  age: number;
  gender: string;
  mocaScore: number;
  cdrScore: number;
  comorbidities: string[];
  mriStatus: string;
  brainRegions: { name: string; atrophy: number; status: "Normal" | "Mild Atrophy" | "Severe Atrophy" }[];
  probabilities: { disease: string; probability: number; color: string }[];
  clinicalSummary: string;
}

const CLINICAL_CASES: CaseReport[] = [
  {
    id: "case-01",
    name: "Patient Profile Alpha (MCI Suspect)",
    age: 68,
    gender: "Male",
    mocaScore: 21,
    cdrScore: 0.5,
    comorbidities: ["Hypertension", "Type II Diabetes"],
    mriStatus: "Bilateral Hippocampal Volume Reduction",
    brainRegions: [
      { name: "Hippocampus", atrophy: 32, status: "Mild Atrophy" },
      { name: "Entorhinal Cortex", atrophy: 41, status: "Severe Atrophy" },
      { name: "Temporal Lobe", atrophy: 18, status: "Normal" },
      { name: "Parietal Cortex", atrophy: 12, status: "Normal" }
    ],
    probabilities: [
      { disease: "Alzheimer's Disease (AD)", probability: 74, color: "bg-blue-600" },
      { disease: "Dementia with Lewy Bodies (DLB)", probability: 14, color: "bg-indigo-600" },
      { disease: "Frontotemporal Dementia (FTD)", probability: 8, color: "bg-slate-600" },
      { disease: "Stable / Mild Cognitive Impairment", probability: 4, color: "bg-emerald-600" }
    ],
    clinicalSummary: "A 68-year-old male presenting with subjective memory complaints and progressive word-finding difficulties over 14 months. Cognitive battery demonstrates moderate deficits in short-term recall and executive tracking (MoCA: 21/30). Multimodal MRI segmentation flags significant atrophy in the entorhinal cortex (-41%) and hippocampal regions (-32%). Probability profile and biomarker clustering lean heavily toward an early amnestic Mild Cognitive Impairment (aMCI) pattern representing prodromal Alzheimer's pathology."
  },
  {
    id: "case-02",
    name: "Patient Profile Beta (Overlapping Dem. Spectrum)",
    age: 74,
    gender: "Female",
    mocaScore: 16,
    cdrScore: 1.0,
    comorbidities: ["Mild Osteoarthritis", "Prior Coronary Bypass"],
    mriStatus: "Asymmetrical Frontal & Anterior Temporal Atrophy",
    brainRegions: [
      { name: "Hippocampus", atrophy: 15, status: "Normal" },
      { name: "Entorhinal Cortex", atrophy: 12, status: "Normal" },
      { name: "Temporal Lobe", atrophy: 48, status: "Severe Atrophy" },
      { name: "Frontal Cortex", atrophy: 53, status: "Severe Atrophy" }
    ],
    probabilities: [
      { disease: "Frontotemporal Dementia (FTD)", probability: 82, color: "bg-blue-600" },
      { disease: "Alzheimer's Disease (AD)", probability: 11, color: "bg-emerald-600" },
      { disease: "Vascular Dementia (VaD)", probability: 5, color: "bg-indigo-600" },
      { disease: "Dementia with Lewy Bodies (DLB)", probability: 2, color: "bg-slate-600" }
    ],
    clinicalSummary: "A 74-year-old female presenting with prominent behavior modifications, progressive non-fluent aphasia, and loss of systemic executive inhibition reported by spouse. Standard memory screens shows localized verbal deficits but moderate retention of visuospatial processing (MoCA: 16/30). Magnetic Resonance Imaging (MRI) reveals pronounced, asymmetrical volume loss centered in the bilateral frontal (-53%) and anterior temporal quadrants (-48%). Biomarker fusion rules out typical hippocampal decay, suggesting a high-probability diagnosis of behavioral-variant Frontotemporal Lobar Degeneration (bvFTD)."
  },
  {
    id: "case-03",
    name: "Patient Profile Gamma (Early Amnestic & Normal MRI)",
    age: 62,
    gender: "Female",
    mocaScore: 24,
    cdrScore: 0.5,
    comorbidities: ["Hypercholesterolemia"],
    mriStatus: "Borderline Hippocampal Preservation",
    brainRegions: [
      { name: "Hippocampus", atrophy: 9, status: "Normal" },
      { name: "Entorhinal Cortex", atrophy: 11, status: "Normal" },
      { name: "Temporal Lobe", atrophy: 7, status: "Normal" },
      { name: "Parietal Cortex", atrophy: 6, status: "Normal" }
    ],
    probabilities: [
      { disease: "Stable / Mild Cognitive Impairment", probability: 68, color: "bg-emerald-600" },
      { disease: "Alzheimer's Disease (AD)", probability: 22, color: "bg-blue-600" },
      { disease: "Depressive Pseudo-Dementia", probability: 8, color: "bg-indigo-600" },
      { disease: "Other Dem.", probability: 2, color: "bg-slate-600" }
    ],
    clinicalSummary: "A 62-year-old female with bilateral family history of AD presenting with periodic temporal disorientation but preserved functional activities of daily life (CDR: 0.5). Global MRI remains within patient-adjusted volumetric norms, showing only minor age-related wear. The multimodal integration points toward a stable, non-progressive MCI baseline with an recommendations for a 6-month digital cognitive monitoring follow-up, preventing unnecessary high-cost diagnostic interventions."
  }
];

export default function App() {
  // Navigation active anchors
  const [activeTab, setActiveTab] = useState<string>("home");

  // State for Simulator
  const [selectedCase, setSelectedCase] = useState<CaseReport>(CLINICAL_CASES[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<number>(0);
  const [customMoCA, setCustomMoCA] = useState<number>(20);
  const [customAge, setCustomAge] = useState<number>(70);
  const [simulatedReports, setSimulatedReports] = useState<CaseReport[]>(CLINICAL_CASES);
  const [selectedRegionDetails, setSelectedRegionDetails] = useState<string>("Hippocampus");

  // State for Interactive Diagnostic Confidence Quiz
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizScoreCalculated, setQuizScoreCalculated] = useState<boolean>(false);

  // States for Leads & Scheduled items
  const [scheduledRequests, setScheduledRequests] = useState<any[]>([
    {
      id: "sc-01",
      name: "Dr. Marc G. Harrison",
      email: "m.harrison@bostoncognitive.org",
      date: "2026-06-25",
      time: "10:30 AM",
      type: "Clinical Demo & Sandbox Setup"
    }
  ]);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("2026-06-20");
  const [bookingTime, setBookingTime] = useState<string>("14:00");
  const [bookingType, setBookingType] = useState<string>("Clinical Demo & Sandbox Setup");

  // Newsletter Sign up
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");

  // Whitepaper download log
  const [downloadCounter, setDownloadCounter] = useState<number>(314);
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "info">("success");

  const triggerToast = (msg: string, type: "success" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Social copy codes
  const handleCopyPost = (textId: string, textContent: string) => {
    navigator.clipboard.writeText(textContent);
    triggerToast(`Social post text copied to clipboard! Ready to publish on ${textId}.`);
  };

  // Run Simulated Upload & Diagnostics
  const handleRunSimulation = (caseItem: CaseReport) => {
    setIsProcessing(true);
    setProcessStep(1);
    
    // Simulate pipeline processing steps
    setTimeout(() => {
      setProcessStep(2);
    }, 850);

    setTimeout(() => {
      setProcessStep(3);
    }, 1800);

    setTimeout(() => {
      setSelectedCase({
        ...caseItem,
        mocaScore: caseItem.id === "custom" ? customMoCA : caseItem.mocaScore,
        age: caseItem.id === "custom" ? customAge : caseItem.age,
      });
      setIsProcessing(false);
      setProcessStep(0);
      triggerToast(`Multimodal diagnostic synthesis completed successfully for ${caseItem.name}.`, "success");
    }, 2800);
  };

  // Create custom input case simulation
  const handleCustomCaseTrigger = () => {
    const customCase: CaseReport = {
      id: "custom",
      name: "Custom Clinical Session",
      age: customAge,
      gender: "Male",
      mocaScore: customMoCA,
      cdrScore: customMoCA < 15 ? 1.0 : customMoCA < 22 ? 0.5 : 0.0,
      comorbidities: ["Secondary Osteoarthritis"],
      mriStatus: customMoCA < 18 ? "Severe Cortical Volume Deficits Detected" : "Focal Parieto-temporal Volumetric Deficits",
      brainRegions: [
        { name: "Hippocampus", atrophy: Math.min(95, Math.max(10, (30 - customMoCA) * 4.5)), status: customMoCA < 18 ? "Severe Atrophy" : "Mild Atrophy" },
        { name: "Entorhinal Cortex", atrophy: Math.min(95, Math.max(5, (30 - customMoCA) * 5.2)), status: customMoCA < 16 ? "Severe Atrophy" : "Mild Atrophy" },
        { name: "Temporal Lobe", atrophy: Math.min(95, Math.max(5, (30 - customMoCA) * 2.1)), status: "Normal" },
        { name: "Parietal Cortex", atrophy: Math.min(95, Math.max(5, (30 - customMoCA) * 1.8)), status: "Normal" }
      ],
      probabilities: [
        { disease: "Alzheimer's Disease (AD)", probability: Math.min(95, Math.max(10, (32 - customMoCA) * 5)), color: "bg-blue-600" },
        { disease: "Stable / Mild Cognitive Impairment", probability: Math.max(5, Math.min(80, 100 - (32 - customMoCA) * 5)), color: "bg-emerald-600" },
        { disease: "Dementia with Lewy Bodies (DLB)", probability: 8, color: "bg-indigo-600" },
        { disease: "Frontotemporal Dementia (FTD)", probability: 5, color: "bg-slate-600" }
      ],
      clinicalSummary: `A custom simulated patient aged ${customAge} presenting with active screening profiles. Clinical cognitive assessment gives a score of ${customMoCA}/30 on the Montreal Cognitive Assessment (MoCA), suggesting ${customMoCA < 20 ? 'moderate' : 'early stage'} cognitive decay. Multi-region automated MRI processing reports matching volume loss in critical temporal sectors.`
    };
    handleRunSimulation(customCase);
  };

  // Diagnostic Quiz Engine
  const quizQuestions = [
    {
      id: 1,
      question: "Which modalities do you currently integrate systematically for clinical Alzheimer's evaluations?",
      options: [
        { val: "A", text: "Primarily clinical observation, interviews, and minimal paper tests (MMSE/MoCA)." },
        { val: "B", text: "Cognitive tests + routine 2D radiological reads of MRI scans (Manual interpretation)." },
        { val: "C", text: "Multi-disciplinary panels combining molecular scans (PET), standard MRI, and clinical batteries." }
      ],
      insight: "Fusing cognitive parameters directly into quantitative segmentation lowers evaluation subjectivity by over 38%."
    },
    {
      id: 2,
      question: "On average, how long does it take your clinic to synthesis demographic, scan indexes, and cognitive scores into a final differential diagnostic profile?",
      options: [
        { val: "A", text: "Several weeks (waiting for specialized external imaging reports and secondary consults)." },
        { val: "B", text: "Several days (waiting to aggregate test papers and clinical notes)." },
        { val: "C", text: "Within a single patient visit session." }
      ],
      insight: "NeuroPredict AI generates standard diagnostic supports in under 90 seconds, saving valuable treatment weeks."
    },
    {
      id: 3,
      question: "How do you navigate clinical ambiguity between true Alzheimer's and other diagnostic masqueraders (like Dementia with Lewy Bodies or bvFTD)?",
      options: [
        { val: "A", text: "Highly subjective assessment based in clinical experience and trial treatments." },
        { val: "B", text: "Serial cognitive test tracking over 12-18 months to wait for clearer symptom pathways." },
        { val: "C", text: "High-cost molecular PET scans or cerebrospinal fluid (CSF) biomarkers." }
      ],
      insight: "Early regional atrophy metrics (frontal vs hippocampal) can isolate Alzheimer's from Lewy body or frontal dementia early on."
    }
  ];

  const handleSelectQuizOption = (qId: number, selectedVal: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: selectedVal }));
  };

  const handleNextQuizStep = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizScoreCalculated(true);
      triggerToast("Your Custom Diagnostic Confidence report is ready!", "success");
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizScoreCalculated(false);
  };

  // Submit Lead Demonstration
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) {
      triggerToast("Please provide both name and professional email.", "info");
      return;
    }

    const newBooking = {
      id: "sc-" + Date.now(),
      name: bookingName,
      email: bookingEmail,
      date: bookingDate,
      time: bookingTime,
      type: bookingType
    };

    setScheduledRequests(prev => [newBooking, ...prev]);
    setBookingName("");
    setBookingEmail("");
    triggerToast(`Clinical demonstration successfully scheduled for ${bookingDate} at ${bookingTime}!`, "success");
  };

  // Mock download whitepaper
  const handleDownloadWhitepaper = () => {
    setDownloadCounter(prev => prev + 1);
    setHasDownloaded(true);
    triggerToast("Whitepaper: 'Multimodal Machine Learning Framework in Prodromal AD Differentiation' downloaded successfully.");
  };

  // Social feed mock posts
  const SOCIAL_POST_PROBLEM = {
    title: "Clinical Pain Point Insight (LinkedIn-ready)",
    content: `Clinical uncertainty in the early stages of Alzheimer’s disease has long been a significant barrier to effective patient management. 

Fusing cognitive metrics with structural MRI scans has often been manual, tedious, and highly subjective—especially in early amnestic stages. Overlapping neurodegenerative subtypes like Lewy Bodies or Frontotemporal Dementia can masquerade as early AD, leading to inappropriate therapeutics.

At NeuroPredict AI, we build transparent, clinician-directed tools that integrate quantitative MRI segmentation and neuropsychological scores simultaneously. The result is rapid, evidence-grounded differential outputs, giving back neurologists precious clinical confidence.

How has your clinic resolved the challenge of early dementia differentiation? Learn more about our upcoming clinical pilots.

#Altzeimers #HealthTech #AI #ClinicalDecisionSupport #Neurology`,
    linkText: "Request early pilot program details: [App link]"
  };

  const SOCIAL_POST_TECH = {
    title: "Explainable AI Deep-Dive (X/Twitter-ready)",
    content: `Medicine doesn't need "black box" prediction. Neurologists need robust, explainable data layers they can trust. 🧠

NeuroPredict AI combines structural MRI segmentations (down to voxel levels) with raw MoCA/CDR test dimensions. Our hybrid framework doesn't just outputs a classification—it generates localized heatmaps detailing precise regional atrophy (Hippocampal, Entorhinal regions) and details why patterns point toward specific demesne pathways.

Give your diagnostic process deep, verifiable, early-stage precision. 

#Neurology #HealthIT #XAI #Neuroimaging #Biomarkers`,
    linkText: "Request clinical access: https://neuropredict-ai.medical"
  };

  const SOCIAL_POST_HUMAN = {
    title: "Patient Journey Alignment (Healthcare Network-ready)",
    content: `Behind every brain scan, there is a family waiting for answers. 

When families are hit with cognitive decline symptoms, the diagnostic wait can take months of stress, subjective evaluations, and conflicting advice. Early diagnosis opens the window to early therapies, lifestyle interventions, and clinical trials that are completely closed in advanced stages.

Our goal with NeuroPredict AI is simple: to help cognitive neurologists consolidate weeks of analysis into immediate, quantitative support. No more 'wait-and-see' approach. 

Join us in shifting the paradigm of neurodegenerative pathology.

#PatientCare #EarlyDetection #AlzheimerDignity #Innovation`,
    linkText: "Download our Clinical MVP Whitepaper: [App link]"
  };

  return (
    <div className="bg-[#08090C] text-slate-300 font-sans min-h-screen relative flex flex-col selection:bg-blue-600/30 selection:text-white pb-12">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Global System Notice Toast */}
      {toastMessage && (
        <div id="system-toast" className="fixed bottom-6 right-6 z-50 bg-[#11141B] border border-blue-500/40 rounded-xl p-4 shadow-2xl shadow-blue-900/30 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-xs text-white uppercase tracking-wider">System Event Alert</p>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header id="nav-header" className="sticky top-0 z-40 bg-[#08090C]/80 backdrop-blur-md border-b border-slate-900 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Brain className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight font-serif uppercase">
                NeuroPredict <span className="text-blue-500 tracking-wider">AI</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#3B82F6] uppercase">Clinical Decision Engine</span>
            </div>
          </div>

          {/* Core Applet Navigation */}
          <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-wider uppercase text-slate-400">
            <a
              href="#value-proposition"
              onClick={() => setActiveTab("uvp")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "uvp" ? "text-blue-500" : ""}`}
            >
              System UVP
            </a>
            <a
              href="#infographic-flow"
              onClick={() => setActiveTab("workflow")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "workflow" ? "text-blue-500" : ""}`}
            >
              Workflow Infographic
            </a>
            <a
              href="#simulator-console"
              onClick={() => setActiveTab("simulator")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "simulator" ? "text-blue-500" : ""}`}
            >
              Interactive Demo
            </a>
            <a
              href="#confidence-calculator"
              onClick={() => setActiveTab("quiz")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "quiz" ? "text-blue-500" : ""}`}
            >
              Clinical Quiz
            </a>
            <a
              href="#comparison-matrix"
              onClick={() => setActiveTab("comparison")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "comparison" ? "text-blue-500" : ""}`}
            >
              Competitor Matrix
            </a>
            <a
              href="#social-workspace"
              onClick={() => setActiveTab("social")}
              className={`hover:text-blue-400 transition-colors ${activeTab === "social" ? "text-blue-500" : ""}`}
            >
              Social Media
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#schedule-demonstration"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg shadow-lg shadow-blue-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Containers Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-10 space-y-16 flex-1 w-full">
        
        {/* HERO INTRO BLOCK */}
        <section id="hero-banner" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#11141B] border border-slate-800/80 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-indigo-500/5 blur-[90px] rounded-full pointer-events-none"></div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/50 border border-blue-900/60 text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Explainable AI (XAI) System MVP</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight font-medium">
              Transform Cognitive Uncertainty Into <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
                Clinical Precision
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
              NeuroPredict AI solves the diagnostic blindspot of early-stage Alzheimer's. By integrating quantitative 3D MRI brain segmentation, clinical cognitive scores (MoCA, MMSE), and demographic metrics, we deliver immediate, explainable diagnostics directly to neurologists.
            </p>

            {/* Quick Metrics of Clinical Validation (Fake but authoritative) */}
            <div className="grid grid-cols-3 gap-4 py-4 max-w-lg border-y border-slate-800/70">
              <div>
                <p className="text-2xl md:text-3xl font-mono text-white font-bold">94.2%</p>
                <p className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold">Diagnostic AUC Accuracy</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-mono text-white font-bold">&lt; 90s</p>
                <p className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold">Processing Turnaround</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-mono text-white font-bold">-38%</p>
                <p className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold">Inter-rater Subjectivity</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#schedule-demonstration"
                className="bg-white text-black hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase text-center transition-colors"
                id="cta-schedule"
              >
                Schedule Access Demo
              </a>
              <button
                onClick={handleDownloadWhitepaper}
                className="border border-slate-700 bg-slate-900/30 hover:bg-slate-800 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase hover:text-white transition-all flex items-center justify-center gap-2"
                id="cta-download"
              >
                <Download className="w-4 h-4" />
                Download MVP Whitepaper
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 font-mono mt-2">
              {downloadCounter} Neuro-clinicians have downloaded this whitepaper. Fictional validation referencing ADNI & OASIS datasets.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-400">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>PILOT METRIC SUMMARY</span>
            </div>

            <div className="space-y-4">
              <div className="bg-[#11141B] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Clinicians Enrolled</span>
                <span className="text-lg font-bold text-white font-mono">148 Physicians</span>
              </div>
              <div className="bg-[#11141B] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Active Tests Conducted</span>
                <span className="text-lg font-bold text-white font-mono">2,140 Cases Simulated</span>
              </div>
              <div className="bg-[#11141B] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Target Sensitivity Rate</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">92.4% (MCI Early Onset)</span>
              </div>
            </div>
          </div>
        </section>


        {/* UNIQUE VALUE PROPOSITION (UVP) CARDS BLOCK */}
        <section id="value-proposition" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono text-blue-500 uppercase tracking-widest font-bold">Unification Architecture</span>
            <h2 className="text-3xl font-serif text-white">Unique Value Proposition (UVP)</h2>
            <p className="text-slate-400 text-sm">
              While other tools focus purely on raw imaging or isolated cognitive metrics, NeuroPredict AI introduces a single, high-fidelity synthesizer representing a true multivariable pipeline.
            </p>
          </div>

          <div id="uvp-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* UVP 1 */}
            <div className="bg-[#11141B] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full pointer-events-none"></div>
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2 font-semibold">Truly Multimodal</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We combine structural volume-dense MRI indices directly with standard paper screens (MoCA, CDR, MMSE) and comorbidities. There is no manual tallying or clinical guesswork needed.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-blue-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                <span>Dynamic weighting mapping</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* UVP 2 */}
            <div className="bg-[#11141B] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none"></div>
              <div className="w-12 h-12 rounded-xl bg-indigo-900/30 border border-indigo-800/40 flex items-center justify-center text-indigo-400 mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2 font-semibold">Explainable AI (XAI)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                No "black box" diagnostic formulas. We generate precise heatmaps of voxel atrophy (e.g. Hippocampal cortex volume loss) paired with structured logical reasoning reports clinicians can dissect.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-indigo-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                <span>Voxel-level verification</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* UVP 3 */}
            <div className="bg-[#11141B] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full pointer-events-none"></div>
              <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2 font-semibold">Regional Adaptability</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Whether you practice in high-field modern neuroimaging centers (3T MRI datasets available) or decentralized low-resource regional clinics, our model adapts dynamically to maximize precision of any input quality.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center text-blue-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                <span>Scales dynamically by scan depth</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

          </div>
        </section>


        {/* INTERACTIVE WORKFLOW INFOGRAPHIC */}
        <section id="infographic-flow" className="bg-[#11141B] border border-slate-800 rounded-3xl p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">Scientific Pipeline</span>
              <h2 className="text-3xl font-serif text-white">The Neural Intelligent Workflow</h2>
              <p className="text-slate-400 text-sm max-w-2xl">
                A streamlined, medical-grade diagnostic sequence engineered to process clinical features from intake to a customized diagnostic dashboard. Click each step below for anatomical details.
              </p>
            </div>
          </div>

          {/* Interactive Steps Pipeline Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            
            {/* Step 1 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative hover:border-blue-500/50 transition-all group">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-xs font-bold font-mono text-white">
                01
              </div>
              <div className="mb-4 text-blue-400 mt-2">
                <UserRound className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">Fusing Intake Inputs</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Aggregates patient demographic factors, high-field or standard MRI scans, historical comorbidities, and cognitive test metrics (MoCA, MMSE).
              </p>
              <div className="mt-3 text-[10px] font-mono text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
                Cognitive Matrix + Voxel Volumes
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative hover:border-indigo-500/50 transition-all group">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-xs font-bold font-mono text-white">
                02
              </div>
              <div className="mb-4 text-indigo-400 mt-2">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">XAI Volumetric Decay</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Applies automated segmentation to the MRI slice, pulling precise cubic voxel volume bounds within primary memory-critical centers.
              </p>
              <div className="mt-3 text-[10px] font-mono text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
                Segmentation: Hippocampus + Entorhinal
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative hover:border-blue-500/50 transition-all group">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-xs font-bold font-mono text-white">
                03
              </div>
              <div className="mb-4 text-blue-400 mt-2">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">Hybrid ML Synthesizer</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Runs a statistical classifier calibrated against ADNI + OASIS clinical populations, balancing weights for demographics vs image patterns.
              </p>
              <div className="mt-3 text-[10px] font-mono text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
                Reference Base: &gt;11,000 cases
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative hover:border-indigo-500/50 transition-all group">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-xs font-bold font-mono text-white">
                04
              </div>
              <div className="mb-4 text-indigo-400 mt-2">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">Autonomous Clinician HUD</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Renders interactive probability dials, visual atrophy graphs, and generates a pre-formatted clinical diagnosis narrative draft.
              </p>
              <div className="mt-3 text-[10px] font-mono text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
                Decision Support (Non-restrictive)
              </div>
            </div>

          </div>
        </section>


        {/* INTERACTIVE DEMONSTRATION SIMULATOR CONSOLE */}
        <section id="simulator-console" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-500 uppercase tracking-widest font-bold">Interactive Sandbox Environment</span>
              <h2 className="text-3xl font-serif text-white">NeuroPredict AI Demonstration Workspace</h2>
              <p className="text-slate-400 text-sm">
                Interact with our clinical diagnosis sandbox. Load patient presets or adjust custom metrics to test the real-time AI segmentation, brain region atrophy calculation, and output report generation.
              </p>
            </div>
            
            {/* Quick Helper Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/20 border border-blue-800/40 text-blue-300 rounded text-[11px] font-mono">
              <Info className="w-3.5 h-3.5" />
              <span>Diagnostic Demonstration Simulator Only</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inputs Panel */}
            <div className="lg:col-span-4 bg-[#11141B] border border-slate-800 rounded-3xl p-6 space-y-6">
              
              {/* Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
                  Select Patient Presets
                </label>
                <div className="space-y-2">
                  {CLINICAL_CASES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCase(item)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedCase.id === item.id
                          ? "bg-slate-950 border-blue-500 shadow-md shadow-blue-950/20"
                          : "bg-slate-950/50 border-slate-800/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                          {item.gender}, {item.age}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400">
                        <span>MoCA Score: <strong className="text-white font-mono">{item.mocaScore}/30</strong></span>
                        <span>CDR: <strong className="text-white font-mono">{item.cdrScore}</strong></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Parameter Adjuster */}
              <div className="border-t border-slate-800/60 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block">Custom Simulator Panel</span>
                  <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 border border-blue-900/45 px-1.5 py-0.5 rounded">Active Adjuster</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Simulate Patient Age:</span>
                      <span className="font-mono text-white font-bold">{customAge} Years</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="90"
                      value={customAge}
                      onChange={(e) => setCustomAge(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Simulate MoCA Score:</span>
                      <span className="font-mono text-white font-bold">{customMoCA} / 30</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={customMoCA}
                      onChange={(e) => setCustomMoCA(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 pt-1 font-mono">
                      <span>&lt; 15 Severe decay</span>
                      <span>15-22 MCI Suspect</span>
                      <span>&gt;25 Normal Range</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCustomCaseTrigger}
                  className="w-full bg-blue-600 hover:bg-shadow text-white hover:bg-blue-700 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-blue-900/20"
                >
                  Synthesize Custom Parameters
                </button>
              </div>

              {/* Simulation Steps Indicator (Only shows when running simulation) */}
              {isProcessing && (
                <div className="bg-slate-950 border border-blue-500/30 p-4 rounded-2xl space-y-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white animate-pulse">Diagnostic Scanning Active...</span>
                    <span className="text-[10px] font-mono text-blue-400">{processStep * 33}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${processStep * 33}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {processStep === 1 && "Ingesting 3D MRI voxel structures..."}
                    {processStep === 2 && "Segmenting memory centers and parsing MoCA indices..."}
                    {processStep === 3 && "Running statistical Bayesian prediction alignment..."}
                  </p>
                </div>
              )}

            </div>


            {/* Right Output Console Dashboard */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
              
              {/* Backing scan representation (Dynamic interactive slice) */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-3xl rounded-full pointer-events-none"></div>

              <div>
                {/* Header Output Controls */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">CLINICAL SUPPORT CONSOLE</p>
                      <p className="text-[10px] text-slate-400 uppercase mt-0.5 font-mono">
                        Session Key: NP-{(selectedCase.id).toUpperCase()} | Simulated Diagnosis
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded">
                    Multimodal Synthesis Model Active
                  </span>
                </div>

                {/* Patient Summary Card */}
                <div className="bg-[#11141B] rounded-2xl border border-slate-800 p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Subject Name</p>
                      <p className="text-xs font-semibold text-white mt-1">{selectedCase.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Demographics</p>
                      <p className="text-xs font-semibold text-white mt-1">Age: {selectedCase.age} | Gender: {selectedCase.gender}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Cognitive Scores</p>
                      <p className="text-xs font-semibold text-white mt-1">MoCA: {selectedCase.mocaScore}/30 | CDR: {selectedCase.cdrScore}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Comorbidities</p>
                      <div className="flex flex-wrap gap-1 mt-1 justify-center md:justify-start">
                        {selectedCase.comorbidities.map((item, idx) => (
                          <span key={idx} className="bg-slate-800 text-[9px] px-1.5 py-0.5 rounded text-slate-400">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segmentations Diagnostic & Probabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Dynamic Atrophy ROI Graph & Brain Map Interactive representation */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-[#11141B] rounded-2xl border border-slate-800 p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Automated MRI ROI Atrophy Segmentation
                        </span>
                        <span className="text-[9px] font-mono text-blue-400">
                          MRI Status: {selectedCase.mriStatus ? "Positive volume loss flagged" : "Preserved states"}
                        </span>
                      </div>

                      {/* Bar charts for region volume loss */}
                      <div className="space-y-4">
                        {selectedCase.brainRegions.map((region) => (
                          <div
                            key={region.name}
                            onClick={() => setSelectedRegionDetails(region.name)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                              selectedRegionDetails === region.name
                                ? "bg-slate-900 border-blue-500/50"
                                : "bg-slate-900/30 border-transparent hover:border-slate-800"
                            }`}
                          >
                            <div className="flex justify-between text-[11px] mb-1.5">
                              <span className="font-semibold text-white">{region.name}</span>
                              <span className={`text-[10px] font-mono px-1.5 rounded ${
                                region.status === "Severe Atrophy"
                                  ? "text-red-400 bg-red-950/40"
                                  : region.status === "Mild Atrophy"
                                  ? "text-yellow-400 bg-yellow-950/40"
                                  : "text-emerald-400 bg-emerald-950/40"
                              }`}>
                                {region.atrophy}% volume loss ({region.status})
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  region.status === "Severe Atrophy"
                                    ? "bg-red-500"
                                    : region.status === "Mild Atrophy"
                                    ? "bg-yellow-500"
                                    : "bg-emerald-500"
                                }`}
                                style={{ width: `${region.atrophy}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Region Context Explanation */}
                      <div className="mt-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-400">
                        <strong className="text-white">Anatomical Focus: {selectedRegionDetails} — </strong>
                        {selectedRegionDetails === "Hippocampus" &&
                          "Crucial memory hub. Hippocampal atrophy index acts as a gold-standard structural predictor for amnestic clinical Alzheimer progression."}
                        {selectedRegionDetails === "Entorhinal Cortex" &&
                          "The gateway to cognitive storage. Volume decay here represents active neurodegenerative transitions, often observable up to 5 years prior to severe functional symptoms."}
                        {selectedRegionDetails === "Temporal Lobe" &&
                          "Involved in semantic processing. Asymmetrical decay flags general cerebral dementia spectrum or behavioral frontotemporal variants."}
                        {selectedRegionDetails === "Parietal Cortex" &&
                          "Controls visuospatial integration. Generally preserved in behavioral-variant FTD but suffers in posterior-variant cortical decalcifications."}
                      </div>

                    </div>
                  </div>

                  {/* Probabilities Profile Dials */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="bg-[#11141B] rounded-2xl border border-slate-800 p-5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-3">
                        Differential Predictive Profile (%)
                      </span>

                      <div className="space-y-3.5">
                        {selectedCase.probabilities.map((prob) => (
                          <div key={prob.disease} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-300 font-semibold truncate max-w-[150px]">{prob.disease}</span>
                              <span className="font-mono text-white font-bold">{prob.probability}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${prob.color} transition-all duration-500`}
                                style={{ width: `${prob.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 text-center">
                        <p className="text-[9px] text-slate-500 leading-normal uppercase">
                          Model weights: 40% MRI Morphometry | 40% Cognitive Screens | 20% Clinical Demographics
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Synthesized Clinical Support Recommendation */}
                <div className="mt-6 bg-[#11141B] rounded-2xl border border-slate-800 p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Generated Decision Draft & Clinical Summary
                      </span>
                    </div>
                  </div>
                  
                  <textarea
                    className="w-full text-xs font-mono bg-slate-900 border border-slate-800 outline-none p-3.5 text-slate-300 leading-relaxed rounded-xl focus:border-blue-500 h-28"
                    value={selectedCase.clinicalSummary}
                    readOnly
                  />
                  
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Drafted autonomically. Safe to export into medical records.</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPost("Clinical Reports Integration", selectedCase.clinicalSummary)}
                      className="text-blue-400 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Medical Summary Text
                    </button>
                  </div>
                </div>

              </div>

              {/* Real-time Validation Reference Disclaimer */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-500">
                <span>© Clinical sandbox powered by Synthetic Diagnostic Inference model v1.4-beta</span>
                <span>Referencing global ADNI validation sets (N = 824)</span>
              </div>

            </div>

          </div>
        </section>


        {/* CLINICAL CONFIDENCE CALCULATOR / PRACTICE DIAGNOSTIC QUIZ */}
        <section id="confidence-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left Text Explainer info */}
          <div className="lg:col-span-5 bg-[#11141B] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-blue-500 uppercase tracking-widest font-bold">Practice Diagnostic Checkup</span>
              <h2 className="text-3xl font-serif text-white">How High is Your Diagnostic Certainty?</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Evaluating early cognitive decline remains one of modern medicine's trickiest tasks. Regional clinics, general neurologist practices, and diagnostic centers all operate with different resource bottlenecks, creating delay, subjectivity, or unnecessary molecular scans.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Take our quick 3-question Practice Checkup to quantify your current diagnostic friction, and discover how incorporating an integrated multimodal platform improves precision.
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-6 mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-white">Detect diagnostic subjectivity early</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-white">Quantify impact of MRI segmentation speeds</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-white">Measure clinical confidence scores against ADNI base</span>
              </div>
            </div>
          </div>


          {/* Right Active Interactive Quiz Module */}
          <div className="lg:col-span-7 bg-[#11141B] border border-[#3B82F6]/60 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            
            {/* Glowing active glow border indicator */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            {!quizScoreCalculated ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Step visual indicators */}
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="uppercase tracking-widest text-[#3B82F6] font-mono font-bold">Metric Assessment</span>
                    <span className="font-mono">Question {quizStep + 1} of {quizQuestions.length}</span>
                  </div>

                  <div className="h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Active Question Title */}
                  <h3 className="text-base font-serif text-white mt-6 font-semibold leading-relaxed">
                    {quizQuestions[quizStep].question}
                  </h3>

                  {/* Active Options list */}
                  <div className="mt-6 space-y-3">
                    {quizQuestions[quizStep].options.map((option) => (
                      <button
                        key={option.val}
                        onClick={() => handleSelectQuizOption(quizQuestions[quizStep].id, option.val)}
                        className={`w-full text-left p-4 rounded-xl border text-xs leading-relaxed transition-all flex gap-3 items-center ${
                          quizAnswers[quizQuestions[quizStep].id] === option.val
                            ? "bg-slate-950 border-blue-500 text-white shadow-lg shadow-blue-900/10"
                            : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-mono font-bold ${
                          quizAnswers[quizQuestions[quizStep].id] === option.val
                            ? "border-blue-500 bg-blue-600 text-white"
                            : "border-slate-700 bg-slate-900 text-slate-400"
                        }`}>
                          {option.val}
                        </div>
                        <span className="flex-1">{option.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Scientific Insight block for educational value */}
                  <div className="mt-4 bg-slate-950/50 rounded-xl p-3 border border-slate-800 flex gap-2 items-start text-[11px] text-slate-450 leading-relaxed text-slate-400">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-blue-400 uppercase font-mono tracking-wider">Clinical Insight:</strong> {quizQuestions[quizStep].insight}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setQuizStep(prev => Math.max(0, prev - 1))}
                    disabled={quizStep === 0}
                    className="text-xs uppercase tracking-wider font-semibold hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Previous Question
                  </button>
                  
                  <button
                    onClick={handleNextQuizStep}
                    disabled={!quizAnswers[quizQuestions[quizStep].id]}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-colors flex items-center gap-1.5"
                  >
                    {quizStep === quizQuestions.length - 1 ? "Calculate Diagnostic Score" : "Next Metric"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              // Quiz Results View
              <div className="space-y-6 text-center py-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-900/30 border border-blue-500/50 flex items-center justify-center mx-auto text-blue-400">
                    <Activity className="w-8 h-8 animate-pulse" />
                  </div>
                  
                  <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 px-2 py-1 rounded border border-blue-900 mx-auto inline-block">
                    PROVISIONAL DIAGNOSTIC REPORT GENERATED
                  </span>

                  <h3 className="text-2xl font-serif text-white">Your Clinical Practice ScoreCard</h3>
                  
                  {/* Confidence metrics graphic */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 max-w-md mx-auto space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Clinical Evaluation Subjectivity Risk:</span>
                      <span className="text-red-400 font-bold font-mono">Moderate to High (42%)</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[42%] h-full bg-red-400"></div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Est. Time Waste in Tallying/Syncing data:</span>
                      <span className="text-yellow-400 font-bold font-mono">8 - 14 Days</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/65">
                      <span className="text-emerald-400 font-bold">Estimated Boost with NeuroPredict:</span>
                      <span className="text-emerald-400 font-bold font-mono">+ 38% Precision gain</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed max-w-lg mx-auto">
                    Your answers indicate minor manual bottleneck patterns. By switching to immediate automated structural segmentation alongside cognitive weightings, you could consolidate wait-times into a single patient visit session.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={resetQuiz}
                    className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    Reset Checkup Quiz
                  </button>
                  
                  <a
                    href="#schedule-demonstration"
                    onClick={() => {
                      setBookingType("Custom Diagnosis Practice Consult");
                    }}
                    className="bg-white text-black hover:bg-slate-100 font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors shadow-lg"
                  >
                    Discuss Confidence Report with Specialist
                  </a>
                </div>
              </div>
            )}

          </div>

        </section>


        {/* COMPETITOR COMPARISON MATRIX SECTION */}
        <section id="comparison-matrix" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">System Market Standards</span>
            <h2 className="text-3xl font-serif text-white">How We Compare with Legacy Workflows</h2>
            <p className="text-slate-400 text-sm">
              Discover why NeuroPredict AI's hybrid explainable workflow presents major clinical, logistical, and scientific benefits over traditional diagnostic processes.
            </p>
          </div>

          <div className="bg-[#11141B] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800">
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Capabilities & Features</th>
                    <th className="p-5 text-xs font-bold text-white uppercase tracking-widest bg-blue-900/25 border-x border-slate-800">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Brain className="w-4 h-4 text-blue-500" />
                        <span>NeuroPredict AI Platform</span>
                      </div>
                    </th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Traditional Patient Analysis</th>
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Standard DICOM Pixel Tools</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 text-xs leading-normal">
                  
                  <tr className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors">
                    <td className="p-5 font-semibold text-white">Multimodal Fusion (MRI + Cognitive Scales)</td>
                    <td className="p-5 bg-blue-900/10 border-x border-slate-800/55 font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Full Synchronization</span>
                    </td>
                    <td className="p-5 text-slate-400">Manual (Cognitive reports tallying separately)</td>
                    <td className="p-5 text-slate-400">N/A (Strictly radiological structure views)</td>
                  </tr>

                  <tr className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors">
                    <td className="p-5 font-semibold text-white">Explainable AI (XAI) Atrophy Maps</td>
                    <td className="p-5 bg-blue-900/10 border-x border-slate-800/55 font-semibold text-emerald-400">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Yes (Atrophy & weight overlays)</span>
                      </div>
                    </td>
                    <td className="p-5 text-slate-400">N/A (Subjective visual reviews only)</td>
                    <td className="p-5 text-slate-400">Rare (Voxel-count without diagnostics)</td>
                  </tr>

                  <tr className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors">
                    <td className="p-5 font-semibold text-white">Turnaround speed</td>
                    <td className="p-5 bg-blue-900/10 border-x border-slate-800/55 font-mono text-white font-semibold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>&lt; 90 Seconds</span>
                    </td>
                    <td className="p-5 text-slate-400">Days to weeks (Waiting for specialists)</td>
                    <td className="p-5 text-slate-400">10 - 30 Minutes manually</td>
                  </tr>

                  <tr className="border-b border-slate-800/60 hover:bg-slate-900/30 transition-colors">
                    <td className="p-5 font-semibold text-white">Dementia Subtype Differentiation</td>
                    <td className="p-5 bg-blue-900/10 border-x border-slate-800/55 font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>High (Alzheimer's vs DLB vs FTD)</span>
                    </td>
                    <td className="p-5 text-slate-400 font-mono text-slate-450 text-slate-400">Limited (High clinical overlap)</td>
                    <td className="p-5 text-slate-400">Highly limited (Imaging markers match FTD/DLB late)</td>
                  </tr>

                  <tr className="hover:bg-slate-900/30 transition-colors">
                    <td className="p-5 font-semibold text-white">Access / Resource limitations</td>
                    <td className="p-5 bg-blue-900/10 border-x border-slate-800/55 font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Slices dynamic interpolation</span>
                    </td>
                    <td className="p-5 text-slate-400">Strict dependency on 3T high-intensity Scanners</td>
                    <td className="p-5 text-slate-400">Requires specific high-cost volumetric MRI</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 border-t border-slate-800 text-center text-xs text-slate-500">
              *Features represent standard specifications from current clinical prototyping studies. Actual results subject to country-specific regulatory approvals.
            </div>
          </div>
        </section>


        {/* CASE STUDIES, CLINICAL TESTIMONIALS & REVIEWS (SOCIAL PROOF) */}
        <section id="clinical-testimonials" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left testimonial case study block */}
          <div className="lg:col-span-4 bg-[#11141B] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-bold">Success & Clinical Case Reviews</span>
              <h3 className="text-2xl font-serif text-white">Prototyping Validation & Mock Studies</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                "We launched a mock validation set analyzing 120 patients from the regional dementia database. NeuroPredict completed differential diagnostics with an accuracy matching 92% of consensus-based molecular evaluations."
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-4 mt-6">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold font-serif text-sm border border-slate-700">
                  JO
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Dr. J. Oliveira, MD</p>
                  <p className="text-[10px] text-blue-400 uppercase tracking-wide font-mono mt-0.5">Neurodegenerative Specialist</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 italic leading-relaxed">
                "Separating prodromal Alzheimer's from dementia with Lewy Bodies is highly subjective early on. NeuroPredict's explainable localized atrophy hotspots changed the speed and assurance of our differential choices."
              </p>
            </div>
          </div>

          {/* Center testimonial case study block 2 */}
          <div className="lg:col-span-4 bg-[#11141B] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-bold">Clinician Control</span>
              <h3 className="text-2xl font-serif text-white">Restoring Clarity in Clinical Consults</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                "The biggest value isn't just the probability number itself—it's the clarity. Families facing memory impairment are scared and confused. Being able to show them an objective regional atrophy chart instead of arbitrary scores transforms patient-family alignment."
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-4 mt-6">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold font-serif text-sm border border-slate-700">
                  AS
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Dra. Ana S.</p>
                  <p className="text-[10px] text-blue-400 uppercase tracking-wide font-mono mt-0.5">Clinical Cognitive Neurologist</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 italic leading-relaxed">
                "The dashboard explainable reports give patients factual, visual understanding about what is going on. It provides clinical dignity and clear guidelines during highly anxious conversations."
              </p>
            </div>
          </div>

          {/* Right actual simulated Case study breakdown */}
          <div className="lg:col-span-4 bg-[#11141B] border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">Featured Case Study</span>
              <h3 className="text-lg font-serif text-white uppercase font-bold">Case Record #NP-804</h3>
              <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <p><strong>Subject:</strong> 72yo Male presenting with progressive verbal forgetfulness.</p>
                <p><strong>Cognitive base:</strong> MoCA 19/30 | CDR 0.5 (MCI level)</p>
                <p><strong>Radiology interpretation:</strong> Traditional review reported 'General age-appropriate cortical volumetric reduction'.</p>
                <p className="text-blue-300 font-semibold border-t border-slate-800 pt-2 mt-2">NeuroPredict Impact:</p>
                <p>Identified focal loss in the bilateral entorhinal cortex (-44%) while preserving global parietal bounds, suggesting accelerated prodromal AD. Conduta was immediately calibrated to therapeutics 9 months earlier than traditional repeat schedules.</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-805/50 flex justify-between items-center text-[10px]">
              <span className="text-slate-500">Case studies represent synthetic physician reviews.</span>
              <button 
                type="button" 
                onClick={() => handleDownloadWhitepaper()}
                className="text-blue-400 hover:text-white transition-colors"
              >
                Read more mock papers
              </button>
            </div>
          </div>

        </section>


        {/* SOCIAL MEDIA FEED & COPY CENTER WORKSPACE */}
        <section id="social-workspace" className="bg-[#11141B] border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-500 uppercase tracking-widest font-bold">Physician & Executive Outreach</span>
              <h2 className="text-3xl font-serif text-white">Social Media Collateral & Outreach Packs</h2>
              <p className="text-slate-400 text-sm">
                Get pre-written clinical marketing resources to circulate in your medical network or post to LinkedIn and clinical message boards. Click any copy button to save.
              </p>
            </div>
          </div>

          <div id="social-tabs" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Social Post 1 */}
            <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">LinkedIn Feed Article</span>
                  <span className="text-[9px] font-mono leading-none bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900">Clinician Painpoint</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">{SOCIAL_POST_PROBLEM.title}</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-[10px] font-mono text-slate-400 leading-relaxed overflow-y-auto max-h-40 border border-slate-800/80">
                  {SOCIAL_POST_PROBLEM.content}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => handleCopyPost("LinkedIn", SOCIAL_POST_PROBLEM.content)}
                className="w-full bg-[#11141B] hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl text-[11px] font-bold text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy LinkedIn Post
              </button>
            </div>

            {/* Social Post 2 */}
            <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Twitter/X Thread Post</span>
                  <span className="text-[9px] font-mono leading-none bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-900">Technical / XAI Deepdive</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">{SOCIAL_POST_TECH.title}</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-[10px] font-mono text-slate-400 leading-relaxed overflow-y-auto max-h-40 border border-slate-800/80">
                  {SOCIAL_POST_TECH.content}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => handleCopyPost("Twitter/X", SOCIAL_POST_TECH.content)}
                className="w-full bg-[#11141B] hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl text-[11px] font-bold text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy X Content
              </button>
            </div>

            {/* Social Post 3 */}
            <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Health Network Article</span>
                  <span className="text-[9px] font-mono leading-none bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900">Patient Centered Care</span>
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">{SOCIAL_POST_HUMAN.title}</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-[10px] font-mono text-slate-400 leading-relaxed overflow-y-auto max-h-40 border border-slate-800/80">
                  {SOCIAL_POST_HUMAN.content}
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => handleCopyPost("LinkedIn / Medium", SOCIAL_POST_HUMAN.content)}
                className="w-full bg-[#11141B] hover:bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl text-[11px] font-bold text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Outreach Post
              </button>
            </div>

          </div>
        </section>


        {/* LEAD ACQUISITION, MOCK RESERVATIONS & DEMO SCHEDULER */}
        <section id="schedule-demonstration" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Lead Form */}
          <div className="lg:col-span-7 bg-[#11141B] border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">Inquire & Engage</span>
              <h2 className="text-3xl font-serif text-white">Pilot Program Registration & Demo Booking</h2>
              <p className="text-slate-400 text-xs leading-normal">
                Sign up for an exclusive trial sandbox environment for your neurology clinic, schedule a 15-minute scientific briefing call, or register your email for our quarterly research briefs.
              </p>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-450 text-slate-400">Full Professional Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-white outline-none"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-450 text-slate-400">Medical Professional Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. a.pendelton@neurology.hosp"
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-white outline-none"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-450 text-slate-400">Request Date:</label>
                  <input
                    type="date"
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-white outline-none"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-450 text-slate-400">Preferred Time Slot:</label>
                  <input
                    type="time"
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-white outline-none"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-450 text-slate-400">Inquiry Target Focus:</label>
                  <select
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-white outline-none"
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                  >
                    <option value="Clinical Demo & Sandbox Setup">Clinical Demo & Pilot App</option>
                    <option value="Research Collaboration & API Code">Research Collaboration (API)</option>
                    <option value="Hospital Procurement Briefing">Procurement Briefing</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Regulatory Disclaimer: All diagnostic features represent pre-release simulation models. Your email will be stored safely within this local sandbox session.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-blue-900/10"
              >
                Request Trial Invite & Schedule Scientific Demo
              </button>
            </form>
          </div>

          {/* Active Reservations tracking to prove persistent dynamic storage in session */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">Active Local Bookings Ledger</span>
              <h3 className="text-lg font-serif text-white mt-1">Confirmed Seminar & Pilot Bookings</h3>
              <p className="text-slate-400 text-xs leading-normal mt-1">
                Your entries update instantly in real-time in this session's sandbox ledger. See your scheduled slots below:
              </p>
            </div>

            <div className="space-y-3">
              {scheduledRequests.map((req) => (
                <div key={req.id} className="bg-[#11141B] rounded-2xl border border-slate-800/80 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white block truncate max-w-[200px]">{req.name}</span>
                    <span className="text-[9px] font-mono uppercase bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-900/60">
                      Confirmed Request
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{req.email}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1.5 border-t border-slate-800/60 font-mono text-slate-400">
                    <div className="flex gap-1 items-center">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{req.date}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{req.time}</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase font-mono pt-1">
                    Topic: {req.type}
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Subscription field */}
            <div className="border-t border-slate-800/80 pt-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Join Academic Clinical Digest
                </span>
                <p className="text-slate-500 text-[10px] leading-relaxed">
                  Get our quarterly multimodal Alzheimer research digests delivered directly.
                </p>
                <div className="flex gap-2 mt-1">
                  <input
                    type="email"
                    placeholder="Enter academic email"
                    className="flex-1 text-xs font-mono bg-[#11141B] border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-white outline-none"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (!newsletterEmail) {
                        triggerToast("Please provide an email address.", "info");
                        return;
                      }
                      triggerToast(`Subscribed successfully: ${newsletterEmail}! Check your inbox for preclinical abstracts soon.`, "success");
                      setNewsletterEmail("");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-4 rounded-lg"
                  >
                    Join List
                  </button>
                </div>
              </div>
            </div>

          </div>

        </section>


      </main>

      {/* Styled Footer Block in Sophisticated Dark Theme */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-20 w-full">
        <div className="bg-[#11141B] border border-slate-800 rounded-3xl p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold font-serif text-white tracking-tight uppercase">
                  NeuroPredict <span className="text-blue-500">AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Clinical decision support uniting anatomical brain volumes, cognitive scores, and clinical indicators. Real-time early Alzheimer's diagnostics engineered with transparent XAI.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">Scientific Core</h5>
              <ul className="text-[10px] text-slate-400 space-y-1.5">
                <li><a href="#value-proposition" className="hover:text-blue-400">Unique Value Proposition</a></li>
                <li><a href="#infographic-flow" className="hover:text-blue-400">Intelligent Pipelines</a></li>
                <li><a href="#simulator-console" className="hover:text-blue-400">Interactive MRI Simulator</a></li>
                <li><a href="#confidence-calculator" className="hover:text-blue-400">Volumetric Diagnostic Quiz</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">Legal & Integrity</h5>
              <ul className="text-[10px] text-slate-400 space-y-1.5">
                <li><a href="#comparison-matrix" className="hover:text-blue-400">Comparative Advantages</a></li>
                <li><a href="#clinical-testimonials" className="hover:text-blue-400">Clinical Case Reviews</a></li>
                <li><span className="text-slate-500">FDA Pre-submission Status (Simulated)</span></li>
                <li><span className="text-slate-500">HIPAA Compliant Cloud Sandbox</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">Active Social Hub</h5>
              <div className="flex gap-2">
                <span className="bg-slate-800 text-[9px] px-2 py-1 rounded text-slate-400">#XAI_Medicine</span>
                <span className="bg-slate-800 text-[9px] px-2 py-1 rounded text-slate-400">#Neurobiotech</span>
                <span className="bg-slate-800 text-[9px] px-2 py-1 rounded text-slate-400">#AlzheimerDecision</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyPost("LinkedIn", SOCIAL_POST_PROBLEM.content)}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-400 hover:text-white transition-colors"
                  title="Copy LinkedIn Outreach Resource"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyPost("X/Twitter", SOCIAL_POST_TECH.content)}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-400 hover:text-white transition-colors"
                  title="Copy X/Twitter Thread Resource"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <span className="uppercase text-center md:text-left tracking-normal font-mono">
              © 2026 NeuroPredict AI (Pre-Clinical Demonstration MVP). Precision in every synapse.
            </span>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">HIPAA Secure</span>
              <span className="hover:text-slate-400 cursor-pointer">GCP Cloud Run Ready</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
