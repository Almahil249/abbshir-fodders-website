import { motion } from 'motion/react';
import { useLanguage } from '@/app/components/LanguageContext';
import { Award, Microscope, Truck, Leaf, TrendingUp, Calendar } from 'lucide-react';

export function AboutSection() {
  const { t } = useLanguage();

  const trustBadges = [
    { icon: Leaf, text: t('badge.organic') },
    { icon: Microscope, text: t('badge.labTested') },
    { icon: Truck, text: t('badge.fastDelivery') },
  ];

  const keyValues = [
    {
      icon: Award,
      title: t('value.sourcing.title'),
      description: t('value.sourcing.desc')
    },
    {
      icon: TrendingUp,
      title: t('value.integrity.title'),
      description: t('value.integrity.desc')
    },
    {
      icon: Calendar,
      title: t('value.availability.title'),
      description: t('value.availability.desc')
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md"
            >
              <badge.icon className="w-6 h-6 text-emerald-600" />
              <span className="font-medium text-gray-800">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.quality')}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1767938072214-dfa75c3b6dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWFuJTIwaG9yc2UlMjBzdGFibGV8ZW58MXx8fHwxNzY5MTQyMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Arabian horse"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Key Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {keyValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
