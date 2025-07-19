/**
 * YouTube URL Input Component
 * Provides real-time validation and video preview
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { YouTubeVideoInfo, formatDuration } from '@/lib/youtube';
import { validateAndFetchVideo } from '@/lib/youtube-client';

interface YouTubeInputProps {
  onVideoSelect: (videoInfo: YouTubeVideoInfo) => void;
  onError: (error: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function YouTubeInput({
  onVideoSelect,
  onError,
  disabled = false,
  placeholder = 'Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)'
}: YouTubeInputProps) {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
  } | null>(null);
  const [videoPreview, setVideoPreview] = useState<YouTubeVideoInfo | null>(null);

  // Use refs to store the latest callback functions to avoid dependencies
  const onVideoSelectRef = useRef(onVideoSelect);
  const onErrorRef = useRef(onError);
  const isValidatingRef = useRef(false);
  
  // Update refs when props change
  useEffect(() => {
    onVideoSelectRef.current = onVideoSelect;
    onErrorRef.current = onError;
  }, [onVideoSelect, onError]);

  // Debounced validation
  useEffect(() => {
    if (!url.trim()) {
      setValidationResult(null);
      setVideoPreview(null);
      return;
    }

    // Prevent multiple validations running simultaneously
    if (isValidatingRef.current) {
      return;
    }

    const validateCurrentUrl = async (inputUrl: string) => {
      if (isValidatingRef.current) {
        return;
      }

      isValidatingRef.current = true;
      setIsValidating(true);
      setValidationResult(null);
      setVideoPreview(null);

      try {
        const result = await validateAndFetchVideo(inputUrl);
        
        if (!result.isValid) {
          setValidationResult({ isValid: false, error: result.error });
          onErrorRef.current(result.error || 'Invalid URL');
          return;
        }

        if (!result.videoInfo) {
          setValidationResult({ 
            isValid: false, 
            error: 'Could not fetch video information. Please check if the video exists and is publicly available.' 
          });
          onErrorRef.current('Could not fetch video information');
          return;
        }

        setValidationResult({ isValid: true });
        setVideoPreview(result.videoInfo);
        onVideoSelectRef.current(result.videoInfo);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Validation failed';
        setValidationResult({ isValid: false, error: errorMessage });
        onErrorRef.current(errorMessage);
      } finally {
        isValidatingRef.current = false;
        setIsValidating(false);
      }
    };

    const timeoutId = setTimeout(async () => {
      await validateCurrentUrl(url);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      isValidatingRef.current = false;
    };
  }, [url]); // Only depend on url

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && videoPreview) {
      onVideoSelect(videoPreview);
    }
  };

  const getInputBorderColor = () => {
    if (isValidating) return 'border-yellow-300';
    if (validationResult?.isValid) return 'border-green-500';
    if (validationResult?.error) return 'border-red-500';
    return 'border-gray-300';
  };

  const getStatusIcon = () => {
    if (isValidating) {
      return (
        <div className="animate-spin h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
      );
    }
    if (validationResult?.isValid) {
      return (
        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (validationResult?.error) {
      return (
        <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-4">
      {/* URL Input */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700">
          YouTube Video URL
        </label>
        <div className="relative">
          <input
            id="youtube-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500
              ${getInputBorderColor()} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getStatusIcon()}
          </div>
        </div>
        
        {/* Validation Error */}
        {validationResult?.error && (
          <p className="text-sm text-red-600 flex items-center space-x-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{validationResult.error}</span>
          </p>
        )}
      </form>

      {/* Video Preview */}
      {videoPreview && validationResult?.isValid && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-start space-x-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <Image
                src={videoPreview.thumbnail}
                alt={videoPreview.title}
                width={96}
                height={72}
                className="w-24 h-18 object-cover rounded-lg"
                onError={() => {
                  // Note: Next.js Image component handles errors differently
                  console.warn('Thumbnail failed to load for video:', videoPreview.id);
                }}
              />
            </div>
            
            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {videoPreview.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {videoPreview.channel}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {videoPreview.duration > 0 ? formatDuration(videoPreview.duration) : 'Duration unavailable'}
                </span>
                {videoPreview.viewCount && (
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {videoPreview.viewCount.toLocaleString()} views
                  </span>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Valid
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Supported Formats Help */}
      <div className="text-xs text-gray-500">
        <p className="font-medium mb-1">Supported URL formats:</p>
        <ul className="space-y-0.5 ml-2">
          <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>• https://youtu.be/VIDEO_ID</li>
          <li>• https://www.youtube.com/embed/VIDEO_ID</li>
        </ul>
      </div>
    </div>
  );
}
