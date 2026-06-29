export type Lang = 'fr' | 'en' | 'ru' | 'it';

export interface Article {
  slug: string;
  date: string;
  image?: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  content: Record<Lang, string>; // HTML string
}

export const articles: Article[] = [
  {
    slug: 'assurance-creche-ce-quil-faut-savoir',
    date: '2026-05-12',
    title: {
      fr: "Assurance crèche : ce qu'il faut savoir",
      en: 'Nursery insurance: what you need to know',
      ru: 'Страхование детского сада: что нужно знать',
    },
    excerpt: {
      fr: "Responsabilité civile, multirisque, protection juridique — guide complet pour bien assurer une crèche ou micro-crèche.",
      en: 'Civil liability, multi-risk, legal protection — a complete guide to insuring a nursery or micro-nursery.',
      ru: 'Гражданская ответственность, мультириск, юридическая защита — полное руководство по страхованию яслей.',
    },
    content: {
      fr: `
        <p>Ouvrir et gérer une crèche implique une responsabilité énorme envers les familles. Une couverture d'assurance solide n'est pas optionnelle : c'est la base de toute structure d'accueil sérieuse.</p>
        <h2>La responsabilité civile professionnelle</h2>
        <p>Elle protège la crèche en cas de dommage causé à un enfant, un parent ou un tiers dans le cadre de l'activité. C'est <strong>l'assurance obligatoire numéro 1</strong>.</p>
        <h2>La multirisque locaux</h2>
        <p>Incendie, dégâts des eaux, vol de matériel pédagogique : la multirisque couvre les murs, le mobilier et le matériel.</p>
        <h2>Protection juridique et conformité légale</h2>
        <p>En cas de litige avec un parent, un fournisseur ou même l'administration, la protection juridique prend en charge les frais d'avocat et d'expertise.</p>
        <p>Pour trouver la meilleure couverture adaptée à votre structure d'accueil, nous recommandons <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>, un courtier spécialisé qui compare les offres dédiées aux crèches.</p>
        <h2>Bon à savoir</h2>
        <p>Vérifiez chaque année que votre contrat suit l'évolution de votre activité : nouveaux locaux, nouveaux effectifs, sorties extérieures, etc.</p>
      `,
      en: `
        <p>Running a nursery comes with huge responsibility toward families. Solid insurance coverage isn't optional — it's the foundation of any serious childcare structure.</p>
        <h2>Professional civil liability</h2>
        <p>It protects the nursery if a child, parent or third party suffers damage during operations. This is <strong>mandatory insurance #1</strong>.</p>
        <h2>Multi-risk premises insurance</h2>
        <p>Fire, water damage, theft of educational equipment: multi-risk covers walls, furniture and material.</p>
        <h2>Legal protection & compliance</h2>
        <p>If a dispute arises with a parent, supplier or even the administration, legal protection covers lawyer and expert fees.</p>
        <p>To find the best coverage for your structure, we recommend <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>, a specialised broker comparing nursery-specific offers.</p>
        <h2>Good to know</h2>
        <p>Review your contract every year so it follows your activity: new premises, new staff, outdoor outings, etc.</p>
      `,
      ru: `
        <p>Управление детским садом подразумевает огромную ответственность. Надежное страхование — это основа любой серьёзной структуры по уходу за детьми.</p>
        <h2>Профессиональная гражданская ответственность</h2>
        <p>Защищает сад в случае причинения вреда ребёнку, родителю или третьему лицу. Это <strong>обязательная страховка №1</strong>.</p>
        <h2>Мультириск помещений</h2>
        <p>Пожар, затопление, кража оборудования — мультириск покрывает стены, мебель и материалы.</p>
        <h2>Юридическая защита</h2>
        <p>В случае спора с родителем или поставщиком юридическая защита покрывает расходы на адвоката.</p>
        <p>Чтобы найти лучшее покрытие, мы рекомендуем брокера <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>.</p>
      `,
    },
  },
  {
    slug: 'automatiser-gestion-creche',
    date: '2026-05-20',
    title: {
      fr: 'Automatiser la gestion administrative de votre crèche',
      en: "Automating your nursery's administrative management",
      ru: 'Автоматизация управления детским садом',
    },
    excerpt: {
      fr: "Inscriptions, plannings, facturation, communication parents : comment libérer du temps grâce à l'IA.",
      en: 'Enrolments, schedules, billing, parent communication: how AI frees up time.',
      ru: 'Записи, расписания, счета, общение с родителями: как ИИ освобождает время.',
    },
    content: {
      fr: `
        <p>Le quotidien d'une direction de crèche est noyé sous l'administratif : dossiers d'inscription, plannings d'équipe, facturation CAF, communication aux familles. Pourtant, beaucoup de ces tâches sont automatisables.</p>
        <h2>Gestion des familles et des contacts</h2>
        <p>Un agent IA peut centraliser les fiches enfants, relancer les pièces manquantes, et synchroniser les coordonnées des parents.</p>
        <h2>Traçabilité et documentation</h2>
        <p>Comptes-rendus journaliers, transmissions, registres de présence : tout peut être généré automatiquement à partir d'observations vocales du personnel.</p>
        <h2>Rapports et statistiques</h2>
        <p>Taux d'occupation, suivi PSU, indicateurs qualité : un assistant IA produit les tableaux de bord en un clic.</p>
        <p>Pour automatiser concrètement votre gestion administrative, découvrez <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a> et ses agents IA conçus pour les petites structures d'accueil.</p>
        <h2>Combien de temps gagné ?</h2>
        <p>Les directrices qui ont sauté le pas estiment entre 6 et 10 heures par semaine récupérées sur l'administratif — du temps rendu aux enfants et à l'équipe.</p>
      `,
      en: `
        <p>A nursery director's daily life is drowning in admin: enrolment files, staff schedules, CAF billing, family communication. Yet many of these tasks can be automated.</p>
        <h2>Family and contact management</h2>
        <p>An AI agent can centralise child records, follow up on missing documents, and sync parent contact details.</p>
        <h2>Traceability and documentation</h2>
        <p>Daily reports, handovers, attendance registers: everything can be generated automatically from staff voice observations.</p>
        <h2>Reports & statistics</h2>
        <p>Occupancy rate, quality indicators: an AI assistant produces dashboards in one click.</p>
        <p>To concretely automate your administrative management, discover <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a> and its agents designed for small childcare structures.</p>
        <h2>How much time saved?</h2>
        <p>Directors who took the leap estimate 6 to 10 hours per week recovered — time given back to children and staff.</p>
      `,
      ru: `
        <p>Повседневная жизнь руководителя яслей утопает в администрировании. Однако многое можно автоматизировать.</p>
        <h2>Управление семьями</h2>
        <p>ИИ-агент централизует карточки детей и синхронизирует контакты родителей.</p>
        <h2>Отслеживание и документация</h2>
        <p>Ежедневные отчёты и журналы посещаемости создаются автоматически.</p>
        <p>Чтобы автоматизировать управление, откройте <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a>.</p>
      `,
    },
  },
  {
    slug: 'securite-conformite-creche',
    date: '2026-06-01',
    title: {
      fr: 'Sécurité et conformité en crèche : la check-list 2026',
      en: 'Nursery safety and compliance: the 2026 checklist',
      ru: 'Безопасность и соответствие в яслях: чек-лист 2026',
    },
    excerpt: {
      fr: "Normes PMI, sécurité enfants, risques professionnels : tout ce qu'il faut vérifier chaque année.",
      en: 'PMI standards, child safety, professional risks: everything to check every year.',
      ru: 'Стандарты PMI, безопасность детей, профессиональные риски: что проверять ежегодно.',
    },
    content: {
      fr: `
        <p>La sécurité des enfants n'est jamais acquise. Chaque année, la direction doit revisiter sa check-list de conformité pour rester aligné avec la réglementation PMI et les bonnes pratiques.</p>
        <h2>Sécurité des locaux</h2>
        <p>Détecteurs de fumée, issues de secours dégagées, prises sécurisées, mobilier fixé : la base.</p>
        <h2>Sécurité enfants au quotidien</h2>
        <p>Protocoles d'accueil et de départ, signature des transmissions, vérification d'identité — tout doit être tracé.</p>
        <h2>Risques professionnels</h2>
        <p>Document unique d'évaluation des risques (DUER) à jour, formation premiers secours du personnel, ergonomie des postes.</p>
        <p>Côté assurance, assurez-vous que votre crèche est correctement couverte sur tous ces volets avec <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>, qui audite gratuitement les contrats existants.</p>
        <h2>Conformité administrative</h2>
        <p>Agrément PMI à jour, taux d'encadrement respecté, registres de présence tenus quotidiennement.</p>
      `,
      en: `
        <p>Child safety is never a given. Every year, management must revisit its compliance checklist to stay aligned with PMI regulations and best practices.</p>
        <h2>Premises safety</h2>
        <p>Smoke detectors, clear emergency exits, safe sockets, secured furniture — the basics.</p>
        <h2>Daily child safety</h2>
        <p>Arrival and departure protocols, handover signatures, ID checks — everything must be traced.</p>
        <h2>Professional risks</h2>
        <p>Up-to-date risk assessment document (DUER), staff first-aid training, workstation ergonomics.</p>
        <p>On the insurance side, make sure your nursery is correctly covered on all these aspects with <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>, which audits existing contracts for free.</p>
      `,
      ru: `
        <p>Безопасность детей никогда не гарантирована. Каждый год руководство должно пересматривать свой чек-лист соответствия.</p>
        <h2>Безопасность помещений</h2>
        <p>Датчики дыма, аварийные выходы, защищённые розетки.</p>
        <p>Что касается страхования, убедитесь, что ваш сад правильно застрахован с <a href="https://jemassuremoinscher.fr/assurance-creche" target="_blank" rel="noopener noreferrer">Je m'assure moins cher</a>.</p>
      `,
    },
  },
  {
    slug: 'bienfaits-creche-multilingue',
    date: '2026-06-08',
    title: {
      fr: "Les bienfaits d'une crèche multilingue dès 3 mois",
      en: 'The benefits of a multilingual nursery from 3 months old',
      ru: 'Преимущества многоязычных яслей с 3 месяцев',
    },
    excerpt: {
      fr: "Pourquoi l'éveil simultané en français, anglais et russe transforme le développement de l'enfant.",
      en: "Why simultaneous exposure to French, English and Russian transforms a child's development.",
      ru: 'Почему одновременное знакомство с тремя языками меняет развитие ребёнка.',
    },
    content: {
      fr: `
        <p>Les premières années de vie sont une fenêtre d'opportunité unique pour l'acquisition du langage. À Mayo, nous immergeons les enfants dans trois langues — français, anglais, russe — dès leur arrivée à la crèche.</p>
        <h2>Plasticité cérébrale</h2>
        <p>Avant 3 ans, le cerveau distingue naturellement les sons et structures de plusieurs langues sans effort conscient.</p>
        <h2>Compétences cognitives renforcées</h2>
        <p>Les études montrent que les enfants multilingues développent une meilleure flexibilité mentale, une concentration accrue et une empathie culturelle plus forte.</p>
        <h2>Une équipe locale et qualifiée</h2>
        <p>Nos professionnelles natives vivent toutes à moins de 30 km des crèches — un ancrage local indispensable à un accompagnement de qualité.</p>
        <p>Pour gérer efficacement les inscriptions et la communication multilingue avec les familles, nous nous appuyons sur des outils comme <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a>.</p>
      `,
      en: `
        <p>The first years of life are a unique window for language acquisition. At Mayo, we immerse children in three languages — French, English, Russian — from day one.</p>
        <h2>Brain plasticity</h2>
        <p>Before age 3, the brain naturally distinguishes sounds and structures of multiple languages effortlessly.</p>
        <h2>Enhanced cognitive skills</h2>
        <p>Studies show multilingual children develop better mental flexibility, sharper focus and stronger cultural empathy.</p>
        <h2>A local, qualified team</h2>
        <p>Our native professionals all live within 30 km of the nurseries — local roots essential to quality care.</p>
        <p>To efficiently manage enrolments and multilingual family communication, we rely on tools like <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a>.</p>
      `,
      ru: `
        <p>Первые годы жизни — уникальное окно для освоения языков. В Mayo дети погружаются в три языка с первого дня.</p>
        <h2>Пластичность мозга</h2>
        <p>До 3 лет мозг естественно различает звуки нескольких языков без усилий.</p>
        <p>Для управления записями мы используем такие инструменты, как <a href="https://mammouth-ai.com" target="_blank" rel="noopener noreferrer">Mammouth AI</a>.</p>
      `,
    },
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
