'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Up to 5 transcripts per month',
        'Basic transcript extraction',
        'Download in TXT format',
        'Standard processing speed',
        'Community support',
        'Basic timestamps'
      ],
      limitations: [
        'Videos up to 10 minutes',
        'No AI features'
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      description: 'For content creators and professionals',
      price: { monthly: 19, yearly: 190 },
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
        'API access'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'blue'
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: { monthly: 99, yearly: 990 },
      features: [
        'Everything in Pro',
        'Advanced AI content analysis',
        'Sentiment analysis of transcripts',
        'Multi-language translation',
        'Custom AI model training',
        'Team collaboration tools',
        'Advanced analytics dashboard',
        'White-label solutions',
        'Dedicated account manager',
        'SLA guarantee (99.9% uptime)',
        'Custom integrations',
        'Advanced security & compliance'
      ],
      limitations: [],
      cta: 'Contact Sales',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your transcription needs. Upgrade or downgrade at any time.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border-2 bg-white dark:bg-gray-800 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
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
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/signup">
                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : plan.name === 'Free'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}>
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Advanced Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Advanced AI
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Unlock the full potential of your content with our cutting-edge AI features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can cancel your subscription at any time. No questions asked.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What languages do you support?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                We support 100+ languages with high accuracy transcription and translation.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How accurate are the transcripts?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI achieves 95-99% accuracy depending on audio quality and language.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
