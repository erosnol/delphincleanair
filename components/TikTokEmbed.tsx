'use client';

import { useState, useEffect } from 'react';

interface TikTokEmbedProps {
  url: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function TikTokEmbed({ url, width = 325, height = 580, className = '' }: TikTokEmbedProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const convertToEmbedUrl = (tiktokUrl: string) => {
      try {
        // Handle different TikTok URL formats
        let videoId = '';
        
        // Format: https://www.tiktok.com/@username/video/1234567890
        const videoMatch = tiktokUrl.match(/\/video\/(\d+)/);
        if (videoMatch) {
          videoId = videoMatch[1];
        }
        
        // Format: https://vm.tiktok.com/ZMxxx (short URL)
        else if (tiktokUrl.includes('vm.tiktok.com')) {
          // For short URLs, we'll use the original URL as TikTok will handle the redirect
          setEmbedUrl(`https://www.tiktok.com/embed/v2/${tiktokUrl.split('/').pop()}`);
          setIsLoading(false);
          return;
        }
        
        // Format: https://www.tiktok.com/t/ZTxxx (another short format)
        else if (tiktokUrl.includes('/t/')) {
          const shortCode = tiktokUrl.split('/t/')[1]?.split('?')[0];
          if (shortCode) {
            setEmbedUrl(`https://www.tiktok.com/embed/v2/${shortCode}`);
            setIsLoading(false);
            return;
          }
        }

        if (videoId) {
          setEmbedUrl(`https://www.tiktok.com/embed/v2/${videoId}`);
        } else {
          setError('Invalid TikTok URL format');
        }
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to process TikTok URL');
        setIsLoading(false);
      }
    };

    if (url) {
      convertToEmbedUrl(url);
    }
  }, [url]);

  if (isLoading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading TikTok...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <p className="text-sm text-gray-600 mb-2">Failed to load TikTok video</p>
          <p className="text-xs text-gray-500">{error}</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-xs underline mt-2 inline-block"
          >
            View on TikTok
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        className="rounded-lg"
        title="TikTok Video"
        loading="lazy"
      />
    </div>
  );
}
