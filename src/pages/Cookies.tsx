import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Cookies = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;
  const heading = L({ fr: 'Politique de cookies', en: 'Cookie policy', ru: 'Политика использования cookies', it: 'Politica dei cookie' });

  const sections = [
    {
      title: L({ fr: 'Qu\'est-ce qu\'un cookie ?', en: 'What is a cookie?' }),
      body: L({
        fr: 'Un cookie est un petit fichier déposé sur votre appareil lors de la visite d\'un site. Il permet notamment de mesurer l\'audience et d\'améliorer votre expérience.',
        en: 'A cookie is a small file placed on your device when you visit a website. It is used in particular to measure audience and improve your experience.',
      }),
    },
    {
      title: L({ fr: 'Cookies utilisés', en: 'Cookies we use' }),
      body: L({
        fr: 'Nous utilisons Google Analytics, un outil de mesure d\'audience, pour comprendre la fréquentation du site (pages vues, provenance, appareil). Ces cookies ne sont déposés qu\'avec votre accord et ne servent pas à vous identifier personnellement.',
        en: 'We use Google Analytics, an audience-measurement tool, to understand site traffic (page views, source, device). These cookies are only set with your consent and are not used to personally identify you.',
      }),
    },
    {
      title: L({ fr: 'Durée', en: 'Duration' }),
      body: L({
        fr: 'Les cookies de mesure d\'audience sont conservés au maximum 13 mois, conformément aux recommandations de la CNIL.',
        en: 'Audience-measurement cookies are kept for a maximum of 13 months, in line with CNIL recommendations.',
      }),
    },
    {
      title: L({ fr: 'Gérer ou refuser les cookies', en: 'Manage or refuse cookies' }),
      body: L({
        fr: 'Vous pouvez à tout moment refuser ou supprimer les cookies via les paramètres de votre navigateur. Le refus des cookies de mesure d\'audience n\'affecte pas votre navigation sur le site.',
        en: 'You can refuse or delete cookies at any time via your browser settings. Refusing audience-measurement cookies does not affect your browsing on the site.',
      }),
    },
  ];

  return (
    <>
      <SEOHead title={`${heading} | Mayo`} description={L({ fr: 'Politique de gestion des cookies du site Mayo.', en: 'Mayo website cookie policy.' })} canonical="https://mayocreche.fr/cookies" />
      <Header />
      <main className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">{heading}</h1>
          <div className="space-y-8">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold text-foreground mb-2">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cookies;
