import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, BookOpen, Users, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const challenges = [
  {
    id: 1,
    title: "100 Books Challenge",
    description: "Read 100 books before the end of the year",
    participants: 1234,
    progress: 65,
    reward: "Platinum Reader Badge",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Genre Explorer",
    description: "Read books from 10 different genres",
    participants: 856,
    progress: 80,
    reward: "Genre Master Badge",
    icon: Star,
  },
  {
    id: 3,
    title: "Book Club Leader",
    description: "Host 5 successful book club discussions",
    participants: 432,
    progress: 40,
    reward: "Leadership Badge",
    icon: Users,
  }
];

const ClubChallenges = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-400' : 'bg-white'}`}>
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
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            Reading Challenges
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join challenges, earn rewards, and track your reading progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                isDarkMode
                  ? 'bg-dark-300 border border-dark-200'
                  : 'bg-white border border-gray-100'
              } rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    isDarkMode
                      ? 'bg-cyberpunk-blue/20 text-cyberpunk-blue'
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    <challenge.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {challenge.title}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Progress
                    </span>
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {challenge.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-cyberpunk-blue to-purple-500'
                          : 'bg-gradient-to-r from-primary-500 to-primary-600'
                      }`}
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {challenge.participants.toLocaleString()} participants
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className={`w-4 h-4 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                    }`} />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {challenge.reward}
                    </span>
                  </div>
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
                  <Award className="w-4 h-4" />
                  <span>Join Challenge</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubChallenges; 