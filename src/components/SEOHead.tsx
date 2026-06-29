import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
}

const HREFLANGS: { code: string; lang: string }[] = [
  { code: 'fr', lang: 'fr' },
  { code: 'en', lang: 'en' },
  { code: 'ru', lang: 'ru' },
  { code: 'it', lang: 'it' },
];

const SEOHead = ({ title, description, canonical, jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Locale alternates (FR + EN + RU + IT)
    document.querySelectorAll('meta[property="og:locale:alternate"][data-dyn]').forEach((n) => n.remove());
    [['en_GB'], ['en_US'], ['ru_RU'], ['it_IT']].forEach(([loc]) => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:locale:alternate');
      m.setAttribute('content', loc);
      m.setAttribute('data-dyn', '1');
      document.head.appendChild(m);
    });

    if (canonical) {
      setMeta('property', 'og:url', canonical);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;

      // hreflang tags (fr/en/ru/it) — cohérent avec sitemap
      document.querySelectorAll('link[rel="alternate"][data-dyn-hreflang]').forEach((n) => n.remove());
      HREFLANGS.forEach(({ code, lang }) => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'alternate');
        l.setAttribute('hreflang', code);
        const url = new URL(canonical);
        url.searchParams.set('lang', lang);
        l.setAttribute('href', url.toString());
        l.setAttribute('data-dyn-hreflang', '1');
        document.head.appendChild(l);
      });
    }

    // JSON-LD
    const existingScript = document.getElementById('dynamic-jsonld');
    if (jsonLd) {
      if (existingScript) {
        existingScript.textContent = JSON.stringify(jsonLd);
      } else {
        const script = document.createElement('script');
        script.id = 'dynamic-jsonld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
      }
    }

    return () => {
      const s = document.getElementById('dynamic-jsonld');
      if (s) s.remove();
    };
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default SEOHead;
