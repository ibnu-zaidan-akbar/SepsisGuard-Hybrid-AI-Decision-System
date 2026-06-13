import Link from "next/link";

function StarburstIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/detect", label: "Start Detection" },
];

export default function Footer() {
  return (
    <footer className="mcm-footer" id="site-footer">
      {/* Top accent bar */}
      <div
        className="h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, #d97642, #d4a574, #4a7c59, #7d9ba8)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="text-[#d97642]">
                <StarburstIcon size={24} />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#f5e6d3]">
                Sepsis<span className="text-[#d97642]">Guard</span>
              </span>
            </div>
            <p className="text-sm text-[#d4a574]/70 leading-relaxed max-w-xs">
              Hybrid AI Decision System — Early sepsis detection using
              qSOFA clinical reasoning and XGBoost machine learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/50 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#d4a574]/80 hover:text-[#e8945f] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/50 mb-5">
              Disclaimer
            </h4>
            <p className="text-xs text-[#d4a574]/50 leading-relaxed">
              SepsisGuard is a research and demonstration tool. Prediction
              results do not replace professional medical diagnosis. Always
              consult with qualified medical personnel for clinical decisions.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#d97642]/30" />
          <div className="w-1 h-1 rotate-45 bg-[#d4a574]/20" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#d97642]/30" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 pt-4">
          <StarburstIcon size={14} />
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#8b7355]/50 text-center">
            © {new Date().getFullYear()} SepsisGuard — Hybrid AI Decision
            System. Research Use Only.
          </p>
          <StarburstIcon size={14} />
        </div>
      </div>

      {/* Decorative corner starburst */}
      <div className="absolute bottom-4 right-6 opacity-[0.04] pointer-events-none">
        <StarburstIcon size={120} />
      </div>
    </footer>
  );
}
