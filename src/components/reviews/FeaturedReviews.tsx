import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, Award, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';

// Sample data (replace with real data from API)
const featuredReviews = [
  {
    id: 1,
    book: "The Midnight Library",
    author: "Matt Haig",
    reviewer: "Emma Thompson",
    reviewerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80",
    rating: 4.8,
    likes: 342,
    comments: 56,
    sentiment: "positive",
    aiTags: ["#Inspiring", "#LifeChanging", "#Philosophical"],
    content: "A beautiful exploration of life's infinite possibilities. This book made me reflect deeply on my own choices and the paths not taken.",
    badges: ["Top Reviewer", "Verified Reader"],
    isAiRecommended: true
  },
  {
    id: 2,
    book: "Project Hail Mary",
    author: "Andy Weir",
    reviewer: "James Wilson",
    reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80",
    rating: 4.9,
    likes: 287,
    comments: 43,
    sentiment: "positive",
    aiTags: ["#SciFi", "#PageTurner", "#Brilliant"],
    content: "An absolute masterpiece of science fiction! The perfect blend of scientific accuracy and engaging storytelling.",
    badges: ["Sci-Fi Expert"],
    isAiRecommended: true
  },
  {
    id: 3,
    book: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    reviewer: "Sophie Chen",
    reviewerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80",
    rating: 4.7,
    likes: 256,
    comments: 38,
    sentiment: "positive",
    aiTags: ["#AI", "#Emotional", "#Thought-provoking"],
    content: "A haunting and beautiful meditation on what it means to be human, told through the unique perspective of an artificial friend.",
    badges: ["Literary Critic"],
    isAiRecommended: true
  }
];

const FeaturedReviews = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-300' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            Featured Reviews
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto text-lg`}>
            Discover top-rated reviews curated by our AI and community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredReviews.map((review, index) => (
            <Link
              key={review.id}
              href={`/reviews/${review.id}`}
              className="block transform transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  isDarkMode
                    ? 'bg-dark-200 hover:bg-dark-100'
                    : 'bg-white hover:bg-gray-50'
                } rounded-xl shadow-xl overflow-hidden h-full`}
              >
                {/* Review Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={review.reviewerImage}
                        alt={review.reviewer}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h3 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{review.reviewer}</h3>
                        <div className="flex items-center">
                          {review.badges.map((badge, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
                                isDarkMode
                                  ? 'bg-cyberpunk-blue/20 text-cyberpunk-blue'
                                  : 'bg-primary-100 text-primary-600'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.isAiRecommended && (
                      <div className={`flex items-center px-2 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-cyberpunk-purple/20 text-cyberpunk-purple'
                          : 'bg-primary-100 text-primary-600'
                      }`}>
                        <Sparkles size={14} className="mr-1" />
                        <span className="text-xs">AI Pick</span>
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="mb-4">
                    <h4 className={`font-bold text-lg ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{review.book}</h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>by {review.author}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(review.rating)
                              ? isDarkMode
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-primary-500 fill-primary-500'
                              : isDarkMode
                                ? 'text-gray-600'
                                : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`ml-2 text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{review.rating}</span>
                  </div>

                  {/* Review Content */}
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{review.content}</p>

                  {/* AI Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.aiTags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode
                            ? 'bg-dark-300 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ThumbsUp size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      } />
                      <span className={`ml-1 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{review.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      } />
                      <span className={`ml-1 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{review.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/reviews/all"
            className={`inline-block px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
            }`}
          >
            View All Reviews
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedReviews; 