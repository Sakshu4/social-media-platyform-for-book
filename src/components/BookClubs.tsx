'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';

const bookClubs = [
  {
    id: 1,
    name: "Mystery Lovers Club",
    description: "Unravel thrilling mysteries together",
    members: 1250,
    nextMeeting: "Feb 28, 2024",
    activeDiscussions: 8,
    image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80"
  },
  {
    id: 2,
    name: "SciFi Explorers",
    description: "Journey through space and time",
    members: 890,
    nextMeeting: "Mar 1, 2024",
    activeDiscussions: 12,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80"
  },
  {
    id: 3,
    name: "Classic Literature",
    description: "Timeless stories, modern perspectives",
    members: 2100,
    nextMeeting: "Feb 29, 2024",
    activeDiscussions: 15,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80"
  }
];

const BookClubs = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-8 ${
      isDarkMode ? 'bg-dark-300' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            Join Engaging Book Clubs
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto text-lg`}>
            Connect with fellow readers, share insights, and explore new genres together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                isDarkMode
                  ? 'bg-dark-200 hover:bg-dark-100'
                  : 'bg-white hover:bg-gray-50'
              } rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-t from-dark-200 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-white via-transparent to-transparent'
                }`} />
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {club.name}
                </h3>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {club.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Users className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-purple-400' : 'text-primary-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {club.members.toLocaleString()} members
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-purple-400' : 'text-primary-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Next meeting: {club.nextMeeting}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <MessageCircle className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-purple-400' : 'text-primary-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {club.activeDiscussions} active discussions
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    variant={isDarkMode ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    Join Club
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubs; 