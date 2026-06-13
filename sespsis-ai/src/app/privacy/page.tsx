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

const privacySections = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Data Collection",
    color: "#7d9ba8",
    content: [
      "SepsisGuard collects clinical data entered by users through the sepsis detection form. This includes patient demographic information (age, gender, weight/height), vital signs, laboratory results, clinical scores, and intervention data.",
      "We do not collect personally identifiable information (PII) such as names, addresses, medical record numbers, or patient contact information. The detection form only requests numerical and categorical clinical data necessary for prediction analysis.",
      "Standard access logs (IP address, browser type, timestamp) may be automatically collected by the hosting server for performance monitoring and security purposes.",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Data Processing",
    color: "#d97642",
    content: [
      "Clinical data entered is sent to the backend server via an encrypted HTTPS connection for processing by the AI model (XGBoost and qSOFA engine).",
      "Analysis is performed in real-time. Data is processed by the machine learning model to generate predictions, and results are returned to the user's browser.",
      "During processing, data resides temporarily in server memory and is not written to permanent storage (databases, file systems, or logs).",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Storage & Retention",
    color: "#4a7c59",
    content: [
      "SepsisGuard does NOT permanently store patient clinical data. After prediction results are returned to the user, clinical data is cleared from server memory.",
      "No database or patient data storage mechanism is implemented in this system.",
      "Prediction results are only available during the user's active browser session. Closing the browser or refreshing the page will remove all entered data and prediction results.",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
      </svg>
    ),
    title: "Third-Party Services",
    color: "#8b7355",
    content: [
      "Backend API: SepsisGuard uses a backend server hosted on Railway (railway.app) to run the prediction model. Clinical data is sent to this API endpoint for processing.",
      "Frontend Hosting: The web interface is hosted on Vercel or other static hosting providers that comply with industry security standards.",
      "We do not use third-party analytics services (such as Google Analytics), advertising services, or tracking tools that could collect user data.",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 12l2 2 4-4" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
    title: "Research Purpose & Disclaimer",
    color: "#d97642",
    content: [
      "SepsisGuard was developed as an academic research project and technology demonstration. This system is NOT a certified or approved medical diagnostic tool by any health authority.",
      "Users are STRONGLY ADVISED NOT to enter actual patient data (real patient data) into this system. Please use simulated or example data for demonstration and learning purposes.",
      "Any clinical decisions made based on SepsisGuard output are entirely the user's responsibility. The developers are not liable for consequences arising from using this tool for clinical purposes.",
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    title: "Contact & Further Information",
    color: "#7d9ba8",
    content: [
      "For questions regarding the privacy policy or data usage, please contact the development team through the official SepsisGuard GitHub repository.",
      "This privacy policy may be updated at any time as the project evolves. Significant changes will be noted on this page.",
      "Last updated: June 2026.",
    ],
  },
];

export default function PrivacyPage() {
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Hero */}
        <div className="mcm-page-hero animate-fade-in-up">
          <div className="absolute top-6 right-10 animate-starburst">
            <StarburstIcon size={80} className="text-[#d4a574]/15" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#d97642] animate-pulse-warm" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/70">
                Legal & Compliance
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#f5e6d3] tracking-tight leading-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-base text-[#d4a574]/80 font-light tracking-wide max-w-xl">
              Information about how SepsisGuard collects, processes, and protects the data you provide.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mcm-content-card animate-fade-in-up delay-100 mcm-accent-border-left" style={{ borderLeftColor: "#d97642" }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d97642]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97642" strokeWidth="2" strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2c2416] mb-2">
                Important: Research & Demonstration Tool
              </h3>
              <p className="text-sm text-[#6b5d4f] leading-relaxed">
                SepsisGuard is an academic research project. Do not enter actual patient data. The system does not permanently store data and is not intended for clinical use.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {privacySections.map((section, index) => (
            <div
              key={index}
              className="mcm-content-card animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `${section.color}12`,
                    color: section.color,
                  }}
                >
                  {section.icon}
                </div>
                <h2
                  className="text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: section.color }}
                >
                  {section.title}
                </h2>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(to right, ${section.color}25, transparent)`,
                  }}
                />
              </div>

              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-sm text-[#6b5d4f] leading-relaxed pl-[52px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
