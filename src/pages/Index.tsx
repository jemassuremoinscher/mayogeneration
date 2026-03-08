import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
};

export default Index;
