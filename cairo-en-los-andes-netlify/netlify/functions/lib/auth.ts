/**
 * JWT-based participant authentication for Netlify Functions.
 * Uses jose for JWT signing/verification and cookie for parsing.
 */
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookieHeader } from "cookie";

export const PARTICIPANT_COOKIE_NAME = "participant_session";

export type ParticipantSessionPayload = {
  participantId: number;
  email: string;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not set");
  return new TextEncoder().encode(secret);
}

/**
 * Create a signed JWT for a participant session.
 */
export async function createParticipantSessionToken(
  participantId: number,
  email: string
): Promise<string> {
  const secret = getSecret();
  const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
  const expirationSeconds = Math.floor((Date.now() + ONE_YEAR_MS) / 1000);

  return new SignJWT({
    participantId,
    email,
    type: "participant",
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secret);
}

/**
 * Verify a participant session token and return the payload.
 */
export async function verifyParticipantSession(
  cookieValue: string | undefined | null
): Promise<ParticipantSessionPayload | null> {
  if (!cookieValue) return null;

  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(cookieValue, secret, {
      algorithms: ["HS256"],
    });

    const { participantId, email, type } = payload as Record<string, unknown>;

    if (type !== "participant") return null;
    if (typeof participantId !== "number" || typeof email !== "string")
      return null;

    return { participantId, email };
  } catch {
    return null;
  }
}

/**
 * Extract participant session from request cookie header.
 */
export function getParticipantFromCookies(
  cookieHeader: string | undefined
): Promise<ParticipantSessionPayload | null> {
  if (!cookieHeader) return Promise.resolve(null);

  const cookies = parseCookieHeader(cookieHeader);
  const sessionCookie = cookies[PARTICIPANT_COOKIE_NAME];

  return verifyParticipantSession(sessionCookie);
}

/**
 * Generate Set-Cookie header for participant session.
 */
export function makeSessionCookie(token: string): string {
  const maxAge = 60 * 60 * 24 * 365; // 1 year in seconds
  return `${PARTICIPANT_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`;
}

/**
 * Generate Set-Cookie header to clear participant session.
 */
export function makeClearSessionCookie(): string {
  return `${PARTICIPANT_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`;
}
