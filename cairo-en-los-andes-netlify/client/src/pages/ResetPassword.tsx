/**
 * Reset Password page — validates a token from the URL and lets the
 * participant set a new password.
 * Route: /recuperar-password/:token
 * Bilingual: ES / EN via LanguageContext.
 * Uses fetch API (Netlify Functions) instead of tRPC.
 */
import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  XCircle,
  Sparkles,
} from "lucide-react";

/* ── Translations ── */
const txt = {
  es: {
    pageTitle: "Recuperar Contraseña",
    pageSubtitle: "Ingresá tu nueva contraseña",
    newPasswordLabel: "Nueva contraseña",
    newPasswordPlaceholder: "Mínimo 6 caracteres",
    confirmPasswordLabel: "Confirmar contraseña",
    confirmPasswordPlaceholder: "Repetí tu nueva contraseña",
    resetBtn: "Cambiar Contraseña",
    resetting: "Cambiando...",
    successTitle: "¡Contraseña actualizada!",
    successMsg:
      "Tu contraseña fue cambiada exitosamente. Ya podés iniciar sesión con tu nueva contraseña.",
    goToLogin: "Ir a Iniciar Sesión",
    invalidTokenTitle: "Enlace inválido o expirado",
    invalidTokenMsg:
      "Este enlace de recuperación ya fue usado o expiró. Solicitá uno nuevo desde la página de Mi Cuenta.",
    goToAccount: "Ir a Mi Cuenta",
    verifyingToken: "Verificando enlace...",
    errorPasswordShort: "La contraseña debe tener al menos 6 caracteres",
    errorPasswordMismatch: "Las contraseñas no coinciden",
    errorExpired: "El enlace expiró o ya fue usado. Solicitá uno nuevo.",
    errorGeneric: "Ocurrió un error. Intentá de nuevo.",
    resetFor: "Recuperando contraseña para",
  },
  en: {
    pageTitle: "Reset Password",
    pageSubtitle: "Enter your new password",
    newPasswordLabel: "New password",
    newPasswordPlaceholder: "Minimum 6 characters",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "Repeat your new password",
    resetBtn: "Change Password",
    resetting: "Changing...",
    successTitle: "Password updated!",
    successMsg:
      "Your password was changed successfully. You can now log in with your new password.",
    goToLogin: "Go to Log In",
    invalidTokenTitle: "Invalid or expired link",
    invalidTokenMsg:
      "This recovery link has already been used or has expired. Request a new one from the My Account page.",
    goToAccount: "Go to My Account",
    verifyingToken: "Verifying link...",
    errorPasswordShort: "Password must be at least 6 characters",
    errorPasswordMismatch: "Passwords do not match",
    errorExpired:
      "The link has expired or was already used. Request a new one.",
    errorGeneric: "An error occurred. Please try again.",
    resetFor: "Resetting password for",
  },
};

export default function ResetPassword() {
  const { lang } = useLang();
  const t = txt[lang];
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/recuperar-password/:token");
  const token = params?.token || "";

  // Token verification state
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenEmail, setTokenEmail] = useState("");

  // Form state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setTokenLoading(false);
      return;
    }
    api
      .verifyResetToken(token)
      .then((result) => {
        setTokenValid(result.valid);
        setTokenEmail(result.email || "");
      })
      .catch(() => {
        setTokenValid(false);
      })
      .finally(() => {
        setTokenLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError(t.errorPasswordShort);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t.errorPasswordMismatch);
      return;
    }

    setIsResetting(true);
    try {
      await api.resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg === "INVALID_OR_EXPIRED_TOKEN") {
        setError(t.errorExpired);
      } else {
        setError(t.errorGeneric);
      }
    } finally {
      setIsResetting(false);
    }
  };

  // Loading state while verifying token
  if (tokenLoading) {
    return (
      <div className="min-h-screen bg-[#080c1a] text-[#faf5eb]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 size={32} className="text-[#d4a843] animate-spin" />
          <p className="text-[#faf5eb]/60">{t.verifyingToken}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Invalid or expired token
  if (!token || !tokenValid) {
    return (
      <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] overflow-x-hidden">
        <Navbar />
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <Sparkles size={28} className="text-[#d4a843] mx-auto mb-4" />
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text mb-3">
              {t.pageTitle}
            </h1>
          </div>
        </section>
        <section className="pb-24 md:pb-32">
          <div className="container max-w-lg">
            <div className="bg-[#0d1230]/60 rounded-2xl border border-red-400/20 p-8 text-center">
              <XCircle size={48} className="text-red-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-[#faf5eb] mb-3">
                {t.invalidTokenTitle}
              </h3>
              <p className="text-sm text-[#faf5eb]/50 mb-6">
                {t.invalidTokenMsg}
              </p>
              <button
                onClick={() => navigate("/mi-cuenta")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all"
              >
                {t.goToAccount}
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] overflow-x-hidden">
        <Navbar />
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <Sparkles size={28} className="text-[#d4a843] mx-auto mb-4" />
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-text mb-3">
              {t.pageTitle}
            </h1>
          </div>
        </section>
        <section className="pb-24 md:pb-32">
          <div className="container max-w-lg">
            <div className="bg-[#0d1230]/60 rounded-2xl border border-emerald-400/20 p-8 text-center">
              <ShieldCheck
                size={48}
                className="text-emerald-400 mx-auto mb-4"
              />
              <h3 className="font-heading text-xl font-bold text-[#faf5eb] mb-3">
                {t.successTitle}
              </h3>
              <p className="text-sm text-[#faf5eb]/50 mb-6">{t.successMsg}</p>
              <button
                onClick={() => navigate("/mi-cuenta")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all"
              >
                {t.goToLogin}
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Reset form
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

      {/* Form */}
      <section className="pb-24 md:pb-32">
        <div className="container max-w-lg">
          <div className="bg-[#0d1230]/60 rounded-2xl border border-[#d4a843]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 md:px-8 md:py-5 border-b border-[#d4a843]/20 bg-[#d4a843]/5">
              <KeyRound size={20} className="text-[#d4a843]" />
              <div>
                <p className="text-sm font-semibold text-[#faf5eb]/80 uppercase tracking-wider">
                  {t.resetFor}
                </p>
                <p className="text-sm text-[#d4a843]">{tokenEmail}</p>
              </div>
            </div>

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

              {/* New password */}
              <div>
                <label className="block text-sm font-medium text-[#faf5eb]/70 mb-2">
                  {t.newPasswordLabel}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t.newPasswordPlaceholder}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-[#080c1a]/80 border border-[#faf5eb]/15 text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 focus:ring-1 focus:ring-[#d4a843]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf5eb]/40 hover:text-[#faf5eb]/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-[#faf5eb]/70 mb-2">
                  {t.confirmPasswordLabel}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.confirmPasswordPlaceholder}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-[#080c1a]/80 border border-[#faf5eb]/15 text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 focus:ring-1 focus:ring-[#d4a843]/30 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isResetting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isResetting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.resetting}
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    {t.resetBtn}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
