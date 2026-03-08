import { useState, useEffect, useCallback } from 'react';
import { X, Star, MapPin } from 'lucide-react';

const messages = [
  { icon: MapPin, text: '3 nouvelles places disponibles à Nice – Médecin' },
  { icon: Star, text: 'Note de 4.9/5 basée sur 120 avis vérifiés' },
  { icon: Star, text: '98% des parents recommandent Mayo' },
];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const show = useCallback(() => {
    if (dismissed) return;
    setVisible(true);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearTimeout(hideTimer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const initialDelay = setTimeout(() => {
      show();
    }, 5000);
    return () => clearTimeout(initialDelay);
  }, [dismissed, show]);

  useEffect(() => {
    if (dismissed || visible) return;
    const interval = setTimeout(() => {
      show();
    }, 8000);
    return () => clearTimeout(interval);
  }, [visible, dismissed, index, show]);

  if (dismissed) return null;

  const msg = messages[index];
  const Icon = msg.icon;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs transition-all duration-500 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-3 pr-9 flex items-start gap-3">
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm text-foreground leading-snug">{msg.text}</p>
        <button
          onClick={() => { setVisible(false); setDismissed(true); }}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Fermer la notification"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SocialProofToast;
