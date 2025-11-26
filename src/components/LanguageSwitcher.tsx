import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="font-medium"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
