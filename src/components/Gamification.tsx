'use client';

import { Trophy, Award, Star, BookOpen, ThumbsUp, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Fixed data outside component to prevent recreating on each render
const topReaders = [
  { id: 1, name: "Emma Thompson", books: 42, reviews: 156, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80" },
  { id: 2, name: "James Wilson", books: 38, reviews: 142, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80" },
  { id: 3, name: "Sophie Chen", books: 35, reviews: 128, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80" },
];

const badges = [
  { id: 1, name: "Bookworm", icon: BookOpen, description: "Read 50 books", progress: 84 },
  { id: 2, name: "Top Reviewer", icon: Star, description: "Write 100 reviews", progress: 62 },
  { id: 3, name: "Community Star", icon: Heart, description: "Get 1000 likes", progress: 45 },
  { id: 4, name: "Genre Master", icon: Trophy, description: "Read in 10 genres", progress: 70 },
  { id: 5, name: "Helpful Reader", icon: ThumbsUp, description: "Help 50 readers", progress: 38 },
  { id: 6, name: "Elite Status", icon: Award, description: "Earn 1000 points", progress: 92 },
];

const Gamification = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-8 ${
      isDarkMode ? 'bg-dark-400' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDarkMode
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
          }`}>
            Reader Achievements
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto text-lg`}>
            Earn badges, climb the leaderboard, and showcase your reading journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Leaderboard Section */}
          <div className={`${
            isDarkMode ? 'bg-dark-300' : 'bg-white'
          } rounded-xl shadow-xl p-6`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
              Top Readers
            </h3>
            
            <div className="space-y-4">
              {topReaders.map((reader, index) => (
                <div
                  key={reader.id}
                  className={`flex items-center p-4 rounded-lg ${
                    isDarkMode ? 'bg-dark-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={reader.image}
                      alt={reader.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-amber-600'
                    } text-white`}>
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h4 className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{reader.name}</h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {reader.books} books · {reader.reviews} reviews
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Section */}
          <div className={`${
            isDarkMode ? 'bg-dark-300' : 'bg-white'
          } rounded-xl shadow-xl p-6`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Award className="w-6 h-6 mr-2 text-purple-500" />
              Reading Badges
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-dark-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <badge.icon className={`w-5 h-5 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-500'
                    }`} />
                    <h4 className={`ml-2 font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{badge.name}</h4>
                  </div>
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{badge.description}</p>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-dark-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 text-right ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{badge.progress}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamification; 