import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-7 h-7 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  YouTranscript
                </h3>
                <p className="text-gray-400 text-sm font-medium">AI-Powered YouTube Transcription</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-lg text-lg leading-relaxed">
              Transform YouTube videos into accurate, searchable transcripts with AI. 
              <span className="text-white font-medium">Start your 14-day free trial</span> and join thousands of creators saving hours every week.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">15M+</div>
                <div className="text-sm text-gray-400">Videos Processed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="group p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="group p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="group p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links & CTA */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#pricing" className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center group">
                    <span>Pricing Plans</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center group">
                    <span>Sign In</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-200 hover:text-white transition-colors duration-200 flex items-center group">
                    <span>Support</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-3">Ready to get started?</h4>
              <p className="text-gray-400 text-sm mb-4">Start your free trial today and transform your content workflow.</p>
              <Link href="/signup">
                <button className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all duration-200">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 YouTranscript. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
