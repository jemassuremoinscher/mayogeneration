import { Smartphone, Utensils, Moon, Camera, Bell, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const tr = {
  fr: {
    badge: 'Espace Parent',
    title: 'Votre Espace Parent sur Smartphone',
    desc: 'Suivez l\'éveil de votre enfant en temps réel avec notre application dédiée aux parents de la Riviera. Photos, repas, siestes — tout est à portée de main.',
    features: [
      { icon: Bell, text: 'Notifications en temps réel' },
      { icon: Camera, text: 'Photos & vidéos sécurisées' },
      { icon: Heart, text: 'Journal de bord quotidien' },
    ],
    cta: 'Tester la démo de l\'App',
    hello: 'Bonjour, Marie 👋',
    journal: 'Journal d\'Emma',
    menuTitle: 'Menu Bio du jour',
    menuItems: 'Purée de carottes de Carros\nPoulet fermier & riz complet\nCompote pomme-poire',
    napTitle: 'Dernière sieste',
    napDesc: '14h15 – 15h45 ·',
    napHighlight: '1h30 de sommeil paisible',
    photoTitle: 'Moment de joie',
    photoLabel: '📸 Photo en direct',
  },
  en: {
    badge: 'Parent Space',
    title: 'Your Parent Space on Smartphone',
    desc: 'Follow your child\'s development in real time with our app dedicated to Riviera parents. Photos, meals, naps — everything at your fingertips.',
    features: [
      { icon: Bell, text: 'Real-time notifications' },
      { icon: Camera, text: 'Secure photos & videos' },
      { icon: Heart, text: 'Daily logbook' },
    ],
    cta: 'Try the App Demo',
    hello: 'Hello, Marie 👋',
    journal: 'Emma\'s Journal',
    menuTitle: 'Today\'s Organic Menu',
    menuItems: 'Carrot purée from Carros\nFree-range chicken & brown rice\nApple-pear compote',
    napTitle: 'Last nap',
    napDesc: '2:15 PM – 3:45 PM ·',
    napHighlight: '1h30 of peaceful sleep',
    photoTitle: 'Moment of joy',
    photoLabel: '📸 Live photo',
  },
  ru: {
    badge: 'Родительское пространство',
    title: 'Ваш Родительский Кабинет на Смартфоне',
    desc: 'Следите за развитием вашего ребёнка в реальном времени с нашим приложением для родителей Ривьеры. Фото, питание, сон — всё под рукой.',
    features: [
      { icon: Bell, text: 'Уведомления в реальном времени' },
      { icon: Camera, text: 'Защищённые фото и видео' },
      { icon: Heart, text: 'Ежедневный дневник' },
    ],
    cta: 'Попробовать демо',
    hello: 'Здравствуйте, Мари 👋',
    journal: 'Дневник Эммы',
    menuTitle: 'Био-меню дня',
    menuItems: 'Пюре из моркови из Каррос\nФермерская курица с рисом\nКомпот яблоко-груша',
    napTitle: 'Последний сон',
    napDesc: '14:15 – 15:45 ·',
    napHighlight: '1ч30 спокойного сна',
    photoTitle: 'Момент радости',
    photoLabel: '📸 Фото в прямом эфире',
  },
};

const ParentApp = () => {
  const { language } = useLanguage();
  const t = ((tr as any)[language] ?? (tr as any).en ?? (tr as any).fr);

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="parent-app-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <Smartphone className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 id="parent-app-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.desc}
            </p>
            <ul className="space-y-3 mb-8">
              {t.features.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-foreground">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label={t.cta}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.cta}
            </Button>
          </div>

          {/* Phone mockup */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-[280px] h-[560px]">
              <div className="absolute inset-0 bg-foreground rounded-[3rem] shadow-2xl" />
              <div className="absolute inset-[3px] bg-card rounded-[2.8rem] overflow-hidden flex flex-col">
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-28 h-6 bg-foreground rounded-full" />
                </div>

                <div className="px-5 pt-3 pb-3 bg-primary/5">
                  <p className="text-xs text-muted-foreground">{t.hello}</p>
                  <p className="text-base font-semibold text-foreground">{t.journal}</p>
                </div>

                <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
                  <div className="bg-primary/5 rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Utensils className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">{t.menuTitle}</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                      {t.menuItems}
                    </p>
                  </div>

                  <div className="bg-accent rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Moon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">{t.napTitle}</span>
                    </div>
                    <p className="text-xs text-foreground">{t.napDesc} <span className="text-primary font-medium">{t.napHighlight}</span></p>
                  </div>

                  <div className="bg-muted rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">{t.photoTitle}</span>
                    </div>
                    <div className="w-full h-24 bg-primary/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xs text-primary/60 italic">{t.photoLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-border flex justify-around">
                  {['🏠', '📷', '📋', '💬'].map((emoji) => (
                    <span key={emoji} className="text-lg">{emoji}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentApp;
