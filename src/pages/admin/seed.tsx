import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { seedData, clearData } from '../../utils/seedData';
import { Trash, Database, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const SeedPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);

  const handleSeedData = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const seedResult = await seedData();
      setResult({ 
        success: true, 
        message: "Database seeded successfully!", 
        details: `Added: ${seedResult.books} books, ${seedResult.authors} authors, ${seedResult.reviews} reviews`
      });
    } catch (error) {
      console.error('Error seeding data:', error);
      setResult({ 
        success: false, 
        message: "Failed to seed database", 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    setClearLoading(true);
    setResult(null);
    
    try {
      await clearData();
      setResult({ success: true, message: "Database cleared successfully!" });
    } catch (error) {
      console.error('Error clearing data:', error);
      setResult({ 
        success: false, 
        message: "Failed to clear database", 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setClearLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Database Management</h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Populate or clear your Firebase database for testing
            </p>
          </div>
          
          <div className={`p-8 rounded-xl mb-8 ${isDarkMode ? 'bg-dark-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Database className="mr-3 text-primary-500" size={24} />
              Firestore Database Actions
            </h2>
            
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-medium mb-3">Seed Test Data</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This will populate your Firestore database with sample books, authors, and reviews for testing.
                </p>
                <button
                  onClick={handleSeedData}
                  disabled={loading}
                  className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium transition-all
                    ${loading ? 
                      (isDarkMode ? 'bg-primary-700 cursor-not-allowed' : 'bg-primary-300 cursor-not-allowed') : 
                      (isDarkMode ? 'bg-primary-600 hover:bg-primary-500' : 'bg-primary-500 hover:bg-primary-600')
                    } text-white`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Seeding Database...
                    </>
                  ) : (
                    <>
                      <Database className="w-5 h-5 mr-2" />
                      Seed Test Data
                    </>
                  )}
                </button>
              </div>
              
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-medium mb-3">Clear Test Data</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This will remove all books, authors, and reviews from your Firestore database.
                </p>
                <button
                  onClick={handleClearData}
                  disabled={clearLoading}
                  className={`flex items-center justify-center w-full py-3 px-6 rounded-lg font-medium transition-all
                    ${clearLoading ? 
                      (isDarkMode ? 'bg-red-700 cursor-not-allowed' : 'bg-red-300 cursor-not-allowed') : 
                      (isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-500 hover:bg-red-600')
                    } text-white`}
                >
                  {clearLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Clearing Database...
                    </>
                  ) : (
                    <>
                      <Trash className="w-5 h-5 mr-2" />
                      Clear All Data
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Result Message */}
            {result && (
              <div className={`mt-8 p-4 rounded-lg ${
                result.success ? 
                  (isDarkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-100 border border-green-200') : 
                  (isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-100 border border-red-200')
              }`}>
                <div className="flex items-start">
                  {result.success ? (
                    <CheckCircle className={`w-6 h-6 mr-3 flex-shrink-0 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                  ) : (
                    <AlertCircle className={`w-6 h-6 mr-3 flex-shrink-0 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                  )}
                  <div>
                    <h4 className={`font-medium ${
                      result.success ? 
                        (isDarkMode ? 'text-green-400' : 'text-green-700') : 
                        (isDarkMode ? 'text-red-400' : 'text-red-700')
                    }`}>
                      {result.message}
                    </h4>
                    {result.details && (
                      <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {result.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/test-firebase" 
              className={`inline-block py-2 px-4 rounded-lg text-sm transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Go to Firebase Test Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedPage; 