import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BadgePercent,
  Heart,
  Building2,
  Users,
  TrendingUp,
  CheckCircle2,
  Send,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import b2bHero from '@/assets/b2b-hero.jpg';

const baseUrl = 'https://mayocreche.fr';

const content = {
  fr: {
    metaTitle: 'Solutions Entreprises | Mayo – Crèche Inter-entreprises Côte d\'Azur',
    metaDescription: 'Mayo accompagne les entreprises de la Côte d\'Azur : crèche inter-entreprises, crédit d\'impôt famille, bien-être des salariés. Contactez notre équipe B2B.',
    back: 'Retour à l\'accueil',
    h1: 'Solutions Entreprises',
    subtitle: 'Offrez à vos collaborateurs la sérénité d\'une garde d\'enfants premium sur la Côte d\'Azur',
    introTitle: 'Pourquoi choisir Mayo pour votre entreprise ?',
    intro: 'La parentalité est un enjeu majeur de qualité de vie au travail. En réservant des places en crèche pour vos salariés, vous réduisez l\'absentéisme, renforcez l\'attractivité de votre marque employeur et bénéficiez d\'avantages fiscaux significatifs. Mayo accompagne les entreprises de toutes tailles sur la Côte d\'Azur.',
    benefits: [
      {
        icon: 'tax',
        title: 'Crédit d\'impôt famille',
        desc: 'Bénéficiez d\'un crédit d\'impôt de 50 % des dépenses engagées pour la réservation de berceaux, plafonné à 500 000 € par an. Un avantage fiscal direct et immédiat.',
      },
      {
        icon: 'wellbeing',
        title: 'Bien-être & fidélisation',
        desc: 'Les salariés-parents sont plus sereins et engagés. Réduisez le turnover et l\'absentéisme tout en renforçant votre attractivité employeur.',
      },
      {
        icon: 'flexibility',
        title: 'Solutions sur-mesure',
        desc: 'De 1 à 50 berceaux, nous adaptons notre offre à la taille de votre entreprise. Réservation annuelle ou ponctuelle, horaires flexibles.',
      },
      {
        icon: 'multilingual',
        title: 'Environnement international',
        desc: 'Accueil trilingue FR/EN/RU, idéal pour les équipes multiculturelles de la Côte d\'Azur et de Sophia Antipolis.',
      },
    ],
    statsTitle: 'L\'impact concret pour votre entreprise',
    stats: [
      { value: '50 %', label: 'de crédit d\'impôt' },
      { value: '-30 %', label: 'd\'absentéisme' },
      { value: '97 %', label: 'de satisfaction parents' },
      { value: '4', label: 'sites sur la Côte d\'Azur' },
    ],
    formTitle: 'Demandez un devis personnalisé',
    formSubtitle: 'Notre équipe B2B vous recontacte sous 24h',
    formFields: {
      company: 'Nom de l\'entreprise',
      name: 'Votre nom & prénom',
      role: 'Fonction (DRH, Office Manager...)',
      email: 'Email professionnel',
      phone: 'Téléphone',
      employees: 'Nombre de salariés',
      message: 'Votre besoin (nombre de berceaux, localisation...)',
      submit: 'Envoyer ma demande',
      success: 'Merci ! Notre équipe vous recontactera sous 24h.',
    },
    formErrors: {
      company: 'Nom de l\'entreprise requis',
      name: 'Nom requis',
      email: 'Email professionnel valide requis',
      message: 'Merci de décrire votre besoin',
    },
  },
  en: {
    metaTitle: 'Corporate Solutions | Mayo – Inter-company Nursery French Riviera',
    metaDescription: 'Mayo supports French Riviera businesses: inter-company nursery, family tax credit, employee wellbeing. Contact our B2B team.',
    back: 'Back to home',
    h1: 'Corporate Solutions',
    subtitle: 'Give your employees the peace of mind of premium childcare on the French Riviera',
    introTitle: 'Why choose Mayo for your company?',
    intro: 'Parenthood is a key factor in workplace quality of life. By reserving nursery places for your employees, you reduce absenteeism, strengthen your employer brand, and benefit from significant tax advantages. Mayo supports businesses of all sizes on the French Riviera.',
    benefits: [
      {
        icon: 'tax',
        title: 'Family tax credit',
        desc: 'Benefit from a 50% tax credit on nursery reservation expenses, capped at €500,000 per year. A direct and immediate fiscal advantage.',
      },
      {
        icon: 'wellbeing',
        title: 'Wellbeing & retention',
        desc: 'Parent-employees are calmer and more engaged. Reduce turnover and absenteeism while strengthening your employer attractiveness.',
      },
      {
        icon: 'flexibility',
        title: 'Tailored solutions',
        desc: 'From 1 to 50 cradles, we adapt our offer to your company size. Annual or occasional booking, flexible hours.',
      },
      {
        icon: 'multilingual',
        title: 'International environment',
        desc: 'Trilingual FR/EN/RU care, ideal for multicultural teams on the French Riviera and Sophia Antipolis.',
      },
    ],
    statsTitle: 'Concrete impact for your business',
    stats: [
      { value: '50%', label: 'tax credit' },
      { value: '-30%', label: 'absenteeism' },
      { value: '97%', label: 'parent satisfaction' },
      { value: '4', label: 'French Riviera sites' },
    ],
    formTitle: 'Request a custom quote',
    formSubtitle: 'Our B2B team will contact you within 24h',
    formFields: {
      company: 'Company name',
      name: 'Your full name',
      role: 'Position (HR Director, Office Manager...)',
      email: 'Professional email',
      phone: 'Phone number',
      employees: 'Number of employees',
      message: 'Your needs (number of cradles, location...)',
      submit: 'Send my request',
      success: 'Thank you! Our team will contact you within 24h.',
    },
    formErrors: {
      company: 'Company name is required',
      name: 'Name is required',
      email: 'Valid professional email required',
      message: 'Please describe your needs',
    },
  },
  ru: {
    metaTitle: 'Корпоративные решения | Mayo – Межкорпоративный детский сад Лазурный Берег',
    metaDescription: 'Mayo для бизнеса на Лазурном Берегу: межкорпоративный детский сад, налоговые льготы, благополучие сотрудников.',
    back: 'На главную',
    h1: 'Корпоративные решения',
    subtitle: 'Подарите вашим сотрудникам спокойствие благодаря премиальному уходу за детьми на Лазурном Берегу',
    introTitle: 'Почему Mayo для вашей компании?',
    intro: 'Родительство — ключевой фактор качества жизни на работе. Бронируя места в детском саду для сотрудников, вы снижаете абсентеизм, укрепляете бренд работодателя и получаете значительные налоговые преимущества. Mayo сопровождает компании любого размера на Лазурном Берегу.',
    benefits: [
      {
        icon: 'tax',
        title: 'Семейный налоговый кредит',
        desc: 'Налоговый кредит 50% от расходов на бронирование мест, до 500 000 € в год. Прямое и немедленное фискальное преимущество.',
      },
      {
        icon: 'wellbeing',
        title: 'Благополучие и удержание',
        desc: 'Сотрудники-родители спокойнее и вовлечённее. Снижайте текучесть и абсентеизм, укрепляя привлекательность работодателя.',
      },
      {
        icon: 'flexibility',
        title: 'Индивидуальные решения',
        desc: 'От 1 до 50 мест — мы адаптируем предложение под размер вашей компании. Годовое или разовое бронирование.',
      },
      {
        icon: 'multilingual',
        title: 'Международная среда',
        desc: 'Трёхъязычный уход FR/EN/RU, идеально для мультикультурных команд Лазурного Берега и Софии Антиполис.',
      },
    ],
    statsTitle: 'Конкретный эффект для вашего бизнеса',
    stats: [
      { value: '50%', label: 'налоговый кредит' },
      { value: '-30%', label: 'абсентеизм' },
      { value: '97%', label: 'удовлетворённость' },
      { value: '4', label: 'площадки на Лазурном Берегу' },
    ],
    formTitle: 'Запросите индивидуальное предложение',
    formSubtitle: 'Наша команда B2B свяжется с вами в течение 24 часов',
    formFields: {
      company: 'Название компании',
      name: 'Ваше ФИО',
      role: 'Должность (HR-директор, офис-менеджер...)',
      email: 'Рабочий email',
      phone: 'Телефон',
      employees: 'Количество сотрудников',
      message: 'Ваши потребности (количество мест, локация...)',
      submit: 'Отправить запрос',
      success: 'Спасибо! Наша команда свяжется с вами в течение 24 часов.',
    },
    formErrors: {
      company: 'Укажите название компании',
      name: 'Укажите имя',
      email: 'Укажите корректный email',
      message: 'Опишите ваши потребности',
    },
  },
};

const iconMap: Record<string, React.ReactNode> = {
  tax: <BadgePercent className="w-7 h-7 text-primary" />,
  wellbeing: <Heart className="w-7 h-7 text-primary" />,
  flexibility: <Building2 className="w-7 h-7 text-primary" />,
  multilingual: <Users className="w-7 h-7 text-primary" />,
};

const B2BPage = () => {
  const { language } = useLanguage();
  const c = ((content as any)[language] ?? (content as any).en ?? (content as any).fr);
  const revealIntro = useScrollReveal();
  const revealBenefits = useScrollReveal();
  const revealStats = useScrollReveal();
  const revealForm = useScrollReveal();
  const { toast } = useToast();

  const [form, setForm] = useState({
    company: '',
    name: '',
    role: '',
    email: '',
    phone: '',
    employees: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const schema = z.object({
    company: z.string().trim().min(1, c.formErrors.company).max(200),
    name: z.string().trim().min(1, c.formErrors.name).max(200),
    role: z.string().max(200).optional(),
    email: z.string().trim().email(c.formErrors.email).max(255),
    phone: z.string().max(30).optional(),
    employees: z.string().max(20).optional(),
    message: z.string().trim().min(1, c.formErrors.message).max(2000),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({ title: '✅', description: c.formFields.success });
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mayo Solutions Entreprises',
    description: c.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mayo',
      url: baseUrl,
    },
    areaServed: { '@type': 'Place', name: 'Côte d\'Azur, France' },
    serviceType: 'Corporate Childcare',
  };

  return (
    <>
      <SEOHead
        title={c.metaTitle}
        description={c.metaDescription}
        canonical={`${baseUrl}/entreprises`}
        jsonLd={jsonLd}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[50vh] flex items-center overflow-hidden">
          <img
            src={b2bHero}
            alt={c.h1}
            className="absolute inset-0 w-full h-full object-cover !rounded-none"
            loading="eager"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" aria-hidden="true" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 sm:py-36">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {c.back}
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              {c.h1}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }}>
          <div ref={revealIntro.ref} style={revealIntro.style} className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {c.introTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {c.intro}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-24 px-4 bg-background">
          <div ref={revealBenefits.ref} style={revealBenefits.style} className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {c.benefits.map((b, i) => (
                <Card
                  key={i}
                  className="border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
                      {iconMap[b.icon]}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 sm:py-20 px-4 bg-primary/5">
          <div ref={revealStats.ref} style={revealStats.style} className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
              {c.statsTitle}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {c.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-primary mr-2" aria-hidden="true" />
                    <span className="text-3xl sm:text-4xl font-bold text-primary">{s.value}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-24 px-4" style={{ background: 'var(--gradient-soft)' }} id="b2b-contact">
          <div ref={revealForm.ref} style={revealForm.style} className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {c.formTitle}
              </h2>
              <p className="text-muted-foreground">{c.formSubtitle}</p>
            </div>

            {submitted ? (
              <Card className="border border-primary/30" style={{ boxShadow: 'var(--shadow-premium)' }}>
                <CardContent className="p-8 sm:p-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">{c.formFields.success}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-border/60 bg-card/80" style={{ boxShadow: 'var(--shadow-premium)' }}>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label={c.formFields.company}
                        value={form.company}
                        onChange={(v) => update('company', v)}
                        error={errors.company}
                        required
                      />
                      <FormField
                        label={c.formFields.name}
                        value={form.name}
                        onChange={(v) => update('name', v)}
                        error={errors.name}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label={c.formFields.role}
                        value={form.role}
                        onChange={(v) => update('role', v)}
                      />
                      <FormField
                        label={c.formFields.email}
                        value={form.email}
                        onChange={(v) => update('email', v)}
                        error={errors.email}
                        type="email"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label={c.formFields.phone}
                        value={form.phone}
                        onChange={(v) => update('phone', v)}
                        type="tel"
                      />
                      <FormField
                        label={c.formFields.employees}
                        value={form.employees}
                        onChange={(v) => update('employees', v)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {c.formFields.message} <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={4}
                        maxLength={2000}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-xl gap-2">
                      <Send className="w-4 h-4" />
                      {c.formFields.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const FormField = ({
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={255}
      className={error ? 'border-destructive' : ''}
    />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

export default B2BPage;
