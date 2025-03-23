import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { Star, Filter, ThumbsUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import motion components with SSR disabled
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
});

interface Review {
  id: string;
  bookTitle: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  content: string;
  likes: number;
  comments: number;
  createdAt: Date;
  helpfulCount: number;
  aiScore: number;
}

export default function AllReviewsPage() {
  const { isDarkMode } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [filterRating, setFilterRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [sortBy, filterRating]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      let reviewsQuery;

      switch (sortBy) {
        case 'helpful':
          reviewsQuery = query(
            collection(db, 'reviews'),
            orderBy('helpfulCount', 'desc'),
            limit(20)
          );
          break;
        case 'latest':
          reviewsQuery = query(
            collection(db, 'reviews'),
            orderBy('createdAt', 'desc'),
            limit(20)
          );
          break;
        case 'highest':
          reviewsQuery = query(
            collection(db, 'reviews'),
            orderBy('rating', 'desc'),
            limit(20)
          );
          break;
        case 'ai':
          reviewsQuery = query(
            collection(db, 'reviews'),
            orderBy('aiScore', 'desc'),
            limit(20)
          );
          break;
        default:
          reviewsQuery = query(
            collection(db, 'reviews'),
            orderBy('createdAt', 'desc'),
            limit(20)
          );
      }

      const snapshot = await getDocs(reviewsQuery);
      let reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Review[];

      // Apply rating filter if set
      if (filterRating > 0) {
        reviewsData = reviewsData.filter(review => review.rating >= filterRating);
      }

      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 text-white' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900'
    }`}>
      <div className="relative">
        {/* Cyberpunk gradient overlay in dark mode */}
        {isDarkMode && (
          <div className="absolute inset-0 bg-cyberpunk-gradient opacity-10 pointer-events-none" />
        )}
        
        <Navbar />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
            }`}>
              All Reviews
            </h1>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              Discover what our community thinks about their favorite books
            </p>
          </MotionDiv>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-2">
              <Filter className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Filter by rating:</span>
              <div className="flex space-x-2">
                {[0, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterRating === rating
                        ? isDarkMode
                          ? 'bg-cyberpunk-blue text-white'
                          : 'bg-primary-500 text-white'
                        : isDarkMode
                          ? 'bg-dark-400 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+ ${rating === 5 ? 'Star' : 'Stars'}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-dark-400 text-white border-dark-300'
                    : 'bg-white text-gray-700 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <option value="latest">Latest</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rated</option>
                <option value="ai">AI Recommended</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className={`text-center p-4 rounded-lg ${
              isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
            }`}>
              {error}
            </div>
          ) : reviews.length === 0 ? (
            <div className={`text-center p-8 rounded-lg ${
              isDarkMode ? 'bg-dark-400' : 'bg-gray-100'
            }`}>
              <p className="text-xl">No reviews found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <MotionDiv
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${
                    isDarkMode ? 'bg-dark-400' : 'bg-white'
                  } rounded-xl shadow-lg overflow-hidden p-6`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {review.bookTitle}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review.rating
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
                        }`}>
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={review.userPhoto || 'https://via.placeholder.com/40'}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {review.userName}
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {review.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {review.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className="text-sm">{review.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className="text-sm">{review.comments}</span>
                      </div>
                    </div>
                    <Link
                      href={`/reviews/${review.id}`}
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-cyberpunk-blue' : 'text-primary-500'
                      } hover:underline`}
                    >
                      View Full Review
                    </Link>
                  </div>
                </MotionDiv>
              ))}
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </main>
  );
} 