'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import BookCard from './BookCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Sample book data (replace with real data from your API)
const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80",
    rating: 4.5,
    review: "A life-changing read about the infinite possibilities of life.",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80",
    rating: 4.8,
    review: "An interstellar adventure that will keep you hooked!",
  },
  {
    id: 3,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80",
    rating: 4.3,
    review: "A fascinating exploration of artificial intelligence and humanity.",
  },
  {
    id: 4,
    title: "The Seven Husbands",
    author: "Taylor Jenkins Reid",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80",
    rating: 4.7,
    review: "A gripping story of old Hollywood glamour and mystery.",
  }
];

const FeaturedBooks = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 sm:py-24 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-dark-300 to-dark-400' 
        : 'bg-gradient-to-b from-gray-100 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          } mb-4`}>
            Featured Books
          </h2>
          <p className={`mt-4 text-lg sm:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            Discover our handpicked selection of must-read books that will transport you to new worlds
          </p>
        </motion.div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          centeredSlides={true}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className={`pb-12 ${isDarkMode ? '[&_.swiper-pagination-bullet]:bg-purple-400' : '[&_.swiper-pagination-bullet]:bg-primary-500'}`}
        >
          {featuredBooks.map((book, index) => (
            <SwiperSlide key={book.id} className="pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 
                }}
                className="h-full"
              >
                <BookCard {...book} className="h-full transform transition-all duration-300 hover:translate-y--2" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button className={`px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
          }`}>
            View All Books
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBooks; 