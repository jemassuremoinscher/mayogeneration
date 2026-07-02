import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Confidentialite = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;
  const heading = L({ fr: 'Politique de confidentialité', en: 'Privacy policy', ru: 'Политика конфиденциальности', it: 'Informativa sulla privacy' });
  return (
    <>
      <SEOHead title={`${heading} | Mayo`} description={heading} noindex />
      <Header />
      <main className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto py-12">
          <h1 className="text-3xl font-bold text-foreground mb-6">{heading}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {L({
              fr: 'Contenu en cours de rédaction. Cette page sera mise à jour prochainement.',
              en: 'Content is being drafted. This page will be updated soon.',
              ru: 'Содержимое готовится. Страница будет обновлена в ближайшее время.',
              it: 'Contenuto in redazione. Questa pagina sarà aggiornata a breve.',
            })}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Confidentialite;
