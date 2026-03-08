import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, BookOpen, Utensils, Clock } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Heart, titleKey: 'services.care.title', descKey: 'services.care.description' },
    { icon: BookOpen, titleKey: 'services.education.title', descKey: 'services.education.description' },
    { icon: Utensils, titleKey: 'services.meals.title', descKey: 'services.meals.description' },
    { icon: Clock, titleKey: 'services.schedule.title', descKey: 'services.schedule.description' },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 px-4 bg-background" aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md group"
              >
                <CardContent className="p-5 sm:p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-foreground">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
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
