import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-8 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-lg font-semibold">Mayo</p>
        <p className="text-sm opacity-80">
          {t('contact.address')} &middot; {t('contact.hours')}
        </p>
        <p className="text-xs opacity-60">
          &copy; {year} Mayo. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
