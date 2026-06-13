"use client";

import Link from "next/link";
import DisclaimerPopup from "./components/DisclaimerPopup";

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

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "qSOFA Clinical Reasoning",
    description:
      "Rapid evaluation using 3 clinical criteria: systolic blood pressure, respiratory rate, and GCS score for early identification of sepsis risk.",
    accentColor: "#7d9ba8",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "XGBoost Machine Learning",
    description:
      "A trained machine learning model analyzes 50+ biomarker parameters to predict sepsis probability with high accuracy.",
    accentColor: "#d97642",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Hybrid Decision System",
    description:
      "Combines clinical reasoning and machine learning to produce more comprehensive and reliable clinical decisions.",
    accentColor: "#4a7c59",
  },
];

const steps = [
  {
    number: "01",
    title: "Input Clinical Data",
    description: "Enter patient demographics, vital signs, laboratory results, and clinical scores.",
    color: "#6b5d4f",
  },
  {
    number: "02",
    title: "Dual-Engine Analysis",
    description: "The system analyzes data using qSOFA reasoning and XGBoost prediction simultaneously.",
    color: "#d97642",
  },
  {
    number: "03",
    title: "Results & Recommendations",
    description: "Get sepsis probability, qSOFA score, and clinical insights to support medical decisions.",
    color: "#4a7c59",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#faf3eb" }}>
      <DisclaimerPopup />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 animate-starburst">
          <StarburstIcon size={280} className="text-[#d4a574]/10" />
        </div>
        <div className="absolute bottom-10 -left-10" style={{ animationDelay: "2s" }}>
          <AtomicOrnament className="text-[#d97642]/8 animate-starburst" />
        </div>
        <div className="absolute top-1/3 right-10 w-64 h-64 organic-blob bg-[#4a7c59]/[0.04]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 organic-blob bg-[#d97642]/[0.04]" />
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

      <div className="relative z-10">
        {/* ── Hero Section ── */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20" id="hero-section">
          <div className="mcm-page-hero animate-fade-in-up">
            {/* Decorative starbursts */}
            <div className="absolute top-6 right-10 animate-starburst">
              <StarburstIcon size={100} className="text-[#d4a574]/15" />
            </div>
            <div className="absolute bottom-6 left-10">
              <StarburstIcon size={56} className="text-[#d97642]/10" />
            </div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2">
              <AtomicOrnament className="text-[#d4a574]/5 w-40 h-40" />
            </div>

            <div className="relative max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#d97642] animate-pulse-warm" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/70">
                  Hybrid AI Decision System
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-[#f5e6d3] tracking-tight leading-[1.1] mb-5">
                Early Detection of
                <br />
                <span className="text-[#d97642]">Sepsis</span> with AI
              </h1>

              <p className="text-base md:text-lg text-[#d4a574]/80 font-light tracking-wide leading-relaxed mb-8 max-w-lg">
                A hybrid clinical decision system combining qSOFA clinical
                reasoning and XGBoost machine learning for accurate and
                rapid sepsis risk identification.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/detect" className="mcm-btn-primary inline-flex items-center justify-center gap-3 no-underline">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  Start Detection Now
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#d4a574]/25 bg-white/5 text-[#d4a574] hover:bg-white/10 font-semibold text-sm tracking-wide transition-all duration-300 no-underline"
                >
                  Learn How It Works →
                </Link>
              </div>
            </div>

            {/* Stats row */}
            <div className="relative mt-12 pt-8 border-t border-[#d4a574]/15 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-extrabold text-[#f5e6d3] tracking-tight">50+</div>
                <div className="text-[11px] font-medium tracking-wide text-[#d4a574]/50 mt-1">Biomarker Parameters</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#f5e6d3] tracking-tight">2</div>
                <div className="text-[11px] font-medium tracking-wide text-[#d4a574]/50 mt-1">Analysis Engines</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#f5e6d3] tracking-tight">Real-time</div>
                <div className="text-[11px] font-medium tracking-wide text-[#d4a574]/50 mt-1">Prediction Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20" id="features-section">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a574]/40" />
              <div className="w-2 h-2 rotate-45 bg-[#d97642]/40" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a574]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2416] tracking-tight mb-3">
              Why SepsisGuard?
            </h2>
            <p className="text-base text-[#8b7355] max-w-lg mx-auto leading-relaxed">
              Three pillars of analysis working together for comprehensive sepsis detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="mcm-feature-card animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: feature.accentColor }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.accentColor}12`,
                    color: feature.accentColor,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#2c2416] mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6b5d4f] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works Section ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20" id="how-it-works-section">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a574]/40" />
              <StarburstIcon size={18} className="text-[#d97642]/40" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a574]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c2416] tracking-tight mb-3">
              How Does It Work?
            </h2>
            <p className="text-base text-[#8b7355] max-w-lg mx-auto leading-relaxed">
              Three simple steps to get a comprehensive sepsis analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`mcm-content-card text-center animate-fade-in-up ${
                  index < steps.length - 1 ? "mcm-step-connector" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 text-2xl font-extrabold text-white"
                  style={{ background: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-[#2c2416] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6b5d4f] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20" id="cta-section">
          <div className="mcm-page-hero text-center animate-fade-in-up">
            <div className="absolute top-6 right-10 animate-starburst">
              <StarburstIcon size={64} className="text-[#d4a574]/10" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d97642]/15 mb-6">
                <StarburstIcon size={32} className="text-[#d97642]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#f5e6d3] tracking-tight mb-4">
                Ready to Start Detection?
              </h2>
              <p className="text-base text-[#d4a574]/70 max-w-md mx-auto mb-8 leading-relaxed">
                Enter patient clinical data and get sepsis risk analysis in seconds.
              </p>
              <Link href="/detect" className="mcm-btn-primary inline-flex items-center gap-3 no-underline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Start Detection Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}