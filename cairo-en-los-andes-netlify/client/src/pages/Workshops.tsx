/*
 * ── Workshops — Standalone Page ──
 * Extracted from Home.tsx workshops section
 * Dark navy + gold palette, bilingual
 */
import { useLang } from "@/contexts/LanguageContext";
import { t, workshopsData } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  Star,
  Theater,
  GraduationCap,
  Award,
  Trophy,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

const WORKSHOPS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/workshops-bg-efgubUhvDvZNW5yhjGdMMa.webp";

const workshopIcons = [Sparkles, Star, Theater, GraduationCap, Award, Trophy];

function GoldLine() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
      <Sparkles size={14} className="text-[#d4a843]/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
    </div>
  );
}

export default function Workshops() {
  const { lang } = useLang();
  const workshops = workshopsData(lang);

  const benefits = lang === "es"
    ? [
        "Grupos reducidos para atención personalizada",
        "Material teórico y práctico incluido",
        "Certificado de participación oficial",
        "Acceso a grabaciones del workshop",
        "Networking con artistas internacionales",
        "Feedback directo de los maestros",
      ]
    : [
        "Small groups for personalized attention",
        "Theoretical and practical material included",
        "Official participation certificate",
        "Access to workshop recordings",
        "Networking with international artists",
        "Direct feedback from the masters",
      ];

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={WORKSHOPS_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#080c1a]/80" />
        </div>
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {t(lang, "workshopsSub")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {t(lang, "workshopsTitle")}
          </h1>
          <GoldLine />
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {t(lang, "workshopsDesc")}
          </p>
        </div>
      </section>

      {/* Workshops grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((w, i) => {
              const Icon = workshopIcons[i];
              return (
                <AnimateOnScroll key={w.title} direction="up" delay={i * 100}>
                  <div className="group relative bg-[#0d1230]/60 backdrop-blur-sm rounded-lg p-6 md:p-8 gold-border hover:gold-glow transition-all duration-500 h-full">
                    <Icon
                      size={32}
                      className="text-[#d4a843] mb-4 group-hover:scale-110 transition-transform"
                    />
                    <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-3 group-hover:text-[#d4a843] transition-colors">
                      {w.title}
                    </h3>
                    <p className="text-sm text-[#faf5eb]/60 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-24 bg-[#0d1230]/30">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "¿Qué incluyen los workshops?" : "What do the workshops include?"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 80}>
                <div className="flex items-start gap-3 p-4 bg-[#0d1230]/60 rounded-lg gold-border">
                  <CheckCircle size={20} className="text-[#d4a843] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#faf5eb]/80">{b}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Información práctica" : "Practical information"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimateOnScroll direction="up" delay={0}>
              <div className="text-center p-6 bg-[#0d1230]/60 rounded-lg gold-border">
                <Clock size={32} className="text-[#d4a843] mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
                  {lang === "es" ? "Duración" : "Duration"}
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  {lang === "es" ? "1.5 a 2 horas por workshop" : "1.5 to 2 hours per workshop"}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="up" delay={100}>
              <div className="text-center p-6 bg-[#0d1230]/60 rounded-lg gold-border">
                <Users size={32} className="text-[#d4a843] mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
                  {lang === "es" ? "Nivel" : "Level"}
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  {lang === "es" ? "Todos los niveles bienvenidos" : "All levels welcome"}
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="up" delay={200}>
              <div className="text-center p-6 bg-[#0d1230]/60 rounded-lg gold-border">
                <GraduationCap size={32} className="text-[#d4a843] mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
                  {lang === "es" ? "Certificado" : "Certificate"}
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  {lang === "es" ? "Certificado oficial de participación" : "Official participation certificate"}
                </p>
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
              {lang === "es" ? "¿Querés reservar tu lugar?" : "Want to reserve your spot?"}
            </h2>
            <a
              href="https://wa.me/5493873267777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300"
            >
              {lang === "es" ? "Inscribite por WhatsApp" : "Sign up via WhatsApp"}
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
