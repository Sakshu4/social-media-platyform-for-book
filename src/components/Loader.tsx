import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
  const { isDarkMode } = useTheme();

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const circles = [
    { delay: 0, rotate: 0 },
    { delay: 0.1, rotate: 90 },
    { delay: 0.2, rotate: 180 },
    { delay: 0.3, rotate: 270 },
  ];

  const loader = (
    <div className="relative">
      {circles.map((circle, index) => (
        <motion.span
          key={index}
          className={`absolute ${sizes[size]} rounded-full border-2 ${
            isDarkMode
              ? 'border-cyberpunk-blue'
              : 'border-primary-500'
          }`}
          style={{
            borderRightColor: 'transparent',
            transform: `rotate(${circle.rotate}deg)`,
          }}
          animate={{
            rotate: [circle.rotate, circle.rotate + 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            delay: circle.delay,
          }}
        />
      ))}
      <motion.div
        className={`${sizes[size]} rounded-full ${
          isDarkMode
            ? 'bg-cyberpunk-blue'
            : 'bg-primary-500'
        }`}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${
        isDarkMode
          ? 'bg-dark-400/80 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader; 