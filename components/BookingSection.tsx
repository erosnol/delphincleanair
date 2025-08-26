'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, CheckCircle, User, Mail, Phone, MessageSquare, Home } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitLead } from '@/lib/leads';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consultationType: 'virtual' | 'in-person';
  preferredDate: string;
  timeSlot: string;
  message?: string;
}

export default function BookingSection() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingFormData>();
  const consultationType = watch('consultationType');

  const onSubmit = async (data: BookingFormData) => {
    try {
      await submitLead('booking', data);
      toast.success(locale === 'en' ? 'Consultation booked! We\'ll send you a confirmation email.' : '¡Consulta reservada! Te enviaremos un email de confirmación.');
      setIsSubmitted(true);
    } catch (error) {
      toast.error(locale === 'en' ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intenta de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Consultation Booked!' : '¡Consulta Reservada!'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {locale === 'en' 
                ? 'Your consultation has been successfully scheduled. You\'ll receive a confirmation email with all the details shortly.'
                : 'Tu consulta ha sido programada exitosamente. Recibirás un email de confirmación con todos los detalles pronto.'
              }
            </p>
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'en' ? 'What to expect:' : 'Qué esperar:'}
              </h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>✓ {locale === 'en' ? 'Confirmation email within 15 minutes' : 'Email de confirmación dentro de 15 minutos'}</li>
                <li>✓ {locale === 'en' ? 'Expert consultation on your air quality needs' : 'Consulta experta sobre tus necesidades de calidad del aire'}</li>
                <li>✓ {locale === 'en' ? 'Personalized Delphin solution recommendations' : 'Recomendaciones personalizadas de soluciones Delphin'}</li>
                <li>✓ {locale === 'en' ? 'No obligation - just expert advice' : 'Sin obligación - solo consejos expertos'}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-secondary-600 mr-3" />
            <span className="text-secondary-600 font-semibold text-sm uppercase tracking-wide">
              {t('badge')}
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Consultation Options */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Choose Your Consultation Type' : 'Elige Tu Tipo de Consulta'}
            </h3>

            {/* Virtual Option */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border-2 border-transparent hover:border-primary-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('virtualOption')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {locale === 'en'
                      ? 'Connect with our experts online from anywhere in the US for a personalized consultation and virtual product demonstration.'
                      : 'Conéctate con nuestros expertos en línea desde cualquier lugar de EE.UU. para una consulta personalizada y demostración virtual del producto.'
                    }
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === 'en' ? '30-45 minutes' : '30-45 minutos'}</li>
                    <li>• {locale === 'en' ? 'Product demonstration via video' : 'Demostración de producto vía video'}</li>
                    <li>• {locale === 'en' ? 'Personalized recommendations' : 'Recomendaciones personalizadas'}</li>
                    <li>• {locale === 'en' ? 'Q&A session' : 'Sesión de preguntas y respuestas'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* In-Person Option */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border-2 border-transparent hover:border-secondary-200 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('inPersonOption')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {locale === 'en'
                      ? 'Complete air quality assessment with live product demonstration. Our expert will visit your home to test air quality and show you the Delphin system in action. (Arizona locations only)'
                      : 'Evaluación completa de calidad del aire con demostración en vivo del producto. Nuestro experto visitará tu hogar para probar la calidad del aire y mostrarte el sistema Delphin en acción. (Solo ubicaciones en Arizona)'
                    }
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {locale === 'en' ? '60-90 minutes' : '60-90 minutos'}</li>
                    <li>• {locale === 'en' ? 'Free air quality testing' : 'Prueba gratuita de calidad del aire'}</li>
                    <li>• {locale === 'en' ? 'Live product demonstration' : 'Demostración en vivo del producto'}</li>
                    <li>• {locale === 'en' ? 'Customized solution design' : 'Diseño de solución personalizada'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">
                {locale === 'en' ? 'Why Book a Consultation?' : '¿Por Qué Reservar una Consulta?'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>{locale === 'en' ? 'Expert guidance tailored to your needs' : 'Orientación experta adaptada a tus necesidades'}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>{locale === 'en' ? 'No-pressure environment' : 'Ambiente sin presión'}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>{locale === 'en' ? 'Free air quality insights' : 'Información gratuita sobre calidad del aire'}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>{locale === 'en' ? 'Custom solution recommendations' : 'Recomendaciones de soluciones personalizadas'}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-soft"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Book Your Consultation' : 'Reserva Tu Consulta'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('firstName', { required: true })}
                    className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder={locale === 'en' ? 'First Name' : 'Nombre'}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'First name is required' : 'El nombre es requerido'}
                    </p>
                  )}
                </div>
                
                <div>
                  <input
                    {...register('lastName', { required: true })}
                    className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder={locale === 'en' ? 'Last Name' : 'Apellido'}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'Last name is required' : 'El apellido es requerido'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register('email', { 
                    required: true,
                    pattern: /^\S+@\S+$/i
                  })}
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder={locale === 'en' ? 'Email Address' : 'Correo Electrónico'}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Valid email is required' : 'Se requiere un email válido'}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register('phone', { required: true })}
                  type="tel"
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder={locale === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Phone number is required' : 'El número de teléfono es requerido'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Consultation Type' : 'Tipo de Consulta'}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${consultationType === 'virtual' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      {...register('consultationType', { required: true })}
                      type="radio"
                      value="virtual"
                      className="sr-only"
                    />
                    <div className="text-center">
                      <Video className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                      <span className="text-sm font-medium">{t('virtualOption')}</span>
                    </div>
                  </label>
                  
                  <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${consultationType === 'in-person' ? 'border-secondary-500 bg-secondary-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      {...register('consultationType', { required: true })}
                      type="radio"
                      value="in-person"
                      className="sr-only"
                    />
                    <div className="text-center">
                      <Home className="w-6 h-6 mx-auto mb-2 text-secondary-600" />
                      <span className="text-sm font-medium">{t('inPersonOption')}</span>
                    </div>
                  </label>
                </div>
                {errors.consultationType && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Please select a consultation type' : 'Por favor selecciona un tipo de consulta'}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Preferred Date' : 'Fecha Preferida'}
                  </label>
                  <input
                    {...register('preferredDate', { required: true })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`form-input ${errors.preferredDate ? 'border-red-500' : ''}`}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'Date is required' : 'La fecha es requerida'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Time Preference' : 'Preferencia de Hora'}
                  </label>
                  <select
                    {...register('timeSlot', { required: true })}
                    className={`form-input ${errors.timeSlot ? 'border-red-500' : ''}`}
                  >
                    <option value="">
                      {locale === 'en' ? 'Select time' : 'Selecciona hora'}
                    </option>
                    <option value="morning">{t('timeSlots.morning')}</option>
                    <option value="afternoon">{t('timeSlots.afternoon')}</option>
                    <option value="evening">{t('timeSlots.evening')}</option>
                  </select>
                  {errors.timeSlot && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'Time slot is required' : 'La franja horaria es requerida'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'en' ? 'Additional Message (Optional)' : 'Mensaje Adicional (Opcional)'}
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="form-input resize-none"
                  placeholder={locale === 'en' 
                    ? 'Tell us about your specific air quality concerns or questions...'
                    : 'Cuéntanos sobre tus preocupaciones específicas de calidad del aire o preguntas...'
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {locale === 'en' 
                  ? 'Free consultation with no obligation. We respect your time and privacy.'
                  : 'Consulta gratuita sin obligación. Respetamos tu tiempo y privacidad.'
                }
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
