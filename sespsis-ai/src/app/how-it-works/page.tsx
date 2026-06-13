"use client";

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

const workflowSteps = [
  {
    number: "01",
    title: "Clinical Data Input",
    subtitle: "Data Collection",
    color: "#6b5d4f",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
    description: "Medical staff enter patient data through a structured form covering several key categories:",
    details: [
      "Patient demographics — age, gender, body weight, height",
      "Vital signs — systolic blood pressure, respiratory rate, GCS score, SpO2",
      "Laboratory biomarkers — PaO2/FiO2 ratio, lactate, creatinine, arterial pH, bicarbonate, INR, platelets",
      "Clinical scores — SIRS, APACHE IV, SOFA, initial qSOFA",
      "Interventions — 24-hour fluid volume, antibiotic administration",
    ],
  },
  {
    number: "02",
    title: "qSOFA Analysis",
    subtitle: "Reasoning Engine",
    color: "#7d9ba8",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    description: "The first engine uses clinical reasoning based on qSOFA (Quick Sequential Organ Failure Assessment). The system evaluates 3 criteria:",
    details: [
      "Systolic blood pressure ≤ 100 mmHg — indicates hypotension",
      "Respiratory rate ≥ 22 breaths/min — indicates tachypnea",
      "GCS (Glasgow Coma Scale) < 15 — indicates altered mental status",
      "A score of 0-3 is calculated based on the number of criteria met",
      "qSOFA ≥ 2 indicates a high risk of organ dysfunction due to infection",
    ],
  },
  {
    number: "03",
    title: "XGBoost Prediction",
    subtitle: "Learning Engine",
    color: "#d97642",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    description: "The second engine uses an XGBoost (Extreme Gradient Boosting) model trained on clinical datasets. This model analyzes:",
    details: [
      "50+ biomarker features from patient input data",
      "Complex inter-variable patterns difficult to detect manually",
      "Sepsis probability as a percentage (0-100%)",
      "Confidence score from the machine learning model",
      "Most important features (feature importance) influencing the prediction",
    ],
  },
  {
    number: "04",
    title: "Hybrid Decision",
    subtitle: "Decision Fusion",
    color: "#4a7c59",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    description: "The final stage combines outputs from both engines to produce a more comprehensive clinical decision:",
    details: [
      "Fusion of qSOFA reasoning results with XGBoost probability",
      "Final patient status: Sepsis / Non-Sepsis",
      "Details of symptoms detected by qSOFA",
      "Sepsis probability from the ML model with interpretive messages",
      "Clinical insights and recommended next steps",
    ],
  },
];

export default function CaraKerjaPage() {
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Hero */}
        <div className="mcm-page-hero animate-fade-in-up">
          <div className="absolute top-6 right-10 animate-starburst">
            <StarburstIcon size={80} className="text-[#d4a574]/15" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#d97642] animate-pulse-warm" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/70">
                System Architecture
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#f5e6d3] tracking-tight leading-tight mb-3">
              How SepsisGuard Works
            </h1>
            <p className="text-base text-[#d4a574]/80 font-light tracking-wide max-w-xl">
              Understanding how the hybrid AI system combines clinical reasoning and machine learning to detect sepsis accurately.
            </p>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="mcm-content-card animate-fade-in-up delay-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#d97642]/10 flex items-center justify-center">
              <AtomicOrnament className="text-[#d97642] w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#d97642]">
                System Architecture
              </h2>
              <p className="text-[11px] text-[#8b7355] mt-0.5">Dual-Engine Hybrid Architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#7d9ba8]/20 bg-[#7d9ba8]/[0.03]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#7d9ba8]" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#7d9ba8]">
                  Reasoning Engine
                </span>
              </div>
              <p className="text-2xl font-extrabold text-[#2c2416] tracking-tight mb-1">qSOFA</p>
              <p className="text-xs text-[#6b5d4f] leading-relaxed">
                Clinical rule-based system using 3 bedside assessment criteria validated by the Sepsis-3 consensus.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#d97642]/20 bg-[#d97642]/[0.03]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#d97642]" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#d97642]">
                  Learning Engine
                </span>
              </div>
              <p className="text-2xl font-extrabold text-[#2c2416] tracking-tight mb-1">XGBoost</p>
              <p className="text-xs text-[#6b5d4f] leading-relaxed">
                Gradient boosted decision tree model analyzing 50+ biomarker features to predict sepsis probability.
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className="mcm-content-card animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: step.color }}
                  >
                    <span className="text-xl font-extrabold">{step.number}</span>
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div style={{ color: step.color }}>{step.icon}</div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: step.color }}>
                        {step.subtitle}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#2c2416] tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6b5d4f] leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5">
                    {step.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-3 text-sm text-[#6b5d4f]">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ background: step.color }}
                        />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Flow Diagram */}
        <div className="mcm-content-card animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#4a7c59]">
              Decision Flow
            </h2>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Input */}
            <div className="w-full max-w-sm p-4 rounded-xl border-2 border-[#6b5d4f]/20 bg-[#6b5d4f]/[0.04] text-center">
              <p className="text-sm font-bold text-[#2c2416]">Patient Clinical Data</p>
              <p className="text-[11px] text-[#8b7355]">Demographics, Vital Signs, Lab, Scores</p>
            </div>

            <div className="w-0.5 h-6 bg-gradient-to-b from-[#6b5d4f]/30 to-[#d4a574]/30" />

            {/* Split */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-2 border-[#7d9ba8]/25 bg-[#7d9ba8]/[0.04] text-center">
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#7d9ba8] mb-1">
                  Reasoning Engine
                </p>
                <p className="text-lg font-extrabold text-[#2c2416]">qSOFA Score</p>
                <p className="text-[11px] text-[#8b7355]">0-3 criteria check</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-[#d97642]/25 bg-[#d97642]/[0.04] text-center">
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#d97642] mb-1">
                  Learning Engine
                </p>
                <p className="text-lg font-extrabold text-[#2c2416]">XGBoost Prediction</p>
                <p className="text-[11px] text-[#8b7355]">Probability 0-100%</p>
              </div>
            </div>

            <div className="w-0.5 h-6 bg-gradient-to-b from-[#d4a574]/30 to-[#4a7c59]/30" />

            {/* Output */}
            <div className="w-full max-w-sm p-4 rounded-xl border-2 border-[#4a7c59]/25 bg-[#4a7c59]/[0.04] text-center">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#4a7c59] mb-1">
                Hybrid Decision
              </p>
              <p className="text-lg font-extrabold text-[#2c2416]">Final Clinical Assessment</p>
              <p className="text-[11px] text-[#8b7355]">Status + Insight + Recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
