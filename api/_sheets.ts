// Google Sheets helper — partagé par /api/waitlist, /api/leads, /api/lead-status.
// Secrets attendus (variables d'environnement Vercel) :
//   - GOOGLE_SERVICE_ACCOUNT_JSON : JSON complet du compte de service (string)
//   - SHEET_ID                    : ID du Google Spreadsheet
//   - ADMIN_PASSWORD              : mot de passe du back-office
// Onglet "Leads" — colonnes (ordre figé) :
//   id | created_at | status | source | parent_name | email | phone |
//   child_age_months | preferred_site | highlighted_language | days_per_week |
//   desired_start | income_bracket | nb_children | monaco_worker |
//   estimated_net_cost | message | locale

import { google } from 'googleapis';

export const SHEET_NAME = 'Leads';
export const HEADERS = [
  'id', 'created_at', 'status', 'source', 'parent_name', 'email', 'phone',
  'child_age_months', 'preferred_site', 'highlighted_language', 'days_per_week',
  'desired_start', 'income_bracket', 'nb_children', 'monaco_worker',
  'estimated_net_cost', 'message', 'locale',
] as const;

export type LeadRow = Record<(typeof HEADERS)[number], string>;

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON missing');
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function getSheets() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

export function getSheetId(): string {
  const id = process.env.SHEET_ID;
  if (!id) throw new Error('SHEET_ID missing');
  return id;
}

export function checkAdmin(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const got = req.headers['x-admin-password'] || req.headers['authorization'];
  const value = Array.isArray(got) ? got[0] : got;
  if (!value) return false;
  const token = value.startsWith('Bearer ') ? value.slice(7) : value;
  return token === expected;
}

export async function ensureHeader() {
  const sheets = await getSheets();
  const id = getSheetId();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: `${SHEET_NAME}!1:1`,
  });
  const row = res.data.values?.[0] || [];
  if (row.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS as unknown as string[]] },
    });
  }
}

export const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password',
};
