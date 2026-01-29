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
    en: "Looking for the Best Feed for Your Livestock? With Abbshir, Consider it Done!",
    ar: 'تبحث عن أفضل علف لحلالك؟ "أبشر" بالسعد والجودة!'
  },
  'hero.subheadline': {
    en: 'We provide premium high-protein Alfalfa, Rhodes grass, and specialized grains tailored for the UAE’s finest camels, horses, and livestock. Quality you can trust, delivered straight to you.',
    ar: 'نوفر لك أجود أنواع البرسيم عالي البروتين، والرودس، والحبوب المتخصصة التي تليق بأصايل الإمارات من الهجن والخيول والمواشي. جودة نضمنها، وتوصيل يوصلك وين ما كنت.'
  },

  // About
  'about.title': {
    en: 'Abbshir Feeds: Your Partner in the Field, Your Partner in Success',
    ar: 'أبشر للأعلاف: رفيقك في المراح، وشريكك في النجاح'
  },
  'about.description': {
    en: "At Abbshir, we don’t just supply feed; we stand by every livestock owner who aims for the top. We understand that your animals are your pride and joy. That’s why we dedicate our expertise to selecting nutrition that boosts their health and makes you proud.",
    ar: 'في "أبشر"، ما نعتبر أنفسنا مجرد موردين، نحن شركاء لكل صاحب حلال يطمح للأفضل. نعلم أن ثروتك الحيوانية هي أغلى ما تملك، لذلك نضع بين يديك خلاصة خبرتنا في اختيار التغذية التي ترفع الرأس وتجمل المراح.'
  },
  'about.quality': {
    en: "",
    ar: ""
  },

  // Trust Badges
  'badge.organic': { en: '100% Organic', ar: '100% عضوي' },
  'badge.labTested': { en: 'Lab Tested', ar: 'مختبر ومضمون' },
  'badge.fastDelivery': { en: 'Fast Delivery', ar: 'توصيل سريع' },

  // Key Values
  'value.sourcing.title': { en: 'Quality That Speaks for Itself', ar: 'جودة تبيض الوجه' },
  'value.sourcing.desc': { en: "We handpick our Alfalfa, Rhodes, and Barley with extreme care, ensuring they are pure, nutrient-rich, and free from impurities.", ar: 'نختار لك البرسيم (الجت) والرودس والشعير بعناية فائقة، لضمان خلوها من الشوائب ووصولها بكامل قيمتها الغذائية.' },
  'value.integrity.title': { en: "Your Animals' Health is Our Priority", ar: 'صحة حلالك أولويتنا' },
  'value.integrity.desc': { en: 'Our goal goes beyond selling; we want to see your livestock thriving with high productivity and peak performance.', ar: 'هدفنا مو بس بيع الأعلاف، هدفنا نشوف حلالك في أفضل حال، بإنتاجية عالية ومعدلات نمو ممتازة.' },
  'value.availability.title': { en: 'A Foundation of Trust', ar: 'ثقة متبادلة' },
  'value.availability.desc': { en: 'We built "Abbshir" on honesty and reliability. We believe that proper nutrition is the secret ingredient to every winning race and every healthy herd.', ar: 'بنينا "أبشر" على الصدق والأمانة، لأننا نؤمن أن التغذية السليمة هي أساس الفوز والإنتاج.' },

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
