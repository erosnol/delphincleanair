'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Users, Award, Shield } from 'lucide-react';
import Link from 'next/link';
import ErrorBoundary from './ErrorBoundary';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        {/* Decorative blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-80 sm:h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-80 sm:h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        {/* Additional coverage for mobile */}
        <div className="absolute top-1/4 right-0 w-32 h-32 sm:w-60 sm:h-60 bg-accent-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative container-max py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <Award className="w-4 h-4 mr-2" />
              {t('trustBadge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
            >
              {t('subheadline')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <Link href={`/${locale}#free-demo`} className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
                {t('ctaPrimary')}
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-6"
            >
              <div className="text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-gray-900">100K+</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {locale === 'en' ? 'Happy Families' : 'Familias Felices'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-secondary-600" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {locale === 'en' ? 'Air Purification' : 'Purificación'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-accent-600" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-gray-900">25+</div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {locale === 'en' ? 'Years Experience' : 'Años Experiencia'}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
              {/* Delphin Vimeo Video */}
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden touch-manipulation">
                <ErrorBoundary fallback={<div className="absolute inset-0 flex items-center justify-center text-white">Video Loading...</div>}>
                  <iframe
                    src="https://player.vimeo.com/video/751836839?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    title="Delphin Clean Air Demo"
                  />
                </ErrorBoundary>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-accent-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                <div className="text-center">
                  <div className="text-xs sm:text-sm">FREE</div>
                  <div className="text-xs">DEMO</div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg shadow-soft p-3 sm:p-4 max-w-xs hidden sm:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {locale === 'en' ? 'Allergen-Free Air' : 'Aire Sin Alérgenos'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {locale === 'en' ? 'Removes 99.9% of pollutants' : 'Elimina 99.9% de contaminantes'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
