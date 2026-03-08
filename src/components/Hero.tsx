import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-nursery.jpg';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label={t('hero.title')}
    >
      <img
        src={heroImage}
        alt={t('hero.title')}
        className="absolute inset-0 w-full h-full object-cover !rounded-none"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/70" aria-hidden="true" />

      <div className="relative z-10 text-center text-primary-foreground px-4 pt-16 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-2 font-light drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md opacity-90">
          {t('hero.description')}
        </p>
        <Button
          size="lg"
          onClick={scrollToContact}
          className="hidden md:inline-flex text-base sm:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label={t('hero.cta')}
        >
          {t('hero.cta')}
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
