/**
 * Database helpers for participant profiles and referral system.
 * Tables: participant_profiles, referrals
 */
import { getDb } from "./db.js";
import crypto from "crypto";

export type ParticipantProfile = {
  participantId: number;
  city: string | null;
  photoUrl: string | null;
  danceStyles: string; // JSON array of strings
  referralCode: string;
};

export type Referral = {
  id: number;
  referrerParticipantId: number;
  referredEmail: string;
  referredName: string | null;
  createdAt: string;
};

/**
 * Initialize profile and referral tables.
 */
export async function initProfileTables(): Promise<void> {
  const db = getDb();

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

/**
 * Generate a unique referral code based on participant name/id.
 */
function generateReferralCode(participantId: number, name?: string | null): string {
  const base = name
    ? name.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 6)
    : "CAIRO";
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 4);
  return `${base}${suffix}`;
}

/**
 * Get or create a participant profile.
 */
export async function getOrCreateProfile(
  participantId: number,
  name?: string | null
): Promise<ParticipantProfile> {
  const db = getDb();

  const result = await db.execute({
    sql: "SELECT * FROM participant_profiles WHERE participantId = ?",
    args: [participantId],
  });

  if (result.rows.length > 0) {
    const row = result.rows[0];
    return {
      participantId: row.participantId as number,
      city: (row.city as string) || null,
      photoUrl: (row.photoUrl as string) || null,
      danceStyles: (row.danceStyles as string) || "[]",
      referralCode: row.referralCode as string,
    };
  }

  // Create new profile
  const referralCode = generateReferralCode(participantId, name);

  await db.execute({
    sql: `INSERT INTO participant_profiles (participantId, city, photoUrl, danceStyles, referralCode)
          VALUES (?, NULL, NULL, '[]', ?)`,
    args: [participantId, referralCode],
  });

  return {
    participantId,
    city: null,
    photoUrl: null,
    danceStyles: "[]",
    referralCode,
  };
}

/**
 * Update participant profile fields.
 */
export async function updateProfile(
  participantId: number,
  updates: { city?: string; photoUrl?: string; danceStyles?: string[] }
): Promise<ParticipantProfile> {
  const db = getDb();

  const sets: string[] = [];
  const args: (string | number)[] = [];

  if (updates.city !== undefined) {
    sets.push("city = ?");
    args.push(updates.city);
  }
  if (updates.photoUrl !== undefined) {
    sets.push("photoUrl = ?");
    args.push(updates.photoUrl);
  }
  if (updates.danceStyles !== undefined) {
    sets.push("danceStyles = ?");
    args.push(JSON.stringify(updates.danceStyles));
  }

  if (sets.length > 0) {
    sets.push("updatedAt = datetime('now')");
    args.push(participantId);
    await db.execute({
      sql: `UPDATE participant_profiles SET ${sets.join(", ")} WHERE participantId = ?`,
      args,
    });
  }

  return getOrCreateProfile(participantId);
}

/**
 * Get referral count for a participant.
 */
export async function getReferralCount(participantId: number): Promise<number> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT COUNT(*) as count FROM referrals WHERE referrerParticipantId = ?",
    args: [participantId],
  });
  return (result.rows[0]?.count as number) || 0;
}

/**
 * Get referral list for a participant.
 */
export async function getReferrals(participantId: number): Promise<Referral[]> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM referrals WHERE referrerParticipantId = ? ORDER BY createdAt DESC",
    args: [participantId],
  });
  return result.rows.map((row) => ({
    id: row.id as number,
    referrerParticipantId: row.referrerParticipantId as number,
    referredEmail: row.referredEmail as string,
    referredName: (row.referredName as string) || null,
    createdAt: row.createdAt as string,
  }));
}

/**
 * Record a referral when someone inscribes using a referral code.
 */
export async function recordReferral(
  referralCode: string,
  referredEmail: string,
  referredName?: string
): Promise<boolean> {
  const db = getDb();

  // Find the referrer by code
  const profileResult = await db.execute({
    sql: "SELECT participantId FROM participant_profiles WHERE referralCode = ?",
    args: [referralCode],
  });

  if (profileResult.rows.length === 0) {
    return false; // Invalid code
  }

  const referrerParticipantId = profileResult.rows[0].participantId as number;

  // Don't allow self-referral
  const referrerResult = await db.execute({
    sql: "SELECT email FROM participant_accounts WHERE id = ?",
    args: [referrerParticipantId],
  });
  const referrerEmail = (referrerResult.rows[0]?.email as string || "").toLowerCase();
  if (referrerEmail === referredEmail.toLowerCase()) {
    return false;
  }

  // Check if already referred
  const existingResult = await db.execute({
    sql: "SELECT id FROM referrals WHERE referrerParticipantId = ? AND referredEmail = ?",
    args: [referrerParticipantId, referredEmail.toLowerCase()],
  });

  if (existingResult.rows.length > 0) {
    return false; // Already recorded
  }

  await db.execute({
    sql: `INSERT INTO referrals (referrerParticipantId, referredEmail, referredName) VALUES (?, ?, ?)`,
    args: [referrerParticipantId, referredEmail.toLowerCase(), referredName || null],
  });

  return true;
}

/**
 * Find participant ID by referral code.
 */
export async function getParticipantByReferralCode(
  referralCode: string
): Promise<number | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT participantId FROM participant_profiles WHERE referralCode = ?",
    args: [referralCode],
  });
  return result.rows.length > 0 ? (result.rows[0].participantId as number) : null;
}
