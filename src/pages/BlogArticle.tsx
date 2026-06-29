import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticle, articles } from '@/data/articles';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const lang = (language === 'it' ? 'fr' : language) as 'fr' | 'en' | 'ru';
  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  const backLabel =
    language === 'fr' ? '← Tous les articles' : language === 'en' ? '← All articles' : '← Все статьи';
  const relatedLabel =
    language === 'fr' ? 'À lire aussi' : language === 'en' ? 'Read also' : 'Читайте также';

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${article.title[lang]} | Mayo`}
        description={article.excerpt[lang]}
        canonical={`https://mayocreche.fr/blog/${article.slug}`}
      />
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-sm text-primary hover:underline">
            {backLabel}
          </Link>
          <time className="block text-xs text-muted-foreground mt-6">
            {new Date(article.date).toLocaleDateString(language)}
          </time>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-8 text-foreground">
            {article.title[lang]}
          </h1>
          <div
            className="prose prose-lg max-w-none text-foreground
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-foreground/90
              [&_a]:text-primary [&_a]:underline [&_a]:font-medium hover:[&_a]:opacity-80
              [&_strong]:text-foreground [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.content[lang] }}
          />

          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-6 text-foreground">{relatedLabel}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="block rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-foreground">{a.title[lang]}</p>
                  <p className="text-sm text-muted-foreground mt-1">{a.excerpt[lang]}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
