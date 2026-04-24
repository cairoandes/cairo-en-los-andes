/*
 * Design: Cinematic Immersion — "Cielo Estrellado del Andes"
 * Full-viewport sections, dramatic typography, dark navy + gold palette
 * Cinzel headings, Nunito Sans body, scroll-triggered animations
 * Bilingual: ES / EN via LanguageContext
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";
import {
  t,
  maestrosData,
  workshopsData,
  paquetesData,
  featureLabels,
} from "@/lib/translations";
import {
  Calendar,
  MapPin,
  Star,
  Trophy,
  Sparkles,
  GraduationCap,
  Theater,
  UtensilsCrossed,
  Award,
  Plane,
  DollarSign,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
} from "lucide-react";

/* ── Asset URLs ── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/hero-banner-hMLBWi37fYFS63WwTL9b3b.webp";
const LOGO_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/saeuIPMxeGkpCAsb.png";
const WORKSHOPS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/workshops-bg-efgubUhvDvZNW5yhjGdMMa.webp";
const GALA_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/dmxISGptnfQququD.png";
const SALTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/salta-landscape-oMXmyjznAs5p3f5cFiZjm3.webp";
const DANCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/dance-abstract-jMipSf594uBQWr6Fgfjdx2.webp";

/* ── Workshop icons mapping ── */
const workshopIcons = [Sparkles, Star, Theater, GraduationCap, Award, Trophy];

/* ── Feature icons mapping ── */
const featureIcons = [GraduationCap, Trophy, Theater, UtensilsCrossed, Star, Award];

/* ── Helpers ── */
function SectionDivider() {
  return <div className="section-divider w-full" />;
}

function GoldLine() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
      <Sparkles size={14} className="text-[#d4a843]/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { lang } = useLang();
  const allMaestros = maestrosData(lang);
  const maestros = allMaestros.slice(0, 7); // Only show first 7 on home, rest on /maestros page
  const workshops = workshopsData(lang);
  const paquetes = paquetesData(lang);
  const features = featureLabels(lang);

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Cairo en los Andes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080c1a]/60 via-[#080c1a]/30 to-[#080c1a]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center pt-24 pb-16 flex flex-col items-center gap-8">
          <AnimateOnScroll direction="fade" delay={200}>
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium">
              {t(lang, "heroPresents")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={400}>
            <div className="logo-glitter relative inline-block">
              <img
                src={LOGO_IMG}
                alt="Cairo en los Andes Festival"
                className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto"
              />
              {/* Sparkle dots */}
              <span className="sparkle-dot" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
              <span className="sparkle-dot" style={{ top: '15%', right: '8%', animationDelay: '0.8s' }} />
              <span className="sparkle-dot" style={{ top: '45%', left: '2%', animationDelay: '1.6s' }} />
              <span className="sparkle-dot" style={{ top: '30%', right: '3%', animationDelay: '2.2s' }} />
              <span className="sparkle-dot" style={{ bottom: '20%', left: '15%', animationDelay: '0.5s' }} />
              <span className="sparkle-dot" style={{ bottom: '25%', right: '12%', animationDelay: '1.3s' }} />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm md:text-base text-[#faf5eb]/70">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-[#d4a843]" />
                {t(lang, "heroDate")}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-[#d4a843]" />
                {t(lang, "heroLocation")}
              </span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={1000}>
            <Countdown />
          </AnimateOnScroll>

          <AnimateOnScroll direction="fade" delay={1200}>
            <Link
              href="/pasaporte-cairo-andes"
              className="group relative mt-4 inline-flex flex-col items-center px-12 py-5 bg-gradient-to-r from-[#d4a843] via-[#e8c35a] to-[#e8842a] text-[#080c1a] rounded-xl hover:shadow-[0_0_40px_rgba(212,168,67,0.35)] transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative font-heading text-2xl md:text-3xl font-black tracking-wider leading-none">
                {lang === "es" ? "JUGÁ" : "PLAY"}
              </span>
              <span className="relative text-xs md:text-sm font-medium tracking-wide text-[#080c1a]/70 mt-1">
                {lang === "es" ? "Descubrí tu destino" : "Discover your destination"}
              </span>
            </Link>
          </AnimateOnScroll>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={28} className="text-[#d4a843]/40" />
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / EL FESTIVAL ═══ */}
      <section id="festival" className="relative py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <AnimateOnScroll direction="left">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                  {t(lang, "aboutSub")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="gold-text">{t(lang, "aboutTitle1")}</span>{" "}
                  <span className="text-[#faf5eb]">{t(lang, "aboutTitle2")}</span>
                </h2>
                <p className="text-[#faf5eb]/70 leading-relaxed mb-6 text-base md:text-lg">
                  {t(lang, "aboutP1")}
                </p>
                <p className="text-[#faf5eb]/70 leading-relaxed text-base md:text-lg">
                  {t(lang, "aboutP2")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* Image */}
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

          {/* Features grid */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {features.map((item, i) => {
              const Icon = featureIcons[i];
              return (
                <AnimateOnScroll key={item.key} direction="up" delay={i * 100}>
                  <div className="flex flex-col items-center text-center p-4 md:p-6 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group">
                    <Icon
                      size={28}
                      className="text-[#d4a843] mb-3 group-hover:scale-110 transition-transform"
                    />
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

      <SectionDivider />

      {/* ═══ MAESTROS ═══ */}
      <section id="maestros" className="py-24 md:py-32">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                {t(lang, "maestrosSub")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text">
                {t(lang, "maestrosTitle")}
              </h2>
              <GoldLine />
              <p className="text-[#faf5eb]/60 max-w-xl mx-auto">
                {t(lang, "maestrosMore")}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {maestros.map((m, i) => (
              <AnimateOnScroll key={m.name} direction="up" delay={i * 80}>
                <div className="group relative bg-[#0d1230]/50 rounded-lg overflow-hidden gold-border hover:gold-glow transition-all duration-500">
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-[#d4a843] to-[#e8842a]" />
                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4 mb-3">
                      {/* Photo placeholder */}
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#d4a843]/30 shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-[#d4a843]/10 border-2 border-[#d4a843]/20 flex items-center justify-center shrink-0">
                          <Star size={20} className="text-[#d4a843]/40" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-heading text-base md:text-lg font-bold text-[#faf5eb] group-hover:text-[#d4a843] transition-colors">
                              {m.name}
                            </h3>
                            <p className="text-xs text-[#d4a843] uppercase tracking-wider mt-1">
                              {m.role}
                            </p>
                          </div>
                          <span className="text-[10px] text-[#faf5eb]/40 uppercase tracking-wider bg-[#faf5eb]/5 px-2 py-1 rounded">
                            {m.origin}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#faf5eb]/60 leading-relaxed line-clamp-4">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Link to full Maestros page */}
          <AnimateOnScroll direction="fade" delay={300}>
            <div className="text-center mt-10">
              <a href="/maestros" className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/40 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all duration-300 text-sm uppercase tracking-wider font-medium">
                {lang === "es" ? "Ver todos los maestros" : "View all masters"}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ WORKSHOPS ═══ */}
      <section
        id="workshops"
        className="relative py-24 md:py-32"
      >
        <div className="absolute inset-0">
          <img src={WORKSHOPS_BG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#080c1a]/80" />
        </div>

        <div className="relative z-10 container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                {t(lang, "workshopsSub")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text">
                {t(lang, "workshopsTitle")}
              </h2>
              <GoldLine />
              <p className="text-[#faf5eb]/60 max-w-2xl mx-auto">
                {t(lang, "workshopsDesc")}
              </p>
            </div>
          </AnimateOnScroll>

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

      <SectionDivider />

      {/* ═══ BANNER: VIAJE A EGIPTO ═══ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f05] via-[#2a1a08] to-[#1a0f05]" />
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(212,168,67,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(232,132,42,0.15) 0%, transparent 50%)" }}
        />
        {/* Sparkle dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#d4a843] animate-pulse"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 container text-center">
          <AnimateOnScroll direction="up">
            <Plane size={48} className="text-[#d4a843] mx-auto mb-4" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gold-text">{lang === "es" ? "¡Competí" : "Compete"}</span>{" "}
              <span className="text-[#faf5eb]">{lang === "es" ? "por un viaje" : "for a trip"}</span>{" "}
              <span className="gold-text">{lang === "es" ? "a Egipto!" : "to Egypt!"}</span>
            </h2>
            <p className="text-[#faf5eb]/60 max-w-xl mx-auto text-lg mb-8">
              {lang === "es"
                ? "El premio mayor incluye pasaje aéreo a Egipto y participación en un festival internacional."
                : "The grand prize includes a round-trip flight to Egypt and participation in an international festival."}
            </p>
            <a
              href="/premios"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#080c1a] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-all duration-300 text-lg"
            >
              <Trophy size={20} />
              {lang === "es" ? "Ver todos los premios" : "View all prizes"}
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ GALAS & ESCENARIO ═══ */}
      <section id="galas" className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimateOnScroll direction="left">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#d4a843]/15 to-transparent rounded-lg blur-xl" />
                <img
                  src={GALA_IMG}
                  alt="Gala de apertura"
                  className="relative rounded-lg w-full object-cover aspect-[16/10] gold-border"
                />
              </div>
            </AnimateOnScroll>

            {/* Text */}
            <AnimateOnScroll direction="right">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                  {t(lang, "galasSub")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="gold-text">{t(lang, "galasTitle1")}</span>{" "}
                  <span className="text-[#faf5eb]">{t(lang, "galasTitle2")}</span>
                </h2>
                <p className="text-[#faf5eb]/70 leading-relaxed mb-6">
                  {t(lang, "galasP1")}
                </p>
                <p className="text-[#faf5eb]/70 leading-relaxed mb-8">
                  {t(lang, "galasP2")}
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Theater, label: t(lang, "galasTag1") },
                    { icon: UtensilsCrossed, label: t(lang, "galasTag2") },
                    { icon: Trophy, label: t(lang, "galasTag3") },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 bg-[#0d1230]/60 px-4 py-2 rounded gold-border"
                    >
                      <item.icon size={16} className="text-[#d4a843]" />
                      <span className="text-sm text-[#faf5eb]/80">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ COMPETENCIA & PREMIOS ═══ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c1a] via-[#0d1230]/40 to-[#080c1a]" />
        <div className="relative z-10 container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                {t(lang, "compSub")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text">
                {t(lang, "compTitle")}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Prize 1 */}
            <AnimateOnScroll direction="left">
              <div className="bg-[#0d1230]/60 rounded-lg p-8 gold-border gold-glow text-center">
                <Plane size={40} className="text-[#d4a843] mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#d4a843] mb-2">
                  {t(lang, "compPrize1Title")}
                </h3>
                <p className="text-[#faf5eb]/70 mb-4">
                  {t(lang, "compPrize1Desc")}
                </p>
                <div className="inline-flex items-center gap-2 bg-[#d4a843]/10 px-4 py-2 rounded gold-border">
                  <Plane size={16} className="text-[#d4a843]" />
                  <span className="text-sm font-semibold text-[#d4a843]">
                    {t(lang, "compPrize1Tag")}
                  </span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Prize 2 */}
            <AnimateOnScroll direction="right">
              <div className="bg-[#0d1230]/60 rounded-lg p-8 gold-border gold-glow text-center">
                <Trophy size={40} className="text-[#d4a843] mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#d4a843] mb-2">
                  {t(lang, "compPrize2Title")}
                </h3>
                <p className="text-[#faf5eb]/70 mb-4">
                  {t(lang, "compPrize2Desc")}
                </p>
                <div className="inline-flex items-center gap-2 bg-[#d4a843]/10 px-4 py-2 rounded gold-border">
                  <DollarSign size={16} className="text-[#d4a843]" />
                  <span className="text-sm font-semibold text-[#d4a843]">
                    {t(lang, "compPrize2Tag")}
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ PAQUETES ═══ */}
      <section id="paquetes" className="py-24 md:py-32">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                {t(lang, "paquetesSub")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text">
                {t(lang, "paquetesTitle")}
              </h2>
              <GoldLine />
              <p className="text-[#faf5eb]/60 max-w-2xl mx-auto">
                {t(lang, "paquetesDesc")}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {paquetes.map((p, i) => (
              <AnimateOnScroll key={p.sub} direction="up" delay={i * 150}>
                <div
                  className={`relative flex flex-col rounded-lg overflow-hidden transition-all duration-500 h-full ${
                    p.highlight
                      ? "gold-border gold-glow bg-[#0d1230]/80 scale-[1.02]"
                      : "border border-[#faf5eb]/10 bg-[#0d1230]/50 hover:gold-border hover:gold-glow"
                  }`}
                >
                  {p.highlight && (
                    <div className="bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                      {t(lang, "paquetesPopular")}
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="font-heading text-lg font-bold text-[#faf5eb]">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[#d4a843] uppercase tracking-wider mb-4">
                      {p.sub}
                    </p>
                    <div className="mb-6">
                      <span className="font-heading text-4xl font-bold gold-text">
                        {p.price}
                      </span>
                      <span className="text-sm text-[#faf5eb]/50 ml-2">
                        USD
                      </span>
                    </div>
                    <ul className="flex-1 space-y-3 mb-6">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-[#faf5eb]/70"
                        >
                          <Sparkles
                            size={14}
                            className="text-[#d4a843] mt-0.5 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#faf5eb]/40 mb-4">
                      {t(lang, "paquetesFinancing")} {p.financing}
                    </p>
                    <a
                      href="https://wa.me/5493872617777"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full text-center py-3 rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        p.highlight
                          ? "bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] hover:shadow-lg hover:shadow-[#d4a843]/20"
                          : "border border-[#d4a843]/40 text-[#d4a843] hover:bg-[#d4a843]/10"
                      }`}
                    >
                      {t(lang, "paquetesCta")}
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Info */}
          <AnimateOnScroll direction="fade" delay={300}>
            <div className="mt-12 max-w-2xl mx-auto text-center">
              <p className="text-sm text-[#faf5eb]/50">
                {t(lang, "paquetesDisclaimer")}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ DANCE IMAGE SECTION ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
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
                  <p className="italic text-[#d4a843]/80">
                    {t(lang, "cartaP3")}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="font-heading text-lg font-bold text-[#d4a843]">
                    Khalil Khalil
                  </p>
                  <p className="text-sm text-[#faf5eb]/50">
                    {t(lang, "cartaSign")}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ PASAPORTE CTA ═══ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_60%)]" />
        <div className="container relative z-10">
          <AnimateOnScroll direction="up">
            <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-[#0d1230]/60 border border-[#d4a843]/20 hover:border-[#d4a843]/40 transition-all duration-500">
              <Sparkles size={28} className="text-[#d4a843] mx-auto mb-4" />
              <h3 className="font-heading text-xl md:text-2xl font-bold text-[#faf5eb] mb-3">
                {lang === "es" ? "Descubrí tu destino en Cairo Andes" : "Discover your destination at Cairo Andes"}
              </h3>
              <p className="text-[#faf5eb]/50 text-sm mb-6 max-w-md mx-auto">
                {lang === "es"
                  ? "Una experiencia interactiva que revela tu camino dentro del festival."
                  : "An interactive experience that reveals your path within the festival."}
              </p>
              <a
                href="/pasaporte-cairo-andes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300 hover:scale-105"
              >
                {lang === "es" ? "Jugá el Pasaporte Cairo Andes" : "Play the Cairo Andes Passport"}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <SectionDivider />

      {/* ═══ CONTACTO ═══ */}
      <section id="contacto" className="py-24 md:py-32">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-3">
                {t(lang, "contactoSub")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text">
                {t(lang, "contactoTitle")}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6">
            <AnimateOnScroll direction="up" delay={0}>
              <a
                href="https://wa.me/5493872617777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-8 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group"
              >
                <Phone
                  size={32}
                  className="text-[#d4a843] mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-heading text-sm font-bold text-[#faf5eb] mb-2 uppercase tracking-wider">
                  WhatsApp
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  +54 9 387 261 7777
                </p>
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll direction="up" delay={100}>
              <a
                href="mailto:cairoandesfestival@gmail.com"
                className="flex flex-col items-center text-center p-8 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group"
              >
                <Mail
                  size={32}
                  className="text-[#d4a843] mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-heading text-sm font-bold text-[#faf5eb] mb-2 uppercase tracking-wider">
                  Email
                </h3>
                <p className="text-sm text-[#faf5eb]/60 break-all">
                  cairoandesfestival@gmail.com
                </p>
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll direction="up" delay={200}>
              <a
                href="https://instagram.com/cairo_andes_festival"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-8 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group"
              >
                <Instagram
                  size={32}
                  className="text-[#d4a843] mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-heading text-sm font-bold text-[#faf5eb] mb-2 uppercase tracking-wider">
                  Instagram
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  @cairo_andes_festival
                </p>
              </a>
            </AnimateOnScroll>
          </div>

          {/* CTA final */}
          <AnimateOnScroll direction="fade" delay={300}>
            <div className="text-center mt-16">
              <a
                href="https://wa.me/5493872617777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-4 text-base font-bold tracking-wider uppercase bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] rounded-sm hover:shadow-xl hover:shadow-[#d4a843]/25 transition-all duration-300 hover:scale-105"
              >
                {t(lang, "contactoCta")}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
