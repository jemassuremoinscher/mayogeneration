// CMG (Complément de libre choix du Mode de Garde) — micro-crèche, enfant < 3 ans
// Barèmes 2024 simplifiés. Ces estimations sont indicatives.

const CMG_BRACKETS = [
  { maxIncome: 22_000, hourlyAid: 4.41 },
  { maxIncome: 49_000, hourlyAid: 2.78 },
  { maxIncome: Infinity, hourlyAid: 1.67 },
];

export const MAYO_HOURLY_RATE = 8.5;
const DEFAULT_HOURS_PER_MONTH_BY_DAYS: Record<number, number> = {
  2: 88,
  3: 132,
  4: 176,
  5: 200,
};

export interface CmgInputs {
  incomeBracket: 'low' | 'mid' | 'high'; // tranches : <22k, 22-49k, >49k
  nbChildren: number;
  daysPerWeek: number;
}

export interface CmgResult {
  monthlyCostMin: number;
  monthlyCostMax: number;
  monthlyAid: number;
  hours: number;
}

export function estimateMonthlyCost({ incomeBracket, nbChildren, daysPerWeek }: CmgInputs): CmgResult {
  const annualIncome = incomeBracket === 'low' ? 18_000 : incomeBracket === 'mid' ? 35_000 : 70_000;
  const bracket = CMG_BRACKETS.find(b => annualIncome <= b.maxIncome)!;
  // Majoration pour familles nombreuses (très simplifié)
  const familyBonus = nbChildren >= 3 ? 1.4 : nbChildren === 2 ? 1.1 : 1;
  const hourlyAid = bracket.hourlyAid * familyBonus;
  const hours = DEFAULT_HOURS_PER_MONTH_BY_DAYS[daysPerWeek] || 176;
  const remainingPerHour = Math.max(0, MAYO_HOURLY_RATE - hourlyAid);
  const base = Math.round(remainingPerHour * hours);
  return {
    monthlyCostMin: Math.max(0, Math.round(base * 0.85)),
    monthlyCostMax: Math.round(base * 1.15),
    monthlyAid: Math.round(hourlyAid * hours),
    hours,
  };
}
