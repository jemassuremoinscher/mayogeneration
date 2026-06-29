// CMG (Complément de libre choix du Mode de Garde) — micro-crèche, enfant < 3 ans
// Barèmes 2024-2025 simplifiés. Source unique pour le simulateur ET le quiz.
// Toute estimation côté UI DOIT passer par ce module.

export const MAYO_HOURLY_RATE = 8.5;

const CMG_BRACKETS = [
  { maxIncome: 22_000, hourlyAid: 4.41 },
  { maxIncome: 49_000, hourlyAid: 2.78 },
  { maxIncome: Infinity, hourlyAid: 1.67 },
];

// Tranche → revenu annuel représentatif (utilisé par le quiz)
const INCOME_BY_BRACKET: Record<'low' | 'mid' | 'high', number> = {
  low: 18_000,
  mid: 35_000,
  high: 70_000,
};

// Jours/semaine → heures/mois (utilisé par le quiz)
const HOURS_PER_MONTH_BY_DAYS: Record<number, number> = {
  2: 88,
  3: 132,
  4: 176,
  5: 200,
};

export interface CmgCore {
  annualIncome: number;
  nbChildren: number;
  hours: number; // heures par mois
}

export interface CmgResult {
  hourlyAid: number;        // €/h CMG
  monthlyAid: number;       // €/mois CMG
  remainingPerHour: number; // €/h reste à charge
  monthlyRemaining: number; // €/mois reste à charge
  monthlyCostMin: number;   // fourchette basse
  monthlyCostMax: number;   // fourchette haute
  hours: number;
}

/**
 * Cœur du calcul — toutes les autres fonctions passent par ici.
 * Garantit que simulateur et quiz donnent le même résultat pour un même profil.
 */
export function computeCmg({ annualIncome, nbChildren, hours }: CmgCore): CmgResult {
  const bracket =
    CMG_BRACKETS.find((b) => annualIncome <= b.maxIncome) ||
    CMG_BRACKETS[CMG_BRACKETS.length - 1];

  const familyBonus = nbChildren >= 3 ? 1.4 : nbChildren === 2 ? 1.1 : 1;
  const hourlyAid = bracket.hourlyAid * familyBonus;

  const remainingPerHour = Math.max(0, MAYO_HOURLY_RATE - hourlyAid);
  const monthlyAid = hourlyAid * hours;
  const monthlyRemaining = remainingPerHour * hours;

  const base = Math.round(monthlyRemaining);
  return {
    hourlyAid,
    monthlyAid: Math.round(monthlyAid),
    remainingPerHour,
    monthlyRemaining: base,
    monthlyCostMin: Math.max(0, Math.round(base * 0.85)),
    monthlyCostMax: Math.round(base * 1.15),
    hours,
  };
}

// Compat : signature historique utilisée par le quiz (tranche + jours/sem)
export interface CmgInputs {
  incomeBracket: 'low' | 'mid' | 'high';
  nbChildren: number;
  daysPerWeek: number;
}

export function estimateMonthlyCost({ incomeBracket, nbChildren, daysPerWeek }: CmgInputs): CmgResult {
  return computeCmg({
    annualIncome: INCOME_BY_BRACKET[incomeBracket],
    nbChildren,
    hours: HOURS_PER_MONTH_BY_DAYS[daysPerWeek] || 176,
  });
}

// Helper pour mapper un revenu brut vers une tranche (utile pour cohérence simulateur ↔ quiz)
export function incomeToBracket(annualIncome: number): 'low' | 'mid' | 'high' {
  if (annualIncome <= 22_000) return 'low';
  if (annualIncome <= 49_000) return 'mid';
  return 'high';
}
