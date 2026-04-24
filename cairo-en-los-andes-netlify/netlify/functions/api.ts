/**
 * Main Netlify Function — single entry point for all /api/* routes.
 * Routes:
 *   POST /api/register
 *   POST /api/login
 *   GET  /api/me
 *   POST /api/logout
 *   GET  /api/my-data
 *   POST /api/request-reset
 *   GET  /api/verify-reset?token=...
 *   POST /api/reset-password
 *   GET  /api/init-db  (one-time setup)
 */
import type { Context } from "@netlify/functions";
import { initDb } from "./lib/db.js";
import {
  createParticipantSessionToken,
  getParticipantFromCookies,
  makeSessionCookie,
  makeClearSessionCookie,
} from "./lib/auth.js";
import {
  createParticipantAccount,
  verifyParticipantCredentials,
  getParticipantByEmail,
  getParticipantById,
} from "./lib/participantDb.js";
import { getParticipantDataByEmail } from "./lib/sheets.js";
import {
  createResetToken,
  verifyResetToken,
  resetPasswordWithToken,
} from "./lib/passwordReset.js";
import {
  jsonResponse,
  errorResponse,
  corsPreflightResponse,
} from "./lib/response.js";

export default async function handler(req: Request, context: Context) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return corsPreflightResponse();
  }

  const url = new URL(req.url);
  // The path after /api/ — Netlify redirects /api/* to /.netlify/functions/api/*
  // So we need to extract the route from the URL
  const pathParts = url.pathname.split("/");
  // Could be /.netlify/functions/api/register or /api/register
  const route = pathParts[pathParts.length - 1];

  try {
    switch (route) {
      case "register":
        return handleRegister(req);
      case "login":
        return handleLogin(req);
      case "me":
        return handleMe(req);
      case "logout":
        return handleLogout(req);
      case "my-data":
        return handleMyData(req);
      case "request-reset":
        return handleRequestReset(req);
      case "verify-reset":
        return handleVerifyReset(req, url);
      case "reset-password":
        return handleResetPassword(req);
      case "init-db":
        return handleInitDb();
      default:
        return errorResponse("Not found", 404);
    }
  } catch (err: unknown) {
    console.error("[API Error]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

// ── Register ──
async function handleRegister(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password) {
    return errorResponse("Email and password are required");
  }

  if (password.length < 6) {
    return errorResponse("Password must be at least 6 characters");
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if account already exists
  const existing = await getParticipantByEmail(normalizedEmail);
  if (existing) {
    return errorResponse("ACCOUNT_EXISTS", 409);
  }

  // Check if email exists in Google Sheet
  let sheetData = null;
  let isInSheet = false;
  try {
    sheetData = await getParticipantDataByEmail(normalizedEmail);
    isInSheet = sheetData !== null;
  } catch (err) {
    console.warn("[Register] Google Sheets lookup failed:", err);
  }

  // Create the account
  const account = await createParticipantAccount(
    normalizedEmail,
    password,
    name || sheetData?.nombre
  );

  // Create session token
  const token = await createParticipantSessionToken(account.id, account.email);

  return jsonResponse(
    {
      success: true,
      isInSheet,
      participant: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
    },
    200,
    { "Set-Cookie": makeSessionCookie(token) }
  );
}

// ── Login ──
async function handleLogin(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return errorResponse("Email and password are required");
  }

  const account = await verifyParticipantCredentials(email, password);
  if (!account) {
    return errorResponse("INVALID_CREDENTIALS", 401);
  }

  const token = await createParticipantSessionToken(account.id, account.email);

  return jsonResponse(
    {
      success: true,
      participant: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
    },
    200,
    { "Set-Cookie": makeSessionCookie(token) }
  );
}

// ── Me (get current session) ──
async function handleMe(req: Request) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const cookieHeader = req.headers.get("cookie") || undefined;
  const session = await getParticipantFromCookies(cookieHeader);

  if (!session) {
    return jsonResponse(null);
  }

  const account = await getParticipantById(session.participantId);
  if (!account) {
    return jsonResponse(null);
  }

  return jsonResponse({
    id: account.id,
    email: account.email,
    name: account.name,
  });
}

// ── Logout ──
async function handleLogout(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  return jsonResponse(
    { success: true },
    200,
    { "Set-Cookie": makeClearSessionCookie() }
  );
}

// ── Get My Data (from Google Sheet) ──
async function handleMyData(req: Request) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const cookieHeader = req.headers.get("cookie") || undefined;
  const session = await getParticipantFromCookies(cookieHeader);

  if (!session) {
    return jsonResponse({ authenticated: false, data: null });
  }

  const account = await getParticipantById(session.participantId);
  if (!account) {
    return jsonResponse({ authenticated: false, data: null });
  }

  try {
    const sheetData = await getParticipantDataByEmail(account.email);
    return jsonResponse({
      authenticated: true,
      participant: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
      data: sheetData,
    });
  } catch (err) {
    console.error("[MyData] Failed to fetch sheet data:", err);
    return jsonResponse({
      authenticated: true,
      participant: {
        id: account.id,
        email: account.email,
        name: account.name,
      },
      data: null,
      sheetsError: true,
    });
  }
}

// ── Request Password Reset ──
async function handleRequestReset(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { email, origin } = body;

  if (!email) return errorResponse("Email is required");

  const normalizedEmail = email.trim().toLowerCase();
  const account = await getParticipantByEmail(normalizedEmail);

  if (!account) {
    // Don't reveal whether the email exists
    console.log(`[PasswordReset] Reset requested for unknown email: ${normalizedEmail}`);
    return jsonResponse({ success: true });
  }

  const token = await createResetToken(account.id);
  const resetLink = `${origin || ""}/recuperar-password/${token}`;

  // Log the reset link (in production, you'd send this via email or notification)
  console.log(`[PasswordReset] Reset link for ${account.email}: ${resetLink}`);

  // For now, we return the reset link in the response so the admin can share it
  // In a real setup, this would be sent via email
  return jsonResponse({
    success: true,
    // NOTE: The reset link is also logged in Netlify Functions logs
    // Admin can check Netlify dashboard > Functions > Logs to find it
    message: "Si el email existe, se procesó la solicitud de recuperación.",
  });
}

// ── Verify Reset Token ──
async function handleVerifyReset(req: Request, url: URL) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const token = url.searchParams.get("token");
  if (!token) return jsonResponse({ valid: false });

  const result = await verifyResetToken(token);
  if (!result) {
    return jsonResponse({ valid: false });
  }

  const account = await getParticipantById(result.participantId);
  return jsonResponse({
    valid: true,
    email: account?.email || "",
  });
}

// ── Reset Password ──
async function handleResetPassword(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { token, newPassword } = body;

  if (!token || !newPassword) {
    return errorResponse("Token and new password are required");
  }

  if (newPassword.length < 6) {
    return errorResponse("Password must be at least 6 characters");
  }

  const success = await resetPasswordWithToken(token, newPassword);
  if (!success) {
    return errorResponse("INVALID_OR_EXPIRED_TOKEN", 400);
  }

  return jsonResponse({ success: true });
}

// ── Init DB (one-time setup) ──
async function handleInitDb() {
  await initDb();
  return jsonResponse({ success: true, message: "Database tables created" });
}
