import React, { createContext, useContext, useState, useEffect } from 'react';
import BookLoader from '../components/BookLoader';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  const startLoading = () => {
    setIsLoading(true);
    // Set a maximum loading time of 5 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    setLoadingTimeout(timeout);
  };

  const stopLoading = () => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {isLoading && <BookLoader fullScreen size="lg" />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 