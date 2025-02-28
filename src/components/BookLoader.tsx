import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface BookLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const BookLoader: React.FC<BookLoaderProps> = ({ size = 'md', fullScreen = false }) => {
  const { isDarkMode } = useTheme();

  const sizes = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-32 h-40',
  };

  const bookLoader = (
    <div className="relative">
      {/* Book cover */}
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotateY: [0, -180] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Front cover */}
        <div className={`absolute inset-0 rounded-lg ${
          isDarkMode
            ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue'
            : 'bg-gradient-to-r from-primary-400 to-primary-600'
        } shadow-xl`}>
          <div className={`absolute inset-2 rounded border-2 ${
            isDarkMode ? 'border-cyberpunk-blue/30' : 'border-primary-300/30'
          }`} />
        </div>
      </motion.div>

      {/* Pages */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={`absolute top-1 ${sizes[size]} rounded-r-lg bg-white/90 origin-left`}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -180 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Page lines */}
          <div className="absolute inset-4 flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded ${
                  isDarkMode
                    ? 'bg-cyberpunk-blue/20'
                    : 'bg-primary-200'
                }`}
                style={{
                  width: `${90 - i * 10}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Loading text */}
      <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Loading books...
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${
        isDarkMode
          ? 'bg-dark-400/80 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        {bookLoader}
      </div>
    );
  }

  return bookLoader;
};

export default BookLoader; 