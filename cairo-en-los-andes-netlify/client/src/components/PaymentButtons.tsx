/**
 * PaymentButtons — Reusable payment buttons for Galas and Sponsors.
 * Shows PayPal, MercadoPago, and WhatsApp options.
 * Uses the same backend procedures as the inscription form.
 */
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CreditCard, MessageCircle, Loader2 } from "lucide-react";

interface PaymentButtonsProps {
  /** Product key matching backend PAQUETE_LABELS (e.g. "gala_opening", "sponsor_bronce") */
  productKey: string;
  /** Price in USD for display */
  priceUSD: number;
  /** Optional className for wrapper */
  className?: string;
}

export default function PaymentButtons({ productKey, priceUSD, className = "" }: PaymentButtonsProps) {
  const { lang } = useLang();
  const [loadingPaypal, setLoadingPaypal] = useState(false);
  const [loadingMP, setLoadingMP] = useState(false);

  const handlePayPal = async () => {
    setLoadingPaypal(true);
    try {
      const res = await fetch("/.netlify/functions/api/paypal-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inscriptionId: 0,
          paquete: productKey,
          origin: window.location.origin,
        }),
      });
      const data = await res.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error(data.error || "No approval URL");
      }
    } catch (err) {
      console.error("PayPal error:", err);
      alert(lang === "es" ? "Error al crear el pago con PayPal. Intente nuevamente." : "Error creating PayPal payment. Please try again.");
    } finally {
      setLoadingPaypal(false);
    }
  };

  const handleMercadoPago = async () => {
    setLoadingMP(true);
    try {
      const res = await fetch("/.netlify/functions/api/mp-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inscriptionId: 0,
          paquete: productKey,
          email: "comprador@cairoandes.com",
          origin: window.location.origin,
        }),
      });
      const data = await res.json();
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        throw new Error(data.error || "No init point");
      }
    } catch (err) {
      console.error("MercadoPago error:", err);
      alert(lang === "es" ? "Error al crear el pago con MercadoPago. Intente nuevamente." : "Error creating MercadoPago payment. Please try again.");
    } finally {
      setLoadingMP(false);
    }
  };

  const whatsappMsg = lang === "es"
    ? `Hola, quiero pagar ${productKey.replace(/_/g, " ")} (USD ${priceUSD}) de Cairo Andes 2026`
    : `Hi, I want to pay for ${productKey.replace(/_/g, " ")} (USD ${priceUSD}) at Cairo Andes 2026`;

  return (
    <div className={`flex flex-col gap-2 mt-4 ${className}`}>
      {/* PayPal */}
      <button
        onClick={handlePayPal}
        disabled={loadingPaypal}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0070ba] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#005ea6] transition-all duration-300 disabled:opacity-50"
      >
        {loadingPaypal ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
        PayPal (USD ${priceUSD})
      </button>

      {/* MercadoPago */}
      <button
        onClick={handleMercadoPago}
        disabled={loadingMP}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#009ee3] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#0087c9] transition-all duration-300 disabled:opacity-50"
      >
        {loadingMP ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
        MercadoPago (ARS)
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/5493873267777?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#25D366]/50 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#25D366]/10 transition-all duration-300"
      >
        <MessageCircle size={14} />
        {lang === "es" ? "Coordinar por WhatsApp" : "Coordinate via WhatsApp"}
      </a>
    </div>
  );
}
