import { useEffect, useState } from 'react';
import { useLanguage, HIGHLIGHTED_LANG_LABEL } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { locations } from '@/data/locations';
import { estimateMonthlyCost } from '@/lib/cmg';
import { Baby, MapPin, Languages, Clock, Calendar, Wallet, ArrowRight, ArrowLeft, Check, Sparkles, Star, AlertCircle } from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 7; // 6 questions + contact

const tr = {
  fr: {
    badge: 'Diagnostic personnalisé',
    title: 'Votre diagnostic Mayo en 6 questions',
    subtitle: 'Une vraie réponse, tout de suite : crèche recommandée, langues sur place et reste à charge estimé.',
    stepOf: 'Question',
    on: 'sur',
    back: 'Précédent',
    next: 'Suivant',
    q1: 'Quel âge a votre enfant ?',
    q2: 'Quel est votre secteur souhaité ?',
    q3: 'Quelle langue d\'éveil prioritaire en plus du FR/EN ?',
    q4: 'Quel rythme par semaine ?',
    q5: 'Date d\'entrée souhaitée',
    q6: 'Situation pour le calcul des aides (CMG)',
    income: 'Tranche de revenus annuels du foyer',
    incomeLow: '< 22 000 €',
    incomeMid: '22 000 – 49 000 €',
    incomeHigh: '> 49 000 €',
    nbChildren: 'Nombre d\'enfants à charge',
    monacoWorker: 'Parent travaillant à Monaco ?',
    yes: 'Oui',
    no: 'Non',
    contact: 'Vos coordonnées pour confirmer',
    firstName: 'Prénom',
    email: 'Email',
    seeDiag: 'Voir mon diagnostic',
    resultTitle: 'Votre diagnostic Mayo',
    recommended: 'Votre crèche Mayo recommandée',
    languagesOnSite: 'Langues sur ce site',
    requestedAvailable: 'La langue demandée est disponible ici.',
    requestedNetwork: 'La langue demandée est accessible via le réseau Mayo sur demande.',
    monthlyCost: 'Votre reste à charge estimé après CMG',
    perMonth: '€/mois',
    availability: 'Disponibilité',
    confirmCta: 'Confirmer ma pré-inscription prioritaire',
    visitCta: 'Réserver ma visite immersive',
    alsoConsider: 'À considérer aussi (ouverture prioritaire)',
    confirmed: 'Merci ! Nous revenons vers vous sous 48 h.',
    summary: 'Récapitulatif de vos réponses',
    priorityNote: 'Places limitées : réservez votre priorité.',
    waitlistNote: 'Secteur en forte demande : inscription sur liste d\'attente prioritaire.',
    statusPriority: 'Ouverture prioritaire',
    statusWaitlist: 'Sur liste d\'attente',
    daysShort: (d: number) => `${d} jours/sem`,
    ages: ['0 – 6 mois', '6 – 12 mois', '12 – 24 mois', '24 – 36 mois'],
    langItalian: 'Italien', langRussian: 'Russe', langEnglish: 'Anglais renforcé',
  },
  en: {
    badge: 'Personalized diagnosis',
    title: 'Your Mayo diagnosis in 6 questions',
    subtitle: 'A real answer right now: recommended nursery, on-site languages, and estimated out-of-pocket cost.',
    stepOf: 'Question', on: 'of',
    back: 'Back', next: 'Next',
    q1: 'How old is your child?',
    q2: 'Which area?',
    q3: 'Which priority awakening language (besides FR/EN)?',
    q4: 'Weekly rhythm?',
    q5: 'Desired start date',
    q6: 'Your situation (for CMG aid calculation)',
    income: 'Annual household income bracket',
    incomeLow: '< €22,000', incomeMid: '€22,000 – €49,000', incomeHigh: '> €49,000',
    nbChildren: 'Number of dependent children',
    monacoWorker: 'Parent working in Monaco?',
    yes: 'Yes', no: 'No',
    contact: 'Your contact to confirm',
    firstName: 'First name', email: 'Email',
    seeDiag: 'See my diagnosis',
    resultTitle: 'Your Mayo diagnosis',
    recommended: 'Your recommended Mayo nursery',
    languagesOnSite: 'Languages on this site',
    requestedAvailable: 'The requested language is available here.',
    requestedNetwork: 'The requested language is accessible via the Mayo network on request.',
    monthlyCost: 'Your estimated out-of-pocket cost after CMG',
    perMonth: '€/month',
    availability: 'Availability',
    confirmCta: 'Confirm my priority pre-registration',
    visitCta: 'Book my immersive tour',
    alsoConsider: 'Also consider (priority opening)',
    confirmed: 'Thank you! We\'ll get back to you within 48h.',
    summary: 'Summary of your answers',
    priorityNote: 'Limited spots: reserve your priority.',
    waitlistNote: 'High-demand area: priority waitlist registration.',
    statusPriority: 'Priority opening', statusWaitlist: 'On waitlist',
    daysShort: (d: number) => `${d} days/week`,
    ages: ['0 – 6 months', '6 – 12 months', '12 – 24 months', '24 – 36 months'],
    langItalian: 'Italian', langRussian: 'Russian', langEnglish: 'Enhanced English',
  },
  ru: {
    badge: 'Персональная диагностика',
    title: 'Ваша диагностика Mayo за 6 вопросов',
    subtitle: 'Настоящий ответ сразу: рекомендуемый сад, языки и оценка стоимости.',
    stepOf: 'Вопрос', on: 'из',
    back: 'Назад', next: 'Далее',
    q1: 'Сколько лет вашему ребёнку?',
    q2: 'Желаемый район?',
    q3: 'Приоритетный язык развития кроме FR/EN?',
    q4: 'Ритм в неделю?',
    q5: 'Желаемая дата начала',
    q6: 'Ваша ситуация (для расчёта CMG)',
    income: 'Годовой доход семьи',
    incomeLow: '< 22 000 €', incomeMid: '22 000 – 49 000 €', incomeHigh: '> 49 000 €',
    nbChildren: 'Количество детей на иждивении',
    monacoWorker: 'Родитель работает в Монако?',
    yes: 'Да', no: 'Нет',
    contact: 'Контакты для подтверждения',
    firstName: 'Имя', email: 'Email',
    seeDiag: 'Посмотреть диагностику',
    resultTitle: 'Ваша диагностика Mayo',
    recommended: 'Рекомендуемый детский сад Mayo',
    languagesOnSite: 'Языки на этом сайте',
    requestedAvailable: 'Запрошенный язык доступен здесь.',
    requestedNetwork: 'Запрошенный язык доступен в сети Mayo по запросу.',
    monthlyCost: 'Оценка остатка к оплате после CMG',
    perMonth: '€/мес',
    availability: 'Доступность',
    confirmCta: 'Подтвердить приоритетную предзапись',
    visitCta: 'Записаться на виртуальный тур',
    alsoConsider: 'Также рассмотрите (приоритетное открытие)',
    confirmed: 'Спасибо! Мы свяжемся с вами в течение 48 часов.',
    summary: 'Сводка ваших ответов',
    priorityNote: 'Мест мало: зарезервируйте приоритет.',
    waitlistNote: 'Высокий спрос: запись в приоритетный лист ожидания.',
    statusPriority: 'Приоритетное открытие', statusWaitlist: 'В листе ожидания',
    daysShort: (d: number) => `${d} дн/нед`,
    ages: ['0 – 6 мес', '6 – 12 мес', '12 – 24 мес', '24 – 36 мес'],
    langItalian: 'Итальянский', langRussian: 'Русский', langEnglish: 'Усиленный английский',
  },
  it: {
    badge: 'Diagnosi personalizzata',
    title: 'La tua diagnosi Mayo in 6 domande',
    subtitle: 'Una vera risposta subito: asilo consigliato, lingue sul posto e stima della spesa.',
    stepOf: 'Domanda', on: 'di',
    back: 'Indietro', next: 'Avanti',
    q1: 'Quanti anni ha il tuo bambino?',
    q2: 'Zona desiderata?',
    q3: 'Lingua principale d\'apprendimento oltre a FR/EN?',
    q4: 'Ritmo settimanale?',
    q5: 'Data d\'ingresso desiderata',
    q6: 'La tua situazione (per gli aiuti CMG)',
    income: 'Fascia di reddito annuale del nucleo',
    incomeLow: '< 22 000 €', incomeMid: '22 000 – 49 000 €', incomeHigh: '> 49 000 €',
    nbChildren: 'Numero di figli a carico',
    monacoWorker: 'Genitore che lavora a Monaco?',
    yes: 'Sì', no: 'No',
    contact: 'I tuoi contatti per confermare',
    firstName: 'Nome', email: 'Email',
    seeDiag: 'Vedi la mia diagnosi',
    resultTitle: 'La tua diagnosi Mayo',
    recommended: 'L\'asilo nido Mayo consigliato',
    languagesOnSite: 'Lingue in questa sede',
    requestedAvailable: 'La lingua richiesta è disponibile qui.',
    requestedNetwork: 'La lingua richiesta è accessibile tramite la rete Mayo su richiesta.',
    monthlyCost: 'Spesa stimata a tuo carico dopo CMG',
    perMonth: '€/mese',
    availability: 'Disponibilità',
    confirmCta: 'Conferma la mia pre-iscrizione prioritaria',
    visitCta: 'Prenota la mia visita immersiva',
    alsoConsider: 'Da considerare anche (apertura prioritaria)',
    confirmed: 'Grazie, abbiamo registrato la tua richiesta. Ti ricontatteremo entro 48 ore.',
    summary: 'Riepilogo delle tue risposte',
    priorityNote: 'Posti limitati: prenota la tua priorità.',
    waitlistNote: 'Zona ad alta richiesta: iscrizione su lista d\'attesa prioritaria.',
    statusPriority: 'Apertura prioritaria', statusWaitlist: 'Su lista d\'attesa',
    daysShort: (d: number) => `${d} giorni/sett`,
    ages: ['0 – 6 mesi', '6 – 12 mesi', '12 – 24 mesi', '24 – 36 mesi'],
    langItalian: 'Italiano', langRussian: 'Russo', langEnglish: 'Inglese rafforzato',
  },
};

const ageBuckets: { value: number; idx: number }[] = [
  { value: 3, idx: 0 }, { value: 9, idx: 1 }, { value: 18, idx: 2 }, { value: 30, idx: 3 },
];

const IdealCareQuiz = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];

  const [step, setStep] = useState<Step>(0);
  const [ageMonths, setAgeMonths] = useState<number | null>(null);
  const [preferredSite, setPreferredSite] = useState<string>('');
  const [highlightedLanguage, setHighlightedLanguage] = useState<'it' | 'ru' | 'en' | ''>('');
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
  const [desiredStart, setDesiredStart] = useState<string>('');
  const [incomeBracket, setIncomeBracket] = useState<'low' | 'mid' | 'high' | ''>('');
  const [nbChildren, setNbChildren] = useState<number>(1);
  const [monacoWorker, setMonacoWorker] = useState<boolean | null>(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Pre-select site if user came from a location card
  useEffect(() => {
    try {
      const s = sessionStorage.getItem('mayo:preferred_site');
      if (s && !preferredSite) setPreferredSite(s);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canNext = () => {
    switch (step) {
      case 0: return ageMonths !== null;
      case 1: return !!preferredSite;
      case 2: return !!highlightedLanguage;
      case 3: return daysPerWeek !== null;
      case 4: return !!desiredStart;
      case 5: return !!incomeBracket && nbChildren > 0 && monacoWorker !== null;
      case 6: return firstName.trim().length >= 2 && validEmail;
    }
    return false;
  };

  const goNext = () => {
    if (!canNext()) return;
    if (step === 6) {
      setShowResult(true);
      return;
    }
    setStep((s) => (s + 1) as Step);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    // Best-effort POST
    try {
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'quiz',
          child_age_months: ageMonths,
          preferred_site: preferredSite,
          highlighted_language: highlightedLanguage,
          days_per_week: daysPerWeek,
          desired_start: desiredStart,
          income_bracket: incomeBracket,
          nb_children: nbChildren,
          monaco_worker: monacoWorker,
          estimated_net_cost: cmg ? `${cmg.monthlyCostMin}-${cmg.monthlyCostMax}€/mois` : '',
          parent_name: firstName,
          email,
          locale: language,
        }),
      }).catch(() => {});
    } catch {}
  };

  const recommended = locations.find((l) => l.slug === preferredSite);
  const alternative = recommended && !recommended.priorityOpening
    ? locations.find((l) => l.priorityOpening)
    : undefined;

  const cmg = (incomeBracket && daysPerWeek)
    ? estimateMonthlyCost({ incomeBracket: incomeBracket as 'low' | 'mid' | 'high', nbChildren, daysPerWeek })
    : null;

  const requestedAvailable =
    recommended && (recommended.highlightedLanguage === highlightedLanguage ||
      recommended.availableLanguages?.includes(highlightedLanguage as 'it' | 'ru' | 'en'));

  if (showResult) {
    return (
      <section id="configurator" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }}>
        <div ref={reveal.ref} style={reveal.style} className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              {t.resultTitle}
            </div>
          </div>

          {recommended && (
            <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 mb-4" style={{ boxShadow: 'var(--shadow-premium)' }}>
              <p className="text-sm text-muted-foreground mb-1">{t.recommended}</p>
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2 flex-wrap">
                Mayo {recommended.city}
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${recommended.priorityOpening ? 'bg-primary text-primary-foreground' : 'bg-amber-100 text-amber-900'}`}>
                  {recommended.priorityOpening ? <Star className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {recommended.priorityOpening ? t.statusPriority : t.statusWaitlist}
                </span>
              </h3>
              {recommended.tagline && (
                <p className="text-sm text-muted-foreground mb-4">
                  {recommended.tagline[language] || recommended.tagline.fr}
                </p>
              )}

              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-2">
                  <Languages className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>{t.languagesOnSite} :</strong>{' '}
                    {recommended.availableLanguages?.map((l) => HIGHLIGHTED_LANG_LABEL[language][l]).join(', ')}
                    {' — '}
                    <span className="text-muted-foreground">
                      {requestedAvailable ? t.requestedAvailable : t.requestedNetwork}
                    </span>
                  </span>
                </p>
                {cmg && (
                  <p className="flex items-start gap-2">
                    <Wallet className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      <strong>{t.monthlyCost} :</strong>{' '}
                      ≈ {cmg.monthlyCostMin} – {cmg.monthlyCostMax} {t.perMonth}
                    </span>
                  </p>
                )}
                <p className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>{t.availability} :</strong>{' '}
                    {recommended.priorityOpening ? t.priorityNote : t.waitlistNote}
                  </span>
                </p>
              </div>

              {!confirmed ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:scale-[1.02]"
                    style={{ background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--shadow-sage)' }}
                  >
                    {t.confirmCta}
                  </button>
                  <a
                    href="#visit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all"
                  >
                    {t.visitCta}
                  </a>
                </div>
              ) : (
                <p className="mt-6 text-center font-medium text-primary">{t.confirmed}</p>
              )}
            </div>
          )}

          {alternative && (
            <div className="bg-card/60 rounded-2xl border border-dashed border-primary/40 p-5 mb-4">
              <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-1">{t.alsoConsider}</p>
              <p className="text-sm text-foreground"><strong>Mayo {alternative.city}</strong> — {alternative.tagline?.[language] || alternative.tagline?.fr}</p>
            </div>
          )}

          <div className="bg-card/50 rounded-2xl border border-border p-5 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground mb-1">{t.summary}</p>
            <p>• {t.q1} {ageMonths !== null && t.ages[ageBuckets.find(b => b.value === ageMonths)?.idx ?? 0]}</p>
            <p>• {t.q2} {recommended?.city}</p>
            <p>• {t.q3} {highlightedLanguage === 'it' ? t.langItalian : highlightedLanguage === 'ru' ? t.langRussian : t.langEnglish}</p>
            <p>• {t.q4} {daysPerWeek && t.daysShort(daysPerWeek)}</p>
            <p>• {t.q5} {desiredStart}</p>
            <p>• {t.q6} — {firstName} ({email})</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="configurator" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} aria-labelledby="quiz-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 id="quiz-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t.title}</h2>
          <p className="text-muted-foreground mt-2 text-sm">{t.subtitle}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
            {t.stepOf} {step + 1} {t.on} {TOTAL_STEPS}
          </span>
        </div>

        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-premium)' }}>
          {step === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Baby className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q1}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ageBuckets.map((b, i) => (
                  <button key={b.value} onClick={() => { setAgeMonths(b.value); setTimeout(() => setStep(1), 200); }}
                    className={`relative px-4 py-4 rounded-2xl border-2 text-sm font-medium transition-all ${ageMonths === b.value ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}>
                    {ageMonths === b.value && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                    {t.ages[i]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q2}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                {locations.map((loc) => (
                  <button key={loc.slug} onClick={() => { setPreferredSite(loc.slug); setTimeout(() => setStep(2), 200); }}
                    className={`relative text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${preferredSite === loc.slug ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}>
                    {preferredSite === loc.slug && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                    <div className="font-semibold text-foreground">{loc.city}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {loc.priorityOpening ? t.statusPriority : t.statusWaitlist}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Languages className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q3}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(['it', 'ru', 'en'] as const).map((l) => (
                  <button key={l} onClick={() => { setHighlightedLanguage(l); setTimeout(() => setStep(3), 200); }}
                    className={`relative text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${highlightedLanguage === l ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}>
                    {highlightedLanguage === l && <Check className="absolute top-3 right-3 w-4 h-4 text-primary" />}
                    {l === 'it' ? t.langItalian : l === 'ru' ? t.langRussian : t.langEnglish}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q4}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[2, 3, 4, 5].map((d) => (
                  <button key={d} onClick={() => { setDaysPerWeek(d); setTimeout(() => setStep(4), 200); }}
                    className={`relative px-4 py-4 rounded-2xl border-2 text-sm font-medium transition-all ${daysPerWeek === d ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}>
                    {daysPerWeek === d && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                    {t.daysShort(d)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Calendar className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q5}</h3>
              </div>
              <input type="month" value={desiredStart} onChange={(e) => setDesiredStart(e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base focus:outline-none focus:border-primary" />
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.q6}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.income}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'mid', 'high'] as const).map((b) => (
                      <button key={b} onClick={() => setIncomeBracket(b)}
                        className={`px-3 py-2 rounded-xl border-2 text-xs font-medium transition-all ${incomeBracket === b ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}>
                        {b === 'low' ? t.incomeLow : b === 'mid' ? t.incomeMid : t.incomeHigh}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.nbChildren}</label>
                  <input type="number" min={1} max={6} value={nbChildren} onChange={(e) => setNbChildren(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t.monacoWorker}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setMonacoWorker(true)} className={`px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all ${monacoWorker === true ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}>{t.yes}</button>
                    <button onClick={() => setMonacoWorker(false)} className={`px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all ${monacoWorker === false ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40'}`}>{t.no}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Sparkles className="w-5 h-5 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground">{t.contact}</h3>
              </div>
              <div className="space-y-3">
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t.firstName}
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" autoComplete="given-name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email}
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" autoComplete="email" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
            <button onClick={() => setStep((s) => Math.max(0, s - 1) as Step)} disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-0 disabled:pointer-events-none">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button onClick={goNext} disabled={!canNext()}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: canNext() ? 'var(--gradient-primary)' : undefined, color: canNext() ? 'white' : undefined, boxShadow: canNext() ? 'var(--shadow-sage)' : undefined }}>
              {step === 6 ? t.seeDiag : t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdealCareQuiz;
