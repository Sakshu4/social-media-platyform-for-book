import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  review?: string;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  rating,
  review,
  className = '',
}) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className={`group relative ${
        isDarkMode ? 'bg-dark-200' : 'bg-white'
      } rounded-xl shadow-xl overflow-hidden ${className}`}
    >
      <Link href={`/books/${id}`} className="block h-full">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode
              ? 'from-dark-300 via-dark-300/20'
              : 'from-gray-900 via-gray-900/20'
          } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>
        
        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-xl font-bold mb-2 ${
            isDarkMode
              ? 'text-white group-hover:text-purple-400'
              : 'text-gray-900 group-hover:text-primary-500'
          } transition-colors duration-300 line-clamp-2`}>
            {title}
          </h3>
          <p className={`mb-3 font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>by {author}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={`${
                    index < Math.floor(rating)
                      ? isDarkMode
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-primary-500 fill-primary-500'
                      : isDarkMode
                        ? 'text-gray-600'
                        : 'text-gray-300'
                  } transition-colors duration-300`}
                />
              ))}
            </div>
            <span className={`ml-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{rating.toFixed(1)}</span>
          </div>
          
          {review && (
            <p className={`line-clamp-2 text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              "{review}"
            </p>
          )}

          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className={`inline-flex items-center text-sm font-medium ${
              isDarkMode
                ? 'text-purple-400 group-hover:text-purple-300'
                : 'text-primary-500 group-hover:text-primary-600'
            }`}>
              Read More
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BookCard; 