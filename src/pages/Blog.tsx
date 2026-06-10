import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import blogHero from '@/assets/hero-nursery.jpg';

const Blog = () => {
  const { language } = useLanguage();
  const revealArticles = useScrollReveal();

  const heading =
    language === 'fr' ? 'Le blog Mayo' : language === 'en' ? 'The Mayo blog' : 'Блог Mayo';
  const sub =
    language === 'fr'
      ? "Conseils, gestion et bonnes pratiques pour les crèches de la Côte d'Azur."
      : language === 'en'
      ? 'Tips, management and best practices for French Riviera nurseries.'
      : 'Советы и лучшие практики для яслей Лазурного Берега.';
  const back =
    language === 'fr' ? 'Retour à l\'accueil' : language === 'en' ? 'Back to home' : 'На главную';
  const readMore =
    language === 'fr' ? 'Lire l\'article' : language === 'en' ? 'Read more' : 'Читать';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: heading,
    description: sub,
    url: 'https://mayocreche.fr/blog',
  };

  return (
    <>
      <SEOHead
        title={`${heading} | Mayo`}
        description={sub}
        canonical="https://mayocreche.fr/blog"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[50vh] sm:min-h-[45vh] flex items-center overflow-hidden">
          <img
            src={blogHero}
            alt={heading}
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
              {back}
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              {heading}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
              {sub}
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 sm:py-24 px-4 bg-background">
          <div ref={revealArticles.ref} style={revealArticles.style} className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((a) => (
                <Card
                  key={a.slug}
                  className="border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <time className="text-xs text-muted-foreground mb-2">
                      {new Date(a.date).toLocaleDateString(language)}
                    </time>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {a.title[language]}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                      {a.excerpt[language]}
                    </p>
                    <Link
                      to={`/blog/${a.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {readMore} →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
