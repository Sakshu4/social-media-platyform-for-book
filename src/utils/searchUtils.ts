import { db } from '../firebaseConfig';
import { doc, setDoc, updateDoc, collection, DocumentReference } from 'firebase/firestore';

/**
 * Normalizes text for searching by:
 * - Converting to lowercase
 * - Removing diacritical marks
 * - Removing extra spaces
 * - Removing special characters
 * 
 * @param text The text to normalize for search
 * @returns Normalized text
 */
export const createSearchableText = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/[^\w\s]/g, ' ')        // Replace special chars with spaces
    .replace(/\s+/g, ' ')            // Replace multiple spaces with single space
    .trim();
};

/**
 * Creates keywords array from text for improved search
 * This function is optimized to create more relevant keywords
 */
export const generateKeywords = (text: string): string[] => {
  if (!text) return [];
  
  const searchableText = createSearchableText(text);
  const words = searchableText.split(' ');
  
  // Generate all possible combinations of words for better search
  const keywords: string[] = [];
  
  // Add individual words
  words.forEach(word => {
    if (word.length > 2) { // Only add words with more than 2 characters
      keywords.push(word);
    }
  });
  
  // Add combinations of words (up to 3 words)
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j <= i + 3 && j < words.length; j++) {
      const phrase = words.slice(i, j + 1).join(' ');
      if (phrase.length > 3) {
        keywords.push(phrase);
      }
    }
  }
  
  // Add beginning substrings for partial matching
  words.forEach(word => {
    if (word.length > 4) {
      for (let i = 3; i < word.length; i++) {
        keywords.push(word.substring(0, i));
      }
    }
  });
  
  // Fix TypeScript error with Set conversion
  return Array.from(new Set(keywords)).slice(0, 50); // Remove duplicates and limit to 50 keywords max
};

/**
 * Prepares a book object for Firestore with searchable fields
 */
export const prepareBookForFirestore = (book: any) => {
  if (!book) return {};
  
  // Create searchable fields
  const searchableTitle = createSearchableText(book.title || '');
  const searchableAuthor = createSearchableText(book.author || '');
  const searchableDescription = createSearchableText(book.description || '');
  
  // Add genre keywords for better search by genre
  const searchableGenres = (book.genres || []).map((genre: string) => 
    createSearchableText(genre)
  );
  
  // Generate keywords with weighting - prioritize title and author
  const titleKeywords = generateKeywords(book.title || '').map(k => `title_${k}`);
  const authorKeywords = generateKeywords(book.author || '').map(k => `author_${k}`);
  const descKeywords = generateKeywords(book.description || '').slice(0, 20); // Limit description keywords
  const genreKeywords = (book.genres || []).map((genre: string) => `genre_${createSearchableText(genre)}`);
  
  return {
    ...book,
    searchableTitle,
    searchableAuthor, 
    searchableDescription,
    searchableGenres,
    keywords: [
      ...titleKeywords,
      ...authorKeywords,
      ...descKeywords,
      ...genreKeywords
    ].slice(0, 100) // Firestore has limits on array size
  };
};

/**
 * Prepares a review object for Firestore with searchable fields
 */
export const prepareReviewForFirestore = (review: any) => {
  if (!review) return {};
  
  const searchableContent = createSearchableText(review.content || '');
  const searchableBookTitle = createSearchableText(review.bookTitle || '');
  
  return {
    ...review,
    searchableContent,
    searchableBookTitle,
    keywords: [
      ...generateKeywords(review.content || ''),
      ...generateKeywords(review.bookTitle || '')
    ].slice(0, 100)
  };
};

/**
 * Prepares an author object for Firestore with searchable fields
 */
export const prepareAuthorForFirestore = (author: any) => {
  if (!author) return {};
  
  const searchableName = createSearchableText(author.name || '');
  const searchableBio = createSearchableText(author.bio || '');
  
  return {
    ...author,
    searchableName,
    searchableBio,
    keywords: [
      ...generateKeywords(author.name || ''),
      ...generateKeywords(author.bio || '')
    ].slice(0, 100)
  };
};

/**
 * Adds a book to Firestore with proper search indexing
 */
export const addBookToFirestore = async (book: any) => {
  if (!db) {
    console.error('Firestore is not initialized');
    return '';
  }
  
  try {
    const preparedBook = prepareBookForFirestore(book);
    const booksCollection = collection(db, 'books');
    const bookDocRef = preparedBook.id ? doc(db, 'books', preparedBook.id) : doc(booksCollection);
    
    await setDoc(bookDocRef, preparedBook);
    return bookDocRef.id;
  } catch (error) {
    console.error('Error adding book to Firestore:', error);
    return '';
  }
};

/**
 * Updates search fields for an existing book in Firestore
 */
export const updateBookSearchFields = async (bookId: string, book: any) => {
  if (!db || !bookId) {
    console.error('Firestore is not initialized or bookId is missing');
    return;
  }
  
  try {
    const preparedBook = prepareBookForFirestore(book);
    const bookRef = doc(db, 'books', bookId);
    
    await updateDoc(bookRef, {
      searchableTitle: preparedBook.searchableTitle,
      searchableAuthor: preparedBook.searchableAuthor,
      searchableDescription: preparedBook.searchableDescription,
      searchableGenres: preparedBook.searchableGenres,
      keywords: preparedBook.keywords
    });
  } catch (error) {
    console.error('Error updating book search fields:', error);
  }
};