"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StarburstLogo({ size = 28 }: { size?: number }) {
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
          y1="6"
          x2="24"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill="currentColor" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`mcm-navbar ${scrolled ? "scrolled" : ""}`} id="main-navbar">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="text-[#d97642] transition-transform duration-300 group-hover:rotate-45">
              <StarburstLogo size={28} />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#2c2416]">
              Sepsis<span className="text-[#d97642]">Guard</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mcm-nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/detect" className="mcm-nav-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Start Detection
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`mcm-hamburger md:hidden ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mcm-mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mcm-mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="px-6 py-5 border-b border-[#d4a574]/15">
          <div className="flex items-center gap-2.5">
            <div className="text-[#d97642]">
              <StarburstLogo size={24} />
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#2c2416]">
              Sepsis<span className="text-[#d97642]">Guard</span>
            </span>
          </div>
        </div>
        <div className="py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mcm-mobile-link ${pathname === link.href ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="px-6 py-4">
          <Link
            href="/detect"
            className="mcm-nav-cta w-full justify-center py-3"
            onClick={() => setMobileOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Start Detection
          </Link>
        </div>
      </div>
    </>
  );
}
