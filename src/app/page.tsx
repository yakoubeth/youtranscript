import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TranscriptTool from '@/components/TranscriptTool';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <TranscriptTool />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
