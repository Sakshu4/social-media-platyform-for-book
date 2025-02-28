'use client';

import { motion } from 'framer-motion';
import { BookOpen, Star, Users, TrendingUp } from 'lucide-react';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${
      isDarkMode ? 'bg-dark-400' : 'bg-gray-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image with overlay */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80')] bg-cover bg-center"
        />

        {/* Animated gradient overlays */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-cyberpunk-purple/20 via-cyberpunk-blue/10 to-cyberpunk-pink/20' 
            : 'bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-pink-500/10'
        }`} />

        {/* Glassmorphism effect */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-dark-400/80 backdrop-blur-[8px]' 
            : 'bg-white/80 backdrop-blur-[8px]'
        }`} />

        {/* Animated grid background */}
        {isDarkMode && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#00FFFF05_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#00FFFF05_1px,transparent_1px)] bg-[size:40px_40px]" />
          </>
        )}

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${
            isDarkMode 
              ? 'bg-cyberpunk-purple/5 blur-3xl'
              : 'bg-primary-500/5 blur-3xl'
          }`}
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${
            isDarkMode 
              ? 'bg-cyberpunk-blue/5 blur-3xl'
              : 'bg-purple-500/5 blur-3xl'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Discover Your Next
                <span className={`block mt-2 ${
                  isDarkMode 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-blue to-cyberpunk-pink animate-hue-rotate'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600'
                }`}>
                  Great Adventure
                </span>
              </h1>

              <p className={`text-xl sm:text-2xl max-w-xl leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join our community of passionate readers. Share reviews, discover new books,
                and connect with fellow book lovers worldwide.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                className={`${
                  isDarkMode
                    ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-pink hover:from-cyberpunk-pink hover:to-cyberpunk-purple shadow-lg shadow-cyberpunk-purple/25'
                    : 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 shadow-lg shadow-primary-500/25'
                } transform hover:scale-105 transition-all duration-300`}
              >
                Start Reading
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className={`${
                  isDarkMode
                    ? 'border-2 border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 shadow-lg shadow-cyberpunk-blue/20'
                    : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 shadow-lg shadow-primary-500/20'
                } transform hover:scale-105 transition-all duration-300`}
              >
                Browse Books
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
            >
              {[
                { icon: BookOpen, number: '10K+', label: 'Books' },
                { icon: Users, number: '50K+', label: 'Readers' },
                { icon: Star, number: '100K+', label: 'Reviews' },
                { icon: TrendingUp, number: '5K+', label: 'Book Clubs' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                  className={`text-center p-4 rounded-xl ${
                    isDarkMode 
                      ? 'bg-dark-300/30 backdrop-blur-lg border border-cyberpunk-blue/20' 
                      : 'bg-white/30 backdrop-blur-lg border border-primary-500/20'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-6 h-6 ${
                      isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                    }`} />
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    isDarkMode 
                      ? 'text-white animate-pulse' 
                      : 'text-gray-900'
                  }`}>{stat.number}</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Featured Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square">
              {/* Decorative circles */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className={`absolute inset-0 rounded-full ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 blur-2xl'
                    : 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-2xl'
                }`}
              />
              
              {/* Featured book image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`absolute inset-12 rounded-2xl overflow-hidden ${
                  isDarkMode 
                    ? 'shadow-2xl shadow-cyberpunk-purple/20' 
                    : 'shadow-2xl shadow-primary-500/20'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80"
                  alt="Featured Book"
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                />
                
                {/* Glassmorphism overlay */}
                <div className={`absolute inset-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-t from-dark-400/80 via-dark-400/20 to-transparent'
                    : 'bg-gradient-to-t from-white/80 via-white/20 to-transparent'
                } backdrop-blur-[2px]`} />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [-20, 20, -20],
                  rotate: [0, 10, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute top-0 right-0 w-32 h-32 rounded-full ${
                  isDarkMode
                    ? 'bg-cyberpunk-pink/10 blur-2xl'
                    : 'bg-purple-500/10 blur-2xl'
                }`}
              />
              <motion.div
                animate={{ 
                  y: [20, -20, 20],
                  rotate: [0, -10, 0],
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute bottom-0 left-0 w-40 h-40 rounded-full ${
                  isDarkMode
                    ? 'bg-cyberpunk-blue/10 blur-2xl'
                    : 'bg-primary-500/10 blur-2xl'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 