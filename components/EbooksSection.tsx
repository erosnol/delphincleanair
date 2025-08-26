'use client';

import { useTranslations } from 'next-intl';
import { Download, BookOpen, FileText } from 'lucide-react';

export default function EbooksSection() {
  const t = useTranslations('ebooks');

  const handleDownload = (filename: string, title: string) => {
    // Use API route to serve PDF files
    window.open(`/api/download/${filename}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Fresh Air Guide - English */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Fresh Air Guide
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                "The Secret of Happiness and Health" - Discover how clean air transforms your life and well-being.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• The science of clean air</li>
                <li>• Health benefits revealed</li>
                <li>• Water-based purification</li>
                <li>• Transform your home</li>
              </ul>
            </div>

            <button
              onClick={() => handleDownload('english-pdf-delphin.pdf', 'Fresh Air Guide')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download English PDF
            </button>
          </div>

          {/* Aire Fresco Guide - Spanish */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Guía Aire Fresco
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                "El Secreto de la Felicidad y la Salud" - Descubre cómo el aire limpio transforma tu vida y bienestar.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• La ciencia del aire limpio</li>
                <li>• Beneficios para la salud</li>
                <li>• Purificación con agua</li>
                <li>• Transforma tu hogar</li>
              </ul>
            </div>

            <button
              onClick={() => handleDownload('book-delphin-spanish.pdf', 'Guía Aire Fresco')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar PDF Español
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All downloads are completely free • No email required • Instant access
          </p>
        </div>
      </div>
    </section>
  );
}
