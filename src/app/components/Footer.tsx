import { useLanguage } from '@/app/components/LanguageContext';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import productsData from '@/app/data/products.json';

export function Footer() {
  const { language, t } = useLanguage();

  const handleProductClick = (id: number) => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Dispatch open event
      setTimeout(() => {
        const event = new CustomEvent('open-product', { detail: { id } });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  return (
    <footer id="contact" role="contentinfo" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'ar' ? 'أبشر للأعلاف' : 'Abbshir Fodders'}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              {language === 'ar'
                ? 'شريكك الموثوق في توفير أجود أنواع الأعلاف في الإمارات العربية المتحدة.'
                : 'Your trusted partner for premium-grade fodder in the UAE.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.aboutUs')}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-500 transition"
                  aria-label="Navigate to our story section"
                >
                  {t('footer.ourStory')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-500 transition"
                  aria-label="Navigate to products section"
                >
                  {t('footer.products')}
                </button>
              </li>
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Product links">
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2 text-sm">
              {productsData.slice(0, 4).map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="hover:text-emerald-500 transition cursor-pointer"
                >
                  {product.name[language as 'en' | 'ar']}
                </li>
              ))}
              <li
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-emerald-500 transition cursor-pointer font-semibold text-emerald-400"
              >
                {language === 'ar' ? 'المزيد...' : 'More...'}
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <address aria-label="Contact information">
            <h3 className="text-lg font-bold text-white mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 not-italic">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{t('footer.phone')}</p>
                  <div className="flex flex-col">
                    <a href="tel:+971505018802" className="text-sm hover:text-emerald-500 w-fit" dir="ltr" aria-label="Call Abbshir on +971 50 501 8802">+971 50 501 8802</a>
                    <a href="tel:+971506785893" className="text-sm hover:text-emerald-500 w-fit" dir="ltr" aria-label="Call Abbshir on +971 50 678 5893">+971 50 678 5893</a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{t('footer.email')}</p>
                  <a href="mailto:info@abbshir.com" className="text-sm hover:text-emerald-500" aria-label="Email Abbshir at info@abbshir.com">info@abbshir.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{t('footer.location')}</p>
                  <p className="text-sm">{t('footer.abuDhabi')}</p>
                  <p className="text-sm">{t('footer.dubai')}</p>
                </div>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
