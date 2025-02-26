'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Book Club Leader',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80',
    quote: 'This platform changed how I discover books! The AI recommendations are spot-on, and the community discussions are incredibly enriching.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Avid Reader',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
    quote: 'I love how easy it is to connect with other readers who share my interests. The review system is intuitive and fun to use.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Literature Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80',
    quote: 'The book clubs feature has introduced me to amazing reads I would have never discovered on my own. Highly recommended!',
    rating: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Testimonials = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${
      isDarkMode ? 'bg-dark-200' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            What Our Readers Say
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            Join thousands of satisfied readers who have found their perfect reads through our platform
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className={`${
                isDarkMode
                  ? 'bg-dark-300 shadow-lg shadow-purple-500/5'
                  : 'bg-white shadow-lg shadow-primary-500/5'
              } rounded-lg p-6 transition-transform duration-300 hover:scale-105`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{testimonial.name}</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className={`${
                      index < testimonial.rating
                        ? isDarkMode
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-primary-500 fill-primary-500'
                        : isDarkMode
                          ? 'text-gray-600'
                          : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className={`italic ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>&ldquo;{testimonial.quote}&rdquo;</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 