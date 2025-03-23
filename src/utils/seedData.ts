import { db } from '../firebaseConfig';
import { 
  collection, doc, setDoc, deleteDoc, 
  getDocs, writeBatch, query, limit, Firestore
} from 'firebase/firestore';
import { createSearchableText } from './searchUtils';

// Sample books data with emotional tags and diverse categories
export const books = [
  // Happy/Uplifting Books
  {
    id: 'the-house-in-the-cerulean-sea',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80',
    description: 'A magical story about finding family in the most unexpected places.',
    genres: ['Fantasy', 'LGBT', 'Feel-Good', 'Happy'],
    rating: 4.5,
    year: 2020,
    mood: 'Happy',
    pageCount: 396
  },
  {
    id: 'good-omens',
    title: 'Good Omens',
    author: 'Terry Pratchett & Neil Gaiman',
    cover: 'https://images.unsplash.com/photo-1531901599634-485ed3a85db3?q=80',
    description: 'The humorous tale of an angel and demon trying to prevent the apocalypse.',
    genres: ['Fantasy', 'Humor', 'Comedy', 'Happy'],
    rating: 4.3,
    year: 1990,
    mood: 'Happy',
    pageCount: 288
  },
  
  // Sad/Emotional Books
  {
    id: 'a-little-life',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80',
    description: 'A heart-wrenching story of trauma and friendship spanning decades.',
    genres: ['Contemporary', 'Literary Fiction', 'LGBT', 'Sad'],
    rating: 4.3,
    year: 2015,
    mood: 'Sad',
    pageCount: 720
  },
  {
    id: 'when-breath-becomes-air',
    title: 'When Breath Becomes Air',
    author: 'Paul Kalanithi',
    cover: 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?q=80',
    description: 'A memoir by a neurosurgeon diagnosed with terminal cancer.',
    genres: ['Memoir', 'Biography', 'Medical', 'Sad'],
    rating: 4.4,
    year: 2016,
    mood: 'Sad',
    pageCount: 228
  },
  
  // Adventure Books
  {
    id: 'the-lost-city-of-z',
    title: 'The Lost City of Z',
    author: 'David Grann',
    cover: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80',
    description: 'The true story of Percy Fawcett\'s search for a lost city in the Amazon.',
    genres: ['Adventure', 'Non-Fiction', 'Exploration', 'History'],
    rating: 4.0,
    year: 2009,
    mood: 'Adventurous',
    pageCount: 352
  },
  {
    id: 'into-the-wild',
    title: 'Into the Wild',
    author: 'Jon Krakauer',
    cover: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80',
    description: 'The story of Christopher McCandless\'s journey into the Alaskan wilderness.',
    genres: ['Adventure', 'Biography', 'Travel', 'Survival'],
    rating: 4.0,
    year: 1996,
    mood: 'Adventurous',
    pageCount: 224
  },
  
  // Classic Books
  {
    id: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80',
    description: 'A classic novel about manners, upbringing, morality, education, and marriage.',
    genres: ['Classic', 'Romance', 'Literary Fiction'],
    rating: 4.3,
    year: 1813,
    mood: 'Romantic',
    pageCount: 432
  },
  {
    id: 'to-kill-a-mockingbird',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1603162617030-b91671d2173b?q=80',
    description: 'A novel about racial injustice and the loss of innocence in the American South.',
    genres: ['Classic', 'Historical Fiction', 'Coming of Age'],
    rating: 4.3,
    year: 1960,
    mood: 'Reflective',
    pageCount: 281
  },
  
  // Romance Books
  {
    id: 'the-love-hypothesis',
    title: 'The Love Hypothesis',
    author: 'Ali Hazelwood',
    cover: 'https://images.unsplash.com/photo-1551654441-f0e34c313b91?q=80',
    description: 'A fake dating arrangement between academics turns into something real.',
    genres: ['Romance', 'Contemporary', 'Fiction', 'Humor'],
    rating: 4.2,
    year: 2021,
    mood: 'Romantic',
    pageCount: 384
  },
  {
    id: 'red-white-and-royal-blue',
    title: 'Red, White & Royal Blue',
    author: 'Casey McQuiston',
    cover: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80',
    description: 'Romance between the First Son of the US and a British prince.',
    genres: ['Romance', 'LGBT', 'Contemporary', 'Humor'],
    rating: 4.2,
    year: 2019,
    mood: 'Romantic',
    pageCount: 432
  },
  
  // Inspirational Books
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80',
    description: 'Proven strategies to build good habits and break bad ones.',
    genres: ['Self-Help', 'Personal Development', 'Psychology', 'Inspirational'],
    rating: 4.4,
    year: 2018,
    mood: 'Inspired',
    pageCount: 320
  },
  {
    id: 'becoming',
    title: 'Becoming',
    author: 'Michelle Obama',
    cover: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80',
    description: 'The memoir of the former First Lady of the United States.',
    genres: ['Memoir', 'Biography', 'Autobiography', 'Inspirational'],
    rating: 4.6,
    year: 2018,
    mood: 'Inspired',
    pageCount: 448
  },
  
  // Mystery/Thriller Books
  {
    id: 'gone-girl',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    cover: 'https://images.unsplash.com/photo-1518742772913-b2017cf7fc32?q=80',
    description: 'A psychological thriller about a woman who disappears on her wedding anniversary.',
    genres: ['Thriller', 'Mystery', 'Suspense', 'Crime'],
    rating: 4.1,
    year: 2012,
    mood: 'Tense',
    pageCount: 432
  },
  {
    id: 'the-silent-patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80',
    description: 'A woman shoots her husband and then refuses to speak.',
    genres: ['Thriller', 'Mystery', 'Psychological', 'Suspense'],
    rating: 4.2,
    year: 2019,
    mood: 'Mysterious',
    pageCount: 336
  },
  
  // Science Fiction Books
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80',
    description: 'A lone astronaut must save Earth from an extinction-level threat.',
    genres: ['Science Fiction', 'Space', 'Adventure'],
    rating: 4.5,
    year: 2021,
    mood: 'Exciting',
    pageCount: 496
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1632751328992-dd6af59052a3?q=80',
    description: 'The story of a young man\'s journey to protect the most vital substance in the galaxy.',
    genres: ['Science Fiction', 'Space Opera', 'Classic'],
    rating: 4.2,
    year: 1965,
    mood: 'Epic',
    pageCount: 412
  }
];

// Sample authors data
export const authors = [
  {
    id: 'tj-klune',
    name: 'TJ Klune',
    bio: 'Lambda Literary Award-winning author known for fantasy and romance novels.',
    bookCount: 15,
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80'
  },
  {
    id: 'hanya-yanagihara',
    name: 'Hanya Yanagihara',
    bio: 'American novelist and editor known for "A Little Life" and "The People in the Trees".',
    bookCount: 3,
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80'
  },
  {
    id: 'david-grann',
    name: 'David Grann',
    bio: 'American journalist and author who writes about true crime and history.',
    bookCount: 4,
    photo: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80'
  },
  {
    id: 'jane-austen',
    name: 'Jane Austen',
    bio: 'English novelist known for her six major novels including "Pride and Prejudice".',
    bookCount: 6,
    photo: 'https://images.unsplash.com/photo-1508084133331-25be8f0a7b6e?q=80'
  },
  {
    id: 'casey-mcquiston',
    name: 'Casey McQuiston',
    bio: 'New York Times bestselling author of LGBTQ+ romantic comedies.',
    bookCount: 3,
    photo: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80'
  },
  {
    id: 'james-clear',
    name: 'James Clear',
    bio: 'Author and speaker focused on habits, decision-making, and continuous improvement.',
    bookCount: 1,
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80'
  },
  {
    id: 'andy-weir',
    name: 'Andy Weir',
    bio: 'American science fiction author known for technically accurate novels like "The Martian".',
    bookCount: 3,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80'
  }
];

// Sample reviews data
export const reviews = [
  {
    id: 'review-cerulean-1',
    title: 'A heartwarming tale that changed my perspective',
    bookId: 'the-house-in-the-cerulean-sea',
    bookTitle: 'The House in the Cerulean Sea',
    username: 'BookLover42',
    content: 'This book was exactly what I needed during these difficult times. It\'s like a warm hug in book form.',
    rating: 5,
    date: '2023-02-15'
  },
  {
    id: 'review-little-life-1',
    title: 'Emotionally devastating but beautifully written',
    bookId: 'a-little-life',
    bookTitle: 'A Little Life',
    username: 'LiteraryReader',
    content: 'This book broke me. It\'s not an easy read, but it\'s an important one. The character development is unmatched.',
    rating: 5,
    date: '2022-11-03'
  },
  {
    id: 'review-hail-mary-1',
    title: 'The best sci-fi novel I\'ve read in years',
    bookId: 'project-hail-mary',
    bookTitle: 'Project Hail Mary',
    username: 'SciFiEnthusiast',
    content: 'Andy Weir does it again! The perfect blend of science, humor, and heart-pounding adventure.',
    rating: 5,
    date: '2023-07-19'
  },
  {
    id: 'review-love-hypothesis-1',
    title: 'Cute romance with great representation',
    bookId: 'the-love-hypothesis',
    bookTitle: 'The Love Hypothesis',
    username: 'RomanceReader',
    content: 'As someone in STEM, I appreciated the academic setting and the realistic portrayal of women in science.',
    rating: 4,
    date: '2023-05-22'
  }
];

/**
 * Seeds the Firestore database with sample data
 * @returns Object with status information
 */
export const seedData = async () => {
  try {
    // Ensure db is defined
    if (!db) {
      throw new Error('Firestore is not initialized');
    }
    
    const batch = writeBatch(db as Firestore);
    
    // Add books with searchable fields
    const booksCount = books.length;
    for (const book of books) {
      const bookRef = doc(db as Firestore, 'books', book.id);
      
      // Create searchable fields
      const searchableTitle = createSearchableText(book.title);
      const searchableAuthor = createSearchableText(book.author);
      const searchableGenres = book.genres ? book.genres.map(genre => createSearchableText(genre)) : [];
      
      batch.set(bookRef, {
        ...book,
        searchableTitle,
        searchableAuthor,
        searchableGenres,
        mood: book.mood || '',
      });
    }
    
    // Add authors with searchable fields
    const authorsCount = authors.length;
    for (const author of authors) {
      const authorRef = doc(db as Firestore, 'authors', author.id);
      
      // Create searchable field
      const searchableName = createSearchableText(author.name);
      
      batch.set(authorRef, {
        ...author,
        searchableName
      });
    }
    
    // Add reviews with searchable fields
    const reviewsCount = reviews.length;
    for (const review of reviews) {
      const reviewRef = doc(db as Firestore, 'reviews', review.id);
      
      // Create searchable fields
      const searchableTitle = createSearchableText(review.title);
      const searchableContent = createSearchableText(review.content);
      
      batch.set(reviewRef, {
        ...review,
        searchableTitle,
        searchableContent
      });
    }
    
    // Commit the batch write
    await batch.commit();
    
    return {
      success: true,
      books: booksCount,
      authors: authorsCount,
      reviews: reviewsCount
    };
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    throw error;
  }
};

/**
 * Clears all test data from Firestore
 * @returns Object with status information
 */
export const clearData = async () => {
  try {
    // Ensure db is defined
    if (!db) {
      throw new Error('Firestore is not initialized');
    }
    
    // Delete all books
    const booksSnapshot = await getDocs(collection(db as Firestore, 'books'));
    const bookBatch = writeBatch(db as Firestore);
    booksSnapshot.docs.forEach(doc => {
      bookBatch.delete(doc.ref);
    });
    await bookBatch.commit();
    
    // Delete all authors
    const authorsSnapshot = await getDocs(collection(db as Firestore, 'authors'));
    const authorBatch = writeBatch(db as Firestore);
    authorsSnapshot.docs.forEach(doc => {
      authorBatch.delete(doc.ref);
    });
    await authorBatch.commit();
    
    // Delete all reviews
    const reviewsSnapshot = await getDocs(collection(db as Firestore, 'reviews'));
    const reviewBatch = writeBatch(db as Firestore);
    reviewsSnapshot.docs.forEach(doc => {
      reviewBatch.delete(doc.ref);
    });
    await reviewBatch.commit();
    
    return { success: true };
  } catch (error) {
    console.error('Error clearing Firestore data:', error);
    throw error;
  }
};