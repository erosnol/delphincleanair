'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Beacons Icon Component  
const BeaconsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">Delphin Clean Air</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              {locale === 'en' 
                ? 'Revolutionary air purification technology that transforms your home into a sanctuary of clean, healthy air.'
                : 'Tecnología revolucionaria de purificación de aire que transforma tu hogar en un santuario de aire limpio y saludable.'
              }
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                href="https://beacons.ai/delphincleanair" 
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 touch-manipulation text-sm"
              >
                <BeaconsIcon className="w-5 h-5" />
                <span>Beacons</span>
              </Link>
              <Link 
                href="https://tiktok.com/@DelphinCleanAir" 
                target="_blank"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200 flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 touch-manipulation text-sm"
              >
                <TikTokIcon className="w-5 h-5" />
                <span>@DelphinCleanAir</span>
              </Link>
              <Link 
                href="https://www.facebook.com/profile.php?id=61582037910455" 
                target="_blank"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 touch-manipulation text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              {locale === 'en' ? 'Quick Links' : 'Enlaces Rápidos'}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href={`/${locale}#free-demo`} className="text-gray-400 hover:text-white transition-colors duration-200 touch-manipulation text-sm sm:text-base">
                  {locale === 'en' ? 'Free Demo' : 'Demo Gratis'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#ebooks`} className="text-gray-400 hover:text-white transition-colors duration-200 touch-manipulation text-sm sm:text-base">
                  {locale === 'en' ? 'Free eBooks' : 'eBooks Gratis'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/affiliate`} className="text-gray-400 hover:text-white transition-colors duration-200 touch-manipulation text-sm sm:text-base">
                  {locale === 'en' ? 'Partner Program' : 'Programa de Socios'}
                </Link>
              </li>
              <li>
                <Link href="https://delphin.net" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1 touch-manipulation text-sm sm:text-base">
                  <span>{locale === 'en' ? 'Official Site' : 'Sitio Oficial'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              {locale === 'en' ? 'Contact' : 'Contacto'}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li>{locale === 'en' ? 'Schedule a consultation' : 'Programa una consulta'}</li>
              <li>{locale === 'en' ? 'Free air quality assessment' : 'Evaluación gratuita de calidad del aire'}</li>
              <li>{locale === 'en' ? 'Product demonstrations' : 'Demostraciones de productos'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2024 Delphin Clean Air. {locale === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm flex items-center text-center md:text-left">
            {locale === 'en' ? 'Made with' : 'Hecho con'} <Heart className="w-4 h-4 text-red-500 mx-1" /> {locale === 'en' ? 'for clean air' : 'para aire limpio'}
          </p>
        </div>
      </div>
    </footer>
  );
}
