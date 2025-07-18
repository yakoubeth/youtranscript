'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import DownloadDropdown from './DownloadDropdown';

export default function TranscriptTool() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError('');
    setVideoInfo(null);
    setTranscript('');

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock data - replace with actual API response
      setVideoInfo({
        title: "Building Modern Web Applications with Next.js 15",
        channel: "TechMaster Pro",
        duration: "28:45",
        views: "2.1M",
        publishedAt: "3 days ago",
        thumbnail: "/api/placeholder/480/270"
      });
      
      setTranscript(`[00:00] Welcome to this comprehensive tutorial on building modern web applications with Next.js 15. Today we'll explore the latest features and best practices that will help you create amazing user experiences.

[00:15] First, let's talk about the new App Router architecture. This revolutionary approach to routing in Next.js provides better performance, enhanced developer experience, and more intuitive file organization.

[00:35] We'll start by setting up a new project using the latest create-next-app command. This will give us a solid foundation with all the modern tools and configurations we need.

[00:52] The App Router introduces several powerful concepts like layouts, loading states, and error boundaries. These features make it incredibly easy to build robust, production-ready applications.

[01:08] Server Components are another game-changing feature. They allow us to render components on the server, reducing client-side JavaScript and improving performance significantly.

[01:25] We'll also explore Client Components and understand when to use each type for optimal performance and user experience.

[01:42] Throughout this tutorial, we'll be building a real-world application that demonstrates these concepts in action. You'll learn how to implement authentication, database integration, and deployment strategies.

[02:00] Let's dive into the code and start building something amazing together. Make sure to follow along and ask questions in the comments section below.`);
    } catch (err) {
      setError('Failed to extract transcript. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (format: 'txt' | 'md' | 'json' | 'srt') => {
    if (!transcript) return;

    let content = '';
    let mimeType = '';
    let filename = '';

    switch (format) {
      case 'txt':
        content = transcript;
        mimeType = 'text/plain';
        filename = 'transcript.txt';
        break;
      case 'md':
        content = `# ${videoInfo?.title || 'YouTube Transcript'}\n\n**Channel:** ${videoInfo?.channel}\n**Duration:** ${videoInfo?.duration}\n**Views:** ${videoInfo?.views}\n\n## Transcript\n\n${transcript}`;
        mimeType = 'text/markdown';
        filename = 'transcript.md';
        break;
      case 'json':
        content = JSON.stringify({
          video: videoInfo,
          transcript: transcript,
          extractedAt: new Date().toISOString()
        }, null, 2);
        mimeType = 'application/json';
        filename = 'transcript.json';
        break;
      case 'srt':
        // Convert to SRT format
        const lines = transcript.split('\n');
        let srtContent = '';
        let counter = 1;
        
        lines.forEach(line => {
          if (line.startsWith('[') && line.includes(']')) {
            const timestamp = line.match(/\[(.*?)\]/)?.[1];
            const text = line.replace(/\[.*?\]\s*/, '');
            if (timestamp && text) {
              srtContent += `${counter}\n`;
              srtContent += `00:${timestamp.padStart(5, '0')},000 --> 00:${timestamp.padStart(5, '0')},000\n`;
              srtContent += `${text}\n\n`;
              counter++;
            }
          }
        });
        
        content = srtContent;
        mimeType = 'text/srt';
        filename = 'transcript.srt';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!transcript) return;
    
    try {
      await navigator.clipboard.writeText(transcript);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Try It Now
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Paste any YouTube URL and get an instant transcript
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  YouTube URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="youtube-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 text-lg"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                  <span className="text-lg">{isLoading ? 'Extracting Transcript...' : 'Extract Transcript'}</span>
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* Video Info */}
        {videoInfo && (
          <div className="mb-8 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-40 h-28 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{videoInfo.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{videoInfo.channel}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {videoInfo.duration}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {videoInfo.views}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {videoInfo.publishedAt}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Transcript</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </button>
                    <DownloadDropdown onDownload={handleDownload} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {transcript.split('\n').map((line, index) => (
                      <div key={index} className="flex space-x-4">
                        {line.startsWith('[') && line.includes(']') ? (
                          <>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono font-medium min-w-[60px]">
                              {line.match(/\[(.*?)\]/)?.[1]}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {line.replace(/\[.*?\]\s*/, '')}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-16">
                            {line}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
