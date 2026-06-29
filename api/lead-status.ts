import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { checkAdmin, cors, getSheetId, getSheets, HEADERS, SHEET_NAME } from './_sheets';

const ALLOWED = ['nouveau', 'contacté', 'visite', 'inscrit', 'perdu'] as const;
const Body = z.object({ id: z.string().min(1), status: z.enum(ALLOWED) });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (!checkAdmin(req)) return res.status(401).json({ error: 'unauthorized' });

  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_payload' });

  try {
    const sheets = await getSheets();
    const id = getSheetId();
    const r = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: `${SHEET_NAME}!A2:A`,
    });
    const ids = (r.data.values || []).map((row) => (row[0] ?? '').toString());
    const idx = ids.findIndex((x) => x === parsed.data.id);
    if (idx < 0) return res.status(404).json({ error: 'not_found' });

    const rowNumber = idx + 2; // header on row 1
    const statusColLetter = String.fromCharCode(65 + HEADERS.indexOf('status'));
    await sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: `${SHEET_NAME}!${statusColLetter}${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[parsed.data.status]] },
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead_status_error', err);
    return res.status(500).json({ error: 'server_error' });
  }
}
