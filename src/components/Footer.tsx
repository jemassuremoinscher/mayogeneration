import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { locations } from '@/data/locations';
import logoMayo from '@/assets/logo-mayo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const locSectionTitle =
    language === 'fr' ? 'Nos crèches sur la Côte d\'Azur'
    : language === 'en' ? 'Our nurseries on the French Riviera'
    : 'Наши детские сады на Лазурном Берегу';

  const soonLabel = language === 'fr' ? 'bientôt' : language === 'en' ? 'soon' : 'скоро';

  const footerLinks = locations.map((loc) => {
    const labels: Record<string, string> = {
      fr: `Nursery privée & Micro-crèche ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
      en: `Private nursery ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
      ru: `Частный детский сад ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
    };
    return { label: labels[language], slug: loc.slug, comingSoon: loc.comingSoon };
  });

  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={logoMayo} alt="Mayo" className="h-8 w-auto !rounded-none brightness-0 invert mb-2" />
            <p className="text-sm opacity-80">
              {language === 'fr'
                ? 'Crèche multilingue & nursery privée sur la Côte d\'Azur'
                : language === 'en'
                ? 'Multilingual nursery & private childcare on the French Riviera'
                : 'Многоязычный детский сад на Лазурном Берегу'}
            </p>
          </div>

          {/* Location links */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide opacity-70">
              {locSectionTitle}
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    to={`/${link.slug}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + B2B */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide opacity-70">
              {t('contact.title')}
            </p>
            <p className="text-sm opacity-80">{t('contact.address')}</p>
            <p className="text-sm opacity-80 mb-4">{t('contact.hours')}</p>
            <Link
              to="/entreprises"
              className="inline-block text-sm font-medium opacity-80 hover:opacity-100 hover:underline transition-opacity"
            >
              {language === 'fr' ? '→ Solutions Entreprises (B2B)'
                : language === 'en' ? '→ Corporate Solutions (B2B)'
                : '→ Корпоративные решения (B2B)'}
            </Link>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-xs opacity-60">
            &copy; {year} Mayo. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
