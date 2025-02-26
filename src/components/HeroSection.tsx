'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      isDarkMode ? 'bg-gradient-to-br from-dark-300 via-dark-400 to-dark-500' : 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80')] bg-cover bg-center"
        />
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-dark-300/90 via-dark-400/90 to-dark-500/90' 
            : 'bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-gray-900/90'
        } backdrop-blur-sm`} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Discover Your Next
            <span className={`block text-transparent bg-clip-text ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-400 to-purple-400'
            }`}>
              Great Adventure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join our community of passionate readers. Share reviews, discover new books,
            and connect with fellow book lovers around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button 
              size="lg"
              className={`${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              } transform hover:scale-105 transition-all duration-300`}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={`border-2 ${
                isDarkMode
                  ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10'
                  : 'border-blue-500 text-blue-400 hover:bg-blue-500/10'
              } transform hover:scale-105 transition-all duration-300`}
            >
              Browse Books
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto"
          >
            {[
              { number: '10K+', label: 'Active Readers' },
              { number: '50K+', label: 'Book Reviews' },
              { number: '1K+', label: 'Book Clubs' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${
          isDarkMode
            ? 'from-dark-500/50'
            : 'from-black/50'
        } to-transparent pointer-events-none`}
      />
    </div>
  );
};

export default HeroSection; 