import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Mail, Lock, Eye, EyeOff, User, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import Button from '../components/Button';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    favoriteGenre: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Book animation variants
  const bookVariants = {
    closed: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    open: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: -40 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-400 dark:to-dark-300">
      <Navbar />
      <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 96px)', marginTop: '32px' }}>
        <div className="relative w-[800px] h-[600px] perspective-1000">
          {/* Book Cover */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute w-full h-full ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-900 to-purple-600' 
                : 'bg-gradient-to-br from-primary-600 to-primary-400'
            } rounded-lg shadow-2xl`}
            style={{ 
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Book className="w-24 h-24 text-white mb-8" />
              <h1 className="text-5xl font-bold text-white mb-12">BookLovers</h1>
            </div>
          </motion.div>

          {/* Open Book Container */}
          <div className="relative w-full h-full flex">
            {/* Left Page (Decorative) */}
            <motion.div
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`w-[400px] h-full ${
                isDarkMode ? 'bg-dark-200' : 'bg-white'
              } rounded-l-lg shadow-xl p-8`}
              style={{ transformOrigin: "right center" }}
            >
              <div className="h-full flex items-center justify-center">
                <div className={`text-center ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <Book className="w-24 h-24 mx-auto mb-4 opacity-20" />
                  <p className="italic text-lg">Turn the page to begin...</p>
                </div>
              </div>
            </motion.div>

            {/* Book Spine */}
            <div className="w-8 h-full bg-gradient-to-r from-black/20 via-transparent to-black/20 transform-gpu" />

            {/* Right Page (Signup Form) */}
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`w-[400px] h-full ${
                isDarkMode ? 'bg-dark-200' : 'bg-white'
              } rounded-r-lg shadow-xl p-8`}
              style={{ transformOrigin: "left center" }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center mb-3"
                >
                  <Book className={`w-12 h-12 ${
                    isDarkMode ? 'text-purple-400' : 'text-primary-500'
                  }`} />
                </motion.div>
                <h1 className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Start Your Journey
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  custom={0}
                  className="relative"
                >
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                    }`}
                  />
                </motion.div>

                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  custom={1}
                  className="relative"
                >
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                    }`}
                  />
                </motion.div>

                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  custom={2}
                  className="relative"
                >
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                        : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </motion.div>

                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  custom={3}
                  className="relative"
                >
                  <Book className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <select
                    name="favoriteGenre"
                    value={formData.favoriteGenre}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors appearance-none ${
                      isDarkMode
                        ? 'bg-dark-300 text-white focus:bg-dark-400'
                        : 'bg-gray-50 text-gray-900 focus:bg-gray-100'
                    }`}
                  >
                    <option value="">Select favorite genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="mystery">Mystery</option>
                    <option value="scifi">Science Fiction</option>
                    <option value="romance">Romance</option>
                    <option value="fantasy">Fantasy</option>
                  </select>
                </motion.div>

                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  custom={4}
                >
                  <Button
                    type="submit"
                    className="w-full"
                    variant={isDarkMode ? 'primary' : 'secondary'}
                    size="lg"
                  >
                    Create Account
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className={`text-sm font-medium ${
                    isDarkMode
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-primary-500 hover:text-primary-600'
                  }`}
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component with no SSR
export default dynamic(() => Promise.resolve(SignupPage), { ssr: false }); 