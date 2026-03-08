import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Baby, MapPin, Clock, Phone, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

type Step = 0 | 1 | 2 | 3;

const ageOptions = [
  { value: '0-6m', fr: '0 – 6 mois', en: '0 – 6 months', ru: '0 – 6 месяцев' },
  { value: '6-12m', fr: '6 – 12 mois', en: '6 – 12 months', ru: '6 – 12 месяцев' },
  { value: '1-2y', fr: '1 – 2 ans', en: '1 – 2 years', ru: '1 – 2 года' },
  { value: '2-3y', fr: '2 – 3 ans', en: '2 – 3 years', ru: '2 – 3 года' },
];

const cityOptions = [
  { value: 'nice', label: 'Nice' },
  { value: 'cannes', label: 'Cannes' },
  { value: 'antibes', label: 'Antibes' },
  { value: 'monaco', label: 'Monaco' },
];

const freqOptions = [
  { value: '5j', fr: '5 jours / semaine', en: '5 days / week', ru: '5 дней / неделя' },
  { value: '4j', fr: '4 jours / semaine', en: '4 days / week', ru: '4 дня / неделя' },
  { value: '3j', fr: '3 jours / semaine', en: '3 days / week', ru: '3 дня / неделя' },
  { value: '2j', fr: '2 jours / semaine', en: '2 days / week', ru: '2 дня / неделя' },
];

const tr = {
  fr: {
    title: 'Trouvez votre place en 30 secondes',
    subtitle: 'Répondez à 4 questions rapides',
    step1: 'Quel âge a votre enfant ?',
    step2: 'Dans quelle ville ?',
    step3: 'Quelle fréquence ?',
    step4: 'Votre numéro pour être rappelé(e)',
    phonePlaceholder: '06 XX XX XX XX',
    back: 'Retour',
    next: 'Suivant',
    submit: 'Recevoir mon devis personnalisé',
    success: 'Merci ! Nous vous recontactons sous 24h.',
    stepOf: 'sur',
  },
  en: {
    title: 'Find your spot in 30 seconds',
    subtitle: 'Answer 4 quick questions',
    step1: 'How old is your child?',
    step2: 'Which city?',
    step3: 'How often?',
    step4: 'Your number to be called back',
    phonePlaceholder: '+33 6 XX XX XX XX',
    back: 'Back',
    next: 'Next',
    submit: 'Get my personalized quote',
    success: 'Thank you! We\'ll get back to you within 24h.',
    stepOf: 'of',
  },
  ru: {
    title: 'Найдите место за 30 секунд',
    subtitle: 'Ответьте на 4 быстрых вопроса',
    step1: 'Сколько лет вашему ребёнку?',
    step2: 'В каком городе?',
    step3: 'Как часто?',
    step4: 'Ваш номер для обратного звонка',
    phonePlaceholder: '+33 6 XX XX XX XX',
    back: 'Назад',
    next: 'Далее',
    submit: 'Получить персональное предложение',
    success: 'Спасибо! Мы перезвоним в течение 24 часов.',
    stepOf: 'из',
  },
};

const QuizContact = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];

  const [step, setStep] = useState<Step>(0);
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [freq, setFreq] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (v: string) => {
    const cleaned = v.replace(/[^\d\s+]/g, '').slice(0, 18);
    setPhone(cleaned);
  };

  const canNext = () => {
    if (step === 0) return !!age;
    if (step === 1) return !!city;
    if (step === 2) return !!freq;
    if (step === 3) return phone.replace(/\s/g, '').length >= 10;
    return false;
  };

  const handleSubmit = () => {
    if (canNext()) setSubmitted(true);
  };

  const stepIcons = [Baby, MapPin, Clock, Phone];
  const stepQuestions = [t.step1, t.step2, t.step3, t.step4];
  const CurrentIcon = stepIcons[step];

  const renderOptions = (
    options: { value: string; [key: string]: string }[],
    selected: string,
    onSelect: (v: string) => void,
    labelKey?: string
  ) => (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const label = labelKey ? opt[labelKey] : (opt[language as Language] || opt.label);
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => { onSelect(opt.value); if (step < 3) setTimeout(() => setStep((s) => Math.min(3, s + 1) as Step), 250); }}
            className={`relative px-4 py-4 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
              isSelected
                ? 'border-sage bg-sage-light text-sage shadow-[var(--shadow-sage)]'
                : 'border-border bg-card text-foreground hover:border-sage/40 hover:bg-sage-light/50'
            }`}
          >
            {isSelected && (
              <Check className="absolute top-2 right-2 w-4 h-4 text-sage" />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );

  if (submitted) {
    return (
      <section id="contact" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }}>
        <div ref={reveal.ref} style={reveal.style} className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-light mb-6">
            <Check className="w-10 h-10 text-sage" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display mb-4">{t.success}</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} aria-labelledby="quiz-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t.subtitle}
          </div>
          <h2 id="quiz-title" className="text-3xl sm:text-4xl font-bold text-foreground font-display">
            {t.title}
          </h2>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-sage' : 'bg-border'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground font-body ml-2 whitespace-nowrap">
            {step + 1} {t.stepOf} 4
          </span>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-premium)' }}>
          {/* Step icon + question */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-sage-light flex items-center justify-center shrink-0">
              <CurrentIcon className="w-5 h-5 text-sage" />
            </div>
            <h3 className="text-lg font-semibold text-foreground font-display">{stepQuestions[step]}</h3>
          </div>

          {/* Content */}
          <div className="min-h-[160px]">
            {step === 0 && renderOptions(ageOptions, age, setAge)}
            {step === 1 && renderOptions(cityOptions, city, setCity, 'label')}
            {step === 2 && renderOptions(freqOptions, freq, setFreq)}
            {step === 3 && (
              <div>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-body"
                  autoComplete="tel"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0 disabled:pointer-events-none font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </button>

            {step < 3 ? (
              <button
                onClick={() => canNext() && setStep((s) => Math.min(3, s + 1) as Step)}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                style={{
                  background: canNext() ? 'var(--gradient-sage)' : undefined,
                  color: canNext() ? 'white' : undefined,
                  boxShadow: canNext() ? 'var(--shadow-sage)' : undefined,
                }}
              >
                {t.next}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                style={{
                  background: canNext() ? 'var(--gradient-sage)' : undefined,
                  color: canNext() ? 'white' : undefined,
                  boxShadow: canNext() ? 'var(--shadow-sage)' : undefined,
                }}
              >
                {t.submit}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizContact;
