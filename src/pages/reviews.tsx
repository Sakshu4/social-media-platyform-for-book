import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import ReviewHero from '../components/reviews/ReviewHero';
import FeaturedReviews from '../components/reviews/FeaturedReviews';
import AiReviewSummaries from '../components/reviews/AiReviewSummaries';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewFilters from '../components/reviews/ReviewFilters';
import CommunityEngagement from '../components/reviews/CommunityEngagement';
import Footer from '../components/Footer';

export default function ReviewsPage() {
  const { isDarkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [selectedSentiment, setSelectedSentiment] = useState('all');

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
          <ReviewHero />
          <FeaturedReviews />
          <AiReviewSummaries />
          <ReviewForm />
          <ReviewFilters 
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedSentiment={selectedSentiment}
            setSelectedSentiment={setSelectedSentiment}
          />
          <CommunityEngagement />
        </div>
        
        <Footer />
      </div>
    </main>
  );
} 