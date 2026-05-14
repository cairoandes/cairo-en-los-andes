/*
 * ── Paquetes — Standalone Page ──
 * Extracted from Home.tsx paquetes section
 * Dark navy + gold palette, bilingual
 */
import { useLang } from "@/contexts/LanguageContext";
import { t, paquetesData } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  CreditCard,
  Shield,
  Clock,
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

export default function Paquetes() {
  const { lang } = useLang();
  const paquetes = paquetesData(lang);

  const paymentInfo = lang === "es"
    ? [
        { icon: CreditCard, title: "Pago en cuotas", desc: "Financiá tu inscripción en hasta 6 cuotas mensuales sin interés." },
        { icon: Shield, title: "Pago seguro", desc: "Realizá tu pago de forma segura a través de transferencia bancaria o PayPal." },
        { icon: Clock, title: "Reservá con tiempo", desc: "Cuanto antes te inscribas, mejor precio obtenés. Los precios aumentan por período." },
      ]
    : [
        { icon: CreditCard, title: "Installment payments", desc: "Finance your registration in up to 6 monthly interest-free installments." },
        { icon: Shield, title: "Secure payment", desc: "Make your payment securely through bank transfer or PayPal." },
        { icon: Clock, title: "Book early", desc: "The earlier you register, the better price you get. Prices increase by period." },
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
            {t(lang, "paquetesSub")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            {t(lang, "paquetesTitle")}
          </h1>
          <GoldLine />
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {t(lang, "paquetesDesc")}
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-16 md:py-24">
        <div className="container">
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
                      href="https://wa.me/5493873267777"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full text-center py-3 rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 block ${
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

          {/* Disclaimer */}
          <AnimateOnScroll direction="fade" delay={300}>
            <div className="mt-12 max-w-2xl mx-auto text-center">
              <p className="text-sm text-[#faf5eb]/50">
                {t(lang, "paquetesDisclaimer")}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-16 md:py-24 bg-[#0d1230]/30">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Información de pago" : "Payment information"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {paymentInfo.map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 100}>
                <div className="text-center p-6 bg-[#0d1230]/60 rounded-lg gold-border">
                  <item.icon size={32} className="text-[#d4a843] mx-auto mb-3" />
                  <h3 className="font-heading text-base font-bold text-[#faf5eb] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#faf5eb]/60">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Compare packages */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                {lang === "es" ? "Comparar paquetes" : "Compare packages"}
              </h2>
              <GoldLine />
            </div>
          </AnimateOnScroll>

          {/* Comparison table - desktop */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="bg-[#0d1230]/60 rounded-lg gold-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#d4a843]/20">
                    <th className="text-left p-4 text-[#faf5eb]/60 font-normal"></th>
                    {paquetes.map((p) => (
                      <th key={p.sub} className="p-4 text-center">
                        <span className="font-heading text-base font-bold text-[#d4a843]">{p.name}</span>
                        <br />
                        <span className="text-xs text-[#faf5eb]/50">{p.sub}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#faf5eb]/5">
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Precio" : "Price"}</td>
                    {paquetes.map((p) => (
                      <td key={p.sub} className="p-4 text-center font-heading font-bold gold-text">{p.price} USD</td>
                    ))}
                  </tr>
                  <tr className="border-b border-[#faf5eb]/5">
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Hotel incluido" : "Hotel included"}</td>
                    <td className="p-4 text-center text-[#faf5eb]/40">—</td>
                    <td className="p-4 text-center text-[#d4a843]">Hotel Boutique</td>
                    <td className="p-4 text-center text-[#d4a843]">Sheraton 5★</td>
                  </tr>
                  <tr className="border-b border-[#faf5eb]/5">
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Gala + Cena" : "Gala + Dinner"}</td>
                    {paquetes.map((p) => (
                      <td key={p.sub} className="p-4 text-center"><CheckCircle size={18} className="text-[#d4a843] mx-auto" /></td>
                    ))}
                  </tr>
                  <tr className="border-b border-[#faf5eb]/5">
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Workshops" : "Workshops"}</td>
                    {paquetes.map((p) => (
                      <td key={p.sub} className="p-4 text-center"><CheckCircle size={18} className="text-[#d4a843] mx-auto" /></td>
                    ))}
                  </tr>
                  <tr className="border-b border-[#faf5eb]/5">
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Competencia grupal" : "Group competition"}</td>
                    {paquetes.map((p) => (
                      <td key={p.sub} className="p-4 text-center"><CheckCircle size={18} className="text-[#d4a843] mx-auto" /></td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-[#faf5eb]/70">{lang === "es" ? "Financiación" : "Financing"}</td>
                    {paquetes.map((p) => (
                      <td key={p.sub} className="p-4 text-center text-xs text-[#faf5eb]/50">{p.financing}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold gold-text mb-4">
              {lang === "es" ? "¿Listo para vivir Cairo Andes?" : "Ready to experience Cairo Andes?"}
            </h2>
            <p className="text-[#faf5eb]/60 mb-8 max-w-lg mx-auto">
              {lang === "es"
                ? "Contactanos por WhatsApp para inscribirte y elegir tu paquete ideal."
                : "Contact us via WhatsApp to register and choose your ideal package."}
            </p>
            <a
              href="https://wa.me/5493873267777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300 hover:scale-105"
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
