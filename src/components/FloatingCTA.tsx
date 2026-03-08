import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck } from 'lucide-react';

const ctaLabels = {
  fr: 'Réserver une visite',
  en: 'Book a visit',
  ru: 'Записаться на визит',
};

const FloatingCTA = () => {
  const { language } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContact}
      className="md:hidden fixed bottom-6 left-4 right-4 z-40 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-base shadow-lg active:scale-[0.98] transition-transform"
      style={{ boxShadow: 'var(--shadow-premium)' }}
      aria-label={ctaLabels[language]}
    >
      <CalendarCheck className="w-5 h-5" />
      {ctaLabels[language]}
    </button>
  );
};

export default FloatingCTA;
