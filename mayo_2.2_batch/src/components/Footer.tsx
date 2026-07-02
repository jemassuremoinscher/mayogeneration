import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { locations } from '@/data/locations';
import logoMayo from '@/assets/logo-mayo.png';
import CrossSiteLinks from '@/components/CrossSiteLinks';

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;

  const soonLabel = L({ fr: 'bientôt', en: 'soon', ru: 'скоро', it: 'presto' });

  const crecheLinks = locations.map((loc) => ({
    label: L({
      fr: `Nursery privée & Micro-crèche ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
      en: `Private nursery ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
      ru: `Частный детский сад ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
      it: `Nursery privata & Micro-asilo ${loc.city}${loc.neighborhood ? ` ${loc.neighborhood}` : ''}`,
    }),
    slug: loc.slug,
    comingSoon: loc.comingSoon,
  }));

  const tools = [
    { to: '/simulateur-cout-creche', label: L({ fr: 'Simulateur de coût', en: 'Cost simulator', ru: 'Калькулятор стоимости', it: 'Simulatore di costo' }) },
    { to: '/diagnostic', label: L({ fr: 'Diagnostic personnalisé', en: 'Personalised diagnostic', ru: 'Персональная диагностика', it: 'Diagnosi personalizzata' }) },
    { to: '/blog', label: L({ fr: 'Blog', en: 'Blog', ru: 'Блог', it: 'Blog' }) },
    { to: '/entreprises', label: L({ fr: 'Solutions Entreprises (B2B)', en: 'Corporate solutions (B2B)', ru: 'Корпоративные решения (B2B)', it: 'Soluzioni aziendali (B2B)' }) },
  ];

  const legal = [
    { to: '/mentions-legales', label: L({ fr: 'Mentions légales', en: 'Legal notice', ru: 'Правовая информация', it: 'Note legali' }) },
    { to: '/confidentialite', label: L({ fr: 'Confidentialité', en: 'Privacy', ru: 'Конфиденциальность', it: 'Privacy' }) },
    { to: '/cookies', label: L({ fr: 'Cookies', en: 'Cookies', ru: 'Cookies', it: 'Cookie' }) },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={logoMayo} alt="Mayo" className="h-8 w-auto !rounded-none brightness-0 invert mb-2" />
            <p className="text-sm opacity-80">
              {L({
                fr: 'Crèche multilingue & nursery privée sur la Côte d\'Azur',
                en: 'Multilingual nursery & private childcare on the French Riviera',
                ru: 'Многоязычный детский сад на Лазурном Берегу',
                it: 'Asilo multilingue & nursery privata sulla Costa Azzurra',
              })}
            </p>
          </div>

          {/* Nos Crèches */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide">
              {L({ fr: 'Nos Crèches', en: 'Our Nurseries', ru: 'Наши Ясли', it: 'I nostri asili' })}
            </p>
            <ul className="space-y-2">
              {crecheLinks.map((link) => (
                <li key={link.slug}>
                  {link.comingSoon ? (
                    <span className="text-sm opacity-50">
                      {link.label} <span className="text-xs">({soonLabel})</span>
                    </span>
                  ) : (
                    <Link to={`/${link.slug}`} className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Outils & ressources */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide">
              {L({ fr: 'Outils & ressources', en: 'Tools & resources', ru: 'Инструменты и ресурсы', it: 'Strumenti e risorse' })}
            </p>
            <ul className="space-y-2">
              {tools.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Légal */}
          <div>
            <p className="font-semibold mb-3 text-sm uppercase tracking-wide">{t('contact.title')}</p>
            <p className="text-sm opacity-80">{t('contact.address')}</p>
            <p className="text-sm opacity-80 mb-4">{t('contact.hours')}</p>
            <p className="font-semibold mb-2 text-sm uppercase tracking-wide">
              {L({ fr: 'Légal', en: 'Legal', ru: 'Правовое', it: 'Legale' })}
            </p>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm opacity-70 hover:opacity-100 hover:underline transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CrossSiteLinks />

        <div className="border-t border-primary-foreground/20 pt-6 text-center mt-6">
          <p className="text-xs opacity-60">&copy; {year} Mayo. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
