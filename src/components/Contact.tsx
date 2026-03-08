import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Contact = () => {
  const { t } = useLanguage();
  const reveal = useScrollReveal();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1 text-sm sm:text-base">{item.label}</p>
                      {item.value && <p className="text-muted-foreground text-sm sm:text-base">{item.value}</p>}
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={index} href={item.href} className="hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
