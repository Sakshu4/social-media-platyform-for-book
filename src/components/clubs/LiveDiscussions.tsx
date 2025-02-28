import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Mic, Video, BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const liveDiscussions = [
  {
    id: 1,
    bookTitle: "The Midnight Library",
    participants: 24,
    type: "voice",
    topic: "Chapter 7: The Parallel Lives",
    isLive: true,
  },
  {
    id: 2,
    bookTitle: "Project Hail Mary",
    participants: 15,
    type: "text",
    topic: "Scientific Concepts Discussion",
    isLive: true,
  },
  {
    id: 3,
    bookTitle: "Dune",
    participants: 32,
    type: "video",
    topic: "World-building & Politics",
    isLive: true,
  }
];

const LiveDiscussions = () => {
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
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            Live Book Discussions
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join live conversations with fellow readers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveDiscussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                isDarkMode ? 'bg-dark-400' : 'bg-white'
              } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {discussion.bookTitle}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {discussion.topic}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    Live
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {discussion.participants} participants
                    </span>
                  </div>
                  {discussion.type === 'voice' && <Mic className="w-5 h-5 text-blue-500" />}
                  {discussion.type === 'text' && <MessageCircle className="w-5 h-5 text-green-500" />}
                  {discussion.type === 'video' && <Video className="w-5 h-5 text-purple-500" />}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? 'bg-cyberpunk-blue hover:bg-cyberpunk-blue/90 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Join Discussion</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveDiscussions; 