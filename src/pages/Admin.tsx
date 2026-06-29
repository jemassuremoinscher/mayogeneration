import { useEffect, useMemo, useState } from 'react';
import { locations } from '@/data/locations';
import { HIGHLIGHTED_LANG_LABEL } from '@/contexts/LanguageContext';
import { Lock, LogOut, Search, Download, RefreshCw, Users, MapPin, Globe } from 'lucide-react';

type Lead = {
  id: string; created_at: string; status: string; source: string;
  parent_name: string; email: string; phone: string;
  child_age_months: string; preferred_site: string; highlighted_language: string;
  days_per_week: string; desired_start: string; income_bracket: string;
  nb_children: string; monaco_worker: string; estimated_net_cost: string;
  message: string; locale: string;
};

const STATUSES = ['nouveau', 'contacté', 'visite', 'inscrit', 'perdu'] as const;
type Status = typeof STATUSES[number];
const STORAGE_KEY = 'mayo:admin:pwd';

export default function Admin() {
  const [pwd, setPwd] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'leads' | 'creches' | 'seo'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [siteFilter, setSiteFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Auto-login si pwd en sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPwd(saved);
      void tryLogin(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryLogin = async (password: string) => {
    setLoading(true); setError(null);
    try {
      const r = await fetch('/api/leads', { headers: { 'X-Admin-Password': password } });
      if (r.status === 401) { setError('Mot de passe invalide'); setAuthed(false); return; }
      if (!r.ok) { setError('Erreur serveur'); return; }
      const data = await r.json();
      setLeads(data.leads || []);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, password);
    } catch {
      setError('Connexion impossible');
    } finally { setLoading(false); }
  };

  const refresh = () => tryLogin(pwd);

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false); setPwd(''); setLeads([]);
  };

  const updateStatus = async (id: string, status: Status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await fetch('/api/lead-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': pwd },
        body: JSON.stringify({ id, status }),
      });
    } catch {}
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => !siteFilter || l.preferred_site === siteFilter)
      .filter((l) => !statusFilter || l.status === statusFilter)
      .filter((l) => !q || l.email.toLowerCase().includes(q) || l.parent_name.toLowerCase().includes(q))
      .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }, [leads, query, siteFilter, statusFilter]);

  const bySite = useMemo(() => {
    const m: Record<string, number> = {};
    leads.forEach((l) => { m[l.preferred_site || '—'] = (m[l.preferred_site || '—'] || 0) + 1; });
    return m;
  }, [leads]);

  const exportCsv = () => {
    const headers = ['date', 'source', 'nom', 'email', 'téléphone', 'crèche', 'langue', 'âge (mois)', 'reste à charge', 'statut'];
    const rows = filtered.map((l) => [
      l.created_at, l.source, l.parent_name, l.email, l.phone,
      l.preferred_site, l.highlighted_language, l.child_age_months,
      l.estimated_net_cost, l.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `mayo-leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-background">
        <form
          onSubmit={(e) => { e.preventDefault(); void tryLogin(pwd); }}
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 space-y-4 shadow-lg"
        >
          <div className="flex items-center gap-2 text-primary"><Lock className="w-5 h-5" /> <h1 className="font-bold text-lg">Mayo — Back-office</h1></div>
          <input
            type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
            placeholder="Mot de passe administrateur" autoFocus
            className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading || !pwd}
            className="w-full bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-semibold disabled:opacity-50">
            {loading ? '…' : 'Se connecter'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-primary font-bold"><Lock className="w-4 h-4" /> Mayo Admin</div>
          <nav className="flex gap-1 text-sm">
            {[
              { k: 'leads' as const, label: 'Inscriptions', icon: Users },
              { k: 'creches' as const, label: 'Crèches', icon: MapPin },
              { k: 'seo' as const, label: 'SEO', icon: Globe },
            ].map(({ k, label, icon: Icon }) => (
              <button key={k} onClick={() => setTab(k)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${tab === k ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </nav>
          <button onClick={logout} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {tab === 'leads' && (
          <section>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Recherche email/nom"
                  className="w-full rounded-full border border-border bg-card pl-9 pr-3 py-2 text-sm" />
              </div>
              <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}
                className="rounded-full border border-border bg-card px-3 py-2 text-sm">
                <option value="">Toutes crèches</option>
                {locations.map((l) => <option key={l.slug} value={l.slug}>{l.city}</option>)}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-full border border-border bg-card px-3 py-2 text-sm">
                <option value="">Tous statuts</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={refresh} className="rounded-full border border-border px-3 py-2 text-sm flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Rafraîchir</button>
              <button onClick={exportCsv} className="rounded-full bg-primary text-primary-foreground px-3 py-2 text-sm flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> CSV</button>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
              Total : <strong className="text-foreground">{leads.length}</strong> · Affichés : <strong className="text-foreground">{filtered.length}</strong> ·
              {' '}Par crèche : {Object.entries(bySite).map(([s, n]) => `${s || '—'}:${n}`).join(' · ')}
            </div>

            <div className="overflow-x-auto bg-card border border-border rounded-xl">
              <table className="w-full text-xs">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    {['Date', 'Source', 'Nom', 'Email', 'Tél.', 'Crèche', 'Langue', 'Âge (mois)', 'Reste à charge', 'Statut'].map((h) => (
                      <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr><td colSpan={10} className="px-3 py-8 text-center text-muted-foreground">Aucune inscription.</td></tr>
                  )}
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-border hover:bg-muted/20">
                      <td className="px-3 py-2 whitespace-nowrap">{l.created_at?.slice(0, 16).replace('T', ' ')}</td>
                      <td className="px-3 py-2"><span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px]">{l.source}</span></td>
                      <td className="px-3 py-2">{l.parent_name || '—'}</td>
                      <td className="px-3 py-2"><a href={`mailto:${l.email}`} className="text-primary hover:underline">{l.email}</a></td>
                      <td className="px-3 py-2">{l.phone || '—'}</td>
                      <td className="px-3 py-2">{l.preferred_site || '—'}</td>
                      <td className="px-3 py-2">{l.highlighted_language || '—'}</td>
                      <td className="px-3 py-2">{l.child_age_months || '—'}</td>
                      <td className="px-3 py-2">{l.estimated_net_cost || '—'}</td>
                      <td className="px-3 py-2">
                        <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value as Status)}
                          className="rounded border border-border bg-card px-1.5 py-1 text-[11px]">
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === 'creches' && (
          <section>
            <p className="text-xs text-muted-foreground mb-3">
              Lecture seule — source de vérité : <code>src/data/locations.ts</code> (modifiable via le repo).
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {locations.map((l) => (
                <div key={l.slug} className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-semibold text-foreground">{l.city}</h3>
                  {l.neighborhood && <p className="text-xs text-muted-foreground">{l.neighborhood}</p>}
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                    <span className={`rounded-full px-2 py-0.5 ${l.priorityOpening ? 'bg-primary text-primary-foreground' : 'bg-amber-100 text-amber-900'}`}>
                      {l.priorityOpening ? 'Ouverture prioritaire' : 'Liste d\'attente'}
                    </span>
                    <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5">
                      Langue : {HIGHLIGHTED_LANG_LABEL.fr[l.highlightedLanguage]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'seo' && <SeoTab />}
      </div>
    </main>
  );
}

function SeoTab() {
  const pages = [
    { url: '/', title: 'Accueil', titleOk: true, descOk: true, internalOk: true },
    { url: '/entreprises', title: 'Entreprises', titleOk: true, descOk: true, internalOk: true },
    { url: '/blog', title: 'Blog', titleOk: true, descOk: true, internalOk: true },
    { url: '/mammouth-group', title: 'Mammouth Group', titleOk: true, descOk: true, internalOk: true },
    ...locations.map((l) => ({ url: `/${l.slug}`, title: `Crèche ${l.city}`, titleOk: true, descOk: true, internalOk: true })),
  ];
  return (
    <section>
      <p className="text-xs text-muted-foreground mb-3">Vérifications de base (title + meta description + 1 lien interne mini).</p>
      <div className="overflow-x-auto bg-card border border-border rounded-xl">
        <table className="w-full text-xs">
          <thead className="bg-muted/40 text-left">
            <tr>{['Page', 'URL', 'Title', 'Meta description', 'Lien interne'].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.url} className="border-t border-border">
                <td className="px-3 py-2">{p.title}</td>
                <td className="px-3 py-2"><a href={p.url} className="text-primary hover:underline">{p.url}</a></td>
                <td className="px-3 py-2">{p.titleOk ? '✅' : '⚠️ À corriger'}</td>
                <td className="px-3 py-2">{p.descOk ? '✅' : '⚠️ À corriger'}</td>
                <td className="px-3 py-2">{p.internalOk ? '✅' : '⚠️ À corriger'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
