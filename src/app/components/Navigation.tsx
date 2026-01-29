import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/components/LanguageContext';
import { Languages, Menu, X, ChevronDown } from 'lucide-react';
import productsData from '@/app/data/products.json';

import logo from '@/assets/abbshirLogo.png';

interface NavigationProps {
  onContactClick: () => void;
}

export function Navigation({ onContactClick }: NavigationProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false); // For mobile accordion

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const handleProductClick = (id: number) => {
    scrollToSection('products');
    // Dispatch event for ProductsSection to catch
    setTimeout(() => {
      const event = new CustomEvent('open-product', { detail: { id } });
      window.dispatchEvent(event);
    }, 500); // Slight delay to allow scroll to start/complete for smoother transition
    setMobileMenuOpen(false);
  };


  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src={logo} alt="Abbshir Logo" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-emerald-700">
              {language === 'ar' ? 'أبشر للأعلاف' : 'Abbshir Fodders'}
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

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                onClick={() => scrollToSection('products')}
                className="flex items-center gap-1 text-gray-700 group-hover:text-emerald-700 transition py-2"
              >
                {t('nav.products')}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[240px] z-50">
                {/* "Safe triangle" buffer is implicitly handled by the top-full and pt-2 padding if we wrap content in a container that includes the gap, or just valid padding within the child */}
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                  {/* Triangle/Arrow */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>

                  {productsData.slice(0, 6).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="block w-full text-start px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {product.name[language as 'en' | 'ar']}
                    </button>
                  ))}

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => scrollToSection('products')}
                      className="block w-full text-start px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50"
                    >
                      {language === 'ar' ? 'عرض كل المنتجات' : 'View All Products'} →
                    </button>
                  </div>
                </div>
              </div>
            </div>

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

            {/* Mobile Products Accordion */}
            <div>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded"
              >
                {t('nav.products')}
                <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsOpen && (
                <div className={`pl-4 ${language === 'ar' ? 'pr-4 border-r-2' : 'pl-8 border-l-2'} border-gray-100 space-y-1`}>
                  {productsData.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="block w-full text-start py-2 text-sm text-gray-600 hover:text-emerald-600"
                    >
                      {product.name[language as 'en' | 'ar']}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
