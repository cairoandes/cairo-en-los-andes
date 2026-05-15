/**
 * Google Sheets Service Account authentication helper.
 * Uses JWT (RS256) to get an OAuth2 access token for writing to Google Sheets.
 * Requires env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
 */
import { SignJWT, importPKCS8 } from "jose";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// Cache the access token to avoid re-fetching on every request
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get a valid OAuth2 access token for Google Sheets API writes.
 * Uses Service Account JWT assertion flow (RS256).
 */
export async function getServiceAccountAccessToken(): Promise<string> {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars"
    );
  }

  // The private key may have escaped newlines from env var storage
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  // Import the RSA private key
  const key = await importPKCS8(privateKey, "RS256");

  // Create the JWT assertion
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    scope: SHEETS_SCOPE,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience(TOKEN_URL)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600) // 1 hour
    .sign(key);

  // Exchange JWT for access token
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[SheetsAuth] Token exchange failed:", errText);
    throw new Error(`Google OAuth2 token exchange failed: ${res.status}`);
  }

  const data = await res.json();
  const accessToken = data.access_token as string;
  const expiresIn = (data.expires_in as number) || 3600;

  // Cache the token
  cachedToken = {
    token: accessToken,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  return accessToken;
}

/**
 * Append a row to a Google Sheets tab using Service Account auth.
 * @param sheetId - The spreadsheet ID
 * @param range - The A1 notation range (e.g., "05_RESPUESTAS!A:BZ")
 * @param row - Array of cell values
 * @returns true if successful
 */
export async function appendRowToSheet(
  sheetId: string,
  range: string,
  row: (string | number | boolean)[]
): Promise<boolean> {
  try {
    const accessToken = await getServiceAccountAccessToken();
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[SheetsAuth] Append failed:", errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[SheetsAuth] appendRowToSheet error:", err);
    return false;
  }
}
