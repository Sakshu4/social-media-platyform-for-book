import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, limit, Firestore } from 'firebase/firestore';
import { useTheme } from '../contexts/ThemeContext';
import SearchBar from '../components/SearchBar';

const TestFirebasePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);

  useEffect(() => {
    async function testConnection() {
      setLoading(true);
      try {
        // Check if db is defined
        if (!db) {
          throw new Error("Firebase Firestore instance is not initialized");
        }
        
        // Try to get books collection
        const booksQuery = query(collection(db, 'books'), limit(3));
        const booksSnapshot = await getDocs(booksQuery);
        const booksList = booksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBooks(booksList);
        
        // Try to get authors collection
        const authorsQuery = query(collection(db, 'authors'), limit(3));
        const authorsSnapshot = await getDocs(authorsQuery);
        const authorsList = authorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAuthors(authorsList);
        
        setConnected(true);
        setError(null);
      } catch (err) {
        console.error('Firebase connection error:', err);
        setConnected(false);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Test</h2>
            <p className="mb-4">Try searching for a book or author to test the search functionality:</p>
            <div className="max-w-md">
              <SearchBar />
            </div>
          </div>
          
          <div className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-dark-800' : 'bg-white'} shadow-sm`}>
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            
            {loading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
                <p>Testing connection to Firebase...</p>
              </div>
            ) : connected ? (
              <div className="text-green-500 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Connected to Firebase successfully!</span>
              </div>
            ) : (
              <div className="text-red-500 space-y-2">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Failed to connect to Firebase</span>
                </div>
                {error && <p className="text-sm bg-red-100 text-red-800 p-3 rounded">{error}</p>}
              </div>
            )}
          </div>
          
          {connected && (
            <>
              <div className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-dark-800' : 'bg-white'} shadow-sm`}>
                <h2 className="text-xl font-semibold mb-4">Books Collection</h2>
                
                {books.length > 0 ? (
                  <div className="space-y-4">
                    {books.map(book => (
                      <div key={book.id} className={`p-4 rounded-md ${isDarkMode ? 'bg-dark-700' : 'bg-gray-100'}`}>
                        <h3 className="font-medium">{book.title}</h3>
                        <p className="text-sm text-gray-500">by {book.author}</p>
                        <p className="text-xs mt-2">ID: {book.id}</p>
                        <p className="text-xs mt-1">Fields: {Object.keys(book).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No books found in database. Try seeding the database first.</p>
                )}
              </div>
              
              <div className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-dark-800' : 'bg-white'} shadow-sm`}>
                <h2 className="text-xl font-semibold mb-4">Authors Collection</h2>
                
                {authors.length > 0 ? (
                  <div className="space-y-4">
                    {authors.map(author => (
                      <div key={author.id} className={`p-4 rounded-md ${isDarkMode ? 'bg-dark-700' : 'bg-gray-100'}`}>
                        <h3 className="font-medium">{author.name}</h3>
                        <p className="text-sm text-gray-500">{author.bookCount || 0} books</p>
                        <p className="text-xs mt-2">ID: {author.id}</p>
                        <p className="text-xs mt-1">Fields: {Object.keys(author).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No authors found in database. Try seeding the database first.</p>
                )}
              </div>
              
              <div className="flex justify-center mt-10">
                <a 
                  href="/admin/seed" 
                  className={`px-6 py-3 rounded-lg font-medium 
                    ${isDarkMode 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                    } transition-colors`}
                >
                  Go to Database Seed Page
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestFirebasePage; 