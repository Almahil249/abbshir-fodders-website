import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/app/components/LanguageContext';
import { Navigation } from '@/app/components/Navigation';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutSection } from '@/app/components/AboutSection';
import { ProductsSection } from '@/app/components/ProductsSection';
import { Footer } from '@/app/components/Footer';
import { ContactModal } from '@/app/components/ContactModal';
import { ErrorPage } from '@/app/components/ErrorPage';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';

function LandingPage({ onContactClick }: { onContactClick: () => void }) {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="min-h-screen bg-white">
            <Navigation onContactClick={() => setIsContactModalOpen(true)} />

            <Routes>
              <Route path="/" element={<LandingPage onContactClick={() => setIsContactModalOpen(true)} />} />
              <Route path="/ar" element={<LandingPage onContactClick={() => setIsContactModalOpen(true)} />} />
              <Route path="/en" element={<LandingPage onContactClick={() => setIsContactModalOpen(true)} />} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<ErrorPage code="404" />} />
            </Routes>

            <ContactModal
              isOpen={isContactModalOpen}
              onClose={() => setIsContactModalOpen(false)}
            />
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </LanguageProvider>
  );
}