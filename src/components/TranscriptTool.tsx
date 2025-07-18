'use client';

import Link from 'next/link';

export default function TranscriptTool() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch how our platform transforms YouTube content into powerful, searchable resources
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Watch Demo Video</h3>
                  <p className="text-gray-300 text-sm">See how easy it is to transcribe and analyze YouTube content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Paste YouTube URL</h4>
              <p className="text-gray-600 dark:text-gray-300">Simply copy and paste any YouTube video URL into our dashboard</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">AI Processing</h4>
              <p className="text-gray-600 dark:text-gray-300">Our advanced AI extracts and processes the audio with 99% accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Get Results</h4>
              <p className="text-gray-600 dark:text-gray-300">Download, chat with AI, or get summaries in multiple formats</p>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why Choose Our Platform?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Manual Transcription
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Hours of manual typing</li>
                <li>• Prone to errors and mistakes</li>
                <li>• No timestamps or formatting</li>
                <li>• Limited to basic text output</li>
                <li>• No AI analysis capabilities</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Our AI Platform
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Transcripts ready in under 60 seconds</li>
                <li>• 95-99% accuracy with AI processing</li>
                <li>• Automatic timestamps and speaker ID</li>
                <li>• Multiple export formats (TXT, MD, JSON, SRT)</li>
                <li>• Chat with transcripts & get AI summaries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Single CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Content?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who save hours every week with our AI-powered transcription platform.
          </p>
          
          <Link href="/signup">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl">
              <span className="relative z-10 flex items-center">
                Get Started for Free
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </Link>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
}
