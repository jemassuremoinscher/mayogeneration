import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { locations } from '@/data/locations';
import logoMayo from '@/assets/logo-mayo.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

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
    <footer className="bg-primary text-primary-foreground py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          {/* Nos Crèches */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide opacity-70">
              {language === 'fr' ? 'Nos Crèches' : language === 'en' ? 'Our Nurseries' : 'Наши Ясли'}
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.slug}>
                  {link.comingSoon ? (
                    <span className="text-sm opacity-50">
                      {link.label} <span className="text-xs">({soonLabel})</span>
                    </span>
                  ) : (
                    <Link
                      to={`/${link.slug}`}
                      className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Semantic Links */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide opacity-70">
              {language === 'fr' ? 'Services Côte d\'Azur' : language === 'en' ? 'French Riviera Services' : 'Услуги Лазурного Берега'}
            </p>
            <ul className="space-y-2">
              {[
                { fr: 'Micro-crèche 06 Alpes-Maritimes', en: 'Micro-nursery 06 Alpes-Maritimes', ru: 'Мини-ясли 06 Приморские Альпы' },
                { fr: 'Nanny Riviera – Garde d\'enfants', en: 'Nanny Riviera – Childcare', ru: 'Няня Ривьера – Уход за детьми' },
                { fr: 'Crèche bilingue Côte d\'Azur', en: 'Bilingual nursery French Riviera', ru: 'Двуязычный детский сад Лазурный Берег' },
                { fr: 'Garde d\'enfants multilingue 06', en: 'Multilingual childcare 06', ru: 'Многоязычный уход за детьми 06' },
                { fr: 'Baby-sitting premium Nice', en: 'Premium babysitting Nice', ru: 'Премиум няня Ницца' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="/"
                    className="text-sm opacity-70 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {item[language]}
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
