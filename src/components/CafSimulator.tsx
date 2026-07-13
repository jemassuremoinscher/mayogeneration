import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, Euro, Mail, ArrowRight, Info } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { computeCmg } from '@/lib/cmg';

const ELIGIBLE_DEPARTMENTS = ['06', '13', '83', '84', '04', '05', '98'];

const translations = {
  fr: {
    title: 'Simulateur d\'Aides CAF / CMG',
    subtitle: 'Estimez votre reste à charge pour une place en micro-crèche',
    postalCode: 'Code Postal',
    postalPlaceholder: '06000',
    income: 'Revenus annuels nets',
    incomePlaceholder: '35 000',
    hours: 'Heures par mois souhaitées',
    hoursPlaceholder: '120',
    resultLabel: 'Votre reste à charge estimé',
    perHour: '/ heure',
    perMonth: '/ mois',
    cmgAid: 'Aide CMG estimée',
    cta: 'Recevoir le devis détaillé par email',
    disclaimer: 'Estimation indicative basée sur les barèmes CMG 2024. Le montant réel peut varier selon votre situation familiale.',
    notEligibleZone: 'Ce code postal n\'est pas dans notre zone de couverture (Alpes-Maritimes / PACA).',
    fillAll: 'Renseignez les 3 champs pour voir votre estimation.',
    monthly: 'soit',
    leadIntro: 'Recevez ce devis détaillé + les disponibilités de votre secteur par email.',
    emailPlaceholder: 'Votre email',
    sendCta: 'Recevoir mon devis',
    thanks: 'Merci ! On vous envoie tout ça par email.',
    errorMsg: 'Une erreur est survenue, réessayez.',
  },
  en: {
    title: 'CAF / CMG Aid Simulator',
    subtitle: 'Estimate your out-of-pocket costs for a micro-nursery place',
    postalCode: 'Postal Code',
    postalPlaceholder: '06000',
    income: 'Annual net income',
    incomePlaceholder: '35,000',
    hours: 'Desired hours per month',
    hoursPlaceholder: '120',
    resultLabel: 'Your estimated out-of-pocket cost',
    perHour: '/ hour',
    perMonth: '/ month',
    cmgAid: 'Estimated CMG aid',
    cta: 'Receive a detailed quote by email',
    disclaimer: 'Indicative estimate based on 2024 CMG rates. The actual amount may vary depending on your family situation.',
    notEligibleZone: 'This postal code is not in our coverage area (Alpes-Maritimes / PACA).',
    fillAll: 'Fill in all 3 fields to see your estimate.',
    monthly: 'i.e.',
    leadIntro: 'Get this detailed quote + availability in your area by email.',
    emailPlaceholder: 'Your email',
    sendCta: 'Get my quote',
    thanks: 'Thanks! We\'ll email you everything.',
    errorMsg: 'Something went wrong, please try again.',
  },
  ru: {
    title: 'Калькулятор помощи CAF / CMG',
    subtitle: 'Рассчитайте вашу долю оплаты за место в мини-яслях',
    postalCode: 'Почтовый индекс',
    postalPlaceholder: '06000',
    income: 'Годовой чистый доход',
    incomePlaceholder: '35 000',
    hours: 'Желаемые часы в месяц',
    hoursPlaceholder: '120',
    resultLabel: 'Ваш ориентировочный остаток к оплате',
    perHour: '/ час',
    perMonth: '/ месяц',
    cmgAid: 'Оценка помощи CMG',
    cta: 'Получить детальный расчёт по email',
    disclaimer: 'Ориентировочная оценка на основе тарифов CMG 2024. Фактическая сумма может зависеть от вашей семейной ситуации.',
    notEligibleZone: 'Этот почтовый индекс не входит в нашу зону покрытия (Приморские Альпы / ПАКА).',
    fillAll: 'Заполните все 3 поля, чтобы увидеть оценку.',
    monthly: 'т.е.',
    leadIntro: 'Получите этот расчёт + наличие мест в вашем районе на email.',
    emailPlaceholder: 'Ваш email',
    sendCta: 'Получить расчёт',
    thanks: 'Спасибо! Мы отправим всё на email.',
    errorMsg: 'Произошла ошибка, попробуйте ещё раз.',
  },
};

const CafSimulator = () => {
  const { language } = useLanguage();
  const tr = ((translations as any)[language] ?? (translations as any).en ?? (translations as any).fr);
  const reveal = useScrollReveal();

  const [postalCode, setPostalCode] = useState('');
  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const postalDept = postalCode.slice(0, 2);
  const isEligibleZone = postalCode.length >= 2 && ELIGIBLE_DEPARTMENTS.includes(postalDept);
  const incomeNum = parseInt(income.replace(/\s/g, ''), 10);
  const hoursNum = parseInt(hours, 10);

  const allFilled = postalCode.length >= 5 && !isNaN(incomeNum) && incomeNum > 0 && !isNaN(hoursNum) && hoursNum > 0;

  const result = useMemo(() => {
    if (!allFilled) return null;
    const r = computeCmg({ annualIncome: incomeNum, nbChildren: 1, hours: hoursNum });
    return {
      remainingPerHour: r.remainingPerHour.toFixed(2),
      monthlyRemaining: r.monthlyRemaining.toFixed(0),
      monthlyAid: r.monthlyAid.toFixed(0),
      hourlyAid: r.hourlyAid.toFixed(2),
    };
  }, [allFilled, incomeNum, hoursNum]);

  const handlePostalChange = (v: string) => {
    const cleaned = v.replace(/\D/g, '').slice(0, 5);
    setPostalCode(cleaned);
  };

  const handleIncomeChange = (v: string) => {
    const cleaned = v.replace(/[^\d\s]/g, '');
    setIncome(cleaned);
  };

  const handleHoursChange = (v: string) => {
    const cleaned = v.replace(/\D/g, '');
    const num = parseInt(cleaned, 10);
    if (cleaned === '' || (num >= 0 && num <= 300)) {
      setHours(cleaned);
    }
  };

  const handleSubmit = async () => {
    if (!validEmail || submitting) return;
    setSubmitting(true);
    setError(false);
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'simulateur',
          email: email.trim(),
          estimated_net_cost: result?.monthlyRemaining ?? '',
          income_bracket: income,
          message: `Simulateur — CP ${postalCode}, ${hours}h/mois, reste estimé ~${result?.monthlyRemaining}€/mois`,
          locale: language,
        }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok && body?.ok === true && body?.persisted === true) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="simulator"
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="max-w-2xl mx-auto" ref={reveal.ref} style={reveal.style}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            {tr.title}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {tr.title}
          </h2>
          <p className="text-muted-foreground mt-2">{tr.subtitle}</p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-[var(--shadow-premium)]">
          <div className="grid gap-5">
            {/* Postal Code */}
            <div>
              <label htmlFor="sim-postal" className="block text-sm font-medium text-foreground mb-1.5">
                {tr.postalCode}
              </label>
              <input
                id="sim-postal"
                type="text"
                inputMode="numeric"
                value={postalCode}
                onChange={(e) => handlePostalChange(e.target.value)}
                placeholder={tr.postalPlaceholder}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                maxLength={5}
                autoComplete="postal-code"
              />
              {postalCode.length >= 2 && !isEligibleZone && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {tr.notEligibleZone}
                </p>
              )}
            </div>

            {/* Income */}
            <div>
              <label htmlFor="sim-income" className="block text-sm font-medium text-foreground mb-1.5">
                {tr.income} (€)
              </label>
              <div className="relative">
                <input
                  id="sim-income"
                  type="text"
                  inputMode="numeric"
                  value={income}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  placeholder={tr.incomePlaceholder}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  autoComplete="off"
                />
                <Euro className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              </div>
            </div>

            {/* Hours */}
            <div>
              <label htmlFor="sim-hours" className="block text-sm font-medium text-foreground mb-1.5">
                {tr.hours}
              </label>
              <input
                id="sim-hours"
                type="text"
                inputMode="numeric"
                value={hours}
                onChange={(e) => handleHoursChange(e.target.value)}
                placeholder={tr.hoursPlaceholder}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Result */}
          <div className="mt-8">
            {!allFilled ? (
              <p className="text-center text-sm text-muted-foreground py-4">{tr.fillAll}</p>
            ) : (
              <div className="animate-fade-in">
                {/* Aid info */}
                <div className="flex items-center justify-between bg-accent/40 rounded-xl px-4 py-3 mb-3">
                  <span className="text-sm text-muted-foreground">{tr.cmgAid}</span>
                  <span className="font-semibold text-primary">
                    {result?.hourlyAid}€ {tr.perHour}
                    <span className="text-xs text-muted-foreground ml-2">
                      ({tr.monthly} {result?.monthlyAid}€ {tr.perMonth})
                    </span>
                  </span>
                </div>

                {/* Main result */}
                <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{tr.resultLabel}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-primary">
                      {result?.remainingPerHour}€
                    </span>
                    <span className="text-lg text-muted-foreground">{tr.perHour}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tr.monthly} <span className="font-semibold text-foreground">{result?.monthlyRemaining}€</span> {tr.perMonth}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Email capture (conversion) */}
          {allFilled && (
            submitted ? (
              <div className="mt-6 flex items-center justify-center gap-2 bg-primary/10 text-primary rounded-xl px-4 py-3.5 text-sm font-medium">
                <Mail className="w-4 h-4" />
                {tr.thanks}
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2 text-center">{tr.leadIntro}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={tr.emailPlaceholder}
                    autoComplete="email"
                    className="flex-1 rounded-full border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!validEmail || submitting}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-4 h-4" />
                    {tr.sendCta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-xs text-destructive mt-1.5 text-center">{tr.errorMsg}</p>}
              </div>
            )
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/60 text-center mt-4 leading-relaxed flex items-start gap-1.5 justify-center">
            <Info className="w-3 h-3 mt-0.5 shrink-0" />
            {tr.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CafSimulator;
