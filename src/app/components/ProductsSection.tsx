import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/app/components/LanguageContext';
import productsData from '@/app/data/products.json';

interface Product {
  id: number;
  name: { en: string; ar: string };
  image: string;
  extraImages?: string[];
  extraDetails?: { en: string; ar: string };
  targets: string[];
  goal: { en: string; ar: string };
  stats: { label: { en: string; ar: string }; value: string }[];
  description: { en: string; ar: string };
}

const products: Product[] = (productsData as Product[]).sort((a, b) => a.id - b.id);

export function ProductsSection() {
  const { language, t } = useLanguage();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const selectedProduct = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

  /* Existing code... */
  const navigateProduct = (direction: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProductId) return;
    const currentIndex = products.findIndex((p) => p.id === selectedProductId);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= products.length) newIndex = 0;
    if (newIndex < 0) newIndex = products.length - 1;

    setSelectedProductId(products[newIndex].id);
  };

  // Listen for external product selection events
  useState(() => {
    // Using simple event listener since we don't have a global store
    const handleOpenProduct = (e: CustomEvent) => {
      const { id } = e.detail;
      if (id) {
        setSelectedProductId(Number(id));
        // Reset scroll for mobile consistency if needed, or let the caller handle scrolling
      }
    };

    // @ts-ignore - CustomEvent types
    window.addEventListener('open-product', handleOpenProduct);
    // @ts-ignore
    return () => window.removeEventListener('open-product', handleOpenProduct);
  });
  /* ... */

  const handleCardClick = (id: number) => {
    // Desktop: Always open modal (or switch current modal content if clicked externally, though modal covers screen)
    // Mobile: Toggle expansion
    if (selectedProductId === id) {
      setSelectedProductId(null); // Close checks
    } else {
      setSelectedProductId(id);
    }
  };

  return (
    <section id="products" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isExpanded = selectedProductId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCardClick(product.id)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer ${isExpanded ? 'ring-2 ring-emerald-500' : ''}`}
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-sm font-medium text-emerald-700">{product.goal[language]}</p>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {product.name[language]}
                  </h3>

                  {/* Target Animals */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600 font-medium">{t('products.bestFor')}:</span>
                    <div className="flex gap-1">
                      {product.targets.map((emoji, i) => (
                        <span key={i} className="text-2xl">{emoji}</span>
                      ))}
                    </div>
                  </div>

                  {/* Nutritional Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {product.stats.map((stat, i) => (
                      <div key={i} className="bg-emerald-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-emerald-700 font-medium mb-1">{stat.label[language]}</p>
                        <p className="text-lg font-bold text-emerald-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description - Desktop: truncated/hidden, Mobile: expanded if selected */}
                  <div className='md:block hidden'>
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                      {product.description[language]}
                    </p>
                  </div>

                  {/* Mobile Accordion Content */}
                  <div className="md:hidden block">
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 leading-relaxed text-sm mt-4">
                            {product.extraDetails?.[language] || product.description[language]}
                          </p>
                          {/* Extra Images Mobile */}
                          {product.extraImages && (
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                              {product.extraImages.map((img, i) => (
                                <img key={i} src={img} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" alt="" />
                              ))}
                            </div>
                          )}
                          <button
                            className="w-full mt-4 py-2 text-emerald-600 text-sm font-bold bg-emerald-50 rounded-lg"
                            onClick={(e) => { e.stopPropagation(); setSelectedProductId(null); }}
                          >
                            Close
                          </button>
                        </motion.div>
                      )}
                      {!isExpanded && (
                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                          {product.description[language]}
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop Modal Overlay */}
      <AnimatePresence>
        {selectedProductId && selectedProduct && (
          <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProductId(null)}
                className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
                {/* Visual Section (Left) */}
                <div className="lg:w-1/2 bg-gray-100 p-6 flex flex-col gap-4">
                  <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
                    <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  {/* Gallery */}
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {selectedProduct.extraImages?.map((img, i) => (
                      <div key={i} className="w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border-2 border-transparent hover:border-emerald-500 transition-all">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Section (Right) */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                  <div className="mb-2">
                    <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase">{selectedProduct.goal[language]}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">{selectedProduct.name[language]}</h2>

                  <div className="flex gap-4 mb-8">
                    {selectedProduct.stats.map((stat, i) => (
                      <div key={i} className="bg-emerald-50 px-4 py-2 rounded-lg">
                        <span className="block text-xs text-emerald-800 uppercase font-bold">{stat.label[language]}</span>
                        <span className="block text-xl font-bold text-emerald-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="prose prose-lg text-gray-600 mb-8">
                    <p>{selectedProduct.extraDetails?.[language] || selectedProduct.description[language]}</p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 font-medium">Best For:</span>
                      <div className="flex gap-1 text-2xl">
                        {selectedProduct.targets.map(t => <span key={t}>{t}</span>)}
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => navigateProduct('prev', e)}
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => navigateProduct('next', e)}
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
