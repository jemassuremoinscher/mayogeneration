import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sun,
  Baby,
  Palette,
  Apple,
  Moon,
  Music,
  BookOpen,
  Heart,
} from 'lucide-react';

interface TimelineStep {
  time: string;
  icon: React.ReactNode;
  titles: { fr: string; en: string; ru: string };
  descriptions: { fr: string; en: string; ru: string };
}

const steps: TimelineStep[] = [
  {
    time: '8:00',
    icon: <Sun className="w-6 h-6" />,
    titles: { fr: 'Accueil & Jeux libres', en: 'Welcome & Free Play', ru: 'Приём и свободная игра' },
    descriptions: {
      fr: 'Les enfants sont accueillis chaleureusement par l\'équipe. Un temps de jeu libre leur permet de commencer la journée en douceur.',
      en: 'Children are warmly welcomed by our team. Free play time lets them ease into the day gently.',
      ru: 'Дети тепло встречаются нашей командой. Свободная игра помогает мягко начать день.',
    },
  },
  {
    time: '9:00',
    icon: <Baby className="w-6 h-6" />,
    titles: { fr: 'Motricité & Éveil corporel', en: 'Motor Skills & Movement', ru: 'Моторика и физическое развитие' },
    descriptions: {
      fr: 'Parcours de motricité, yoga des tout-petits et activités sensorielles pour développer la coordination et la confiance.',
      en: 'Motor courses, toddler yoga and sensory activities to develop coordination and confidence.',
      ru: 'Двигательные упражнения, йога для малышей и сенсорные активности для развития координации.',
    },
  },
  {
    time: '10:00',
    icon: <Palette className="w-6 h-6" />,
    titles: { fr: 'Atelier créatif trilingue', en: 'Trilingual Creative Workshop', ru: 'Трёхъязычная творческая мастерская' },
    descriptions: {
      fr: 'Peinture, collage et expression artistique en français, anglais et russe. L\'immersion linguistique par la créativité.',
      en: 'Painting, collage and artistic expression in French, English and Russian. Language immersion through creativity.',
      ru: 'Рисование, коллаж и художественное выражение на французском, английском и русском языках.',
    },
  },
  {
    time: '11:30',
    icon: <Apple className="w-6 h-6" />,
    titles: { fr: 'Repas bio & local', en: 'Organic & Local Lunch', ru: 'Органический обед' },
    descriptions: {
      fr: 'Repas cuisinés sur place avec des produits bio et locaux. Les enfants découvrent les saveurs méditerranéennes.',
      en: 'Meals cooked on-site with organic, local produce. Children discover Mediterranean flavours.',
      ru: 'Блюда готовятся на месте из органических местных продуктов. Дети знакомятся со средиземноморской кухней.',
    },
  },
  {
    time: '12:30',
    icon: <Moon className="w-6 h-6" />,
    titles: { fr: 'Sieste & Temps calme', en: 'Nap & Quiet Time', ru: 'Тихий час' },
    descriptions: {
      fr: 'Un moment de repos dans un environnement tamisé et apaisant, adapté au rythme de chaque enfant.',
      en: 'Rest time in a dimmed, soothing environment, adapted to each child\'s rhythm.',
      ru: 'Отдых в приглушённой успокаивающей обстановке, адаптированной к ритму каждого ребёнка.',
    },
  },
  {
    time: '14:30',
    icon: <Music className="w-6 h-6" />,
    titles: { fr: 'Éveil musical', en: 'Musical Awakening', ru: 'Музыкальное пробуждение' },
    descriptions: {
      fr: 'Comptines du monde, instruments doux et rythmes : la musique éveille les sens et renforce le langage.',
      en: 'World nursery rhymes, gentle instruments and rhythms: music awakens the senses and strengthens language.',
      ru: 'Мировые детские песни, мягкие инструменты и ритмы: музыка пробуждает чувства и развивает речь.',
    },
  },
  {
    time: '15:30',
    icon: <BookOpen className="w-6 h-6" />,
    titles: { fr: 'Lecture & Histoires', en: 'Stories & Reading', ru: 'Чтение и сказки' },
    descriptions: {
      fr: 'Histoires racontées en trois langues. Le coin lecture favorise l\'imaginaire et la découverte du monde.',
      en: 'Stories told in three languages. The reading corner nurtures imagination and world discovery.',
      ru: 'Истории на трёх языках. Уголок чтения развивает воображение и познание мира.',
    },
  },
  {
    time: '17:00',
    icon: <Heart className="w-6 h-6" />,
    titles: { fr: 'Retrouvailles & Départ', en: 'Reunion & Departure', ru: 'Встреча и уход домой' },
    descriptions: {
      fr: 'Les parents retrouvent leur enfant avec un bilan personnalisé de la journée. Un moment de partage et de complicité.',
      en: 'Parents reunite with their child and receive a personalised summary of the day. A moment of sharing.',
      ru: 'Родители забирают ребёнка и получают персональный отчёт о дне. Момент близости и обмена.',
    },
  },
];

const sectionTitles = {
  fr: 'Une journée type chez Mayo',
  en: 'A typical day at Mayo',
  ru: 'Обычный день в Mayo',
};

const sectionSubtitles = {
  fr: 'Découvrez comment nous accompagnons votre enfant du matin au soir',
  en: 'Discover how we support your child from morning to evening',
  ru: 'Узнайте, как мы сопровождаем вашего ребёнка с утра до вечера',
};

const DailyTimeline = () => {
  const { language } = useLanguage();

  return (
    <section
      id="journee"
      className="py-16 sm:py-24 px-4"
      style={{ background: 'var(--gradient-soft)' }}
      aria-label={sectionTitles[language]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {sectionTitles[language]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {sectionSubtitles[language]}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <ol className="space-y-0">
            {steps.map((step, i) => (
              <TimelineItem key={i} step={step} index={i} language={language} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  step,
  index,
  language,
}: {
  step: TimelineStep;
  index: number;
  language: 'fr' | 'en' | 'ru';
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className="relative flex gap-4 sm:gap-6 pb-10 last:pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      {/* Icon node */}
      <div className="relative z-10 shrink-0 w-14 sm:w-16 flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm border border-primary/20">
          {step.icon}
        </div>
      </div>

      {/* Content */}
      <div className="pt-1 pb-2 min-w-0">
        <span className="text-xs font-semibold text-primary tracking-wide uppercase">
          {step.time}
        </span>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-1 mb-1.5">
          {step.titles[language]}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {step.descriptions[language]}
        </p>
      </div>
    </li>
  );
};

export default DailyTimeline;
