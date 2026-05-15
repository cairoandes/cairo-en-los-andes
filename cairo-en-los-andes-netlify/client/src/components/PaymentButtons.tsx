/**
 * PaymentButtons — Reusable payment buttons for Galas and Sponsors.
 * Shows PayPal, MercadoPago, and WhatsApp options.
 * Opens a popup to collect buyer data (name, email, phone) before payment.
 * Data is saved to DB + Google Sheets with PENDIENTE status, then payment is created.
 */
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CreditCard, MessageCircle, Loader2, X, User, Mail, Phone } from "lucide-react";

interface PaymentButtonsProps {
  productKey: string;
  priceUSD: number;
  className?: string;
}

export default function PaymentButtons({ productKey, priceUSD, className = "" }: PaymentButtonsProps) {
  const { lang } = useLang();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<"paypal" | "mercadopago" | "whatsapp" | null>(null);
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        if (!loading) setShowPopup(false);
      }
    }
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup, loading]);

  const openPopup = (provider: "paypal" | "mercadopago" | "whatsapp") => {
    setSelectedProvider(provider);
    setErrors({});
    setShowPopup(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nombre.trim()) errs.nombre = lang === "es" ? "Ingresá tu nombre" : "Enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = lang === "es" ? "Ingresá un email válido" : "Enter a valid email";
    }
    if (!telefono.trim()) errs.telefono = lang === "es" ? "Ingresá tu teléfono" : "Enter your phone";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !selectedProvider) return;
    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/api/direct-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          telefono: telefono.trim(),
          producto: productKey,
          paymentProvider: selectedProvider,
          origin: window.location.origin,
        }),
      });

      const result = await response.json();

      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(
        lang === "es"
          ? "Error al procesar el pago. Intente nuevamente."
          : "Error processing payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = lang === "es"
    ? `Hola, quiero pagar ${productKey.replace(/_/g, " ")} (USD ${priceUSD}) de Cairo Andes 2026`
    : `Hi, I want to pay for ${productKey.replace(/_/g, " ")} (USD ${priceUSD}) at Cairo Andes 2026`;

  return (
    <>
      <div className={`flex flex-col gap-2 mt-4 ${className}`}>
        {/* PayPal */}
        <button
          onClick={() => openPopup("paypal")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0070ba] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#005ea6] transition-all duration-300"
        >
          <CreditCard size={14} />
          PayPal (USD ${priceUSD})
        </button>

        {/* MercadoPago */}
        <button
          onClick={() => openPopup("mercadopago")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#009ee3] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#0087c9] transition-all duration-300"
        >
          <CreditCard size={14} />
          MercadoPago (ARS)
        </button>

        {/* MercadoPago note */}
        <p className="text-[10px] text-[#faf5eb]/40 text-center -mt-1">
          {lang === "es"
            ? "El pago se realiza en pesos argentinos al precio oficial del día. Plan de pago disponible."
            : "Payment in Argentine pesos at the official daily rate. Installment plans available."}
        </p>

        {/* WhatsApp */}
        <button
          onClick={() => openPopup("whatsapp")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#25D366]/50 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#25D366]/10 transition-all duration-300"
        >
          <MessageCircle size={14} />
          {lang === "es" ? "Coordinar por WhatsApp" : "Coordinate via WhatsApp"}
        </button>
      </div>

      {/* ═══ POPUP OVERLAY ═══ */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            ref={popupRef}
            className="relative w-full max-w-md bg-[#0d1230] border border-[#d4a843]/30 rounded-2xl shadow-[0_0_60px_rgba(212,168,67,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#d4a843]/20 to-[#e8842a]/20 px-6 py-4 border-b border-[#d4a843]/20">
              <button
                onClick={() => !loading && setShowPopup(false)}
                className="absolute top-4 right-4 text-[#faf5eb]/40 hover:text-[#faf5eb] transition"
              >
                <X size={20} />
              </button>
              <h3 className="font-heading text-lg font-bold gold-text">
                {lang === "es" ? "Completá tus datos" : "Enter your details"}
              </h3>
              <p className="text-xs text-[#faf5eb]/50 mt-1">
                {lang === "es"
                  ? "Necesitamos tus datos para registrar la compra antes del pago."
                  : "We need your details to register the purchase before payment."}
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Nombre */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[#faf5eb]/60 mb-1.5 uppercase tracking-wider">
                  <User size={12} />
                  {lang === "es" ? "Nombre completo" : "Full name"}
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={lang === "es" ? "Ej: María García" : "E.g.: Maria Garcia"}
                  className={`w-full px-3 py-2.5 bg-[#080c1a] border rounded-lg text-sm text-[#faf5eb] placeholder-[#faf5eb]/20 focus:outline-none focus:border-[#d4a843]/60 transition ${
                    errors.nombre ? "border-red-500/60" : "border-[#faf5eb]/10"
                  }`}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[#faf5eb]/60 mb-1.5 uppercase tracking-wider">
                  <Mail size={12} />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@email.com"
                  className={`w-full px-3 py-2.5 bg-[#080c1a] border rounded-lg text-sm text-[#faf5eb] placeholder-[#faf5eb]/20 focus:outline-none focus:border-[#d4a843]/60 transition ${
                    errors.email ? "border-red-500/60" : "border-[#faf5eb]/10"
                  }`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[#faf5eb]/60 mb-1.5 uppercase tracking-wider">
                  <Phone size={12} />
                  {lang === "es" ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+54 9 387 ..."
                  className={`w-full px-3 py-2.5 bg-[#080c1a] border rounded-lg text-sm text-[#faf5eb] placeholder-[#faf5eb]/20 focus:outline-none focus:border-[#d4a843]/60 transition ${
                    errors.telefono ? "border-red-500/60" : "border-[#faf5eb]/10"
                  }`}
                />
                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="px-6 pb-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 disabled:opacity-50 ${
                  selectedProvider === "paypal"
                    ? "bg-[#0070ba] text-white hover:bg-[#005ea6]"
                    : selectedProvider === "mercadopago"
                    ? "bg-[#009ee3] text-white hover:bg-[#0087c9]"
                    : "bg-[#25D366] text-white hover:bg-[#1da851]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {lang === "es" ? "Procesando..." : "Processing..."}
                  </>
                ) : (
                  <>
                    {selectedProvider === "whatsapp" ? <MessageCircle size={16} /> : <CreditCard size={16} />}
                    {selectedProvider === "paypal"
                      ? `${lang === "es" ? "Pagar con" : "Pay with"} PayPal — USD $${priceUSD}`
                      : selectedProvider === "mercadopago"
                      ? `${lang === "es" ? "Pagar con" : "Pay with"} MercadoPago`
                      : lang === "es"
                      ? "Continuar por WhatsApp"
                      : "Continue via WhatsApp"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
