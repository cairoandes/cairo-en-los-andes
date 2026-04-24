/*
 * ── Design: Cinematic Dark + Gold ──
 * Maestros internal page — large photo cards with short bios
 * Uses same dark navy/gold palette as the rest of the site
 */
import { useLang } from "@/contexts/LanguageContext";
import { maestrosData } from "@/lib/translations";
import { t } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { User, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Maestros() {
  const { lang } = useLang();
  const maestros = maestrosData(lang);

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#080c1a] to-[#080c1a]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,168,67,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(212,168,67,0.1) 0%, transparent 40%)" }}
        />
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {t(lang, "maestrosSub")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {t(lang, "maestrosTitle")}
          </h1>
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {lang === "es"
              ? "Conocé a los artistas y maestros internacionales que forman parte de Cairo en los Andes 2026."
              : "Meet the international artists and masters who are part of Cairo in the Andes 2026."}
          </p>
        </div>
      </section>

      {/* Maestros grid */}
      <section className="pb-24 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maestros.map((m, i) => (
              <AnimateOnScroll key={m.name} direction="up" delay={i * 100}>
                <div className="group relative bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 border border-[#d4a843]/15 rounded-xl overflow-hidden hover:border-[#d4a843]/40 transition-all duration-500">
                  {/* Photo area */}
                  <div className="relative h-72 bg-gradient-to-br from-[#1a1f3a] to-[#0d1225] flex items-center justify-center overflow-hidden">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-[#d4a843]/10 border-2 border-[#d4a843]/20 flex items-center justify-center group-hover:border-[#d4a843]/40 transition-all duration-500">
                        <User size={48} className="text-[#d4a843]/40" />
                      </div>
                    )}
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c1a] via-transparent to-transparent" />
                    {/* Role badge */}
                    <span className="absolute top-4 right-4 text-xs uppercase tracking-wider bg-[#d4a843]/15 text-[#d4a843] px-3 py-1 rounded-full border border-[#d4a843]/20">
                      {m.role}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-[#d4a843] mb-1">
                      {m.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-[#faf5eb]/50 mb-4">
                      <MapPin size={14} /> {m.origin}
                    </p>
                    <p className="text-[#faf5eb]/70 text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Coming soon note */}
          <AnimateOnScroll direction="fade" delay={400}>
            <p className="text-center text-[#d4a843]/60 mt-12 text-sm italic">
              {t(lang, "maestrosMore")}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
