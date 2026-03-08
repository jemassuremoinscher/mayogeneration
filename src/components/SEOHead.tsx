import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
}

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
    if (canonical) {
      setMeta('property', 'og:url', canonical);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
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
