import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Meta
  'meta.title': { en: 'Abbshir - Premium Fodder UAE', ar: 'أبشر - أعلاف فاخرة في الإمارات' },

  // Navigation
  'nav.about': { en: 'About Us', ar: 'من نحن' },
  'nav.products': { en: 'Products', ar: 'المنتجات' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.requestQuote': { en: 'Request Quote', ar: 'طلب عرض سعر' },

  // Hero
  'hero.headline': {
    en: "Premium Fodder for the UAE's Champions & Livestock",
    ar: 'أجود أنواع الأعلاف لأبطال ومواشي الإمارات'
  },
  'hero.subheadline': {
    en: 'Supplying high-protein Alfalfa, Rhodes, and specialized grains for Camels, Horses, and Livestock across the Emirates.',
    ar: 'نوفر البرسيم عالي البروتين، الرودس، والحبوب المتخصصة للإبل والخيول والماشية في جميع أنحاء الإمارات.'
  },

  // About
  'about.title': {
    en: 'Fueling Performance. Nurturing Heritage.',
    ar: 'أبشر للأعلاف: جودة تغذي الطموح'
  },
  'about.description': {
    en: "At Abbshir, we understand that nutrition is the foundation of every champion—whether it's a racing camel on the track or livestock in the dairy farm. Based in the UAE, we specialize in the sourcing and trading of premium-grade fodder, ensuring a consistent supply chain for breeders and farmers who refuse to compromise on quality.",
    ar: 'في شركة "أبشر"، نؤمن بأن التغذية السليمة هي حجر الزاوية لصحة الثروة الحيوانية في الإمارات. نحن أكثر من مجرد موردين؛ نحن شركاؤكم في النجاح، نوفر أجود أنواع الأعلاف التي تليق بالأصايل من الهجن والخيول، وتدعم إنتاجية المواشي.'
  },
  'about.quality': {
    en: "We don't just sell feed; we provide nutritional security. Our selection—from protein-rich Alfalfa to high-fiber Rhodes—is rigorously inspected to ensure it is free from dust, mold, and impurities, maximizing digestion and health for your animals.",
    ar: 'نلتزم بتقديم خيارات متنوعة من البرسيم (الجت)، والرودس، والشعير، تم اختيارها بعناية فائقة لضمان خلوها من الشوائب والحفاظ على قيمتها الغذائية. هدفنا هو ضمان صحة قطعانكم، وزيادة الإنتاج، ورفع معدلات التحويل الغذائي بأعلى معايير الجودة.'
  },

  // Trust Badges
  'badge.organic': { en: '100% Organic', ar: '100% عضوي' },
  'badge.labTested': { en: 'Lab Tested', ar: 'مختبر ومضمون' },
  'badge.fastDelivery': { en: 'Fast Delivery', ar: 'توصيل سريع' },

  // Key Values
  'value.sourcing.title': { en: 'Premium Sourcing', ar: 'جودة لا تضاهى' },
  'value.sourcing.desc': { en: "Directly imported from the world's best harvest regions.", ar: 'مستورد مباشرة من أفضل المصادر العالمية لضمان الجودة.' },
  'value.integrity.title': { en: 'Nutritional Integrity', ar: 'تنوع غذائي شامل' },
  'value.integrity.desc': { en: 'Lab-verified protein and fiber content for optimal weight gain and milk production.', ar: 'حلول متكاملة للتسمين، إدرار الحليب، وسباقات الهجن والخيول.' },
  'value.availability.title': { en: 'Year-Round Availability', ar: 'إمداد مستمر' },
  'value.availability.desc': { en: 'Consistent stock for Camels, Horses, Cows, and Sheep, unaffected by seasonal shifts.', ar: 'مخزون استراتيجي يضمن توفر المنتج لكم على مدار العام.' },

  // Products
  'products.title': { en: 'Our Premium Products', ar: 'منتجاتنا المميزة' },
  'products.bestFor': { en: 'Best For', ar: 'مثالي لـ' },

  // Contact
  'contact.title': { en: 'Request a Quote', ar: 'طلب عرض سعر' },
  'contact.name': { en: 'Your Name', ar: 'الاسم' },
  'contact.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'contact.product': { en: 'Product Interest', ar: 'المنتج المطلوب' },
  'contact.message': { en: 'Message', ar: 'الرسالة' },
  'contact.send': { en: 'Send Message', ar: 'إرسال' },
  'contact.whatsapp': { en: 'Contact via WhatsApp', ar: 'تواصل عبر واتساب' },

  // Footer
  'footer.aboutUs': { en: 'About Us', ar: 'من نحن' },
  'footer.ourStory': { en: 'Our Story', ar: 'قصتنا' },
  'footer.products': { en: 'Products', ar: 'المنتجات' },
  'footer.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'footer.phone': { en: 'Phone', ar: 'الهاتف' },
  'footer.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'footer.location': { en: 'Location', ar: 'الموقع' },
  'footer.abuDhabi': { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات' },
  'footer.dubai': { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
  'footer.copyright': { en: '© 2026 Abbshir. All rights reserved.', ar: '© 2026 أبشر للأعلاف. جميع الحقوق محفوظة.' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  // Update document title and dir attribute when language changes
  React.useEffect(() => {
    document.title = translations['meta.title'][language];
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
