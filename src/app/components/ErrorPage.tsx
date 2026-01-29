import { motion } from 'motion/react';
import { useLanguage } from '@/app/components/LanguageContext';
import { Home, AlertCircle } from 'lucide-react';

interface ErrorPageProps {
    code: '404' | '500' | 'error';
}

export function ErrorPage({ code }: ErrorPageProps) {
    const { t } = useLanguage();

    const getErrorContent = () => {
        switch (code) {
            case '404':
                return {
                    title: t('error.404.title'),
                    message: t('error.404.msg'),
                };
            case '500':
            default:
                return {
                    title: t('error.500.title'),
                    message: t('error.500.msg'),
                };
        }
    };

    const content = getErrorContent();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-12 rounded-3xl shadow-xl space-y-8"
                >
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                            {content.title}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            {content.message}
                        </p>
                    </div>

                    <div className="pt-4">
                        <a
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg font-medium w-full"
                        >
                            <Home className="w-5 h-5" />
                            {t('error.backHome')}
                        </a>
                    </div>
                </motion.div>

                {/* Branding decoration */}
                <p className="mt-8 text-gray-400 font-medium tracking-widest uppercase text-xs">
                    Abbshir Fodders
                </p>
            </div>
        </div>
    );
}
