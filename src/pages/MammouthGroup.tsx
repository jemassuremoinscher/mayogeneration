import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shield, Sparkles, Car, GraduationCap, Baby, ExternalLink } from 'lucide-react';
import groupHero from '@/assets/hero-nursery.jpg';
import logoMayo from '@/assets/logo-mayo.png';
import logoInsurance from '@/assets/partners/jemassuremoinscher.png';
import logoAI from '@/assets/partners/mammouth-ai.png';
import logoMotors from '@/assets/partners/mammouth-motors.png';
import logoEffl from '@/assets/partners/effl.png';

type Lang = 'fr' | 'en' | 'ru';

interface Company {
  slug: string;
  name: string;
  url: string;
  icon: typeof Shield;
  logo: string;
  color: string; // brand hex
  logoBg: string; // tailwind bg class for logo container
  invertLogo?: boolean;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  geo: Record<Lang, string>;
  cta: Record<Lang, string>;
}

const companies: Company[] = [
  {
    slug: 'mayocreche',
    name: 'Mayo Crèche',
    url: 'https://mayocreche.fr',
    icon: Baby,
    logo: logoMayo,
    color: '#7FB8DA',
    logoBg: 'bg-sky-100',
    invertLogo: false,
    tagline: {
      fr: 'Crèches multilingues & nursery privée sur la Côte d\'Azur',
      en: 'Multilingual nurseries & private childcare on the French Riviera',
      ru: 'Многоязычные ясли и частный детский сад на Лазурном Берегу',
    },
    description: {
      fr: 'Mayo Crèche accueille les enfants de 3 mois à 3 ans à Nice et sur la Côte d\'Azur dans un environnement bilingue français / anglais / russe. Pédagogie active, équipe diplômée, repas bio et horaires adaptés aux familles d\'expatriés et de cadres.',
      en: 'Mayo Crèche welcomes children aged 3 months to 3 years across Nice and the French Riviera in a French / English / Russian trilingual environment. Active pedagogy, qualified staff, organic meals and flexible hours designed for expat and executive families.',
      ru: 'Mayo Crèche принимает детей от 3 месяцев до 3 лет в Ницце и на Лазурном Берегу в трёхъязычной среде (французский, английский, русский). Активная педагогика, дипломированный персонал, органическое питание.',
    },
    geo: { fr: 'Nice · Côte d\'Azur (FR)', en: 'Nice · French Riviera (FR)', ru: 'Ницца · Лазурный Берег (FR)' },
    cta: { fr: 'Visiter Mayo Crèche', en: 'Visit Mayo Crèche', ru: 'Перейти на Mayo Crèche' },
  },
  {
    slug: 'jemassuremoinscher',
    name: 'jemassuremoinscher.fr',
    url: 'https://jemassuremoinscher.fr',
    icon: Shield,
    logo: logoInsurance,
    color: '#F59E0B',
    logoBg: 'bg-amber-50',
    tagline: {
      fr: 'Comparateur d\'assurances — 70+ assureurs en 2 minutes',
      en: 'Insurance comparator — 70+ insurers in 2 minutes',
      ru: 'Сравнение страховок — 70+ страховщиков за 2 минуты',
    },
    description: {
      fr: 'Courtier indépendant immatriculé ORIAS, jemassuremoinscher.fr compare plus de 70 assureurs et 5 000 offres : auto, moto, habitation, santé, animaux, emprunteur, RC pro, multirisque, GLI. Devis gratuit, sans engagement, jusqu\'à 40 % d\'économies. Idéal pour les crèches, professions libérales et indépendants.',
      en: 'Independent ORIAS-registered broker, jemassuremoinscher.fr compares 70+ insurers and 5,000+ offers: car, motorbike, home, health, pet, mortgage, professional liability. Free quote, no commitment, up to 40 % savings — ideal for nurseries, freelancers and SMEs.',
      ru: 'Независимый брокер с лицензией ORIAS. jemassuremoinscher.fr сравнивает более 70 страховщиков и 5 000 предложений: авто, мото, жильё, здоровье, животные, ипотека, профответственность. Бесплатная котировка, экономия до 40 %.',
    },
    geo: { fr: 'France entière', en: 'Nationwide (France)', ru: 'Вся Франция' },
    cta: { fr: 'Comparer mon assurance', en: 'Compare my insurance', ru: 'Сравнить страховку' },
  },
  {
    slug: 'mammouth-ai',
    name: 'Mammouth AI',
    url: 'https://mammouth-ai.com',
    icon: Sparkles,
    logo: logoAI,
    color: '#111827',
    logoBg: 'bg-neutral-900',
    tagline: {
      fr: 'Agents IA et automatisation pour entrepreneurs',
      en: 'AI agents and automation for entrepreneurs',
      ru: 'ИИ-агенты и автоматизация для предпринимателей',
    },
    description: {
      fr: 'Mammouth AI conçoit des agents intelligents et workflows automatisés pour les TPE et PME : gestion des contacts familles, suivi administratif, rapports, e-mails, CRM, support client. Objectif : libérer du temps en automatisant les tâches répétitives sans remplacer l\'humain.',
      en: 'Mammouth AI builds intelligent agents and automated workflows for SMEs: family contact management, admin follow-up, reporting, e-mails, CRM, customer support. Goal: free up time by automating repetitive tasks without replacing humans.',
      ru: 'Mammouth AI создаёт интеллектуальных агентов и автоматизированные процессы для малого и среднего бизнеса: управление контактами, отчётность, CRM, поддержка клиентов.',
    },
    geo: { fr: 'International · 🇫🇷 🇬🇧 🇪🇺', en: 'International · EU & worldwide', ru: 'Международно' },
    cta: { fr: 'Découvrir Mammouth AI', en: 'Discover Mammouth AI', ru: 'Узнать о Mammouth AI' },
  },
  {
    slug: 'mammouth-motors',
    name: 'Mammouth Motors',
    url: 'https://mammouthmotors.com',
    icon: Car,
    logo: logoMotors,
    color: '#1E3A8A',
    logoBg: 'bg-blue-50',
    tagline: {
      fr: 'Export voitures Dubai → Afrique & gardiennage collection à Nice',
      en: 'Car export Dubai → Africa & classic car storage in Nice',
      ru: 'Экспорт авто Дубай → Африка и хранение коллекционных авто в Ницце',
    },
    description: {
      fr: 'Mammouth Motors exporte des véhicules premium et chinois (BYD, Geely, Chery, MG, Zeekr) depuis Dubai (Al Aweer) vers le Sénégal, la Côte d\'Ivoire, le Cameroun, le Nigeria, le Kenya, la RDC et toute l\'Afrique. La division Mammouth Classic propose un gardiennage sécurisé climatisé pour voitures de collection dans la Vallée du Var, à Nice — au service des collectionneurs de Monaco, Cannes, Antibes et Saint-Tropez.',
      en: 'Mammouth Motors exports premium and Chinese cars (BYD, Geely, Chery, MG, Zeekr) from Dubai (Al Aweer) to Senegal, Ivory Coast, Cameroon, Nigeria, Kenya, DRC and across Africa. Mammouth Classic offers secure climate-controlled storage for collector cars in the Vallée du Var, Nice — serving collectors in Monaco, Cannes, Antibes and Saint-Tropez.',
      ru: 'Mammouth Motors экспортирует премиальные и китайские автомобили (BYD, Geely, Chery, MG, Zeekr) из Дубая в Африку. Mammouth Classic предлагает охраняемое хранение коллекционных авто в Ницце для клиентов из Монако, Канн и Сен-Тропе.',
    },
    geo: { fr: 'Dubai 🇦🇪 · Nice 🇫🇷 · Afrique', en: 'Dubai · Nice · Africa', ru: 'Дубай · Ницца · Африка' },
    cta: { fr: 'Visiter Mammouth Motors', en: 'Visit Mammouth Motors', ru: 'Перейти на Mammouth Motors' },
  },
  {
    slug: 'effl',
    name: 'English for Future Leaders',
    url: 'https://effl.lovable.app',
    icon: GraduationCap,
    logo: logoEffl,
    color: '#7C2D12',
    logoBg: 'bg-orange-50',
    tagline: {
      fr: 'Coaching premium d\'anglais business pour dirigeants',
      en: 'Premium business English coaching for executives',
      ru: 'Премиум-коучинг делового английского для руководителей',
    },
    description: {
      fr: 'EFFL accompagne dirigeants, entrepreneurs et cadres russophones vers la maîtrise de l\'anglais des affaires : communication de leadership, négociations, présentations internationales. Plus de 500 diplômés dans 12 pays.',
      en: 'EFFL coaches executives, entrepreneurs and Russian-speaking leaders to master business English: leadership communication, negotiations and international presentations. 500+ graduates across 12 countries.',
      ru: 'EFFL обучает руководителей и предпринимателей деловому английскому: лидерская коммуникация, переговоры, презентации. Более 500 выпускников в 12 странах.',
    },
    geo: { fr: 'International · EN / RU', en: 'International · EN / RU', ru: 'Международно · EN / RU' },
    cta: { fr: 'Découvrir EFFL', en: 'Discover EFFL', ru: 'Узнать о EFFL' },
  },
];

const MammouthGroup = () => {
  const { language } = useLanguage();
  const lang = (language === 'it' ? 'fr' : language) as 'fr' | 'en' | 'ru';
  const reveal = useScrollReveal();

  const heading =
    language === 'fr' ? 'Mammouth Group' : language === 'en' ? 'Mammouth Group' : 'Mammouth Group';
  const sub =
    language === 'fr'
      ? 'Un écosystème d\'entreprises au service des familles, des dirigeants et des entrepreneurs — de la Côte d\'Azur à Dubai, en passant par l\'Afrique et l\'Europe.'
      : language === 'en'
      ? 'A family of companies serving families, executives and entrepreneurs — from the French Riviera to Dubai, across Africa and Europe.'
      : 'Экосистема компаний для семей, руководителей и предпринимателей — от Лазурного Берега до Дубая, Африки и Европы.';
  const back =
    language === 'fr' ? 'Retour à l\'accueil' : language === 'en' ? 'Back to home' : 'На главную';
  const intro =
    language === 'fr' ? 'Nos entreprises' : language === 'en' ? 'Our companies' : 'Наши компании';
  const geoLabel =
    language === 'fr' ? 'Zone d\'activité' : language === 'en' ? 'Coverage' : 'География';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://mayocreche.fr/mammouth-group',
        name: heading,
        description: sub,
        url: 'https://mayocreche.fr/mammouth-group',
        inLanguage: language,
      },
      {
        '@type': 'Organization',
        '@id': 'https://mayocreche.fr/mammouth-group#group',
        name: 'Mammouth Group',
        url: 'https://mayocreche.fr/mammouth-group',
        description: sub,
        subOrganization: companies.map((c) => ({
          '@type': 'Organization',
          name: c.name,
          url: c.url,
          description: c.description.en,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Mayo', item: 'https://mayocreche.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Mammouth Group', item: 'https://mayocreche.fr/mammouth-group' },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={`Mammouth Group — Mayo, Mammouth AI, Mammouth Motors, EFFL & jemassuremoinscher`}
        description={sub}
        canonical="https://mayocreche.fr/mammouth-group"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[50vh] sm:min-h-[45vh] flex items-center overflow-hidden">
          <img
            src={groupHero}
            alt={heading}
            className="absolute inset-0 w-full h-full object-cover !rounded-none"
            loading="eager"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" aria-hidden="true" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 sm:py-36">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {back}
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              {heading}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
              {sub}
            </p>
          </div>
        </section>

        {/* Companies */}
        <section className="py-16 sm:py-24 px-4 bg-background">
          <div ref={reveal.ref} style={reveal.style} className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8">{intro}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {companies.map((c) => {
                const Icon = c.icon;
                return (
                  <Card
                    key={c.slug}
                    className="relative overflow-hidden border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 flex flex-col group"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: c.color }}
                      aria-hidden="true"
                    />
                    <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl ${c.logoBg} flex items-center justify-center shrink-0 p-2 border border-border/40`}
                        >
                          <img
                            src={c.logo}
                            alt={`${c.name} logo`}
                            className="max-w-full max-h-full object-contain !rounded-none"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" style={{ color: c.color }} />
                          <h3 className="text-xl font-semibold text-foreground">{c.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm font-medium mb-3" style={{ color: c.color }}>
                        {c.tagline[lang]}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                        {c.description[lang]}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground/80 mb-3">
                        {geoLabel} · <span className="text-foreground/80 normal-case tracking-normal">{c.geo[lang]}</span>
                      </p>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline transition-colors"
                        style={{ color: c.color }}
                      >
                        {c.cta[lang]} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MammouthGroup;
