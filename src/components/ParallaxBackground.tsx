import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ParallaxBackground = () => {
  const { isDarkMode } = useTheme();
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-define all transform values
  const transformConfigs = Array.from({ length: 7 }, (_, i) => ({
    yOffset: useTransform(scrollY, [0, windowHeight], [0, (i + 1) * 40], { clamp: false }),
    rotate: useTransform(scrollY, [0, windowHeight], [0, (i + 1) * 8], { clamp: false }),
    rotateY: useTransform(scrollY, [0, windowHeight], [0, (i % 2 === 0 ? 15 : -15)], { clamp: false }),
    scale: useTransform(scrollY, [0, windowHeight], [1, 1 + i * 0.05], { clamp: false }),
    opacity: useTransform(scrollY, [0, windowHeight], [0.9 - i * 0.1, 0.3], { clamp: false })
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="w-full h-full relative" style={{ perspective: '2000px' }}>
        {transformConfigs.map((config, index) => (
          <motion.div
            key={index}
            style={{
              y: config.yOffset,
              rotateX: config.rotate,
              rotateY: config.rotateY,
              scale: config.scale,
              opacity: config.opacity,
              transformStyle: 'preserve-3d',
              transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
            }}
            className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-dark-300/30'
                : 'bg-white/30'
            } backdrop-blur-sm`}
          >
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-dark-200/50 to-purple-900/20'
                  : 'bg-gradient-to-br from-primary-100/50 to-primary-300/20'
              }`}
            >
              {/* Book page texture */}
              <div
                className={`absolute inset-0 opacity-10 ${
                  isDarkMode ? 'bg-dark-100' : 'bg-gray-100'
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0h1v1H0zm20 0h1v1H20zM40 0h1v1H40zM60 0h1v1H60zM80 0h1v1H80zM0 20h1v1H0zm20 0h1v1H20zM40 20h1v1H40zM60 20h1v1H60zM80 20h1v1H80zM0 40h1v1H0zm20 0h1v1H20zM40 40h1v1H40zM60 40h1v1H60zM80 40h1v1H80z' fill='currentColor' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                  backgroundSize: '50px 50px',
                }}
              />
              {/* Page fold effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(${index % 2 === 0 ? '45deg' : '-45deg'}, 
                    transparent 45%, 
                    ${isDarkMode ? '#1a1f2b' : '#f1f5f9'} 45%, 
                    ${isDarkMode ? '#1a1f2b' : '#f1f5f9'} 55%, 
                    transparent 55%
                  )`,
                }}
              />
              {/* Page shadow */}
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: index % 2 === 0 
                    ? 'inset -20px 0 20px -20px rgba(0,0,0,0.3)' 
                    : 'inset 20px 0 20px -20px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxBackground; 