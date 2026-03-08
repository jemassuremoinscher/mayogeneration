import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import DailyTimeline from '@/components/DailyTimeline';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <DailyTimeline />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default Index;
