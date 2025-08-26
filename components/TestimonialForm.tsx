'use client';

import { useState } from 'react';
import { X, Upload, Star, Video, Image as ImageIcon, Type } from 'lucide-react';

interface TestimonialFormProps {
  onClose: () => void;
  onSubmit: (testimonial: any) => void;
  editingTestimonial?: any;
}

export default function TestimonialForm({ onClose, onSubmit, editingTestimonial }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    type: editingTestimonial?.fields?.Type || 'text',
    content: editingTestimonial?.fields?.Content || '',
    author: editingTestimonial?.fields?.Author || '',
    location: editingTestimonial?.fields?.Location || '',
    rating: editingTestimonial?.fields?.Rating || 5,
    videoUrl: editingTestimonial?.fields?.['Video URL'] || '',
    imageUrl: editingTestimonial?.fields?.['Image URL'] || '',
    tiktokUrl: editingTestimonial?.fields?.['TikTok URL'] || '',
    date: editingTestimonial?.fields?.Date || new Date().toISOString().split('T')[0],
    isApproved: editingTestimonial?.fields?.['Is Approved'] || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process TikTok URL to embed format
      let processedData = { ...formData };
      if (formData.tiktokUrl && formData.type === 'video') {
        processedData.videoUrl = convertTikTokToEmbed(formData.tiktokUrl);
      }

      if (editingTestimonial) {
        await onSubmit({ id: editingTestimonial.id, ...processedData });
      } else {
        await onSubmit(processedData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to submit testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertTikTokToEmbed = (url: string) => {
    // Convert TikTok URLs to embed format
    if (url.includes('tiktok.com')) {
      // Extract video ID from various TikTok URL formats
      const videoIdMatch = url.match(/\/video\/(\d+)/);
      if (videoIdMatch) {
        return `https://www.tiktok.com/embed/v2/${videoIdMatch[1]}`;
      }
    }
    return url; // Return original if not a TikTok URL or can't parse
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'text', icon: Type, label: 'Text Review' },
                  { value: 'video', icon: Video, label: 'Video' },
                  { value: 'image', icon: ImageIcon, label: 'Image' }
                ].map(({ value, icon: Icon, label }) => (
                  <label key={value} className="relative">
                    <input
                      type="radio"
                      name="type"
                      value={value}
                      checked={formData.type === value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${
                      formData.type === value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${
                        formData.type === value ? 'text-blue-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        formData.type === value ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.type === 'text' ? 'Review Content' : 'Description'}
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={formData.type === 'text' ? 'Enter the customer review...' : 'Brief description of the video/image...'}
                required
              />
            </div>

            {/* Author & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Phoenix, AZ"
                />
              </div>
            </div>

            {/* Rating (for text reviews) */}
            {formData.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Video URL (for video type) */}
            {formData.type === 'video' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    name="tiktokUrl"
                    value={formData.tiktokUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.tiktok.com/@username/video/1234567890"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste the TikTok video URL here. It will be automatically converted to an embed.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Video URL (YouTube, Vimeo, etc.)
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  />
                </div>
              </div>
            )}

            {/* Image URL (for image type) */}
            {formData.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Approval Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isApproved"
                checked={formData.isApproved}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Approved for public display
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : editingTestimonial ? 'Update' : 'Add'} Testimonial
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
