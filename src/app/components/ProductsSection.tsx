import { motion } from 'motion/react';
import { useLanguage } from '@/app/components/LanguageContext';

interface Product {
  name: { en: string; ar: string };
  image: string;
  targets: string[];
  goal: { en: string; ar: string };
  stats: { label: string; value: string }[];
  description: { en: string; ar: string };
}

const products: Product[] = [
  {
    name: { en: 'Alfalfa Hay (Jett)', ar: 'علف الجت (البرسيم)' },
    image: 'https://images.unsplash.com/photo-1689796975697-e1735a01b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhheSUyMGJhbGVzfGVufDF8fHx8MTc2OTE5NTAwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐪', '🐎', '🐄'],
    goal: { en: 'Muscle Growth & Milk Production', ar: 'نمو العضلات وإنتاج الحليب' },
    stats: [
      { label: 'Protein', value: '18-22%' },
      { label: 'Fiber', value: '25%' },
    ],
    description: {
      en: 'The premium choice for high-performance animals. Rich in protein and calcium, ideal for racing camels, broodmares, and dairy cattle requiring maximum nutrition.',
      ar: 'الخيار الأول للأداء العالي. غني بالبروتين والكالسيوم، مثالي لسباقات الهجن، والخيول، والأبقار الحلوب التي تحتاج إلى تغذية مكثفة.'
    }
  },
  {
    name: { en: 'Rhodes Grass', ar: 'علف الرودس' },
    image: 'https://images.unsplash.com/photo-1697191579403-d1853ae3f9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaG9kZXMlMjBncmFzcyUyMGhheXxlbnwxfHx8fDE3NjkxOTUwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐪', '🐄', '🐑'],
    goal: { en: 'Maintenance & Digestion', ar: 'الصيانة والهضم' },
    stats: [
      { label: 'Protein', value: '9-12%' },
      { label: 'Fiber', value: '30%+' },
    ],
    description: {
      en: "The UAE's staple forage. A balanced, high-fiber grass essential for maintaining healthy rumen function in camels and livestock. Perfect for daily feeding.",
      ar: 'العلف الأساسي في الإمارات. حشائش متوازنة وعالية الألياف، ضرورية لصحة الجهاز الهضمي للهجن والمواشي. مثالي للتغذية اليومية المستمرة.'
    }
  },
  {
    name: { en: 'Barley (Sha\'eer)', ar: 'علف الشعير' },
    image: 'https://images.unsplash.com/photo-1557735710-67da6393ff2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJsZXklMjBncmFpbnxlbnwxfHx8fDE3NjkxOTUwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐑', '🐐', '🐪'],
    goal: { en: 'Fattening & High Energy', ar: 'التسمين والطاقة العالية' },
    stats: [
      { label: 'Starch', value: '55%' },
      { label: 'Energy', value: 'High' },
    ],
    description: {
      en: 'A high-energy grain aimed at rapid weight gain and conditioning. The preferred choice for fattening sheep and boosting energy levels in working camels.',
      ar: 'مصدر الطاقة القصوى. حبوب عالية النشويات تهدف إلى زيادة الوزن بسرعة وتحسين الحالة الجسمانية. الخيار المفضل لتسمين الأغنام ودعم طاقة الهجن.'
    }
  },
  {
    name: { en: 'Timothy Hay', ar: 'علف تيموثي' },
    image: 'https://images.unsplash.com/photo-1745947826055-43921f66d8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1vdGh5JTIwaGF5JTIwZ3Jhc3N8ZW58MXx8fHwxNzY5MTk1MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐎'],
    goal: { en: 'Colic Prevention & Light Diet', ar: 'منع المغص ونظام غذائي خفيف' },
    stats: [
      { label: 'Protein', value: '8-10%' },
      { label: 'Calcium', value: 'Low' },
    ],
    description: {
      en: 'Premium imported grass for sensitive horses. Low in calcium and easy to digest, making it the safest option for horses prone to colic or obesity.',
      ar: 'علف مستورد فاخر للخيول الحساسة. منخفض ��لكالسيوم وسهل الهضم، مما يجعله الخيار الأكثر أمانًا للخيول المعرضة للمغص أو السمنة.'
    }
  },
  {
    name: { en: 'Sudan Grass', ar: 'سودان جراس' },
    image: 'https://images.unsplash.com/photo-1689796975697-e1735a01b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhheSUyMGJhbGVzfGVufDF8fHx8MTc2OTE5NTAwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐄', '🐑'],
    goal: { en: 'Bulk & Forage', ar: 'الحجم والعلف' },
    stats: [
      { label: 'Sugar', value: 'Medium' },
      { label: 'Texture', value: 'Coarse' },
    ],
    description: {
      en: 'An economical, fast-growing forage suitable for cattle herds. Provides excellent roughage to bulk up the diet and keep livestock satisfied.',
      ar: 'علف اقتصادي ممتاز لقطعان الأبقار والمواشي. يوفر كمية كبيرة من الألياف الخشنة التي تساعد على الشبع وملء الكرش بتكلفة مناسبة.'
    }
  },
  {
    name: { en: 'Peanut Hay (Foul Sudani)', ar: 'علف/تبن الفول السوداني' },
    image: 'https://images.unsplash.com/photo-1697191579403-d1853ae3f9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaG9kZXMlMjBncmFzcyUyMGhheXxlbnwxfHx8fDE3NjkxOTUwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐑', '🐄'],
    goal: { en: 'Palatability & Protein Boost', ar: 'طعم شهي وزيادة البروتين' },
    stats: [
      { label: 'Protein', value: '13-15%' },
      { label: 'Taste', value: 'Sweet/High' },
    ],
    description: {
      en: 'Highly palatable leguminous hay. A favorite for sheep and goats due to its taste, offering a good protein boost comparable to lower-grade Alfalfa.',
      ar: 'علف شهي جدًا ومحبب للأغنام والماعز. يعتبر مصدرًا ممتازًا للبروتين النباتي ويتميز بطعمه الذي يحفز الحيوانات على الأكل بشراهة.'
    }
  },
  {
    name: { en: 'Wheat Straw (Tibn)', ar: 'تبن القمح' },
    image: 'https://images.unsplash.com/photo-1606154358545-f9919f595a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMHN0cmF3fGVufDF8fHx8MTc2OTE5NTAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    targets: ['🐪', '🐄', '🐑', '🐐'],
    goal: { en: 'Fiber Filler', ar: 'حشو الألياف' },
    stats: [
      { label: 'Energy', value: 'Low' },
      { label: 'Function', value: 'Rumen Health' },
    ],
    description: {
      en: 'The essential mixer. Used to add bulk to concentrate feeds (like grains) to slow digestion and prevent acidity in the stomach.',
      ar: 'العنصر المكمل الأساسي. يُستخدم لخلطه مع الأعلاف المركزة (مثل الشعير) لزيادة الحجم، وإبطاء الهضم، ومنع الحموضة في معدة الحيوان.'
    }
  },
];

export function ProductsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="products" className="py-24 bg-white">
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
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
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
                      <p className="text-xs text-emerald-700 font-medium mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-emerald-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
