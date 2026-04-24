/*
 * ── Design: Cinematic Dark + Gold ──
 * Premios page — Official prize categories for the competition
 */
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowLeft, Crown, Award, Medal, Star, Trophy, Sparkles, Plane } from "lucide-react";
import { Link } from "wouter";

/* ── Data ── */
const maestrasES = [
  {
    title: "Mejor Coreógrafa / Maestra Preparadora",
    badge: "Premio Mayor",
    icon: Plane,
    color: "#d4a843",
    prizes: [
      "Pasaje aéreo a Egipto",
      "Posibilidad de participar en cualquier festival en Egipto julio 2027",
      "Voucher Full Pass – Cairo By Nights Festival (Grecia)",
      "Certificación Oficial Cairo Andes",
    ],
  },
  {
    title: "Maestra Salteña Cairo Andes",
    badge: "Título Oficial",
    icon: Award,
    color: "#c0c0c0",
    prizes: [
      "Título Oficial Maestra Salteña Andes",
      "Participación como maestra invitada en Cairo Andes 2027",
      "Voucher de regalo – Cairo By Nights Festival (Grecia)",
    ],
  },
  {
    title: "Maestra Revelación",
    badge: "Revelación",
    icon: Sparkles,
    color: "#cd7f32",
    prizes: [
      "Participación como maestra invitada en Cairo Andes 2027",
      "Voucher de regalo Cairo By Nights Festival (Grecia)",
      "Regalos oficiales del festival",
      "Certificación Oficial Cairo Andes",
    ],
  },
];

const maestrasEN = [
  {
    title: "Best Choreographer / Master Teacher",
    badge: "Grand Prize",
    icon: Plane,
    color: "#d4a843",
    prizes: [
      "Round-trip flight to Egypt",
      "Opportunity to participate in any festival in Egypt, July 2027",
      "Full Pass Voucher – Cairo By Nights Festival (Greece)",
      "Official Cairo Andes Certification",
    ],
  },
  {
    title: "Salteña Master Cairo Andes",
    badge: "Official Title",
    icon: Award,
    color: "#c0c0c0",
    prizes: [
      "Official Salteña Master Andes Title",
      "Participation as guest master at Cairo Andes 2027",
      "Gift Voucher – Cairo By Nights Festival (Greece)",
    ],
  },
  {
    title: "Breakthrough Master",
    badge: "Breakthrough",
    icon: Sparkles,
    color: "#cd7f32",
    prizes: [
      "Participation as guest master at Cairo Andes 2027",
      "Gift Voucher – Cairo By Nights Festival (Greece)",
      "Official festival gifts",
      "Official Cairo Andes Certification",
    ],
  },
];

const bailarinasES = [
  {
    title: "Reina Cairo Andes",
    subtitle: "Mejor Bailarina del Evento",
    icon: Crown,
    color: "#d4a843",
    prizes: [
      "Premio de $500 USD",
      "Voucher – Cairo By Nights Festival (Grecia)",
      "Certificación Oficial Cairo Andes",
    ],
  },
  {
    title: "Mejor Bailarina Profesional",
    subtitle: "",
    icon: Medal,
    color: "#c0c0c0",
    prizes: [
      "Medalla de Oro",
      "Voucher – Cairo By Nights Festival (Grecia)",
      "Regalos oficiales del festival",
    ],
  },
  {
    title: "Bailarina Revelación",
    subtitle: "",
    icon: Star,
    color: "#cd7f32",
    prizes: [
      "Medalla de Oro",
      "Certificación Oficial Cairo Andes",
    ],
  },
  {
    title: "Bailarina Cairo Andes – Salteña",
    subtitle: "",
    icon: Award,
    color: "#d4a843",
    prizes: [
      "Medalla de Oro",
      "Participación en Gala de Apertura 2027",
      "Certificación Oficial Cairo Andes",
    ],
  },
];

const bailarinasEN = [
  {
    title: "Cairo Andes Queen",
    subtitle: "Best Dancer of the Event",
    icon: Crown,
    color: "#d4a843",
    prizes: [
      "$500 USD Prize",
      "Voucher – Cairo By Nights Festival (Greece)",
      "Official Cairo Andes Certification",
    ],
  },
  {
    title: "Best Professional Dancer",
    subtitle: "",
    icon: Medal,
    color: "#c0c0c0",
    prizes: [
      "Gold Medal",
      "Voucher – Cairo By Nights Festival (Greece)",
      "Official festival gifts",
    ],
  },
  {
    title: "Breakthrough Dancer",
    subtitle: "",
    icon: Star,
    color: "#cd7f32",
    prizes: [
      "Gold Medal",
      "Official Cairo Andes Certification",
    ],
  },
  {
    title: "Cairo Andes Dancer – Salteña",
    subtitle: "",
    icon: Award,
    color: "#d4a843",
    prizes: [
      "Gold Medal",
      "Participation in Opening Gala 2027",
      "Official Cairo Andes Certification",
    ],
  },
];

const categoriasES = [
  { name: "Oriental", places: ["1er premio", "2do premio", "3er premio", "4to premio", "Revelación"] },
  { name: "Shaabi", places: ["1er premio", "2do premio", "3er premio", "Revelación"] },
  { name: "Baladi", places: ["1er premio", "2do premio", "3er premio", "Revelación"] },
  { name: "Pop Oriental", places: ["1er premio", "2do premio", "3er premio", "Revelación"] },
  { name: "Folklore", places: ["1er premio", "2do premio", "3er premio", "Revelación"] },
];

const categoriasEN = [
  { name: "Oriental", places: ["1st place", "2nd place", "3rd place", "4th place", "Breakthrough"] },
  { name: "Shaabi", places: ["1st place", "2nd place", "3rd place", "Breakthrough"] },
  { name: "Baladi", places: ["1st place", "2nd place", "3rd place", "Breakthrough"] },
  { name: "Pop Oriental", places: ["1st place", "2nd place", "3rd place", "Breakthrough"] },
  { name: "Folklore", places: ["1st place", "2nd place", "3rd place", "Breakthrough"] },
];

export default function Premios() {
  const { lang } = useLang();
  const maestras = lang === "es" ? maestrasES : maestrasEN;
  const bailarinas = lang === "es" ? bailarinasES : bailarinasEN;
  const categorias = lang === "es" ? categoriasES : categoriasEN;

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/nCyPSVcGBVeAZciF.png" alt="" className="w-full h-full object-cover object-top opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#080c1a]/90 to-[#080c1a]" />
        </div>
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {lang === "es" ? "Competencia Oficial" : "Official Competition"}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {lang === "es" ? "Cartilla de Premios" : "Prize Guide"}
          </h1>
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {lang === "es"
              ? "Descubrí todos los premios oficiales de Cairo en los Andes 2026. Competí por un viaje a Egipto, vouchers internacionales, medallas y más."
              : "Discover all the official prizes of Cairo in the Andes 2026. Compete for a trip to Egypt, international vouchers, medals and more."}
          </p>
        </div>
      </section>

      {/* ═══ MAESTRAS Y COREÓGRAFAS ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-4">
              {lang === "es" ? "Premios a Maestras y Coreógrafas" : "Prizes for Masters & Choreographers"}
            </h2>
            <div className="flex items-center gap-3 justify-center mb-12">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
              <Sparkles size={14} className="text-[#d4a843]/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {maestras.map((p, i) => {
              const Icon = p.icon;
              return (
                <AnimateOnScroll key={p.title} direction="up" delay={i * 150}>
                  <div className={`relative p-8 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
                    i === 0
                      ? "bg-gradient-to-b from-[#1a1f3a] to-[#0d1225] border-[#d4a843]/40 shadow-[0_0_30px_rgba(212,168,67,0.1)]"
                      : "bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 border-[#d4a843]/15 hover:border-[#d4a843]/30"
                  }`}>
                    {p.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full"
                        style={{ backgroundColor: p.color, color: "#080c1a" }}>
                        {p.badge}
                      </span>
                    )}
                    <div className="text-center mb-6 mt-2">
                      <Icon size={36} style={{ color: p.color }} className="mx-auto mb-3" />
                      <h3 className="font-heading text-xl font-bold" style={{ color: p.color }}>
                        {p.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {p.prizes.map((prize, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#faf5eb]/70">
                          <Star size={14} className="text-[#d4a843] shrink-0 mt-0.5" />
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BAILARINAS PROFESIONALES ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-4">
              {lang === "es" ? "Premios a Bailarinas Profesionales" : "Prizes for Professional Dancers"}
            </h2>
            <div className="flex items-center gap-3 justify-center mb-12">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
              <Trophy size={14} className="text-[#d4a843]/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {bailarinas.map((b, i) => {
              const Icon = b.icon;
              return (
                <AnimateOnScroll key={b.title} direction="up" delay={i * 120}>
                  <div className={`relative p-6 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
                    i === 0
                      ? "bg-gradient-to-b from-[#1a1f3a] to-[#0d1225] border-[#d4a843]/40 shadow-[0_0_20px_rgba(212,168,67,0.1)]"
                      : "bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 border-[#d4a843]/15 hover:border-[#d4a843]/30"
                  }`}>
                    <div className="text-center mb-4">
                      <Icon size={32} style={{ color: b.color }} className="mx-auto mb-2" />
                      <h3 className="font-heading text-lg font-bold" style={{ color: b.color }}>
                        {b.title}
                      </h3>
                      {b.subtitle && (
                        <p className="text-xs text-[#faf5eb]/50 mt-1">{b.subtitle}</p>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {b.prizes.map((prize, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#faf5eb]/70">
                          <Star size={12} className="text-[#d4a843] shrink-0 mt-0.5" />
                          {prize}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOLISTAS Y GRUPALES ═══ */}
      <section className="pb-20 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-4">
              {lang === "es" ? "Premios a Solistas y Grupales" : "Solo & Group Prizes"}
            </h2>
            <p className="text-[#faf5eb]/60 text-center mb-12 max-w-xl mx-auto">
              {lang === "es"
                ? "Categorías de competencia con premios para los mejores en cada estilo."
                : "Competition categories with prizes for the best in each style."}
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categorias.map((cat, i) => (
              <AnimateOnScroll key={cat.name} direction="up" delay={i * 100}>
                <div className="p-6 bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 border border-[#d4a843]/15 rounded-xl hover:border-[#d4a843]/30 transition-all duration-500">
                  <h3 className="font-heading text-xl font-bold text-[#d4a843] text-center mb-4 uppercase tracking-wider">
                    {cat.name}
                  </h3>
                  <ul className="space-y-2">
                    {cat.places.map((place, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-[#faf5eb]/70">
                        <Star size={12} className="text-[#d4a843]" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 relative z-10">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#1a1f3a] to-[#0d1225] border border-[#d4a843]/30 rounded-xl p-8 md:p-12">
              <Plane size={40} className="text-[#d4a843] mx-auto mb-4" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-4">
                {lang === "es" ? "¡Competí por un viaje a Egipto!" : "Compete for a trip to Egypt!"}
              </h2>
              <p className="text-[#faf5eb]/60 mb-6">
                {lang === "es"
                  ? "Inscribite en la competencia oficial de Cairo en los Andes 2026 y ganá premios increíbles."
                  : "Register for the official Cairo in the Andes 2026 competition and win amazing prizes."}
              </p>
              <a
                href="https://wa.me/5493872617777?text=Hola%2C%20quiero%20inscribirme%20en%20la%20competencia%20Cairo%20Andes%202026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#080c1a] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-all duration-300 text-lg"
              >
                <Trophy size={20} />
                {lang === "es" ? "Inscribite ahora" : "Register now"}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
