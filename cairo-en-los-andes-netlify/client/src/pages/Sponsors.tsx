/*
 * ── Design: Cinematic Dark + Gold ──
 * Sponsors page — info for brands wanting to sponsor the event
 * Packs: Bronce $100, Plata $200, Oro $300
 */
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowLeft, Star, Zap, Crown, CheckCircle, Globe, Users, TrendingUp, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const rubrosES = [
  "Belleza", "Estética", "Maquillaje", "Peluquería", "Indumentaria", "Danza",
  "Fitness", "Accesorios", "Salud", "Bienestar", "Terapias", "Gastronomía",
  "Café", "Bebidas", "Turismo", "Hotelería", "Transporte", "Diseño",
  "Emprendimientos", "Marcas locales",
];
const rubrosEN = [
  "Beauty", "Aesthetics", "Makeup", "Hair Salon", "Clothing", "Dance",
  "Fitness", "Accessories", "Health", "Wellness", "Therapies", "Gastronomy",
  "Coffee", "Beverages", "Tourism", "Hospitality", "Transport", "Design",
  "Entrepreneurs", "Local Brands",
];

const opcionesES = [
  "Stand en el evento", "Logo en cartelería / pared de sponsors",
  "Publicidad en tótems y banners", "Mención en gala de apertura y/o cierre",
  "Presencia en programa oficial", "Menciones en historias y reels",
  "Sorteos, activaciones y sampling", "Naming de segmento o alianza oficial",
];
const opcionesEN = [
  "Event booth/stand", "Logo on signage / sponsor wall",
  "Advertising on totems and banners", "Mention at opening and/or closing gala",
  "Presence in official program", "Mentions in stories and reels",
  "Giveaways, activations and sampling", "Segment naming or official partnership",
];

const packsES = [
  {
    name: "Bronce",
    price: "$100",
    icon: Star,
    color: "#cd7f32",
    features: [
      "Logo en cartelería / pared de sponsors",
      "Presencia en programa oficial impreso (Recuerdo del Evento)",
      "1 mención semanal en historias",
      "Inclusión en banner general de sponsors",
    ],
  },
  {
    name: "Plata",
    price: "$200",
    icon: Zap,
    color: "#c0c0c0",
    features: [
      "Stand de venta",
      "Presencia en tótems",
      "Mención en gala de apertura y/o cierre",
      "Participación en bonos de activación compra",
      "Todo lo incluido en el paquete Bronce",
    ],
    highlight: true,
  },
  {
    name: "Oro",
    price: "$300",
    icon: Crown,
    color: "#d4a843",
    features: [
      "Logo destacado en pared de sponsors y piezas visuales oficiales",
      "Presencia prioritaria en banners de artistas",
      "Ubicación preferencial del stand o espacio de activación",
      "Mayor presencia en tótems, señalética y zonas estratégicas",
      "Mención especial por micrófono en gala de apertura",
      "Incluye todo lo de Bronce y Plata",
    ],
  },
];

const packsEN = [
  {
    name: "Bronze",
    price: "$100",
    icon: Star,
    color: "#cd7f32",
    features: [
      "Logo on signage / sponsor wall",
      "Presence in official printed program (Event Souvenir)",
      "1 weekly mention in stories",
      "Inclusion in general sponsors banner",
    ],
  },
  {
    name: "Silver",
    price: "$200",
    icon: Zap,
    color: "#c0c0c0",
    features: [
      "Sales booth/stand",
      "Presence on totems",
      "Mention at opening and/or closing gala",
      "Participation in purchase activation vouchers",
      "Everything included in the Bronze package",
    ],
    highlight: true,
  },
  {
    name: "Gold",
    price: "$300",
    icon: Crown,
    color: "#d4a843",
    features: [
      "Featured logo on sponsor wall and official visual pieces",
      "Priority presence on artist banners",
      "Preferential booth or activation space location",
      "Greater presence on totems, signage, and high-traffic areas",
      "Special microphone mention at opening gala",
      "Includes everything from Bronze and Silver",
    ],
  },
];

export default function Sponsors() {
  const { lang } = useLang();
  const rubros = lang === "es" ? rubrosES : rubrosEN;
  const opciones = lang === "es" ? opcionesES : opcionesEN;
  const packs = lang === "es" ? packsES : packsEN;

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#080c1a] to-[#080c1a]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(212,168,67,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(212,168,67,0.1) 0%, transparent 40%)" }}
        />
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {lang === "es" ? "Oportunidad Premium" : "Premium Opportunity"}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {lang === "es" ? "Sé Sponsor Oficial" : "Become an Official Sponsor"}
          </h1>
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {lang === "es"
              ? "CAIRO ANDES 2026 es un festival internacional de danza en Salta, Argentina, que reúne durante 3 días en el Sheraton Salta Hotel a artistas, bailarinas y una audiencia activa con intención real de compra."
              : "CAIRO ANDES 2026 is an international dance festival in Salta, Argentina, bringing together artists, dancers, and an active audience with real purchasing intent for 3 days at the Sheraton Salta Hotel."}
          </p>
        </div>
      </section>

      {/* Why sponsor */}
      <section className="pb-16 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text mb-6">
                {lang === "es" ? "¿Por qué ser Sponsor Oficial?" : "Why Become an Official Sponsor?"}
              </h2>
              <p className="text-[#faf5eb]/70 text-lg leading-relaxed">
                {lang === "es"
                  ? "Ser Sponsor Oficial en CAIRO ANDES 2026 significa tener visibilidad, contacto directo y oportunidades reales de venta frente a un público que consume activamente durante el evento. Tu marca obtiene visibilidad, contacto directo, conversión y oportunidades de venta."
                  : "Being an Official Sponsor at CAIRO ANDES 2026 means having visibility, direct contact, and real sales opportunities in front of an audience that actively consumes during the event. Your brand gains visibility, direct contact, conversion, and sales opportunities."}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: Globe,
                stat: lang === "es" ? "7 Mercados" : "7 Markets",
                desc: lang === "es"
                  ? "EE.UU., Ucrania, Grecia, Dubái, Brasil, Egipto y Argentina"
                  : "USA, Ukraine, Greece, Dubai, Brazil, Egypt & Argentina",
              },
              {
                icon: Users,
                stat: lang === "es" ? "3 Días" : "3 Days",
                desc: lang === "es"
                  ? "De actividades, galas y oportunidades de venta directa"
                  : "Of activities, galas, and direct sales opportunities",
              },
              {
                icon: TrendingUp,
                stat: lang === "es" ? "Alto Valor" : "High Value",
                desc: lang === "es"
                  ? "Público con inversión de USD 300+ por asistente"
                  : "Audience with USD 300+ investment per attendee",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 150}>
                <div className="text-center p-6 bg-gradient-to-b from-[#111827]/60 to-[#0a1128]/60 border border-[#d4a843]/15 rounded-xl">
                  <item.icon size={32} className="text-[#d4a843] mx-auto mb-3" />
                  <h3 className="font-heading text-xl font-bold text-[#d4a843] mb-2">{item.stat}</h3>
                  <p className="text-[#faf5eb]/60 text-sm">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Rubros ideales */}
      <section className="pb-16 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-8">
              {lang === "es" ? "Rubros Ideales" : "Ideal Industries"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {rubros.map((r) => (
                <span key={r} className="px-4 py-2 bg-[#d4a843]/10 border border-[#d4a843]/20 rounded-full text-sm text-[#d4a843]/90 hover:bg-[#d4a843]/20 transition">
                  {r}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Opciones de sponsoreo */}
      <section className="pb-16 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-8">
              {lang === "es" ? "Opciones de Sponsoreo" : "Sponsorship Options"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {opciones.map((o, i) => (
                <AnimateOnScroll key={i} direction="up" delay={i * 80}>
                  <div className="p-4 bg-gradient-to-b from-[#111827]/60 to-[#0a1128]/60 border border-[#d4a843]/15 rounded-lg text-center hover:border-[#d4a843]/30 transition">
                    <p className="text-[#faf5eb]/80 text-sm">{o}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Packs */}
      <section className="pb-16 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text text-center mb-4">
              {lang === "es" ? "Packs Disponibles" : "Available Packs"}
            </h2>
            <p className="text-[#faf5eb]/60 text-center mb-12 max-w-2xl mx-auto">
              {lang === "es"
                ? "Propuestas flexibles y personalizadas según rubro, formato de participación y objetivos de marca."
                : "Flexible and personalized proposals based on industry, participation format, and brand objectives."}
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packs.map((pack, i) => {
              const Icon = pack.icon;
              return (
                <AnimateOnScroll key={pack.name} direction="up" delay={i * 150}>
                  <div
                    className={`relative p-8 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
                      pack.highlight
                        ? "bg-gradient-to-b from-[#1a1f3a] to-[#0d1225] border-[#c0c0c0]/40 shadow-[0_0_30px_rgba(192,192,192,0.1)]"
                        : "bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80 border-[#d4a843]/15 hover:border-[#d4a843]/30"
                    }`}
                  >
                    {pack.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c0c0c0] text-[#080c1a] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                        {lang === "es" ? "Más Popular" : "Most Popular"}
                      </span>
                    )}
                    <div className="text-center mb-6">
                      <Icon size={36} style={{ color: pack.color }} className="mx-auto mb-3" />
                      <h3 className="font-heading text-2xl font-bold" style={{ color: pack.color }}>
                        {pack.name}
                      </h3>
                      <p className="text-4xl font-bold text-[#faf5eb] mt-2">{pack.price}</p>
                      <p className="text-xs text-[#faf5eb]/50 uppercase tracking-wider mt-1">
                        {lang === "es" ? "Precio final en dólares" : "Final price in USD"}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {pack.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#faf5eb]/70">
                          <CheckCircle size={16} className="text-[#d4a843] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#faf5eb]/40 mt-4 text-center italic">
                      {lang === "es"
                        ? "El pago se realiza en pesos argentinos al precio oficial del día. Plan de pago disponible."
                        : "Payment is made in Argentine pesos at the official exchange rate. Payment plan available."}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audiencia de alto valor */}
      <section className="pb-16 relative z-10">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#111827]/60 to-[#0a1128]/60 border border-[#d4a843]/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-6">
                {lang === "es" ? "Audiencia de Alto Valor para Tu Marca" : "High-Value Audience for Your Brand"}
              </h2>
              <p className="text-[#faf5eb]/70 leading-relaxed">
                {lang === "es"
                  ? "CAIRO ANDES 2026 reúne durante 3 días a un público nacional e internacional que invierte activamente en belleza, imagen, bienestar, indumentaria, accesorios, gastronomía y experiencias premium. Con galas de USD 100 por cubierto y una inversión total por asistente que puede rondar los USD 300 o más, el festival convoca personas con capacidad real de compra, generando una oportunidad concreta para marcas que buscan visibilidad, posicionamiento y ventas frente a un público predispuesto a consumir."
                  : "CAIRO ANDES 2026 brings together for 3 days a national and international audience that actively invests in beauty, image, wellness, clothing, accessories, gastronomy, and premium experiences. With galas at USD 100 per seat and a total investment per attendee that can reach USD 300 or more, the festival attracts people with real purchasing power, creating a concrete opportunity for brands seeking visibility, positioning, and sales in front of an audience ready to consume."}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 relative z-10">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text mb-6">
              {lang === "es" ? "¿Querés ser parte?" : "Want to be part of it?"}
            </h2>
            <p className="text-[#faf5eb]/60 mb-8 max-w-xl mx-auto">
              {lang === "es"
                ? "Contactanos para reservar tu lugar como sponsor oficial de Cairo en los Andes 2026."
                : "Contact us to reserve your spot as an official sponsor of Cairo in the Andes 2026."}
            </p>
            <a
              href="https://wa.me/5493872617777?text=Hola%2C%20quiero%20información%20sobre%20sponsoreo%20en%20Cairo%20Andes%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#080c1a] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-all duration-300 text-lg"
            >
              <MessageCircle size={20} />
              {lang === "es" ? "Quiero ser Sponsor" : "I want to be a Sponsor"}
            </a>
            <div className="mt-6 text-[#faf5eb]/50 text-sm space-y-1">
              <p>WhatsApp: +54 9 387 261 7777</p>
              <p>Email: cairoandesfestival@gmail.com</p>
              <p>Instagram: @cairo_andes_festival</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
