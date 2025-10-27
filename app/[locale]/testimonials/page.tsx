'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import TikTokEmbed from '@/components/TikTokEmbed';
import { ExternalLink, Play, MessageSquare } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface Testimonial {
  id: string;
  fields: {
    'Type': string;
    'Content': string;
    'Author': string;
    'Location'?: string;
    'Rating'?: number;
    'Video URL'?: string;
    'Image URL'?: string;
    'TikTok URL'?: string;
    'Date': string;
    'Is Approved': boolean;
  };
}

export default function TestimonialsPage() {
  const t = useTranslations('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      // Only show approved testimonials on the public page
      const approvedTestimonials = (data.records || []).filter(
        (testimonial: Testimonial) => testimonial.fields['Is Approved']
      );
      setTestimonials(approvedTestimonials);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert Airtable testimonials to carousel format
  const convertToCarouselFormat = (testimonials: Testimonial[]) => {
    return testimonials.map(testimonial => ({
      id: testimonial.id,
      type: testimonial.fields.Type as 'text' | 'video' | 'image',
      content: testimonial.fields.Content,
      author: testimonial.fields.Author,
      location: testimonial.fields.Location,
      rating: testimonial.fields.Rating,
      videoUrl: testimonial.fields['Video URL'],
      imageUrl: testimonial.fields['Image URL'],
      tiktokUrl: testimonial.fields['TikTok URL'],
      date: new Date(testimonial.fields.Date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    }));
  };

  // Separate testimonials by type
  const textReviews = convertToCarouselFormat(
    testimonials.filter(t => t.fields.Type === 'text')
  );
  const videoReviews = convertToCarouselFormat(
    testimonials.filter(t => t.fields.Type === 'video')
  );
  const imageReviews = convertToCarouselFormat(
    testimonials.filter(t => t.fields.Type === 'image')
  );

  // Fallback sample testimonials if no data is available
  const sampleTextReviews = [
    {
      id: '1',
      type: 'text' as const,
      content: 'The Delphin system completely transformed our home. My daughter\'s allergies have improved dramatically since we started using it. The air feels so much cleaner and fresher.',
      author: 'Sarah Johnson',
      location: 'Phoenix, AZ',
      rating: 5,
      date: 'March 2024'
    },
    {
      id: '2',
      type: 'text' as const,
      content: 'I was skeptical at first, but after the demonstration I was amazed. The water in the basin was completely black from all the particles it captured from our "clean" home. We bought one immediately.',
      author: 'Michael Chen',
      location: 'Los Angeles, CA',
      rating: 5,
      date: 'February 2024'
    },
    {
      id: '3',
      type: 'text' as const,
      content: 'Best investment we\'ve made for our family\'s health. The difference in air quality is noticeable immediately. Our whole family sleeps better now.',
      author: 'Maria Rodriguez',
      location: 'Dallas, TX',
      rating: 5,
      date: 'January 2024'
    }
  ];

  const sampleVideoReviews = [
    {
      id: 'v1',
      type: 'video' as const,
      content: 'Customer video testimonial',
      author: 'John Smith',
      location: 'Denver, CO',
      videoUrl: '', // You can add actual video URLs here
      date: 'March 2024'
    },
    {
      id: 'v2',
      type: 'video' as const,
      content: 'Family testimonial',
      author: 'The Williams Family',
      location: 'Seattle, WA',
      videoUrl: '', // You can add actual video URLs here
      date: 'February 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Content */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : (
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {/* Customer Reviews */}
            {textReviews.length > 0 && (
              <div>
                <TestimonialCarousel items={textReviews} title="Customer Reviews" />
              </div>
            )}

            {/* Video Testimonials */}
            {videoReviews.length > 0 && (
              <div>
                <TestimonialCarousel items={videoReviews} title="Video Testimonials" />
              </div>
            )}

            {/* Image Testimonials */}
            {imageReviews.length > 0 && (
              <div>
                <TestimonialCarousel items={imageReviews} title="Image Reviews" />
              </div>
            )}

            {/* TikTok Videos Section */}
            {testimonials.some(t => t.fields['TikTok URL']) && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">TikTok Reviews</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {testimonials
                    .filter(t => t.fields['TikTok URL'])
                    .map(testimonial => (
                      <div key={testimonial.id} className="text-center">
                        <TikTokEmbed 
                          url={testimonial.fields['TikTok URL']!} 
                          className="mx-auto mb-4"
                        />
                        <h4 className="font-semibold text-gray-900">{testimonial.fields.Author}</h4>
                        {testimonial.fields.Location && (
                          <p className="text-sm text-gray-600">{testimonial.fields.Location}</p>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* Fallback to sample data if no testimonials */}
            {testimonials.length === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <TestimonialCarousel items={sampleTextReviews} title="Customer Reviews" />
                </div>
                <div>
                  <TestimonialCarousel items={sampleVideoReviews} title="Video Testimonials" />
                </div>
              </div>
            )}

          </div>
          )}
        </div>
      </section>

      {/* TikTok CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <TikTokIcon className="w-12 h-12" />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">@DelphinCleanAir</h3>
            <p className="text-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Follow us for daily air quality tips, product demonstrations, and behind-the-scenes content. 
              See real Delphin demonstrations and learn how to improve your indoor air quality naturally.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://tiktok.com/@DelphinCleanAir"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-pink-600 font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-pink-50 transition-colors duration-200 flex items-center justify-center touch-manipulation text-sm sm:text-base"
              >
                <TikTokIcon className="w-5 h-5 mr-2" />
                {t('watchOnTiktok')}
              </a>
              <a
                href="https://beacons.ai/delphincleanair"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center justify-center touch-manipulation text-sm sm:text-base"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                All Our Links
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
