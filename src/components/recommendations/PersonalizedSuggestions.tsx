import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Settings, BookOpen, User, ChevronRight } from 'lucide-react';

interface UserPreferences {
  genres: string[];
  readingLevel: string;
  favoriteAuthors: string[];
}

interface PersonalizedSuggestionsProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

const genreOptions = [
  'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 
  'Literary Fiction', 'Historical Fiction', 'Biography',
  'Self-Help', 'Business', 'Poetry'
];

const readingLevels = [
  'Beginner', 'Intermediate', 'Advanced', 'Expert'
];

export default function PersonalizedSuggestions({ 
  preferences, 
  onUpdatePreferences 
}: PersonalizedSuggestionsProps) {
  const { isDarkMode } = useTheme();

  const handleGenreToggle = (genre: string) => {
    const newGenres = preferences.genres.includes(genre)
      ? preferences.genres.filter(g => g !== genre)
      : [...preferences.genres, genre];
    
    onUpdatePreferences({
      ...preferences,
      genres: newGenres
    });
  };

  const handleReadingLevelChange = (level: string) => {
    onUpdatePreferences({
      ...preferences,
      readingLevel: level
    });
  };

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Personalized For You
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Customize your reading preferences for better recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Genre Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-dark-700' : 'bg-white'
            } shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              <h3 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Favorite Genres
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {genreOptions.map(genre => (
                <motion.button
                  key={genre}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    preferences.genres.includes(genre)
                      ? 'bg-primary-500 text-white'
                      : `${isDarkMode ? 'bg-dark-600 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-primary-500 hover:text-white`
                  }`}
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Reading Level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-dark-700' : 'bg-white'
            } shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-primary-500" />
              <h3 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Reading Level
              </h3>
            </div>

            <div className="space-y-2">
              {readingLevels.map(level => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReadingLevelChange(level)}
                  className={`w-full p-4 rounded-xl text-left transition-colors duration-300 ${
                    preferences.readingLevel === level
                      ? 'bg-primary-500 text-white'
                      : `${isDarkMode ? 'bg-dark-600 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-primary-500 hover:text-white`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{level}</span>
                    {preferences.readingLevel === level && (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Author Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-dark-700' : 'bg-white'
            } shadow-xl`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-primary-500" />
              <h3 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Favorite Authors
              </h3>
            </div>

            <div className="space-y-3">
              {preferences.favoriteAuthors.map(author => (
                <div
                  key={author}
                  className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-dark-600' : 'bg-gray-100'
                  }`}
                >
                  <span className={
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }>
                    {author}
                  </span>
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300"
              >
                Add Author
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 