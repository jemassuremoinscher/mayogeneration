import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, BookOpen, Utensils, Clock } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Heart,
      titleKey: 'services.care.title',
      descKey: 'services.care.description',
    },
    {
      icon: BookOpen,
      titleKey: 'services.education.title',
      descKey: 'services.education.description',
    },
    {
      icon: Utensils,
      titleKey: 'services.meals.title',
      descKey: 'services.meals.description',
    },
    {
      icon: Clock,
      titleKey: 'services.schedule.title',
      descKey: 'services.schedule.description',
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('services.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md group"
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-muted-foreground">
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
