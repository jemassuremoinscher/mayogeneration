import { useParams, Link } from 'react-router-dom';
import { useLanguage, HIGHLIGHTED_LANG_LABEL } from '@/contexts/LanguageContext';
import { locations, getLocationTranslation } from '@/data/locations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { MapPin, Navigation, ArrowLeft, Star, AlertCircle, Languages } from 'lucide-react';

const baseUrl = 'https://mayo-nice.fr';

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ChildCare'],
    name: `Mayo ${location.city}`,
    description: tr.metaDescription,
    url: `${baseUrl}/${location.slug}`,
    telephone: '+33XXXXXXXXX',
    email: 'contact@mayo-nice.fr',
    address: {
      '@type': 'PostalAddress',
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
    knowsLanguage: ['fr', 'en', 'ru'],
    priceRange: '€€',
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
            {language === 'fr' ? 'Retour à l\'accueil' : language === 'en' ? 'Back to home' : 'На главную'}
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
            {language === 'fr' ? 'Présentation' : language === 'en' ? 'Overview' : 'Описание'}
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p>{tr.intro}</p>
          </div>
        </section>

        {/* Map */}
        <section className="max-w-5xl mx-auto px-4 pb-12" aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
            {language === 'fr' ? 'Notre emplacement' : language === 'en' ? 'Our location' : 'Наше расположение'}
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
              {language === 'fr' ? 'Voir sur Google Maps' : language === 'en' ? 'View on Google Maps' : 'Открыть в Google Картах'}
            </a>
          </p>
        </section>

        {/* Landmarks */}
        <section className="max-w-5xl mx-auto px-4 pb-16" aria-labelledby="landmarks-heading">
          <h2 id="landmarks-heading" className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" aria-hidden="true" />
            {language === 'fr' ? 'Points de repère à proximité' : language === 'en' ? 'Nearby landmarks' : 'Ближайшие ориентиры'}
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

        {/* CTA */}
        <section className="bg-primary/5 py-12 px-4" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl font-bold text-foreground mb-4">
              {language === 'fr'
                ? `Inscrivez votre enfant chez Mayo ${location.city}`
                : language === 'en'
                ? `Enroll your child at Mayo ${location.city}`
                : `Запишите ребёнка в Mayo ${location.city}`}
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
