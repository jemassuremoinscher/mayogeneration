import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CafSimulator from '@/components/CafSimulator';

const SITE = 'https://mayocreche.fr';

const SimulateurCout = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;

  const faqs = [
    {
      q: L({ fr: 'Comment est calculé le reste à charge en crèche ?', en: 'How is the out-of-pocket nursery cost calculated?', ru: 'Как рассчитывается доплата за ясли?', it: 'Come si calcola la spesa a carico per l\'asilo?' }),
      a: L({ fr: 'Le reste à charge dépend de vos revenus, du nombre d\'enfants et de l\'aide CMG de la CAF. Le simulateur en donne une estimation indicative.', en: 'Your out-of-pocket cost depends on your income, number of children and the CAF (CMG) subsidy. The simulator gives an indicative estimate.', ru: 'Доплата зависит от дохода, числа детей и субсидии CAF (CMG). Калькулятор даёт ориентировочную оценку.', it: 'La spesa dipende dal reddito, dal numero di figli e dal sussidio CAF (CMG). Il simulatore fornisce una stima indicativa.' }),
    },
    {
      q: L({ fr: 'La simulation est-elle un devis ?', en: 'Is the simulation a quote?', ru: 'Является ли расчёт офертой?', it: 'La simulazione è un preventivo?' }),
      a: L({ fr: 'Non, c\'est une estimation indicative. Le tarif définitif est confirmé lors de l\'inscription.', en: 'No, it is an indicative estimate. The final price is confirmed at enrolment.', ru: 'Нет, это ориентировочная оценка. Итоговая цена подтверждается при записи.', it: 'No, è una stima indicativa. Il prezzo finale è confermato all\'iscrizione.' }),
    },
    {
      q: L({ fr: 'Quelles aides puis-je toucher ?', en: 'What subsidies can I receive?', ru: 'Какие субсидии я могу получить?', it: 'Quali aiuti posso ricevere?' }),
      a: L({ fr: 'Principalement le Complément de libre choix du mode de garde (CMG) de la CAF, ainsi qu\'un crédit d\'impôt selon votre situation.', en: 'Mainly the CAF childcare subsidy (CMG), plus a tax credit depending on your situation.', ru: 'В основном субсидия CAF (CMG), а также налоговый кредит в зависимости от ситуации.', it: 'Principalmente il sussidio CAF (CMG), oltre a un credito d\'imposta secondo la situazione.' }),
    },
  ];

  const title = L({ fr: 'Simulateur du coût d\'une crèche sur la Côte d\'Azur | Mayo', en: 'French Riviera nursery cost simulator | Mayo', ru: 'Калькулятор стоимости яслей на Лазурном Берегу | Mayo', it: 'Simulatore del costo dell\'asilo sulla Costa Azzurra | Mayo' });
  const description = L({ fr: 'Estimez en 1 minute votre reste à charge pour une place en crèche Mayo, aides CAF (CMG) déduites.', en: 'Estimate your out-of-pocket nursery cost at Mayo in 1 minute, CAF (CMG) subsidies included.', ru: 'Оцените за минуту доплату за место в яслях Mayo с учётом субсидий CAF (CMG).', it: 'Stima in 1 minuto la tua spesa per un posto all\'asilo Mayo, sussidi CAF (CMG) inclusi.' });

  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <ScrollProgressBar />
      <SEOHead title={title} description={description} canonical={`${SITE}/simulateur-cout-creche`} jsonLd={jsonLd} />
      <Header />
      <main className="min-h-screen pt-24">
        <section className="max-w-4xl mx-auto px-4 pb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {L({ fr: 'Combien coûte une crèche sur la Côte d\'Azur ?', en: 'How much does a nursery cost on the French Riviera?', ru: 'Сколько стоят ясли на Лазурном Берегу?', it: 'Quanto costa un asilo sulla Costa Azzurra?' })}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {L({ fr: 'Estimez votre reste à charge en une minute — aides CAF (CMG) prises en compte. Simulation indicative, sans engagement.', en: 'Estimate your out-of-pocket cost in one minute — CAF (CMG) subsidies included. Indicative, no commitment.', ru: 'Оцените доплату за минуту — с учётом субсидий CAF (CMG). Ориентировочно, без обязательств.', it: 'Stima la tua spesa in un minuto — sussidi CAF (CMG) inclusi. Indicativo, senza impegno.' })}
          </p>
        </section>
        <CafSimulator />
        <section className="max-w-4xl mx-auto px-4 py-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-semibold text-foreground mb-6">{L({ fr: 'Questions fréquentes', en: 'Frequently asked questions', ru: 'Частые вопросы', it: 'Domande frequenti' })}</h2>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium text-foreground list-none flex items-center justify-between gap-3">{f.q}<span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none shrink-0">+</span></summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="bg-primary/5 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">{L({ fr: 'Prêt à réserver une place ?', en: 'Ready to reserve a place?', ru: 'Готовы забронировать место?', it: 'Pronti a prenotare un posto?' })}</h2>
            <Link to="/#contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">{L({ fr: 'Rejoindre la liste d\'attente', en: 'Join the waitlist', ru: 'В лист ожидания', it: 'Unisciti alla lista d\'attesa' })}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SimulateurCout;
