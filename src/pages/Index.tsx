import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import RivieraTimeline from '@/components/RivieraTimeline';
import Services from '@/components/Services';
import IdealCareQuiz from '@/components/IdealCareQuiz';
import Availability from '@/components/Availability';
import ImmersiveVisit from '@/components/ImmersiveVisit';
import FaqSearch from '@/components/FaqSearch';
import QuizContact from '@/components/QuizContact';
import CafSimulator from '@/components/CafSimulator';
import EcoFootprint from '@/components/EcoFootprint';
import TrustBadges from '@/components/TrustBadges';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import SocialProofToast from '@/components/SocialProofToast';
import ParentApp from '@/components/ParentApp';
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sophie L.' },
      datePublished: '2025-11-15',
      reviewBody: 'Un accueil exceptionnel, notre fille adore y aller chaque matin. L\'équipe est bienveillante et professionnelle.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Marc D.' },
      datePublished: '2025-10-20',
      reviewBody: 'Cadre magnifique sur la Riviera, repas bio et activités variées. Je recommande à 100%.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    },
  ],
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
      <TrustBadges />
      <main className="min-h-screen">
        <Hero />
        <About />
        <RivieraTimeline />
        <Services />
        <IdealCareQuiz />
        <Availability />
        <ImmersiveVisit />
        <CafSimulator />
        <FaqSearch />
        <EcoFootprint />
        <QuizContact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default Index;
