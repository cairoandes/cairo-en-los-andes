/**
 * Password reset helpers — token generation, validation, and password update.
 * Uses Turso (libsql) instead of MySQL/Drizzle.
 */
import { randomBytes } from "crypto";
import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

function generateToken(): string {
  return randomBytes(48).toString("hex"); // 96 chars
}

/**
 * Create a password reset token for a participant.
 */
export async function createResetToken(participantId: number): Promise<string> {
  const db = getDb();
  const token = generateToken();
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MS).toISOString();
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO password_reset_tokens (participantId, token, expiresAt, createdAt)
          VALUES (?, ?, ?, ?)`,
    args: [participantId, token, expiresAt, now],
  });

  return token;
}

/**
 * Verify a reset token and return the associated participant ID.
 */
export async function verifyResetToken(
  token: string
): Promise<{ participantId: number } | null> {
  const db = getDb();
  const now = new Date().toISOString();

  const result = await db.execute({
    sql: `SELECT * FROM password_reset_tokens
          WHERE token = ? AND usedAt IS NULL AND expiresAt > ?
          LIMIT 1`,
    args: [token, now],
  });

  const row = result.rows[0];
  if (!row) return null;

  return { participantId: row.participantId as number };
}

/**
 * Use a reset token to set a new password.
 */
export async function resetPasswordWithToken(
  token: string,
  newPassword: string
): Promise<boolean> {
  const tokenData = await verifyResetToken(token);
  if (!tokenData) return false;

  const db = getDb();
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const now = new Date().toISOString();

  // Update the password
  await db.execute({
    sql: "UPDATE participant_accounts SET passwordHash = ?, updatedAt = ? WHERE id = ?",
    args: [passwordHash, now, tokenData.participantId],
  });

  // Mark the token as used
  await db.execute({
    sql: "UPDATE password_reset_tokens SET usedAt = ? WHERE token = ?",
    args: [now, token],
  });

  return true;
}
