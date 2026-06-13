"use client";

import { useState } from "react";

function StarburstIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="24"
          y1="4"
          x2="24"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

function AtomicOrnament({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className={className} fill="none">
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(60 60 60)" />
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(120 60 60)" />
      <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

const faqItems = [
  {
    question: "What is SepsisGuard?",
    answer:
      "SepsisGuard is an AI-based clinical decision system designed to assist in the early detection of sepsis risk. It uses a hybrid approach combining clinical reasoning (qSOFA) and machine learning (XGBoost) to produce a comprehensive risk assessment. SepsisGuard was developed as a research and AI technology demonstration tool in the healthcare domain.",
  },
  {
    question: "How accurate are SepsisGuard's predictions?",
    answer:
      "The XGBoost model in SepsisGuard has been trained on clinical datasets and has undergone a validation process. However, it's important to understand that model accuracy depends on the quality and completeness of the input data. SepsisGuard is designed as a decision support tool, not a replacement for professional medical diagnosis. Prediction results should always be interpreted by qualified medical professionals.",
  },
  {
    question: "What data is needed for analysis?",
    answer:
      "SepsisGuard requires several categories of clinical data: (1) Patient demographics — age, gender, body weight, height; (2) Vital signs — systolic blood pressure, respiratory rate, GCS score, SpO2; (3) Laboratory biomarkers — PaO2/FiO2 ratio, lactate, creatinine, arterial pH, bicarbonate, INR, platelets; (4) Clinical scores — SIRS, APACHE IV, SOFA, qSOFA; (5) Intervention data — 24-hour fluid volume and antibiotic administration.",
  },
  {
    question: "Is my data stored?",
    answer:
      "Data entered into SepsisGuard is only processed for real-time prediction analysis. Data is sent to the backend server for processing by the AI model, and results are returned immediately. We do not permanently store patient data on our servers. However, we recommend not entering actual patient data (real patient data) as this is a demonstration tool.",
  },
  {
    question: "Who should use SepsisGuard?",
    answer:
      "SepsisGuard is intended for: (1) Researchers and academics studying AI applications in healthcare; (2) Medical and nursing students learning about qSOFA concepts and sepsis scoring; (3) Developers and data scientists interested in clinical machine learning implementations; (4) Healthcare professionals exploring decision support system technology. SepsisGuard is NOT intended as a diagnostic tool for use on actual patients.",
  },
  {
    question: "What is qSOFA?",
    answer:
      "qSOFA (Quick Sequential Organ Failure Assessment) is a bedside screening tool recommended by the Sepsis-3 consensus (2016) to identify adult patients at high risk of poor outcomes due to infection. qSOFA evaluates 3 criteria: (1) Systolic blood pressure ≤ 100 mmHg; (2) Respiratory rate ≥ 22 breaths/min; (3) GCS (Glasgow Coma Scale) < 15. A qSOFA score ≥ 2 indicates the need for further evaluation for possible organ dysfunction.",
  },
  {
    question: "What is XGBoost?",
    answer:
      "XGBoost (Extreme Gradient Boosting) is an ensemble machine learning algorithm that uses gradient boosted decision trees. XGBoost is renowned for its high performance, computational efficiency, and ability to handle complex tabular data. In SepsisGuard, the XGBoost model is trained to analyze 50+ patient biomarker features and predict the probability of sepsis based on patterns learned from clinical datasets.",
  },
  {
    question: "Why use a Hybrid approach?",
    answer:
      "The hybrid approach combines the strengths of two different paradigms: (1) Rule-based reasoning (qSOFA) provides high interpretability and clinically validated results; (2) Machine learning (XGBoost) can detect complex patterns that are difficult to identify manually. By combining both, SepsisGuard delivers a more comprehensive assessment — qSOFA ensures transparent clinical aspects, while XGBoost adds depth through data-driven analysis.",
  },
];

function AccordionItem({ question, answer, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="mcm-accordion-item" id={`faq-item-${index}`}>
      <button
        className="mcm-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        id={`faq-trigger-${index}`}
      >
        <span>{question}</span>
        <svg
          className={`mcm-accordion-chevron ${isOpen ? "open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`mcm-accordion-content ${isOpen ? "open" : ""}`}>
        <div className="mcm-accordion-inner">
          <div className="px-6 pb-5">
            <div className="h-px bg-gradient-to-r from-[#d4a574]/20 via-[#d4a574]/10 to-transparent mb-4" />
            <p className="text-sm text-[#6b5d4f] leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#faf3eb" }}>
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 animate-starburst">
          <StarburstIcon size={280} className="text-[#d4a574]/10" />
        </div>
        <div className="absolute bottom-10 -left-10" style={{ animationDelay: "2s" }}>
          <AtomicOrnament className="text-[#d97642]/8 animate-starburst" />
        </div>
        <div className="absolute top-1/3 right-10 w-64 h-64 organic-blob bg-[#4a7c59]/[0.04]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(#2c2416 1px, transparent 1px),
              linear-gradient(90deg, #2c2416 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Hero */}
        <div className="mcm-page-hero animate-fade-in-up">
          <div className="absolute top-6 right-10 animate-starburst">
            <StarburstIcon size={80} className="text-[#d4a574]/15" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#d97642] animate-pulse-warm" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/70">
                Help Center
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#f5e6d3] tracking-tight leading-tight mb-3">
              Frequently Asked
              <br />Questions
            </h1>
            <p className="text-base text-[#d4a574]/80 font-light tracking-wide max-w-xl">
              Find answers to common questions about SepsisGuard, how to use it, and the technology behind it.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 animate-fade-in-up delay-200">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              index={index}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mcm-content-card text-center animate-fade-in-up delay-300">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#d97642]/10 mb-4">
            <StarburstIcon size={28} className="text-[#d97642]" />
          </div>
          <h3 className="text-xl font-bold text-[#2c2416] tracking-tight mb-2">
            Still Have Questions?
          </h3>
          <p className="text-sm text-[#6b5d4f] leading-relaxed max-w-md mx-auto mb-5">
            If your question hasn&apos;t been answered, please reach out to the development team through our GitHub repository or official email.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-[#8b7355]/60 font-medium tracking-wide">
            <div className="w-1 h-1 rotate-45 bg-[#d97642]/30" />
            <span>SepsisGuard Research Team</span>
            <div className="w-1 h-1 rotate-45 bg-[#d97642]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
