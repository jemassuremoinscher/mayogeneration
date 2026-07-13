import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const MentionsLegales = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;
  const heading = L({ fr: 'Mentions légales', en: 'Legal notice', ru: 'Правовая информация', it: 'Note legali' });

  const sections = [
    {
      title: L({ fr: 'Éditeur du site', en: 'Site publisher' }),
      body: L({
        fr: 'Le site mayocreche.fr est édité par Mammouth Patrimoine, SASU au capital de 1 000 €, dont le siège social est situé 2 rue d\'Angleterre, Villa Diable Rouge, 06000 Nice, France. Immatriculée au Registre du Commerce et des Sociétés de Nice sous le numéro 893 960 146. N° de TVA intracommunautaire : FR06893960146. Directeur de la publication : Paul Vuillier.',
        en: 'The mayocreche.fr website is published by Mammouth Patrimoine, a SASU with share capital of €1,000, registered office at 2 rue d\'Angleterre, Villa Diable Rouge, 06000 Nice, France. Registered with the Nice Trade and Companies Register under number 893 960 146. Intra-community VAT number: FR06893960146. Publication director: Paul Vuillier.',
      }),
    },
    {
      title: L({ fr: 'Contact', en: 'Contact' }),
      body: L({
        fr: 'Email : contact@mayocreche.fr — Téléphone : +33 4 98 10 10 10.',
        en: 'Email: contact@mayocreche.fr — Phone: +33 4 98 10 10 10.',
      }),
    },
    {
      title: L({ fr: 'Hébergeur', en: 'Hosting provider' }),
      body: L({
        fr: 'Le site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France (ovhcloud.com).',
        en: 'The website is hosted by OVH SAS, 2 rue Kellermann, 59100 Roubaix, France (ovhcloud.com).',
      }),
    },
    {
      title: L({ fr: 'Propriété intellectuelle', en: 'Intellectual property' }),
      body: L({
        fr: 'L\'ensemble des éléments du site (textes, images, logos, marque Mayo) est la propriété de Mammouth Patrimoine, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite.',
        en: 'All elements of the site (texts, images, logos, the Mayo brand) are the property of Mammouth Patrimoine unless otherwise stated. Any reproduction, representation or distribution, in whole or in part, without prior written authorisation, is prohibited.',
      }),
    },
    {
      title: L({ fr: 'Responsabilité', en: 'Liability' }),
      body: L({
        fr: 'Les informations fournies sur ce site le sont à titre indicatif. Mammouth Patrimoine s\'efforce d\'en assurer l\'exactitude mais ne saurait être tenue responsable des erreurs, omissions ou d\'une indisponibilité du site. Les estimations du simulateur d\'aides sont indicatives et sans valeur contractuelle.',
        en: 'The information provided on this site is given for guidance only. Mammouth Patrimoine strives to ensure its accuracy but cannot be held liable for errors, omissions or unavailability of the site. The aid simulator estimates are indicative and have no contractual value.',
      }),
    },
  ];

  return (
    <>
      <SEOHead title={`${heading} | Mayo`} description={L({ fr: 'Mentions légales du site Mayo, édité par Mammouth Patrimoine.', en: 'Legal notice for the Mayo website, published by Mammouth Patrimoine.' })} canonical="https://mayocreche.fr/mentions-legales" />
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

export default MentionsLegales;
