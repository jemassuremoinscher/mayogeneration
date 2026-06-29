import { useState } from 'react';
import { useLanguage, HIGHLIGHTED_LANG_LABEL } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Languages, AlertCircle, Star, ArrowRight } from 'lucide-react';
import { locations } from '@/data/locations';

const tr = {
  fr: {
    badge: 'Réseau Mayo',
    title: 'Nos crèches sur la Côte d\'Azur',
    subtitle: '« La langue suit la côte » : français + anglais partout, et une troisième langue mise en avant par site.',
    priority: 'Ouverture prioritaire',
    waitlist: 'Sur liste d\'attente',
    priorityNote: 'Places limitées',
    waitlistNote: 'Secteur en forte demande',
    highlighted: 'Langue mise en avant',
    networkNote: 'Toutes les langues du réseau Mayo restent accessibles sur demande.',
    ctaWaitlist: 'M\'inscrire sur la liste d\'attente prioritaire de ce secteur',
    ctaPriority: 'Réserver ma priorité',
    discover: 'Découvrir',
  },
  en: {
    badge: 'Mayo Network',
    title: 'Our nurseries on the French Riviera',
    subtitle: '"The language follows the coast": French + English everywhere, and a third highlighted language per site.',
    priority: 'Priority opening',
    waitlist: 'On waitlist',
    priorityNote: 'Limited spots',
    waitlistNote: 'High-demand area',
    highlighted: 'Highlighted language',
    networkNote: 'All Mayo network languages remain available on request.',
    ctaWaitlist: 'Join this area\'s priority waitlist',
    ctaPriority: 'Reserve my priority',
    discover: 'Discover',
  },
  ru: {
    badge: 'Сеть Mayo',
    title: 'Наши ясли на Лазурном Берегу',
    subtitle: '«Язык следует за побережьем»: французский + английский везде, плюс третий приоритетный язык в каждом месте.',
    priority: 'Приоритетное открытие',
    waitlist: 'В листе ожидания',
    priorityNote: 'Мест мало',
    waitlistNote: 'Район повышенного спроса',
    highlighted: 'Приоритетный язык',
    networkNote: 'Все языки сети Mayo доступны по запросу.',
    ctaWaitlist: 'Записаться в приоритетный лист ожидания этого района',
    ctaPriority: 'Зарезервировать приоритет',
    discover: 'Узнать больше',
  },
  it: {
    badge: 'Rete Mayo',
    title: 'I nostri asili nido sulla Costa Azzurra',
    subtitle: '«La lingua segue la costa»: francese + inglese ovunque, più una terza lingua valorizzata per sede.',
    priority: 'Apertura prioritaria',
    waitlist: 'Su lista d\'attesa',
    priorityNote: 'Posti limitati',
    waitlistNote: 'Zona ad alta richiesta',
    highlighted: 'Lingua valorizzata',
    networkNote: 'Tutte le lingue della rete Mayo restano disponibili su richiesta.',
    ctaWaitlist: 'Iscrivimi alla lista d\'attesa prioritaria di questa zona',
    ctaPriority: 'Prenota la mia priorità',
    discover: 'Scopri',
  },
};

const Availability = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const goToWaitlist = (slug: string) => {
    try {
      sessionStorage.setItem('mayo:preferred_site', slug);
    } catch {}
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="availability" className="py-16 sm:py-24 px-4" aria-labelledby="avail-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 id="avail-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {locations.map((loc) => {
            const isPriority = !!loc.priorityOpening;
            const highlightLabel = HIGHLIGHTED_LANG_LABEL[language][loc.highlightedLanguage];
            const tagline = loc.tagline?.[language] || loc.tagline?.fr;
            const tName = loc.translations[language]?.h1 || loc.translations.fr.h1;
            void tName;

            return (
              <article
                key={loc.slug}
                className="relative bg-card rounded-2xl border border-border p-5 sm:p-6 flex flex-col gap-4 transition-shadow hover:shadow-[var(--shadow-premium)]"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-base truncate">{loc.city}</h3>
                      {tagline && <p className="text-xs text-muted-foreground line-clamp-2">{tagline}</p>}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isPriority
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200'
                    }`}
                  >
                    {isPriority ? <Star className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {isPriority ? t.priority : t.waitlist}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 font-medium">
                    <Languages className="w-3 h-3" />
                    {t.highlighted} : {highlightLabel}
                  </span>
                  <span className="text-muted-foreground">
                    {isPriority ? t.priorityNote : t.waitlistNote}
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground/80 italic">{t.networkNote}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    to={`/${loc.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {t.discover} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => goToWaitlist(loc.slug)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02]"
                    style={{ background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--shadow-sage)' }}
                  >
                    {isPriority ? t.ctaPriority : t.ctaWaitlist}
                  </button>
                </div>

                {openSlug === loc.slug && <div className="hidden">{openSlug}</div>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Availability;
