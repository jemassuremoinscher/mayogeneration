import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, BookOpen, Utensils, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Services = () => {
  const { t } = useLanguage();
  const reveal = useScrollReveal();

  const services = [
    { icon: Heart, titleKey: 'services.care.title', descKey: 'services.care.description' },
    { icon: BookOpen, titleKey: 'services.education.title', descKey: 'services.education.description' },
    { icon: Utensils, titleKey: 'services.meals.title', descKey: 'services.meals.description' },
    { icon: Clock, titleKey: 'services.schedule.title', descKey: 'services.schedule.description' },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 px-4 bg-background" aria-labelledby="services-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-6xl mx-auto">
        <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <CardContent className="p-6 sm:p-7 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1.5 text-foreground">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t(service.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
