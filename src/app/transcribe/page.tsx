'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import YouTubeInput from '@/components/YouTubeInput';
import { YouTubeVideoInfo } from '@/lib/youtube';

export default function TranscribePage() {
  const { status } = useSession();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleVideoSelect = async (videoInfo: YouTubeVideoInfo) => {
    setError('');
    setSelectedVideo(videoInfo);
    
    // Validate with server
    try {
      const response = await fetch('/api/transcribe/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: `https://www.youtube.com/watch?v=${videoInfo.id}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Validation failed');
        setSelectedVideo(null);
        return;
      }

      console.log('Video validated successfully:', data);
    } catch {
      setError('Failed to validate video. Please try again.');
      setSelectedVideo(null);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSelectedVideo(null);
  };

  const handleStartTranscription = async () => {
    if (!selectedVideo) return;
    
    setIsProcessing(true);
    setError('');

    try {
      // TODO: Implement actual transcription logic
      console.log('Starting transcription for:', selectedVideo);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, show success message
      alert('Transcription feature coming soon! Video validated successfully.');
      
    } catch {
      setError('Failed to start transcription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">YouTranscript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Transcription
            </h1>
            <p className="text-gray-600">
              Enter a YouTube URL to generate an accurate transcript with AI-powered features.
            </p>
          </div>

          {/* YouTube URL Input */}
          <div className="mb-8">
            <YouTubeInput
              onVideoSelect={handleVideoSelect}
              onError={handleError}
              disabled={isProcessing}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Video Selected - Action Panel */}
          {selectedVideo && !error && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Transcribe
              </h2>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {selectedVideo.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{selectedVideo.channel}</span>
                      <span>•</span>
                      <span>
                        {selectedVideo.duration > 0 
                          ? `${Math.floor(selectedVideo.duration / 60)}:${(selectedVideo.duration % 60).toString().padStart(2, '0')}` 
                          : 'Duration unavailable'
                        }
                      </span>
                      {selectedVideo.viewCount && (
                        <>
                          <span>•</span>
                          <span>{selectedVideo.viewCount.toLocaleString()} views</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleStartTranscription}
                    disabled={isProcessing}
                    className={`
                      px-6 py-3 rounded-lg font-medium transition-colors
                      ${isProcessing 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                      }
                    `}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Start Transcription'
                    )}
                  </button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-gray-900">Accurate Transcript</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    AI-powered speech recognition with punctuation and formatting.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-medium text-gray-900">Multiple Formats</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Export as TXT, SRT, or JSON with timestamps and metadata.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium text-gray-900">Fast Processing</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Real-time progress tracking with estimated completion time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
