import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';
import Navbar from '../components/Navbar';
import EmotionPicker from '../components/recommendations/EmotionPicker';
import AiBookList from '../components/recommendations/AiBookList';
import PersonalizedSuggestions from '../components/recommendations/PersonalizedSuggestions';
import CollaborativeRecommendations from '../components/recommendations/CollaborativeRecommendations';
import Footer from '../components/Footer';

export default function RecommendationsPage() {
  const { isDarkMode } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const [selectedEmotion, setSelectedEmotion] = useState('inspired');
  const [userPreferences, setUserPreferences] = useState({
    genres: ['fantasy', 'science-fiction'],
    readingLevel: 'intermediate',
    favoriteAuthors: ['Brandon Sanderson', 'Neil Gaiman'],
  });

  useEffect(() => {
    const loadRecommendations = async () => {
      startLoading();
      try {
        // Simulate API call for recommendations
        await new Promise(resolve => setTimeout(resolve, 2000));
      } finally {
        stopLoading();
      }
    };

    loadRecommendations();
  }, [selectedEmotion]);

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
          {/* Emotion-based Recommendations */}
          <section>
            <EmotionPicker
              selectedEmotion={selectedEmotion}
              setSelectedEmotion={setSelectedEmotion}
            />
            <AiBookList emotion={selectedEmotion} />
          </section>

          {/* Personalized Recommendations */}
          <PersonalizedSuggestions
            preferences={userPreferences}
            onUpdatePreferences={setUserPreferences}
          />

          {/* Collaborative Filtering Recommendations */}
          <CollaborativeRecommendations />
        </div>
        
        <Footer />
      </div>
    </main>
  );
} 