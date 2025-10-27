'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface AffiliateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  platform: string;
  followers: string;
  experience: string;
  motivation: string;
}

export default function AffiliateSignupSection() {
  const t = useTranslations('affiliate');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AffiliateFormData>();

  const onSubmit = async (data: AffiliateFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Affiliate application submitted:', data);
      toast.success(locale === 'en' ? 'Application submitted! We\'ll review and contact you soon.' : '¡Aplicación enviada! La revisaremos y te contactaremos pronto.');
      setIsSubmitted(true);
    } catch (error) {
      toast.error(locale === 'en' ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intenta de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {locale === 'en' ? 'Welcome to the Team!' : '¡Bienvenido al Equipo!'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              {locale === 'en' 
                ? 'Thank you for your interest in becoming a Delphin partner. Our team will review your application and contact you within 2-3 business days with next steps.'
                : 'Gracias por tu interés en convertirte en socio de Delphin. Nuestro equipo revisará tu aplicación y te contactará dentro de 2-3 días hábiles con los próximos pasos.'
              }
            </p>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-soft">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {locale === 'en' ? 'What happens next?' : '¿Qué sigue?'}
              </h3>
              <ul className="text-left text-gray-600 space-y-2 text-sm sm:text-base">
                <li>✓ {locale === 'en' ? 'Application review (2-3 days)' : 'Revisión de aplicación (2-3 días)'}</li>
                <li>✓ {locale === 'en' ? 'Partner onboarding call' : 'Llamada de incorporación de socio'}</li>
                <li>✓ {locale === 'en' ? 'Access to marketing materials' : 'Acceso a materiales de marketing'}</li>
                <li>✓ {locale === 'en' ? 'Start earning commissions!' : '¡Comenzar a ganar comisiones!'}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
                {locale === 'en' ? 'Partner Program' : 'Programa de Socios'}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t('subtitle')}
            </p>

            {/* Key Benefits */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <DollarSign className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('benefits.commission')}</h3>
                  <p className="text-gray-600">
                    {locale === 'en' 
                      ? 'Earn up to 25% commission on every sale you generate. Higher tiers unlock even better rates.'
                      : 'Gana hasta 25% de comisión en cada venta que generes. Los niveles más altos desbloquean tarifas aún mejores.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('benefits.support')}</h3>
                  <p className="text-gray-600">
                    {locale === 'en'
                      ? 'Get professional marketing materials, product training, and dedicated partner support.'
                      : 'Obtén materiales de marketing profesionales, entrenamiento del producto y soporte dedicado para socios.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Users className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('benefits.training')}</h3>
                  <p className="text-gray-600">
                    {locale === 'en'
                      ? 'Complete training program covering product knowledge, sales techniques, and customer support.'
                      : 'Programa de entrenamiento completo que cubre conocimiento del producto, técnicas de ventas y soporte al cliente.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  {locale === 'en' ? '500+ Active Partners' : '500+ Socios Activos'}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic">
                "{locale === 'en' 
                  ? 'The Delphin partner program has been life-changing. Great products, amazing support, and the commissions are exactly as promised!'
                  : 'El programa de socios de Delphin ha cambiado mi vida. Grandes productos, soporte increíble, ¡y las comisiones son exactamente como prometieron!'
                }"
              </p>
              <p className="text-xs text-gray-500 mt-2">
                - {locale === 'en' ? 'Sarah M., Top Partner' : 'Sarah M., Socia Principal'}
              </p>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-soft"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Apply to Become a Partner' : 'Aplicar para Ser Socio'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'First Name' : 'Nombre'}
                  </label>
                  <input
                    {...register('firstName', { required: true })}
                    className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder={locale === 'en' ? 'First name' : 'Nombre'}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'First name is required' : 'El nombre es requerido'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Last Name' : 'Apellido'}
                  </label>
                  <input
                    {...register('lastName', { required: true })}
                    className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder={locale === 'en' ? 'Last name' : 'Apellido'}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'Last name is required' : 'El apellido es requerido'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Email Address' : 'Correo Electrónico'}
                </label>
                <input
                  {...register('email', { 
                    required: true,
                    pattern: /^\S+@\S+$/i
                  })}
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder={locale === 'en' ? 'your@email.com' : 'tu@email.com'}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Valid email is required' : 'Se requiere un email válido'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                </label>
                <input
                  {...register('phone', { required: true })}
                  type="tel"
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder={locale === 'en' ? 'Phone number' : 'Número de teléfono'}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Phone number is required' : 'El número de teléfono es requerido'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Primary Platform' : 'Plataforma Principal'}
                </label>
                <select
                  {...register('platform', { required: true })}
                  className={`form-input ${errors.platform ? 'border-red-500' : ''}`}
                >
                  <option value="">
                    {locale === 'en' ? 'Select platform' : 'Selecciona plataforma'}
                  </option>
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="other">{locale === 'en' ? 'Other' : 'Otro'}</option>
                </select>
                {errors.platform && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Please select a platform' : 'Por favor selecciona una plataforma'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Follower Count' : 'Número de Seguidores'}
                </label>
                <select
                  {...register('followers', { required: true })}
                  className={`form-input ${errors.followers ? 'border-red-500' : ''}`}
                >
                  <option value="">
                    {locale === 'en' ? 'Select range' : 'Selecciona rango'}
                  </option>
                  <option value="1k-10k">1K - 10K</option>
                  <option value="10k-50k">10K - 50K</option>
                  <option value="50k-100k">50K - 100K</option>
                  <option value="100k-500k">100K - 500K</option>
                  <option value="500k+">{locale === 'en' ? '500K+' : '500K+'}</option>
                </select>
                {errors.followers && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Please select follower range' : 'Por favor selecciona el rango de seguidores'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Marketing Experience' : 'Experiencia en Marketing'}
                </label>
                <select
                  {...register('experience', { required: true })}
                  className={`form-input ${errors.experience ? 'border-red-500' : ''}`}
                >
                  <option value="">
                    {locale === 'en' ? 'Select experience level' : 'Selecciona nivel de experiencia'}
                  </option>
                  <option value="beginner">{locale === 'en' ? 'Beginner (0-1 years)' : 'Principiante (0-1 años)'}</option>
                  <option value="intermediate">{locale === 'en' ? 'Intermediate (1-3 years)' : 'Intermedio (1-3 años)'}</option>
                  <option value="advanced">{locale === 'en' ? 'Advanced (3+ years)' : 'Avanzado (3+ años)'}</option>
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Please select experience level' : 'Por favor selecciona el nivel de experiencia'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Why do you want to partner with Delphin?' : '¿Por qué quieres asociarte con Delphin?'}
                </label>
                <textarea
                  {...register('motivation', { required: true, minLength: 50 })}
                  rows={4}
                  className={`form-input resize-none ${errors.motivation ? 'border-red-500' : ''}`}
                  placeholder={locale === 'en' 
                    ? 'Tell us about your interest in clean air technology and how you plan to promote Delphin products...'
                    : 'Cuéntanos sobre tu interés en la tecnología de aire limpio y cómo planeas promocionar los productos Delphin...'
                  }
                />
                {errors.motivation && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Please provide at least 50 characters' : 'Por favor proporciona al menos 50 caracteres'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (locale === 'en' ? 'Submitting Application...' : 'Enviando Aplicación...')
                  : (locale === 'en' ? 'Submit Application' : 'Enviar Aplicación')
                }
              </button>

              <p className="text-xs text-gray-500 text-center">
                {locale === 'en' 
                  ? 'By applying, you agree to our partner terms and conditions. We review all applications within 2-3 business days.'
                  : 'Al aplicar, aceptas nuestros términos y condiciones de socios. Revisamos todas las aplicaciones dentro de 2-3 días hábiles.'
                }
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
