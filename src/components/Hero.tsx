import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-nursery.jpg';
import LanguageSwitcher from './LanguageSwitcher';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-2xl md:text-3xl mb-3 font-light drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          {t('hero.description')}
        </p>
        <Button 
          size="lg" 
          onClick={scrollToContact}
          className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {t('hero.cta')}
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
