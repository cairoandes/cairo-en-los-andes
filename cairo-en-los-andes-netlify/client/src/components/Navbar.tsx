/*
 * Design: Cinematic Immersion — "Cielo Estrellado del Andes"
 * Navbar: sticky, transparent → solid on scroll, gold accents, Cinzel font for brand
 * Bilingual: ES | EN toggle
 * Desktop: two-row layout — brand + CTA top, nav links bottom
 * Mobile: hamburger menu with featured Pasaporte CTA
 */
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, UserCircle } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { navLinks, t } from "@/lib/translations";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = navLinks(lang);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = (href: string) => {
    setMobileOpen(false);
    if (location !== "/") {
      // Navigate to home, then let ScrollToTop handle the hash scroll
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageClick = () => {
    setMobileOpen(false);
    // ScrollToTop component handles scrolling to top on route change
  };

  // Separate the special links from regular nav links
  const regularLinks = links.filter(
    (link) =>
      link.href !== "/pasaporte-cairo-andes" && link.href !== "/mi-cuenta"
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080c1a]/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <style>{`
        @keyframes navShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes navGlowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(212,168,67,0.15), inset 0 0 12px rgba(212,168,67,0.05); }
          50% { box-shadow: 0 0 24px rgba(212,168,67,0.3), inset 0 0 20px rgba(212,168,67,0.1); }
        }
        .nav-shimmer-text {
          background: linear-gradient(90deg, #d4a843 0%, #f5e6b8 40%, #d4a843 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: navShimmer 4s linear infinite;
        }
        .nav-featured-glow {
          animation: navGlowPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* ═══ DESKTOP: Two-row layout ═══ */}
      <div className="hidden lg:block">
        {/* Row 1: Brand + special links + CTA */}
        <div className="container flex items-center justify-between h-12">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-base xl:text-lg font-bold gold-text tracking-wider whitespace-nowrap">
              CAIRO EN LOS ANDES
            </span>
          </Link>

          {/* Right side: Pasaporte + Mi Cuenta + CTA */}
          <div className="flex items-center gap-4">
            {/* Pasaporte JUGÁ */}
            <Link
              href="/pasaporte-cairo-andes"
              onClick={handlePageClick}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4a843]/40 bg-[#d4a843]/5 hover:bg-[#d4a843]/15 hover:border-[#d4a843]/60 transition-all duration-500"
            >
              <Sparkles
                size={13}
                className="text-[#d4a843] group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="text-xs font-bold tracking-wide uppercase nav-shimmer-text">
                {lang === "es" ? "JUGÁ" : "PLAY"}
              </span>
            </Link>

            {/* Mi Cuenta */}
            <Link
              href="/mi-cuenta"
              onClick={handlePageClick}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#faf5eb]/70 hover:text-[#d4a843] transition-colors duration-300 tracking-wide uppercase whitespace-nowrap"
            >
              <UserCircle
                size={16}
                className="group-hover:text-[#d4a843] transition-colors"
              />
              {lang === "es" ? "Mi Cuenta" : "My Account"}
            </Link>

            {/* CTA */}
            <a
              href="https://wa.me/5493872617777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-1.5 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] rounded hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300"
            >
              {t(lang, "navCta")}
            </a>
          </div>
        </div>

        {/* Row 2: Navigation links centered */}
        <div className="border-t border-[#d4a843]/10">
          <div className="container flex items-center justify-center gap-4 xl:gap-6 h-10">
            {regularLinks.map((link) =>
              link.type === "page" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handlePageClick}
                  className="text-[11px] xl:text-xs font-medium text-[#faf5eb]/60 hover:text-[#d4a843] transition-colors duration-300 tracking-wider uppercase whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleScrollClick(link.href)}
                  className="text-[11px] xl:text-xs font-medium text-[#faf5eb]/60 hover:text-[#d4a843] transition-colors duration-300 tracking-wider uppercase whitespace-nowrap"
                >
                  {link.label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ═══ MOBILE: Single-row header + hamburger ═══ */}
      <div className="lg:hidden">
        <div className="container flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold gold-text tracking-wider whitespace-nowrap">
              CAIRO EN LOS ANDES
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#d4a843]"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#080c1a]/98 backdrop-blur-lg border-t border-[#d4a843]/20">
          <div className="container py-6 flex flex-col gap-4">
            {/* ═══ FEATURED: Pasaporte Cairo Andes CTA ═══ */}
            <Link
              href="/pasaporte-cairo-andes"
              onClick={handlePageClick}
              className="group relative flex items-center gap-4 p-4 rounded-xl border border-[#d4a843]/30 bg-gradient-to-r from-[#d4a843]/8 via-[#0d1230]/60 to-[#e8842a]/8 nav-featured-glow overflow-hidden transition-all duration-500 hover:border-[#d4a843]/50"
            >
              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a843]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Icon */}
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#d4a843]/20 to-[#e8842a]/20 border border-[#d4a843]/30 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-[#d4a843]" />
              </div>

              {/* Text */}
              <div className="relative flex flex-col">
                <span className="font-heading text-lg font-black tracking-wider nav-shimmer-text leading-none">
                  {lang === "es" ? "JUGÁ" : "PLAY"}
                </span>
                <span className="text-xs text-[#faf5eb]/50 tracking-wide mt-0.5">
                  {lang === "es"
                    ? "Pasaporte Cairo Andes"
                    : "Cairo Andes Passport"}
                </span>
              </div>

              {/* Arrow */}
              <div className="relative ml-auto">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-[#d4a843]/50 group-hover:text-[#d4a843] group-hover:translate-x-1 transition-all duration-300"
                >
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>

            {/* Subtle separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4a843]/15 to-transparent" />

            {/* Mi Cuenta featured link */}
            <Link
              href="/mi-cuenta"
              onClick={handlePageClick}
              className="group flex items-center gap-3 p-3 rounded-xl border border-[#faf5eb]/10 bg-[#0d1230]/60 hover:border-[#d4a843]/30 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center shrink-0">
                <UserCircle size={18} className="text-[#d4a843]" />
              </div>
              <span className="text-base font-medium text-[#faf5eb]/80 group-hover:text-[#d4a843] tracking-wide uppercase">
                {lang === "es" ? "Mi Cuenta" : "My Account"}
              </span>
            </Link>

            {/* Subtle separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#faf5eb]/10 to-transparent" />

            {/* Regular nav links (excluding Pasaporte and Mi Cuenta since they're featured above) */}
            {regularLinks.map((link) =>
              link.type === "page" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handlePageClick}
                  className="text-left text-base font-medium text-[#faf5eb]/80 hover:text-[#d4a843] transition-colors py-2 tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleScrollClick(link.href)}
                  className="text-left text-base font-medium text-[#faf5eb]/80 hover:text-[#d4a843] transition-colors py-2 tracking-wide uppercase"
                >
                  {link.label}
                </button>
              )
            )}
            <a
              href="https://wa.me/5493872617777"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] rounded"
            >
              {t(lang, "navCta")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
