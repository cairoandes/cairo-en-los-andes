/**
 * Turso (libsql) database connection for Netlify Functions.
 * Uses environment variables TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.
 */
import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !authToken) {
      throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set");
    }

    client = createClient({ url, authToken });
  }
  return client;
}

/**
 * Initialize the database tables if they don't exist.
 */
export async function initDb(): Promise<void> {
  const db = getDb();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS participant_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      name TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      lastSignedIn TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participantId INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expiresAt TEXT NOT NULL,
      usedAt TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (participantId) REFERENCES participant_accounts(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS direct_purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT NOT NULL,
      producto TEXT NOT NULL,
      productoLabel TEXT NOT NULL,
      montoUSD INTEGER NOT NULL,
      estado TEXT NOT NULL DEFAULT 'PENDIENTE',
      paymentProvider TEXT,
      paymentId TEXT,
      sheetSynced INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS inscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      paquete TEXT NOT NULL,
      participacion TEXT DEFAULT '',
      form_data TEXT,
      created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
    )
  `);

  // Profile & Referral tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS participant_profiles (
      participantId INTEGER PRIMARY KEY,
      city TEXT,
      photoUrl TEXT,
      danceStyles TEXT DEFAULT '[]',
      referralCode TEXT NOT NULL UNIQUE,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (participantId) REFERENCES participant_accounts(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS referrals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      referrerParticipantId INTEGER NOT NULL,
      referredEmail TEXT NOT NULL,
      referredName TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (referrerParticipantId) REFERENCES participant_accounts(id)
    )
  `);
}
