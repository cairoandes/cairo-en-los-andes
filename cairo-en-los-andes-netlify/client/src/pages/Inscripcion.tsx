/**
 * Formulario Oficial de Inscripción — Cairo en los Andes Festival
 * Multi-step form with conditional sections based on PDF structure.
 * Submits to Google Sheets and shows payment options (PayPal USD / MercadoPago ARS).
 */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Package,
  Music,
  Hash,
  Theater,
  Trophy,
  Users,
  Hotel,
  Sparkles,
  MapPin,
  FileText,
  Send,
} from "lucide-react";

/* ── Types ── */
type FormData = {
  // Section 1: Datos Personales
  nombre: string;
  apellido: string;
  nombreArtistico: string;
  fechaNacimiento: string;
  nacionalidad: string;
  ciudadResidencia: string;
  email: string;
  telefono: string;
  instagram: string;
  facebook: string;
  // Section 2: Paquete
  paquete: string;
  confirmaPaquete: boolean;
  // Section 3: Participación Artística
  participacion: string;
  // Section 4: Cantidad de Números
  cantidadNumeros: string;
  // Section 5: Datos de Gala (up to 3)
  gala1Tipo: string;
  gala1Bailarines: string;
  gala1Titulo: string;
  gala1Estilo: string;
  gala1Duracion: string;
  gala2Tipo: string;
  gala2Bailarines: string;
  gala2Titulo: string;
  gala2Estilo: string;
  gala2Duracion: string;
  gala3Tipo: string;
  gala3Bailarines: string;
  gala3Titulo: string;
  gala3Estilo: string;
  gala3Duracion: string;
  // Section 6: Datos de Competencia (up to 3)
  comp1Nivel: string;
  comp1Tipo: string;
  comp1Bailarines: string;
  comp1Estilo: string;
  comp1Titulo: string;
  comp1Duracion: string;
  comp2Nivel: string;
  comp2Tipo: string;
  comp2Bailarines: string;
  comp2Estilo: string;
  comp2Titulo: string;
  comp2Duracion: string;
  comp3Nivel: string;
  comp3Tipo: string;
  comp3Bailarines: string;
  comp3Estilo: string;
  comp3Titulo: string;
  comp3Duracion: string;
  // Section 7: Acompañante
  tieneAcompanante: string;
  cantidadAcompanantes: string;
  relacionAcompanante: string;
  acompananteGala: boolean;
  acompananteHotel: boolean;
  acompananteNoParticipa: boolean;
  // Section 8: Hotel
  tipoHabitacion: string;
  solicitaCambioHabitacion: boolean;
  nochesExtra: string;
  cantidadNochesExtra: string;
  modalidadHabitacion: string;
  // Section 9: Grupo/Escuela
  nombreEscuela: string;
  nombreDirector: string;
  cantidadBailarines: string;
  // Section 10: Opciones Logísticas
  infoTraslados: boolean;
  infoTurismo: boolean;
  // Confirmación
  confirmaDatos: boolean;
  aceptaTerminos: boolean;
  nombreCompletoFirma: string;
};

const initialFormData: FormData = {
  nombre: "", apellido: "", nombreArtistico: "", fechaNacimiento: "",
  nacionalidad: "", ciudadResidencia: "", email: "", telefono: "",
  instagram: "", facebook: "",
  paquete: "", confirmaPaquete: false,
  participacion: "",
  cantidadNumeros: "",
  gala1Tipo: "", gala1Bailarines: "", gala1Titulo: "", gala1Estilo: "", gala1Duracion: "",
  gala2Tipo: "", gala2Bailarines: "", gala2Titulo: "", gala2Estilo: "", gala2Duracion: "",
  gala3Tipo: "", gala3Bailarines: "", gala3Titulo: "", gala3Estilo: "", gala3Duracion: "",
  comp1Nivel: "", comp1Tipo: "", comp1Bailarines: "", comp1Estilo: "", comp1Titulo: "", comp1Duracion: "",
  comp2Nivel: "", comp2Tipo: "", comp2Bailarines: "", comp2Estilo: "", comp2Titulo: "", comp2Duracion: "",
  comp3Nivel: "", comp3Tipo: "", comp3Bailarines: "", comp3Estilo: "", comp3Titulo: "", comp3Duracion: "",
  tieneAcompanante: "no", cantidadAcompanantes: "", relacionAcompanante: "",
  acompananteGala: false, acompananteHotel: false, acompananteNoParticipa: false,
  tipoHabitacion: "", solicitaCambioHabitacion: false,
  nochesExtra: "no", cantidadNochesExtra: "", modalidadHabitacion: "",
  nombreEscuela: "", nombreDirector: "", cantidadBailarines: "",
  infoTraslados: false, infoTurismo: false,
  confirmaDatos: false, aceptaTerminos: false, nombreCompletoFirma: "",
};

/* ── Step definitions ── */
const STEPS = [
  { id: 1, icon: User, label: "Datos Personales" },
  { id: 2, icon: Package, label: "Paquete" },
  { id: 3, icon: Music, label: "Participación" },
  { id: 4, icon: Theater, label: "Gala" },
  { id: 5, icon: Trophy, label: "Competencia" },
  { id: 6, icon: Users, label: "Acompañante" },
  { id: 7, icon: Hotel, label: "Hotel" },
  { id: 8, icon: Sparkles, label: "Grupo" },
  { id: 9, icon: MapPin, label: "Logística" },
  { id: 10, icon: FileText, label: "Confirmación" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function Inscripcion() {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inscriptionId, setInscriptionId] = useState<number | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const needsGala = form.participacion === "gala" || form.participacion === "gala_competencia";
  const needsCompetencia = form.participacion === "competencia" || form.participacion === "gala_competencia";
  const needsHotel = form.paquete === "paquete2" || form.paquete === "paquete3";

  // Determine which steps to show based on selections
  const getVisibleSteps = () => {
    const visible = [1, 2, 3]; // Always show datos, paquete, participacion
    if (needsGala) visible.push(4);
    if (needsCompetencia) visible.push(5);
    visible.push(6); // Acompañante always
    if (needsHotel) visible.push(7); // Hotel only if paquete 2 or 3
    visible.push(8, 9, 10); // Grupo, Logística, Confirmación always
    return visible.sort((a, b) => a - b);
  };

  const visibleSteps = getVisibleSteps();
  const currentStepIndex = visibleSteps.indexOf(step);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  const goNext = () => {
    if (!isLastStep) {
      setStep(visibleSteps[currentStepIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (!isFirstStep) {
      setStep(visibleSteps[currentStepIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!form.confirmaDatos || !form.aceptaTerminos) {
      setError(lang === "es" ? "Debés confirmar los datos y aceptar los términos." : "You must confirm data and accept terms.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/trpc/inscription.submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ json: form }),
      });

      if (!res.ok) {
        throw new Error("Submit failed");
      }

      const data = await res.json();
      const id = data?.result?.data?.json?.inscriptionId || data?.result?.data?.inscriptionId;
      setInscriptionId(id || null);
      setSubmitted(true);
    } catch (err) {
      setError(lang === "es" ? "Error al enviar. Intentá de nuevo." : "Submission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // If submitted, show success + payment options
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080c1a] text-[#faf5eb]">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container max-w-2xl mx-auto px-4">
            <div className="bg-[#0d1230]/80 rounded-2xl border border-[#d4a843]/20 p-8 md:p-12 text-center">
              <CheckCircle2 size={64} className="text-green-400 mx-auto mb-6" />
              <h2 className="font-heading text-3xl font-bold gold-text mb-4">
                {lang === "es" ? "¡Inscripción Enviada!" : "Registration Submitted!"}
              </h2>
              <p className="text-[#faf5eb]/70 mb-8">
                {lang === "es"
                  ? "Tu formulario fue recibido correctamente. Para confirmar tu inscripción, realizá el pago a continuación."
                  : "Your form was received successfully. To confirm your registration, make the payment below."}
              </p>

              {/* Payment Options */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-[#faf5eb] mb-4">
                  {lang === "es" ? "Elegí tu método de pago:" : "Choose your payment method:"}
                </h3>

                {/* PayPal (USD) */}
                <button
                  disabled={paymentLoading !== null}
                  className="block w-full py-4 px-6 bg-[#0070ba] hover:bg-[#005ea6] disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-center"
                  onClick={async () => {
                    if (!inscriptionId) return;
                    setPaymentLoading("paypal");
                    try {
                      const res = await fetch("/api/trpc/inscription.createPaypalOrder", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ json: { inscriptionId, paquete: form.paquete, origin: window.location.origin } }),
                      });
                      const data = await res.json();
                      const approvalUrl = data?.result?.data?.json?.approvalUrl || data?.result?.data?.approvalUrl;
                      if (approvalUrl) {
                        window.location.href = approvalUrl;
                      } else {
                        throw new Error("No approval URL");
                      }
                    } catch (err) {
                      alert(lang === "es" ? "Error al crear el pago PayPal. Intentá por WhatsApp." : "Error creating PayPal payment. Try via WhatsApp.");
                      setPaymentLoading(null);
                    }
                  }}
                >
                  {paymentLoading === "paypal" ? (
                    <Loader2 className="animate-spin mx-auto" size={24} />
                  ) : (
                    <>
                      <span className="text-lg">PayPal</span>
                      <span className="block text-sm opacity-80 mt-1">
                        {lang === "es" ? "Pagar en USD (Dólares)" : "Pay in USD (Dollars)"}
                      </span>
                    </>
                  )}
                </button>

                {/* MercadoPago (ARS) */}
                <button
                  disabled={paymentLoading !== null}
                  className="block w-full py-4 px-6 bg-[#009ee3] hover:bg-[#0087c9] disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-center"
                  onClick={async () => {
                    if (!inscriptionId) return;
                    setPaymentLoading("mercadopago");
                    try {
                      const res = await fetch("/api/trpc/inscription.createMPPreference", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ json: { inscriptionId, paquete: form.paquete, email: form.email, origin: window.location.origin } }),
                      });
                      const data = await res.json();
                      const initPoint = data?.result?.data?.json?.initPoint || data?.result?.data?.initPoint;
                      if (initPoint) {
                        window.location.href = initPoint;
                      } else {
                        throw new Error("No init point");
                      }
                    } catch (err) {
                      alert(lang === "es" ? "Error al crear el pago MercadoPago. Intentá por WhatsApp." : "Error creating MercadoPago payment. Try via WhatsApp.");
                      setPaymentLoading(null);
                    }
                  }}
                >
                  {paymentLoading === "mercadopago" ? (
                    <Loader2 className="animate-spin mx-auto" size={24} />
                  ) : (
                    <>
                      <span className="text-lg">MercadoPago</span>
                      <span className="block text-sm opacity-80 mt-1">
                        {lang === "es" ? "Pagar en ARS (Pesos Argentinos)" : "Pay in ARS (Argentine Pesos)"}
                      </span>
                    </>
                  )}
                </button>

                {/* WhatsApp fallback */}
                <a
                  href="https://wa.me/5493873267777?text=Hola%20Cairo%20Andes!%20Acabo%20de%20enviar%20mi%20formulario%20de%20inscripción%20y%20quiero%20coordinar%20el%20pago."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 px-6 bg-[#25D366] hover:bg-[#1fb855] text-white font-bold rounded-xl transition-colors text-center"
                >
                  <span className="text-lg">WhatsApp</span>
                  <span className="block text-sm opacity-80 mt-1">
                    {lang === "es" ? "Coordinar pago por WhatsApp" : "Coordinate payment via WhatsApp"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb]">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="container text-center">
          <AnimateOnScroll direction="up">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4a843]/70 mb-2">
              {lang === "es" ? "Cairo en los Andes 2026" : "Cairo en los Andes 2026"}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold gold-text mb-3">
              {lang === "es" ? "Formulario de Inscripción" : "Registration Form"}
            </h1>
            <p className="text-[#faf5eb]/60 max-w-lg mx-auto">
              {lang === "es"
                ? "Completá todos los campos obligatorios. Salta, Argentina · 16-18 de octubre 2026"
                : "Fill in all required fields. Salta, Argentina · October 16-18, 2026"}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Progress bar */}
      <div className="container max-w-4xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {visibleSteps.map((s, i) => {
            const stepDef = STEPS[s - 1];
            const Icon = stepDef.icon;
            const isActive = s === step;
            const isDone = currentStepIndex > i;
            return (
              <button
                key={s}
                onClick={() => { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all min-w-[60px] ${
                  isActive
                    ? "text-[#d4a843]"
                    : isDone
                    ? "text-green-400/70"
                    : "text-[#faf5eb]/30"
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium whitespace-nowrap">{stepDef.label}</span>
                <div className={`w-full h-1 rounded-full ${isActive ? "bg-[#d4a843]" : isDone ? "bg-green-400/50" : "bg-[#faf5eb]/10"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Form content */}
      <div className="container max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-[#0d1230]/60 rounded-2xl border border-[#d4a843]/10 p-6 md:p-10">
          {/* Step content */}
          {step === 1 && <Step1DatosPersonales form={form} update={update} lang={lang} />}
          {step === 2 && <Step2Paquete form={form} update={update} lang={lang} />}
          {step === 3 && <Step3Participacion form={form} update={update} lang={lang} />}
          {step === 4 && <Step4Gala form={form} update={update} lang={lang} />}
          {step === 5 && <Step5Competencia form={form} update={update} lang={lang} />}
          {step === 6 && <Step6Acompanante form={form} update={update} lang={lang} />}
          {step === 7 && <Step7Hotel form={form} update={update} lang={lang} />}
          {step === 8 && <Step8Grupo form={form} update={update} lang={lang} />}
          {step === 9 && <Step9Logistica form={form} update={update} lang={lang} />}
          {step === 10 && <Step10Confirmacion form={form} update={update} lang={lang} />}

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#d4a843]/10">
            <button
              onClick={goPrev}
              disabled={isFirstStep}
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#d4a843]/20 text-[#faf5eb]/70 hover:text-[#faf5eb] hover:border-[#d4a843]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              {lang === "es" ? "Anterior" : "Previous"}
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {lang === "es" ? "Enviar Inscripción" : "Submit Registration"}
              </button>
            ) : (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-6 py-3 bg-[#d4a843]/10 border border-[#d4a843]/30 text-[#d4a843] font-medium rounded-lg hover:bg-[#d4a843]/20 transition-all"
              >
                {lang === "es" ? "Siguiente" : "Next"}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* SHARED COMPONENTS                                              */
/* ══════════════════════════════════════════════════════════════ */
type StepProps = {
  form: FormData;
  update: (field: keyof FormData, value: string | boolean) => void;
  lang: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-xl md:text-2xl font-bold text-[#d4a843] mb-6">{children}</h2>;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs uppercase tracking-wider text-[#faf5eb]/50 mb-1.5">
      {children} {required && <span className="text-[#d4a843]">*</span>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors"
    />
  );
}

function RadioOption({ name, value, checked, onChange, label }: {
  name: string; value: string; checked: boolean; onChange: (v: string) => void; label: string;
}) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#d4a843]/10 cursor-pointer hover:border-[#d4a843]/30 transition-all has-[:checked]:border-[#d4a843]/50 has-[:checked]:bg-[#d4a843]/5">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 accent-[#d4a843]"
      />
      <span className="text-sm text-[#faf5eb]/80">{label}</span>
    </label>
  );
}

function CheckboxOption({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label: string;
}) {
  return (
    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#d4a843]/10 cursor-pointer hover:border-[#d4a843]/30 transition-all has-[:checked]:border-[#d4a843]/50 has-[:checked]:bg-[#d4a843]/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-[#d4a843]"
      />
      <span className="text-sm text-[#faf5eb]/80">{label}</span>
    </label>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 1: DATOS PERSONALES                                       */
/* ══════════════════════════════════════════════════════════════ */
function Step1DatosPersonales({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "1. Datos Personales" : "1. Personal Information"}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>{lang === "es" ? "Nombre(s)" : "First Name(s)"}</FieldLabel>
          <TextInput value={form.nombre} onChange={(v) => update("nombre", v)} required />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Apellido(s)" : "Last Name(s)"}</FieldLabel>
          <TextInput value={form.apellido} onChange={(v) => update("apellido", v)} required />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Nombre artístico" : "Stage Name"}</FieldLabel>
          <TextInput value={form.nombreArtistico} onChange={(v) => update("nombreArtistico", v)} placeholder={lang === "es" ? "Si aplica" : "If applicable"} />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Fecha de nacimiento" : "Date of Birth"}</FieldLabel>
          <TextInput value={form.fechaNacimiento} onChange={(v) => update("fechaNacimiento", v)} type="date" required />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Nacionalidad" : "Nationality"}</FieldLabel>
          <TextInput value={form.nacionalidad} onChange={(v) => update("nacionalidad", v)} required />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Ciudad y país de residencia" : "City & Country"}</FieldLabel>
          <TextInput value={form.ciudadResidencia} onChange={(v) => update("ciudadResidencia", v)} required />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Correo electrónico" : "Email"}</FieldLabel>
          <TextInput value={form.email} onChange={(v) => update("email", v)} type="email" required />
        </div>
        <div>
          <FieldLabel required>{lang === "es" ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}</FieldLabel>
          <TextInput value={form.telefono} onChange={(v) => update("telefono", v)} placeholder={lang === "es" ? "Con código de país" : "With country code"} required />
        </div>
        <div>
          <FieldLabel>Instagram</FieldLabel>
          <TextInput value={form.instagram} onChange={(v) => update("instagram", v)} placeholder="@usuario" />
        </div>
        <div>
          <FieldLabel>Facebook</FieldLabel>
          <TextInput value={form.facebook} onChange={(v) => update("facebook", v)} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 2: SELECCIÓN DE PAQUETE                                   */
/* ══════════════════════════════════════════════════════════════ */
function Step2Paquete({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "2. Selección de Paquete" : "2. Package Selection"}</SectionTitle>
      <p className="text-sm text-[#faf5eb]/50 mb-4">
        {lang === "es" ? "Elegí UNO de los siguientes paquetes:" : "Choose ONE of the following packages:"}
      </p>
      <div className="space-y-3 mb-6">
        <RadioOption
          name="paquete"
          value="paquete1"
          checked={form.paquete === "paquete1"}
          onChange={(v) => update("paquete", v)}
          label={lang === "es" ? "Paquete 1 – Pase completo / Sin hotel — USD 179" : "Package 1 – Full pass / No hotel — USD 179"}
        />
        <RadioOption
          name="paquete"
          value="paquete2"
          checked={form.paquete === "paquete2"}
          onChange={(v) => update("paquete", v)}
          label={lang === "es" ? "Paquete 2 – Pase completo / Hotel boutique — USD 240" : "Package 2 – Full pass / Boutique hotel — USD 240"}
        />
        <RadioOption
          name="paquete"
          value="paquete3"
          checked={form.paquete === "paquete3"}
          onChange={(v) => update("paquete", v)}
          label={lang === "es" ? "Paquete 3 – Pase completo / Hotel Sheraton — USD 680" : "Package 3 – Full pass / Hotel Sheraton — USD 680"}
        />
      </div>
      <CheckboxOption
        checked={form.confirmaPaquete}
        onChange={(v) => update("confirmaPaquete", v)}
        label={lang === "es"
          ? "Confirmo que he leído y comprendido lo que incluye el paquete seleccionado"
          : "I confirm I have read and understood what the selected package includes"}
      />
      <div className="mt-4 p-4 rounded-lg bg-[#d4a843]/5 border border-[#d4a843]/10">
        <p className="text-xs text-[#faf5eb]/50">
          {lang === "es"
            ? "✔ Todos los paquetes incluyen: Acceso completo a TODOS los workshops + Acceso a TODAS las galas y actividades del festival. ✘ No hay pases por día."
            : "✔ All packages include: Full access to ALL workshops + Access to ALL galas and festival activities. ✘ No day passes available."}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 3: PARTICIPACIÓN ARTÍSTICA                                */
/* ══════════════════════════════════════════════════════════════ */
function Step3Participacion({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "3. Participación Artística" : "3. Artistic Participation"}</SectionTitle>
      <p className="text-sm text-[#faf5eb]/50 mb-4">
        {lang === "es" ? "Elegí una opción:" : "Choose one option:"}
      </p>
      <div className="space-y-3 mb-6">
        <RadioOption
          name="participacion"
          value="no_baila"
          checked={form.participacion === "no_baila"}
          onChange={(v) => update("participacion", v)}
          label={lang === "es" ? "No voy a bailar (solo workshops)" : "I won't dance (workshops only)"}
        />
        <RadioOption
          name="participacion"
          value="gala"
          checked={form.participacion === "gala"}
          onChange={(v) => update("participacion", v)}
          label={lang === "es" ? "Solo Gala" : "Gala only"}
        />
        <RadioOption
          name="participacion"
          value="competencia"
          checked={form.participacion === "competencia"}
          onChange={(v) => update("participacion", v)}
          label={lang === "es" ? "Solo Competencia" : "Competition only"}
        />
        <RadioOption
          name="participacion"
          value="gala_competencia"
          checked={form.participacion === "gala_competencia"}
          onChange={(v) => update("participacion", v)}
          label={lang === "es" ? "Gala + Competencia" : "Gala + Competition"}
        />
      </div>

      {(form.participacion === "gala" || form.participacion === "competencia" || form.participacion === "gala_competencia") && (
        <div className="mt-6">
          <FieldLabel required>{lang === "es" ? "Cantidad total de números (Gala + Competencia)" : "Total number of performances (Gala + Competition)"}</FieldLabel>
          <TextInput value={form.cantidadNumeros} onChange={(v) => update("cantidadNumeros", v)} type="number" placeholder="1-3" />
          <p className="text-xs text-[#faf5eb]/40 mt-2">
            {lang === "es"
              ? "Este formulario incluye espacio para declarar hasta 3 números. Si desea inscribir más, deberá completar un formulario adicional."
              : "This form includes space for up to 3 performances. For more, submit an additional form."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 4: DATOS DE GALA                                          */
/* ══════════════════════════════════════════════════════════════ */
function GalaNumberFields({ prefix, num, form, update, lang }: { prefix: "gala1" | "gala2" | "gala3"; num: number; form: FormData; update: StepProps["update"]; lang: string }) {
  const tipoKey = `${prefix}Tipo` as keyof FormData;
  const bailarinesKey = `${prefix}Bailarines` as keyof FormData;
  const tituloKey = `${prefix}Titulo` as keyof FormData;
  const estiloKey = `${prefix}Estilo` as keyof FormData;
  const duracionKey = `${prefix}Duracion` as keyof FormData;

  return (
    <div className="p-4 rounded-lg border border-[#d4a843]/10 bg-[#080c1a]/30">
      <h4 className="font-heading text-sm font-bold text-[#faf5eb]/70 mb-3">
        {lang === "es" ? `Número de Gala ${num}` : `Gala Performance ${num}`}
        {num > 1 && <span className="text-[#faf5eb]/40 font-normal ml-2">({lang === "es" ? "Opcional" : "Optional"})</span>}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <FieldLabel>{lang === "es" ? "Tipo" : "Type"}</FieldLabel>
          <select
            value={form[tipoKey] as string}
            onChange={(e) => update(tipoKey, e.target.value)}
            className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] focus:outline-none focus:border-[#d4a843]/50"
          >
            <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
            <option value="solo">Solo</option>
            <option value="duo">{lang === "es" ? "Dúo" : "Duo"}</option>
            <option value="grupo">{lang === "es" ? "Grupo" : "Group"}</option>
          </select>
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Cantidad de bailarines" : "Number of dancers"}</FieldLabel>
          <TextInput value={form[bailarinesKey] as string} onChange={(v) => update(bailarinesKey, v)} type="number" />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Título del número" : "Performance title"}</FieldLabel>
          <TextInput value={form[tituloKey] as string} onChange={(v) => update(tituloKey, v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Estilo / Género" : "Style / Genre"}</FieldLabel>
          <TextInput value={form[estiloKey] as string} onChange={(v) => update(estiloKey, v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Duración aprox. (min)" : "Approx. duration (min)"}</FieldLabel>
          <TextInput value={form[duracionKey] as string} onChange={(v) => update(duracionKey, v)} type="number" />
        </div>
      </div>
    </div>
  );
}

function Step4Gala({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "4. Datos de la Gala" : "4. Gala Details"}</SectionTitle>
      <div className="space-y-4">
        <GalaNumberFields prefix="gala1" num={1} form={form} update={update} lang={lang} />
        <GalaNumberFields prefix="gala2" num={2} form={form} update={update} lang={lang} />
        <GalaNumberFields prefix="gala3" num={3} form={form} update={update} lang={lang} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 5: DATOS DE COMPETENCIA                                   */
/* ══════════════════════════════════════════════════════════════ */
function CompNumberFields({ prefix, num, form, update, lang }: { prefix: "comp1" | "comp2" | "comp3"; num: number; form: FormData; update: StepProps["update"]; lang: string }) {
  const nivelKey = `${prefix}Nivel` as keyof FormData;
  const tipoKey = `${prefix}Tipo` as keyof FormData;
  const bailarinesKey = `${prefix}Bailarines` as keyof FormData;
  const estiloKey = `${prefix}Estilo` as keyof FormData;
  const tituloKey = `${prefix}Titulo` as keyof FormData;
  const duracionKey = `${prefix}Duracion` as keyof FormData;

  return (
    <div className="p-4 rounded-lg border border-[#d4a843]/10 bg-[#080c1a]/30">
      <h4 className="font-heading text-sm font-bold text-[#faf5eb]/70 mb-3">
        {lang === "es" ? `Número de Competencia ${num}` : `Competition Performance ${num}`}
        {num > 1 && <span className="text-[#faf5eb]/40 font-normal ml-2">({lang === "es" ? "Opcional" : "Optional"})</span>}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <FieldLabel>{lang === "es" ? "Nivel" : "Level"}</FieldLabel>
          <select
            value={form[nivelKey] as string}
            onChange={(e) => update(nivelKey, e.target.value)}
            className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] focus:outline-none focus:border-[#d4a843]/50"
          >
            <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
            <option value="amateur">Amateur</option>
            <option value="semi_profesional">Semi-Profesional</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Tipo" : "Type"}</FieldLabel>
          <select
            value={form[tipoKey] as string}
            onChange={(e) => update(tipoKey, e.target.value)}
            className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] focus:outline-none focus:border-[#d4a843]/50"
          >
            <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
            <option value="solo">Solo</option>
            <option value="duo">{lang === "es" ? "Dúo" : "Duo"}</option>
            <option value="grupo">{lang === "es" ? "Grupo" : "Group"}</option>
          </select>
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Cantidad de bailarines" : "Number of dancers"}</FieldLabel>
          <TextInput value={form[bailarinesKey] as string} onChange={(v) => update(bailarinesKey, v)} type="number" />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Estilo / Categoría" : "Style / Category"}</FieldLabel>
          <TextInput value={form[estiloKey] as string} onChange={(v) => update(estiloKey, v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Título del número" : "Performance title"}</FieldLabel>
          <TextInput value={form[tituloKey] as string} onChange={(v) => update(tituloKey, v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Duración aprox. (min)" : "Approx. duration (min)"}</FieldLabel>
          <TextInput value={form[duracionKey] as string} onChange={(v) => update(duracionKey, v)} type="number" />
        </div>
      </div>
    </div>
  );
}

function Step5Competencia({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "5. Datos de la Competencia" : "5. Competition Details"}</SectionTitle>
      <div className="space-y-4">
        <CompNumberFields prefix="comp1" num={1} form={form} update={update} lang={lang} />
        <CompNumberFields prefix="comp2" num={2} form={form} update={update} lang={lang} />
        <CompNumberFields prefix="comp3" num={3} form={form} update={update} lang={lang} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 6: ACOMPAÑANTE                                            */
/* ══════════════════════════════════════════════════════════════ */
function Step6Acompanante({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "6. Acompañante / Staff / Asistente" : "6. Companion / Staff / Assistant"}</SectionTitle>
      <p className="text-sm text-[#faf5eb]/50 mb-4">{lang === "es" ? "¿Viene con acompañante?" : "Coming with a companion?"}</p>
      <div className="space-y-3 mb-6">
        <RadioOption name="acompanante" value="no" checked={form.tieneAcompanante === "no"} onChange={(v) => update("tieneAcompanante", v)} label="No" />
        <RadioOption name="acompanante" value="si" checked={form.tieneAcompanante === "si"} onChange={(v) => update("tieneAcompanante", v)} label={lang === "es" ? "Sí" : "Yes"} />
      </div>

      {form.tieneAcompanante === "si" && (
        <div className="space-y-4 p-4 rounded-lg border border-[#d4a843]/10 bg-[#080c1a]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>{lang === "es" ? "Cantidad de acompañantes" : "Number of companions"}</FieldLabel>
              <TextInput value={form.cantidadAcompanantes} onChange={(v) => update("cantidadAcompanantes", v)} type="number" />
            </div>
            <div>
              <FieldLabel>{lang === "es" ? "Relación / Rol" : "Relationship / Role"}</FieldLabel>
              <select
                value={form.relacionAcompanante}
                onChange={(e) => update("relacionAcompanante", e.target.value)}
                className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] focus:outline-none focus:border-[#d4a843]/50"
              >
                <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
                <option value="pareja">{lang === "es" ? "Pareja / Esposo(a)" : "Partner / Spouse"}</option>
                <option value="familiar">Familiar</option>
                <option value="amigo">{lang === "es" ? "Amigo(a)" : "Friend"}</option>
                <option value="staff">{lang === "es" ? "Asistente / Staff" : "Assistant / Staff"}</option>
                <option value="otro">{lang === "es" ? "Otro" : "Other"}</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <CheckboxOption checked={form.acompananteGala} onChange={(v) => update("acompananteGala", v)} label={lang === "es" ? "El acompañante asiste a Gala(s)" : "Companion attends Gala(s)"} />
            <CheckboxOption checked={form.acompananteHotel} onChange={(v) => update("acompananteHotel", v)} label={lang === "es" ? "El acompañante se aloja en hotel" : "Companion stays at hotel"} />
            <CheckboxOption checked={form.acompananteNoParticipa} onChange={(v) => update("acompananteNoParticipa", v)} label={lang === "es" ? "El acompañante no participa de actividades del festival" : "Companion does not participate in festival activities"} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 7: HOTEL                                                  */
/* ══════════════════════════════════════════════════════════════ */
function Step7Hotel({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "7. Hotel y Habitación" : "7. Hotel & Room"}</SectionTitle>
      <div className="space-y-4">
        <div>
          <FieldLabel>{lang === "es" ? "Tipo de habitación preferida" : "Preferred room type"}</FieldLabel>
          <div className="space-y-2">
            <RadioOption name="habitacion" value="simple" checked={form.tipoHabitacion === "simple"} onChange={(v) => update("tipoHabitacion", v)} label="Simple" />
            <RadioOption name="habitacion" value="doble" checked={form.tipoHabitacion === "doble"} onChange={(v) => update("tipoHabitacion", v)} label="Doble" />
            <RadioOption name="habitacion" value="twin" checked={form.tipoHabitacion === "twin"} onChange={(v) => update("tipoHabitacion", v)} label="Twin" />
          </div>
        </div>

        <CheckboxOption
          checked={form.solicitaCambioHabitacion}
          onChange={(v) => update("solicitaCambioHabitacion", v)}
          label={lang === "es" ? "Solicito cambio del tipo de habitación incluido en el paquete (sujeto a disponibilidad)" : "I request a room type change from what's included (subject to availability)"}
        />

        <div>
          <FieldLabel>{lang === "es" ? "Noches extra de hotel" : "Extra hotel nights"}</FieldLabel>
          <div className="space-y-2">
            <RadioOption name="nochesExtra" value="no" checked={form.nochesExtra === "no"} onChange={(v) => update("nochesExtra", v)} label="No" />
            <RadioOption name="nochesExtra" value="si" checked={form.nochesExtra === "si"} onChange={(v) => update("nochesExtra", v)} label={lang === "es" ? "Sí" : "Yes"} />
          </div>
        </div>

        {form.nochesExtra === "si" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-[#d4a843]/10 bg-[#080c1a]/30">
            <div>
              <FieldLabel>{lang === "es" ? "Cantidad de noches extra" : "Number of extra nights"}</FieldLabel>
              <TextInput value={form.cantidadNochesExtra} onChange={(v) => update("cantidadNochesExtra", v)} type="number" />
            </div>
            <div>
              <FieldLabel>{lang === "es" ? "Modalidad" : "Room mode"}</FieldLabel>
              <select
                value={form.modalidadHabitacion}
                onChange={(e) => update("modalidadHabitacion", e.target.value)}
                className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] focus:outline-none focus:border-[#d4a843]/50"
              >
                <option value="">{lang === "es" ? "Seleccionar" : "Select"}</option>
                <option value="compartida">{lang === "es" ? "Habitación compartida" : "Shared room"}</option>
                <option value="separada">{lang === "es" ? "Habitaciones separadas" : "Separate rooms"}</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 8: GRUPO / ESCUELA                                        */
/* ══════════════════════════════════════════════════════════════ */
function Step8Grupo({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "8. Grupo / Escuela" : "8. Group / School"}</SectionTitle>
      <p className="text-sm text-[#faf5eb]/50 mb-4">
        {lang === "es" ? "Si corresponde, completá los datos de tu grupo o escuela." : "If applicable, fill in your group or school details."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>{lang === "es" ? "Nombre de la escuela o compañía" : "School or company name"}</FieldLabel>
          <TextInput value={form.nombreEscuela} onChange={(v) => update("nombreEscuela", v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Nombre del/la director(a)" : "Director's name"}</FieldLabel>
          <TextInput value={form.nombreDirector} onChange={(v) => update("nombreDirector", v)} />
        </div>
        <div>
          <FieldLabel>{lang === "es" ? "Cantidad total de bailarines" : "Total number of dancers"}</FieldLabel>
          <TextInput value={form.cantidadBailarines} onChange={(v) => update("cantidadBailarines", v)} type="number" />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 9: OPCIONES LOGÍSTICAS                                    */
/* ══════════════════════════════════════════════════════════════ */
function Step9Logistica({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "9. Opciones Logísticas" : "9. Logistics Options"}</SectionTitle>
      <p className="text-sm text-[#faf5eb]/50 mb-4">
        {lang === "es" ? "Seleccioná si te interesa recibir información sobre:" : "Select if you'd like information about:"}
      </p>
      <div className="space-y-3">
        <CheckboxOption
          checked={form.infoTraslados}
          onChange={(v) => update("infoTraslados", v)}
          label={lang === "es" ? "Información sobre traslados desde/hacia el aeropuerto" : "Airport transfer information"}
        />
        <CheckboxOption
          checked={form.infoTurismo}
          onChange={(v) => update("infoTurismo", v)}
          label={lang === "es" ? "Información sobre actividades turísticas y culturales en Salta" : "Tourist and cultural activities in Salta"}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 10: CONFIRMACIÓN                                          */
/* ══════════════════════════════════════════════════════════════ */
function Step10Confirmacion({ form, update, lang }: StepProps) {
  return (
    <div>
      <SectionTitle>{lang === "es" ? "10. Confirmación Final" : "10. Final Confirmation"}</SectionTitle>

      {/* Terms */}
      <div className="mb-6 p-4 rounded-lg bg-[#d4a843]/5 border border-[#d4a843]/10">
        <h4 className="font-heading text-sm font-bold text-[#d4a843] mb-3">
          {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
        </h4>
        <ol className="text-xs text-[#faf5eb]/60 space-y-1.5 list-decimal list-inside">
          <li>{lang === "es" ? "Todos los paquetes incluyen acceso completo al festival." : "All packages include full festival access."}</li>
          <li>{lang === "es" ? "El alojamiento y tipo de habitación dependen del paquete seleccionado y la disponibilidad." : "Accommodation depends on selected package and availability."}</li>
          <li>{lang === "es" ? "Las solicitudes de acompañantes y noches extra están sujetas a confirmación." : "Companion and extra night requests are subject to confirmation."}</li>
          <li>{lang === "es" ? "Las inscripciones no son reembolsables ni transferibles." : "Registrations are non-refundable and non-transferable."}</li>
          <li>{lang === "es" ? "Me comprometo a respetar horarios, artistas, jurados, staff y participantes." : "I commit to respecting schedules, artists, judges, staff and participants."}</li>
          <li>{lang === "es" ? "El envío de música y requisitos técnicos deberá realizarse dentro de los plazos indicados." : "Music and technical requirements must be submitted within deadlines."}</li>
          <li>{lang === "es" ? "Autorizo el uso de imágenes y videos tomados durante el festival con fines promocionales." : "I authorize use of images and videos taken during the festival for promotional purposes."}</li>
        </ol>
      </div>

      <div className="space-y-3 mb-6">
        <CheckboxOption
          checked={form.confirmaDatos}
          onChange={(v) => update("confirmaDatos", v)}
          label={lang === "es" ? "Confirmo que los datos ingresados son correctos" : "I confirm the entered data is correct"}
        />
        <CheckboxOption
          checked={form.aceptaTerminos}
          onChange={(v) => update("aceptaTerminos", v)}
          label={lang === "es" ? "Acepto los términos y condiciones del festival" : "I accept the festival terms and conditions"}
        />
      </div>

      <div>
        <FieldLabel required>{lang === "es" ? "Nombre completo (firma digital)" : "Full name (digital signature)"}</FieldLabel>
        <TextInput value={form.nombreCompletoFirma} onChange={(v) => update("nombreCompletoFirma", v)} required />
      </div>
    </div>
  );
}
