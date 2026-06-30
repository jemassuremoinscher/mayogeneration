import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAdmin, cors, ensureHeader, getSheetId, getSheets, HEADERS, SHEET_NAME } from './_sheets.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });
  if (!checkAdmin(req)) return res.status(401).json({ error: 'unauthorized' });

  try {
    await ensureHeader();
    const sheets = await getSheets();
    const r = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: `${SHEET_NAME}!A2:Z`,
    });
    const rows = (r.data.values || []).map((arr) => {
      const obj: Record<string, string> = {};
      HEADERS.forEach((h, i) => { obj[h] = (arr[i] ?? '').toString(); });
      return obj;
    });
    return res.status(200).json({ ok: true, leads: rows });
  } catch (err) {
    console.error('leads_error', err);
    return res.status(500).json({ error: 'server_error' });
  }
}
