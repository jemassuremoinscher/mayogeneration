import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.description',
    },
    {
      icon: Shield,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.description',
    },
    {
      icon: Globe,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.description',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
          {t('about.title')}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          {t('about.description')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
