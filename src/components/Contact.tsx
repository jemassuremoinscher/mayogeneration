import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const formTr = {
  fr: { title: 'Écrivez-nous', name: 'Votre nom', email: 'Votre email', message: 'Votre message', send: 'Envoyer', sent: 'Message reçu, merci ! Nous revenons vers vous sous 48 h.', error: 'Une erreur est survenue. Réessayez ou écrivez-nous directement.' },
  en: { title: 'Write to us', name: 'Your name', email: 'Your email', message: 'Your message', send: 'Send', sent: 'Message received, thank you! We\'ll get back to you within 48h.', error: 'Something went wrong. Please retry or email us directly.' },
  ru: { title: 'Напишите нам', name: 'Ваше имя', email: 'Ваш email', message: 'Сообщение', send: 'Отправить', sent: 'Сообщение получено, спасибо! Мы свяжемся в течение 48 ч.', error: 'Произошла ошибка. Попробуйте снова или напишите напрямую.' },
  it: { title: 'Scrivici', name: 'Il tuo nome', email: 'La tua email', message: 'Il tuo messaggio', send: 'Invia', sent: 'Messaggio ricevuto, grazie! Ti ricontatteremo entro 48 ore.', error: 'Si è verificato un errore. Riprova o scrivici direttamente.' },
};

const Contact = () => {
  const { t, language } = useLanguage();
  const reveal = useScrollReveal();
  const tr = formTr[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = validEmail && message.trim().length >= 5 && state !== 'sending';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState('sending');
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'contact', parent_name: name, email, message, locale: language }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok && body?.ok === true && body?.persisted === true) {
        setState('sent');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t('contact.address'), value: 'Nice, France', href: undefined },
    { icon: Phone, label: t('contact.phone'), value: '+33 X XX XX XX XX', href: 'tel:+33XXXXXXXXX' },
    { icon: Mail, label: t('contact.email'), value: 'contact@mayo-nice.fr', href: 'mailto:contact@mayo-nice.fr' },
    { icon: Clock, label: t('contact.hours'), value: '', href: undefined },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} aria-labelledby="contact-title">
      <div ref={reveal.ref} style={reveal.style} className="max-w-4xl mx-auto">
        <h2 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          {t('contact.title')}
        </h2>

        <Card className="border border-border/60 bg-card/80 backdrop-blur-sm" style={{ boxShadow: 'var(--shadow-premium)' }}>
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1 text-sm sm:text-base">{item.label}</p>
                        {item.value && <p className="text-muted-foreground text-sm sm:text-base">{item.value}</p>}
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={index} href={item.href} className="hover:opacity-80 transition-opacity">{content}</a>
                  ) : (<div key={index}>{content}</div>);
                })}
              </div>

              <form onSubmit={submit} className="space-y-3" aria-label={tr.title}>
                <h3 className="font-semibold text-foreground">{tr.title}</h3>
                {state === 'sent' ? (
                  <div className="bg-primary/10 text-primary rounded-xl p-4 flex items-start gap-2">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{tr.sent}</p>
                  </div>
                ) : (
                  <>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr.name} autoComplete="name"
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr.email} autoComplete="email"
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={tr.message} maxLength={2000}
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    {state === 'error' && <p className="text-xs text-destructive">{tr.error}</p>}
                    <button type="submit" disabled={!canSubmit}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: canSubmit ? 'var(--gradient-primary)' : undefined, color: canSubmit ? 'white' : undefined, boxShadow: canSubmit ? 'var(--shadow-sage)' : undefined }}>
                      <Send className="w-4 h-4" /> {state === 'sending' ? '…' : tr.send}
                    </button>
                  </>
                )}
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
