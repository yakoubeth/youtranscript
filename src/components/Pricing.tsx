'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free Trial',
      description: '14-day trial to get started',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Up to 5 transcripts during trial',
        'Basic transcript extraction',
        'Copy transcript to clipboard',
        'Standard processing speed',
        'Community support',
        'Basic timestamps'
      ],
      limitations: [
        'Trial expires after 14 days',
        'Videos up to 10 minutes',
        'No download formats',
        'No AI features'
      ],
      cta: 'Start Free Trial',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      description: 'For content creators and professionals',
      price: { monthly: 10, yearly: 96 },
      features: [
        'Up to 100 transcripts per month',
        'Advanced transcript extraction',
        'All export formats (TXT, MD, JSON, SRT)',
        'Lightning-fast processing',
        'Speaker identification',
        'Priority support',
        'Advanced timestamps with confidence scores',
        'Bulk processing',
        'Videos up to 2 hours'
      ],
      limitations: [
        'No AI chat features',
        'No AI summarization'
      ],
      cta: 'Start Pro Plan',
      popular: true,
      color: 'blue'
    },
    {
      name: 'Ultra',
      description: 'Ultimate AI-powered experience',
      price: { monthly: 25, yearly: 240 },
      features: [
        'Unlimited transcripts',
        'AI-powered transcript summarization',
        'Chat with your transcripts using AI',
        'All export formats (TXT, MD, JSON, SRT)',
        'Lightning-fast processing',
        'Speaker identification',
        'Custom vocabulary training',
        'Priority support',
        'Advanced timestamps with confidence scores',
        'Bulk processing',
        'API access',
        'Unlimited video length',
        'Advanced AI content analysis'
      ],
      limitations: [],
      cta: 'Go Ultra',
      popular: false,
      color: 'purple'
    }
  ];

  const advancedFeatures = [
    {
      icon: '🤖',
      title: 'AI Summarization',
      description: 'Get intelligent summaries of your transcripts with key points highlighted'
    },
    {
      icon: '💬',
      title: 'Chat with Transcripts',
      description: 'Ask questions about your content and get instant AI-powered answers'
    },
    {
      icon: '🎯',
      title: 'Speaker Identification',
      description: 'Automatically identify different speakers in your audio content'
    },
    {
      icon: '📊',
      title: 'Content Analytics',
      description: 'Deep insights into your content performance and engagement metrics'
    },
    {
      icon: '🌍',
      title: 'Multi-language Support',
      description: 'Transcribe and translate content in 100+ languages'
    },
    {
      icon: '⚡',
      title: 'Real-time Processing',
      description: 'Lightning-fast transcription with enterprise-grade infrastructure'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6 animate-pulse">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💎 Choose Your Plan
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start with our free trial and upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} billing`}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border-2 bg-white dark:bg-gray-800 p-6 lg:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500 ring-4 ring-blue-500/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm lg:text-base">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600 dark:text-gray-300 ml-1 text-lg">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      💰 Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 transition-transform duration-200 group-hover:scale-110">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3 mt-0.5 transition-transform duration-200 group-hover:scale-110">
                      <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 leading-relaxed">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/signup">
                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : plan.name === 'Free'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                    : plan.name === 'Ultra'
                    ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 text-white hover:from-yellow-600 hover:via-yellow-700 hover:to-orange-600 shadow-yellow-200/50 hover:shadow-yellow-300/60'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700'
                }`}>
                  <span>{plan.cta}</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Advanced Features Section */}
        <div className="relative overflow-hidden mt-24">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 rounded-3xl"></div>
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            {/* Enhanced Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full mb-6 border border-blue-200/30 dark:border-blue-700/30">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🚀 NEXT-GENERATION AI FEATURES
                </span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Beyond Simple Transcription
                </span>
              </h3>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover how our advanced AI transforms your YouTube content into powerful, interactive knowledge bases
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:scale-105 overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon with enhanced styling */}
                    <div className="relative z-10 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-200/30 dark:border-blue-700/30">
                        <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Subtle shine effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 shadow-2xl">
                <h4 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Ready to Experience AI-Powered Transcription?
                </h4>
                <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                  Join thousands of creators who are already transforming their content workflow with our intelligent features
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/signup">
                    <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center group">
                      <span>Start Free Trial</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </Link>
                  <div className="text-white/80 text-sm">
                    ✨ 14 days free • No credit card required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
