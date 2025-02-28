import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ClubHero = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-dark-400/90 via-dark-300/90 to-dark-400/90'
            : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'
        }`} />
        
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className={`absolute ${
                isDarkMode ? 'bg-cyberpunk-gradient' : 'bg-primary-500'
              } rounded-full blur-3xl`}
              style={{
                width: '40%',
                height: '40%',
                left: `${index * 30}%`,
                top: `${index * 20}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: index * 2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-4xl sm:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Join a Community of Book Lovers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Discover book clubs that match your interests, join discussions,
            and connect with readers worldwide
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`relative max-w-2xl mx-auto mb-8 ${
              isDarkMode ? 'glass-dark' : 'glass'
            } rounded-2xl p-1`}
          >
            <div className="flex items-center">
              <Search className={`w-6 h-6 ml-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search for book clubs..."
                className={`w-full px-4 py-3 bg-transparent border-none focus:outline-none ${
                  isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl font-medium flex items-center space-x-2 ${
                isDarkMode
                  ? 'bg-cyberpunk-blue text-white hover:bg-cyberpunk-blue/90'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              } transition-colors duration-300`}
            >
              <Users className="w-5 h-5" />
              <span>Find Clubs</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl font-medium flex items-center space-x-2 ${
                isDarkMode
                  ? 'bg-dark-600 text-white hover:bg-dark-500'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              } transition-colors duration-300 shadow-lg`}
            >
              <Plus className="w-5 h-5" />
              <span>Create Club</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubHero; 