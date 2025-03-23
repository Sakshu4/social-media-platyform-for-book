import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import Navbar from '../components/Navbar';
import EmotionPicker from '../components/recommendations/EmotionPicker';
import AiBookList from '../components/recommendations/AiBookList';
import PersonalizedSuggestions from '../components/recommendations/PersonalizedSuggestions';
import CollaborativeRecommendations from '../components/recommendations/CollaborativeRecommendations';
import Footer from '../components/Footer';
import { Star, Smile, Heart, Sparkles, Coffee, Brain, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';

// Types
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genres: string[];
  description: string;
}

interface MoodCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  genres: string[];
  description: string;
  selected?: boolean;
}

const RecommendationsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const [selectedEmotion, setSelectedEmotion] = useState('inspired');
  const [userPreferences, setUserPreferences] = useState({
    genres: ['fantasy', 'science-fiction'],
    readingLevel: 'intermediate',
    favoriteAuthors: ['Brandon Sanderson', 'Neil Gaiman'],
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('Inspired');
  const [isLoading, setIsLoading] = useState(false);

  // Available mood categories
  const moodCategories: MoodCategory[] = [
    {
      id: 'happy',
      name: 'Happy & Light',
      icon: <Smile className="w-6 h-6 text-yellow-500" />,
      genres: ['Humor', 'Comedy', 'Feel-Good', 'Contemporary'],
      description: 'Light-hearted and uplifting books that will make you smile',
    },
    {
      id: 'romantic',
      name: 'Romantic',
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      genres: ['Romance', 'Love', 'Relationships'],
      description: 'Stories of love, connection, and relationships',
    },
    {
      id: 'inspired',
      name: 'Inspired',
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      genres: ['Self-Help', 'Motivation', 'Personal Development', 'Philosophy'],
      description: 'Books that will motivate and inspire you to reach new heights',
    },
    {
      id: 'relaxed',
      name: 'Relaxed',
      icon: <Coffee className="w-6 h-6 text-blue-500" />,
      genres: ['Comfort', 'Cozy', 'Nature', 'Slow Living'],
      description: 'Calming reads perfect for unwinding and relaxation',
    },
    {
      id: 'intellectual',
      name: 'Intellectual',
      icon: <Brain className="w-6 h-6 text-green-500" />,
      genres: ['Science', 'History', 'Philosophy', 'Psychology'],
      description: 'Thought-provoking books that will challenge your mind',
    },
    {
      id: 'adventurous',
      name: 'Adventurous',
      icon: <BookOpen className="w-6 h-6 text-red-500" />,
      genres: ['Adventure', 'Action', 'Travel', 'Fantasy'],
      description: 'Books that will take you on an exciting journey',
    },
  ];

  useEffect(() => {
    const loadRecommendations = async () => {
      startLoading();
      try {
        // Simulate API call for recommendations
        await new Promise(resolve => setTimeout(resolve, 2000));
      } finally {
        stopLoading();
      }
    };

    loadRecommendations();
  }, [selectedEmotion]);

  // Load recommended books based on selected mood
  useEffect(() => {
    const fetchBooksByMood = async () => {
      setIsLoading(true);
      
      try {
        // Find matching genres for selected mood
        const selectedMoodCategory = moodCategories.find(mood => mood.name === selectedMood);
        
        if (!selectedMoodCategory) {
          console.error('No mood category found with name:', selectedMood);
          setIsLoading(false);
          return;
        }
        
        // For demo purposes, we'll show default books for each mood
        // In production, you'd actually query Firestore with these genres
        const defaultBooks: Record<string, Book[]> = {
          'Happy & Light': [
            {
              id: 'happy1',
              title: 'The Hitchhiker\'s Guide to the Galaxy',
              author: 'Douglas Adams',
              cover: 'https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80',
              rating: 4.5,
              genres: ['Humor', 'Science Fiction', 'Comedy'],
              description: 'Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is rescued by his friend Ford Prefect.'
            },
            {
              id: 'happy2',
              title: "Where'd You Go, Bernadette",
              author: 'Maria Semple',
              cover: 'https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80',
              rating: 4.2,
              genres: ['Humor', 'Contemporary', 'Fiction'],
              description: 'When her mother disappears, Bee begins a trip that takes her to the ends of the earth to find her.'
            }
          ],
          'Romantic': [
            {
              id: 'romance1',
              title: 'Pride and Prejudice',
              author: 'Jane Austen',
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80',
              rating: 4.5,
              genres: ['Classic', 'Romance', 'Historical Fiction'],
              description: 'A romantic novel centered on the turbulent relationship between Elizabeth Bennet and Fitzwilliam Darcy.'
            },
            {
              id: 'romance2',
              title: 'The Seven Husbands of Evelyn Hugo',
              author: 'Taylor Jenkins Reid',
              cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80',
              rating: 4.7,
              genres: ['Historical Fiction', 'Romance', 'LGBT'],
              description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.'
            }
          ],
          'Inspired': [
            {
              id: 'inspired1',
              title: 'Atomic Habits',
              author: 'James Clear',
              cover: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80',
              rating: 4.9,
              genres: ['Self-Help', 'Personal Development', 'Psychology'],
              description: 'Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones'
            },
            {
              id: 'inspired2',
              title: 'Thinking, Fast and Slow',
              author: 'Daniel Kahneman',
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80',
              rating: 4.6,
              genres: ['Psychology', 'Economics', 'Science'],
              description: 'A brilliant exploration of how we think, revealing the two systems that drive the way we think and make choices.'
            }
          ],
          'Relaxed': [
            {
              id: 'relaxed1',
              title: 'The House in the Cerulean Sea',
              author: 'TJ Klune',
              cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80',
              rating: 4.6,
              genres: ['Fantasy', 'LGBT', 'Fiction'],
              description: "A magical island where you'll find your heart, live your dreams, and find a home in a place like no other."
            },
            {
              id: 'relaxed2',
              title: 'The Secret Garden',
              author: 'Frances Hodgson Burnett',
              cover: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80',
              rating: 4.3,
              genres: ['Classic', 'Children\'s Literature', 'Fiction'],
              description: 'A classic tale about a girl who discovers a secret garden and the healing power of nature.'
            }
          ],
          'Intellectual': [
            {
              id: 'intellectual1',
              title: 'Sapiens: A Brief History of Humankind',
              author: 'Yuval Noah Harari',
              cover: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?q=80',
              rating: 4.7,
              genres: ['History', 'Science', 'Anthropology'],
              description: 'A groundbreaking narrative of humanity\'s creation and evolution.'
            },
            {
              id: 'intellectual2',
              title: 'Guns, Germs, and Steel',
              author: 'Jared Diamond',
              cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80',
              rating: 4.3,
              genres: ['History', 'Science', 'Anthropology'],
              description: 'A global account of the rise of civilization and the factors that led to the dominance of certain societies.'
            }
          ],
          'Adventurous': [
            {
              id: 'adventure1',
              title: 'The Hobbit',
              author: 'J.R.R. Tolkien',
              cover: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80',
              rating: 4.6,
              genres: ['Fantasy', 'Adventure', 'Classic'],
              description: 'A fantasy novel and children\'s book following the quest of Bilbo Baggins, a hobbit who is reluctantly swept into an epic quest to reclaim the Lonely Mountain from the dragon Smaug.'
            },
            {
              id: 'adventure2',
              title: 'Jurassic Park',
              author: 'Michael Crichton',
              cover: 'https://images.unsplash.com/photo-1601295528983-1bf522ee7e3d?q=80',
              rating: 4.2,
              genres: ['Science Fiction', 'Thriller', 'Adventure'],
              description: 'An astonishing technique for recovering and cloning dinosaur DNA has been discovered.'
            }
          ]
        };
        
        // Set the books for the selected mood
        setBooks(defaultBooks[selectedMood] || []);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooksByMood();
  }, [selectedMood]);

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
        <div className="space-y-24 pb-16">
          {/* Emotion-based Recommendations */}
          <section>
            <EmotionPicker
              selectedEmotion={selectedEmotion}
              setSelectedEmotion={setSelectedEmotion}
            />
            <AiBookList emotion={selectedEmotion} />
          </section>

          {/* Personalized Recommendations */}
          <PersonalizedSuggestions
            preferences={userPreferences}
            onUpdatePreferences={setUserPreferences}
          />

          {/* Collaborative Filtering Recommendations */}
          <CollaborativeRecommendations />

          {/* Mood-based Recommendations */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">How are you feeling today?</h2>
              <p className="text-xl text-gray-500">Let us recommend books based on your current mood</p>
            </div>
            
            {/* Mood Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {moodCategories.map((mood) => (
                <div
                  key={mood.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center ${
                    selectedMood === mood.name
                      ? isDarkMode
                        ? 'bg-purple-900/30 border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-purple-100 border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                      : isDarkMode
                      ? 'bg-dark-800/80 hover:bg-dark-700/80 border border-dark-700'
                      : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-sm'
                  }`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <div className="mb-2">
                    {mood.icon}
                  </div>
                  <p className="font-medium">{mood.name}</p>
                </div>
              ))}
            </div>
            
            {/* Recommended Books */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Recommended for {selectedMood} readers</h3>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-primary-500 rounded-full mb-4"></div>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Loading recommendations...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {books.length === 0 ? (
                    <p className="text-center py-12 text-gray-500">
                      No recommendations found for this mood. Try another mood or check back later.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {books.map((book) => (
                        <Link href={`/books/${book.id}`} key={book.id}>
                          <div className={`h-full rounded-lg overflow-hidden transition-all hover:shadow-xl ${
                            isDarkMode 
                              ? 'bg-dark-800 hover:bg-dark-700 border border-dark-700' 
                              : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                          }`}>
                            <div className="h-64 overflow-hidden relative">
                              {book.cover ? (
                                <img 
                                  src={book.cover} 
                                  alt={book.title}
                                  className="object-cover w-full h-full transition-transform hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center ${
                                  isDarkMode ? 'bg-dark-700' : 'bg-gray-200'
                                }`}>
                                  <BookOpen className="w-16 h-16 text-gray-400" />
                                </div>
                              )}
                              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                                <span className="text-sm">{book.rating.toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="p-5">
                              <h4 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h4>
                              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                by {book.author}
                              </p>
                              <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {book.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {book.genres.slice(0, 3).map((genre, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      isDarkMode
                                        ? 'bg-dark-700 text-gray-300'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {genre}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
        
        <Footer />
      </div>
    </main>
  );
};

export default RecommendationsPage; 