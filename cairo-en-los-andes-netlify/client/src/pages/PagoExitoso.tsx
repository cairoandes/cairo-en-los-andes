/**
 * PagoExitoso — Payment success page.
 * Shows a confirmation after PayPal or MercadoPago payment.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { CheckCircle2, PartyPopper, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function PagoExitoso() {
  const { lang } = useLang();

  // Parse URL params to detect provider and status
  const params = new URLSearchParams(window.location.search);
  const provider = params.get("provider") || "unknown";
  const status = params.get("status");
  const isPending = status === "pending";

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container max-w-2xl mx-auto px-4">
          <AnimateOnScroll direction="up">
            <div className="bg-[#0d1230]/80 rounded-2xl border border-[#d4a843]/20 p-8 md:p-12 text-center">
              {isPending ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-yellow-400" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-yellow-400 mb-4">
                    {lang === "es" ? "Pago Pendiente" : "Payment Pending"}
                  </h2>
                  <p className="text-[#faf5eb]/70 mb-6">
                    {lang === "es"
                      ? "Tu pago está siendo procesado. Te notificaremos cuando se confirme. Mientras tanto, podés contactarnos por WhatsApp si tenés alguna duda."
                      : "Your payment is being processed. We'll notify you when it's confirmed. In the meantime, you can contact us via WhatsApp if you have any questions."}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <PartyPopper size={40} className="text-green-400" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold gold-text mb-4">
                    {lang === "es" ? "¡Pago Exitoso!" : "Payment Successful!"}
                  </h2>
                  <p className="text-[#faf5eb]/70 mb-6">
                    {lang === "es"
                      ? "Tu inscripción al Cairo en los Andes Festival ha sido confirmada. ¡Nos vemos en Salta!"
                      : "Your registration for Cairo en los Andes Festival has been confirmed. See you in Salta!"}
                  </p>
                </>
              )}

              <p className="text-[#faf5eb]/50 text-sm mb-8">
                {lang === "es"
                  ? `Método de pago: ${provider === "paypal" ? "PayPal (USD)" : "MercadoPago (ARS)"}`
                  : `Payment method: ${provider === "paypal" ? "PayPal (USD)" : "MercadoPago (ARS)"}`}
              </p>

              <div className="space-y-3">
                {/* WhatsApp contact */}
                <a
                  href="https://wa.me/5493873267777?text=Hola%20Cairo%20Andes!%20Acabo%20de%20realizar%20mi%20pago%20de%20inscripción."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold rounded-xl transition-colors"
                >
                  <MessageCircle size={18} />
                  {lang === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
                </a>

                {/* Back to home */}
                <Link
                  href="/"
                  className="inline-flex items-center justify-center w-full py-3 px-6 border border-[#d4a843]/40 text-[#d4a843] font-bold rounded-xl hover:bg-[#d4a843]/10 transition-colors"
                >
                  {lang === "es" ? "Volver al inicio" : "Back to home"}
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <Footer />
    </div>
  );
}
