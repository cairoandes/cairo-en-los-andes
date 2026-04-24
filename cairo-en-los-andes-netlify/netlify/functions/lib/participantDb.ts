/**
 * Database helpers for participant accounts using Turso (libsql).
 */
import { getDb } from "./db.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export type ParticipantAccount = {
  id: number;
  email: string;
  passwordHash: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  lastSignedIn: string;
};

/**
 * Create a new participant account with hashed password.
 */
export async function createParticipantAccount(
  email: string,
  password: string,
  name?: string
): Promise<ParticipantAccount> {
  const db = getDb();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO participant_accounts (email, passwordHash, name, createdAt, updatedAt, lastSignedIn)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [normalizedEmail, passwordHash, name || null, now, now, now],
  });

  // Fetch the created account
  const result = await db.execute({
    sql: "SELECT * FROM participant_accounts WHERE email = ?",
    args: [normalizedEmail],
  });

  const row = result.rows[0];
  if (!row) throw new Error("Failed to create account");

  return rowToAccount(row);
}

/**
 * Verify participant credentials and return the account if valid.
 */
export async function verifyParticipantCredentials(
  email: string,
  password: string
): Promise<ParticipantAccount | null> {
  const db = getDb();
  const normalizedEmail = email.trim().toLowerCase();

  const result = await db.execute({
    sql: "SELECT * FROM participant_accounts WHERE email = ?",
    args: [normalizedEmail],
  });

  const row = result.rows[0];
  if (!row) return null;

  const account = rowToAccount(row);
  const isValid = await bcrypt.compare(password, account.passwordHash);
  if (!isValid) return null;

  // Update last signed in
  await db.execute({
    sql: "UPDATE participant_accounts SET lastSignedIn = ? WHERE id = ?",
    args: [new Date().toISOString(), account.id],
  });

  return account;
}

/**
 * Get participant account by email.
 */
export async function getParticipantByEmail(
  email: string
): Promise<ParticipantAccount | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM participant_accounts WHERE email = ?",
    args: [email.trim().toLowerCase()],
  });

  const row = result.rows[0];
  return row ? rowToAccount(row) : null;
}

/**
 * Get participant account by ID.
 */
export async function getParticipantById(
  id: number
): Promise<ParticipantAccount | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM participant_accounts WHERE id = ?",
    args: [id],
  });

  const row = result.rows[0];
  return row ? rowToAccount(row) : null;
}

function rowToAccount(row: Record<string, unknown>): ParticipantAccount {
  return {
    id: row.id as number,
    email: row.email as string,
    passwordHash: row.passwordHash as string,
    name: (row.name as string) || null,
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
    lastSignedIn: row.lastSignedIn as string,
  };
}
