import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Play, X, Mail, ArrowRight, Eye, Lock } from 'lucide-react';
import heroImage from '@/assets/hero-nursery.jpg';

const tr = {
  fr: {
    badge: 'Visite Immersive',
    title: 'Découvrez nos espaces comme si vous y étiez',
    subtitle: 'Visite virtuelle 360° de notre crèche',
    play: 'Lancer la visite',
    modalTitle: 'Visite Virtuelle 360°',
    previewNote: 'Aperçu de nos espaces d\'accueil',
    gateTitle: 'Accédez à la visite complète en HD',
    gateSubtitle: 'Recevez votre accès exclusif à la visite virtuelle de nos établissements',
    emailPlaceholder: 'votre@email.com',
    submit: 'Recevoir mon accès',
    success: 'Merci ! Vérifiez votre boîte email.',
    rooms: ['Salle d\'éveil', 'Espace motricité', 'Coin lecture', 'Jardin intérieur'],
  },
  en: {
    badge: 'Immersive Tour',
    title: 'Discover our spaces as if you were there',
    subtitle: '360° virtual tour of our nursery',
    play: 'Start tour',
    modalTitle: '360° Virtual Tour',
    previewNote: 'Preview of our childcare spaces',
    gateTitle: 'Access the full HD tour',
    gateSubtitle: 'Receive your exclusive access to the virtual tour of our facilities',
    emailPlaceholder: 'your@email.com',
    submit: 'Get my access',
    success: 'Thank you! Check your inbox.',
    rooms: ['Awakening room', 'Motor skills area', 'Reading corner', 'Indoor garden'],
  },
  ru: {
    badge: 'Виртуальный тур',
    title: 'Познакомьтесь с нашими пространствами',
    subtitle: 'Виртуальный тур 360° по нашим яслям',
    play: 'Начать тур',
    modalTitle: 'Виртуальный тур 360°',
    previewNote: 'Обзор наших помещений',
    gateTitle: 'Получите полный тур в HD',
    gateSubtitle: 'Получите эксклюзивный доступ к виртуальному туру по нашим учреждениям',
    emailPlaceholder: 'ваш@email.com',
    submit: 'Получить доступ',
    success: 'Спасибо! Проверьте почту.',
    rooms: ['Игровая комната', 'Зона моторики', 'Уголок чтения', 'Внутренний сад'],
  },
};

const ImmersiveVisit = () => {
  const { language } = useLanguage();
  const reveal = useScrollReveal();
  const t = tr[language];

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) setSubmitted(true);
  };

  return (
    <>
      <section
        id="visit"
        className="relative py-20 sm:py-28 px-4 overflow-hidden"
        aria-labelledby="visit-title"
      >
        {/* Background image with blur */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover !rounded-none"
            aria-hidden="true"
          />
          <div className="absolute inset-0 backdrop-blur-md bg-foreground/40" />
        </div>

        <div ref={reveal.ref} style={reveal.style} className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm border border-card/20 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6 font-body">
            <Eye className="w-4 h-4" />
            {t.badge}
          </div>

          <h2
            id="visit-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-3 font-display"
          >
            {t.title}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 font-body">{t.subtitle}</p>

          {/* Play button */}
          <button
            onClick={() => setModalOpen(true)}
            className="group relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-all duration-500 hover:scale-110"
            aria-label={t.play}
          >
            {/* Outer ring pulse */}
            <span className="absolute inset-0 rounded-full border-2 border-primary-foreground/30 animate-ping" style={{ animationDuration: '2s' }} />
            {/* Glass circle */}
            <span className="absolute inset-0 rounded-full bg-card/20 backdrop-blur-lg border border-card/30" />
            {/* Inner icon */}
            <Play className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
          </button>

          <p className="mt-6 text-primary-foreground/60 text-sm font-body">{t.play}</p>

          {/* Room tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {t.rooms.map((room, i) => (
              <span
                key={i}
                className="bg-card/15 backdrop-blur-sm border border-card/20 text-primary-foreground/90 rounded-full px-3.5 py-1.5 text-xs font-medium font-body"
              >
                {room}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.modalTitle}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-2xl bg-card rounded-3xl border border-border overflow-hidden animate-scale-in" style={{ boxShadow: 'var(--shadow-premium)' }}>
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            {/* Simulated 360° preview */}
            <div className="relative h-56 sm:h-72 bg-foreground/5 overflow-hidden">
              <img
                src={heroImage}
                alt={t.previewNote}
                className="w-full h-full object-cover !rounded-none transition-transform duration-700"
                style={{ transform: `scale(1.3) translateX(${(activeRoom - 1.5) * 8}%)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

              {/* Room selector */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {t.rooms.map((room, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRoom(i)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all font-body ${
                      activeRoom === i
                        ? 'bg-sage text-sage-foreground shadow-[var(--shadow-sage)]'
                        : 'bg-card/70 backdrop-blur-sm text-foreground/80 hover:bg-card'
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {/* Email gate */}
            <div className="p-6 sm:p-8">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-sage" />
                    <h3 className="text-lg font-bold text-foreground font-display">{t.gateTitle}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 font-body">{t.gateSubtitle}</p>

                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="flex-1 rounded-xl border-2 border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all font-body text-sm"
                      autoComplete="email"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!isValidEmail}
                      className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                      style={{
                        background: isValidEmail ? 'var(--gradient-sage)' : undefined,
                        color: isValidEmail ? 'white' : undefined,
                        boxShadow: isValidEmail ? 'var(--shadow-sage)' : undefined,
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      {t.submit}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-light mb-3">
                    <Mail className="w-5 h-5 text-sage" />
                  </div>
                  <p className="text-foreground font-semibold font-display">{t.success}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImmersiveVisit;
