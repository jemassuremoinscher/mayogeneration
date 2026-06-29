import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  variant?: 'default' | 'hero';
}

const LanguageSwitcher = ({ variant = 'default' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; srLabel: string }[] = [
    { code: 'fr', label: 'FR', srLabel: 'Français' },
    { code: 'en', label: 'EN', srLabel: 'English' },
    { code: 'it', label: 'IT', srLabel: 'Italiano' },
    { code: 'ru', label: 'RU', srLabel: 'Русский' },
  ];

  return (
    <div className="flex gap-1" role="group" aria-label="Language selector">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          aria-label={lang.srLabel}
          aria-pressed={language === lang.code}
          className={`font-medium text-xs px-2 py-1 h-7 ${
            variant === 'hero' && language !== lang.code
              ? 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20'
              : ''
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
