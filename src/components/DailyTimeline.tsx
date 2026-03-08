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
} from 'lucide-react';

interface TimelineStep {
  time: string;
  icon: React.ReactNode;
  titles: { fr: string; en: string; ru: string };
  descriptions: { fr: string; en: string; ru: string };
}

const steps: TimelineStep[] = [
  {
    time: '8h',
    icon: <Sun className="w-5 h-5" />,
    titles: { fr: 'Accueil', en: 'Welcome', ru: 'Приём' },
    descriptions: {
      fr: 'Accueil chaleureux et jeux libres',
      en: 'Warm welcome and free play',
      ru: 'Тёплая встреча и свободная игра',
    },
  },
  {
    time: '9h',
    icon: <Baby className="w-5 h-5" />,
    titles: { fr: 'Motricité', en: 'Motor Skills', ru: 'Моторика' },
    descriptions: {
      fr: 'Parcours moteurs et éveil sensoriel',
      en: 'Motor courses and sensory awakening',
      ru: 'Двигательные упражнения',
    },
  },
  {
    time: '10h',
    icon: <Palette className="w-5 h-5" />,
    titles: { fr: 'Créativité', en: 'Creativity', ru: 'Творчество' },
    descriptions: {
      fr: 'Ateliers artistiques trilingues',
      en: 'Trilingual art workshops',
      ru: 'Творческие мастерские на 3 языках',
    },
  },
  {
    time: '11h30',
    icon: <Apple className="w-5 h-5" />,
    titles: { fr: 'Repas bio', en: 'Organic Lunch', ru: 'Обед' },
    descriptions: {
      fr: 'Cuisine maison bio et locale',
      en: 'Home-cooked organic local food',
      ru: 'Домашняя органическая кухня',
    },
  },
  {
    time: '12h30',
    icon: <Moon className="w-5 h-5" />,
    titles: { fr: 'Sieste', en: 'Nap', ru: 'Сон' },
    descriptions: {
      fr: 'Repos adapté à chaque rythme',
      en: 'Rest adapted to each rhythm',
      ru: 'Отдых по ритму ребёнка',
    },
  },
  {
    time: '14h30',
    icon: <Music className="w-5 h-5" />,
    titles: { fr: 'Musique', en: 'Music', ru: 'Музыка' },
    descriptions: {
      fr: 'Éveil musical et comptines',
      en: 'Musical awakening and rhymes',
      ru: 'Музыкальное пробуждение',
    },
  },
  {
    time: '15h30',
    icon: <BookOpen className="w-5 h-5" />,
    titles: { fr: 'Histoires', en: 'Stories', ru: 'Сказки' },
    descriptions: {
      fr: 'Lectures en trois langues',
      en: 'Readings in three languages',
      ru: 'Чтение на трёх языках',
    },
  },
  {
    time: '17h',
    icon: <Heart className="w-5 h-5" />,
    titles: { fr: 'Retrouvailles', en: 'Reunion', ru: 'Встреча' },
    descriptions: {
      fr: 'Bilan et retrouvailles en famille',
      en: 'Summary and family reunion',
      ru: 'Итоги дня и встреча с семьёй',
    },
  },
];

const sectionTitles = {
  fr: 'Une journée type chez Mayo',
  en: 'A typical day at Mayo',
  ru: 'Обычный день в Mayo',
};

const sectionSubtitles = {
  fr: 'Du matin au soir, nous accompagnons votre enfant avec bienveillance',
  en: 'From morning to evening, we support your child with care',
  ru: 'С утра до вечера мы заботимся о вашем ребёнке',
};

const DailyTimeline = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();

  return (
    <section
      id="journee"
      className="py-16 sm:py-24 px-4"
      style={{ background: 'var(--gradient-soft)' }}
      aria-label={sectionTitles[language]}
    >
      <div ref={reveal.ref} style={reveal.style} className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {sectionTitles[language]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            {sectionSubtitles[language]}
          </p>
        </div>

        {/* Desktop: full-width horizontal frieze */}
        <div className="hidden md:block">
          {/* Time labels row */}
          <div className="grid grid-cols-8 mb-2">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <span className="text-xs font-bold text-primary tracking-wide">{step.time}</span>
              </div>
            ))}
          </div>

          {/* Line + nodes row */}
          <div className="relative h-12 flex items-center">
            {/* Continuous line */}
            <div className="absolute left-[6.25%] right-[6.25%] top-1/2 h-[2px] bg-primary/20" />
            <div className="grid grid-cols-8 w-full">
              {steps.map((step, i) => (
                <div key={i} className="flex justify-center">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary transition-transform hover:scale-110">
                    {step.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description cards row */}
          <div className="grid grid-cols-8 mt-3 gap-2">
            {steps.map((step, i) => (
              <div key={i} className="text-center px-1">
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
                  {step.titles[language]}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.descriptions[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical compact frieze */}
        <div className="md:hidden relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-primary/20" aria-hidden="true" />

          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={i} className="relative flex items-start gap-4">
                {/* Node on line */}
                <div className="absolute -left-12 top-0 w-9 h-9 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary shrink-0">
                  {step.icon}
                </div>
                {/* Content */}
                <div>
                  <span className="text-xs font-bold text-primary tracking-wide">{step.time}</span>
                  <h3 className="text-base font-semibold text-foreground leading-tight mt-0.5">
                    {step.titles[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {step.descriptions[language]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default DailyTimeline;
