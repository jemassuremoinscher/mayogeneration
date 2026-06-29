import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, Leaf, GraduationCap } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    fr: 'Agrément État',
    en: 'State Approved',
    ru: 'Гос. лицензия',
  },
  {
    icon: Leaf,
    fr: 'Repas Bio',
    en: 'Organic Meals',
    ru: 'Био питание',
  },
  {
    icon: GraduationCap,
    fr: 'Équipe Diplômée',
    en: 'Certified Team',
    ru: 'Дипломированная команда',
  },
];

const TrustBadges = () => {
  const { language } = useLanguage();

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div
            key={i}
            className="group flex items-center gap-2.5 bg-card/95 backdrop-blur-md border border-border rounded-2xl px-3 py-2.5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300 cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-sage-light flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-sage" />
            </div>
            <span className="text-xs font-medium text-foreground whitespace-nowrap font-body">
              {((badge as any)[language] ?? (badge as any).en ?? (badge as any).fr)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
