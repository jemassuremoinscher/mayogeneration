import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Sun, Palette, Utensils, Moon, Smartphone, ShieldCheck } from 'lucide-react';

const steps = [
  {
    time: '8h30',
    icon: Sun,
    fr: { title: 'Accueil personnalisé', desc: 'Chaque enfant est accueilli individuellement par son éducatrice référente. Transmission des informations de la nuit avec les parents.' },
    en: { title: 'Personalized welcome', desc: 'Each child is individually welcomed by their reference educator. Night information shared with parents.' },
    ru: { title: 'Персональная встреча', desc: 'Каждого ребёнка встречает персональный воспитатель. Обмен информацией с родителями о ночи.' },
  },
  {
    time: '10h00',
    icon: Palette,
    fr: { title: 'Atelier éveil sensoriel', desc: 'Peinture, musique, exploration tactile — des activités trilingues qui stimulent la curiosité et la créativité.' },
    en: { title: 'Sensory awakening workshop', desc: 'Painting, music, tactile exploration — trilingual activities that stimulate curiosity and creativity.' },
    ru: { title: 'Сенсорное развитие', desc: 'Рисование, музыка, тактильные занятия — трёхъязычные активности для развития любознательности.' },
  },
  {
    time: '12h00',
    icon: Utensils,
    fr: { title: 'Repas circuit-court', desc: 'Fruits et légumes de Carros et Grasse, viandes locales. Cuisine maison 100% bio, adaptée aux allergies.' },
    en: { title: 'Local farm-to-table meal', desc: 'Fruits and vegetables from Carros and Grasse, local meats. 100% organic home cooking, allergy-adapted.' },
    ru: { title: 'Обед из местных продуктов', desc: 'Фрукты и овощи из Каррос и Грасс, местное мясо. 100% органическая домашняя кухня.' },
  },
  {
    time: '15h00',
    icon: Moon,
    fr: { title: 'Sieste surveillée', desc: 'Environnement calme et sécurisé. Monitoring individuel du sommeil. Réveil en douceur avec musique apaisante.' },
    en: { title: 'Supervised nap', desc: 'Calm and secure environment. Individual sleep monitoring. Gentle wake-up with soothing music.' },
    ru: { title: 'Контролируемый сон', desc: 'Спокойная и безопасная обстановка. Индивидуальный контроль сна. Мягкое пробуждение с музыкой.' },
  },
];

const trLabels = {
  fr: {
    badge: 'En direct de la Riviera',
    title: 'Une journée type chez Mayo',
    secTitle: 'Sécurité & App',
    secDesc: 'Les parents reçoivent des photos et le journal de bord de la journée en temps réel sur leur smartphone. Notifications d\'arrivée, repas, sieste et activités — restez connectés à chaque instant.',
    secFeatures: ['Photos en temps réel', 'Journal de bord quotidien', 'Notifications repas & sieste'],
  },
  en: {
    badge: 'Live from the Riviera',
    title: 'A typical day at Mayo',
    secTitle: 'Security & App',
    secDesc: 'Parents receive real-time photos and the daily logbook on their smartphone. Arrival, meal, nap and activity notifications — stay connected at every moment.',
    secFeatures: ['Real-time photos', 'Daily logbook', 'Meal & nap notifications'],
  },
  ru: {
    badge: 'В прямом эфире с Ривьеры',
    title: 'Типичный день в Mayo',
    secTitle: 'Безопасность и приложение',
    secDesc: 'Родители получают фото и дневник дня в реальном времени на смартфон. Уведомления о прибытии, питании, сне и занятиях.',
    secFeatures: ['Фото в реальном времени', 'Ежедневный дневник', 'Уведомления о питании и сне'],
  },
};

const RivieraTimeline = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = trLabels[language];

  return (
    <section id="timeline" className="py-16 sm:py-24 px-4" aria-labelledby="timeline-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sun className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 id="timeline-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t.title}
          </h2>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative overflow-x-auto pb-4 -mx-4 px-4">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-border" aria-hidden="true" />

          <div className="flex gap-6 min-w-max">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const content = step[language];
              return (
                <div key={i} className="relative flex flex-col items-center w-56 shrink-0">
                  {/* Node */}
                  <div className="relative z-10 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-card border-2 border-border flex items-center justify-center" style={{ boxShadow: 'var(--shadow-card)' }}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <span className="text-xs font-bold text-sage uppercase tracking-wider">{step.time}</span>
                  <h3 className="text-base font-bold text-foreground mt-1 text-center">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-center">{content.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & App box */}
        <div className="mt-12 bg-card rounded-2xl border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-premium)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">{t.secTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.secDesc}</p>
              <div className="flex flex-wrap gap-2">
                {t.secFeatures.map((feat, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-sage-light text-sage rounded-full px-3 py-1 text-xs font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RivieraTimeline;
