/**
 * ── Design: Cinematic Dark + Gold ──
 * Competencia page — Competition pricing, categories, rules & registration info
 */
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import DualCTA from "@/components/DualCTA";
import { ArrowLeft, Trophy, Users, User, UsersRound, Sparkles, Calendar, Info, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "wouter";

/* ── Pricing Data ── */
const pricingPeriods = [
  { es: "Hasta Mar 25", en: "Until Mar 25" },
  { es: "Hasta Abr 25", en: "Until Apr 25" },
  { es: "Hasta May 25", en: "Until May 25" },
  { es: "Hasta Jun 25", en: "Until Jun 25" },
  { es: "Desde Jul", en: "From Jul" },
];

const categories = [
  { es: "Solista", en: "Solo", icon: User, prices: [22, 27, 30, 35, 40] },
  { es: "Dúo", en: "Duo", icon: Users, prices: [18, 22, 25, 27, 30] },
  { es: "Trío", en: "Trio", icon: UsersRound, prices: [15, 18, 20, 22, 25] },
  { es: "Grupal", en: "Group", icon: Users, prices: [12, 14, 16, 18, 20] },
];

/* ── Competition Info ── */
const infoES = {
  heroSub: "Competencia Oficial",
  heroTitle: "Competencia",
  heroDesc: "Inscribite en la competencia oficial de Cairo en los Andes 2026. Demostrá tu talento en el escenario más prestigioso de danza oriental en Sudamérica.",
  pricingTitle: "Precios de Inscripción",
  pricingNote: "Los siguientes precios quedan congelados con el pago de la inscripción (monto total o primera cuota) del evento. Al inscribirte dentro del período correspondiente, ese precio queda fijado durante todo el año para cualquier compra futura de inscripciones (solistas, dúos, tríos o grupales).",
  priceLabel: "por persona",
  categoriesTitle: "Categorías",
  categoriesDesc: "Competí en la modalidad que mejor represente tu arte",
  soloDesc: "Presentación individual. Demostrá tu técnica, musicalidad y presencia escénica.",
  duoDesc: "Dos bailarinas en escena. Sincronización, química y creatividad coreográfica.",
  trioDesc: "Tres bailarinas. Formaciones, coordinación y expresión grupal.",
  groupDesc: "Cuatro o más bailarinas. Coreografía grupal con impacto visual.",
  rulesTitle: "Información Importante",
  rules: [
    "La inscripción se confirma con el pago total o primera cuota",
    "El precio queda congelado al período en que se realiza el pago",
    "Se puede participar en más de una categoría",
    "La música debe enviarse con anticipación al evento",
    "Duración máxima: 4 minutos (solista/dúo/trío), 5 minutos (grupal)",
    "Se evaluará técnica, musicalidad, presencia escénica y creatividad",
    "Los resultados del jurado son inapelables",
    "Premios especiales para las mejores puntuaciones de cada categoría",
  ],
  includesTitle: "¿Qué incluye la inscripción?",
  includes: [
    "Participación en la competencia oficial",
    "Acceso al escenario profesional con iluminación y sonido",
    "Evaluación por jurado internacional",
    "Certificado oficial de participación",
    "Posibilidad de ganar premios y reconocimientos",
    "Grabación profesional de tu presentación",
  ],
  ctaTitle: "¿Lista para competir?",
  ctaDesc: "Inscribite ahora y asegurá el mejor precio. Contactanos por WhatsApp para reservar tu lugar.",
  ctaButton: "Inscribirme por WhatsApp",
  backLink: "Volver al inicio",
  currentPeriod: "Período actual",
};

const infoEN = {
  heroSub: "Official Competition",
  heroTitle: "Competition",
  heroDesc: "Register for the official Cairo en los Andes 2026 competition. Show your talent on the most prestigious oriental dance stage in South America.",
  pricingTitle: "Registration Pricing",
  pricingNote: "The following prices are locked in with the payment of the registration (full amount or first installment) of the event. By registering within the corresponding period, that price is fixed for the entire year for any future registration purchases (solos, duos, trios, or groups).",
  priceLabel: "per person",
  categoriesTitle: "Categories",
  categoriesDesc: "Compete in the modality that best represents your art",
  soloDesc: "Individual performance. Demonstrate your technique, musicality, and stage presence.",
  duoDesc: "Two dancers on stage. Synchronization, chemistry, and choreographic creativity.",
  trioDesc: "Three dancers. Formations, coordination, and group expression.",
  groupDesc: "Four or more dancers. Group choreography with visual impact.",
  rulesTitle: "Important Information",
  rules: [
    "Registration is confirmed with full payment or first installment",
    "The price is locked to the period in which payment is made",
    "You can participate in more than one category",
    "Music must be submitted in advance of the event",
    "Maximum duration: 4 minutes (solo/duo/trio), 5 minutes (group)",
    "Technique, musicality, stage presence, and creativity will be evaluated",
    "Jury results are final and binding",
    "Special prizes for the highest scores in each category",
  ],
  includesTitle: "What's included?",
  includes: [
    "Participation in the official competition",
    "Access to the professional stage with lighting and sound",
    "Evaluation by international jury",
    "Official participation certificate",
    "Chance to win prizes and recognition",
    "Professional recording of your performance",
  ],
  ctaTitle: "Ready to compete?",
  ctaDesc: "Register now and secure the best price. Contact us via WhatsApp to reserve your spot.",
  ctaButton: "Register via WhatsApp",
  backLink: "Back to home",
  currentPeriod: "Current period",
};

/* ── Helpers ── */
/**
 * Determines current pricing period based on the current month and day.
 * "25" in the labels refers to the 25th day of each month (not the year).
 * Pricing schedule (cutoff = day 25 of each month):
 * - Period 0: Until March 25 → cheapest price
 * - Period 1: Until April 25
 * - Period 2: Until May 25
 * - Period 3: Until June 25
 * - Period 4: From August onward → final/highest price
 */
function getCurrentPeriodIndex(): number {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed (0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May, 5=Jun, 6=Jul, 7=Aug...)
  const day = now.getDate();

  // On or before March 25
  if (month < 2 || (month === 2 && day <= 25)) return 0;
  // On or before April 25
  if (month === 3 && day <= 25) return 1;
  // March 26-31 also falls into period 1
  if (month === 2 && day > 25) return 1;
  // On or before May 25
  if (month === 4 && day <= 25) return 2;
  // April 26-30 also falls into period 2
  if (month === 3 && day > 25) return 2;
  // On or before June 25
  if (month === 5 && day <= 25) return 3;
  // May 26-31 also falls into period 3
  if (month === 4 && day > 25) return 3;
  // After June 25 (Jul, Aug, Sep, Oct, Nov, Dec) → final price
  return 4;
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
export default function Competencia() {
  const { lang } = useLang();
  const info = lang === "es" ? infoES : infoEN;
  const currentPeriod = getCurrentPeriodIndex();
  const categoryDescs = lang === "es"
    ? [infoES.soloDesc, infoES.duoDesc, infoES.trioDesc, infoES.groupDesc]
    : [infoEN.soloDesc, infoEN.duoDesc, infoEN.trioDesc, infoEN.groupDesc];

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#080c1a]/90 to-[#080c1a]" />
          {/* Decorative stars */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(1px 1px at 20% 30%, #d4a843 1px, transparent 0), radial-gradient(1px 1px at 60% 20%, #d4a843 1px, transparent 0), radial-gradient(1px 1px at 80% 60%, #d4a843 1px, transparent 0), radial-gradient(1px 1px at 40% 80%, #d4a843 1px, transparent 0)",
            backgroundSize: "200px 200px"
          }} />
        </div>
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {info.backLink}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {info.heroSub}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {info.heroTitle}
          </h1>
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {info.heroDesc}
          </p>
        </div>
      </section>

      {/* ═══ PRICING TABLE ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-2">
              {info.pricingTitle}
            </h2>
            <GoldLine />
            <p className="text-[#faf5eb]/60 max-w-3xl mx-auto text-center text-sm md:text-base mb-12 leading-relaxed">
              {info.pricingNote}
            </p>
          </AnimateOnScroll>

          {/* Desktop Table */}
          <AnimateOnScroll direction="up" delay={200}>
            <div className="hidden md:block max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-xl border border-[#d4a843]/30 shadow-[0_0_40px_rgba(212,168,67,0.05)]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#1a1f3a] to-[#0d1225]">
                      <th className="py-4 px-6 text-left font-heading text-[#d4a843] text-sm uppercase tracking-wider">
                        {lang === "es" ? "Categoría" : "Category"}
                      </th>
                      {pricingPeriods.map((period, i) => (
                        <th key={i} className={`py-4 px-4 text-center font-heading text-sm uppercase tracking-wider ${
                          i === currentPeriod ? "text-[#e8c35a] bg-[#d4a843]/10" : "text-[#d4a843]/70"
                        }`}>
                          {lang === "es" ? period.es : period.en}
                          {i === currentPeriod && (
                            <span className="block text-[10px] text-[#e8c35a] mt-1 normal-case tracking-normal">
                              ★ {info.currentPeriod}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, rowIdx) => (
                      <tr key={rowIdx} className="border-t border-[#d4a843]/10 hover:bg-[#d4a843]/5 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <cat.icon size={20} className="text-[#d4a843]" />
                            <span className="font-heading font-semibold text-[#faf5eb]">
                              {lang === "es" ? cat.es : cat.en}
                            </span>
                          </div>
                        </td>
                        {cat.prices.map((price, colIdx) => (
                          <td key={colIdx} className={`py-5 px-4 text-center ${
                            colIdx === currentPeriod
                              ? "bg-[#d4a843]/10 font-bold text-[#e8c35a] text-xl"
                              : "text-[#faf5eb]/70 text-lg"
                          }`}>
                            <span className="font-heading">${price}</span>
                            <span className="block text-[10px] text-[#faf5eb]/40 mt-0.5">USD</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-xs text-[#faf5eb]/40 mt-4">
                {info.priceLabel} · USD
              </p>
            </div>
          </AnimateOnScroll>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {categories.map((cat, catIdx) => (
              <AnimateOnScroll key={catIdx} direction="up" delay={catIdx * 100}>
                <div className="rounded-xl border border-[#d4a843]/20 bg-gradient-to-b from-[#1a1f3a]/80 to-[#0d1225]/80 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#d4a843]/10 border-b border-[#d4a843]/20">
                    <cat.icon size={22} className="text-[#d4a843]" />
                    <h3 className="font-heading font-bold text-lg text-[#faf5eb]">
                      {lang === "es" ? cat.es : cat.en}
                    </h3>
                  </div>
                  <div className="grid grid-cols-5 gap-0">
                    {pricingPeriods.map((period, i) => (
                      <div key={i} className={`text-center py-3 px-1 ${
                        i === currentPeriod ? "bg-[#d4a843]/15" : ""
                      } ${i > 0 ? "border-l border-[#d4a843]/10" : ""}`}>
                        <span className="block text-[9px] text-[#faf5eb]/50 leading-tight mb-1">
                          {(lang === "es" ? period.es : period.en).replace("Hasta ", "").replace("Until ", "").replace("Desde ", "").replace("From ", "")}
                        </span>
                        <span className={`font-heading font-bold ${
                          i === currentPeriod ? "text-[#e8c35a] text-base" : "text-[#faf5eb]/70 text-sm"
                        }`}>
                          ${cat.prices[i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES INFO ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-2">
              {info.categoriesTitle}
            </h2>
            <GoldLine />
            <p className="text-[#faf5eb]/60 max-w-xl mx-auto text-center mb-12">
              {info.categoriesDesc}
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 100}>
                <div className="p-6 rounded-xl border border-[#d4a843]/15 bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 hover:border-[#d4a843]/30 transition-all duration-300 text-center group">
                  <div className="w-14 h-14 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon size={24} className="text-[#d4a843]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
                    {lang === "es" ? cat.es : cat.en}
                  </h3>
                  <p className="text-sm text-[#faf5eb]/60 leading-relaxed">
                    {categoryDescs[i]}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#d4a843]/10">
                    <span className="font-heading text-2xl font-bold text-[#d4a843]">${cat.prices[currentPeriod]}</span>
                    <span className="text-xs text-[#faf5eb]/40 ml-1">USD</span>
                    <span className="block text-[10px] text-[#faf5eb]/40 mt-1">
                      {lang === "es" ? pricingPeriods[currentPeriod].es : pricingPeriods[currentPeriod].en}
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-2">
              {info.includesTitle}
            </h2>
            <GoldLine />
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            {info.includes.map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 80}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#0d1230]/60 border border-[#d4a843]/10">
                  <CheckCircle size={18} className="text-[#d4a843] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#faf5eb]/70">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RULES / IMPORTANT INFO ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-2">
              {info.rulesTitle}
            </h2>
            <GoldLine />
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto mt-8 space-y-3">
            {info.rules.map((rule, i) => (
              <AnimateOnScroll key={i} direction="left" delay={i * 60}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#0d1230]/40 border border-[#d4a843]/10 hover:border-[#d4a843]/20 transition-colors">
                  <Info size={16} className="text-[#d4a843] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#faf5eb]/70">{rule}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-24 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-[#d4a843]/30 bg-gradient-to-b from-[#1a1f3a]/80 to-[#0d1225]/80 shadow-[0_0_60px_rgba(212,168,67,0.08)]">
              <Trophy size={48} className="text-[#d4a843] mx-auto mb-6" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-4">
                {info.ctaTitle}
              </h2>
              <p className="text-[#faf5eb]/60 mb-8">
                {info.ctaDesc}
              </p>
              <DualCTA size="lg" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
