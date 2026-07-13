export type Lang = 'fr' | 'en' | 'ru';

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
  {
    slug: 'cout-creche-privee-cote-azur-2026',
    date: '2026-06-05',
    title: {
      fr: "Combien coûte une crèche privée sur la Côte d'Azur en 2026 ?",
      en: "How much does a private nursery cost on the French Riviera in 2026?",
      ru: "Сколько стоит частный детский сад на Лазурном Берегу в 2026 году?",
    },
    excerpt: {
      fr: "Tarifs, aides CAF (CMG), crédit d'impôt : le vrai reste à charge d'une place en micro-crèche entre Nice, Cannes et Monaco.",
      en: "Fees, CAF (CMG) aid, tax credit: the real out-of-pocket cost of a micro-nursery place between Nice, Cannes and Monaco.",
      ru: "Тарифы, помощь CAF (CMG), налоговый вычет: реальная стоимость места в мини-яслях между Ниццей, Каннами и Монако.",
    },
    content: {
      fr: `
        <p>Le coût d'une crèche privée sur la Côte d'Azur inquiète beaucoup de parents. La bonne nouvelle : le tarif affiché n'est presque jamais ce que vous payez réellement. Entre l'aide de la CAF et le crédit d'impôt, le <strong>reste à charge</strong> est souvent bien inférieur à ce que l'on imagine.</p>
        <h2>Le tarif de base d'une micro-crèche</h2>
        <p>En micro-crèche, la facturation se fait à l'heure. Sur la Côte d'Azur, le tarif horaire se situe généralement entre 9 € et 12 € de l'heure avant aides, selon la commune et les prestations (amplitude horaire, repas, éveil linguistique).</p>
        <h2>L'aide de la CAF : le CMG</h2>
        <p>Le Complément de libre choix du mode de garde (CMG) prend en charge une part importante du coût, calculée selon vos revenus et le nombre d'enfants. C'est le levier qui fait chuter la facture.</p>
        <h2>Le crédit d'impôt</h2>
        <p>Au-delà du CMG, les frais de garde ouvrent droit à un crédit d'impôt sur le revenu, ce qui réduit encore le coût net annuel.</p>
        <h2>Estimez votre reste à charge en 1 minute</h2>
        <p>Plutôt que de deviner, utilisez notre <a href="/simulateur-cout-creche">simulateur de coût de crèche</a> : en trois informations (code postal, revenus, heures), vous obtenez une estimation de votre reste à charge, aides déduites.</p>
        <p>Pour une place dans l'une de nos crèches multilingues, découvrez par exemple <a href="/creche-nice-medecin">notre crèche à Nice</a> ou <a href="/creche-cannes">à Cannes</a>.</p>
`,
      en: `
        <p>The cost of a private nursery on the French Riviera worries many parents. The good news: the advertised price is almost never what you actually pay. Between CAF aid and the tax credit, the <strong>out-of-pocket cost</strong> is often far lower than expected.</p>
        <h2>The base rate of a micro-nursery</h2>
        <p>Micro-nurseries bill by the hour. On the Riviera, the hourly rate is generally between €9 and €12 before aid, depending on the town and services (opening hours, meals, language immersion).</p>
        <h2>CAF aid: the CMG</h2>
        <p>The CMG childcare subsidy covers a large share of the cost, calculated on your income and number of children. This is what makes the bill drop.</p>
        <h2>The tax credit</h2>
        <p>Beyond the CMG, childcare fees qualify for an income-tax credit, further reducing the net annual cost.</p>
        <h2>Estimate your cost in 1 minute</h2>
        <p>Rather than guessing, use our <a href="/simulateur-cout-creche">nursery cost simulator</a>: with three inputs (postal code, income, hours) you get an estimate of your out-of-pocket cost, aid included.</p>
        <p>For a place in one of our multilingual nurseries, see for example <a href="/creche-nice-medecin">our Nice nursery</a> or <a href="/creche-cannes">Cannes</a>.</p>
`,
      ru: `
        <p>Стоимость частных яслей на Лазурном Берегу беспокоит многих родителей. Хорошая новость: заявленная цена почти никогда не равна тому, что вы платите на самом деле. Благодаря помощи CAF и налоговому вычету реальные расходы часто гораздо ниже.</p>
        <h2>Базовый тариф мини-яслей</h2>
        <p>В мини-яслях оплата почасовая. На Лазурном Берегу тариф обычно составляет от 9 до 12 € в час до вычета помощи.</p>
        <h2>Помощь CAF: CMG</h2>
        <p>Субсидия CMG покрывает значительную часть расходов в зависимости от дохода и числа детей.</p>
        <h2>Оцените расходы за 1 минуту</h2>
        <p>Воспользуйтесь нашим <a href="/simulateur-cout-creche">калькулятором стоимости</a>: три параметра — и вы получите оценку с учётом помощи.</p>
`,
    },
  },
  {
    slug: 'aides-garde-enfant-cmg-caf-2026',
    date: '2026-06-12',
    title: {
      fr: "CMG, CAF, crédit d'impôt : toutes les aides pour la garde d'enfant en 2026",
      en: "CMG, CAF, tax credit: all the childcare aid available in 2026",
      ru: "CMG, CAF, налоговый вычет: вся помощь по уходу за ребёнком в 2026 году",
    },
    excerpt: {
      fr: "Le guide clair des aides à la garde d'enfant : qui y a droit, comment ça marche, et comment estimer votre reste à charge.",
      en: "A clear guide to childcare aid: who qualifies, how it works, and how to estimate your out-of-pocket cost.",
      ru: "Понятный гид по пособиям на уход за ребёнком: кто имеет право и как это работает.",
    },
    content: {
      fr: `
        <p>Entre le CMG, les prestations de la CAF et le crédit d'impôt, les aides à la garde d'enfant sont réelles mais souvent mal comprises. Voici l'essentiel, sans jargon.</p>
        <h2>Le CMG (Complément de libre choix du mode de garde)</h2>
        <p>Versé par la CAF, le CMG prend en charge une partie du coût de la garde. Son montant dépend de vos <strong>revenus</strong>, du <strong>nombre d'enfants</strong> et de leur âge. En micro-crèche, il est versé directement à la famille.</p>
        <h2>Le crédit d'impôt</h2>
        <p>Les frais de garde d'un enfant de moins de 6 ans ouvrent droit à un crédit d'impôt sur le revenu. Il s'applique même si vous n'êtes pas imposable : dans ce cas, il vous est remboursé.</p>
        <h2>Cumul et conditions</h2>
        <p>CMG et crédit d'impôt se cumulent, ce qui explique pourquoi le reste à charge final est souvent bien plus bas que le tarif affiché.</p>
        <h2>Combien pour vous ?</h2>
        <p>Chaque situation est différente. Notre <a href="/simulateur-cout-creche">simulateur d'aides</a> vous donne une estimation personnalisée en une minute. Vous pouvez aussi lancer notre <a href="/diagnostic">diagnostic</a> pour trouver la crèche adaptée à votre enfant.</p>
`,
      en: `
        <p>Between the CMG, CAF benefits and the tax credit, childcare aid is real but often misunderstood. Here are the essentials, without the jargon.</p>
        <h2>The CMG childcare subsidy</h2>
        <p>Paid by the CAF, the CMG covers part of the childcare cost. Its amount depends on your <strong>income</strong>, the <strong>number of children</strong> and their age. In a micro-nursery it is paid directly to the family.</p>
        <h2>The tax credit</h2>
        <p>Childcare fees for a child under 6 qualify for an income-tax credit. It applies even if you are not taxable — in that case it is refunded to you.</p>
        <h2>Combining aid</h2>
        <p>The CMG and the tax credit can be combined, which is why the final out-of-pocket cost is often much lower than the advertised rate.</p>
        <h2>How much for you?</h2>
        <p>Every situation differs. Our <a href="/simulateur-cout-creche">aid simulator</a> gives you a personalised estimate in one minute. You can also run our <a href="/diagnostic">diagnostic</a> to find the right nursery for your child.</p>
`,
      ru: `
        <p>CMG, пособия CAF и налоговый вычет — помощь реальна, но часто непонятна. Вот главное.</p>
        <h2>Субсидия CMG</h2>
        <p>Выплачивается CAF и покрывает часть расходов в зависимости от дохода, числа детей и их возраста.</p>
        <h2>Налоговый вычет</h2>
        <p>Расходы на уход за ребёнком до 6 лет дают право на налоговый вычет, даже если вы не облагаетесь налогом.</p>
        <h2>Сколько именно?</h2>
        <p>Используйте наш <a href="/simulateur-cout-creche">калькулятор</a> или пройдите <a href="/diagnostic">диагностику</a>.</p>
`,
    },
  },
  {
    slug: 'installer-cote-azur-avec-bebe-guide-creche',
    date: '2026-06-20',
    title: {
      fr: "S'installer sur la Côte d'Azur avec un bébé : le guide crèche des familles",
      en: "Moving to the French Riviera with a baby: the family nursery guide",
      ru: "Переезд на Лазурный Берег с малышом: гид по яслям для семей",
    },
    excerpt: {
      fr: "Vous arrivez à Nice, Monaco ou Cannes avec un jeune enfant ? Voici comment trouver une place en crèche et réussir l'intégration.",
      en: "Arriving in Nice, Monaco or Cannes with a young child? Here's how to find a nursery place and settle in.",
      ru: "Приезжаете в Ниццу, Монако или Канны с ребёнком? Как найти место в яслях и адаптироваться.",
    },
    content: {
      fr: `
        <p>S'installer sur la Côte d'Azur avec un jeune enfant soulève une question prioritaire : la garde. Entre l'arrivée, l'installation et souvent une nouvelle langue, une crèche adaptée change tout — pour l'enfant comme pour les parents.</p>
        <h2>Anticiper la place en crèche</h2>
        <p>Les places sont recherchées. Le réflexe gagnant est de s'inscrire sur une <strong>liste d'attente</strong> le plus tôt possible, idéalement avant même votre arrivée.</p>
        <h2>La question de la langue</h2>
        <p>Pour une famille internationale, une crèche multilingue est un atout majeur : l'enfant garde sa langue maternelle tout en s'immergeant dans le français et l'anglais. C'est le cœur de l'approche Mayo.</p>
        <h2>Les aides, même en tant que nouvel arrivant</h2>
        <p>Dès que vous êtes affilié à la CAF, vous pouvez bénéficier du CMG. Estimez votre reste à charge avec notre <a href="/simulateur-cout-creche">simulateur</a>.</p>
        <h2>Trouver la bonne crèche</h2>
        <p>Notre <a href="/diagnostic">diagnostic en 6 questions</a> vous oriente vers la crèche la plus adaptée. Découvrez nos implantations, par exemple à <a href="/creche-monaco">Monaco</a>, <a href="/creche-nice-medecin">Nice</a> ou <a href="/cap-dail">Cap-d'Ail</a>.</p>
`,
      en: `
        <p>Moving to the French Riviera with a young child raises one priority question: childcare. Between arriving, settling in and often a new language, the right nursery changes everything — for the child and the parents.</p>
        <h2>Plan the nursery place ahead</h2>
        <p>Places are in demand. The winning move is to join a <strong>waitlist</strong> as early as possible, ideally before you even arrive.</p>
        <h2>The language question</h2>
        <p>For an international family, a multilingual nursery is a major asset: the child keeps their mother tongue while being immersed in French and English. This is the heart of the Mayo approach.</p>
        <h2>Aid, even as a newcomer</h2>
        <p>As soon as you are registered with the CAF, you can benefit from the CMG. Estimate your cost with our <a href="/simulateur-cout-creche">simulator</a>.</p>
        <h2>Find the right nursery</h2>
        <p>Our <a href="/diagnostic">6-question diagnostic</a> points you to the best-suited nursery. Discover our locations, for example in <a href="/creche-monaco">Monaco</a>, <a href="/creche-nice-medecin">Nice</a> or <a href="/cap-dail">Cap-d'Ail</a>.</p>
`,
      ru: `
        <p>Переезд на Лазурный Берег с малышом ставит главный вопрос — уход за ребёнком. Правильные ясли меняют всё.</p>
        <h2>Планируйте место заранее</h2>
        <p>Мест мало. Лучшее решение — записаться в <strong>лист ожидания</strong> как можно раньше, ещё до приезда.</p>
        <h2>Вопрос языка</h2>
        <p>Для международной семьи многоязычные ясли — большое преимущество: ребёнок сохраняет родной язык и осваивает французский и английский.</p>
        <h2>Найдите нужные ясли</h2>
        <p>Пройдите <a href="/diagnostic">диагностику</a> и оцените расходы через <a href="/simulateur-cout-creche">калькулятор</a>.</p>
`,
    },
  },
  {
    slug: 'creche-bilingue-nice-comment-choisir',
    date: '2026-06-28',
    title: {
      fr: "Crèche bilingue à Nice : comment bien choisir ?",
      en: "Bilingual nursery in Nice: how to choose well?",
      ru: "Двуязычные ясли в Ницце: как выбрать?",
    },
    excerpt: {
      fr: "Effectif, langues réellement parlées, pédagogie, localisation : les vrais critères pour choisir une crèche bilingue à Nice.",
      en: "Group size, languages actually spoken, pedagogy, location: the real criteria for choosing a bilingual nursery in Nice.",
      ru: "Размер группы, языки, педагогика, расположение: критерии выбора двуязычных яслей в Ницце.",
    },
    content: {
      fr: `
        <p>Nice est une ville profondément internationale, et de plus en plus de familles cherchent une crèche bilingue. Mais toutes ne se valent pas. Voici les critères qui comptent vraiment.</p>
        <h2>Les langues sont-elles vraiment parlées au quotidien ?</h2>
        <p>Une crèche « bilingue » sur la plaquette n'est pas toujours bilingue dans les faits. Demandez si le personnel parle réellement la langue au quotidien, dans les jeux et les soins — c'est là que l'enfant apprend.</p>
        <h2>L'effectif</h2>
        <p>En micro-crèche, l'effectif réduit permet une attention individualisée, précieuse pour l'immersion linguistique.</p>
        <h2>La pédagogie</h2>
        <p>L'éveil linguistique précoce fonctionne par l'exposition naturelle, pas par des « cours ». Vérifiez que l'approche est intégrée au jeu.</p>
        <h2>La localisation</h2>
        <p>Un trajet court change le quotidien. À Nice, notre crèche est pensée pour les familles du secteur — voir <a href="/creche-nice-medecin">notre crèche de Nice</a>. Pour trouver celle qui vous convient, lancez le <a href="/diagnostic">diagnostic</a>.</p>
`,
      en: `
        <p>Nice is a deeply international city, and more and more families are looking for a bilingual nursery. But not all are equal. Here are the criteria that really matter.</p>
        <h2>Are the languages really spoken daily?</h2>
        <p>A nursery that is "bilingual" on the brochure isn't always bilingual in practice. Ask whether staff actually speak the language day to day, in play and care — that's where the child learns.</p>
        <h2>Group size</h2>
        <p>In a micro-nursery, the small group allows individual attention, invaluable for language immersion.</p>
        <h2>Pedagogy</h2>
        <p>Early language awareness works through natural exposure, not "lessons". Check that the approach is built into play.</p>
        <h2>Location</h2>
        <p>A short commute changes daily life. In Nice, our nursery is designed for local families — see <a href="/creche-nice-medecin">our Nice nursery</a>. To find the right one, run the <a href="/diagnostic">diagnostic</a>.</p>
`,
      ru: `
        <p>Ницца — очень международный город, и всё больше семей ищут двуязычные ясли. Но они не одинаковы. Вот что действительно важно.</p>
        <h2>Действительно ли говорят на языках?</h2>
        <p>«Двуязычные» на буклете не всегда двуязычны на деле. Спросите, говорит ли персонал на языке ежедневно.</p>
        <h2>Размер группы</h2>
        <p>В мини-яслях маленькая группа даёт индивидуальное внимание — важно для языкового погружения.</p>
        <h2>Найдите подходящие ясли</h2>
        <p>Пройдите <a href="/diagnostic">диагностику</a> и посмотрите <a href="/creche-nice-medecin">наши ясли в Ницце</a>.</p>
`,
    },
  },
  {
    slug: 'creche-ou-nounou-monaco',
    date: '2026-07-04',
    title: {
      fr: "Crèche ou nounou à Monaco : que choisir ?",
      en: "Nursery or nanny in Monaco: which to choose?",
      ru: "Ясли или няня в Монако: что выбрать?",
    },
    excerpt: {
      fr: "Coût, socialisation, souplesse, langues : comparatif honnête entre crèche et garde à domicile à Monaco.",
      en: "Cost, socialisation, flexibility, languages: an honest comparison between nursery and home care in Monaco.",
      ru: "Стоимость, социализация, гибкость, языки: честное сравнение яслей и няни в Монако.",
    },
    content: {
      fr: `
        <p>À Monaco, beaucoup de familles hésitent entre la crèche et la nounou à domicile. Il n'y a pas de mauvaise réponse — mais les deux options répondent à des besoins différents.</p>
        <h2>La socialisation</h2>
        <p>La crèche offre à l'enfant un cadre collectif : interactions, autonomie, préparation à l'école. La nounou offre un cadre individuel, rassurant pour les tout-petits.</p>
        <h2>La souplesse horaire</h2>
        <p>La nounou s'adapte aux horaires atypiques. La crèche fonctionne sur des amplitudes définies, mais souvent larges.</p>
        <h2>Les langues</h2>
        <p>Une crèche multilingue expose l'enfant à plusieurs langues au quotidien, ce qu'une nounou seule peut rarement offrir.</p>
        <h2>Le coût réel</h2>
        <p>Les deux options ouvrent droit à des aides, mais le calcul diffère. Comparez votre reste à charge en crèche avec notre <a href="/simulateur-cout-creche">simulateur</a>, et découvrez <a href="/creche-monaco">notre crèche à Monaco</a>.</p>
`,
      en: `
        <p>In Monaco, many families hesitate between a nursery and a home nanny. There's no wrong answer — but the two options meet different needs.</p>
        <h2>Socialisation</h2>
        <p>A nursery gives the child a group setting: interaction, autonomy, preparation for school. A nanny offers a one-to-one setting, reassuring for the very young.</p>
        <h2>Schedule flexibility</h2>
        <p>A nanny adapts to unusual hours. A nursery runs on set — but often wide — opening times.</p>
        <h2>Languages</h2>
        <p>A multilingual nursery exposes the child to several languages daily, which a single nanny can rarely offer.</p>
        <h2>The real cost</h2>
        <p>Both options qualify for aid, but the maths differs. Compare your nursery out-of-pocket cost with our <a href="/simulateur-cout-creche">simulator</a>, and discover <a href="/creche-monaco">our Monaco nursery</a>.</p>
`,
      ru: `
        <p>В Монако многие семьи выбирают между яслями и няней. Оба варианта отвечают разным потребностям.</p>
        <h2>Социализация</h2>
        <p>Ясли дают коллектив: общение, самостоятельность, подготовку к школе. Няня — индивидуальный подход.</p>
        <h2>Языки</h2>
        <p>Многоязычные ясли ежедневно погружают ребёнка в несколько языков.</p>
        <h2>Реальная стоимость</h2>
        <p>Сравните расходы через <a href="/simulateur-cout-creche">калькулятор</a> и посмотрите <a href="/creche-monaco">наши ясли в Монако</a>.</p>
`,
    },
  },
  {
    slug: 'micro-creche-vs-creche-collective',
    date: '2026-07-10',
    title: {
      fr: "Micro-crèche vs crèche collective : quelles différences ?",
      en: "Micro-nursery vs collective nursery: what are the differences?",
      ru: "Мини-ясли и обычные ясли: в чём разница?",
    },
    excerpt: {
      fr: "Effectif, ambiance, encadrement, admission : tout comprendre pour choisir entre micro-crèche et crèche collective.",
      en: "Group size, atmosphere, supervision, admission: everything to choose between micro and collective nursery.",
      ru: "Размер группы, атмосфера, приём: как выбрать между мини-яслями и обычными.",
    },
    content: {
      fr: `
        <p>« Micro-crèche » et « crèche collective » désignent deux structures d'accueil du jeune enfant, avec des différences concrètes pour votre enfant et pour vous.</p>
        <h2>L'effectif</h2>
        <p>La micro-crèche accueille un petit groupe d'enfants (jusqu'à 12), là où la crèche collective en accueille davantage. Le petit effectif favorise un accueil plus <strong>familial</strong> et une attention individualisée.</p>
        <h2>L'ambiance</h2>
        <p>La micro-crèche offre un cadre feutré, idéal pour les tout-petits et pour l'immersion linguistique. La crèche collective offre une vie de groupe plus large.</p>
        <h2>L'admission et les aides</h2>
        <p>En micro-crèche, l'aide CMG est versée directement à la famille, ce qui simplifie les démarches.</p>
        <h2>Comment choisir ?</h2>
        <p>Le bon choix dépend de votre enfant et de vos priorités. Lancez notre <a href="/diagnostic">diagnostic</a> et estimez votre budget avec le <a href="/simulateur-cout-creche">simulateur</a>.</p>
`,
      en: `
        <p>"Micro-nursery" and "collective nursery" are two types of early-childhood care, with concrete differences for your child and for you.</p>
        <h2>Group size</h2>
        <p>A micro-nursery welcomes a small group of children (up to 12), whereas a collective nursery takes more. The small group favours a more <strong>family-like</strong> setting and individual attention.</p>
        <h2>Atmosphere</h2>
        <p>The micro-nursery offers a calm setting, ideal for the very young and for language immersion. The collective nursery offers wider group life.</p>
        <h2>Admission and aid</h2>
        <p>In a micro-nursery, the CMG aid is paid directly to the family, which simplifies the process.</p>
        <h2>How to choose?</h2>
        <p>The right choice depends on your child and your priorities. Run our <a href="/diagnostic">diagnostic</a> and estimate your budget with the <a href="/simulateur-cout-creche">simulator</a>.</p>
`,
      ru: `
        <p>«Мини-ясли» и «обычные ясли» — два типа ухода за детьми с разными особенностями.</p>
        <h2>Размер группы</h2>
        <p>Мини-ясли принимают маленькую группу (до 12 детей), что даёт более <strong>семейную</strong> атмосферу и индивидуальное внимание.</p>
        <h2>Приём и помощь</h2>
        <p>В мини-яслях субсидия CMG выплачивается напрямую семье, что упрощает оформление.</p>
        <h2>Как выбрать?</h2>
        <p>Пройдите <a href="/diagnostic">диагностику</a> и оцените бюджет через <a href="/simulateur-cout-creche">калькулятор</a>.</p>
`,
    },
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
