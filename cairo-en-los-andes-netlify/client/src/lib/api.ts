/**
 * Simple API client for Netlify Functions.
 * Replaces tRPC calls with standard fetch requests.
 */

const API_BASE = "/api";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}/${path}`;
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    (error as any).status = res.status;
    throw error;
  }

  return data as T;
}

// ── Auth endpoints ──

export type Participant = {
  id: number;
  email: string;
  name: string | null;
};

export type SheetData = {
  nombre: string;
  paquete: string;
  competencia: string;
  participaciones: string;
  pagado: string;
  saldo: string;
  email: string;
};

export type MyDataResponse = {
  authenticated: boolean;
  participant?: Participant;
  data: SheetData | null;
  sheetsError?: boolean;
};

export const api = {
  register: (email: string, password: string, name?: string) =>
    request<{ success: boolean; isInSheet: boolean; participant: Participant }>(
      "register",
      { method: "POST", body: JSON.stringify({ email, password, name }) }
    ),

  login: (email: string, password: string) =>
    request<{ success: boolean; participant: Participant }>(
      "login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    ),

  me: () => request<Participant | null>("me"),

  logout: () =>
    request<{ success: boolean }>("logout", { method: "POST" }),

  getMyData: () => request<MyDataResponse>("my-data"),

  requestPasswordReset: (email: string, origin: string) =>
    request<{ success: boolean; message?: string }>(
      "request-reset",
      { method: "POST", body: JSON.stringify({ email, origin }) }
    ),

  verifyResetToken: (token: string) =>
    request<{ valid: boolean; email?: string }>(
      `verify-reset?token=${encodeURIComponent(token)}`
    ),

  resetPassword: (token: string, newPassword: string) =>
    request<{ success: boolean }>(
      "reset-password",
      { method: "POST", body: JSON.stringify({ token, newPassword }) }
    ),
};
