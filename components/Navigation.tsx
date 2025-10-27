'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'testimonials', href: `/${locale}/testimonials` },
    { key: 'ebooks', href: `/${locale}#ebooks` },
    { key: 'affiliate', href: `/${locale}/affiliate` },
  ];

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="container-max">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">D</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block">Delphin Clean Air</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900 block xs:hidden">Delphin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {t(item.key)}
              </Link>
            ))}
            
            {/* Social Media */}
            <a
              href="https://www.facebook.com/profile.php?id=61582037910455"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {/* CTA Button */}
            <Link href={`/${locale}#free-demo`} className="btn-primary">
              {locale === 'en' ? 'Free Demo' : 'Demo Gratis'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 bg-white shadow-lg"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200 touch-manipulation text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                
                <div className="px-4 py-3 border-t border-gray-200 space-y-3">
                  {/* Facebook Link */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61582037910455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 touch-manipulation py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>

                  {/* Language Toggle */}
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 touch-manipulation py-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{locale === 'en' ? 'Español' : 'English'}</span>
                  </button>
                </div>

                <div className="px-4 pb-2">
                  <Link
                    href={`/${locale}#free-demo`}
                    className="btn-primary w-full text-center block py-4 text-base touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {locale === 'en' ? 'Free Demo' : 'Demo Gratis'}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
