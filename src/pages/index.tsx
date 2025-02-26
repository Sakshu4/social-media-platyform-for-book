import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedBooks from '../components/FeaturedBooks';
import BookClubs from '../components/BookClubs';
import Gamification from '../components/Gamification';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function HomePage() {
  const { isDarkMode } = useTheme();

  return (
    <main className={`min-h-screen relative ${isDarkMode ? 'bg-dark-100' : 'bg-gray-50'}`}>
      <div className="relative z-10">
        <Navbar />
        <div className="space-y-20 pb-20">
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