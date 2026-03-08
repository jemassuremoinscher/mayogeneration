import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Users, titleKey: 'about.feature1.title', descKey: 'about.feature1.description' },
    { icon: Shield, titleKey: 'about.feature2.title', descKey: 'about.feature2.description' },
    { icon: Globe, titleKey: 'about.feature3.title', descKey: 'about.feature3.description' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-background to-secondary/30" aria-labelledby="about-title">
      <div className="max-w-6xl mx-auto">
        <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-foreground">
          {t('about.title')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          {t('about.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="pt-6 sm:pt-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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
