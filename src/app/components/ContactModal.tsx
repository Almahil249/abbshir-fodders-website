import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/app/components/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '+971',
    product: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message
    const message = `Hello! My name is ${formData.name}.\n\nI'm interested in: ${formData.product}\n\nMessage: ${formData.message}\n\nPhone: ${formData.phone}`;
    const whatsappUrl = `https://wa.me/971505018802?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{t('contact.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.phone')}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              dir="ltr"
            />
          </div>

          {/* Product Interest */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.product')}
            </label>
            <select
              required
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select a product</option>
              <option value="Alfalfa Hay (Jett)">Alfalfa Hay (Jett)</option>
              <option value="Rhodes Grass">Rhodes Grass</option>
              <option value="Barley (Sha'eer)">Barley (Sha'eer)</option>
              <option value="Timothy Hay">Timothy Hay</option>
              <option value="Sudan Grass">Sudan Grass</option>
              <option value="Peanut Hay">Peanut Hay</option>
              <option value="Wheat Straw (Tibn)">Wheat Straw (Tibn)</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.message')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-md"
            >
              <Send className="w-4 h-4" />
              {t('contact.send')}
            </button>
            <button
              type="button"
              onClick={() => {
                const message = `Hello from ${formData.name || 'a customer'}! I'd like to know more about your products.`;
                const whatsappUrl = `https://wa.me/971505018802?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
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
