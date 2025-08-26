'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Clock, Users, CheckCircle, User, Mail, Phone, MapPin, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitLead } from '@/lib/leads';

interface JobApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  availability: string;
  motivation: string;
  hasTransportation: boolean;
  resumeFile?: FileList;
}

export default function JobApplicationSection() {
  const t = useTranslations('jobApplication');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<JobApplicationFormData>();

  const onSubmit = async (data: JobApplicationFormData) => {
    try {
      // Handle file upload later - for now just submit the form data
      const applicationData = {
        ...data,
        resumeFileName: data.resumeFile?.[0]?.name || 'No file uploaded'
      };
      
      await submitLead('job-application', applicationData);
      toast.success(locale === 'en' ? 'Application submitted! We\'ll contact you soon.' : '¡Aplicación enviada! Te contactaremos pronto.');
      setIsSubmitted(true);
    } catch (error) {
      toast.error(locale === 'en' ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intenta de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Application Submitted!' : '¡Aplicación Enviada!'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {locale === 'en' 
                ? 'Thank you for your interest in joining our sales team! We\'ll review your application and contact you within 2-3 business days.'
                : '¡Gracias por tu interés en unirte a nuestro equipo de ventas! Revisaremos tu aplicación y te contactaremos en 2-3 días hábiles.'
              }
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                {locale === 'en' 
                  ? 'Next Steps: Prepare for a phone interview and be ready to discuss your sales experience and availability.'
                  : 'Próximos Pasos: Prepárate para una entrevista telefónica y ten listo para discutir tu experiencia en ventas y disponibilidad.'
                }
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Join Our Sales Team' : 'Únete a Nuestro Equipo de Ventas'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'Earn up to $1,500 weekly in commissions selling innovative air purification systems. Flexible schedule, full training provided.'
                : 'Gana hasta $1,500 semanales en comisiones vendiendo sistemas innovadores de purificación de aire. Horario flexible, entrenamiento completo incluido.'
              }
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Job Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Why Join Delphin?' : '¿Por Qué Unirte a Delphin?'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {locale === 'en' ? 'High Commissions' : 'Altas Comisiones'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Earn up to $1,500 per week in commissions. Top performers earn even more!'
                        : 'Gana hasta $1,500 por semana en comisiones. ¡Los mejores vendedores ganan aún más!'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {locale === 'en' ? 'Flexible Schedule' : 'Horario Flexible'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Part-time position with flexible hours. Work around your schedule!'
                        : 'Posición de medio tiempo con horarios flexibles. ¡Trabaja según tu horario!'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {locale === 'en' ? 'Full Training' : 'Entrenamiento Completo'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Complete sales training and product knowledge. No experience required!'
                        : 'Entrenamiento completo de ventas y conocimiento del producto. ¡No se requiere experiencia!'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {locale === 'en' ? 'Door-to-Door Sales' : 'Ventas Puerta a Puerta'}
                    </h4>
                    <p className="text-gray-600">
                      {locale === 'en' 
                        ? 'Direct sales to homeowners. Build relationships and help families breathe cleaner air.'
                        : 'Ventas directas a propietarios. Construye relaciones y ayuda a las familias a respirar aire más limpio.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Apply Now' : 'Aplica Ahora'}
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'First Name' : 'Nombre'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...register('firstName', { required: true })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={locale === 'en' ? 'Your first name' : 'Tu nombre'}
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'Last Name' : 'Apellido'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...register('lastName', { required: true })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={locale === 'en' ? 'Your last name' : 'Tu apellido'}
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Email' : 'Correo Electrónico'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={locale === 'en' ? 'your.email@example.com' : 'tu.email@ejemplo.com'}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('phone', { required: true })}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={locale === 'en' ? '(555) 123-4567' : '(555) 123-4567'}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">Phone number is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Location/City' : 'Ubicación/Ciudad'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('location', { required: true })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={locale === 'en' ? 'Your city and state' : 'Tu ciudad y estado'}
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">Location is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Sales Experience' : 'Experiencia en Ventas'}
                  </label>
                  <select
                    {...register('experience', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">
                      {locale === 'en' ? 'Select your experience level' : 'Selecciona tu nivel de experiencia'}
                    </option>
                    <option value="none">
                      {locale === 'en' ? 'No sales experience' : 'Sin experiencia en ventas'}
                    </option>
                    <option value="some">
                      {locale === 'en' ? 'Some sales experience (1-2 years)' : 'Algo de experiencia en ventas (1-2 años)'}
                    </option>
                    <option value="experienced">
                      {locale === 'en' ? 'Experienced (3+ years)' : 'Experimentado (3+ años)'}
                    </option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-sm mt-1">Please select your experience level</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Availability' : 'Disponibilidad'}
                  </label>
                  <select
                    {...register('availability', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">
                      {locale === 'en' ? 'Select your availability' : 'Selecciona tu disponibilidad'}
                    </option>
                    <option value="weekdays">
                      {locale === 'en' ? 'Weekdays only' : 'Solo días de semana'}
                    </option>
                    <option value="weekends">
                      {locale === 'en' ? 'Weekends only' : 'Solo fines de semana'}
                    </option>
                    <option value="flexible">
                      {locale === 'en' ? 'Flexible schedule' : 'Horario flexible'}
                    </option>
                  </select>
                  {errors.availability && <p className="text-red-500 text-sm mt-1">Please select your availability</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Why do you want to work with us?' : '¿Por qué quieres trabajar con nosotros?'}
                  </label>
                  <textarea
                    {...register('motivation', { required: true })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={locale === 'en' 
                      ? 'Tell us about your motivation and goals...'
                      : 'Cuéntanos sobre tu motivación y objetivos...'
                    }
                  />
                  {errors.motivation && <p className="text-red-500 text-sm mt-1">Please tell us your motivation</p>}
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      {...register('hasTransportation', { required: true })}
                      type="checkbox"
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {locale === 'en' 
                        ? 'I have reliable transportation for door-to-door sales'
                        : 'Tengo transporte confiable para ventas puerta a puerta'
                      }
                    </span>
                  </label>
                  {errors.hasTransportation && <p className="text-red-500 text-sm mt-1">Transportation confirmation is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'en' ? 'Resume (PDF or DOCX)' : 'Currículum (PDF o DOCX)'}
                  </label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('resumeFile')}
                      type="file"
                      accept=".pdf,.docx,.doc"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {locale === 'en' ? 'Optional: Upload your resume (PDF or DOCX format)' : 'Opcional: Sube tu currículum (formato PDF o DOCX)'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (locale === 'en' ? 'Submitting...' : 'Enviando...')
                    : (locale === 'en' ? 'Submit Application' : 'Enviar Aplicación')
                  }
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
