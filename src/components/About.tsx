import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const About = () => {
  const { t } = useLanguage();
  const reveal = useScrollReveal();

  const features = [
    { icon: Users, titleKey: 'about.feature1.title', descKey: 'about.feature1.description' },
    { icon: Shield, titleKey: 'about.feature2.title', descKey: 'about.feature2.description' },
    { icon: Globe, titleKey: 'about.feature3.title', descKey: 'about.feature3.description' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} aria-labelledby="about-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-6xl mx-auto">
        <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-foreground">
          {t('about.title')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed">
          {t('about.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <CardContent className="pt-8 sm:pt-10 pb-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/8 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
