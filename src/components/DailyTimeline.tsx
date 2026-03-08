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
    icon: <Sun className="w-5 h-5" />,
    titles: { fr: 'Accueil & Jeux libres', en: 'Welcome & Free Play', ru: 'Приём и игра' },
    descriptions: {
      fr: 'Accueil chaleureux et jeu libre pour commencer en douceur.',
      en: 'Warm welcome and free play to ease into the day.',
      ru: 'Тёплая встреча и свободная игра.',
    },
  },
  {
    time: '9:00',
    icon: <Baby className="w-5 h-5" />,
    titles: { fr: 'Motricité', en: 'Motor Skills', ru: 'Моторика' },
    descriptions: {
      fr: 'Parcours moteurs, yoga et éveil sensoriel.',
      en: 'Motor courses, yoga and sensory awakening.',
      ru: 'Двигательные упражнения и йога.',
    },
  },
  {
    time: '10:00',
    icon: <Palette className="w-5 h-5" />,
    titles: { fr: 'Atelier créatif', en: 'Creative Workshop', ru: 'Творчество' },
    descriptions: {
      fr: 'Expression artistique trilingue.',
      en: 'Trilingual artistic expression.',
      ru: 'Художественное выражение на 3 языках.',
    },
  },
  {
    time: '11:30',
    icon: <Apple className="w-5 h-5" />,
    titles: { fr: 'Repas bio', en: 'Organic Lunch', ru: 'Обед' },
    descriptions: {
      fr: 'Cuisine maison, produits bio et locaux.',
      en: 'Home-cooked, organic local produce.',
      ru: 'Домашняя кухня из местных продуктов.',
    },
  },
  {
    time: '12:30',
    icon: <Moon className="w-5 h-5" />,
    titles: { fr: 'Sieste', en: 'Nap Time', ru: 'Тихий час' },
    descriptions: {
      fr: 'Repos adapté au rythme de chaque enfant.',
      en: 'Rest adapted to each child\'s rhythm.',
      ru: 'Отдых по ритму каждого ребёнка.',
    },
  },
  {
    time: '14:30',
    icon: <Music className="w-5 h-5" />,
    titles: { fr: 'Éveil musical', en: 'Music', ru: 'Музыка' },
    descriptions: {
      fr: 'Comptines, instruments et rythmes du monde.',
      en: 'Nursery rhymes, instruments and world rhythms.',
      ru: 'Детские песни и музыкальные инструменты.',
    },
  },
  {
    time: '15:30',
    icon: <BookOpen className="w-5 h-5" />,
    titles: { fr: 'Histoires', en: 'Stories', ru: 'Сказки' },
    descriptions: {
      fr: 'Lectures en trois langues.',
      en: 'Readings in three languages.',
      ru: 'Чтение на трёх языках.',
    },
  },
  {
    time: '17:00',
    icon: <Heart className="w-5 h-5" />,
    titles: { fr: 'Retrouvailles', en: 'Reunion', ru: 'Встреча' },
    descriptions: {
      fr: 'Bilan personnalisé et retrouvailles.',
      en: 'Personalised summary and reunion.',
      ru: 'Персональный отчёт и встреча.',
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
    const amount = scrollRef.current.offsetWidth * 0.5;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="journee"
      className="py-16 sm:py-24 overflow-hidden"
      style={{ background: 'var(--gradient-soft)' }}
      aria-label={sectionTitles[language]}
    >
      <div ref={reveal.ref} style={reveal.style}>
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {sectionTitles[language]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {sectionSubtitles[language]}
          </p>
        </div>

        <div className="relative">
          {/* Arrow buttons */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-3 top-[42px] z-10 w-9 h-9 rounded-full bg-background border border-border shadow-sm items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-3 top-[42px] z-10 w-9 h-9 rounded-full bg-background border border-border shadow-sm items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>

          {/* Scrollable frieze */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style>{`#journee div::-webkit-scrollbar { display: none; }`}</style>

            <div className="inline-flex items-start px-8 sm:px-16 min-w-max">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center relative" style={{ width: 160 }}>
                  {/* Time label */}
                  <span className="text-xs font-bold text-primary mb-2 tracking-wide">
                    {step.time}
                  </span>

                  {/* Node + line */}
                  <div className="relative flex items-center w-full justify-center" style={{ height: 28 }}>
                    {/* Line left */}
                    {i > 0 && (
                      <div className="absolute left-0 right-1/2 top-1/2 h-[2px] bg-primary/20" />
                    )}
                    {/* Line right */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-1/2 right-0 top-1/2 h-[2px] bg-primary/20" />
                    )}
                    {/* Dot */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content card below */}
                  <div className="mt-4 text-center px-2 max-w-[152px]">
                    <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
                      {step.titles[language]}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.descriptions[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="sm:hidden text-center text-xs text-muted-foreground mt-4 px-4">
          {language === 'fr' ? '← Glissez pour découvrir →' : language === 'en' ? '← Swipe to explore →' : '← Листайте →'}
        </p>
      </div>
    </section>
  );
};

export default DailyTimeline;
