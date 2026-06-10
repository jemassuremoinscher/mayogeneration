import { Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Blog = () => {
  const { language } = useLanguage();

  const heading =
    language === 'fr' ? 'Le blog Mayo' : language === 'en' ? 'The Mayo blog' : 'Блог Mayo';
  const sub =
    language === 'fr'
      ? "Conseils, gestion et bonnes pratiques pour les crèches de la Côte d'Azur."
      : language === 'en'
      ? 'Tips, management and best practices for French Riviera nurseries.'
      : 'Советы и лучшие практики для яслей Лазурного Берега.';
  const readMore =
    language === 'fr' ? 'Lire l\'article' : language === 'en' ? 'Read more' : 'Читать';

  return (
    <>
      <SEOHead
        title={`${heading} | Mayo`}
        description={sub}
        canonical="https://mayocreche.fr/blog"
      />
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{heading}</h1>
            <p className="text-lg text-muted-foreground">{sub}</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <time className="text-xs text-muted-foreground">
                  {new Date(a.date).toLocaleDateString(language)}
                </time>
                <h2 className="text-xl font-bold mt-2 mb-3 text-foreground">
                  {a.title[language]}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{a.excerpt[language]}</p>
                <Link
                  to={`/blog/${a.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {readMore} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
