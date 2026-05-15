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
 *   GET  /api/organizer-me  (organizer session check)
 *   GET  /api/organizer-participants  (list all registered accounts)
 *   GET  /api/organizer-sheet?tab=...  (fetch a specific sheet tab)
 *   GET  /api/organizer-tabs  (list available tabs)
 */
import type { Context } from "@netlify/functions";
import { initDb, getDb } from "./lib/db.js";
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
  getAllParticipants,
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
import {
  fetchSheetTab,
  getAvailableTabs,
  type SheetTabName,
} from "./lib/organizerSheets.js";
import { appendRowToSheet } from "./lib/sheetsAuth.js";
import { notifyOrganizer, notifyNewInscription, notifyNewDirectPurchase } from "./lib/whatsappNotify.js";

// ── Organizer email (only this email can access organizer endpoints) ──
const ORGANIZER_EMAILS = [
  "cairoandesfestival@gmail.com",
  "khalilthedancer@gmail.com",
];

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
      // ── Inscription endpoint ──
      case "inscription-submit":
        return handleInscriptionSubmit(req);
      // ── Payment endpoints ──
      case "paypal-create":
        return handlePaypalCreate(req);
      case "mp-create":
        return handleMPCreate(req);
      // ── Direct purchase endpoints (galas/sponsors) ──
      case "direct-purchase":
        return handleDirectPurchase(req);
      case "direct-purchase-mark-paid":
        return handleDirectPurchaseMarkPaid(req);
      case "test-whatsapp":
        return handleTestWhatsapp();
      // ── Organizer endpoints ──
      case "organizer-me":
        return handleOrganizerMe(req);
      case "organizer-participants":
        return handleOrganizerParticipants(req);
      case "organizer-sheet":
        return handleOrganizerSheet(req, url);
      case "organizer-tabs":
        return handleOrganizerTabs(req);
      default:
        return errorResponse("Not found", 404);
    }
  } catch (err: unknown) {
    console.error("[API Error]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

// ── Helper: verify organizer session ──
async function verifyOrganizerSession(req: Request): Promise<{ isOrganizer: boolean; email?: string }> {
  const cookieHeader = req.headers.get("cookie") || undefined;
  const session = await getParticipantFromCookies(cookieHeader);

  if (!session) {
    return { isOrganizer: false };
  }

  if (!ORGANIZER_EMAILS.includes(session.email.toLowerCase())) {
    return { isOrganizer: false };
  }

  return { isOrganizer: true, email: session.email };
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

// ══════════════════════════════════════════════════════════════
// ORGANIZER ENDPOINTS (restricted to cairoandesfestival@gmail.com)
// ══════════════════════════════════════════════════════════════

// ── Organizer Me (check if current session is the organizer) ──
async function handleOrganizerMe(req: Request) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const { isOrganizer, email } = await verifyOrganizerSession(req);

  return jsonResponse({
    isOrganizer,
    email: email || null,
  });
}

// ── Organizer Participants (list all registered accounts) ──
async function handleOrganizerParticipants(req: Request) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const { isOrganizer } = await verifyOrganizerSession(req);
  if (!isOrganizer) {
    return errorResponse("ACCESS_DENIED", 403);
  }

  const participants = await getAllParticipants();
  return jsonResponse({ participants });
}

// ── Organizer Sheet (fetch a specific tab) ──
async function handleOrganizerSheet(req: Request, url: URL) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const { isOrganizer } = await verifyOrganizerSession(req);
  if (!isOrganizer) {
    return errorResponse("ACCESS_DENIED", 403);
  }

  const tab = url.searchParams.get("tab") as SheetTabName | null;
  if (!tab) {
    return errorResponse("tab parameter is required");
  }

  const availableTabs = getAvailableTabs();
  if (!availableTabs.includes(tab)) {
    return errorResponse(`Invalid tab: ${tab}. Available: ${availableTabs.join(", ")}`);
  }

  const data = await fetchSheetTab(tab);
  return jsonResponse(data);
}

// ── Organizer Tabs (list available tabs) ──
async function handleOrganizerTabs(req: Request) {
  if (req.method !== "GET") return errorResponse("Method not allowed", 405);

  const { isOrganizer } = await verifyOrganizerSession(req);
  if (!isOrganizer) {
    return errorResponse("ACCESS_DENIED", 403);
  }

  return jsonResponse({ tabs: getAvailableTabs() });
}

// ── Inscription Submit ──
async function handleInscriptionSubmit(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();

  // Validate required fields
  if (!body.nombre || !body.apellido || !body.email || !body.paquete) {
    return errorResponse("Missing required fields", 400);
  }

  // Map package keys to labels
  const paqueteLabels: Record<string, string> = {
    paquete1: "Paquete 1 – Sin hotel (USD 179)",
    paquete2: "Paquete 2 – Hotel Boutique (USD 240)",
    paquete3: "Paquete 3 – Sheraton (USD 680)",
  };

  // Map participation keys to labels
  const participacionLabels: Record<string, string> = {
    gala: "Solo Gala",
    competencia: "Solo Competencia",
    gala_competencia: "Gala + Competencia",
  };

  // Build a row for Google Sheets
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const row = [
    timestamp,
    body.nombre || "",
    body.apellido || "",
    body.nombreArtistico || "",
    body.fechaNacimiento || "",
    body.nacionalidad || "",
    body.ciudadResidencia || "",
    body.email || "",
    body.telefono || "",
    body.instagram || "",
    body.facebook || "",
    paqueteLabels[body.paquete] || body.paquete || "",
    body.confirmaPaquete ? "Sí" : "No",
    participacionLabels[body.participacion] || body.participacion || "",
    body.cantidadNumeros || "",
    // Gala 1-3
    body.gala1Tipo || "", body.gala1Bailarines || "", body.gala1Titulo || "", body.gala1Estilo || "", body.gala1Duracion || "",
    body.gala2Tipo || "", body.gala2Bailarines || "", body.gala2Titulo || "", body.gala2Estilo || "", body.gala2Duracion || "",
    body.gala3Tipo || "", body.gala3Bailarines || "", body.gala3Titulo || "", body.gala3Estilo || "", body.gala3Duracion || "",
    // Comp 1-3
    body.comp1Nivel || "", body.comp1Tipo || "", body.comp1Bailarines || "", body.comp1Estilo || "", body.comp1Titulo || "", body.comp1Duracion || "",
    body.comp2Nivel || "", body.comp2Tipo || "", body.comp2Bailarines || "", body.comp2Estilo || "", body.comp2Titulo || "", body.comp2Duracion || "",
    body.comp3Nivel || "", body.comp3Tipo || "", body.comp3Bailarines || "", body.comp3Estilo || "", body.comp3Titulo || "", body.comp3Duracion || "",
    // Acompañante
    body.tieneAcompanante || "no", body.cantidadAcompanantes || "", body.relacionAcompanante || "",
    body.acompananteGala ? "Sí" : "No", body.acompananteHotel ? "Sí" : "No", body.acompananteNoParticipa ? "Sí" : "No",
    // Hotel
    body.tipoHabitacion || "", body.solicitaCambioHabitacion ? "Sí" : "No",
    body.nochesExtra || "no", body.cantidadNochesExtra || "", body.modalidadHabitacion || "",
    // Grupo
    body.nombreEscuela || "", body.nombreDirector || "", body.cantidadBailarines || "",
    // Logística
    body.infoTraslados ? "Sí" : "No", body.infoTurismo ? "Sí" : "No",
    // Confirmación
    body.confirmaDatos ? "Sí" : "No", body.aceptaTerminos ? "Sí" : "No", body.nombreCompletoFirma || "",
  ];

  // Try to append to Google Sheets (05_RESPUESTAS tab) using Service Account
  const ORGANIZER_SHEET_ID = "1-Ml74ABa2UkFxiDr6NqNNEXoRJD-Fuzwk_TziMntLN0";

  let sheetSuccess = false;
  try {
    sheetSuccess = await appendRowToSheet(
      ORGANIZER_SHEET_ID,
      "INSCRIPCIONES_WEB!A:BZ",
      row
    );
  } catch (e) {
    console.error("[Inscription] Google Sheets append failed:", e);
  }

  // Also save to local DB
  try {
    const db = getDb();
    await db.execute({
      sql: `INSERT INTO inscriptions (email, nombre, apellido, paquete, participacion, form_data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        body.email,
        body.nombre,
        body.apellido,
        body.paquete,
        body.participacion || "",
        JSON.stringify(body),
        Date.now(),
      ],
    });
  } catch (e) {
    console.error("[Inscription] DB insert failed:", e);
  }

  // Get the last inserted ID
  let inscriptionId: number | null = null;
  try {
    const db2 = getDb();
    const lastRow = await db2.execute({
      sql: `SELECT id FROM inscriptions WHERE email = ? ORDER BY id DESC LIMIT 1`,
      args: [body.email],
    });
    if (lastRow.rows.length > 0) {
      inscriptionId = Number(lastRow.rows[0].id);
    }
  } catch (e) {
    console.error("[Inscription] Failed to get inscription ID:", e);
  }

  // Send WhatsApp notification to organizer
  let whatsappSent = false;
  try {
    await notifyNewInscription({
      nombre: body.nombre,
      apellido: body.apellido,
      email: body.email,
      paquete: body.paquete,
      telefono: body.telefono,
    });
    whatsappSent = true;
  } catch (e) {
    console.error("[WhatsApp] notification error:", e);
  }

  return jsonResponse({ success: true, sheetSuccess, inscriptionId, whatsappSent });
}

// ══════════════════════════════════════════════════════════════
// PAYMENT ENDPOINTS
// ══════════════════════════════════════════════════════════════

const PAQUETE_LABELS: Record<string, string> = {
  paquete1: "Paquete 1 \u2013 Sin hotel (USD 179)",
  paquete2: "Paquete 2 \u2013 Hotel Boutique (USD 240)",
  paquete3: "Paquete 3 \u2013 Sheraton (USD 680)",
  // Galas
  gala_opening: "Opening Gala \u2013 Entrada (USD 70)",
  gala_cairoandes: "Gala Cairo Andes \u2013 Entrada (USD 20)",
  gala_closing: "Closing Gala \u2013 Entrada (USD 25)",
  gala_combo: "Combo 3 Galas \u2013 Promo (USD 90)",
  // Sponsors
  sponsor_bronce: "Sponsor Bronce (USD 100)",
  sponsor_plata: "Sponsor Plata (USD 200)",
  sponsor_oro: "Sponsor Oro (USD 300)",
};

const PAQUETE_PRICES_USD: Record<string, string> = {
  paquete1: "179.00",
  paquete2: "240.00",
  paquete3: "680.00",
  // Galas
  gala_opening: "70.00",
  gala_cairoandes: "20.00",
  gala_closing: "25.00",
  gala_combo: "90.00",
  // Sponsors
  sponsor_bronce: "100.00",
  sponsor_plata: "200.00",
  sponsor_oro: "300.00",
};

const PAQUETE_PRICES_USD_NUM: Record<string, number> = {
  paquete1: 179,
  paquete2: 240,
  paquete3: 680,
  // Galas
  gala_opening: 70,
  gala_cairoandes: 20,
  gala_closing: 25,
  gala_combo: 90,
  // Sponsors
  sponsor_bronce: 100,
  sponsor_plata: 200,
  sponsor_oro: 300,
};

// ── PayPal Create Order ──
async function handlePaypalCreate(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
   const { inscriptionId, paquete, origin } = body;
  if (inscriptionId === undefined || inscriptionId === null || !paquete || !origin) {
    return errorResponse("Missing required fields", 400);
  }
  const amount = PAQUETE_PRICES_USD[paquete] || "179.00";
  const description = PAQUETE_LABELS[paquete] || "Cairo en los Andes Festival";

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  if (!clientId || !secret) {
    return errorResponse("PayPal not configured", 500);
  }

  // Get PayPal access token
  const tokenRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!tokenRes.ok) {
    return errorResponse("PayPal auth failed", 502);
  }

  const { access_token } = await tokenRes.json();

  // Create order
  const orderRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description,
        custom_id: `inscription-${inscriptionId}`,
        amount: {
          currency_code: "USD",
          value: amount,
        },
      }],
      application_context: {
        brand_name: "Cairo en los Andes Festival",
        return_url: `${origin}/pago-exitoso?provider=paypal&order_id=${inscriptionId}`,
        cancel_url: `${origin}/inscripcion?payment=cancelled`,
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!orderRes.ok) {
    const err = await orderRes.text();
    console.error("[PayPal] Create order failed:", err);
    return errorResponse("PayPal order creation failed", 502);
  }

  const orderData = await orderRes.json();
  const approvalLink = orderData.links?.find((l: any) => l.rel === "approve");

  return jsonResponse({
    orderId: orderData.id,
    approvalUrl: approvalLink?.href || null,
  });
}

// ── MercadoPago Create Preference ──
async function handleMPCreate(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
    const { inscriptionId, paquete, email, origin } = body;
  if ((inscriptionId === undefined || inscriptionId === null) || !paquete || !email || !origin) {
    return errorResponse("Missing required fields", 400);
  }
  const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpToken) {
    return errorResponse("MercadoPago not configured", 500);
  }

  // Get exchange rate
  const usdPrice = PAQUETE_PRICES_USD_NUM[paquete] || 179;
  let arsAmount: number;
  let rate: number;

  try {
    // Try Bluelytics first
    const rateRes = await fetch("https://api.bluelytics.com.ar/v2/latest", { signal: AbortSignal.timeout(5000) });
    const rateData = await rateRes.json();
    rate = rateData.oficial?.value_sell || rateData.oficial?.value_avg || 1400;
  } catch {
    try {
      // Fallback to DolarAPI
      const rateRes = await fetch("https://dolarapi.com/v1/dolares/oficial", { signal: AbortSignal.timeout(5000) });
      const rateData = await rateRes.json();
      rate = rateData.venta || 1400;
    } catch {
      rate = 1400; // Last resort fallback
    }
  }

  arsAmount = Math.round(usdPrice * rate);

  const title = PAQUETE_LABELS[paquete] || "Cairo en los Andes Festival";

  const prefRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mpToken}`,
    },
    body: JSON.stringify({
      items: [{
        title,
        description: `Inscripci\u00f3n #${inscriptionId} - ${title} (USD ${usdPrice} \u00d7 $${rate})`,
        quantity: 1,
        unit_price: arsAmount,
        currency_id: "ARS",
      }],
      payer: { email },
      back_urls: {
        success: `${origin}/pago-exitoso?provider=mercadopago`,
        failure: `${origin}/inscripcion?payment=failed`,
        pending: `${origin}/pago-exitoso?provider=mercadopago&status=pending`,
      },
      auto_return: "approved",
      external_reference: `inscription-${inscriptionId}`,
      statement_descriptor: "CAIRO ANDES",
    }),
  });

  if (!prefRes.ok) {
    const err = await prefRes.text();
    console.error("[MercadoPago] Create preference failed:", err);
    return errorResponse("MercadoPago preference creation failed", 502);
  }

  const prefData = await prefRes.json();

  return jsonResponse({
    preferenceId: prefData.id,
    initPoint: prefData.init_point,
  });
}


// ── Direct Purchase (galas/sponsors) ──
async function handleDirectPurchase(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { nombre, email, telefono, producto, paymentProvider, origin } = body;

  if (!nombre || !email || !telefono || !producto || !paymentProvider || !origin) {
    return errorResponse("Missing required fields (nombre, email, telefono, producto, paymentProvider, origin)", 400);
  }

  const productoLabel = PAQUETE_LABELS[producto];
  const montoUSD = PAQUETE_PRICES_USD_NUM[producto];
  if (!productoLabel || !montoUSD) {
    return errorResponse(`Invalid product key: ${producto}`, 400);
  }

  await initDb();
  const db = getDb();

  // 1. Save to database with PENDIENTE status
  const insertResult = await db.execute({
    sql: `INSERT INTO direct_purchases (nombre, email, telefono, producto, productoLabel, montoUSD, estado, paymentProvider)
          VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE', ?)`,
    args: [nombre.trim(), email.trim().toLowerCase(), telefono.trim(), producto, productoLabel, montoUSD, paymentProvider],
  });
  const purchaseId = Number(insertResult.lastInsertRowid);

  // 2. Attempt Google Sheets sync (06_COMPRAS_DIRECTAS tab) using Service Account
  try {
    const sheetId = "1-Ml74ABa2UkFxiDr6NqNNEXoRJD-Fuzwk_TziMntLN0";
    const timestamp = new Date().toISOString();
    const row = [timestamp, nombre.trim(), email.trim().toLowerCase(), telefono.trim(), producto, productoLabel, `$${montoUSD}`, "PENDIENTE", paymentProvider];
    const synced = await appendRowToSheet(
      sheetId,
      "COMPRAS_DIRECTAS_WEB!A:I",
      row
    );
    if (synced) {
      await db.execute({ sql: `UPDATE direct_purchases SET sheetSynced = 1 WHERE id = ?`, args: [purchaseId] });
    }
  } catch (err) {
    console.error("[DirectPurchase] Sheet sync error:", err);
  }

  // 3. Send WhatsApp notification to organizer
  try {
    await notifyNewDirectPurchase({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      productoLabel,
      montoUSD,
      paymentProvider,
    });
  } catch (e) {
    console.error("[WhatsApp] direct purchase notification error:", e);
  }

  // 4. Create payment based on provider
  let redirectUrl: string | null = null;

  if (paymentProvider === "paypal") {
    const amount = PAQUETE_PRICES_USD[producto] || `${montoUSD}.00`;
    const description = productoLabel;
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    if (!paypalClientId || !paypalSecret) return errorResponse("PayPal not configured", 500);

    const authRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${paypalClientId}:${paypalSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const authData = await authRes.json();
    const accessToken = authData.access_token;

    const orderRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "USD", value: amount },
          description,
          custom_id: `direct-${purchaseId}`,
        }],
        application_context: {
          brand_name: "Cairo en los Andes Festival",
          return_url: `${origin}/pago-exitoso?provider=paypal&type=direct&purchase_id=${purchaseId}`,
          cancel_url: `${origin}/?payment=cancelled`,
          user_action: "PAY_NOW",
        },
      }),
    });
    const orderData = await orderRes.json();
    const approvalLink = orderData.links?.find((l: any) => l.rel === "approve");
    await db.execute({ sql: `UPDATE direct_purchases SET paymentId = ? WHERE id = ?`, args: [orderData.id, purchaseId] });
    redirectUrl = approvalLink?.href || null;

  } else if (paymentProvider === "mercadopago") {
    const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!mpToken) return errorResponse("MercadoPago not configured", 500);

    const usdPrice = montoUSD;
    let rate: number;
    try {
      const rateRes = await fetch("https://api.bluelytics.com.ar/v2/latest", { signal: AbortSignal.timeout(5000) });
      const rateData = await rateRes.json();
      rate = rateData.oficial?.value_sell || rateData.oficial?.value_avg || 1400;
    } catch {
      try {
        const rateRes = await fetch("https://dolarapi.com/v1/dolares/oficial", { signal: AbortSignal.timeout(5000) });
        const rateData = await rateRes.json();
        rate = rateData.venta || 1400;
      } catch {
        rate = 1400;
      }
    }
    const arsAmount = Math.round(usdPrice * rate);

    const prefRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mpToken}`,
      },
      body: JSON.stringify({
        items: [{
          title: productoLabel,
          description: `Compra #${purchaseId} - ${productoLabel} (USD ${usdPrice} × $${rate})`,
          quantity: 1,
          unit_price: arsAmount,
          currency_id: "ARS",
        }],
        payer: { email: email.trim().toLowerCase() },
        back_urls: {
          success: `${origin}/pago-exitoso?provider=mercadopago&type=direct&purchase_id=${purchaseId}`,
          failure: `${origin}/?payment=failed`,
          pending: `${origin}/pago-exitoso?provider=mercadopago&type=direct&purchase_id=${purchaseId}&status=pending`,
        },
        auto_return: "approved",
        external_reference: `direct-${purchaseId}`,
        statement_descriptor: "CAIRO ANDES",
      }),
    });
    if (!prefRes.ok) {
      const err = await prefRes.text();
      console.error("[DirectPurchase] MercadoPago error:", err);
      return errorResponse("MercadoPago preference creation failed", 502);
    }
    const prefData = await prefRes.json();
    await db.execute({ sql: `UPDATE direct_purchases SET paymentId = ? WHERE id = ?`, args: [prefData.id, purchaseId] });
    redirectUrl = prefData.init_point;

  } else if (paymentProvider === "whatsapp") {
    redirectUrl = `https://wa.me/5493874671946?text=${encodeURIComponent(
      `Hola! Quiero comprar: ${productoLabel}. Mi nombre es ${nombre}, email: ${email}, tel: ${telefono}`
    )}`;
  }

  return jsonResponse({
    success: true,
    purchaseId,
    redirectUrl,
  });
}

// ── Mark Direct Purchase as Paid ──
async function handleDirectPurchaseMarkPaid(req: Request) {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);

  const body = await req.json();
  const { purchaseId } = body;
  if (!purchaseId || typeof purchaseId !== "number") {
    return errorResponse("Missing or invalid purchaseId", 400);
  }

  await initDb();
  const db = getDb();
  await db.execute({
    sql: `UPDATE direct_purchases SET estado = 'PAGADO', updatedAt = datetime('now') WHERE id = ?`,
    args: [purchaseId],
  });

  return jsonResponse({ success: true });
}

// ══════════════════════════════════════════════════════════════
// TEST WHATSAPP ENDPOINT (temporary - for debugging)
// ══════════════════════════════════════════════════════════════
async function handleTestWhatsapp(): Promise<Response> {
  const result = await notifyOrganizer("Test desde Netlify Functions");
  return jsonResponse({ whatsapp: result });
}
