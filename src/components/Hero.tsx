import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-nursery.jpg';
import logoMayo from '@/assets/logo-mayo.png';

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Desktop-only parallax. Skip on mobile and when user prefers reduced motion.
    const mqDesktop = window.matchMedia('(min-width: 768px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mqDesktop.matches || mqReduced.matches) {
      setOffset(0);
      return;
    }

    let ticking = false;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress: 0 when hero top at viewport top, 1 when hero bottom leaves viewport top
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || vh)));
      setOffset(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const bgTransform = `translate3d(0, ${offset * 120}px, 0) scale(${1 + offset * 0.06})`;
  const contentTransform = `translate3d(0, ${offset * -60}px, 0)`;
  const contentOpacity = 1 - Math.min(1, offset * 1.4);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label={t('hero.title')}
    >
      <img
        src={heroImage}
        alt={t('hero.title')}
        className="absolute inset-0 w-full h-full object-cover !rounded-none will-change-transform"
        style={{ transform: bgTransform }}
        loading="eager"
        {...{ fetchpriority: "high" } as any}
        width="1920"
        height="1080"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/70" aria-hidden="true" />

      <div
        className="relative z-10 text-center text-primary-foreground px-4 pt-16 max-w-4xl mx-auto animate-fade-in will-change-transform"
        style={{ transform: contentTransform, opacity: contentOpacity }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 drop-shadow-lg flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4">
          {(() => {
            const parts = t('hero.title').split('Mayo');
            return parts.map((part, i) => (
              <span key={i} className="contents">
                {part && <span>{part.trim()}</span>}
                {i < parts.length - 1 && (
                  <img
                    src={logoMayo}
                    alt="Mayo"
                    className="inline-block !rounded-none brightness-0 invert h-[1.35em] w-auto align-middle -translate-y-[0.05em]"
                  />
                )}
              </span>
            ));
          })()}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-2 font-light drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md opacity-90">
          {t('hero.description')}
        </p>
        <button
          onClick={scrollToContact}
          className="hidden md:inline-flex text-base sm:text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-body"
          style={{ background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--shadow-sage)' }}
          aria-label={t('hero.cta')}
        >
          {t('hero.cta')}
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
