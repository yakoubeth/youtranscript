export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "TechReview Channel",
      avatar: "SJ",
      content: "YouTranscript has revolutionized my workflow. I can now create blog posts from my videos in minutes instead of hours. The accuracy is incredible!",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "Researcher",
      company: "Stanford University",
      avatar: "MC",
      content: "As a researcher, I need accurate transcripts for my interviews. YouTranscript delivers 99% accuracy with perfect timestamps. It's a game-changer.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Podcast Producer",
      company: "Digital Media Co.",
      avatar: "ER",
      content: "The multiple export formats are perfect for our production pipeline. We use SRT for subtitles and Markdown for show notes. Absolutely love it!",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Marketing Manager",
      company: "StartupTech",
      avatar: "DK",
      content: "We use YouTranscript for all our webinar transcripts. The speaker identification feature saves us hours of manual work. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Loved by Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See what our users are saying about YouTranscript
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join 50,000+ Happy Users
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start transcribing your YouTube videos today
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
