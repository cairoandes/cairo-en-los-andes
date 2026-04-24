/**
 * Shared response helpers for Netlify Functions.
 */

// No CORS headers needed — frontend and functions share the same Netlify domain.
// Cookies work natively without cross-origin configuration.
const CORS_HEADERS: Record<string, string> = {};

export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

export function corsPreflightResponse() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
