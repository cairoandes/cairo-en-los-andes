/**
 * Portal Organizador — Private dashboard for cairoandesfestival@gmail.com
 * Accessible at /organizador (not linked from public navigation).
 * Uses participant session (same login as Mi Cuenta).
 * Panels: Dashboard, Participantes, + all Google Sheet tabs.
 */
import { useState, useEffect, useCallback } from "react";
import { api, type OrganizerParticipant, type OrganizerSheetTab } from "@/lib/api";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Music,
  Hotel,
  ClipboardList,
  Percent,
  PiggyBank,
  Sparkles,
  LogOut,
  Menu,
  X,
  Loader2,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  FileSpreadsheet,
  Search,
} from "lucide-react";

/* ── Types ── */
type TabKey =
  | "dashboard"
  | "participantes"
  | "01_PAQUETES"
  | "02_GASTOS"
  | "03_ARTISTAS"
  | "04_HOTEL"
  | "05_RESPUESTAS"
  | "06_INSCRIPCIONES"
  | "07_OTROS_INGRESOS"
  | "08_COMISIONES"
  | "09_EXTRAS"
  | "10_RESUMEN";

type NavItem = {
  key: TabKey;
  label: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "participantes", label: "Participantes", icon: Users },
  { key: "06_INSCRIPCIONES", label: "Inscripciones", icon: ClipboardList },
  { key: "02_GASTOS", label: "Gastos", icon: Receipt },
  { key: "03_ARTISTAS", label: "Artistas", icon: Music },
  { key: "04_HOTEL", label: "Hotel", icon: Hotel },
  { key: "01_PAQUETES", label: "Paquetes", icon: FileSpreadsheet },
  { key: "07_OTROS_INGRESOS", label: "Otros Ingresos", icon: PiggyBank },
  { key: "08_COMISIONES", label: "Comisiones", icon: Percent },
  { key: "09_EXTRAS", label: "Extras", icon: Sparkles },
  { key: "10_RESUMEN", label: "Resumen", icon: TrendingUp },
  { key: "05_RESPUESTAS", label: "Respuestas", icon: FileSpreadsheet },
];

/* ══════════════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                                 */
/* ══════════════════════════════════════════════════════════════ */
export default function OrganizerPortal() {
  const [authState, setAuthState] = useState<"loading" | "login" | "denied" | "authenticated">("loading");
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if current session is the organizer
  useEffect(() => {
    api.organizerMe()
      .then((res) => {
        if (res.isOrganizer) {
          setAuthState("authenticated");
        } else if (res.email) {
          // Logged in but not the organizer
          setAuthState("denied");
        } else {
          setAuthState("login");
        }
      })
      .catch(() => {
        setAuthState("login");
      });
  }, []);

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#080c1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4a843]" />
      </div>
    );
  }

  if (authState === "login") {
    return <OrganizerLoginForm onSuccess={() => setAuthState("authenticated")} showAccessDenied={false} />;
  }

  if (authState === "denied") {
    return <OrganizerLoginForm onSuccess={() => setAuthState("authenticated")} showAccessDenied={true} />;
  }

  return (
    <div className="min-h-screen bg-[#080c1a] flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#0d1230] border border-[#d4a843]/20 p-2 rounded-lg text-[#faf5eb]"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0a0f24] border-r border-[#d4a843]/10 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#d4a843]/10">
            <h1 className="font-heading text-lg font-bold text-[#d4a843]">
              Portal Organizador
            </h1>
            <p className="text-xs text-[#faf5eb]/50 mt-1">Cairo en los Andes</p>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    isActive
                      ? "bg-[#d4a843]/10 text-[#d4a843] font-medium"
                      : "text-[#faf5eb]/60 hover:text-[#faf5eb] hover:bg-[#faf5eb]/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#d4a843]/10">
            <button
              onClick={() => {
                api.logout().then(() => window.location.reload());
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#faf5eb]/50 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
        {activeTab === "dashboard" && <DashboardPanel />}
        {activeTab === "participantes" && <ParticipantsPanel />}
        {activeTab !== "dashboard" && activeTab !== "participantes" && (
          <SheetPanel tabName={activeTab} />
        )}
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* LOGIN FORM                                                     */
/* ══════════════════════════════════════════════════════════════ */
function OrganizerLoginForm({
  onSuccess,
  showAccessDenied,
}: {
  onSuccess: () => void;
  showAccessDenied: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.login(email, password);
      // Check if this email is the organizer
      const check = await api.organizerMe();
      if (check.isOrganizer) {
        onSuccess();
      } else {
        setError("Esta cuenta no tiene permisos de organizador.");
      }
    } catch (err: any) {
      if (err.message === "INVALID_CREDENTIALS") {
        setError("Email o contraseña incorrectos.");
      } else {
        setError("Error al iniciar sesión. Intentá de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c1a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0d1230] rounded-xl border border-[#d4a843]/20 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a843]/10 border-2 border-[#d4a843]/30 flex items-center justify-center">
              <Sparkles size={28} className="text-[#d4a843]" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#faf5eb]">
              Portal Organizador
            </h1>
            <p className="text-sm text-[#faf5eb]/50 mt-1">
              Acceso exclusivo para el organizador del festival
            </p>
          </div>

          {/* Access denied warning */}
          {showAccessDenied && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400 shrink-0" />
              <span className="text-sm text-amber-300">
                Esta cuenta no tiene permisos de organizador.
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#faf5eb]/50 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#faf5eb]/50 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  className="w-full px-4 py-3 bg-[#080c1a] border border-[#d4a843]/20 rounded-lg text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf5eb]/40 hover:text-[#faf5eb]/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#080c1a] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              INICIAR SESIÓN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* DASHBOARD PANEL                                                */
/* ══════════════════════════════════════════════════════════════ */
function DashboardPanel() {
  const [resumen, setResumen] = useState<OrganizerSheetTab | null>(null);
  const [inscripciones, setInscripciones] = useState<OrganizerSheetTab | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.organizerSheet("10_RESUMEN"),
      api.organizerSheet("06_INSCRIPCIONES"),
    ])
      .then(([res, insc]) => {
        setResumen(res);
        setInscripciones(insc);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4a843]" />
      </div>
    );
  }

  // Parse resumen for KPIs
  const totalInscritos = inscripciones?.rows?.length || 0;

  // Try to extract financial data from resumen
  let totalCobrado = "—";
  let totalPendiente = "—";
  let totalGastos = "—";

  if (resumen && resumen.rows.length > 0) {
    // Look for key rows in resumen
    for (const row of resumen.rows) {
      const label = (row[0] || "").toString().toLowerCase();
      if (label.includes("cobrado") || label.includes("ingres")) {
        totalCobrado = row[1] || row[2] || "—";
      }
      if (label.includes("pendiente") || label.includes("saldo")) {
        totalPendiente = row[1] || row[2] || "—";
      }
      if (label.includes("gasto") || label.includes("egreso")) {
        totalGastos = row[1] || row[2] || "—";
      }
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-[#faf5eb] mb-6">
        Dashboard
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          icon={Users}
          label="Total Inscritos"
          value={totalInscritos.toString()}
          color="text-blue-400"
        />
        <KPICard
          icon={TrendingUp}
          label="Total Cobrado"
          value={totalCobrado}
          color="text-green-400"
        />
        <KPICard
          icon={TrendingDown}
          label="Pendiente"
          value={totalPendiente}
          color="text-amber-400"
        />
        <KPICard
          icon={DollarSign}
          label="Total Gastos"
          value={totalGastos}
          color="text-red-400"
        />
      </div>

      {/* Resumen table */}
      {resumen && resumen.rows.length > 0 && (
        <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/10 p-6">
          <h3 className="font-heading text-lg font-bold text-[#d4a843] mb-4">
            Resumen General
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#d4a843]/10">
                  {resumen.headers.map((h, i) => (
                    <th
                      key={i}
                      className="text-left py-2 px-3 text-[#faf5eb]/50 font-medium uppercase text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumen.rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#faf5eb]/5 hover:bg-[#faf5eb]/5"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 px-3 text-[#faf5eb]/80">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/10 p-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className={color} />
        <span className="text-xs uppercase tracking-wider text-[#faf5eb]/50">
          {label}
        </span>
      </div>
      <p className="font-heading text-2xl font-bold text-[#faf5eb]">{value}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* PARTICIPANTS PANEL                                             */
/* ══════════════════════════════════════════════════════════════ */
function ParticipantsPanel() {
  const [participants, setParticipants] = useState<OrganizerParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.organizerParticipants()
      .then((res) => setParticipants(res.participants))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = participants.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.email.toLowerCase().includes(q) ||
      (p.name || "").toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4a843]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-heading text-2xl font-bold text-[#faf5eb]">
          Participantes Registrados ({participants.length})
        </h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#faf5eb]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por email o nombre..."
            className="pl-9 pr-4 py-2 bg-[#0d1230] border border-[#d4a843]/20 rounded-lg text-sm text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 w-full sm:w-72"
          />
        </div>
      </div>

      <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d4a843]/10 bg-[#0a0f24]">
                <th className="text-left py-3 px-4 text-[#faf5eb]/50 font-medium uppercase text-xs">
                  #
                </th>
                <th className="text-left py-3 px-4 text-[#faf5eb]/50 font-medium uppercase text-xs">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-[#faf5eb]/50 font-medium uppercase text-xs">
                  Nombre
                </th>
                <th className="text-left py-3 px-4 text-[#faf5eb]/50 font-medium uppercase text-xs">
                  Registrado
                </th>
                <th className="text-left py-3 px-4 text-[#faf5eb]/50 font-medium uppercase text-xs">
                  Último acceso
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-[#faf5eb]/5 hover:bg-[#faf5eb]/5"
                >
                  <td className="py-3 px-4 text-[#faf5eb]/50">{i + 1}</td>
                  <td className="py-3 px-4 text-[#faf5eb]/80 font-mono text-xs">
                    {p.email}
                  </td>
                  <td className="py-3 px-4 text-[#faf5eb]/80">
                    {p.name || "—"}
                  </td>
                  <td className="py-3 px-4 text-[#faf5eb]/60 text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-[#faf5eb]/60 text-xs">
                    {new Date(p.lastSignedIn).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-[#faf5eb]/40"
                  >
                    {search ? "No se encontraron resultados" : "No hay participantes registrados"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* SHEET PANEL (generic for any tab)                              */
/* ══════════════════════════════════════════════════════════════ */
function SheetPanel({ tabName }: { tabName: string }) {
  const [data, setData] = useState<OrganizerSheetTab | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setSearch("");
    api.organizerSheet(tabName)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tabName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4a843]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-[#faf5eb]/40">
        Error al cargar los datos
      </div>
    );
  }

  // Filter rows by search
  const filtered = search
    ? data.rows.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
      )
    : data.rows;

  // Format tab name for display
  const displayName = tabName.replace(/^\d+_/, "").replace(/_/g, " ");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#faf5eb]">
            {displayName}
          </h2>
          <p className="text-sm text-[#faf5eb]/50 mt-1">
            {data.rows.length} registros
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#faf5eb]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 bg-[#0d1230] border border-[#d4a843]/20 rounded-lg text-sm text-[#faf5eb] placeholder-[#faf5eb]/30 focus:outline-none focus:border-[#d4a843]/50 w-full sm:w-72"
          />
        </div>
      </div>

      <div className="bg-[#0d1230]/60 rounded-xl border border-[#d4a843]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#d4a843]/10 bg-[#0a0f24]">
                {data.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left py-3 px-3 text-[#faf5eb]/50 font-medium uppercase text-xs whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#faf5eb]/5 hover:bg-[#faf5eb]/5"
                >
                  {data.headers.map((_, j) => (
                    <td
                      key={j}
                      className="py-2 px-3 text-[#faf5eb]/80 whitespace-nowrap max-w-[200px] truncate"
                    >
                      {row[j] || ""}
                    </td>
                  ))}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={data.headers.length}
                    className="py-8 text-center text-[#faf5eb]/40"
                  >
                    {search ? "No se encontraron resultados" : "Sin datos"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
