import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Confidentialite = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;
  const heading = L({ fr: 'Politique de confidentialité', en: 'Privacy policy', ru: 'Политика конфиденциальности', it: 'Informativa sulla privacy' });

  const sections = [
    {
      title: L({ fr: 'Responsable du traitement', en: 'Data controller' }),
      body: L({
        fr: 'Le responsable du traitement des données est Mammouth Patrimoine, 2 rue d\'Angleterre, Villa Diable Rouge, 06000 Nice. Contact : contact@mayocreche.fr.',
        en: 'The data controller is Mammouth Patrimoine, 2 rue d\'Angleterre, Villa Diable Rouge, 06000 Nice, France. Contact: contact@mayocreche.fr.',
      }),
    },
    {
      title: L({ fr: 'Données collectées', en: 'Data collected' }),
      body: L({
        fr: 'Via nos formulaires (liste d\'attente, simulateur, diagnostic), nous collectons : adresse email, prénom/nom (facultatif), téléphone (facultatif), âge de l\'enfant, crèche souhaitée et informations saisies dans le simulateur (code postal, revenus, heures). Ces champs sont volontairement limités au nécessaire.',
        en: 'Through our forms (waitlist, simulator, diagnostic) we collect: email address, first/last name (optional), phone (optional), child\'s age, preferred nursery and the information entered in the simulator (postal code, income, hours). These fields are deliberately limited to what is necessary.',
      }),
    },
    {
      title: L({ fr: 'Finalités', en: 'Purposes' }),
      body: L({
        fr: 'Gérer votre inscription à la liste d\'attente, répondre à vos demandes et vous informer de l\'ouverture des crèches et des disponibilités de votre secteur.',
        en: 'To manage your waitlist registration, respond to your requests and inform you about nursery openings and availability in your area.',
      }),
    },
    {
      title: L({ fr: 'Base légale', en: 'Legal basis' }),
      body: L({
        fr: 'Le traitement repose sur votre consentement, recueilli lors de l\'envoi du formulaire.',
        en: 'Processing is based on your consent, collected when you submit the form.',
      }),
    },
    {
      title: L({ fr: 'Destinataires et conservation', en: 'Recipients and retention' }),
      body: L({
        fr: 'Vos données sont destinées à la seule équipe Mayo et sont enregistrées via l\'outil Google Sheets (Google). Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales. Elles sont conservées jusqu\'à 3 ans après le dernier contact, ou jusqu\'à votre demande de suppression.',
        en: 'Your data is intended solely for the Mayo team and is stored using Google Sheets (Google). It is never sold or transferred to third parties for commercial purposes. It is kept for up to 3 years after the last contact, or until you request deletion.',
      }),
    },
    {
      title: L({ fr: 'Vos droits', en: 'Your rights' }),
      body: L({
        fr: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, d\'opposition et de portabilité de vos données. Pour l\'exercer, écrivez à contact@mayocreche.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
        en: 'Under the GDPR, you have the right to access, rectify, erase, object to and port your data. To exercise these rights, write to contact@mayocreche.fr. You may also lodge a complaint with the French data protection authority, the CNIL (cnil.fr).',
      }),
    },
  ];

  return (
    <>
      <SEOHead title={`${heading} | Mayo`} description={L({ fr: 'Politique de confidentialité et protection des données personnelles de Mayo.', en: 'Mayo privacy and personal data protection policy.' })} canonical="https://mayocreche.fr/confidentialite" />
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

export default Confidentialite;
