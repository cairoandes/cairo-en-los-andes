/*
 * ── Contacto — Standalone Page ──
 * Extracted from Home.tsx contacto section
 * Dark navy + gold palette, bilingual
 */
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

function GoldLine() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a843]/60" />
      <Sparkles size={14} className="text-[#d4a843]/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a843]/60" />
    </div>
  );
}

export default function Contacto() {
  const { lang } = useLang();

  const contactChannels = [
    {
      icon: Phone,
      title: "WhatsApp",
      desc: "+54 9 3873 26-7777",
      href: "https://wa.me/5493873267777",
      external: true,
    },
    {
      icon: Mail,
      title: "Email",
      desc: "cairoandesfestival@gmail.com",
      href: "mailto:cairoandesfestival@gmail.com",
      external: false,
    },
    {
      icon: Instagram,
      title: "Instagram",
      desc: "@cairo_andes_festival",
      href: "https://instagram.com/cairo_andes_festival",
      external: true,
    },
  ];

  const faqItems = lang === "es"
    ? [
        { q: "¿Cómo me inscribo?", a: "Envianos un mensaje por WhatsApp al +54 9 3873 26-7777 y te guiamos paso a paso con la inscripción y el pago." },
        { q: "¿Puedo pagar en cuotas?", a: "Sí, ofrecemos planes de financiación en hasta 6 cuotas mensuales sin interés para inscripciones tempranas." },
        { q: "¿Necesito visa para viajar a Argentina?", a: "Depende de tu país de origen. Consultá con tu embajada local. Podemos ayudarte con carta de invitación si la necesitás." },
        { q: "¿Puedo asistir solo a las galas sin el paquete completo?", a: "Contactanos por WhatsApp para consultar opciones de entradas individuales para las galas." },
        { q: "¿Hay descuentos para grupos?", a: "Sí, ofrecemos descuentos especiales para grupos de 5 o más personas. Escribinos para más información." },
        { q: "¿Cuál es la política de cancelación?", a: "Ofrecemos reembolso parcial hasta 60 días antes del evento. Contactanos para más detalles." },
      ]
    : [
        { q: "How do I register?", a: "Send us a WhatsApp message at +54 9 3873 26-7777 and we'll guide you step by step with registration and payment." },
        { q: "Can I pay in installments?", a: "Yes, we offer financing plans in up to 6 monthly interest-free installments for early registrations." },
        { q: "Do I need a visa to travel to Argentina?", a: "It depends on your country of origin. Check with your local embassy. We can help with an invitation letter if needed." },
        { q: "Can I attend only the galas without the full package?", a: "Contact us via WhatsApp to inquire about individual gala tickets." },
        { q: "Are there group discounts?", a: "Yes, we offer special discounts for groups of 5 or more. Write to us for more information." },
        { q: "What is the cancellation policy?", a: "We offer partial refunds up to 60 days before the event. Contact us for more details." },
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
            {t(lang, "contactoSub")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {t(lang, "contactoTitle")}
          </h1>
          <GoldLine />
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6">
            {contactChannels.map((ch, i) => (
              <AnimateOnScroll key={ch.title} direction="up" delay={i * 100}>
                <a
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center text-center p-8 bg-[#0d1230]/60 rounded-lg gold-border hover:gold-glow transition-all duration-300 group"
                >
                  <ch.icon
                    size={32}
                    className="text-[#d4a843] mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="font-heading text-sm font-bold text-[#faf5eb] mb-2 uppercase tracking-wider">
                    {ch.title}
                  </h3>
                  <p className="text-sm text-[#faf5eb]/60 break-all">
                    {ch.desc}
                  </p>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Location info */}
      <section className="py-16 md:py-24 bg-[#0d1230]/30">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Ubicación del evento" : "Event location"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <AnimateOnScroll direction="up" delay={0}>
              <div className="p-6 bg-[#0d1230]/60 rounded-lg gold-border text-center">
                <MapPin size={32} className="text-[#d4a843] mx-auto mb-3" />
                <h3 className="font-heading text-base font-bold text-[#faf5eb] mb-2">
                  {lang === "es" ? "Sede principal" : "Main venue"}
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  Sheraton Salta Hotel
                </p>
                <p className="text-xs text-[#faf5eb]/40 mt-1">
                  Salta, Argentina
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="up" delay={100}>
              <div className="p-6 bg-[#0d1230]/60 rounded-lg gold-border text-center">
                <Clock size={32} className="text-[#d4a843] mx-auto mb-3" />
                <h3 className="font-heading text-base font-bold text-[#faf5eb] mb-2">
                  {lang === "es" ? "Fechas" : "Dates"}
                </h3>
                <p className="text-sm text-[#faf5eb]/60">
                  {lang === "es" ? "16, 17 y 18 de Octubre 2026" : "October 16, 17 & 18, 2026"}
                </p>
                <p className="text-xs text-[#faf5eb]/40 mt-1">
                  {lang === "es" ? "3 días de festival" : "3-day festival"}
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 80}>
                <div className="bg-[#0d1230]/60 rounded-lg gold-border p-6">
                  <h3 className="font-heading text-base font-bold text-[#d4a843] mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-[#faf5eb]/70 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <MessageCircle size={36} className="text-[#d4a843] mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-4">
              {lang === "es" ? "¿Tenés alguna pregunta?" : "Have a question?"}
            </h2>
            <p className="text-[#faf5eb]/60 mb-8 max-w-lg mx-auto">
              {lang === "es"
                ? "Estamos para ayudarte. Escribinos por WhatsApp y te respondemos lo antes posible."
                : "We're here to help. Write to us on WhatsApp and we'll respond as soon as possible."}
            </p>
            <a
              href="https://wa.me/5493873267777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300 hover:scale-105"
            >
              {t(lang, "contactoCta")}
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
