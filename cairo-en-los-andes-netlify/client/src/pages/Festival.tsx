/*
 * ── El Festival — Standalone Page ──
 * Extracted from Home.tsx about section
 * Dark navy + gold palette, bilingual
 */
import { useLang } from "@/contexts/LanguageContext";
import { t, featureLabels } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Trophy,
  Theater,
  UtensilsCrossed,
  Star,
  Award,
  Calendar,
  MapPin,
  Users,
  Music,
  Plane,
} from "lucide-react";

const SALTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/salta-landscape-oMXmyjznAs5p3f5cFiZjm3.webp";
const DANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/dance-abstract-jMipSf594uBQWr6Fgfjdx2.webp";

const featureIcons = [GraduationCap, Trophy, Theater, UtensilsCrossed, Star, Award];

function GoldLine() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
      <Sparkles size={14} className="text-[#d4a843]/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
    </div>
  );
}

export default function Festival() {
  const { lang } = useLang();
  const features = featureLabels(lang);

  const highlights = lang === "es"
    ? [
        { icon: Calendar, label: "16, 17 y 18 de Octubre 2026", desc: "Tres días intensivos de danza, cultura y conexión." },
        { icon: MapPin, label: "Sheraton Hotel, Salta", desc: "Un escenario de lujo en el corazón de los Andes argentinos." },
        { icon: Users, label: "Artistas Internacionales", desc: "Maestros de Egipto, Europa, Medio Oriente y Latinoamérica." },
        { icon: Music, label: "Músicos en Vivo", desc: "Orquesta en vivo con músicos egipcios y argentinos." },
        { icon: Trophy, label: "Competencia Internacional", desc: "Categorías para solistas, dúos, tríos y grupos." },
        { icon: Plane, label: "Premio: Viaje a Egipto", desc: "El gran premio incluye pasaje aéreo y participación en un festival internacional." },
      ]
    : [
        { icon: Calendar, label: "October 16, 17 & 18, 2026", desc: "Three intensive days of dance, culture, and connection." },
        { icon: MapPin, label: "Sheraton Hotel, Salta", desc: "A luxury venue in the heart of the Argentine Andes." },
        { icon: Users, label: "International Artists", desc: "Masters from Egypt, Europe, the Middle East, and Latin America." },
        { icon: Music, label: "Live Musicians", desc: "Live orchestra with Egyptian and Argentine musicians." },
        { icon: Trophy, label: "International Competition", desc: "Categories for soloists, duos, trios, and groups." },
        { icon: Plane, label: "Prize: Trip to Egypt", desc: "The grand prize includes a round-trip flight and participation in an international festival." },
      ];

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero */}
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
            {t(lang, "aboutSub")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {t(lang, "aboutTitle1")} {t(lang, "aboutTitle2")}
          </h1>
          <GoldLine />
        </div>
      </section>

      {/* About section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateOnScroll direction="left">
              <div>
                <p className="text-[#faf5eb]/70 leading-relaxed mb-6 text-base md:text-lg">
                  {t(lang, "aboutP1")}
                </p>
                <p className="text-[#faf5eb]/70 leading-relaxed text-base md:text-lg">
                  {t(lang, "aboutP2")}
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#d4a843]/20 to-transparent rounded-lg blur-xl" />
                <img
                  src={SALTA_IMG}
                  alt="Salta, Argentina"
                  className="relative rounded-lg w-full object-cover aspect-[16/10] gold-border"
                />
                <div className="absolute bottom-4 left-4 bg-[#080c1a]/80 backdrop-blur-sm px-4 py-2 rounded gold-border">
                  <p className="font-heading text-sm text-[#d4a843] font-semibold">
                    {t(lang, "aboutImgLabel")}
                  </p>
                  <p className="text-xs text-[#faf5eb]/60">
                    {t(lang, "aboutImgSub")}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {features.map((item, i) => {
              const Icon = featureIcons[i];
              return (
                <AnimateOnScroll key={item.key} direction="up" delay={i * 100}>
                  <div className="flex flex-col items-center text-center p-4 md:p-6 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group">
                    <Icon size={28} className="text-[#d4a843] mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-xs md:text-sm font-semibold text-[#faf5eb]/80 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Lo que te espera" : "What awaits you"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <AnimateOnScroll key={h.label} direction="up" delay={i * 100}>
                <div className="bg-[#0d1230]/60 rounded-lg p-6 gold-border hover:gold-glow transition-all duration-300 h-full">
                  <h.icon size={28} className="text-[#d4a843] mb-3" />
                  <h3 className="font-heading text-base font-bold text-[#faf5eb] mb-2">{h.label}</h3>
                  <p className="text-sm text-[#faf5eb]/60">{h.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Letter from Khalil */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateOnScroll direction="left">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#d4a843]/10 to-transparent rounded-full blur-2xl" />
                <img
                  src={DANCE_IMG}
                  alt="Danza oriental"
                  className="relative rounded-lg w-full object-cover aspect-[3/4] gold-border"
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                  {t(lang, "cartaSub")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  <span className="gold-text">{t(lang, "cartaTitle1")}</span>{" "}
                  <span className="text-[#faf5eb]">{t(lang, "cartaTitle2")}</span>
                </h2>
                <div className="space-y-4 text-[#faf5eb]/70 leading-relaxed">
                  <p>{t(lang, "cartaP1")}</p>
                  <p>{t(lang, "cartaP2")}</p>
                  <p className="italic text-[#d4a843]/80">{t(lang, "cartaP3")}</p>
                </div>
                <div className="mt-8">
                  <p className="font-heading text-lg font-bold text-[#d4a843]">Khalil Khalil</p>
                  <p className="text-sm text-[#faf5eb]/50">{t(lang, "cartaSign")}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-6">
              {lang === "es" ? "¿Listo para vivir Cairo Andes?" : "Ready to experience Cairo Andes?"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5493873267777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300"
              >
                {lang === "es" ? "Inscribite ahora" : "Sign up now"}
              </a>
              <Link
                href="/paquetes"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#d4a843]/40 text-[#d4a843] font-bold uppercase tracking-wider rounded-lg hover:bg-[#d4a843]/10 transition-all duration-300"
              >
                {lang === "es" ? "Ver paquetes" : "View packages"}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
