/**
 * DualCTA — Reusable dual button component:
 * 1. "Inscríbete ya" (Formulario de inscripción) → /inscripcion
 * 2. "Chattear con Cairo Andes" → WhatsApp
 * Both buttons are the same size.
 */
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { FileText, MessageCircle } from "lucide-react";

interface DualCTAProps {
  /** Layout direction */
  direction?: "row" | "col";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional className for the wrapper */
  className?: string;
}

export default function DualCTA({ direction = "col", size = "md", className = "" }: DualCTAProps) {
  const { lang } = useLang();

  const sizeClasses = {
    sm: "px-6 py-3 text-xs min-w-[220px]",
    md: "px-8 py-4 text-sm min-w-[260px]",
    lg: "px-10 py-5 text-base min-w-[300px]",
  };

  const dirClass = direction === "row" ? "flex-row" : "flex-col";

  const btnBase = `inline-flex flex-col items-center justify-center ${sizeClasses[size]} font-bold uppercase tracking-wider rounded-lg transition-all duration-300 text-center w-full max-w-[320px]`;

  return (
    <div className={`flex ${dirClass} gap-3 items-center justify-center ${className}`}>
      {/* Button 1: Inscríbete ya → Formulario */}
      <Link
        href="/inscripcion"
        className={`${btnBase} bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] hover:shadow-lg hover:shadow-[#d4a843]/20 hover:scale-105`}
      >
        <span className="flex items-center gap-2">
          <FileText size={size === "sm" ? 14 : 16} />
          {lang === "es" ? "Inscríbete ya" : "Sign up now"}
        </span>
        <span className="text-[0.65rem] font-medium opacity-80 normal-case tracking-normal mt-0.5">
          ({lang === "es" ? "Formulario de inscripción" : "Registration form"})
        </span>
      </Link>

      {/* Button 2: Chattear con Cairo Andes → WhatsApp */}
      <a
        href="https://wa.me/5493873267777"
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} border border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366]/10`}
      >
        <span className="flex items-center gap-2">
          <MessageCircle size={size === "sm" ? 14 : 16} />
          {lang === "es" ? "Chattear con Cairo Andes" : "Chat with Cairo Andes"}
        </span>
        <span className="text-[0.65rem] font-medium opacity-80 normal-case tracking-normal mt-0.5">
          ({lang === "es" ? "Respuesta inmediata" : "Instant reply"})
        </span>
      </a>
    </div>
  );
}
