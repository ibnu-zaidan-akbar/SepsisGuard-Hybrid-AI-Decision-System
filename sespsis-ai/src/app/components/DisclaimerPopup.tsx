"use client";

import { useState, useEffect } from "react";

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

const disclaimerPoints = [
  {
    icon: "⚕",
    title: "Not a Medical Diagnostic Device",
    description:
      "SepsisGuard is a research and demonstration tool. Prediction results must not be used as a basis for diagnosis or clinical decision-making.",
  },
  {
    icon: "👨‍⚕️",
    title: "Consult Medical Professionals",
    description:
      "Always consult with a qualified doctor or medical professional before taking any medical action based on these results.",
  },
  {
    icon: "🔬",
    title: "Research & Educational Purpose",
    description:
      "This system was developed for academic research and AI technology demonstration in the healthcare domain.",
  },
  {
    icon: "🛡",
    title: "Data Privacy",
    description:
      "Data entered is only processed for prediction analysis and is not permanently stored on our servers.",
  },
];

export default function DisclaimerPopup() {
  const [visible, setVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(disclaimerPoints.length).fill(false)
  );

  useEffect(() => {
    const dismissed = localStorage.getItem("sepsisguard-disclaimer-accepted");
    if (!dismissed) {
      // Small delay so the page renders first before the modal fades in
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const allChecked = checkedItems.every(Boolean);

  const handleAccept = () => {
    localStorage.setItem("sepsisguard-disclaimer-accepted", "true");
    setVisible(false);
  };

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  if (!visible) return null;

  return (
    <div className="mcm-modal-overlay" id="disclaimer-overlay">
      <div className="mcm-modal" id="disclaimer-modal">
        {/* Top accent bar */}
        <div
          className="h-[3px] rounded-t-[20px]"
          style={{
            background:
              "linear-gradient(90deg, #d97642, #d4a574, #4a7c59, #7d9ba8)",
          }}
        />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#d97642]/10 mb-4">
              <StarburstIcon size={32} className="text-[#d97642]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2c2416] tracking-tight mb-2">
              Before You Begin
            </h2>
            <p className="text-sm text-[#8b7355] leading-relaxed max-w-sm mx-auto">
              This is a research and demonstration tool. Please read and
              acknowledge the following before proceeding.
            </p>
          </div>

          {/* Disclaimer items */}
          <div className="space-y-3 mb-8">
            {disclaimerPoints.map((point, index) => (
              <button
                key={index}
                onClick={() => toggleCheck(index)}
                className="w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200 border"
                style={{
                  background: checkedItems[index]
                    ? "rgba(74, 124, 89, 0.05)"
                    : "rgba(245, 230, 211, 0.3)",
                  borderColor: checkedItems[index]
                    ? "rgba(74, 124, 89, 0.25)"
                    : "rgba(212, 165, 116, 0.15)",
                }}
                id={`disclaimer-item-${index}`}
              >
                {/* Checkbox */}
                <div
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                  style={{
                    borderColor: checkedItems[index]
                      ? "#4a7c59"
                      : "rgba(139, 115, 85, 0.3)",
                    background: checkedItems[index]
                      ? "#4a7c59"
                      : "transparent",
                  }}
                >
                  {checkedItems[index] && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{point.icon}</span>
                    <span className="text-sm font-bold text-[#2c2416]">
                      {point.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b5d4f] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Accept button */}
          <button
            onClick={handleAccept}
            disabled={!allChecked}
            className="mcm-btn-primary w-full flex items-center justify-center gap-2"
            id="disclaimer-accept-btn"
          >
            <StarburstIcon size={18} className="text-white/80" />
            {allChecked
              ? "I Understand & Accept"
              : `Check all items to continue (${checkedItems.filter(Boolean).length}/${disclaimerPoints.length})`}
          </button>

          {/* Fine print */}
          <p className="text-center text-[10px] text-[#8b7355]/50 mt-4 tracking-wide">
            By proceeding, you acknowledge that SepsisGuard is for research
            purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
