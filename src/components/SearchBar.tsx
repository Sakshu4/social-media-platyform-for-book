import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, Book, User, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSearch, SearchResult, BookResult } from '../hooks/useSearch';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaSpinner, FaClock, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const { isDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    recentSearches,
    clearRecentSearches,
    isLoading,
    aiSuggestions
  } = useSearch();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus the input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDropdownOpen]);

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Open dropdown when typing
    if (value.trim()) {
      setIsDropdownOpen(true);
    } else {
      // For empty input, show recent searches if available
      setIsDropdownOpen(recentSearches.length > 0);
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  // Handle search result click
  const handleResultClick = (result: SearchResult) => {
    setIsDropdownOpen(false);
    
    if (result.type === 'book') {
      router.push(`/books/${result.id}`);
    } else if (result.type === 'author') {
      router.push(`/authors/${result.id}`);
    } else if (result.type === 'review') {
      router.push(`/reviews/${result.id}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsDropdownOpen(true);
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    setIsDropdownOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search for books, authors, genres..."
          className={`w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-dark-800 text-white' : 'bg-white text-gray-800'}`}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
        </div>
        {searchTerm && (
          <button 
            onClick={handleClearSearch}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isDarkMode ? 'bg-dark-700' : 'bg-gray-200'}`}
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      {isDropdownOpen && (
        <div className={`absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto ${isDarkMode ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
          {/* Loading indicator */}
          {isLoading && searchTerm && (
            <div className="py-2 px-4 text-gray-500 italic">
              <FaSpinner className="inline animate-spin mr-2" /> Finding books for you...
            </div>
          )}
          
          {/* AI Suggestions */}
          {!isLoading && searchTerm && aiSuggestions.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500">SUGGESTIONS</h3>
              {aiSuggestions.map((suggestion, index) => (
                <div 
                  key={`ai-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <FaSearch className="text-gray-400 mr-2" />
                  <span className="font-medium">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Search Results */}
          {!isLoading && searchResults.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500">RESULTS</h3>
              {searchResults.map((result) => (
                <div 
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex"
                >
                  {result.type === 'book' && (
                    <>
                      <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                        {result.cover ? (
                          <img src={result.cover} alt={result.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                            No cover
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-gray-600">{result.author}</div>
                        {result.genres && (
                          <div className="text-xs text-gray-500">{result.genres.join(', ')}</div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {result.type === 'author' && (
                    <>
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        {result.photo ? (
                          <img src={result.photo} alt={result.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                            No photo
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-gray-600">{result.bookCount || 0} books</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Recent Searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="px-4 flex justify-between items-center">
                <h3 className="text-xs font-semibold text-gray-500">RECENT SEARCHES</h3>
                <button 
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((term, index) => (
                <div 
                  key={`recent-${index}`}
                  onClick={() => handleRecentSearchClick(term)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <FaClock className="text-gray-400 mr-2" />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* No Results */}
          {!isLoading && searchTerm && searchResults.length === 0 && aiSuggestions.length === 0 && (
            <div className="py-4 px-4 text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 