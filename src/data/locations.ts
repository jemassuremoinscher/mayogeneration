export interface Location {
  slug: string;
  city: string;
  neighborhood?: string;
  comingSoon?: boolean;
  lat: number;
  lng: number;
  translations: {
    fr: LocationTranslation;
    en: LocationTranslation;
    ru: LocationTranslation;
  };
}

interface LocationTranslation {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  landmarks: { name: string; distance: string }[];
}

export const locations: Location[] = [
  {
    slug: 'creche-nice-medecin',
    city: 'Nice',
    neighborhood: 'Médecin',
    lat: 43.7009,
    lng: 7.2683,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Nice – Quartier Médecin',
        metaTitle: 'Crèche Multilingue Nice Médecin | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche et nursery privée multilingue à Nice Médecin. Accueil personnalisé en français, anglais et russe pour les enfants de 3 mois à 3 ans sur la Côte d\'Azur.',
        intro: 'Située au cœur du quartier Jean Médecin à Nice, Mayo accueille vos enfants dans un cadre chaleureux et stimulant. Notre micro-crèche multilingue propose un accompagnement personnalisé en français, anglais et russe, idéal pour les familles internationales de la Côte d\'Azur. À quelques pas de l\'avenue Jean Médecin et de la place Masséna, notre crèche bénéficie d\'un emplacement central facilement accessible en tramway et en bus. Nos éducatrices qualifiées mettent en œuvre une pédagogie bienveillante, inspirée des meilleures pratiques européennes, pour favoriser l\'éveil et le développement de chaque enfant. Les repas sont préparés sur place avec des produits frais et locaux, en privilégiant les circuits courts de la région niçoise. Nous proposons des horaires flexibles adaptés aux rythmes des parents actifs, avec un accueil du lundi au vendredi de 8h à 18h. L\'environnement de Mayo est pensé pour stimuler la curiosité des tout-petits : espaces sensoriels, coin lecture multilingue, jardin intérieur et ateliers créatifs rythment le quotidien. Notre engagement envers la qualité se traduit par un taux d\'encadrement supérieur aux normes, garantissant une attention individualisée pour chaque enfant. Rejoignez la communauté Mayo à Nice et offrez à votre enfant le meilleur départ dans la vie, au cœur de la Riviera française.',
        landmarks: [
          { name: 'Avenue Jean Médecin', distance: '2 min à pied' },
          { name: 'Place Masséna', distance: '5 min à pied' },
          { name: 'Gare Nice-Ville', distance: '8 min à pied' },
          { name: 'Promenade des Anglais', distance: '10 min à pied' },
          { name: 'Parc Albert 1er', distance: '7 min à pied' },
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Nice – Médecin District',
        metaTitle: 'Multilingual Nursery Nice Médecin | Mayo – Private Childcare French Riviera',
        metaDescription: 'Mayo, multilingual private nursery in Nice Médecin. Personalized childcare in French, English and Russian for children aged 3 months to 3 years on the French Riviera.',
        intro: 'Located in the heart of Nice\'s Jean Médecin district, Mayo welcomes your children in a warm and stimulating environment. Our multilingual nursery offers personalized care in French, English, and Russian – ideal for international families on the French Riviera. Just steps from Avenue Jean Médecin and Place Masséna, our nursery benefits from a central location easily accessible by tram and bus. Our qualified educators implement a caring pedagogy inspired by the best European practices to promote each child\'s development and awakening. Meals are prepared on-site with fresh, local products, prioritizing short supply chains from the Nice region. We offer flexible schedules adapted to working parents, with care available Monday to Friday from 8am to 6pm. Mayo\'s environment is designed to stimulate toddlers\' curiosity: sensory spaces, a multilingual reading corner, an indoor garden, and creative workshops punctuate daily life. Our commitment to quality is reflected in a staff-to-child ratio exceeding standards, ensuring individualized attention for every child. Join the Mayo community in Nice and give your child the best start in life, in the heart of the French Riviera.',
        landmarks: [
          { name: 'Avenue Jean Médecin', distance: '2 min walk' },
          { name: 'Place Masséna', distance: '5 min walk' },
          { name: 'Nice-Ville Station', distance: '8 min walk' },
          { name: 'Promenade des Anglais', distance: '10 min walk' },
          { name: 'Albert 1st Park', distance: '7 min walk' },
        ],
      },
      ru: {
        h1: 'Детский сад и присмотр за детьми в Ницце – район Медесен',
        metaTitle: 'Многоязычный детский сад Ницца Медесен | Mayo – Частный детский сад Лазурный Берег',
        metaDescription: 'Mayo – многоязычный частный детский сад в Ницце Медесен. Индивидуальный уход на французском, английском и русском для детей от 3 месяцев до 3 лет на Лазурном Берегу.',
        intro: 'Расположенный в самом сердце района Жан Медесен в Ницце, Mayo принимает ваших детей в тёплой и стимулирующей обстановке. Наш многоязычный детский сад предлагает индивидуальный уход на французском, английском и русском языках – идеально для международных семей Лазурного Берега. В нескольких шагах от авеню Жан Медесен и площади Массена, наш детский сад находится в центральном месте, легко доступном на трамвае и автобусе. Наши квалифицированные воспитатели реализуют заботливую педагогику, вдохновлённую лучшими европейскими практиками, для развития и пробуждения каждого ребёнка. Питание готовится на месте из свежих местных продуктов. Мы предлагаем гибкий график, адаптированный к ритму работающих родителей, с приёмом с понедельника по пятницу с 8:00 до 18:00. Среда Mayo создана для стимулирования любознательности малышей: сенсорные пространства, многоязычный уголок чтения, внутренний сад и творческие мастерские. Наше стремление к качеству отражается в соотношении персонала к детям, превышающем стандарты. Присоединяйтесь к сообществу Mayo в Ницце.',
        landmarks: [
          { name: 'Авеню Жан Медесен', distance: '2 мин пешком' },
          { name: 'Площадь Массена', distance: '5 мин пешком' },
          { name: 'Вокзал Ницца-Виль', distance: '8 мин пешком' },
          { name: 'Английская набережная', distance: '10 мин пешком' },
          { name: 'Парк Альберта I', distance: '7 мин пешком' },
        ],
      },
    },
  },
  {
    slug: 'creche-cannes',
    city: 'Cannes',
    comingSoon: true,
    lat: 43.5528,
    lng: 7.0174,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Cannes',
        metaTitle: 'Crèche Multilingue Cannes | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche et nursery privée multilingue à Cannes. Garde d\'enfants personnalisée en français, anglais et russe sur la Côte d\'Azur.',
        intro: 'Mayo Cannes offre un accueil premium pour les tout-petits au cœur de la ville des festivals. Notre micro-crèche multilingue est idéalement située à proximité de la Croisette, dans un environnement sécurisé et lumineux. Nous proposons un programme éducatif trilingue en français, anglais et russe, adapté aux familles internationales qui résident ou travaillent à Cannes. Nos éducatrices diplômées accompagnent chaque enfant dans son développement avec bienveillance et professionnalisme. Les espaces intérieurs sont aménagés selon les principes Montessori, favorisant l\'autonomie et la créativité. Notre cuisine prépare quotidiennement des repas équilibrés avec des produits bio et locaux des marchés cannois. Le jardin privatif permet aux enfants de profiter du climat méditerranéen en toute sécurité. Les horaires sont adaptés aux professionnels actifs, avec possibilité d\'accueil étendu sur demande. Mayo Cannes collabore avec des intervenants spécialisés en éveil musical, motricité et arts plastiques pour enrichir le quotidien des enfants. Notre approche multilingue naturelle permet aux enfants d\'acquérir les bases de trois langues dès le plus jeune âge. Choisissez Mayo Cannes pour un accompagnement d\'exception sur la Côte d\'Azur.',
        landmarks: [
          { name: 'La Croisette', distance: '5 min à pied' },
          { name: 'Palais des Festivals', distance: '8 min à pied' },
          { name: 'Rue d\'Antibes', distance: '3 min à pied' },
          { name: 'Gare de Cannes', distance: '6 min à pied' },
          { name: 'Port de Cannes', distance: '10 min à pied' },
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Cannes',
        metaTitle: 'Multilingual Nursery Cannes | Mayo – Private Childcare French Riviera',
        metaDescription: 'Mayo, multilingual private nursery in Cannes. Personalized childcare in French, English and Russian on the French Riviera.',
        intro: 'Mayo Cannes offers premium childcare in the heart of the festival city. Our multilingual nursery is ideally located near the Croisette, in a secure and bright environment. We offer a trilingual educational program in French, English, and Russian, tailored to international families living or working in Cannes. Our qualified educators support each child\'s development with care and professionalism. Indoor spaces are designed following Montessori principles, encouraging autonomy and creativity. Our kitchen prepares daily balanced meals with organic and local products from Cannes markets. The private garden allows children to enjoy the Mediterranean climate safely. Schedules are adapted to working professionals, with extended care available on request. Mayo Cannes collaborates with specialists in musical awakening, motor skills, and visual arts to enrich children\'s daily lives. Our natural multilingual approach allows children to acquire the basics of three languages from an early age. Choose Mayo Cannes for exceptional childcare on the French Riviera.',
        landmarks: [
          { name: 'La Croisette', distance: '5 min walk' },
          { name: 'Palais des Festivals', distance: '8 min walk' },
          { name: 'Rue d\'Antibes', distance: '3 min walk' },
          { name: 'Cannes Station', distance: '6 min walk' },
          { name: 'Port of Cannes', distance: '10 min walk' },
        ],
      },
      ru: {
        h1: 'Детский сад и присмотр за детьми в Каннах',
        metaTitle: 'Многоязычный детский сад Канны | Mayo – Частный детский сад Лазурный Берег',
        metaDescription: 'Mayo – многоязычный частный детский сад в Каннах. Индивидуальный уход на французском, английском и русском на Лазурном Берегу.',
        intro: 'Mayo Канны предлагает премиальный уход за малышами в самом сердце города фестивалей. Наш многоязычный детский сад идеально расположен рядом с Круазет, в безопасной и светлой обстановке. Мы предлагаем трёхъязычную образовательную программу на французском, английском и русском языках, адаптированную для международных семей, проживающих или работающих в Каннах. Наши дипломированные воспитатели сопровождают каждого ребёнка в его развитии с заботой и профессионализмом. Внутренние пространства оформлены по принципам Монтессори, способствуя самостоятельности и творчеству. Наша кухня ежедневно готовит сбалансированные блюда из органических местных продуктов. Частный сад позволяет детям наслаждаться средиземноморским климатом в полной безопасности. Выберите Mayo Канны для исключительного ухода на Лазурном Берегу.',
        landmarks: [
          { name: 'Круазет', distance: '5 мин пешком' },
          { name: 'Дворец фестивалей', distance: '8 мин пешком' },
          { name: 'Рю д\'Антиб', distance: '3 мин пешком' },
          { name: 'Вокзал Канн', distance: '6 мин пешком' },
          { name: 'Порт Канн', distance: '10 мин пешком' },
        ],
      },
    },
  },
  {
    slug: 'creche-antibes',
    city: 'Antibes',
    comingSoon: true,
    lat: 43.5804,
    lng: 7.1251,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Antibes',
        metaTitle: 'Crèche Multilingue Antibes | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche et nursery privée multilingue à Antibes. Garde d\'enfants en français, anglais et russe sur la Côte d\'Azur.',
        intro: 'Mayo Antibes accueille vos enfants dans le cadre enchanteur de la cité des remparts. Notre micro-crèche multilingue se trouve à proximité du vieil Antibes, offrant un environnement paisible et stimulant pour les tout-petits. Le programme trilingue en français, anglais et russe est conçu pour les familles internationales de Sophia Antipolis et ses environs. Nos éducatrices qualifiées mettent en place des activités d\'éveil variées, inspirées de la nature méditerranéenne environnante. Les espaces de jeu sont aménagés pour favoriser la motricité, la créativité et les interactions sociales. Les repas sont cuisinés sur place avec des produits frais provenant des marchés provençaux d\'Antibes. Le jardin extérieur offre un espace de plein air sécurisé où les enfants découvrent les plantes et les saisons. Nous accueillons les enfants du lundi au vendredi avec des formules souples adaptées à chaque famille. Mayo Antibes organise régulièrement des sorties au parc de la Brague et des activités en lien avec le patrimoine antibois. Notre équipe plurilingue crée un environnement naturel d\'immersion linguistique dès le plus jeune âge. Faites confiance à Mayo Antibes pour l\'épanouissement de votre enfant sur la Côte d\'Azur.',
        landmarks: [
          { name: 'Vieil Antibes', distance: '4 min à pied' },
          { name: 'Port Vauban', distance: '7 min à pied' },
          { name: 'Marché provençal', distance: '5 min à pied' },
          { name: 'Plage de la Gravette', distance: '8 min à pied' },
          { name: 'Sophia Antipolis', distance: '15 min en voiture' },
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Antibes',
        metaTitle: 'Multilingual Nursery Antibes | Mayo – Private Childcare French Riviera',
        metaDescription: 'Mayo, multilingual private nursery in Antibes. Childcare in French, English and Russian on the French Riviera.',
        intro: 'Mayo Antibes welcomes your children in the enchanting setting of the walled city. Our multilingual nursery is located near old Antibes, offering a peaceful and stimulating environment for toddlers. The trilingual program in French, English, and Russian is designed for international families from Sophia Antipolis and surrounding areas. Our qualified educators set up varied awakening activities inspired by the surrounding Mediterranean nature. Play spaces are designed to promote motor skills, creativity, and social interactions. Meals are cooked on-site with fresh products from Antibes\' Provençal markets. The outdoor garden provides a secure open-air space where children discover plants and seasons. We welcome children Monday to Friday with flexible options adapted to each family. Mayo Antibes regularly organizes outings to Brague Park and activities related to Antibes\' heritage. Trust Mayo Antibes for your child\'s development on the French Riviera.',
        landmarks: [
          { name: 'Old Antibes', distance: '4 min walk' },
          { name: 'Port Vauban', distance: '7 min walk' },
          { name: 'Provençal Market', distance: '5 min walk' },
          { name: 'Gravette Beach', distance: '8 min walk' },
          { name: 'Sophia Antipolis', distance: '15 min drive' },
        ],
      },
      ru: {
        h1: 'Детский сад и присмотр за детьми в Антибе',
        metaTitle: 'Многоязычный детский сад Антиб | Mayo – Частный детский сад Лазурный Берег',
        metaDescription: 'Mayo – многоязычный частный детский сад в Антибе. Уход за детьми на французском, английском и русском на Лазурном Берегу.',
        intro: 'Mayo Антиб принимает ваших детей в очаровательном окружении города-крепости. Наш многоязычный детский сад расположен рядом со старым Антибом, предлагая спокойную и стимулирующую среду для малышей. Трёхъязычная программа на французском, английском и русском языках создана для международных семей Софии Антиполис и окрестностей. Наши квалифицированные воспитатели организуют разнообразные развивающие занятия, вдохновлённые окружающей средиземноморской природой. Игровые пространства спроектированы для развития моторики, творчества и социального взаимодействия. Питание готовится на месте из свежих продуктов провансальских рынков Антиба. Доверьтесь Mayo Антиб для развития вашего ребёнка на Лазурном Берегу.',
        landmarks: [
          { name: 'Старый Антиб', distance: '4 мин пешком' },
          { name: 'Порт Вобан', distance: '7 мин пешком' },
          { name: 'Провансальский рынок', distance: '5 мин пешком' },
          { name: 'Пляж Гравет', distance: '8 мин пешком' },
          { name: 'София Антиполис', distance: '15 мин на машине' },
        ],
      },
    },
  },
  {
    slug: 'creche-monaco',
    city: 'Monaco',
    comingSoon: true,
    lat: 43.7384,
    lng: 7.4246,
    translations: {
      fr: {
        h1: 'Crèche et Garde d\'enfants à Monaco',
        metaTitle: 'Crèche Multilingue Monaco | Mayo – Nursery Privée Côte d\'Azur',
        metaDescription: 'Mayo, micro-crèche et nursery privée multilingue à Monaco. Garde d\'enfants premium en français, anglais et russe sur la Côte d\'Azur.',
        intro: 'Mayo Monaco propose un accueil d\'excellence pour les enfants des familles internationales de la Principauté. Notre micro-crèche multilingue offre un environnement raffiné et sécurisé, à l\'image du cadre exceptionnel de Monaco. Le programme éducatif trilingue en français, anglais et russe est conçu pour répondre aux attentes des familles expatriées et monégasques. Nos éducatrices hautement qualifiées assurent un accompagnement individualisé, avec un ratio d\'encadrement privilégié. Les espaces sont aménagés avec des matériaux nobles et naturels, créant une atmosphère apaisante et stimulante. La cuisine propose des menus gastronomiques adaptés aux tout-petits, préparés avec des ingrédients bio et méditerranéens. Nous offrons un service de conciergerie pour faciliter le quotidien des parents : navette, aide administrative et communication trilingue. Les activités incluent l\'éveil musical, les arts plastiques, le yoga pour enfants et des sorties culturelles dans Monaco. Notre emplacement central permet un accès facile depuis tous les quartiers de la Principauté et des communes limitrophes. Mayo Monaco incarne l\'excellence de la petite enfance sur la Côte d\'Azur, alliant tradition pédagogique européenne et ouverture internationale.',
        landmarks: [
          { name: 'Casino de Monte-Carlo', distance: '5 min à pied' },
          { name: 'Jardin Exotique', distance: '8 min à pied' },
          { name: 'Port Hercule', distance: '6 min à pied' },
          { name: 'Musée Océanographique', distance: '10 min à pied' },
          { name: 'Gare de Monaco', distance: '4 min à pied' },
        ],
      },
      en: {
        h1: 'Nursery & Childcare in Monaco',
        metaTitle: 'Multilingual Nursery Monaco | Mayo – Premium Childcare French Riviera',
        metaDescription: 'Mayo, multilingual premium nursery in Monaco. Childcare in French, English and Russian on the French Riviera.',
        intro: 'Mayo Monaco offers excellence in childcare for international families in the Principality. Our multilingual nursery provides a refined and secure environment, reflecting Monaco\'s exceptional setting. The trilingual educational program in French, English, and Russian is designed to meet the expectations of expatriate and Monegasque families. Our highly qualified educators ensure individualized care with a privileged staff-to-child ratio. Spaces are designed with noble, natural materials, creating a soothing and stimulating atmosphere. The kitchen offers gourmet menus adapted for toddlers, prepared with organic Mediterranean ingredients. We offer concierge services to facilitate parents\' daily life: shuttle, administrative assistance, and trilingual communication. Activities include musical awakening, visual arts, children\'s yoga, and cultural outings in Monaco. Our central location provides easy access from all Principality districts. Mayo Monaco embodies early childhood excellence on the French Riviera.',
        landmarks: [
          { name: 'Monte-Carlo Casino', distance: '5 min walk' },
          { name: 'Exotic Garden', distance: '8 min walk' },
          { name: 'Port Hercule', distance: '6 min walk' },
          { name: 'Oceanographic Museum', distance: '10 min walk' },
          { name: 'Monaco Station', distance: '4 min walk' },
        ],
      },
      ru: {
        h1: 'Детский сад и присмотр за детьми в Монако',
        metaTitle: 'Многоязычный детский сад Монако | Mayo – Премиум детский сад Лазурный Берег',
        metaDescription: 'Mayo – многоязычный премиум детский сад в Монако. Уход за детьми на французском, английском и русском на Лазурном Берегу.',
        intro: 'Mayo Монако предлагает превосходный уход за детьми для международных семей Княжества. Наш многоязычный детский сад обеспечивает изысканную и безопасную среду, отражающую исключительную обстановку Монако. Трёхъязычная образовательная программа на французском, английском и русском языках разработана с учётом ожиданий семей экспатов и монакских семей. Наши высококвалифицированные воспитатели обеспечивают индивидуальный уход с привилегированным соотношением персонала. Пространства оформлены натуральными благородными материалами, создавая умиротворяющую и стимулирующую атмосферу. Кухня предлагает гурманские меню для малышей из органических средиземноморских ингредиентов. Mayo Монако воплощает совершенство раннего детства на Лазурном Берегу.',
        landmarks: [
          { name: 'Казино Монте-Карло', distance: '5 мин пешком' },
          { name: 'Экзотический сад', distance: '8 мин пешком' },
          { name: 'Порт Эркюль', distance: '6 мин пешком' },
          { name: 'Океанографический музей', distance: '10 мин пешком' },
          { name: 'Вокзал Монако', distance: '4 мин пешком' },
        ],
      },
    },
  },
];
