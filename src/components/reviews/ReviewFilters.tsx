import { motion } from 'framer-motion';
import { Filter, TrendingUp, Clock, ThumbsUp, Star, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ReviewFiltersProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedSentiment: string;
  setSelectedSentiment: (sentiment: string) => void;
}

const filters = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'latest', label: 'Latest', icon: Clock },
  { id: 'top-rated', label: 'Top Rated', icon: Star },
  { id: 'most-liked', label: 'Most Liked', icon: ThumbsUp },
  { id: 'favorites', label: 'My Favorites', icon: Heart },
];

const sentiments = [
  { id: 'all', label: 'All Reviews' },
  { id: 'positive', label: 'Positive' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'critical', label: 'Critical' },
];

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  selectedFilter,
  setSelectedFilter,
  selectedSentiment,
  setSelectedSentiment,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-400' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        >
          <Filter className={`w-6 h-6 mr-3 ${
            isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
          }`} />
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Filter Reviews
          </h2>
        </motion.div>

        {/* Main Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? isDarkMode
                      ? 'bg-cyberpunk-blue text-white shadow-glow-blue'
                      : 'bg-primary-500 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-dark-300 text-gray-400 hover:bg-dark-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{filter.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Sentiment Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {sentiments.map((sentiment) => (
            <button
              key={sentiment.id}
              onClick={() => setSelectedSentiment(sentiment.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedSentiment === sentiment.id
                  ? isDarkMode
                    ? 'bg-cyberpunk-purple text-white'
                    : 'bg-primary-100 text-primary-700'
                  : isDarkMode
                    ? 'bg-dark-300 text-gray-400 hover:bg-dark-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sentiment.label}
            </button>
          ))}
        </motion.div>

        {/* Active Filters Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-8 p-4 rounded-xl ${
            isDarkMode
              ? 'bg-dark-300 border border-cyberpunk-blue/20'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Active Filters:
              <span className="ml-2 font-medium">
                {filters.find(f => f.id === selectedFilter)?.label},
                {sentiments.find(s => s.id === selectedSentiment)?.label}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedFilter('trending');
                setSelectedSentiment('all');
              }}
              className={`text-sm font-medium ${
                isDarkMode
                  ? 'text-cyberpunk-blue hover:text-cyberpunk-purple'
                  : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewFilters; 