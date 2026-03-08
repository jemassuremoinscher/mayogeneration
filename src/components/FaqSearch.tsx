import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, MessageCircle, ArrowRight, Mail, Sparkles, ChevronRight, X } from 'lucide-react';

interface FaqEntry {
  keywords: string[];
  answer: { fr: string; en: string; ru: string };
}

const faqData: FaqEntry[] = [
  {
    keywords: ['aide', 'caf', 'cmg', 'aides', 'financial', 'помощь', 'пособие', 'monaco'],
    answer: {
      fr: 'Le CMG (Complément de libre choix du Mode de Garde) peut couvrir jusqu\'à 85% des frais de garde. Pour Monaco, les résidents bénéficient d\'aides spécifiques via le DASO. Chez Mayo, nous vous accompagnons dans toutes vos démarches administratives pour maximiser vos aides.',
      en: 'The CMG (Childcare Mode Choice Supplement) can cover up to 85% of childcare costs. For Monaco residents, specific aid is available through DASO. At Mayo, we help you with all administrative procedures to maximize your benefits.',
      ru: 'CMG (пособие на уход за детьми) может покрывать до 85% стоимости ухода. Для резидентов Монако доступна специальная помощь через DASO. В Mayo мы сопровождаем вас во всех административных процедурах.',
    },
  },
  {
    keywords: ['inscrire', 'inscription', 'bébé', 'baby', 'enroll', 'register', 'записать', 'cannes'],
    answer: {
      fr: 'L\'inscription chez Mayo est simple : remplissez notre formulaire rapide (30 secondes), et notre équipe vous recontacte sous 24h pour organiser une visite. Nous accueillons les enfants de 3 mois à 3 ans. Les places sont limitées, nous vous recommandons de nous contacter le plus tôt possible.',
      en: 'Enrolling at Mayo is simple: fill out our quick form (30 seconds), and our team will contact you within 24h to arrange a visit. We welcome children from 3 months to 3 years. Spots are limited, so we recommend contacting us as early as possible.',
      ru: 'Запись в Mayo проста: заполните нашу быструю форму (30 секунд), и наша команда свяжется с вами в течение 24 часов для организации визита. Мы принимаем детей от 3 месяцев до 3 лет.',
    },
  },
  {
    keywords: ['horaire', 'heure', 'ouverture', 'hours', 'schedule', 'часы', 'расписание', 'flexible'],
    answer: {
      fr: 'Mayo est ouvert du lundi au vendredi de 8h à 18h. Nous proposons des formules flexibles : temps plein (5j), 4 jours, 3 jours ou 2 jours par semaine. Des horaires étendus sont disponibles sur demande pour les parents aux emplois du temps atypiques.',
      en: 'Mayo is open Monday to Friday from 8am to 6pm. We offer flexible plans: full-time (5 days), 4 days, 3 days or 2 days per week. Extended hours are available on request for parents with atypical schedules.',
      ru: 'Mayo работает с понедельника по пятницу с 8:00 до 18:00. Мы предлагаем гибкие планы: полный день (5 дней), 4 дня, 3 дня или 2 дня в неделю.',
    },
  },
  {
    keywords: ['repas', 'bio', 'meal', 'food', 'organic', 'питание', 'еда', 'menu', 'allergie'],
    answer: {
      fr: 'Tous nos repas sont préparés sur place par notre cuisinière avec des produits bio et locaux des marchés de Nice. Nous adaptons les menus aux allergies et intolérances de chaque enfant. Le goûter est inclus dans nos formules.',
      en: 'All meals are prepared on-site by our chef with organic, local products from Nice\'s markets. We adapt menus to each child\'s allergies and intolerances. Afternoon snack is included in all plans.',
      ru: 'Все блюда готовятся на месте нашим поваром из органических местных продуктов с рынков Ниццы. Мы адаптируем меню к аллергиям каждого ребёнка.',
    },
  },
  {
    keywords: ['langue', 'bilingue', 'multilingue', 'language', 'bilingual', 'язык', 'двуязычный', 'russe', 'anglais', 'russian', 'english'],
    answer: {
      fr: 'Mayo propose une immersion naturelle en trois langues : français, anglais et russe. Nos éducatrices natives interagissent dans leur langue maternelle tout au long de la journée. Cette approche permet aux enfants d\'acquérir les bases linguistiques dès le plus jeune âge.',
      en: 'Mayo offers natural immersion in three languages: French, English, and Russian. Our native educators interact in their mother tongue throughout the day. This approach allows children to acquire language skills from the earliest age.',
      ru: 'Mayo предлагает естественное погружение в три языка: французский, английский и русский. Наши воспитатели-носители общаются на родном языке в течение всего дня.',
    },
  },
];

const defaultAnswer = {
  fr: 'Merci pour votre question ! Notre équipe est à votre disposition pour y répondre personnellement. N\'hésitez pas à nous contacter directement ou à remplir notre formulaire rapide.',
  en: 'Thank you for your question! Our team is available to answer it personally. Feel free to contact us directly or fill out our quick form.',
  ru: 'Спасибо за вопрос! Наша команда готова ответить лично. Свяжитесь с нами напрямую или заполните нашу быструю форму.',
};

const trLabels = {
  fr: {
    title: 'Posez votre question sur la garde d\'enfants sur la Côte d\'Azur',
    placeholder: 'Ex: Quelles aides pour Monaco ?',
    suggestionsTitle: 'Questions fréquentes',
    guideOffer: 'Voulez-vous recevoir notre guide complet des aides 2026 par email ?',
    emailPlaceholder: 'votre@email.com',
    send: 'Recevoir le guide',
    sent: 'Guide envoyé ! Vérifiez votre boîte email.',
    suggestions: [
      'Quelles aides pour Monaco ?',
      'Comment inscrire mon bébé à Cannes ?',
      'Quels sont les horaires d\'ouverture ?',
      'Les repas sont-ils bio ?',
      'Quelles langues sont parlées ?',
    ],
  },
  en: {
    title: 'Ask your question about childcare on the French Riviera',
    placeholder: 'E.g.: What aid is available for Monaco?',
    suggestionsTitle: 'Frequently asked',
    guideOffer: 'Would you like to receive our complete 2026 aid guide by email?',
    emailPlaceholder: 'your@email.com',
    send: 'Get the guide',
    sent: 'Guide sent! Check your inbox.',
    suggestions: [
      'What aid for Monaco?',
      'How to enroll my baby in Cannes?',
      'What are the opening hours?',
      'Are meals organic?',
      'What languages are spoken?',
    ],
  },
  ru: {
    title: 'Задайте вопрос об уходе за детьми в 06',
    placeholder: 'Напр.: Какие пособия для Монако?',
    suggestionsTitle: 'Частые вопросы',
    guideOffer: 'Хотите получить полный справочник пособий 2026 по email?',
    emailPlaceholder: 'ваш@email.com',
    send: 'Получить справочник',
    sent: 'Справочник отправлен! Проверьте почту.',
    suggestions: [
      'Какие пособия для Монако?',
      'Как записать ребёнка в Канны?',
      'Часы работы?',
      'Питание органическое?',
      'На каких языках говорят?',
    ],
  },
};

function findAnswer(query: string, language: 'fr' | 'en' | 'ru'): string {
  const q = query.toLowerCase();
  for (const entry of faqData) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return entry.answer[language];
    }
  }
  return defaultAnswer[language];
}

const FaqSearch = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = trLabels[language];
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [guideSent, setGuideSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  useEffect(() => {
    if (!query.trim()) {
      setAnswer('');
      return;
    }
    setIsTyping(true);
    const timer = setTimeout(() => {
      setAnswer(findAnswer(query, language));
      setIsTyping(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query, language]);

  const handleSuggestion = (s: string) => {
    setQuery(s);
    inputRef.current?.focus();
  };

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) setGuideSent(true);
  };

  const clearQuery = () => {
    setQuery('');
    setAnswer('');
    setGuideSent(false);
    inputRef.current?.focus();
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4"
      style={{ background: 'var(--gradient-soft)' }}
      aria-labelledby="faq-title"
    >
      <div ref={reveal.ref} style={reveal.style} className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage rounded-full px-4 py-1.5 text-sm font-medium mb-4 font-body">
            <MessageCircle className="w-4 h-4" />
            {t.suggestionsTitle}
          </div>
          <h2 id="faq-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-display">
            {t.title}
          </h2>
        </div>

        {/* Chat bubble search */}
        <div className="relative">
          <div className="bg-card rounded-3xl border border-border overflow-hidden" style={{ boxShadow: 'var(--shadow-premium)' }}>
            {/* Input area */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
              <Search className="w-5 h-5 text-muted-foreground/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-body text-sm sm:text-base"
              />
              {query && (
                <button onClick={clearQuery} className="shrink-0 p-1 rounded-full hover:bg-accent transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Answer area */}
            {(answer || isTyping) && (
              <div className="p-5 animate-fade-in">
                {isTyping ? (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* AI-style answer bubble */}
                    <div className="flex gap-3 mb-5">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-sage-light flex items-center justify-center mt-0.5">
                        <Sparkles className="w-4 h-4 text-sage" />
                      </div>
                      <div className="flex-1 bg-accent/40 rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-foreground leading-relaxed font-body">{answer}</p>
                      </div>
                    </div>

                    {/* Guide CTA */}
                    {!guideSent ? (
                      <div className="bg-sage-light/60 rounded-2xl p-4">
                        <p className="text-sm font-medium text-foreground mb-3 font-body flex items-center gap-2">
                          <Mail className="w-4 h-4 text-sage" />
                          {t.guideOffer}
                        </p>
                        <form onSubmit={handleGuideSubmit} className="flex gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.emailPlaceholder}
                            className="flex-1 rounded-xl border-2 border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-body"
                            autoComplete="email"
                          />
                          <button
                            type="submit"
                            disabled={!isValidEmail}
                            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                            style={{
                              background: isValidEmail ? 'var(--gradient-sage)' : undefined,
                              color: isValidEmail ? 'white' : undefined,
                              boxShadow: isValidEmail ? 'var(--shadow-sage)' : undefined,
                            }}
                          >
                            {t.send}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-sage-light/60 rounded-2xl p-4 text-center">
                        <p className="text-sm font-medium text-sage font-body">{t.sent}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Suggestions (when no query) */}
            {!query && (
              <div className="p-5 pt-3">
                <div className="flex flex-wrap gap-2">
                  {t.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(s)}
                      className="inline-flex items-center gap-1.5 bg-accent/40 hover:bg-sage-light text-foreground/80 hover:text-sage rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-all font-body"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSearch;
