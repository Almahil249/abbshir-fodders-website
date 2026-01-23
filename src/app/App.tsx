import { useState } from 'react';
import { LanguageProvider } from '@/app/components/LanguageContext';
import { Navigation } from '@/app/components/Navigation';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutSection } from '@/app/components/AboutSection';
import { ProductsSection } from '@/app/components/ProductsSection';
import { Footer } from '@/app/components/Footer';
import { ContactModal } from '@/app/components/ContactModal';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navigation onContactClick={() => setIsContactModalOpen(true)} />
        <main>
          <HeroSection />
          <AboutSection />
          <ProductsSection />
        </main>
        <Footer />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}