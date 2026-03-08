import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { locations } from '@/data/locations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { MapPin, Navigation, ArrowLeft } from 'lucide-react';

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

  const tr = location.translations[language];

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
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.007},${location.lng + 0.01},${location.lat + 0.007}&layer=mapnik&marker=${location.lat},${location.lng}`}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <a
              href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {language === 'fr' ? 'Voir sur la carte' : language === 'en' ? 'View on map' : 'Открыть карту'}
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
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('hero.cta')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
