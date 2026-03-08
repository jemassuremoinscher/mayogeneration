import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, ArrowRight, ArrowLeft, Mail, Check, Heart, Zap, Palette, Leaf, Languages, Clock, Search } from 'lucide-react';

const traits = [
  { value: 'curious', icon: Search, fr: 'Curieux', en: 'Curious', ru: 'Любознательный' },
  { value: 'calm', icon: Heart, fr: 'Calme', en: 'Calm', ru: 'Спокойный' },
  { value: 'energetic', icon: Zap, fr: 'Énergique', en: 'Energetic', ru: 'Энергичный' },
  { value: 'creative', icon: Palette, fr: 'Créatif', en: 'Creative', ru: 'Творческий' },
];

const priorities = [
  { value: 'bilingual', icon: Languages, fr: 'Bilinguisme', en: 'Bilingualism', ru: 'Двуязычие' },
  { value: 'nature', icon: Leaf, fr: 'Éveil nature', en: 'Nature awakening', ru: 'Природа' },
  { value: 'flexible', icon: Clock, fr: 'Flexibilité horaire', en: 'Schedule flexibility', ru: 'Гибкий график' },
];

const cities = ['Nice', 'Cannes', 'Antibes', 'Monaco'];

const tr = {
  fr: {
    badge: 'Personnalisé pour vous',
    title: 'Trouvez votre garde idéale',
    q1: 'Quel est le trait de caractère principal de votre enfant ?',
    q2: 'Quelle est votre priorité ?',
    back: 'Retour',
    resultTitle: (city: string) => `Nous avons 3 solutions qui vous correspondent à 98% à ${city}`,
    resultSub: 'Nos éducatrices ont été sélectionnées selon le profil de votre enfant.',
    emailGate: 'Pour voir le profil détaillé des éducatrices matchées, entrez votre email :',
    emailPlaceholder: 'votre@email.com',
    submit: 'Voir les profils',
    success: 'Merci ! Consultez votre boîte email pour découvrir vos éducatrices.',
    stepOf: 'sur',
    educators: [
      { name: 'Marie L.', specialty: 'Éveil sensoriel & Montessori', exp: '8 ans' },
      { name: 'Sarah K.', specialty: 'Bilingue anglais natif', exp: '5 ans' },
      { name: 'Olga P.', specialty: 'Trilingue FR/EN/RU', exp: '6 ans' },
    ],
  },
  en: {
    badge: 'Personalized for you',
    title: 'Find your ideal childcare',
    q1: 'What is your child\'s main personality trait?',
    q2: 'What is your priority?',
    back: 'Back',
    resultTitle: (city: string) => `We have 3 solutions that match you 98% in ${city}`,
    resultSub: 'Our educators were selected based on your child\'s profile.',
    emailGate: 'To see the detailed profiles of matched educators, enter your email:',
    emailPlaceholder: 'your@email.com',
    submit: 'View profiles',
    success: 'Thank you! Check your inbox to discover your educators.',
    stepOf: 'of',
    educators: [
      { name: 'Marie L.', specialty: 'Sensory & Montessori', exp: '8 years' },
      { name: 'Sarah K.', specialty: 'Native English bilingual', exp: '5 years' },
      { name: 'Olga P.', specialty: 'Trilingual FR/EN/RU', exp: '6 years' },
    ],
  },
  ru: {
    badge: 'Персонально для вас',
    title: 'Найдите идеальный уход',
    q1: 'Какая главная черта характера вашего ребёнка?',
    q2: 'Ваш приоритет?',
    back: 'Назад',
    resultTitle: (city: string) => `У нас 3 решения, которые подходят вам на 98% в ${city}`,
    resultSub: 'Наши воспитатели подобраны на основе профиля вашего ребёнка.',
    emailGate: 'Чтобы увидеть подробные профили подобранных воспитателей, введите email:',
    emailPlaceholder: 'ваш@email.com',
    submit: 'Посмотреть профили',
    success: 'Спасибо! Проверьте почту.',
    stepOf: 'из',
    educators: [
      { name: 'Мари Л.', specialty: 'Сенсорное развитие и Монтессори', exp: '8 лет' },
      { name: 'Сара К.', specialty: 'Носитель английского', exp: '5 лет' },
      { name: 'Ольга П.', specialty: 'Трёхъязычная FR/EN/RU', exp: '6 лет' },
    ],
  },
};

const IdealCareQuiz = () => {
  const { language } = useLanguage();
  const t = tr[language];

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [trait, setTrait] = useState('');
  const [priority, setPriority] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const matchCity = cities[Math.abs(trait.length + priority.length) % cities.length];

  const handleTraitSelect = (v: string) => {
    setTrait(v);
    setTimeout(() => setStep(1), 300);
  };

  const handlePrioritySelect = (v: string) => {
    setPriority(v);
    setTimeout(() => setStep(2), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) setSubmitted(true);
  };

  return (
    <section
      id="configurator"
      className="relative min-h-[80vh] flex items-center justify-center py-16 sm:py-24 px-4 overflow-hidden"
      style={{ background: 'var(--gradient-soft)' }}
      aria-labelledby="config-title"
    >
      <div className="max-w-lg mx-auto w-full">
        {/* Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-sage-light text-sage rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t.badge}
          </div>
          <h2 id="config-title" className="text-3xl sm:text-4xl font-bold text-foreground">
            {t.title}
          </h2>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-sage' : 'bg-border'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
            {Math.min(step + 1, 3)} {t.stepOf} 3
          </span>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-premium)' }}>
          {step === 0 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-5">{t.q1}</h3>
              <div className="grid grid-cols-2 gap-3">
                {traits.map((item) => {
                  const Icon = item.icon;
                  const selected = trait === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleTraitSelect(item.value)}
                      className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 ${
                        selected
                          ? 'border-sage bg-sage-light shadow-sm'
                          : 'border-border bg-card hover:border-sage/40 hover:bg-sage-light/50'
                      }`}
                    >
                      {selected && <Check className="absolute top-2 right-2 w-4 h-4 text-sage" />}
                      <Icon className={`w-7 h-7 ${selected ? 'text-sage' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium text-foreground">{item[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-5">{t.q2}</h3>
              <div className="space-y-3">
                {priorities.map((item) => {
                  const Icon = item.icon;
                  const selected = priority === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => handlePrioritySelect(item.value)}
                      className={`relative flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        selected
                          ? 'border-sage bg-sage-light shadow-sm'
                          : 'border-border bg-card hover:border-sage/40 hover:bg-sage-light/50'
                      }`}
                    >
                      {selected && <Check className="absolute top-3 right-3 w-4 h-4 text-sage" />}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-sage/20' : 'bg-accent/40'}`}>
                        <Icon className={`w-5 h-5 ${selected ? 'text-sage' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item[language]}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t.back}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              {/* Match result */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-light mb-3">
                  <Sparkles className="w-7 h-7 text-sage" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{t.resultTitle(matchCity)}</h3>
                <p className="text-sm text-muted-foreground">{t.resultSub}</p>
              </div>

              {/* Educator previews (blurred) */}
              <div className={`space-y-2.5 mb-6 ${!submitted ? 'blur-sm pointer-events-none select-none' : ''} transition-all duration-500`}>
                {t.educators.map((edu, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border">
                    <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center text-sage font-bold text-sm shrink-0">
                      {edu.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{edu.name}</p>
                      <p className="text-xs text-muted-foreground">{edu.specialty} — {edu.exp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email gate */}
              {!submitted ? (
                <>
                  <p className="text-sm text-foreground font-medium mb-3">{t.emailGate}</p>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="flex-1 rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      disabled={!isValidEmail}
                      className="shrink-0 flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: isValidEmail ? 'var(--gradient-sage)' : undefined,
                        color: isValidEmail ? 'white' : undefined,
                        boxShadow: isValidEmail ? 'var(--shadow-sage)' : undefined,
                      }}
                    >
                      {t.submit}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm font-medium text-sage">{t.success}</p>
                </div>
              )}

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t.back}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IdealCareQuiz;
