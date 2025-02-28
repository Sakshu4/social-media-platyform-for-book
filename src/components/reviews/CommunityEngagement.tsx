import { motion } from 'framer-motion';
import { Trophy, Users, Award, Sparkles, BookOpen, ThumbsUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const achievements = [
  {
    id: 1,
    title: 'Bookworm',
    description: 'Read and review 10 books',
    icon: BookOpen,
    progress: 7,
    total: 10,
  },
  {
    id: 2,
    title: 'Influencer',
    description: 'Get 100 likes on your reviews',
    icon: ThumbsUp,
    progress: 85,
    total: 100,
  },
  {
    id: 3,
    title: 'Genre Master',
    description: 'Review books from 5 different genres',
    icon: Trophy,
    progress: 3,
    total: 5,
  },
];

const leaderboard = [
  {
    rank: 1,
    user: 'Sarah Parker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80',
    points: 1250,
    badge: 'Elite Reviewer',
  },
  {
    rank: 2,
    user: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80',
    points: 980,
    badge: 'Book Expert',
  },
  {
    rank: 3,
    user: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80',
    points: 850,
    badge: 'Rising Star',
  },
];

const CommunityEngagement = () => {
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
            <Users className={`w-8 h-8 ${
              isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
            }`} />
            <h2 className={`text-3xl font-bold ml-3 ${
              isDarkMode
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
            }`}>
              Community & Achievements
            </h2>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Level up your reading journey and connect with fellow book lovers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-2xl ${
              isDarkMode
                ? 'bg-dark-200 border border-cyberpunk-blue/20'
                : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Award className="w-5 h-5 mr-2" />
              Your Achievements
            </h3>

            <div className="space-y-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const progress = (achievement.progress / achievement.total) * 100;
                
                return (
                  <div key={achievement.id} className="relative">
                    <div className="flex items-start mb-2">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-dark-300 text-cyberpunk-blue'
                          : 'bg-primary-50 text-primary-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{achievement.title}</h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{achievement.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className={`overflow-hidden h-2 text-xs flex rounded-full ${
                        isDarkMode ? 'bg-dark-400' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-pink'
                              : 'bg-gradient-to-r from-primary-500 to-primary-600'
                          }`}
                        />
                      </div>
                      <div className={`text-right text-sm mt-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {achievement.progress}/{achievement.total}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Leaderboard Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-2xl ${
              isDarkMode
                ? 'bg-dark-200 border border-cyberpunk-blue/20'
                : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Trophy className="w-5 h-5 mr-2" />
              Top Reviewers
            </h3>

            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center p-4 rounded-xl ${
                    isDarkMode
                      ? 'bg-dark-300 hover:bg-dark-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } transition-all duration-300`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    entry.rank === 1
                      ? 'bg-yellow-400'
                      : entry.rank === 2
                        ? 'bg-gray-300'
                        : 'bg-amber-600'
                  } text-white font-bold`}>
                    {entry.rank}
                  </div>
                  
                  <img
                    src={entry.avatar}
                    alt={entry.user}
                    className="w-10 h-10 rounded-full object-cover mx-4"
                  />
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{entry.user}</h4>
                    <div className="flex items-center">
                      <Sparkles className={`w-4 h-4 mr-1 ${
                        isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{entry.badge}</span>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-bold ${
                    isDarkMode
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                      : 'text-primary-600'
                  }`}>
                    {entry.points} pts
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEngagement; 