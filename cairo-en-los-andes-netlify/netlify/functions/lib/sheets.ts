/**
 * Google Sheets integration for reading participant data.
 * Uses the public Google Sheets API v4 (no auth required for public sheets).
 * Sheet: "06_INSCRIPCIONES"
 * Columns:
 *   C (Nombre), E (Paquete), F (Competencia), H (Participaciones),
 *   K (Precio base paquete), L (Total a pagar),
 *   M (Pago 1), N (Pago 2), O (Pago 3), P (Pago 4), Q (Pago 5), R (Pago 6), S (Pago extra),
 *   T (Pagado USD), U (Saldo USD), AL (Email)
 */

// Column indices (0-based) in the sheet
const COL = {
  NOMBRE: 2,           // C
  PAQUETE: 4,          // E
  COMPETENCIA: 5,      // F
  PARTICIPACIONES: 7,  // H
  PRECIO_BASE: 10,     // K
  TOTAL_A_PAGAR: 11,   // L
  PAGO_1: 12,          // M
  PAGO_2: 13,          // N
  PAGO_3: 14,          // O
  PAGO_4: 15,          // P
  PAGO_5: 16,          // Q
  PAGO_6: 17,          // R
  PAGO_EXTRA: 18,      // S
  PAGADO: 19,          // T
  SALDO: 20,           // U
  EMAIL: 37,           // AL
} as const;

export type PaymentRecord = {
  label: string;
  amount: string;
};

export type ParticipantSheetData = {
  nombre: string;
  paquete: string;
  competencia: string;
  participaciones: string;
  precioBase: string;
  totalAPagar: string;
  pagado: string;
  saldo: string;
  email: string;
  pagos: PaymentRecord[];
};

/**
 * Fetch all rows from the public Google Sheet using the v4 REST API.
 */
async function fetchSheetRows(): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is not set");
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is not set");
  }

  const sheetName = process.env.GOOGLE_SHEET_NAME || "06_INSCRIPCIONES";
  const range = encodeURIComponent(`${sheetName}!A:AL`);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Sheets API error (${response.status}): ${errorText}`
    );
  }

  const data = (await response.json()) as { values?: string[][] };
  return data.values || [];
}

/**
 * Fetch all rows from the inscriptions sheet and find the row matching the given email.
 * Returns null if the email is not found in column AL.
 */
export async function getParticipantDataByEmail(
  email: string
): Promise<ParticipantSheetData | null> {
  const rows = await fetchSheetRows();

  if (rows.length === 0) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowEmail = (row[COL.EMAIL] || "").toString().trim().toLowerCase();

    if (rowEmail === normalizedEmail) {
      // Build payment records
      const pagoLabels = ["Pago 1", "Pago 2", "Pago 3", "Pago 4", "Pago 5", "Pago 6", "Pago Extra"];
      const pagoCols = [COL.PAGO_1, COL.PAGO_2, COL.PAGO_3, COL.PAGO_4, COL.PAGO_5, COL.PAGO_6, COL.PAGO_EXTRA];

      const pagos: PaymentRecord[] = [];
      for (let j = 0; j < pagoLabels.length; j++) {
        const amount = (row[pagoCols[j]] || "").toString().trim();
        pagos.push({
          label: pagoLabels[j],
          amount: amount,
        });
      }

      return {
        nombre: (row[COL.NOMBRE] || "").toString().trim(),
        paquete: (row[COL.PAQUETE] || "").toString().trim(),
        competencia: (row[COL.COMPETENCIA] || "").toString().trim(),
        participaciones: (row[COL.PARTICIPACIONES] || "").toString().trim(),
        precioBase: (row[COL.PRECIO_BASE] || "").toString().trim(),
        totalAPagar: (row[COL.TOTAL_A_PAGAR] || "").toString().trim(),
        pagado: (row[COL.PAGADO] || "").toString().trim(),
        saldo: (row[COL.SALDO] || "").toString().trim(),
        email: (row[COL.EMAIL] || "").toString().trim(),
        pagos,
      };
    }
  }

  return null;
}
