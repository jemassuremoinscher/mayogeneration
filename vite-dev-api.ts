// Fallback local des endpoints /api/* pour l'aperçu & le dev server.
// En production (Vercel), ce sont les fonctions serverless de /api qui répondent.
// Ici on rejoue le même contrat avec un stockage JSON local (.dev-leads.json).
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const HEADERS = [
  'id', 'created_at', 'status', 'source', 'parent_name', 'email', 'phone',
  'child_age_months', 'preferred_site', 'highlighted_language', 'days_per_week',
  'desired_start', 'income_bracket', 'nb_children', 'monaco_worker',
  'estimated_net_cost', 'message', 'locale',
] as const;

type Lead = Record<(typeof HEADERS)[number], string>;

const STORE = path.resolve(process.cwd(), '.dev-leads.json');
const DEV_PASSWORD = process.env.ADMIN_PASSWORD || 'mayo-dev';

function read(): Lead[] {
  try {
    return JSON.parse(fs.readFileSync(STORE, 'utf8')) as Lead[];
  } catch {
    return [];
  }
}

function write(leads: Lead[]) {
  try {
    fs.writeFileSync(STORE, JSON.stringify(leads, null, 2));
  } catch {
    /* ignore */
  }
}

export function devApiFallback(): Plugin {
  return {
    name: 'mayo-dev-api-fallback',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (!url.startsWith('/api/')) return next();

        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Dev-Api-Fallback', '1');
          res.end(JSON.stringify(body));
        };

        const body = async (): Promise<Record<string, unknown>> => {
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          try {
            return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
          } catch {
            return {};
          }
        };

        const isAdmin = () => {
          const raw = req.headers['x-admin-password'] || req.headers['authorization'];
          const value = Array.isArray(raw) ? raw[0] : raw;
          if (!value) return false;
          const token = value.startsWith('Bearer ') ? value.slice(7) : value;
          return token === DEV_PASSWORD;
        };

        if (req.method === 'OPTIONS') return send(200, { ok: true });

        if (url === '/api/leads') {
          if (req.method !== 'GET') return send(405, { error: 'method_not_allowed' });
          if (!isAdmin()) return send(401, { error: 'unauthorized' });
          return send(200, { ok: true, leads: read(), dev: true });
        }

        if (url === '/api/waitlist') {
          if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });
          const input = await body();
          if (!input.email) return send(400, { error: 'email_required' });
          const lead = {} as Lead;
          HEADERS.forEach((h) => { lead[h] = (input[h] ?? '').toString(); });
          lead.id = `dev-${Date.now()}`;
          lead.created_at = new Date().toISOString();
          lead.status = lead.status || 'nouveau';
          const leads = read();
          leads.push(lead);
          write(leads);
          return send(200, { ok: true, persisted: true, dev: true });
        }

        if (url === '/api/lead-status') {
          if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });
          if (!isAdmin()) return send(401, { error: 'unauthorized' });
          const { id, status } = await body() as { id?: string; status?: string };
          const leads = read();
          const found = leads.find((l) => l.id === id);
          if (!found) return send(404, { error: 'not_found' });
          found.status = String(status || found.status);
          write(leads);
          return send(200, { ok: true, dev: true });
        }

        return send(404, { error: 'not_found' });
      });
    },
  };
}
