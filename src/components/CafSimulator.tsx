import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, Euro, Mail, ArrowRight, Info } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ELIGIBLE_DEPARTMENTS = ['06', '13', '83', '84', '04', '05', '98'];

// CMG brackets 2024-2025 (enfant < 3 ans, micro-crèche)
// Plafonds revenus annuels nets pour un couple avec 1 enfant
const CMG_BRACKETS = [
  { maxIncome: 22_000, hourlyAid: 4.41 },   // Tranche 1
  { maxIncome: 49_000, hourlyAid: 2.78 },   // Tranche 2
  { maxIncome: Infinity, hourlyAid: 1.67 },  // Tranche 3
];

const MAYO_HOURLY_RATE = 8.5; // Tarif horaire moyen micro-crèche

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
  },
};

const CafSimulator = () => {
  const { language } = useLanguage();
  const tr = ((translations as any)[language] ?? (translations as any).en ?? (translations as any).fr);
  const reveal = useScrollReveal();

  const [postalCode, setPostalCode] = useState('');
  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('');

  const postalDept = postalCode.slice(0, 2);
  const isEligibleZone = postalCode.length >= 2 && ELIGIBLE_DEPARTMENTS.includes(postalDept);
  const incomeNum = parseInt(income.replace(/\s/g, ''), 10);
  const hoursNum = parseInt(hours, 10);

  const allFilled = postalCode.length >= 5 && !isNaN(incomeNum) && incomeNum > 0 && !isNaN(hoursNum) && hoursNum > 0;

  const result = useMemo(() => {
    if (!allFilled) return null;

    const bracket = CMG_BRACKETS.find(b => incomeNum <= b.maxIncome) || CMG_BRACKETS[CMG_BRACKETS.length - 1];
    const hourlyAid = bracket.hourlyAid;
    const remainingPerHour = Math.max(0, MAYO_HOURLY_RATE - hourlyAid);
    const monthlyRemaining = remainingPerHour * hoursNum;
    const monthlyAid = hourlyAid * hoursNum;

    return {
      remainingPerHour: remainingPerHour.toFixed(2),
      monthlyRemaining: monthlyRemaining.toFixed(0),
      monthlyAid: monthlyAid.toFixed(0),
      hourlyAid: hourlyAid.toFixed(2),
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

          {/* CTA */}
          <a
            href="/#contact"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base"
          >
            <Mail className="w-4 h-4" />
            {tr.cta}
            <ArrowRight className="w-4 h-4" />
          </a>

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
