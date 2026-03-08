import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import DailyTimeline from '@/components/DailyTimeline';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import CafSimulator from '@/components/CafSimulator';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const baseUrl = 'https://mayo-nice.fr';

const meta = {
  fr: {
    title: 'Mayo – Crèche Multilingue Nice | Nursery Privée Côte d\'Azur',
    description: 'Mayo, micro-crèche et nursery privée multilingue à Nice. Accueil personnalisé en français, anglais et russe pour les enfants de 3 mois à 3 ans sur la Côte d\'Azur.',
  },
  en: {
    title: 'Mayo – Multilingual Nursery Nice | Private Childcare French Riviera',
    description: 'Mayo, multilingual private nursery in Nice. Personalized childcare in French, English and Russian for children aged 3 months to 3 years on the French Riviera.',
  },
  ru: {
    title: 'Mayo – Многоязычный детский сад Ницца | Частный детский сад Лазурный Берег',
    description: 'Mayo – многоязычный частный детский сад в Ницце. Индивидуальный уход на французском, английском и русском для детей от 3 месяцев до 3 лет.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ChildCare'],
  name: 'Mayo',
  description: 'Crèche multilingue à Nice – Multilingual nursery in Nice',
  url: baseUrl,
  telephone: '+33XXXXXXXXX',
  email: 'contact@mayo-nice.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue Jean Médecin',
    addressLocality: 'Nice',
    postalCode: '06000',
    addressRegion: 'Provence-Alpes-Côte d\'Azur',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.7009,
    longitude: 7.2683,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  knowsLanguage: ['fr', 'en', 'ru'],
  areaServed: [
    { '@type': 'City', name: 'Nice' },
    { '@type': 'City', name: 'Cannes' },
    { '@type': 'City', name: 'Antibes' },
    { '@type': 'City', name: 'Monaco' },
  ],
  priceRange: '€€',
};

const Index = () => {
  const { language } = useLanguage();
  const m = meta[language];

  return (
    <>
      <SEOHead
        title={m.title}
        description={m.description}
        canonical={baseUrl + '/'}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <DailyTimeline />
        <Services />
        <CafSimulator />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default Index;
