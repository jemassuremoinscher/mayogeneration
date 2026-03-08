import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin, Leaf, Recycle, Users, Award } from 'lucide-react';

const counters = [
  {
    icon: MapPin,
    target: 0,
    suffix: ' km',
    fr: { label: '0 km', desc: 'Nos fruits et légumes viennent de Carros ou Grasse' },
    en: { label: '0 km', desc: 'Our fruits and vegetables come from Carros or Grasse' },
    ru: { label: '0 км', desc: 'Наши фрукты и овощи из Каррос или Грасс' },
  },
  {
    icon: Recycle,
    target: 0,
    suffix: '',
    fr: { label: 'Zéro Plastique', desc: 'Nos couches sont compostables' },
    en: { label: 'Zero Plastic', desc: 'Our diapers are compostable' },
    ru: { label: 'Ноль пластика', desc: 'Наши подгузники компостируемые' },
  },
  {
    icon: Users,
    target: 100,
    suffix: '%',
    fr: { label: '100% Emplois Locaux', desc: 'Nos équipes vivent toutes à moins de 30km des crèches' },
    en: { label: '100% Local Jobs', desc: 'All our team members live within 30km of the nurseries' },
    ru: { label: '100% местные кадры', desc: 'Все наши сотрудники живут менее чем в 30 км от яслей' },
  },
];

const trLabels = {
  fr: {
    badge: 'Engagé pour l\'avenir de la Riviera',
    title: 'Notre empreinte Azuréenne',
    subtitle: 'Circuit court, écologique, 100% local — notre engagement pour un avenir durable sur la Côte d\'Azur',
  },
  en: {
    badge: 'Committed to the Riviera\'s future',
    title: 'Our Azurean footprint',
    subtitle: 'Short supply chain, ecological, 100% local — our commitment to a sustainable future on the French Riviera',
  },
  ru: {
    badge: 'Преданы будущему Ривьеры',
    title: 'Наш Лазурный след',
    subtitle: 'Местные продукты, экология, 100% локальные кадры — наш вклад в устойчивое будущее Лазурного Берега',
  },
};

function useCountUp(target: number, visible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current || target === 0) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return target === 0 ? 0 : count;
}

const EcoFootprint = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = trLabels[language];

  return (
    <section
      id="eco"
      className="py-16 sm:py-24 px-4"
      style={{ background: 'var(--gradient-soft)' }}
      aria-labelledby="eco-title"
    >
      <div ref={reveal.ref} style={reveal.style} className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 id="eco-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm sm:text-base">{t.subtitle}</p>
        </div>

        {/* Counter cards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {counters.map((counter, i) => {
            const Icon = counter.icon;
            const content = counter[language];
            const animatedCount = useCountUp(counter.target, reveal.visible);

            return (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-6 text-center transition-shadow hover:shadow-[var(--shadow-premium)]"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage-light mb-4">
                  <Icon className="w-6 h-6 text-sage" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-sage mb-1">
                  {counter.target === 0 ? content.label : `${animatedCount}${counter.suffix}`}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Eco badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-sage/10 border border-sage/20 text-sage rounded-full px-5 py-2 text-sm font-medium">
            <Leaf className="w-4 h-4" />
            {t.badge}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoFootprint;
