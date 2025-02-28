import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Calendar, MessageCircle, ChevronRight, BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AiRecommendationsProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const genres = [
  { id: 'all', label: 'All Genres' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'scifi', label: 'Sci-Fi' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'romance', label: 'Romance' },
  { id: 'thriller', label: 'Thriller' },
  { id: 'literary', label: 'Literary Fiction' },
];

const recommendedClubs = [
  {
    id: 1,
    name: "Fantasy Book Club",
    description: "Join us in exploring magical worlds and epic adventures",
    currentBook: "The Hobbit",
    members: 125,
    nextMeeting: "March 15th",
    discussions: 8,
    image: "https://images.unsplash.com/photo-1515890435782-59a5bb6ec191?q=80",
    matchScore: 98,
  },
  {
    id: 2,
    name: "Sci-Fi Explorers",
    description: "Discover mind-bending science fiction together",
    currentBook: "Project Hail Mary",
    members: 98,
    nextMeeting: "March 18th",
    discussions: 12,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80",
    matchScore: 95,
  },
  {
    id: 3,
    name: "Mystery Lovers",
    description: "Unravel thrilling mysteries with fellow detectives",
    currentBook: "The Silent Patient",
    members: 156,
    nextMeeting: "March 20th",
    discussions: 15,
    image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80",
    matchScore: 92,
  },
  {
    id: 4,
    name: "Classic Literature",
    description: "Timeless stories with modern perspectives",
    currentBook: "Pride and Prejudice",
    members: 210,
    nextMeeting: "March 22nd",
    discussions: 18,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80",
    matchScore: 89,
  },
];

const AiRecommendations = ({ selectedGenre, setSelectedGenre }: AiRecommendationsProps) => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-300' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className={`w-8 h-8 ${
              isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
            }`} />
            <h2 className={`text-3xl font-bold ml-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              AI-Powered Recommendations
            </h2>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover book clubs that match your interests and reading style
          </p>
        </motion.div>

        {/* Genre Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {genres.map((genre) => (
            <motion.button
              key={genre.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedGenre === genre.id
                  ? isDarkMode
                    ? 'bg-cyberpunk-blue text-white shadow-neon-cyberpunk'
                    : 'bg-primary-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-dark-400 text-gray-300 hover:bg-dark-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {genre.label}
            </motion.button>
          ))}
        </div>

        {/* Club Recommendations */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {recommendedClubs.map((club) => (
              <SwiperSlide key={club.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl overflow-hidden ${
                    isDarkMode ? 'bg-dark-400' : 'bg-white'
                  } shadow-xl`}
                >
                  <div className="relative h-48">
                    <img
                      src={club.image}
                      alt={club.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-cyberpunk-blue/90 text-white'
                        : 'bg-primary-500/90 text-white'
                    }`}>
                      {club.matchScore}% Match
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {club.name}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {club.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BookOpen className={`w-5 h-5 ${
                            isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Currently Reading
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {club.currentBook}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className={`w-5 h-5 ${
                            isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Members
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {club.members}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className={`w-5 h-5 ${
                            isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Next Meeting
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {club.nextMeeting}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className={`w-5 h-5 ${
                            isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            Active Discussions
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {club.discussions}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full mt-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                        isDarkMode
                          ? 'bg-cyberpunk-blue text-white hover:bg-cyberpunk-blue/90'
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      } transition-colors duration-300`}
                    >
                      <span>Join Club</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AiRecommendations;