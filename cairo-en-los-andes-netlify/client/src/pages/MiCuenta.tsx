/**
 * Mi Cuenta / My Account — Participant login, registration, and dashboard.
 * Premium dark navy + gold design matching the festival site.
 * Bilingual: ES / EN via LanguageContext.
 * Uses fetch API (Netlify Functions) instead of tRPC.
 */
import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, type Participant, type MyDataResponse } from "@/lib/api";
import {
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  User,
  Package,
  Trophy,
  Hash,
  DollarSign,
  CreditCard,
  Sparkles,
  MessageCircle,
  KeyRound,
  Receipt,
  Tag,
  Calculator,
  ExternalLink,
} from "lucide-react";

/* ── Translations ── */
const txt = {
  es: {
    pageTitle: "Mi Cuenta",
    pageSubtitle: "Accedé a tu información del festival",
    loginTab: "Iniciar Sesión",
    registerTab: "Registrarse",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",
    nameLabel: "Nombre (opcional)",
    namePlaceholder: "Tu nombre",
    loginBtn: "Iniciar Sesión",
    registerBtn: "Crear Cuenta",
    loggingIn: "Ingresando...",
    registering: "Creando cuenta...",
    orSeparator: "o",
    noAccount: "¿No tenés cuenta?",
    hasAccount: "¿Ya tenés cuenta?",
    createOne: "Crear una",
    loginHere: "Iniciá sesión",
    errorInvalidCredentials: "Email o contraseña incorrectos",
    errorAccountExists: "Ya existe una cuenta con este email",
    errorGeneric: "Ocurrió un error. Intentá de nuevo.",
    errorPasswordShort: "La contraseña debe tener al menos 6 caracteres",
    successRegistered: "¡Cuenta creada exitosamente!",
    successNotInSheet:
      "Tu cuenta fue creada, pero tu email no está registrado en el festival aún. Contactanos por WhatsApp para inscribirte.",
    dashTitle: "Panel de Participante",
    dashSubtitle: "Tu información del festival en tiempo real",
    dashName: "Nombre",
    dashPackage: "Paquete",
    dashCompetition: "Competencia",
    dashParticipations: "Participaciones",
    dashPriceBase: "Precio Base Paquete",
    dashTotalToPay: "Total a Pagar",
    dashPaid: "Pagado (USD)",
    dashBalance: "Saldo (USD)",
    dashNotRegistered: "Tu email no está registrado en el festival",
    dashNotRegisteredDesc:
      "Contactanos por WhatsApp para inscribirte y tu información aparecerá aquí automáticamente.",
    dashSheetsError:
      "No se pudo cargar la información del festival. Intentá más tarde.",
    dashWhatsApp: "Contactar por WhatsApp",
    dashRequestServices: "Solicitar más servicios",
    logoutBtn: "Cerrar Sesión",
    welcomeBack: "¡Bienvenido/a",
    paidFull: "Pagado completo",
    paidPartial: "Pago parcial",
    paidPending: "Pendiente",
    loading: "Cargando...",
    forgotPassword: "¿Olvidaste tu contraseña?",
    forgotTitle: "Recuperar Contraseña",
    forgotSubtitle:
      "Ingresá tu email y te enviaremos un enlace de recuperación a través del organizador del festival.",
    forgotEmailPlaceholder: "tu@email.com",
    forgotSendBtn: "Solicitar Recuperación",
    forgotSending: "Enviando...",
    forgotSuccessTitle: "¡Solicitud enviada!",
    forgotSuccessMsg:
      "Si tu email está registrado, el organizador del festival te contactará por WhatsApp con un enlace para recuperar tu contraseña.",
    forgotBackToLogin: "Volver a Iniciar Sesión",
    paymentHistory: "Historial de Pagos",
    paymentHistoryDesc: "Detalle de tus pagos realizados",
    noPayments: "Aún no hay pagos registrados",
    paymentExtra: "Pago Extra",
    pago: "Pago",
    whatsappMsg:
      "Hola%2C%20quiero%20solicitar%20m%C3%A1s%20servicios%20para%20el%20festival%20Cairo%20en%20los%20Andes",
  },
  en: {
    pageTitle: "My Account",
    pageSubtitle: "Access your festival information",
    loginTab: "Log In",
    registerTab: "Register",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Minimum 6 characters",
    nameLabel: "Name (optional)",
    namePlaceholder: "Your name",
    loginBtn: "Log In",
    registerBtn: "Create Account",
    loggingIn: "Logging in...",
    registering: "Creating account...",
    orSeparator: "or",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    createOne: "Create one",
    loginHere: "Log in",
    errorInvalidCredentials: "Invalid email or password",
    errorAccountExists: "An account with this email already exists",
    errorGeneric: "An error occurred. Please try again.",
    errorPasswordShort: "Password must be at least 6 characters",
    successRegistered: "Account created successfully!",
    successNotInSheet:
      "Your account was created, but your email is not registered in the festival yet. Contact us via WhatsApp to sign up.",
    dashTitle: "Participant Dashboard",
    dashSubtitle: "Your festival information in real time",
    dashName: "Name",
    dashPackage: "Package",
    dashCompetition: "Competition",
    dashParticipations: "Participations",
    dashPriceBase: "Package Base Price",
    dashTotalToPay: "Total to Pay",
    dashPaid: "Paid (USD)",
    dashBalance: "Balance (USD)",
    dashNotRegistered: "Your email is not registered in the festival",
    dashNotRegisteredDesc:
      "Contact us via WhatsApp to register and your information will appear here automatically.",
    dashSheetsError:
      "Could not load festival information. Please try again later.",
    dashWhatsApp: "Contact via WhatsApp",
    dashRequestServices: "Request more services",
    logoutBtn: "Log Out",
    welcomeBack: "Welcome back",
    paidFull: "Paid in full",
    paidPartial: "Partial payment",
    paidPending: "Pending",
    loading: "Loading...",
    forgotPassword: "Forgot your password?",
    forgotTitle: "Reset Password",
    forgotSubtitle:
      "Enter your email and we'll send a recovery link through the festival organizer.",
    forgotEmailPlaceholder: "you@email.com",
    forgotSendBtn: "Request Recovery",
    forgotSending: "Sending...",
    forgotSuccessTitle: "Request sent!",
    forgotSuccessMsg:
      "If your email is registered, the festival organizer will contact you via WhatsApp with a link to reset your password.",
    forgotBackToLogin: "Back to Log In",
    paymentHistory: "Payment History",
    paymentHistoryDesc: "Detail of your payments made",
    noPayments: "No payments recorded yet",
    paymentExtra: "Extra Payment",
    pago: "Payment",
    whatsappMsg:
      "Hello%2C%20I%20would%20like%20to%20request%20more%20services%20for%20the%20Cairo%20en%20los%20Andes%20festival",
  },
};

/* ── Normalize payment amount: returns true if there's a real non-zero amount ── */
function hasRealAmount(amount: string): boolean {
  if (!amount || amount.trim() === "" || amount.trim() === "—") return false;
  const num = parseFloat(amount.replace(/[^0-9.,]/g, "").replace(",", "."));
  return !isNaN(num) && num > 0;
}

/* ── Payment status helper ── */
function getPaymentStatus(
  pagado: string,
  saldo: string,
  lang: "es" | "en"
): {
  label: string;
  color: string;
  bgColor: string;
  icon: typeof CheckCircle2;
} {
  const saldoNum = parseFloat(saldo.replace(/[^0-9.-]/g, "")) || 0;
  const pagadoNum = parseFloat(pagado.replace(/[^0-9.-]/g, "")) || 0;

  if (saldoNum <= 0 && pagadoNum > 0) {
    return {
      label: txt[lang].paidFull,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10 border-emerald-400/30",
      icon: CheckCircle2,
    };
  } else if (pagadoNum > 0 && saldoNum > 0) {
    return {
      label: txt[lang].paidPartial,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10 border-amber-400/30",
      icon: AlertCircle,
    };
  } else {
    return {
      label: txt[lang].paidPending,
      color: "text-red-400",
      bgColor: "bg-red-400/10 border-red-400/30",
      icon: XCircle,
    };
  }
}

/* ══════════════════════════════════════════════════════════════ */
export default function MiCuenta() {
  const { lang } = useLang();
  const t = txt[lang];

  const [participant, setParticipant] = useState<Participant | null>(null);
  const [myData, setMyData] = useState<MyDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const me = await api.me();
      setParticipant(me);
      if (me) {
        const data = await api.getMyData();
        setMyData(data);
      } else {
        setMyData(null);
      }
    } catch {
      setParticipant(null);
      setMyData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const isAuthenticated = !!participant;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080c1a] text-[#faf5eb]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="text-[#d4a843] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_50%)]" />
        <div className="container relative z-10 text-center">
          <Sparkles size={28} className="text-[#d4a843] mx-auto mb-4" />
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text mb-3">
            {t.pageTitle}
          </h1>
          <p className="text-[#faf5eb]/60 text-base md:text-lg">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32">
        <div className="container max-w-2xl">
          {isAuthenticated ? (
            <Dashboard
              lang={lang}
              t={t}
              participant={participant}
              myData={myData}
              onLogout={() => {
                setParticipant(null);
                setMyData(null);
              }}
            />
          ) : (
            <AuthForms lang={lang} t={t} onSuccess={fetchSession} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* AUTH FORMS */
/* ══════════════════════════════════════════════════════════════ */
function AuthForms({
  lang,
  t,
  onSuccess,
}: {
  lang: "es" | "en";
  t: (typeof txt)["es"];
  onSuccess: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (mode === "forgot") {
        await api.requestPasswordReset(email, window.location.origin);
        setSuccess(t.forgotSuccessMsg);
      } else if (mode === "login") {
        if (password.length < 6) {
          setError(t.errorPasswordShort);
          setIsSubmitting(false);
          return;
        }
        await api.login(email, password);
        onSuccess();
      } else {
        if (password.length < 6) {
          setError(t.errorPasswordShort);
          setIsSubmitting(false);
          return;
        }
        const result = await api.register(email, password, name || undefined);
        if (result.isInSheet) {
          setSuccess(t.successRegistered);
        } else {
          setSuccess(t.successNotInSheet);
        }
        onSuccess();
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg === "INVALID_CREDENTIALS") {
        setError(t.errorInvalidCredentials);
      } else if (msg === "ACCOUNT_EXISTS") {
        setError(t.errorAccountExists);
      } else {
        setError(t.errorGeneric);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // If forgot mode and success, show success message
  if (mode === "forgot" && success) {
    return (
      <div className="bg-[#0d1230]/60 rounded-2xl border border-[#d4a843]/20 p-8 text-center">
        <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-[#faf5eb] mb-2">
          {t.forgotSuccessTitle}
        </h3>
        <p className="text-sm text-[#faf5eb]/60 mb-6 max-w-md mx-auto">
          {success}
        </p>
        <button
          onClick={() => {
            setMode("login");
            setSuccess("");
            setEmail("");
          }}
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/40 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all text-sm uppercase tracking-wider font-medium"
        >
          <LogIn size={16} />
          {t.forgotBackToLogin}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1230]/60 rounded-2xl border border-[#d4a843]/20 overflow-hidden">
      {/* Tabs — hidden in forgot mode, show header instead */}
      {mode === "forgot" ? (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#d4a843]/20 bg-[#d4a843]/5">
          <KeyRound size={18} className="text-[#d4a843]" />
          <div>
            <p className="text-sm font-semibold text-[#faf5eb]/80 uppercase tracking-wider">
              {t.forgotTitle}
            </p>
            <p className="text-xs text-[#faf5eb]/50">{t.forgotSubtitle}</p>
          </div>
        </div>
      ) : (
        <div className="flex border-b border-[#d4a843]/20">
          <button
            onClick={() => {
              setMode("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              mode === "login"
                ? "text-[#d4a843] border-b-2 border-[#d4a843] bg-[#d4a843]/5"
                : "text-[#faf5eb]/50 hover:text-[#faf5eb]/70"
            }`}
          >
            <LogIn size={16} />
            {t.loginTab}
          </button>
          <button
            onClick={() => {
              setMode("register");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              mode === "register"
                ? "text-[#d4a843] border-b-2 border-[#d4a843] bg-[#d4a843]/5"
                : "text-[#faf5eb]/50 hover:text-[#faf5eb]/70"
            }`}
          >
            <UserPlus size={16} />
            {t.registerTab}
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertCircle
              size={18}
              className="text-red-400 mt-0.5 shrink-0"
            />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Success */}
        {success && mode !== "forgot" && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2
              size={18}
              className="text-emerald-400 mt-0.5 shrink-0"
            />
            <p className="text-sm text-emerald-300">{success}</p>
          </div>
        )}

        {/* Name (register only) */}
        {mode === "register" && (
          <div>
            <label className="block text-xs font-medium text-[#faf5eb]/60 uppercase tracking-wider mb-2">
              {t.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 bg-[#080c1a]/60 border border-[#faf5eb]/15 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/25 focus:outline-none focus:border-[#d4a843]/50 transition-all"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-[#faf5eb]/60 uppercase tracking-wider mb-2">
            {t.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              mode === "forgot" ? t.forgotEmailPlaceholder : t.emailPlaceholder
            }
            required
            className="w-full px-4 py-3 bg-[#080c1a]/60 border border-[#faf5eb]/15 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/25 focus:outline-none focus:border-[#d4a843]/50 transition-all"
          />
        </div>

        {/* Password (not for forgot mode) */}
        {mode !== "forgot" && (
          <div>
            <label className="block text-xs font-medium text-[#faf5eb]/60 uppercase tracking-wider mb-2">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                required
                className="w-full px-4 py-3 bg-[#080c1a]/60 border border-[#faf5eb]/15 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/25 focus:outline-none focus:border-[#d4a843]/50 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf5eb]/30 hover:text-[#faf5eb]/60 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {/* Forgot password link (login mode only) */}
        {mode === "login" && (
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setError("");
                setSuccess("");
              }}
              className="text-xs text-[#d4a843]/70 hover:text-[#d4a843] transition-colors"
            >
              {t.forgotPassword}
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-gradient-to-r from-[#d4a843] via-[#e8c35a] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && (
            <Loader2 size={18} className="inline animate-spin mr-2" />
          )}
          {mode === "forgot"
            ? isSubmitting
              ? t.forgotSending
              : t.forgotSendBtn
            : mode === "login"
            ? isSubmitting
              ? t.loggingIn
              : t.loginBtn
            : isSubmitting
            ? t.registering
            : t.registerBtn}
        </button>

        {/* Switch mode links */}
        {mode === "forgot" ? (
          <p className="text-center text-sm text-[#faf5eb]/40">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className="text-[#d4a843] hover:underline ml-1"
            >
              {t.forgotBackToLogin}
            </button>
          </p>
        ) : (
          <p className="text-center text-sm text-[#faf5eb]/40">
            {mode === "login" ? t.noAccount : t.hasAccount}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setSuccess("");
              }}
              className="text-[#d4a843] hover:underline"
            >
              {mode === "login" ? t.createOne : t.loginHere}
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* DASHBOARD */
/* ══════════════════════════════════════════════════════════════ */
function Dashboard({
  lang,
  t,
  participant,
  myData,
  onLogout,
}: {
  lang: "es" | "en";
  t: (typeof txt)["es"];
  participant: Participant;
  myData: MyDataResponse | null;
  onLogout: () => void;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.logout();
      onLogout();
    } catch {
      onLogout();
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-[#0d1230]/60 rounded-2xl border border-[#d4a843]/20 p-6 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a843]/20 to-[#e8842a]/20 border border-[#d4a843]/30 flex items-center justify-center">
              <User size={22} className="text-[#d4a843]" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-[#faf5eb]">
                {t.welcomeBack}, {participant?.name || participant?.email}!
              </h2>
              <p className="text-sm text-[#faf5eb]/50">{participant?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#faf5eb]/15 text-[#faf5eb]/60 hover:text-red-400 hover:border-red-400/30 transition-all text-sm"
          >
            <LogOut size={16} />
            {t.logoutBtn}
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      {myData?.data ? (
        <DashboardData lang={lang} t={t} data={myData.data} />
      ) : myData?.sheetsError ? (
        <SheetsErrorCard t={t} />
      ) : (
        <NotRegisteredCard t={t} />
      )}
    </div>
  );
}

/* ── Dashboard Data Cards ── */
function DashboardData({
  lang,
  t,
  data,
}: {
  lang: "es" | "en";
  t: (typeof txt)["es"];
  data: {
    nombre: string;
    paquete: string;
    competencia: string;
    participaciones: string;
    precioBase?: string;
    totalAPagar?: string;
    pagado: string;
    saldo: string;
    pagos?: { label: string; amount: string }[];
  };
}) {
  const paymentStatus = getPaymentStatus(data.pagado, data.saldo, lang);
  const PaymentIcon = paymentStatus.icon;

  const infoCards = [
    {
      icon: User,
      label: t.dashName,
      value: data.nombre || "—",
    },
    {
      icon: Package,
      label: t.dashPackage,
      value: data.paquete || "—",
    },
    {
      icon: Trophy,
      label: t.dashCompetition,
      value: data.competencia || "—",
    },
    {
      icon: Hash,
      label: t.dashParticipations,
      value: data.participaciones || "—",
    },
  ];

  // Generate bilingual payment labels on the frontend
  const pagoLabels = [
    `${t.pago} 1`,
    `${t.pago} 2`,
    `${t.pago} 3`,
    `${t.pago} 4`,
    `${t.pago} 5`,
    `${t.pago} 6`,
    t.paymentExtra,
  ];

  const hasPayments = data.pagos?.some((p) => hasRealAmount(p.amount));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-heading text-lg md:text-xl font-bold gold-text">
          {t.dashTitle}
        </h3>
        <p className="text-sm text-[#faf5eb]/50 mt-1">{t.dashSubtitle}</p>
      </div>

      {/* Info cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {infoCards.map((card) => (
          <div
            key={card.label}
            className="bg-[#0d1230]/60 rounded-xl border border-[#faf5eb]/10 p-5 hover:border-[#d4a843]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <card.icon size={16} className="text-[#d4a843]/70" />
              <span className="text-xs font-medium text-[#faf5eb]/50 uppercase tracking-wider">
                {card.label}
              </span>
            </div>
            <p className="text-lg font-semibold text-[#faf5eb] pl-7">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing section: Precio Base + Total a Pagar */}
      <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Tag size={18} className="text-[#d4a843]" />
          <h4 className="font-heading text-base font-bold text-[#faf5eb]">
            {lang === "es" ? "Detalle del Paquete" : "Package Details"}
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#080c1a]/60 rounded-lg p-4 border border-[#faf5eb]/5">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={14} className="text-[#d4a843]/70" />
              <span className="text-xs text-[#faf5eb]/50 uppercase tracking-wider">
                {t.dashPriceBase}
              </span>
            </div>
            <p className="text-xl font-bold text-[#d4a843] pl-5">
              {data.precioBase || "—"}
            </p>
          </div>
          <div className="bg-[#080c1a]/60 rounded-lg p-4 border border-[#faf5eb]/5">
            <div className="flex items-center gap-2 mb-1">
              <Calculator size={14} className="text-[#d4a843]/70" />
              <span className="text-xs text-[#faf5eb]/50 uppercase tracking-wider">
                {t.dashTotalToPay}
              </span>
            </div>
            <p className="text-xl font-bold text-[#d4a843] pl-5">
              {data.totalAPagar || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Payment status section: Pagado + Saldo */}
      <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign size={18} className="text-[#d4a843]" />
          <h4 className="font-heading text-base font-bold text-[#faf5eb]">
            {lang === "es" ? "Estado de Pago" : "Payment Status"}
          </h4>
        </div>

        {/* Payment status badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentStatus.bgColor} mb-4`}
        >
          <PaymentIcon size={16} className={paymentStatus.color} />
          <span className={`text-sm font-semibold ${paymentStatus.color}`}>
            {paymentStatus.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#080c1a]/60 rounded-lg p-4 border border-[#faf5eb]/5">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={14} className="text-emerald-400/70" />
              <span className="text-xs text-[#faf5eb]/50 uppercase tracking-wider">
                {t.dashPaid}
              </span>
            </div>
            <p className="text-xl font-bold text-emerald-400 pl-5">
              {data.pagado || "$0"}
            </p>
          </div>
          <div className="bg-[#080c1a]/60 rounded-lg p-4 border border-[#faf5eb]/5">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-amber-400/70" />
              <span className="text-xs text-[#faf5eb]/50 uppercase tracking-wider">
                {t.dashBalance}
              </span>
            </div>
            <p className="text-xl font-bold text-amber-400 pl-5">
              {data.saldo || "$0"}
            </p>
          </div>
        </div>
      </div>

      {/* Payment History section */}
      <div className="bg-[#0d1230]/60 rounded-xl border border-[#faf5eb]/10 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Receipt size={18} className="text-[#d4a843]" />
          <h4 className="font-heading text-base font-bold text-[#faf5eb]">
            {t.paymentHistory}
          </h4>
        </div>
        <p className="text-xs text-[#faf5eb]/40 mb-4 pl-8">
          {t.paymentHistoryDesc}
        </p>

        {hasPayments ? (
          <div className="space-y-2">
            {data.pagos?.map((pago, idx) => {
              const hasAmount = hasRealAmount(pago.amount);
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                    hasAmount
                      ? "bg-emerald-400/5 border-emerald-400/15"
                      : "bg-[#080c1a]/40 border-[#faf5eb]/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        hasAmount ? "bg-emerald-400" : "bg-[#faf5eb]/20"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        hasAmount ? "text-[#faf5eb]" : "text-[#faf5eb]/30"
                      }`}
                    >
                      {pagoLabels[idx] || pago.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      hasAmount ? "text-emerald-400" : "text-[#faf5eb]/20"
                    }`}
                  >
                    {hasAmount ? pago.amount : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-[#faf5eb]/30 text-sm">
            {t.noPayments}
          </div>
        )}
      </div>

      {/* WhatsApp - Request more services button */}
      <div className="text-center pt-2">
        <a
          href={`https://wa.me/5493872617777?text=${t.whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a843] via-[#e8c35a] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-[#d4a843]/25 transition-all hover:scale-[1.02]"
        >
          <MessageCircle size={20} />
          {t.dashRequestServices}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

/* ── Not Registered Card ── */
function NotRegisteredCard({ t }: { t: (typeof txt)["es"] }) {
  return (
    <div className="bg-[#0d1230]/60 rounded-2xl border border-amber-400/20 p-8 text-center">
      <AlertCircle size={40} className="text-amber-400 mx-auto mb-4" />
      <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
        {t.dashNotRegistered}
      </h3>
      <p className="text-sm text-[#faf5eb]/50 mb-6 max-w-md mx-auto">
        {t.dashNotRegisteredDesc}
      </p>
      <a
        href="https://wa.me/5493872617777"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all"
      >
        <MessageCircle size={18} />
        {t.dashWhatsApp}
      </a>
    </div>
  );
}

/* ── Sheets Error Card ── */
function SheetsErrorCard({ t }: { t: (typeof txt)["es"] }) {
  return (
    <div className="bg-[#0d1230]/60 rounded-2xl border border-red-400/20 p-8 text-center">
      <XCircle size={40} className="text-red-400 mx-auto mb-4" />
      <h3 className="font-heading text-lg font-bold text-[#faf5eb] mb-2">
        {t.dashSheetsError}
      </h3>
      <a
        href="https://wa.me/5493872617777"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 mt-4 border border-[#d4a843]/40 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all text-sm uppercase tracking-wider font-medium"
      >
        <MessageCircle size={18} />
        {t.dashWhatsApp}
      </a>
    </div>
  );
}
