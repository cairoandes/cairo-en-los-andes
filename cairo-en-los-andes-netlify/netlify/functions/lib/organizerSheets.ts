/**
 * Google Sheets integration for the Organizer Portal.
 * Fetches ALL tabs from the spreadsheet for the organizer dashboard.
 */

const ORGANIZER_SHEET_ID = "1-Ml74ABa2UkFxiDr6NqNNEXoRJD-Fuzwk_TziMntLN0";

const SHEET_TABS = [
  "01_PAQUETES",
  "02_GASTOS",
  "03_ARTISTAS",
  "04_HOTEL",
  "05_RESPUESTAS",
  "06_INSCRIPCIONES",
  "07_OTROS_INGRESOS",
  "08_COMISIONES",
  "09_EXTRAS",
  "10_RESUMEN",
] as const;

export type SheetTabName = (typeof SHEET_TABS)[number];

export type SheetTabData = {
  name: SheetTabName;
  headers: string[];
  rows: string[][];
};

/**
 * Fetch a single tab from the organizer spreadsheet.
 */
async function fetchTab(tabName: string): Promise<SheetTabData> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is not set");
  }

  const range = encodeURIComponent(`${tabName}!A:AZ`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${ORGANIZER_SHEET_ID}/values/${range}?key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Sheets API error for tab ${tabName} (${response.status}): ${errorText}`
    );
  }

  const data = (await response.json()) as { values?: string[][] };
  const allRows = data.values || [];

  return {
    name: tabName as SheetTabName,
    headers: allRows[0] || [],
    rows: allRows.slice(1),
  };
}

/**
 * Fetch a specific tab by name.
 */
export async function fetchSheetTab(tabName: SheetTabName): Promise<SheetTabData> {
  return fetchTab(tabName);
}

/**
 * Fetch all tabs from the organizer spreadsheet.
 */
export async function fetchAllSheetTabs(): Promise<SheetTabData[]> {
  const results = await Promise.all(SHEET_TABS.map((tab) => fetchTab(tab)));
  return results;
}

/**
 * Get the list of available tab names.
 */
export function getAvailableTabs(): SheetTabName[] {
  return [...SHEET_TABS];
}
