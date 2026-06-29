import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { locations } from '@/data/locations';
import { Mail, MapPin, Check, ArrowRight } from 'lucide-react';

const tr = {
  fr: {
    title: 'Recevez les disponibilités de votre secteur',
    subtitle: 'Laissez-nous votre email : on vous envoie les disponibilités de votre secteur et votre estimation d\'aides CMG.',
    email: 'Votre email',
    site: 'Secteur souhaité (optionnel)',
    sitePlaceholder: '— Choisir un secteur —',
    submit: 'Recevoir les disponibilités de mon secteur',
    success: 'Merci, c\'est noté. Nous revenons vers vous sous 48 h.',
  },
  en: {
    title: 'Get availability for your area',
    subtitle: 'Leave us your email: we\'ll send you area availability and your CMG aid estimate.',
    email: 'Your email',
    site: 'Preferred area (optional)',
    sitePlaceholder: '— Choose an area —',
    submit: 'Receive my area availability',
    success: 'Thanks, noted. We\'ll get back to you within 48h.',
  },
  ru: {
    title: 'Получите наличие мест в вашем районе',
    subtitle: 'Оставьте email: мы пришлём наличие мест и оценку пособия CMG.',
    email: 'Ваш email',
    site: 'Желаемый район (опционально)',
    sitePlaceholder: '— Выбрать район —',
    submit: 'Получить наличие мест',
    success: 'Спасибо! Мы свяжемся с вами в течение 48 часов.',
  },
  it: {
    title: 'Ricevi le disponibilità della tua zona',
    subtitle: 'Lasciaci la tua email: ti inviamo le disponibilità della tua zona e la stima degli aiuti CMG.',
    email: 'La tua email',
    site: 'Zona desiderata (opzionale)',
    sitePlaceholder: '— Scegli una zona —',
    submit: 'Ricevi le disponibilità della mia zona',
    success: 'Grazie, abbiamo registrato la tua richiesta. Ti ricontatteremo entro 48 ore.',
  },
};

const QuizContact = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];

  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pré-remplir depuis le clic « Liste d'attente prioritaire » d'une carte
  useEffect(() => {
    try {
      const s = sessionStorage.getItem('mayo:preferred_site');
      if (s) setSite(s);
    } catch {}
  }, []);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitted(true);
    try {
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'rappel', email, preferred_site: site || null, language }),
      }).catch(() => {});
    } catch {}
  };

  if (submitted) {
    return (
      <section id="contact" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }}>
        <div ref={reveal.ref} style={reveal.style} className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t.success}</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} aria-labelledby="contact-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-3">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.title}</h2>
          <p className="text-muted-foreground mt-3 text-sm">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border p-6 sm:p-8 space-y-4" style={{ boxShadow: 'var(--shadow-premium)' }}>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5"><Mail className="w-3 h-3" />{t.email}</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5"><MapPin className="w-3 h-3" />{t.site}</label>
            <select value={site} onChange={(e) => setSite(e.target.value)}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary">
              <option value="">{t.sitePlaceholder}</option>
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>{l.city}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={!valid}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: valid ? 'var(--gradient-primary)' : undefined, color: valid ? 'white' : undefined, boxShadow: valid ? 'var(--shadow-sage)' : undefined }}>
            {t.submit} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuizContact;
