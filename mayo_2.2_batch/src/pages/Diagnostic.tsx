import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import IdealCareQuiz from '@/components/IdealCareQuiz';

const SITE = 'https://mayocreche.fr';

const Diagnostic = () => {
  const { language } = useLanguage();
  const L = (o: Record<string, string>) => o[language] ?? o.fr;

  const faqs = [
    {
      q: L({ fr: 'Combien de temps prend le diagnostic ?', en: 'How long does the diagnostic take?', ru: 'Сколько времени занимает диагностика?', it: 'Quanto tempo richiede la diagnosi?' }),
      a: L({ fr: 'Moins de 2 minutes : 6 questions simples sur votre enfant et vos besoins.', en: 'Under 2 minutes: 6 simple questions about your child and your needs.', ru: 'Менее 2 минут: 6 простых вопросов о ребёнке и ваших потребностях.', it: 'Meno di 2 minuti: 6 semplici domande sul bambino e sulle vostre esigenze.' }),
    },
    {
      q: L({ fr: 'Le diagnostic est-il gratuit ?', en: 'Is the diagnostic free?', ru: 'Диагностика бесплатна?', it: 'La diagnosi è gratuita?' }),
      a: L({ fr: 'Oui, entièrement gratuit et sans engagement.', en: 'Yes, entirely free and with no commitment.', ru: 'Да, полностью бесплатно и без обязательств.', it: 'Sì, del tutto gratuita e senza impegno.' }),
    },
    {
      q: L({ fr: 'Que se passe-t-il après le diagnostic ?', en: 'What happens after the diagnostic?', ru: 'Что происходит после диагностики?', it: 'Cosa succede dopo la diagnosi?' }),
      a: L({ fr: 'Vous recevez une recommandation de crèche Mayo adaptée à votre enfant, puis vous pouvez rejoindre la liste d\'attente.', en: 'You get a Mayo nursery recommendation tailored to your child, then you can join the waitlist.', ru: 'Вы получаете рекомендацию яслей Mayo для вашего ребёнка и можете присоединиться к листу ожидания.', it: 'Ricevete una raccomandazione dell\'asilo Mayo su misura per il bambino e potete unirvi alla lista d\'attesa.' }),
    },
  ];

  const title = L({ fr: 'Diagnostic : quelle crèche multilingue pour votre enfant ? | Mayo', en: 'Diagnostic: which multilingual nursery for your child? | Mayo', ru: 'Диагностика: какие многоязычные ясли выбрать? | Mayo', it: 'Diagnosi: quale asilo multilingue per tuo figlio? | Mayo' });
  const description = L({ fr: 'Répondez à 6 questions et recevez une recommandation de crèche multilingue Mayo adaptée à votre enfant. Gratuit, 2 minutes.', en: 'Answer 6 questions and get a Mayo multilingual nursery recommendation tailored to your child. Free, 2 minutes.', ru: 'Ответьте на 6 вопросов и получите рекомендацию многоязычных яслей Mayo. Бесплатно, 2 минуты.', it: 'Rispondi a 6 domande e ricevi una raccomandazione dell\'asilo multilingue Mayo. Gratis, 2 minuti.' });

  const jsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <ScrollProgressBar />
      <SEOHead title={title} description={description} canonical={`${SITE}/diagnostic`} jsonLd={jsonLd} />
      <Header />
      <main className="min-h-screen pt-24">
        <section className="max-w-4xl mx-auto px-4 pb-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {L({ fr: 'Quelle crèche multilingue pour votre enfant ?', en: 'Which multilingual nursery for your child?', ru: 'Какие многоязычные ясли подойдут вашему ребёнку?', it: 'Quale asilo multilingue per tuo figlio?' })}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {L({ fr: '6 questions, 2 minutes, une recommandation personnalisée. Gratuit et sans engagement.', en: '6 questions, 2 minutes, a personalised recommendation. Free and no commitment.', ru: '6 вопросов, 2 минуты, персональная рекомендация. Бесплатно и без обязательств.', it: '6 domande, 2 minuti, una raccomandazione personalizzata. Gratis e senza impegno.' })}
          </p>
        </section>
        <IdealCareQuiz />
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
      </main>
      <Footer />
    </>
  );
};

export default Diagnostic;
