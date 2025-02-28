import { motion } from 'framer-motion';
import { Brain, Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const summaries = [
  {
    id: 1,
    book: "The Midnight Library",
    author: "Matt Haig",
    summary: "A thought-provoking exploration of life's infinite possibilities through the lens of parallel universes. The book masterfully blends philosophical questions with emotional depth.",
    sentiment: "Overwhelmingly Positive",
    rating: 4.7,
    engagement: { likes: 1243, comments: 89 },
    tags: ["Life-Changing", "Philosophical", "Emotional", "Hope"]
  },
  {
    id: 2,
    book: "Project Hail Mary",
    author: "Andy Weir",
    summary: "A brilliant blend of hard science and human ingenuity. The novel excels in making complex scientific concepts accessible while maintaining suspense and emotional resonance.",
    sentiment: "Highly Positive",
    rating: 4.8,
    engagement: { likes: 982, comments: 156 },
    tags: ["Science Fiction", "Problem-Solving", "Friendship", "Space"]
  },
  {
    id: 3,
    book: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    summary: "An intricate narrative about creativity, friendship, and the gaming industry. The character development and emotional depth have particularly resonated with readers.",
    sentiment: "Positive",
    rating: 4.5,
    engagement: { likes: 876, comments: 134 },
    tags: ["Gaming", "Relationships", "Art", "Identity"]
  }
];

const AiReviewSummaries = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${
      isDarkMode ? 'bg-dark-300' : 'bg-gray-50'
    }`}>
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
              isDarkMode
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
            }`}>
              AI-Powered Insights
            </h2>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover intelligent summaries and analysis of popular book reviews
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {summaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${
                isDarkMode
                  ? 'bg-dark-200 hover:bg-dark-100'
                  : 'bg-white hover:bg-gray-50'
              } rounded-xl shadow-xl p-6 transition-all duration-300 hover:-translate-y-2`}
            >
              <h3 className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{summary.book}</h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>by {summary.author}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(summary.rating)
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
                <span className={`ml-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{summary.rating.toFixed(1)}</span>
              </div>

              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>{summary.summary}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {summary.tags.map(tag => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-dark-300 text-cyberpunk-blue'
                        : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{summary.engagement.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>{summary.engagement.comments}</span>
                  </div>
                </div>
                <span className={`${
                  isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-600'
                }`}>
                  {summary.sentiment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiReviewSummaries; 