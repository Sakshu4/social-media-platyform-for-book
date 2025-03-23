import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedBooks from '../components/FeaturedBooks';
import BookClubs from '../components/BookClubs';
import Gamification from '../components/Gamification';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import BookLoader from '../components/BookLoader';
import { app, db } from '../firebaseConfig';

export default function HomePage() {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check Firebase initialization
    if (app && db) {
      console.log('Firebase initialized successfully!', app.name);
    } else {
      console.error('Firebase initialization failed!');
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className={`min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <BookLoader size="lg" />
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen relative ${
      isDarkMode 
        ? 'bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 text-white' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900'
    }`}>
      <div className="relative z-10">
        {/* Cyberpunk gradient overlay */}
        {isDarkMode && (
          <div className="absolute inset-0 bg-cyberpunk-gradient opacity-10 pointer-events-none" />
        )}
        <Navbar />
        <div className="space-y-4 pb-8">
          <HeroSection />
          <FeaturedBooks />
          <BookClubs />
          <Gamification />
        </div>
        <Footer />
      </div>
    </main>
  );
} 