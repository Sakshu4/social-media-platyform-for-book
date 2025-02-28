import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Mic, Camera, Upload, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ReviewForm = () => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', { rating, reviewText, attachments });
    // TODO: Implement actual submission logic
  };

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-dark-400' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Share Your Thoughts
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Write a review and help others discover their next great read
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className={`${
            isDarkMode
              ? 'bg-dark-200 border border-cyberpunk-blue/20'
              : 'bg-white border border-gray-200'
          } rounded-2xl shadow-xl p-8`}
        >
          {/* Book Search */}
          <div className="mb-8">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Search for a book
            </label>
            <input
              type="text"
              placeholder="Enter book title or ISBN"
              className={`w-full px-4 py-3 rounded-xl ${
                isDarkMode
                  ? 'bg-dark-300 border-dark-100 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200`}
            />
          </div>

          {/* Rating */}
          <div className="mb-8">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? isDarkMode
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-primary-500 fill-primary-500'
                        : isDarkMode
                          ? 'text-gray-600'
                          : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-8">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about the book..."
              rows={6}
              className={`w-full px-4 py-3 rounded-xl ${
                isDarkMode
                  ? 'bg-dark-300 border-dark-100 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200`}
            />
          </div>

          {/* Multimedia Options */}
          <div className="mb-8">
            <label className={`block text-sm font-medium mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Add Media (Optional)
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex items-center justify-center p-3 rounded-xl ${
                  isDarkMode
                    ? 'bg-dark-300 hover:bg-dark-100 text-cyberpunk-blue'
                    : 'bg-gray-50 hover:bg-gray-100 text-primary-600'
                } transition-all duration-200`}
              >
                <Mic className="w-6 h-6" />
              </button>
              <button
                type="button"
                className={`flex items-center justify-center p-3 rounded-xl ${
                  isDarkMode
                    ? 'bg-dark-300 hover:bg-dark-100 text-cyberpunk-blue'
                    : 'bg-gray-50 hover:bg-gray-100 text-primary-600'
                } transition-all duration-200`}
              >
                <Camera className="w-6 h-6" />
              </button>
              <button
                type="button"
                className={`flex items-center justify-center p-3 rounded-xl ${
                  isDarkMode
                    ? 'bg-dark-300 hover:bg-dark-100 text-cyberpunk-blue'
                    : 'bg-gray-50 hover:bg-gray-100 text-primary-600'
                } transition-all duration-200`}
              >
                <Upload className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-pink text-white'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
            }`}
          >
            Submit Review
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ReviewForm; 