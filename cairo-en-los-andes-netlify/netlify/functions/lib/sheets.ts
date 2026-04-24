/**
 * Google Sheets integration for reading participant data.
 * Uses the public Google Sheets API v4 (no auth required for public sheets).
 * Sheet: "06_INSCRIPCIONES"
 * Columns: C (Nombre), E (Paquete), F (Competencia), H (Participaciones), T (Pagado USD), U (Saldo USD), AL (Email)
 */

// Column indices (0-based) in the sheet
const COL = {
  NOMBRE: 2, // C
  PAQUETE: 4, // E
  COMPETENCIA: 5, // F
  PARTICIPACIONES: 7, // H
  PAGADO: 19, // T
  SALDO: 20, // U
  EMAIL: 37, // AL
} as const;

export type ParticipantSheetData = {
  nombre: string;
  paquete: string;
  competencia: string;
  participaciones: string;
  pagado: string;
  saldo: string;
  email: string;
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
      return {
        nombre: (row[COL.NOMBRE] || "").toString().trim(),
        paquete: (row[COL.PAQUETE] || "").toString().trim(),
        competencia: (row[COL.COMPETENCIA] || "").toString().trim(),
        participaciones: (row[COL.PARTICIPACIONES] || "").toString().trim(),
        pagado: (row[COL.PAGADO] || "").toString().trim(),
        saldo: (row[COL.SALDO] || "").toString().trim(),
        email: (row[COL.EMAIL] || "").toString().trim(),
      };
    }
  }

  return null;
}
