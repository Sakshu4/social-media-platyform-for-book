import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, Brain, Sparkles } from 'lucide-react';

interface AiBookListProps {
  emotion: string;
}

// Sample data - in production this would come from an API
const bookRecommendations = {
  happy: [
    {
      id: 1,
      title: "The House in the Cerulean Sea",
      author: "TJ Klune",
      cover: "/images/books/cerulean-sea.jpg",
      rating: 4.8,
      aiInsight: "This heartwarming tale matches your upbeat mood with its whimsical charm and joyful narrative.",
      matchScore: 98,
    },
    // Add more books...
  ],
  inspired: [
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/images/books/atomic-habits.jpg",
      rating: 4.9,
      aiInsight: "Perfect for your inspired state - practical strategies for transformation and growth.",
      matchScore: 95,
    },
    // Add more books...
  ],
  // Add more emotions...
};

export default function AiBookList({ emotion }: AiBookListProps) {
  const { isDarkMode } = useTheme();
  const books = bookRecommendations[emotion as keyof typeof bookRecommendations] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl ${
              isDarkMode ? 'bg-dark-600' : 'bg-white'
            } shadow-xl hover:shadow-2xl transition-shadow duration-300`}
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm" />

            <div className="relative p-6">
              {/* Book Cover */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/60 rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">{book.rating}</span>
                </div>
              </div>

              {/* Book Info */}
              <h3 className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {book.title}
              </h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                by {book.author}
              </p>

              {/* AI Insight */}
              <div className={`p-4 rounded-xl mb-4 ${
                isDarkMode ? 'bg-dark-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-start space-x-2">
                  <Brain className="w-5 h-5 text-primary-500 mt-1" />
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {book.aiInsight}
                  </p>
                </div>
              </div>

              {/* Match Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-secondary-500" />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {book.matchScore}% Match
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors duration-300"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 