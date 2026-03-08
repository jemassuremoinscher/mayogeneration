import { Smartphone, Utensils, Moon, Camera, Bell, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ParentApp = () => {
  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="parent-app-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <Smartphone className="w-4 h-4" />
              Espace Parent
            </span>
            <h2 id="parent-app-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Votre Espace Parent sur Smartphone
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Suivez l'éveil de votre enfant en temps réel avec notre application dédiée aux parents de la Riviera. Photos, repas, siestes — tout est à portée de main.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: Bell, text: 'Notifications en temps réel' },
                { icon: Camera, text: 'Photos & vidéos sécurisées' },
                { icon: Heart, text: 'Journal de bord quotidien' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-foreground">
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Tester la démo de l'application parent Mayo"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Tester la démo de l'App
            </Button>
          </div>

          {/* Phone mockup */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-[280px] h-[560px]">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-foreground rounded-[3rem] shadow-2xl" />
              <div className="absolute inset-[3px] bg-card rounded-[2.8rem] overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-28 h-6 bg-foreground rounded-full" />
                </div>

                {/* App header */}
                <div className="px-5 pt-3 pb-3 bg-primary/5">
                  <p className="text-xs text-muted-foreground">Bonjour, Marie 👋</p>
                  <p className="text-base font-semibold text-foreground">Journal d'Emma</p>
                </div>

                {/* App content cards */}
                <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
                  {/* Menu du jour */}
                  <div className="bg-sage-light rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Utensils className="w-3.5 h-3.5 text-sage" />
                      <span className="text-xs font-semibold text-sage">Menu Bio du jour</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      Purée de carottes de Carros<br />
                      Poulet fermier & riz complet<br />
                      Compote pomme-poire
                    </p>
                  </div>

                  {/* Sieste */}
                  <div className="bg-accent rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Moon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">Dernière sieste</span>
                    </div>
                    <p className="text-xs text-foreground">14h15 – 15h45 · <span className="text-primary font-medium">1h30 de sommeil paisible</span></p>
                  </div>

                  {/* Photo moment */}
                  <div className="bg-muted rounded-2xl p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">Moment de joie</span>
                    </div>
                    <div className="w-full h-24 bg-primary/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xs text-primary/60 italic">📸 Photo en direct</span>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
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
