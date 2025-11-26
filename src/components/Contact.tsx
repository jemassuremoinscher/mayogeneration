import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: 'Nice, France',
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+33 X XX XX XX XX',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'contact@mayo-nice.fr',
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: '',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-secondary/30 to-primary/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('contact.title')}
        </h2>

        <Card className="border-2 border-primary/20 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{item.label}</p>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
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
