import { useState } from 'react';
import { X, MessageCircle, Send, Check } from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';
import productsData from '../data/products.json';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Defaulting to empty to allow placeholder to show
    selectedProducts: [] as number[],
    message: ''
  });

  if (!isOpen) return null;

  const toggleProduct = (id: number) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(id)
        ? prev.selectedProducts.filter(pId => pId !== id)
        : [...prev.selectedProducts, id]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get localized product names
    const selectedProductNames = productsData
      .filter(p => formData.selectedProducts.includes(p.id))
      .map(p => p.name[language])
      .join(', ');

    const isAr = language === 'ar';
    const nl = '\n'; // newline

    // Construct message based on language
    let message = '';

    if (isAr) {
      message = `مرحباً! اسمي ${formData.name}.${nl}${nl}`;
      message += `أنا مهتم بـ: ${selectedProductNames || 'استفسار عام'}${nl}${nl}`;
      message += `الرسالة: ${formData.message}${nl}${nl}`;
      message += `رقم الهاتف: ${formData.phone}`;
    } else {
      message = `Hello! My name is ${formData.name}.${nl}${nl}`;
      message += `I'm interested in: ${selectedProductNames || 'General Inquiry'}${nl}${nl}`;
      message += `Message: ${formData.message}${nl}${nl}`;
      message += `Phone: ${formData.phone}`;
    }

    const whatsappUrl = `https://wa.me/971506785893?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-900">{t('contact.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
              placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('contact.phone')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
              dir="ltr"
              placeholder="+971..."
            />
          </div>

          {/* Product Interest (Multi-select) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('contact.product')} <span className="text-gray-400 font-normal text-xs">({language === 'ar' ? 'يمكن اختيار متعدد' : 'Multiple selection'})</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {productsData.map((product) => {
                const isSelected = formData.selectedProducts.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggleProduct(product.id)}
                    className={`
                      relative group flex items-center p-3 text-sm text-start rounded-xl border transition-all duration-200
                      ${isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50 text-gray-700'}
                    `}
                  >
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors
                      ${language === 'ar' ? 'ml-3 mr-0' : 'mr-3'}
                      ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'}
                    `}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="font-medium truncate">{product.name[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('contact.message')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all outline-none bg-gray-50 focus:bg-white"
              placeholder={language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-md font-medium"
            >
              <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              {t('contact.send')}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#1faa52] active:scale-[0.98] transition-all shadow-md font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              {t('contact.whatsapp')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
