import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
    </LanguageProvider>
  );
};

export default Index;
