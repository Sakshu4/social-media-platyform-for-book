import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import Button from '../components/Button';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    favoriteGenre: ''
  });

  const handlePageFlip = (toLogin: boolean) => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsLoginPage(toLogin);
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }, 500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-400 dark:to-dark-300">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] mt-16">
        <div className="relative w-[800px] h-[600px] perspective-[2000px]">
          {/* Book Cover */}
          <AnimatePresence>
            {!isBookOpen && (
              <motion.div
                initial={{ rotateY: -30 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -180 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-900 to-purple-600' 
                    : 'bg-gradient-to-br from-primary-600 to-primary-400'
                } rounded-lg shadow-2xl cursor-pointer book-cover`}
                onClick={() => setIsBookOpen(true)}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Book Cover Design */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="absolute inset-4 border-2 border-white/20 rounded-lg" />
                  <div className="absolute inset-8 border border-white/10 rounded-lg" />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                    <Book className="w-20 h-20 relative z-10" />
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold mb-4 relative"
                  >
                    <span className="absolute -inset-2 bg-white/5 blur-sm rounded-lg" />
                    <span className="relative">BookLovers</span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg text-white/80"
                  >
                    Click to Open
                  </motion.p>
                </div>
                
                {/* Enhanced Book Effects */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white/30 to-transparent" />
                <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5 mix-blend-overlay" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Open Book Content */}
          <AnimatePresence>
            {isBookOpen && (
              <div className="relative w-full h-full flex">
                {/* Left Page (Login) */}
                <motion.div
                  initial={{ rotateY: -120 }}
                  animate={{ rotateY: isLoginPage ? 0 : 30 }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  className={`w-[400px] h-full ${
                    isDarkMode ? 'bg-dark-200' : 'bg-white'
                  } rounded-l-lg shadow-2xl p-8 origin-right relative overflow-hidden`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Page Texture and Lines */}
                  <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
                  <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-px my-7 ${
                          isDarkMode ? 'bg-gray-700/20' : 'bg-gray-300/40'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Red margin line */}
                  <div className="absolute left-7 top-0 bottom-0 w-px bg-red-400/20" />
                  
                  {isLoginPage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="h-full relative"
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex justify-center mb-3"
                        >
                          <Book className={`w-12 h-12 ${
                            isDarkMode ? 'text-purple-400' : 'text-primary-500'
                          }`} />
                        </motion.div>
                        <h1 className={`text-3xl font-bold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Welcome Back
                        </h1>
                      </div>

                      <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div className="relative">
                          <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            placeholder="Email address"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors ${
                              isDarkMode
                                ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                                : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                            }`}
                          />
                        </div>

                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
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
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          variant={isDarkMode ? 'primary' : 'secondary'}
                          size="lg"
                        >
                          Sign In
                        </Button>
                      </form>

                      <div className="mt-6 text-center">
                        <button
                          onClick={() => handlePageFlip(false)}
                          className={`text-sm font-medium ${
                            isDarkMode
                              ? 'text-purple-400 hover:text-purple-300'
                              : 'text-primary-500 hover:text-primary-600'
                          }`}
                        >
                          Don't have an account? Sign up
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Book Spine */}
                <div className="w-8 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
                  <div className="absolute inset-0 bg-[url('/leather-texture.png')] opacity-10 mix-blend-overlay" />
                </div>

                {/* Right Page (Signup) */}
                <motion.div
                  initial={{ rotateY: 120 }}
                  animate={{ rotateY: isLoginPage ? -30 : 0 }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  className={`w-[400px] h-full ${
                    isDarkMode ? 'bg-dark-200' : 'bg-white'
                  } rounded-r-lg shadow-2xl p-8 origin-left relative overflow-hidden`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Page Texture and Lines */}
                  <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
                  <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-px my-7 ${
                          isDarkMode ? 'bg-gray-700/20' : 'bg-gray-300/40'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Red margin line */}
                  <div className="absolute right-7 top-0 bottom-0 w-px bg-red-400/20" />
                  
                  {!isLoginPage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="h-full relative"
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
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

                      <form onSubmit={handleSignupSubmit} className="space-y-4">
                        <div className="relative">
                          <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <input
                            type="text"
                            name="name"
                            value={signupData.name}
                            onChange={handleSignupChange}
                            placeholder="Full name"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors ${
                              isDarkMode
                                ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                                : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                            }`}
                          />
                        </div>

                        <div className="relative">
                          <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <input
                            type="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            placeholder="Email address"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-colors ${
                              isDarkMode
                                ? 'bg-dark-300 text-white placeholder-gray-400 focus:bg-dark-400'
                                : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-gray-100'
                            }`}
                          />
                        </div>

                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={signupData.password}
                            onChange={handleSignupChange}
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
                        </div>

                        <div className="relative">
                          <Book className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <select
                            name="favoriteGenre"
                            value={signupData.favoriteGenre}
                            onChange={handleSignupChange}
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
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          variant={isDarkMode ? 'primary' : 'secondary'}
                          size="lg"
                        >
                          Create Account
                        </Button>
                      </form>

                      <div className="mt-6 text-center">
                        <button
                          onClick={() => handlePageFlip(true)}
                          className={`text-sm font-medium ${
                            isDarkMode
                              ? 'text-purple-400 hover:text-purple-300'
                              : 'text-primary-500 hover:text-primary-600'
                          }`}
                        >
                          Already have an account? Sign in
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Page Turn Effect */}
                <motion.div
                  initial={false}
                  animate={{
                    rotateY: isFlipping ? (isLoginPage ? -180 : 0) : (isLoginPage ? 0 : -180),
                    zIndex: isFlipping ? 10 : -1
                  }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 w-[400px] h-full"
                  style={{
                    transformOrigin: 'left',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of turning page */}
                  <div
                    className={`absolute inset-0 ${
                      isDarkMode ? 'bg-dark-200' : 'bg-white'
                    } rounded-r-lg shadow-xl p-8 overflow-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
                    <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-px my-7 ${
                            isDarkMode ? 'bg-gray-700/20' : 'bg-gray-300/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Back of turning page */}
                  <div
                    className={`absolute inset-0 ${
                      isDarkMode ? 'bg-dark-200' : 'bg-white'
                    } rounded-r-lg shadow-xl p-8 [transform:rotateY(180deg)] overflow-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
                    <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-px my-7 ${
                            isDarkMode ? 'bg-gray-700/20' : 'bg-gray-300/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Page Edge Shadows */}
                <div className="absolute inset-y-0 left-[400px] w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                
                {/* Page Corner Fold Effect */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-black/5 pointer-events-none transform rotate-45 origin-bottom-right" />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false }); 