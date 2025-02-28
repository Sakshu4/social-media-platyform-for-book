import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dynamically import components with SSR disabled to avoid hydration issues
const ClubHero = dynamic(() => import('../components/clubs/ClubHero'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-dark-300" />
});
const AiRecommendations = dynamic(() => import('../components/clubs/AiRecommendations'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-dark-400" />
});
const LiveDiscussions = dynamic(() => import('../components/clubs/LiveDiscussions'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-200 dark:bg-dark-300" />
});
const ClubChallenges = dynamic(() => import('../components/clubs/ClubChallenges'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-dark-400" />
});

export default function ClubsPage() {
  const { isDarkMode } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
          <ClubHero />
          
          <AiRecommendations 
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
          
          <LiveDiscussions />
          
          <ClubChallenges />
        </div>
        
        <Footer />
      </div>
    </main>
  );
} 