import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

// Sample data (replace with real data from API)
const reviewData = {
  id: 1,
  book: "The Midnight Library",
  author: "Matt Haig",
  coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80",
  reviewer: "Emma Thompson",
  reviewerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80",
  rating: 4.8,
  likes: 342,
  comments: 56,
  sentiment: "positive",
  aiTags: ["#Inspiring", "#LifeChanging", "#Philosophical"],
  content: `
    A beautiful exploration of life's infinite possibilities. This book made me reflect deeply on my own choices and the paths not taken. Matt Haig's writing is both profound and accessible, weaving complex philosophical concepts into a deeply human story.

    The protagonist's journey through the Midnight Library serves as a powerful metaphor for the regrets and what-ifs we all carry. Each alternative life she experiences teaches valuable lessons about happiness, fulfillment, and the true meaning of a life well-lived.

    What particularly struck me was how the author handles themes of depression and mental health with such sensitivity and insight. The message that happiness isn't about living the perfect life, but about finding peace with the life you have, resonates throughout the narrative.

    The prose is elegant yet straightforward, making complex ideas digestible without losing their impact. The pacing is perfect, keeping you engaged while allowing space for reflection.
  `,
  badges: ["Top Reviewer", "Verified Reader"],
  isAiRecommended: true,
  publishedDate: "2024-03-15",
  readingTime: "5 min read",
  relatedBooks: [
    { id: 2, title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab" },
    { id: 3, title: "Project Hail Mary", author: "Andy Weir" },
    { id: 4, title: "Klara and the Sun", author: "Kazuo Ishiguro" }
  ]
};

const ReviewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isDarkMode } = useTheme();

  // In a real app, fetch review data based on id
  // const [review, setReview] = useState(null);
  // useEffect(() => {
  //   if (id) fetchReview(id);
  // }, [id]);

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-dark-400 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/reviews"
          className={`inline-flex items-center mb-8 ${
            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Reviews
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-2xl mb-8 ${
              isDarkMode
                ? 'bg-dark-300 border border-cyberpunk-blue/20'
                : 'bg-white shadow-lg'
            }`}
          >
            <div className="flex items-start gap-6">
              <img
                src={reviewData.coverImage}
                alt={reviewData.book}
                className="w-32 h-48 object-cover rounded-lg shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{reviewData.book}</h1>
                <p className={`text-lg mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>by {reviewData.author}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(reviewData.rating)
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
                    <span className="ml-2 font-medium">{reviewData.rating}</span>
                  </div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {reviewData.publishedDate} • {reviewData.readingTime}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {reviewData.aiTags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-sm px-3 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-dark-200 text-cyberpunk-blue'
                          : 'bg-primary-50 text-primary-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-2xl mb-8 ${
              isDarkMode
                ? 'bg-dark-300 border border-cyberpunk-blue/20'
                : 'bg-white shadow-lg'
            }`}
          >
            {/* Reviewer Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={reviewData.reviewerImage}
                  alt={reviewData.reviewer}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{reviewData.reviewer}</h3>
                  <div className="flex gap-2">
                    {reviewData.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isDarkMode
                            ? 'bg-cyberpunk-blue/20 text-cyberpunk-blue'
                            : 'bg-primary-100 text-primary-600'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'hover:bg-dark-200'
                    : 'hover:bg-gray-100'
                }`}>
                  <Share2 className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'hover:bg-dark-200'
                    : 'hover:bg-gray-100'
                }`}>
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Review Text */}
            <div className={`prose max-w-none ${
              isDarkMode ? 'prose-invert' : ''
            }`}>
              {reviewData.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }>{paragraph}</p>
              ))}
            </div>

            {/* Engagement */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-200">
              <button className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                <span>{reviewData.likes}</span>
              </button>
              <button className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{reviewData.comments}</span>
              </button>
            </div>
          </motion.div>

          {/* Related Books */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-8 rounded-2xl ${
              isDarkMode
                ? 'bg-dark-300 border border-cyberpunk-blue/20'
                : 'bg-white shadow-lg'
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Related Books</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reviewData.relatedBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-dark-200 hover:bg-dark-100'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h4 className="font-medium mb-1">{book.title}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>by {book.author}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage; 