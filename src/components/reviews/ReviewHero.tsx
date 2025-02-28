import { motion } from 'framer-motion';
import { Edit, BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../Button';

const ReviewHero = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        {/* Animated grid background in dark mode */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Discover & Share
            <span className={`block mt-2 ${
              isDarkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-blue to-cyberpunk-pink animate-hue-rotate'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600'
            }`}>
              Honest Book Reviews
            </span>
          </h1>

          <p className={`text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Read, write, and engage with the best book reviews powered by AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg"
              className={`${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-pink hover:from-cyberpunk-pink hover:to-cyberpunk-purple'
                  : 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700'
              } group`}
            >
              <Edit className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Write a Review
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={`${
                isDarkMode
                  ? 'border-2 border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10'
                  : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
              } group`}
            >
              <BookOpen className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Explore Reviews
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
          >
            {[
              { label: 'Reviews', value: '50K+' },
              { label: 'Active Readers', value: '100K+' },
              { label: 'Books Reviewed', value: '25K+' },
              { label: 'AI Insights', value: '1M+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl ${
                  isDarkMode 
                    ? 'bg-dark-300/30 backdrop-blur-lg border border-cyberpunk-blue/20' 
                    : 'bg-white/30 backdrop-blur-lg border border-primary-500/20'
                }`}
              >
                <div className={`text-2xl font-bold mb-1 ${
                  isDarkMode 
                    ? 'text-white animate-pulse' 
                    : 'text-gray-900'
                }`}>{stat.value}</div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewHero; 