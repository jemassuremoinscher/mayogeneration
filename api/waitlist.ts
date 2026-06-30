import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { cors, ensureHeader, getSheetId, getSheets, HEADERS, SHEET_NAME } from './_sheets.js';

const Body = z.object({
  source: z.string().default('contact'),
  parent_name: z.string().optional(),
  first_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  child_age_months: z.union([z.number(), z.string()]).optional(),
  preferred_site: z.string().optional(),
  highlighted_language: z.string().optional(),
  days_per_week: z.union([z.number(), z.string()]).optional(),
  desired_start: z.string().optional(),
  income_bracket: z.string().optional(),
  nb_children: z.union([z.number(), z.string()]).optional(),
  monaco_worker: z.union([z.boolean(), z.string()]).optional(),
  estimated_net_cost: z.union([z.number(), z.string()]).optional(),
  message: z.string().max(2000).optional(),
  locale: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_payload', details: parsed.error.flatten() });
  const d = parsed.data;

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created_at = new Date().toISOString();
  const row: Record<string, string> = {
    id,
    created_at,
    status: 'nouveau',
    source: d.source,
    parent_name: (d.parent_name || d.first_name || '').toString(),
    email: d.email,
    phone: (d.phone || '').toString(),
    child_age_months: (d.child_age_months ?? '').toString(),
    preferred_site: (d.preferred_site || '').toString(),
    highlighted_language: (d.highlighted_language || '').toString(),
    days_per_week: (d.days_per_week ?? '').toString(),
    desired_start: (d.desired_start || '').toString(),
    income_bracket: (d.income_bracket || '').toString(),
    nb_children: (d.nb_children ?? '').toString(),
    monaco_worker: (d.monaco_worker ?? '').toString(),
    estimated_net_cost: (d.estimated_net_cost ?? '').toString(),
    message: (d.message || '').toString(),
    locale: (d.locale || '').toString(),
  };

  try {
    await ensureHeader();
    const sheets = await getSheets();
    const values = [HEADERS.map((h) => row[h] ?? '')];
    await sheets.spreadsheets.values.append({
      spreadsheetId: getSheetId(),
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    return res.status(200).json({ ok: true, id });
  } catch (err) {
    console.error('waitlist_error', err);
    // On ne casse pas le front : succès « best-effort »
    return res.status(200).json({ ok: true, id, persisted: false });
  }
}
