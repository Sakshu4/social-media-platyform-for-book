import { useState, useEffect, useCallback } from 'react';
import { 
  collection, query, where, getDocs, orderBy, limit, 
  startAt, endAt, QueryDocumentSnapshot, DocumentData, 
  QuerySnapshot, or, Firestore
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import debounce from 'lodash/debounce';
import { createSearchableText } from '../utils/searchUtils';

// Types
export interface BookResult {
  id: string;
  type: 'book';
  title: string;
  author: string;
  cover?: string;
  genres?: string[];
  rating?: number;
}

export interface AuthorResult {
  id: string;
  type: 'author';
  name: string;
  photo?: string;
  bookCount?: number;
}

export interface ReviewResult {
  id: string;
  type: 'review';
  title: string;
  bookTitle?: string;
  username?: string;
  rating?: number;
}

export type SearchResult = BookResult | AuthorResult | ReviewResult;

interface UseSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: SearchResult[];
  recentSearches: string[];
  clearRecentSearches: () => void;
  isLoading: boolean;
  aiSuggestions: string[];
}

// Default popular books to show when search is empty
const popularBooks: BookResult[] = [
  {
    id: 'atomic-habits',
    type: 'book' as const,
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80',
    genres: ['Self-Help', 'Personal Development', 'Psychology']
  },
  {
    id: 'midnight-library',
    type: 'book' as const,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80',
    genres: ['Fiction', 'Fantasy', 'Contemporary']
  },
  {
    id: 'project-hail-mary',
    type: 'book' as const,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80',
    genres: ['Science Fiction', 'Adventure', 'Space']
  },
  {
    id: 'klara-and-sun',
    type: 'book' as const,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80',
    genres: ['Science Fiction', 'Literary Fiction']
  }
];

// Dummy results for specific genres
const classicBooks: BookResult[] = [
  {
    id: 'pride-and-prejudice',
    type: 'book' as const,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genres: ['Classic', 'Romance', 'Literary Fiction']
  },
  {
    id: 'to-kill-mockingbird',
    type: 'book' as const,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genres: ['Classic', 'Fiction', 'Historical']
  },
  {
    id: '1984',
    type: 'book' as const,
    title: '1984',
    author: 'George Orwell',
    genres: ['Classic', 'Dystopian', 'Science Fiction']
  }
];

const romanceBooks: BookResult[] = [
  {
    id: 'it-ends-with-us',
    type: 'book' as const,
    title: 'It Ends with Us',
    author: 'Colleen Hoover',
    genres: ['Romance', 'Contemporary', 'Fiction']
  },
  {
    id: 'normal-people',
    type: 'book' as const,
    title: 'Normal People',
    author: 'Sally Rooney',
    genres: ['Romance', 'Contemporary', 'Literary Fiction']
  }
];

const fantasyBooks: BookResult[] = [
  {
    id: 'name-of-wind',
    type: 'book' as const,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genres: ['Fantasy', 'Adventure', 'Epic']
  },
  {
    id: 'way-of-kings',
    type: 'book' as const,
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    genres: ['Fantasy', 'Epic', 'High Fantasy']
  }
];

// Add more specialized book types
const scienceFictionBooks: BookResult[] = [
  {
    id: 'dune',
    type: 'book' as const,
    title: 'Dune',
    author: 'Frank Herbert',
    genres: ['Science Fiction', 'Space Opera', 'Adventure']
  },
  {
    id: 'foundation',
    type: 'book' as const,
    title: 'Foundation',
    author: 'Isaac Asimov',
    genres: ['Science Fiction', 'Classic', 'Space']
  }
];

const mysteryBooks: BookResult[] = [
  {
    id: 'gone-girl',
    type: 'book' as const,
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genres: ['Mystery', 'Thriller', 'Suspense']
  },
  {
    id: 'girl-with-dragon-tattoo',
    type: 'book' as const,
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genres: ['Mystery', 'Thriller', 'Crime']
  }
];

const nonFictionBooks: BookResult[] = [
  {
    id: 'sapiens',
    type: 'book' as const,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genres: ['Non-Fiction', 'History', 'Science']
  },
  {
    id: 'becoming',
    type: 'book' as const,
    title: 'Becoming',
    author: 'Michelle Obama',
    genres: ['Non-Fiction', 'Memoir', 'Biography']
  }
];

// Function to generate AI-like book recommendations based on search query
function getAIRecommendations(searchTerm: string): BookResult[] {
  const normalizedTerm = searchTerm.toLowerCase().trim();
  
  // Enhanced emotional search keywords
  const emotionalCategories = {
    happy: ['happy', 'feel good', 'uplifting', 'happiness', 'joyful', 'cheerful', 'positive', 'fun', 'humorous', 'light', 'heartwarming'],
    sad: ['sad', 'emotional', 'moving', 'grief', 'heartbreaking', 'melancholy', 'depressing', 'somber', 'tearjerker', 'tragedy'],
    relaxed: ['relax', 'calm', 'peaceful', 'soothing', 'chill', 'mindful', 'tranquil', 'meditation', 'peaceful', 'cozy', 'comfort'],
    inspired: ['inspired', 'motivational', 'inspiring', 'motivation', 'empowering', 'success', 'ambition', 'goals', 'achievement', 'determination'],
    adventurous: ['adventure', 'exciting', 'action', 'thrill', 'journey', 'discovery', 'exploration', 'quest', 'daring', 'expedition', 'travel'],
    romantic: ['romance', 'love', 'relationship', 'romantic', 'passion', 'dating', 'marriage', 'couples', 'affection', 'crush', 'love story'],
    mysterious: ['mystery', 'suspense', 'intriguing', 'puzzling', 'enigmatic', 'detective', 'clue', 'riddle', 'whodunit', 'crime', 'investigation']
  };
  
  // First check for emotional/mood matches
  for (const [mood, terms] of Object.entries(emotionalCategories)) {
    if (terms.some(term => normalizedTerm.includes(term))) {
      switch (mood) {
        case 'happy':
          return [
            {
              id: 'happy-ai-1',
              type: 'book' as const,
              title: 'The House in the Cerulean Sea',
              author: 'TJ Klune',
              genres: ['Fantasy', 'Feel-Good', 'LGBT'],
              rating: 4.5,
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80'
            },
            {
              id: 'happy-ai-2',
              type: 'book' as const,
              title: 'Eleanor Oliphant Is Completely Fine',
              author: 'Gail Honeyman',
              genres: ['Contemporary', 'Fiction', 'Feel-Good'],
              rating: 4.3,
              cover: 'https://images.unsplash.com/photo-1511367734837-f2956f0d8020?q=80'
            },
            {
              id: 'happy-ai-3',
              type: 'book' as const,
              title: 'Good Omens',
              author: 'Terry Pratchett & Neil Gaiman',
              genres: ['Fantasy', 'Humor', 'Comedy'],
              rating: 4.3,
              cover: 'https://images.unsplash.com/photo-1531901599634-485ed3a85db3?q=80'
            }
          ];
        
        case 'sad':
          return [
            {
              id: 'sad-ai-1',
              type: 'book' as const,
              title: 'A Little Life',
              author: 'Hanya Yanagihara',
              genres: ['Contemporary', 'Fiction', 'LGBT'],
              rating: 4.3,
              cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80'
            },
            {
              id: 'sad-ai-2',
              type: 'book' as const,
              title: 'When Breath Becomes Air',
              author: 'Paul Kalanithi',
              genres: ['Memoir', 'Biography', 'Medical'],
              rating: 4.4,
              cover: 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80'
            },
            {
              id: 'sad-ai-3',
              type: 'book' as const,
              title: 'It Ends with Us',
              author: 'Colleen Hoover',
              genres: ['Fiction', 'Romance', 'Contemporary'],
              rating: 4.1,
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80'
            }
          ];
          
        case 'relaxed':
          return [
            {
              id: 'relaxed-ai-1',
              type: 'book' as const,
              title: 'The Little Paris Bookshop',
              author: 'Nina George',
              genres: ['Fiction', 'Romance', 'Cultural'],
              rating: 3.9,
              cover: 'https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?q=80'
            },
            {
              id: 'relaxed-ai-2',
              type: 'book' as const,
              title: 'Under the Tuscan Sun',
              author: 'Frances Mayes',
              genres: ['Memoir', 'Travel', 'Italy'],
              rating: 3.8,
              cover: 'https://images.unsplash.com/photo-1490127252417-7c393f756e8e?q=80'
            },
            {
              id: 'relaxed-ai-3',
              type: 'book' as const,
              title: 'The Alchemist',
              author: 'Paulo Coelho',
              genres: ['Fiction', 'Philosophy', 'Spirituality'],
              rating: 4.0,
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80'
            }
          ];
          
        case 'inspired':
          return [
            {
              id: 'inspired-ai-1',
              type: 'book' as const,
              title: 'Atomic Habits',
              author: 'James Clear',
              genres: ['Self-Help', 'Personal Development', 'Psychology'],
              rating: 4.4,
              cover: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80'
            },
            {
              id: 'inspired-ai-2',
              type: 'book' as const,
              title: 'Becoming',
              author: 'Michelle Obama',
              genres: ['Memoir', 'Biography', 'Inspirational'],
              rating: 4.6,
              cover: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80'
            },
            {
              id: 'inspired-ai-3',
              type: 'book' as const,
              title: 'Can\'t Hurt Me',
              author: 'David Goggins',
              genres: ['Memoir', 'Self-Help', 'Motivation'],
              rating: 4.5,
              cover: 'https://images.unsplash.com/photo-1574279606130-09958dc756f7?q=80'
            }
          ];
          
        case 'adventurous':
          return [
            {
              id: 'adventure-ai-1',
              type: 'book' as const,
              title: 'The Lost City of Z',
              author: 'David Grann',
              genres: ['Adventure', 'Non-Fiction', 'Exploration'],
              rating: 4.0,
              cover: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80'
            },
            {
              id: 'adventure-ai-2',
              type: 'book' as const,
              title: 'Into Thin Air',
              author: 'Jon Krakauer',
              genres: ['Adventure', 'Non-Fiction', 'Mountaineering'],
              rating: 4.2,
              cover: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80'
            },
            {
              id: 'adventure-ai-3',
              type: 'book' as const,
              title: 'The Call of the Wild',
              author: 'Jack London',
              genres: ['Adventure', 'Classic', 'Animals'],
              rating: 4.0,
              cover: 'https://images.unsplash.com/photo-1605973029521-8154da591bd7?q=80'
            }
          ];
          
        case 'romantic':
          return [
            {
              id: 'romance-ai-1',
              type: 'book' as const,
              title: 'The Love Hypothesis',
              author: 'Ali Hazelwood',
              genres: ['Romance', 'Contemporary', 'Fiction'],
              rating: 4.2,
              cover: 'https://images.unsplash.com/photo-1551654441-f0e34c313b91?q=80'
            },
            {
              id: 'romance-ai-2',
              type: 'book' as const,
              title: 'Red, White & Royal Blue',
              author: 'Casey McQuiston',
              genres: ['Romance', 'LGBT', 'Contemporary'],
              rating: 4.2,
              cover: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80'
            },
            {
              id: 'romance-ai-3',
              type: 'book' as const,
              title: 'Pride and Prejudice',
              author: 'Jane Austen',
              genres: ['Classic', 'Romance', 'Literary Fiction'],
              rating: 4.3,
              cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80'
            }
          ];
          
        case 'mysterious':
          return [
            {
              id: 'mystery-ai-1',
              type: 'book' as const,
              title: 'The Silent Patient',
              author: 'Alex Michaelides',
              genres: ['Mystery', 'Thriller', 'Psychological'],
              rating: 4.2,
              cover: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80'
            },
            {
              id: 'mystery-ai-2',
              type: 'book' as const,
              title: 'Gone Girl',
              author: 'Gillian Flynn',
              genres: ['Mystery', 'Thriller', 'Suspense'],
              rating: 4.1,
              cover: 'https://images.unsplash.com/photo-1518742772913-b2017cf7fc32?q=80'
            },
            {
              id: 'mystery-ai-3',
              type: 'book' as const,
              title: 'The Thursday Murder Club',
              author: 'Richard Osman',
              genres: ['Mystery', 'Humor', 'Crime'],
              rating: 4.0,
              cover: 'https://images.unsplash.com/photo-1590283603385-c1c9cfd24fd3?q=80'
            }
          ];
      }
    }
  }
  
  // Continue with existing category checks for genre-based recommendations
  // ... existing category checks remain ...
  
  // Check if this is a "mood" or "feeling" related search
  if (normalizedTerm.includes('mood') || normalizedTerm.includes('feel') || normalizedTerm.includes('emotion')) {
    // Return a mixed selection of books from different moods
    return [
      {
        id: 'mood-mix-1',
        type: 'book' as const,
        title: 'The House in the Cerulean Sea',
        author: 'TJ Klune',
        genres: ['Fantasy', 'Feel-Good', 'LGBT'],
        rating: 4.5,
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80'
      },
      {
        id: 'mood-mix-2',
        type: 'book' as const,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        genres: ['Contemporary', 'Fiction', 'LGBT'],
        rating: 4.3,
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80'
      },
      {
        id: 'mood-mix-3',
        type: 'book' as const,
        title: 'Atomic Habits',
        author: 'James Clear',
        genres: ['Self-Help', 'Personal Development', 'Psychology'],
        rating: 4.4,
        cover: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80'
      }
    ];
  }
  
  // Default mixed recommendations for generic terms or no matches
  // ... existing default recommendations ...
}

export function useSearch(): UseSearchReturn {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Generate AI suggestions based on the search term
  useEffect(() => {
    if (!searchTerm) {
      setAiSuggestions([]);
      return;
    }

    // Set immediate suggestions while results are loading
    const suggestions = [
      `${searchTerm} books`,
      `${searchTerm} authors`,
      `books about ${searchTerm}`,
      `${searchTerm} series`
    ].filter(s => s !== searchTerm);
    
    setAiSuggestions(suggestions);
  }, [searchTerm]);

  // Perform search whenever searchTerm changes, with debounce
  const performSearch = useCallback(async (term: string) => {
    // If empty search, show popular books
    if (!term.trim()) {
      setSearchResults(popularBooks);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Check if db is defined
      if (!db) {
        console.error('Firestore is not initialized');
        setSearchResults([]);
        setIsLoading(false);
        return;
      }
      
      const searchableText = createSearchableText(term);
      let combinedResults: SearchResult[] = [];
      
      // Check if this is a mood-based search
      const moodTerms = ['happy', 'sad', 'relaxed', 'inspired', 'adventurous', 'romantic', 'mysterious', 'mood', 'feeling'];
      const isMoodSearch = moodTerms.some(mood => term.toLowerCase().includes(mood));
      
      if (isMoodSearch) {
        // First try to match books by mood
        try {
          const moodQuery = query(
            collection(db as Firestore, 'books'),
            where('mood', '>=', term.toLowerCase()),
            where('mood', '<=', term.toLowerCase() + '\uf8ff'),
            limit(5)
          );
          
          const moodSnapshot = await getDocs(moodQuery);
          const moodResults: BookResult[] = moodSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              type: 'book' as const,
              title: data.title,
              author: data.author,
              cover: data.cover,
              genres: data.genres,
              rating: data.rating
            };
          });
          
          combinedResults = [...combinedResults, ...moodResults];
        } catch (error) {
          console.error('Error searching by mood:', error);
        }
        
        // If we don't have enough mood-based results, get AI recommendations
        if (combinedResults.length < 3) {
          const aiRecommendations = getAIRecommendations(term);
          
          // Filter out duplicates
          const newAiBooks = aiRecommendations.filter(
            book => !combinedResults.some(existing => 
              existing.type === 'book' && existing.id === book.id
            )
          );
          
          combinedResults = [...combinedResults, ...newAiBooks];
        }
      } else {
        // Standard search - first by genre (classification)
        try {
          const genreQuery = query(
            collection(db as Firestore, 'books'),
            where('searchableGenres', 'array-contains', searchableText),
            limit(5)
          );
          
          const genreSnapshot = await getDocs(genreQuery);
          const genreResults: BookResult[] = genreSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              type: 'book' as const,
              title: data.title,
              author: data.author,
              cover: data.cover,
              genres: data.genres,
              rating: data.rating
            };
          });
          
          combinedResults = [...combinedResults, ...genreResults];
        } catch (error) {
          console.error('Error searching by genre:', error);
        }
        
        // Then by title
        if (combinedResults.length < 5) {
          try {
            const titleQuery = query(
              collection(db as Firestore, 'books'),
              where('searchableTitle', '>=', searchableText),
              where('searchableTitle', '<=', searchableText + '\uf8ff'),
              limit(5)
            );
            
            const titleSnapshot = await getDocs(titleQuery);
            const titleResults: BookResult[] = titleSnapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                type: 'book' as const,
                title: data.title,
                author: data.author,
                cover: data.cover,
                genres: data.genres,
                rating: data.rating
              };
            });
            
            // Filter out duplicates
            const newTitleBooks = titleResults.filter(
              book => !combinedResults.some(existing => 
                existing.type === 'book' && existing.id === book.id
              )
            );
            
            combinedResults = [...combinedResults, ...newTitleBooks];
          } catch (error) {
            console.error('Error searching by title:', error);
          }
        }
        
        // Then by author
        if (combinedResults.length < 8) {
          try {
            const authorQuery = query(
              collection(db as Firestore, 'authors'),
              where('searchableName', '>=', searchableText),
              where('searchableName', '<=', searchableText + '\uf8ff'),
              limit(3)
            );
            
            const authorSnapshot = await getDocs(authorQuery);
            const authorResults: AuthorResult[] = authorSnapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                type: 'author',
                name: data.name,
                photo: data.photo,
                bookCount: data.bookCount
              };
            });
            
            combinedResults = [...combinedResults, ...authorResults];
          } catch (error) {
            console.error('Error searching authors:', error);
          }
        }
      }
      
      // If we still have few results, get AI recommendations
      if (combinedResults.length < 5 || 
          term.toLowerCase().includes('recommend') || 
          term.toLowerCase().includes('suggest')) {
        
        const aiRecommendations = getAIRecommendations(term);
        
        // Filter out duplicates
        const aiBooks = aiRecommendations.filter(
          book => !combinedResults.some(existing => 
            existing.type === 'book' && 
            (existing.id === book.id || existing.title.toLowerCase() === book.title.toLowerCase())
          )
        );
        
        combinedResults = [...combinedResults, ...aiBooks];
      }
      
      // Handle special cases for common genres with no results
      if (combinedResults.length === 0) {
        const lowercaseTerm = term.toLowerCase();
        
        if (lowercaseTerm === 'classic' || lowercaseTerm === 'classics') {
          combinedResults = classicBooks;
        } else if (lowercaseTerm === 'romance' || lowercaseTerm === 'romantic' || lowercaseTerm === 'love') {
          combinedResults = romanceBooks;
        } else if (lowercaseTerm === 'fantasy' || lowercaseTerm === 'magic') {
          combinedResults = fantasyBooks;
        } else if (lowercaseTerm === 'science fiction' || lowercaseTerm === 'sci-fi' || lowercaseTerm === 'scifi') {
          combinedResults = scienceFictionBooks;
        } else if (lowercaseTerm === 'mystery' || lowercaseTerm === 'thriller' || lowercaseTerm === 'detective') {
          combinedResults = mysteryBooks;
        } else if (lowercaseTerm === 'non-fiction' || lowercaseTerm === 'nonfiction' || lowercaseTerm === 'factual') {
          combinedResults = nonFictionBooks;
        } else if (lowercaseTerm === 'all' || lowercaseTerm === 'books') {
          // Return a mix of all book types
          combinedResults = [
            ...popularBooks,
            ...classicBooks.slice(0, 1),
            ...romanceBooks.slice(0, 1),
            ...fantasyBooks.slice(0, 1),
            ...scienceFictionBooks.slice(0, 1),
            ...mysteryBooks.slice(0, 1),
            ...nonFictionBooks.slice(0, 1)
          ].slice(0, 10);
        } else {
          // Try to get AI recommendations for empty results
          combinedResults = getAIRecommendations(term);
        }
      }
      
      // Limit the total results
      const limitedResults = combinedResults.slice(0, 10);
      
      // Save the search term to recent searches
      if (term && term.trim() !== '') {
        const normalizedTerm = term.trim();
        if (!recentSearches.includes(normalizedTerm)) {
          const updatedSearches = [normalizedTerm, ...recentSearches].slice(0, 5);
          setRecentSearches(updatedSearches);
          localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
      }
      
      setSearchResults(limitedResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [recentSearches]);

  // Debounce the search to avoid too many Firestore queries
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      performSearch(term);
    }, 300),
    [performSearch]
  );

  // When search term changes, update search results
  useEffect(() => {
    // Immediately set loading state when term changes
    if (searchTerm) {
      setIsLoading(true);
    }
    
    // When empty, show popular books
    if (!searchTerm.trim()) {
      setSearchResults(popularBooks);
      setIsLoading(false);
      return;
    }
    
    // Debounce the actual search
    debouncedSearch(searchTerm);
    
    // Cleanup function to cancel debounced search if unmounted
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    recentSearches,
    clearRecentSearches: () => {
      setRecentSearches([]);
      localStorage.removeItem('recentSearches');
    },
    isLoading,
    aiSuggestions
  };
} 