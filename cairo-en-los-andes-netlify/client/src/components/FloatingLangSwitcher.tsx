/*
 * FloatingLangSwitcher — Premium floating language pill
 * Design: Compact pill capsule, bottom-left, always visible during scroll
 * Style: Dark glass with gold accent, subtle shadow, micro-animation on toggle
 * Consistent with Cairo Andes branding (dark navy + gold)
 */
import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function FloatingLangSwitcher() {
  const { lang, toggleLang } = useLang();
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    toggleLang();
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <style>{`
        @keyframes langPillPulse {
          0% { box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 0 rgba(212,168,67,0.15); }
          50% { box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 4px rgba(212,168,67,0.08); }
          100% { box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 0 rgba(212,168,67,0.15); }
        }
        @keyframes langSwitch {
          0% { transform: scale(1); }
          30% { transform: scale(0.95); }
          60% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>

      <button
        onClick={handleToggle}
        aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        className="group flex items-center rounded-full border border-[#d4a843]/25 bg-[#080c1a]/90 backdrop-blur-md hover:border-[#d4a843]/50 transition-all duration-500 cursor-pointer select-none"
        style={{
          padding: "6px 4px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.3), 0 0 0 0 rgba(212,168,67,0.15)",
          animation: animating ? "langSwitch 0.4s ease-out" : "langPillPulse 4s ease-in-out infinite",
        }}
      >
        {/* ES side */}
        <span
          className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-400 ${
            lang === "es"
              ? "bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a]"
              : "text-[#faf5eb]/40 hover:text-[#faf5eb]/60"
          }`}
        >
          ES
        </span>

        {/* Subtle divider */}
        <span className="w-px h-4 bg-[#d4a843]/15 mx-0.5" />

        {/* EN side */}
        <span
          className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-400 ${
            lang === "en"
              ? "bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a]"
              : "text-[#faf5eb]/40 hover:text-[#faf5eb]/60"
          }`}
        >
          EN
        </span>
      </button>
    </div>
  );
}
