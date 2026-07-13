import { useParams, Link } from 'react-router-dom';
import { useLanguage, HIGHLIGHTED_LANG_LABEL } from '@/contexts/LanguageContext';
import { locations, getLocationTranslation } from '@/data/locations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CafSimulator from '@/components/CafSimulator';
import { MapPin, Navigation, ArrowLeft, Star, AlertCircle, Languages } from 'lucide-react';

const baseUrl = 'https://mayocreche.fr';

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const location = locations.find((l) => l.slug === slug);

  if (!location) {
    return (
      <>
        <SEOHead title="Page non trouvée | Mayo" description="Cette page n'existe pas." />
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Page non trouvée</h1>
            <Link to="/" className="text-primary underline">Retour à l'accueil</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const tr = getLocationTranslation(location, language);
  const isPriority = !!location.priorityOpening;
  const highlightLabel = HIGHLIGHTED_LANG_LABEL[language][location.highlightedLanguage];
  const goWaitlist = () => {
    try { sessionStorage.setItem('mayo:preferred_site', location.slug); } catch {}
  };

  const L = (o: Record<string, string>) => o[language] ?? o.fr;
  const C = location.city;
  const H = highlightLabel;

  // FAQ data-driven (tokens {C} = ville, {H} = langue mise en avant)
  const faqs = [
    {
      q: L({
        fr: `Quelles langues parle-t-on à la crèche Mayo de ${C} ?`,
        en: `What languages are spoken at the Mayo nursery in ${C}?`,
        ru: `На каких языках говорят в яслях Mayo в ${C}?`,
        it: `Quali lingue si parlano all'asilo Mayo di ${C}?`,
      }),
      a: L({
        fr: `Français, anglais et ${H}.`,
        en: `French, English and ${H}.`,
        ru: `На французском, английском и ${H}.`,
        it: `Francese, inglese e ${H}.`,
      }),
    },
    {
      q: L({
        fr: `À partir de quel âge accueillez-vous les enfants à ${C} ?`,
        en: `From what age do you welcome children in ${C}?`,
        ru: `С какого возраста вы принимаете детей в ${C}?`,
        it: `Da che età accogliete i bambini a ${C}?`,
      }),
      a: L({
        fr: `Dès les premiers mois, en micro-crèche à effectif réduit.`,
        en: `From the first months, in a small-group micro-nursery.`,
        ru: `С первых месяцев, в мини-яслях с небольшими группами.`,
        it: `Fin dai primi mesi, in un micro-asilo a piccoli gruppi.`,
      }),
    },
    {
      q: L({
        fr: `Comment s'inscrire à la crèche de ${C} ?`,
        en: `How do I enrol at the ${C} nursery?`,
        ru: `Как записаться в ясли в ${C}?`,
        it: `Come iscriversi all'asilo di ${C}?`,
      }),
      a: L({
        fr: `En rejoignant la liste d'attente Mayo de ${C} ci-dessus.`,
        en: `By joining the Mayo ${C} waitlist above.`,
        ru: `Присоединившись к листу ожидания Mayo ${C} выше.`,
        it: `Iscrivendosi alla lista d'attesa Mayo ${C} qui sopra.`,
      }),
    },
  ];

  const localBusinessLd = {
    '@type': ['LocalBusiness', 'ChildCare'],
    name: `Mayo ${location.city}`,
    description: tr.metaDescription,
    url: `${baseUrl}/${location.slug}`,
    telephone: '+33498101010',
    email: 'contact@mayocreche.fr',
    address: {
      '@type': 'PostalAddress',
      ...(location.streetAddress ? { streetAddress: location.streetAddress } : {}),
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
      addressLocality: location.city,
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
      addressCountry: location.city === 'Monaco' ? 'MC' : 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    knowsLanguage: ['fr', 'en', 'ru', 'it'],
    priceRange: '€€',
  };

  const faqLd = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessLd, faqLd],
  };

  return (
    <>
      <ScrollProgressBar />
      <SEOHead
        title={tr.metaTitle}
        description={tr.metaDescription}
        canonical={`${baseUrl}/${location.slug}`}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="min-h-screen pt-20">
        {/* Breadcrumb with schema */}
        <nav className="max-w-5xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-primary transition-colors">
                <span itemProp="name">Mayo</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-foreground font-medium">{location.city}</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* H1 */}
        <section className="max-w-5xl mx-auto px-4 pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {L({ fr: 'Retour à l\'accueil', en: 'Back to home', ru: 'На главную', it: 'Torna alla home' })}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {tr.h1}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isPriority ? 'bg-primary text-primary-foreground' : 'bg-amber-100 text-amber-900'}`}>
              {isPriority ? <Star className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {isPriority ? t('status.priority') : t('status.waitlist')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
              <Languages className="w-3.5 h-3.5" />
              {t('lang.highlighted')} : {highlightLabel}
            </span>
          </div>
          {location.tagline && (
            <p className="mt-4 text-lg text-muted-foreground italic">{location.tagline[language as 'fr' | 'en' | 'ru' | 'it'] || location.tagline.fr}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground/80">{t('lang.networkNote')}</p>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 pb-12" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="sr-only">
            {L({ fr: 'Présentation', en: 'Overview', ru: 'Описание', it: 'Presentazione' })}
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p>{tr.intro}</p>
          </div>
        </section>

        {/* Pourquoi {langue} à {ville} */}
        <section className="max-w-5xl mx-auto px-4 pb-12" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-2xl font-semibold text-foreground mb-4">
            {L({ fr: `Pourquoi ${H} à ${C} ?`, en: `Why ${H} in ${C}?`, ru: `Почему ${H} в ${C}?`, it: `Perché ${H} a ${C}?` })}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {L({
              fr: `À ${C}, l'ouverture internationale fait partie du quotidien. Chez Mayo ${C}, vos enfants baignent dans le français et l'anglais, avec ${H} comme troisième langue mise en avant — une immersion naturelle, précieuse dès le plus jeune âge.`,
              en: `In ${C}, an international outlook is part of daily life. At Mayo ${C}, your children are immersed in French and English, with ${H} as the highlighted third language — a natural head-start from the earliest age.`,
              ru: `В ${C} международная среда — часть повседневной жизни. В Mayo ${C} дети погружаются во французский и английский, а ${H} становится третьим приоритетным языком — естественное преимущество с самых первых лет.`,
              it: `A ${C}, l'apertura internazionale fa parte della vita quotidiana. Da Mayo ${C}, i bambini vivono immersi nel francese e nell'inglese, con ${H} come terza lingua valorizzata — un vantaggio naturale fin dai primi anni.`,
            })}
          </p>
        </section>

        {/* Map */}
        <section className="max-w-5xl mx-auto px-4 pb-12" aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
            {L({ fr: 'Notre emplacement', en: 'Our location', ru: 'Наше расположение', it: 'La nostra sede' })}
          </h2>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe
              title={`Carte Mayo ${location.city}`}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr`}
              allowFullScreen
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {L({ fr: 'Voir sur Google Maps', en: 'View on Google Maps', ru: 'Открыть в Google Картах', it: 'Vedi su Google Maps' })}
            </a>
          </p>
        </section>

        {/* Landmarks */}
        <section className="max-w-5xl mx-auto px-4 pb-16" aria-labelledby="landmarks-heading">
          <h2 id="landmarks-heading" className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" aria-hidden="true" />
            {L({ fr: 'Points de repère à proximité', en: 'Nearby landmarks', ru: 'Ближайшие ориентиры', it: 'Punti di riferimento vicini' })}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tr.landmarks.map((lm, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-accent/30 border border-border"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-foreground">{lm.name}</h3>
                  <p className="text-sm text-muted-foreground">{lm.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simulateur coût / CMG */}
        <section className="max-w-5xl mx-auto px-4 pb-2" aria-labelledby="cmg-heading">
          <h2 id="cmg-heading" className="text-2xl font-semibold text-foreground mb-2">
            {L({ fr: 'Combien ça coûte ?', en: 'How much does it cost?', ru: 'Сколько это стоит?', it: 'Quanto costa?' })}
          </h2>
          <p className="text-muted-foreground">
            {L({ fr: `Estimez votre reste à charge à ${C}.`, en: `Estimate your out-of-pocket cost in ${C}.`, ru: `Рассчитайте ваши расходы в ${C}.`, it: `Stima la tua spesa a ${C}.` })}
          </p>
        </section>
        <CafSimulator />

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 py-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-semibold text-foreground mb-6">
            {L({ fr: 'Questions fréquentes', en: 'Frequently asked questions', ru: 'Частые вопросы', it: 'Domande frequenti' })}
          </h2>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none shrink-0">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 py-12 px-4" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl font-bold text-foreground mb-4">
              {L({
                fr: `Inscrivez votre enfant chez Mayo ${location.city}`,
                en: `Enroll your child at Mayo ${location.city}`,
                ru: `Запишите ребёнка в Mayo ${location.city}`,
                it: `Iscrivi tuo figlio da Mayo ${location.city}`,
              })}
            </h2>
            <a
              href="/#contact"
              onClick={goWaitlist}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              {isPriority ? t('hero.cta') : t('cta.waitlist')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
