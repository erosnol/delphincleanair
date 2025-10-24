'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialItem {
  id: string;
  type: 'text' | 'video' | 'image';
  content: string;
  author: string;
  location?: string;
  rating?: number;
  videoUrl?: string;
  imageUrl?: string;
  date?: string;
}

interface TestimonialCarouselProps {
  items: TestimonialItem[];
  title: string;
  autoPlay?: boolean;
  showDots?: boolean;
}

export default function TestimonialCarousel({ 
  items, 
  title, 
  autoPlay = true, 
  showDots = true 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderTestimonialContent = (item: TestimonialItem) => {
    switch (item.type) {
      case 'video':
        return (
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
            {item.videoUrl ? (
              <iframe
                src={item.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Play className="w-16 h-16 text-white opacity-70" />
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="relative">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={`Review by ${item.author}`}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            ) : (
              <div className="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center">
                <Quote className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        );

      default: // text
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg border">
            <Quote className="w-8 h-8 text-blue-600 mb-4" />
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              "{item.content}"
            </p>
            {item.rating && (
              <div className="flex items-center mb-4">
                {renderStars(item.rating)}
              </div>
            )}
          </div>
        );
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No testimonials available yet.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for customer reviews!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h3>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="max-w-4xl mx-auto">
              {renderTestimonialContent(items[currentIndex])}
              
              {/* Author Info */}
              <div className="text-center mt-6">
                <h4 className="font-semibold text-gray-900 text-lg">
                  {items[currentIndex].author}
                </h4>
                {items[currentIndex].location && (
                  <p className="text-gray-600">
                    {items[currentIndex].location}
                  </p>
                )}
                {items[currentIndex].date && (
                  <p className="text-gray-400 text-sm mt-1">
                    {items[currentIndex].date}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Toggle */}
      {items.length > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {isPlaying ? 'Pause' : 'Play'} Slideshow
          </button>
        </div>
      )}
    </div>
  );
}
