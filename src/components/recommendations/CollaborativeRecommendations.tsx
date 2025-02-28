import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Users, TrendingUp, BookOpen, Star } from 'lucide-react';

// Sample data - in production this would come from an API
const similarReaders = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/images/avatars/sarah.jpg",
    matchScore: 92,
    recentlyRead: [
      {
        id: 1,
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "/images/books/hail-mary.jpg",
        rating: 4.9
      }
    ]
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "/images/avatars/marcus.jpg",
    matchScore: 88,
    recentlyRead: [
      {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        cover: "/images/books/dune.jpg",
        rating: 4.8
      }
    ]
  }
];

export default function CollaborativeRecommendations() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-700' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-primary-500" />
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Readers Like You
            </h2>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover books through readers who share your taste
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {similarReaders.map((reader, index) => (
            <motion.div
              key={reader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl ${
                isDarkMode ? 'bg-dark-600' : 'bg-gray-50'
              } shadow-xl`}
            >
              {/* Reader Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={reader.avatar}
                    alt={reader.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {reader.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {reader.matchScore}% reading match
                  </p>
                </div>
              </div>

              {/* Recently Read Books */}
              <div className="space-y-4">
                <h4 className={`text-lg font-medium flex items-center space-x-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  <span>Recently Read</span>
                </h4>

                {reader.recentlyRead.map(book => (
                  <motion.div
                    key={book.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl ${
                      isDarkMode ? 'bg-dark-700' : 'bg-white'
                    } shadow-md`}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h5 className={`font-medium mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {book.title}
                      </h5>
                      <p className={`text-sm mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        by {book.author}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {book.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View Profile Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 p-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>View Full Profile</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 