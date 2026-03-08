import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, ChevronDown } from 'lucide-react';
import { locations } from '@/data/locations';

const Header = () => {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const b2bLabel = language === 'fr' ? 'Entreprises' : language === 'en' ? 'Corporate' : 'Бизнесу';

  const navItems = [
    { key: 'nav.about', href: '/#about' },
    { key: 'nav.services', href: '/#services' },
    { key: 'nav.contact', href: '/#contact' },
  ];

  const locLabel = language === 'fr' ? 'Nos Localisations' : language === 'en' ? 'Our Locations' : 'Наши Локации';

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const hash = href.split('#')[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = href;
  };

  const textColor = scrolled ? 'text-foreground' : 'text-primary-foreground';
  const logoColor = scrolled ? 'text-primary' : 'text-primary-foreground';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="Main navigation">
        <Link
          to="/"
          className={`text-xl font-bold transition-colors ${logoColor}`}
          aria-label="Mayo - Accueil"
        >
          Mayo
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className={`text-sm font-medium transition-colors hover:text-primary ${textColor}`}
            >
              {t(item.key)}
            </a>
          ))}

          <Link
            to="/entreprises"
            className={`text-sm font-medium transition-colors hover:text-primary ${textColor}`}
          >
            {b2bLabel}
          </Link>

          {/* Locations dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${textColor}`}
              aria-expanded={locationsOpen}
              aria-haspopup="true"
            >
              {locLabel}
              <ChevronDown className={`w-4 h-4 transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
            </button>
            {locationsOpen && (
              <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-xl shadow-lg py-2 min-w-[220px] animate-fade-in">
                {locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/${loc.slug}`}
                    onClick={() => setLocationsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors"
                  >
                    {loc.translations[language].h1.split(' – ')[0].replace('Crèche et Garde d\'enfants à ', '').replace('Nursery & Childcare in ', '').replace('Детский сад и присмотр за детьми в ', '')}
                    {loc.neighborhood && ` – ${loc.neighborhood}`}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <LanguageSwitcher variant={scrolled ? 'default' : 'hero'} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className="block text-foreground font-medium py-2"
            >
              {t(item.key)}
            </a>
          ))}

          {/* Mobile locations accordion */}
          <button
            onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
            className="flex items-center justify-between w-full text-foreground font-medium py-2"
          >
            {locLabel}
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileLocationsOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileLocationsOpen && (
            <div className="pl-4 space-y-1">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/${loc.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-muted-foreground py-1.5 text-sm hover:text-primary transition-colors"
                >
                  {loc.city}{loc.neighborhood ? ` – ${loc.neighborhood}` : ''}
                </Link>
              ))}
            </div>
          )}

          <LanguageSwitcher variant="default" />
        </div>
      )}
    </header>
  );
};

export default Header;
