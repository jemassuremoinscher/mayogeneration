import { useLanguage } from '@/contexts/LanguageContext';
import { Phone as PhoneIcon, ShieldCheck, Leaf, GraduationCap } from 'lucide-react';

const ctaLabels = {
  fr: 'Appeler maintenant',
  en: 'Call now',
  ru: 'Позвонить',
};

const badges = [
  { icon: ShieldCheck, fr: 'Agrément État', en: 'State Approved', ru: 'Гос. лицензия' },
  { icon: Leaf, fr: 'Bio', en: 'Organic', ru: 'Био' },
  { icon: GraduationCap, fr: 'Diplômée', en: 'Certified', ru: 'Диплом' },
];

const FloatingCTA = () => {
  const { language } = useLanguage();

  return (
    <>
      {/* Mobile: sticky call bar + trust badges */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Trust badges row */}
        <div className="flex items-center justify-center gap-3 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 lg:hidden">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground font-body">{((badge as any)[language] ?? (badge as any).en ?? (badge as any).fr)}</span>
              </div>
            );
          })}
        </div>

        {/* Call button */}
        <a
          href="tel:+33498101010"
          className="flex items-center justify-center gap-2.5 py-4 px-6 font-semibold text-base font-body transition-all active:scale-[0.98]"
          style={{
            background: 'var(--gradient-primary)',
            color: 'white',
            boxShadow: '0 -4px 20px -4px hsl(199 72% 56% / 0.3)',
          }}
          aria-label={((ctaLabels as any)[language] ?? (ctaLabels as any).en ?? (ctaLabels as any).fr)}
        >
          <PhoneIcon className="w-5 h-5" />
          {((ctaLabels as any)[language] ?? (ctaLabels as any).en ?? (ctaLabels as any).fr)}
        </a>
      </div>

      {/* Spacer for mobile to avoid content being hidden behind fixed bar */}
      <div className="md:hidden h-[88px]" />
    </>
  );
};

export default FloatingCTA;
