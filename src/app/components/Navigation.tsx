import { useState } from 'react';
import { useLanguage } from '@/app/components/LanguageContext';
import { Languages, Menu, X } from 'lucide-react';

import logo from '@/assets/abbshirLogo.png';

interface NavigationProps {
  onContactClick: () => void;
}

export function Navigation({ onContactClick }: NavigationProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src={logo} alt="Abbshir Logo" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-emerald-700">
              {language === 'ar' ? 'أبشر للأعلاف' : 'Abbshir'}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-emerald-700 transition"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-emerald-700 transition"
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-emerald-700 transition"
            >
              {t('nav.contact')}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Request Quote Button */}
            <button
              onClick={onContactClick}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-md"
            >
              {t('nav.requestQuote')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded"
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded"
            >
              {t('nav.contact')}
            </button>
            <div className="flex gap-2 px-4">
              <button
                onClick={toggleLanguage}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'AR' : 'EN'}</span>
              </button>
              <button
                onClick={onContactClick}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg"
              >
                {t('nav.requestQuote')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
