'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Gift, CheckCircle, User, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitLead } from '@/lib/leads';
import PhoneInput from 'react-phone-number-input/input';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import 'react-phone-number-input/style.css';

interface FreeGiftFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

// Enhanced Phone Input Component
interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
}

function PhoneInputField({ value, onChange, placeholder, error }: PhoneInputFieldProps) {
  return (
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
      <PhoneInput
        country="US"
        value={value}
        onChange={(val) => onChange(val || '')}
        placeholder={placeholder}
        className={`form-input pl-10 ${error ? 'border-red-500' : ''}`}
        style={{
          '--PhoneInputCountryFlag-height': '1em',
          '--PhoneInputCountrySelectArrow-color': '#6b7280',
        } as any}
        inputMode="tel"
        autoComplete="tel"
      />
    </div>
  );
}

// Enhanced Address Input Component
interface AddressInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
}

function AddressInputField({ value, onChange, placeholder, error }: AddressInputFieldProps) {
  const {
    ready,
    value: addressValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  const handleSelect = async (description: string) => {
    setValue(description, false);
    onChange(description);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      console.log('📍 Coordinates: ', { lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
      <input
        value={addressValue}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
        className={`form-input pl-10 ${error ? 'border-red-500' : ''}`}
        autoComplete="street-address"
      />
      
      {/* Suggestions dropdown */}
      {status === 'OK' && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <div
              key={place_id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelect(description)}
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-700">{description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FreeGiftSection() {
  const t = useTranslations('freeGift');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FreeGiftFormData>();

  const onSubmit = async (data: FreeGiftFormData) => {
    try {
      await submitLead('free-gift', data);
      toast.success(locale === 'en' ? 'Assessment scheduled! We\'ll contact you soon.' : '¡Evaluación programada! Te contactaremos pronto.');
      setIsSubmitted(true);
    } catch (error) {
      toast.error(locale === 'en' ? 'Something went wrong. Please try again.' : 'Algo salió mal. Por favor intenta de nuevo.');
    }
  };

  if (isSubmitted) {
    return (
      <section id="free-demo" className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Thank You!' : '¡Gracias!'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {locale === 'en' 
                ? 'Your free air quality assessment has been scheduled. Our expert will contact you within 24 hours to arrange the perfect time for your consultation.'
                : 'Tu evaluación gratuita de calidad del aire ha sido programada. Nuestro experto te contactará dentro de 24 horas para coordinar el momento perfecto para tu consulta.'
              }
            </p>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === 'en' ? 'What happens next?' : '¿Qué sigue?'}
              </h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>✓ {locale === 'en' ? 'Expert contact within 24 hours' : 'Contacto de experto dentro de 24 horas'}</li>
                <li>✓ {locale === 'en' ? 'Schedule your assessment' : 'Programa tu evaluación'}</li>
                <li>✓ {locale === 'en' ? 'Free in-home air quality test' : 'Prueba gratuita de calidad del aire en casa'}</li>
                <li>✓ {locale === 'en' ? 'Personalized recommendations' : 'Recomendaciones personalizadas'}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="free-demo" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mr-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wide">
                {t('badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Claim Your Free Gift of an Air Washer' : 'Reclama Tu Regalo Gratis de un Lavador de Aire'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'Experience the power of clean air with a complimentary Delphin Air Washer demonstration at your home.'
                : 'Experimenta el poder del aire limpio con una demostración gratuita del Lavador de Aire Delphin en tu hogar.'
              }
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{t('benefits.professional')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{t('benefits.personalized')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">{t('benefits.noObligation')}</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">
                  {locale === 'en' ? '1,000+ assessments completed this month' : '1,000+ evaluaciones completadas este mes'}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic">
                "{locale === 'en' 
                  ? 'The assessment revealed pollutants I never knew existed in my home. The Delphin system has been life-changing for my family\'s health!'
                  : 'La evaluación reveló contaminantes que nunca supe que existían en mi hogar. ¡El sistema Delphin ha cambiado la vida de mi familia!'
                }"
              </p>
              <p className="text-xs text-gray-500 mt-2">
                - {locale === 'en' ? 'Maria S., Happy Customer' : 'María S., Cliente Satisfecha'}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-soft"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'en' ? 'Claim Your Free Assessment' : 'Reclama Tu Evaluación Gratuita'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('firstName', { required: true })}
                      className={`form-input pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder={t('form.firstName')}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'First name is required' : 'El nombre es requerido'}
                    </p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('lastName', { required: true })}
                      className={`form-input pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder={t('form.lastName')}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {locale === 'en' ? 'Last name is required' : 'El apellido es requerido'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email', { 
                      required: true,
                      pattern: /^\S+@\S+$/i
                    })}
                    type="email"
                    className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t('form.email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Valid email is required' : 'Se requiere un email válido'}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInputField
                      value={value || ''}
                      onChange={onChange}
                      placeholder={t('form.phone')}
                      error={!!errors.phone}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Phone number is required' : 'El número de teléfono es requerido'}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <AddressInputField
                      value={value || ''}
                      onChange={onChange}
                      placeholder={t('form.address')}
                      error={!!errors.address}
                    />
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {locale === 'en' ? 'Address is required' : 'La dirección es requerida'}
                  </p>
                )}
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
                  ? 'No purchase required. Free assessment includes air quality testing and personalized recommendations.'
                  : 'No se requiere compra. La evaluación gratuita incluye pruebas de calidad del aire y recomendaciones personalizadas.'
                }
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
