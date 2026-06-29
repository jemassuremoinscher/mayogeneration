export type HighlightedLanguage = 'fr' | 'en' | 'ru' | 'it';

export interface Location {
  slug: string;
  city: string;
  neighborhood?: string;
  comingSoon?: boolean;
  priorityOpening?: boolean; // ouverture prioritaire (sinon liste d'attente)
  highlightedLanguage: HighlightedLanguage; // langue mise en avant
  availableLanguages?: HighlightedLanguage[]; // langues du site
  tagline?: { fr: string; en: string; ru: string; it?: string };
  lat: number;
  lng: number;
  translations: {
    fr: LocationTranslation;
    en: LocationTranslation;
    ru: LocationTranslation;
    it?: LocationTranslation;
  };
}

interface LocationTranslation {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  landmarks: { name: string; distance: string }[];
}

const lm = (n: string, d: string) => ({ name: n, distance: d });

export const locations: Location[] = [
  {
    slug: 'creche-nice-medecin',
    city: 'Nice',
    neighborhood: 'Médecin',
    priorityOpening: true,
    highlightedLanguage: 'it',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'Au cœur de Nice, l\'éveil multilingue dans une crèche premium.',
      en: 'In the heart of Nice, multilingual childcare in a premium nursery.',
      ru: 'В самом сердце Ниццы, многоязычное развитие в премиум-яслях.',
      it: 'Nel cuore di Nizza, risveglio multilingue in un asilo nido premium.',
    },
    lat: 43.7009,
    lng: 7.2683,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Nice – Quartier Médecin',
        metaTitle: 'Crèche Multilingue Nice Médecin | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche et nursery privée multilingue à Nice Médecin. Accueil personnalisé en français, anglais et italien pour les enfants de 3 mois à 3 ans.',
        intro: 'Située au cœur du quartier Jean Médecin à Nice, Mayo accueille vos enfants dans un cadre chaleureux et stimulant. Notre micro-crèche multilingue propose un accompagnement personnalisé en français, anglais et italien — la langue mise en avant à Nice — idéal pour les familles internationales de la Côte d\'Azur. À quelques pas de l\'avenue Jean Médecin et de la place Masséna, notre crèche bénéficie d\'un emplacement central facilement accessible en tramway et en bus. Nos éducatrices qualifiées mettent en œuvre une pédagogie bienveillante, inspirée des meilleures pratiques européennes, pour favoriser l\'éveil et le développement de chaque enfant.',
        landmarks: [
          lm('Avenue Jean Médecin', '2 min à pied'),
          lm('Place Masséna', '5 min à pied'),
          lm('Gare Nice-Ville', '8 min à pied'),
          lm('Promenade des Anglais', '10 min à pied'),
          lm('Parc Albert 1er', '7 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Nice – Médecin District',
        metaTitle: 'Multilingual Nursery Nice Médecin | Mayo – Private Childcare French Riviera',
        metaDescription: 'Mayo, multilingual private nursery in Nice Médecin. Personalized childcare in French, English and Italian for children aged 3 months to 3 years.',
        intro: 'Located in the heart of Nice\'s Jean Médecin district, Mayo welcomes your children in a warm and stimulating environment. Our multilingual nursery offers personalized care in French, English and Italian — the highlighted language in Nice — ideal for international families on the French Riviera. Just steps from Avenue Jean Médecin and Place Masséna, our nursery benefits from a central location easily accessible by tram and bus.',
        landmarks: [
          lm('Avenue Jean Médecin', '2 min walk'),
          lm('Place Masséna', '5 min walk'),
          lm('Nice-Ville Station', '8 min walk'),
          lm('Promenade des Anglais', '10 min walk'),
          lm('Albert 1st Park', '7 min walk'),
        ],
      },
      ru: {
        h1: 'Детский сад в Ницце – район Медесен',
        metaTitle: 'Многоязычный детский сад Ницца Медесен | Mayo',
        metaDescription: 'Mayo – многоязычный частный детский сад в Ницце. Уход на французском, английском и итальянском.',
        intro: 'В сердце района Жан Медесен Mayo принимает ваших детей в тёплой и стимулирующей обстановке. Наш многоязычный детский сад предлагает индивидуальный уход на французском, английском и итальянском.',
        landmarks: [
          lm('Авеню Жан Медесен', '2 мин'),
          lm('Площадь Массена', '5 мин'),
          lm('Вокзал Ницца-Виль', '8 мин'),
        ],
      },
      it: {
        h1: 'Asilo nido e custodia bambini a Nizza – Quartiere Médecin',
        metaTitle: 'Asilo Nido Multilingue Nizza Médecin | Mayo – Costa Azzurra',
        metaDescription: 'Mayo, micro-nido multilingue a Nizza Médecin. Accoglienza in francese, inglese e italiano per bambini da 3 mesi a 3 anni.',
        intro: 'Nel cuore del quartiere Jean Médecin a Nizza, Mayo accoglie i vostri bambini in un ambiente caloroso e stimolante. Il nostro micro-nido multilingue offre un accompagnamento personalizzato in francese, inglese e italiano — la lingua valorizzata a Nizza — ideale per le famiglie internazionali della Costa Azzurra.',
        landmarks: [
          lm('Avenue Jean Médecin', '2 min a piedi'),
          lm('Place Masséna', '5 min a piedi'),
          lm('Stazione Nice-Ville', '8 min a piedi'),
        ],
      },
    },
  },
  {
    slug: 'creche-cannes',
    city: 'Cannes',
    comingSoon: true,
    highlightedLanguage: 'ru',
    availableLanguages: ['fr', 'en', 'ru', 'it'],
    tagline: {
      fr: 'Une crèche d\'exception pour une clientèle internationale exigeante.',
      en: 'An exceptional nursery for a demanding international clientele.',
      ru: 'Исключительный детский сад для требовательной международной клиентуры.',
    },
    lat: 43.5528,
    lng: 7.0174,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Cannes',
        metaTitle: 'Crèche Multilingue Cannes | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche multilingue à Cannes. Français, anglais, russe (italien sur demande).',
        intro: 'Mayo Cannes offre un accueil premium pour les tout-petits au cœur de la ville des festivals, avec un programme en français, anglais et russe — l\'italien reste accessible via le réseau Mayo.',
        landmarks: [
          lm('La Croisette', '5 min à pied'),
          lm('Palais des Festivals', '8 min à pied'),
          lm('Rue d\'Antibes', '3 min à pied'),
          lm('Gare de Cannes', '6 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Cannes',
        metaTitle: 'Multilingual Nursery Cannes | Mayo',
        metaDescription: 'Mayo, multilingual nursery in Cannes. French, English, Russian (Italian on request).',
        intro: 'Mayo Cannes offers premium childcare in the heart of the festival city, with a program in French, English and Russian — Italian remains available via the Mayo network.',
        landmarks: [
          lm('La Croisette', '5 min walk'),
          lm('Palais des Festivals', '8 min walk'),
          lm('Rue d\'Antibes', '3 min walk'),
        ],
      },
      ru: {
        h1: 'Детский сад в Каннах',
        metaTitle: 'Многоязычный детский сад Канны | Mayo',
        metaDescription: 'Mayo – многоязычный детский сад в Каннах. Французский, английский, русский.',
        intro: 'Mayo Канны предлагает премиальный уход за малышами в самом сердце города фестивалей, с программой на французском, английском и русском.',
        landmarks: [
          lm('Круазет', '5 мин'),
          lm('Дворец фестивалей', '8 мин'),
        ],
      },
    },
  },
  {
    slug: 'creche-antibes',
    city: 'Antibes',
    comingSoon: true,
    highlightedLanguage: 'it',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'Entre Italie et Riviera, l\'italien comme deuxième langue maternelle.',
      en: 'Between Italy and the Riviera, Italian as a second mother tongue.',
      ru: 'Между Италией и Ривьерой, итальянский как второй родной язык.',
      it: 'Tra Italia e Costa Azzurra, l\'italiano come seconda lingua madre.',
    },
    lat: 43.5804,
    lng: 7.1251,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Antibes',
        metaTitle: 'Crèche Multilingue Antibes | Mayo',
        metaDescription: 'Mayo, micro-crèche multilingue à Antibes. Français, anglais, italien mis en avant.',
        intro: 'Mayo Antibes accueille vos enfants dans le cadre enchanteur de la cité des remparts, avec un programme français, anglais et italien.',
        landmarks: [
          lm('Vieil Antibes', '4 min à pied'),
          lm('Port Vauban', '7 min à pied'),
          lm('Marché provençal', '5 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Antibes',
        metaTitle: 'Multilingual Nursery Antibes | Mayo',
        metaDescription: 'Mayo, multilingual nursery in Antibes. French, English, Italian highlighted.',
        intro: 'Mayo Antibes welcomes your children in the enchanting walled city, with French, English and Italian.',
        landmarks: [
          lm('Old Antibes', '4 min walk'),
          lm('Port Vauban', '7 min walk'),
        ],
      },
      ru: {
        h1: 'Детский сад в Антибе',
        metaTitle: 'Многоязычный детский сад Антиб | Mayo',
        metaDescription: 'Mayo – детский сад в Антибе. Французский, английский, итальянский.',
        intro: 'Mayo Антиб принимает ваших детей в очаровательном городе-крепости.',
        landmarks: [lm('Старый Антиб', '4 мин'), lm('Порт Вобан', '7 мин')],
      },
      it: {
        h1: 'Asilo nido ad Antibes',
        metaTitle: 'Asilo Nido Multilingue Antibes | Mayo',
        metaDescription: 'Mayo, asilo nido multilingue ad Antibes. Francese, inglese e italiano valorizzato.',
        intro: 'Mayo Antibes accoglie i vostri bambini nella suggestiva città fortificata, con programma in francese, inglese e italiano.',
        landmarks: [lm('Vieil Antibes', '4 min a piedi'), lm('Port Vauban', '7 min a piedi')],
      },
    },
  },
  {
    slug: 'creche-monaco',
    city: 'Monaco',
    comingSoon: true,
    highlightedLanguage: 'ru',
    availableLanguages: ['fr', 'en', 'ru'],
    tagline: {
      fr: 'Aux portes de la Principauté, une crèche premium pour les familles frontalières.',
      en: 'At the gates of the Principality, premium childcare for cross-border families.',
      ru: 'У ворот Княжества, премиальный детский сад для приграничных семей.',
    },
    lat: 43.7384,
    lng: 7.4246,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Monaco',
        metaTitle: 'Crèche Multilingue Monaco | Mayo',
        metaDescription: 'Mayo, micro-crèche premium à Monaco. Français, anglais, russe mis en avant.',
        intro: 'Mayo Monaco propose un accueil d\'excellence pour les enfants des familles internationales de la Principauté, avec le russe mis en avant.',
        landmarks: [
          lm('Casino de Monte-Carlo', '5 min à pied'),
          lm('Port Hercule', '6 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Monaco',
        metaTitle: 'Multilingual Nursery Monaco | Mayo',
        metaDescription: 'Mayo, premium multilingual nursery in Monaco. French, English, Russian highlighted.',
        intro: 'Mayo Monaco offers excellence in childcare for international families of the Principality, with Russian highlighted.',
        landmarks: [lm('Monte-Carlo Casino', '5 min walk'), lm('Port Hercule', '6 min walk')],
      },
      ru: {
        h1: 'Детский сад в Монако',
        metaTitle: 'Многоязычный детский сад Монако | Mayo',
        metaDescription: 'Mayo – премиальный детский сад в Монако. Русский язык в приоритете.',
        intro: 'Mayo Монако предлагает превосходный уход для международных семей Княжества с акцентом на русский язык.',
        landmarks: [lm('Казино Монте-Карло', '5 мин'), lm('Порт Эркюль', '6 мин')],
      },
    },
  },
  {
    slug: 'creche-sophia-antipolis',
    city: 'Sophia Antipolis',
    comingSoon: true,
    highlightedLanguage: 'en',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'Au cœur du hub international, l\'anglais comme langue d\'éveil.',
      en: 'At the heart of the international hub, English as the awakening language.',
      ru: 'В центре международного хаба, английский как язык развития.',
    },
    lat: 43.6165,
    lng: 7.0556,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Sophia Antipolis',
        metaTitle: 'Crèche Multilingue Sophia Antipolis | Mayo',
        metaDescription: 'Mayo, micro-crèche multilingue à Sophia Antipolis. Français, anglais, italien disponible.',
        intro: 'Mayo Sophia Antipolis accueille les enfants des familles actives du pôle technologique avec un programme en français, anglais et italien sur demande.',
        landmarks: [
          lm('Pôle technologique Sophia Antipolis', '3 min à pied'),
          lm('Village de Biot', '5 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Sophia Antipolis',
        metaTitle: 'Multilingual Nursery Sophia Antipolis | Mayo',
        metaDescription: 'Mayo, multilingual nursery in Sophia Antipolis. French, English, Italian available.',
        intro: 'Mayo Sophia Antipolis welcomes children from working families of the tech park, with a program in French, English and Italian on request.',
        landmarks: [
          lm('Sophia Antipolis Technology Park', '3 min walk'),
          lm('Biot Village', '5 min walk'),
        ],
      },
      ru: {
        h1: 'Детский сад в София-Антиполис',
        metaTitle: 'Детский сад София-Антиполис | Mayo',
        metaDescription: 'Mayo – детский сад в София-Антиполис. Французский, английский, итальянский.',
        intro: 'Mayo София-Антиполис принимает детей семей технополиса.',
        landmarks: [lm('Технопарк София-Антиполис', '3 мин')],
      },
    },
  },
  // ====== 6 nouvelles crèches ======
  {
    slug: 'cap-dail',
    city: 'Cap-d\'Ail',
    comingSoon: true,
    priorityOpening: true,
    highlightedLanguage: 'ru',
    availableLanguages: ['fr', 'en', 'ru'],
    tagline: {
      fr: 'À deux pas de Monaco, une crèche premium pensée pour les familles franco-russophones.',
      en: 'A stone\'s throw from Monaco, a premium nursery designed for French-Russian families.',
      ru: 'В двух шагах от Монако — премиальные ясли для франко-русскоязычных семей.',
    },
    lat: 43.7256,
    lng: 7.4108,
    translations: {
      fr: {
        h1: 'Crèche premium à Cap-d\'Ail – Mayo',
        metaTitle: 'Crèche Multilingue Cap-d\'Ail | Mayo – Aux portes de Monaco',
        metaDescription: 'Mayo Cap-d\'Ail, crèche premium franco-russophone aux portes de Monaco. Français, anglais, russe.',
        intro: 'À deux pas de Monaco, Mayo Cap-d\'Ail accueille les familles internationales avec un accompagnement bilingue franco-russe et anglais. Ouverture prioritaire — places limitées.',
        landmarks: [
          lm('Frontière Monaco', '3 min en voiture'),
          lm('Plage Mala', '8 min à pied'),
          lm('Gare Cap-d\'Ail', '5 min à pied'),
        ],
      },
      en: {
        h1: 'Premium Nursery in Cap-d\'Ail – Mayo',
        metaTitle: 'Multilingual Nursery Cap-d\'Ail | Mayo – At the gates of Monaco',
        metaDescription: 'Mayo Cap-d\'Ail, premium French-Russian nursery at the gates of Monaco.',
        intro: 'A stone\'s throw from Monaco, Mayo Cap-d\'Ail welcomes international families with bilingual French-Russian and English care. Priority opening — limited spots.',
        landmarks: [
          lm('Monaco Border', '3 min drive'),
          lm('Mala Beach', '8 min walk'),
          lm('Cap-d\'Ail Station', '5 min walk'),
        ],
      },
      ru: {
        h1: 'Премиум детский сад в Кап-д\'Ай – Mayo',
        metaTitle: 'Многоязычный детский сад Кап-д\'Ай | Mayo – У ворот Монако',
        metaDescription: 'Mayo Кап-д\'Ай – премиальный франко-русский детский сад у ворот Монако.',
        intro: 'В двух шагах от Монако, Mayo Кап-д\'Ай принимает международные семьи с двуязычным франко-русским и английским уходом. Приоритетное открытие — мест мало.',
        landmarks: [
          lm('Граница с Монако', '3 мин на машине'),
          lm('Пляж Мала', '8 мин пешком'),
        ],
      },
    },
  },
  {
    slug: 'cap-ferrat',
    city: 'Saint-Jean-Cap-Ferrat',
    comingSoon: true,
    highlightedLanguage: 'ru',
    availableLanguages: ['fr', 'en', 'ru'],
    tagline: {
      fr: 'L\'excellence multilingue sur la presqu\'île la plus exclusive de la Riviera.',
      en: 'Multilingual excellence on the most exclusive peninsula of the Riviera.',
      ru: 'Многоязычное превосходство на самом эксклюзивном полуострове Ривьеры.',
    },
    lat: 43.6859,
    lng: 7.3328,
    translations: {
      fr: {
        h1: 'Crèche premium à Saint-Jean-Cap-Ferrat – Mayo',
        metaTitle: 'Crèche Multilingue Cap-Ferrat | Mayo',
        metaDescription: 'Mayo Cap-Ferrat, crèche multilingue premium sur la presqu\'île. Liste d\'attente.',
        intro: 'L\'excellence multilingue sur la presqu\'île la plus exclusive de la Riviera. Programme français, anglais, russe. Secteur en forte demande — inscription sur liste d\'attente prioritaire.',
        landmarks: [
          lm('Villa Ephrussi de Rothschild', '5 min en voiture'),
          lm('Port de Saint-Jean', '4 min à pied'),
          lm('Beaulieu-sur-Mer', '7 min en voiture'),
        ],
      },
      en: {
        h1: 'Premium Nursery in Saint-Jean-Cap-Ferrat – Mayo',
        metaTitle: 'Multilingual Nursery Cap-Ferrat | Mayo',
        metaDescription: 'Mayo Cap-Ferrat, premium multilingual nursery. Waitlist.',
        intro: 'Multilingual excellence on the Riviera\'s most exclusive peninsula. French, English, Russian. High-demand area — priority waitlist registration.',
        landmarks: [
          lm('Villa Ephrussi de Rothschild', '5 min drive'),
          lm('Saint-Jean Harbor', '4 min walk'),
        ],
      },
      ru: {
        h1: 'Премиум детский сад в Сен-Жан-Кап-Ферра – Mayo',
        metaTitle: 'Многоязычный детский сад Кап-Ферра | Mayo',
        metaDescription: 'Mayo Кап-Ферра – премиальный многоязычный детский сад. Лист ожидания.',
        intro: 'Многоязычное превосходство на самом эксклюзивном полуострове Ривьеры. Французский, английский, русский. Лист приоритетного ожидания.',
        landmarks: [lm('Вилла Эфрусси-де-Ротшильд', '5 мин на машине')],
      },
    },
  },
  {
    slug: 'beausoleil',
    city: 'Beausoleil',
    comingSoon: true,
    highlightedLanguage: 'ru',
    availableLanguages: ['fr', 'en', 'ru'],
    tagline: {
      fr: 'Aux portes de Monaco, l\'accueil bilingue pour les familles frontalières.',
      en: 'At the gates of Monaco, bilingual care for cross-border families.',
      ru: 'У ворот Монако, двуязычный уход для приграничных семей.',
    },
    lat: 43.7390,
    lng: 7.4242,
    translations: {
      fr: {
        h1: 'Crèche à Beausoleil – Mayo',
        metaTitle: 'Crèche Multilingue Beausoleil | Mayo – Frontière Monaco',
        metaDescription: 'Mayo Beausoleil, crèche bilingue pour familles frontalières de Monaco. Français, anglais, russe.',
        intro: 'Aux portes de Monaco, Mayo Beausoleil propose un accueil bilingue pour les familles frontalières travaillant en Principauté. Inscription sur liste d\'attente prioritaire.',
        landmarks: [
          lm('Frontière Monaco', '2 min à pied'),
          lm('Casino de Monte-Carlo', '8 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery in Beausoleil – Mayo',
        metaTitle: 'Multilingual Nursery Beausoleil | Mayo – Monaco border',
        metaDescription: 'Mayo Beausoleil, bilingual nursery for cross-border Monaco families.',
        intro: 'At the gates of Monaco, Mayo Beausoleil offers bilingual care for families working in the Principality. Priority waitlist registration.',
        landmarks: [
          lm('Monaco Border', '2 min walk'),
          lm('Monte-Carlo Casino', '8 min walk'),
        ],
      },
      ru: {
        h1: 'Детский сад в Босолее – Mayo',
        metaTitle: 'Многоязычный детский сад Босолей | Mayo',
        metaDescription: 'Mayo Босолей – двуязычный детский сад для приграничных семей Монако.',
        intro: 'У ворот Монако, Mayo Босолей предлагает двуязычный уход для семей, работающих в Княжестве. Лист приоритетного ожидания.',
        landmarks: [lm('Граница с Монако', '2 мин пешком')],
      },
    },
  },
  {
    slug: 'villefranche',
    city: 'Villefranche-sur-Mer',
    comingSoon: true,
    highlightedLanguage: 'it',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'Entre mer et collines, l\'éveil aux langues dans un cadre d\'exception.',
      en: 'Between sea and hills, language awakening in an exceptional setting.',
      ru: 'Между морем и холмами, языковое развитие в исключительной обстановке.',
      it: 'Tra mare e colline, il risveglio linguistico in una cornice eccezionale.',
    },
    lat: 43.7037,
    lng: 7.3105,
    translations: {
      fr: {
        h1: 'Crèche à Villefranche-sur-Mer – Mayo',
        metaTitle: 'Crèche Multilingue Villefranche-sur-Mer | Mayo',
        metaDescription: 'Mayo Villefranche-sur-Mer, crèche multilingue avec italien mis en avant.',
        intro: 'Entre mer et collines, Mayo Villefranche-sur-Mer offre l\'éveil aux langues dans un cadre d\'exception, avec l\'italien mis en avant. Liste d\'attente prioritaire.',
        landmarks: [
          lm('Rade de Villefranche', '4 min à pied'),
          lm('Citadelle Saint-Elme', '6 min à pied'),
        ],
      },
      en: {
        h1: 'Nursery in Villefranche-sur-Mer – Mayo',
        metaTitle: 'Multilingual Nursery Villefranche | Mayo',
        metaDescription: 'Mayo Villefranche-sur-Mer, multilingual nursery with highlighted Italian.',
        intro: 'Between sea and hills, Mayo Villefranche-sur-Mer offers language awakening in an exceptional setting, with Italian highlighted.',
        landmarks: [lm('Villefranche Bay', '4 min walk'), lm('Saint-Elme Citadel', '6 min walk')],
      },
      ru: {
        h1: 'Детский сад в Вильфранш-сюр-Мер – Mayo',
        metaTitle: 'Многоязычный детский сад Вильфранш | Mayo',
        metaDescription: 'Mayo Вильфранш-сюр-Мер – многоязычный детский сад с акцентом на итальянский.',
        intro: 'Между морем и холмами, Mayo Вильфранш-сюр-Мер предлагает языковое развитие в исключительной обстановке.',
        landmarks: [lm('Бухта Вильфранш', '4 мин')],
      },
      it: {
        h1: 'Asilo nido a Villefranche-sur-Mer – Mayo',
        metaTitle: 'Asilo Nido Multilingue Villefranche | Mayo',
        metaDescription: 'Mayo Villefranche-sur-Mer, asilo nido multilingue con italiano valorizzato.',
        intro: 'Tra mare e colline, Mayo Villefranche-sur-Mer offre il risveglio linguistico in una cornice eccezionale, con l\'italiano valorizzato.',
        landmarks: [lm('Rada di Villefranche', '4 min a piedi')],
      },
    },
  },
  {
    slug: 'menton',
    city: 'Menton',
    comingSoon: true,
    highlightedLanguage: 'it',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'À la frontière italienne, une crèche où l\'italien se vit au quotidien.',
      en: 'At the Italian border, a nursery where Italian is lived daily.',
      ru: 'На итальянской границе, детский сад, где итальянский — повседневность.',
      it: 'Al confine italiano, un asilo nido dove l\'italiano si vive ogni giorno.',
    },
    lat: 43.7747,
    lng: 7.4985,
    translations: {
      fr: {
        h1: 'Crèche à Menton – Mayo',
        metaTitle: 'Crèche Multilingue Menton | Mayo – Frontière italienne',
        metaDescription: 'Mayo Menton, crèche italienne mise en avant à la frontière. Français, anglais, italien.',
        intro: 'À la frontière italienne, Mayo Menton est une crèche où l\'italien se vit au quotidien. Programme français, anglais, italien. Liste d\'attente prioritaire.',
        landmarks: [
          lm('Vieille Ville de Menton', '4 min à pied'),
          lm('Jardins Biovès', '5 min à pied'),
          lm('Frontière italienne', '7 min en voiture'),
        ],
      },
      en: {
        h1: 'Nursery in Menton – Mayo',
        metaTitle: 'Multilingual Nursery Menton | Mayo – Italian border',
        metaDescription: 'Mayo Menton, Italian-highlighted nursery at the border.',
        intro: 'At the Italian border, Mayo Menton is a nursery where Italian is lived daily. French, English, Italian program.',
        landmarks: [
          lm('Menton Old Town', '4 min walk'),
          lm('Biovès Gardens', '5 min walk'),
          lm('Italian border', '7 min drive'),
        ],
      },
      ru: {
        h1: 'Детский сад в Ментоне – Mayo',
        metaTitle: 'Многоязычный детский сад Ментон | Mayo',
        metaDescription: 'Mayo Ментон – детский сад на итальянской границе с акцентом на итальянский.',
        intro: 'На итальянской границе, Mayo Ментон – детский сад, где итальянский язык — повседневность.',
        landmarks: [lm('Старый город Ментона', '4 мин'), lm('Граница Италии', '7 мин на машине')],
      },
      it: {
        h1: 'Asilo nido a Mentone – Mayo',
        metaTitle: 'Asilo Nido Multilingue Mentone | Mayo – Confine italiano',
        metaDescription: 'Mayo Mentone, asilo nido italiano valorizzato al confine.',
        intro: 'Al confine italiano, Mayo Mentone è un asilo nido dove l\'italiano si vive ogni giorno. Programma in francese, inglese e italiano.',
        landmarks: [
          lm('Centro storico di Mentone', '4 min a piedi'),
          lm('Confine italiano', '7 min in auto'),
        ],
      },
    },
  },
  {
    slug: 'mougins',
    city: 'Mougins',
    comingSoon: true,
    highlightedLanguage: 'en',
    availableLanguages: ['fr', 'en', 'it'],
    tagline: {
      fr: 'Au cœur de la communauté internationale de l\'arrière-pays cannois.',
      en: 'At the heart of the international community of the Cannes hinterland.',
      ru: 'В сердце международного сообщества внутренних земель Канн.',
    },
    lat: 43.6004,
    lng: 7.0066,
    translations: {
      fr: {
        h1: 'Crèche à Mougins – Mayo',
        metaTitle: 'Crèche Multilingue Mougins | Mayo – Communauté internationale',
        metaDescription: 'Mayo Mougins, crèche multilingue avec l\'anglais renforcé. Français, anglais, italien.',
        intro: 'Au cœur de la communauté internationale de l\'arrière-pays cannois, Mayo Mougins met l\'anglais à l\'honneur. Liste d\'attente prioritaire.',
        landmarks: [
          lm('Vieux village de Mougins', '3 min à pied'),
          lm('Mougins School', '5 min en voiture'),
        ],
      },
      en: {
        h1: 'Nursery in Mougins – Mayo',
        metaTitle: 'Multilingual Nursery Mougins | Mayo – International community',
        metaDescription: 'Mayo Mougins, multilingual nursery with English highlighted.',
        intro: 'At the heart of the international community of the Cannes hinterland, Mayo Mougins highlights English.',
        landmarks: [
          lm('Mougins Old Village', '3 min walk'),
          lm('Mougins School', '5 min drive'),
        ],
      },
      ru: {
        h1: 'Детский сад в Мужене – Mayo',
        metaTitle: 'Многоязычный детский сад Мужен | Mayo',
        metaDescription: 'Mayo Мужен – многоязычный детский сад с усиленным английским.',
        intro: 'В сердце международного сообщества внутренних земель Канн, Mayo Мужен делает акцент на английский язык.',
        landmarks: [lm('Старая деревня Мужен', '3 мин')],
      },
    },
  },
];

export const getLocationTranslation = (loc: Location, lang: string): LocationTranslation => {
  const trs = loc.translations as Record<string, LocationTranslation | undefined>;
  return trs[lang] || trs.fr;
};
