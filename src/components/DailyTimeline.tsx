import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Sun,
  Baby,
  Palette,
  Apple,
  Moon,
  Music,
  BookOpen,
  Heart,
  ChevronLeft,
  ChevronRight,
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
      fr: 'Les enfants sont accueillis chaleureusement. Un temps de jeu libre pour commencer en douceur.',
      en: 'Children are warmly welcomed. Free play time to ease into the day.',
      ru: 'Дети тепло встречаются командой. Свободная игра для мягкого начала дня.',
    },
  },
  {
    time: '9:00',
    icon: <Baby className="w-6 h-6" />,
    titles: { fr: 'Motricité & Éveil', en: 'Motor Skills', ru: 'Моторика' },
    descriptions: {
      fr: 'Parcours de motricité, yoga et activités sensorielles pour la coordination.',
      en: 'Motor courses, yoga and sensory activities for coordination.',
      ru: 'Двигательные упражнения, йога и сенсорные активности.',
    },
  },
  {
    time: '10:00',
    icon: <Palette className="w-6 h-6" />,
    titles: { fr: 'Atelier créatif', en: 'Creative Workshop', ru: 'Творческая мастерская' },
    descriptions: {
      fr: 'Peinture, collage et expression artistique en trois langues.',
      en: 'Painting, collage and artistic expression in three languages.',
      ru: 'Рисование, коллаж и художественное выражение на трёх языках.',
    },
  },
  {
    time: '11:30',
    icon: <Apple className="w-6 h-6" />,
    titles: { fr: 'Repas bio', en: 'Organic Lunch', ru: 'Органический обед' },
    descriptions: {
      fr: 'Repas cuisinés sur place avec des produits bio et locaux.',
      en: 'Meals cooked on-site with organic, local produce.',
      ru: 'Блюда из органических местных продуктов.',
    },
  },
  {
    time: '12:30',
    icon: <Moon className="w-6 h-6" />,
    titles: { fr: 'Sieste', en: 'Nap Time', ru: 'Тихий час' },
    descriptions: {
      fr: 'Repos dans un environnement tamisé, adapté au rythme de chaque enfant.',
      en: 'Rest in a dimmed environment, adapted to each child\'s rhythm.',
      ru: 'Отдых в приглушённой обстановке, адаптированной к ритму ребёнка.',
    },
  },
  {
    time: '14:30',
    icon: <Music className="w-6 h-6" />,
    titles: { fr: 'Éveil musical', en: 'Musical Awakening', ru: 'Музыка' },
    descriptions: {
      fr: 'Comptines du monde, instruments doux et rythmes.',
      en: 'World nursery rhymes, gentle instruments and rhythms.',
      ru: 'Детские песни мира, мягкие инструменты и ритмы.',
    },
  },
  {
    time: '15:30',
    icon: <BookOpen className="w-6 h-6" />,
    titles: { fr: 'Lecture & Histoires', en: 'Stories', ru: 'Чтение и сказки' },
    descriptions: {
      fr: 'Histoires en trois langues pour l\'imaginaire et la découverte.',
      en: 'Stories in three languages nurturing imagination.',
      ru: 'Истории на трёх языках для воображения и познания.',
    },
  },
  {
    time: '17:00',
    icon: <Heart className="w-6 h-6" />,
    titles: { fr: 'Retrouvailles', en: 'Reunion', ru: 'Встреча' },
    descriptions: {
      fr: 'Bilan personnalisé de la journée. Un moment de partage.',
      en: 'Personalised daily summary. A moment of sharing.',
      ru: 'Персональный отчёт о дне. Момент близости.',
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
  const reveal = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="journee"
      className="py-16 sm:py-24"
      style={{ background: 'var(--gradient-soft)' }}
      aria-label={sectionTitles[language]}
    >
      <div ref={reveal.ref} style={reveal.style}>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {sectionTitles[language]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {sectionSubtitles[language]}
          </p>
        </div>

        {/* Nav arrows */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-sm items-center justify-center hover:bg-background transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-sm items-center justify-center hover:bg-background transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth px-6 sm:px-12 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style>{`#journee div::-webkit-scrollbar { display: none; }`}</style>

            {/* Horizontal line behind cards */}
            {steps.map((step, i) => (
              <article
                key={i}
                className="snap-start shrink-0 w-[260px] sm:w-[280px] rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                    {step.icon}
                  </div>
                  <span className="text-sm font-bold text-primary tracking-wide">{step.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-snug">
                  {step.titles[language]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.descriptions[language]}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Scroll hint on mobile */}
        <p className="sm:hidden text-center text-xs text-muted-foreground mt-2 px-4">
          {language === 'fr' ? '← Glissez pour découvrir →' : language === 'en' ? '← Swipe to explore →' : '← Листайте →'}
        </p>
      </div>
    </section>
  );
};

export default DailyTimeline;
