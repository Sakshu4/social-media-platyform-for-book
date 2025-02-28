'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Book, Sun, Moon, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setIsScrolled(currentScrollPos > 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Book Reviews', href: '/reviews' },
    { name: 'Book Clubs', href: '/clubs' },
    { name: 'Recommendations', href: '/recommendations' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? isDarkMode
              ? 'bg-dark-400/60 backdrop-blur-xl border-b border-cyberpunk-blue/20 shadow-lg shadow-cyberpunk-purple/10 hover:bg-dark-400/70 transition-all duration-300'
              : 'bg-white/60 backdrop-blur-xl border-b border-black/5 shadow-lg shadow-black/5 hover:bg-white/70 transition-all duration-300'
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-16">
              <motion.div
                className="flex items-center shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="flex items-center">
                  <Book className={`w-8 h-8 ${
                    isDarkMode 
                      ? 'text-cyberpunk-blue drop-shadow-[0_0_0.3rem_#00FFFF]' 
                      : 'text-primary-500'
                  }`} />
                  <span className={`ml-2 text-xl font-bold ${
                    isDarkMode
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-blue to-cyberpunk-pink text-glow'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
                  }`}>
                    BookLovers
                  </span>
                </Link>
              </motion.div>

              {/* Search Bar */}
              <div className="hidden lg:flex flex-1 min-w-[400px]">
                <div className="relative w-full flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search for books, authors, or genres..."
                      className={`w-full py-2 px-4 pr-12 rounded-full outline-none transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-dark-300/40 backdrop-blur-md border border-cyberpunk-blue/20 text-white placeholder-gray-400 focus:border-cyberpunk-blue/50 focus:bg-dark-300/60 hover:bg-dark-300/50'
                          : 'bg-gray-100/40 backdrop-blur-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-primary-500/50 focus:bg-white/60 hover:bg-gray-100/50'
                      }`}
                    />
                    <Search className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDarkMode}
                    className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                      isDarkMode
                        ? 'bg-dark-300/50 text-cyberpunk-blue hover:bg-dark-200/50 border border-cyberpunk-blue/20 hover:border-cyberpunk-blue/50'
                        : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 border border-gray-200 hover:border-primary-500/50'
                    }`}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Navigation and Profile Section */}
            <div className="flex items-center space-x-12">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium group px-2 ${
                        isDarkMode
                          ? 'text-gray-300 hover:text-cyberpunk-blue'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isDarkMode ? 'bg-cyberpunk-blue shadow-glow' : 'bg-primary-500'
                      }`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Profile Menu Button */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-cyberpunk-purple/20 to-cyberpunk-blue/20 text-cyberpunk-blue hover:from-cyberpunk-purple/30 hover:to-cyberpunk-blue/30 border border-cyberpunk-blue/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                      : 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-600 hover:from-primary-200 hover:to-primary-100 border border-primary-200 shadow-[0_2px_10px_rgba(139,92,246,0.1)]'
                  } relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={isProfileOpen ? { x: '100%' } : { x: '-100%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                  <User size={22} className="relative z-10" />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden ${
                        isDarkMode
                          ? 'bg-dark-300/80 backdrop-blur-xl border border-cyberpunk-blue/20 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:bg-dark-300/90'
                          : 'bg-white/80 backdrop-blur-xl border border-primary-100 shadow-[0_5px_30px_rgba(139,92,246,0.15)] hover:bg-white/90'
                      }`}
                    >
                      <div className={`px-4 py-3 border-b ${
                        isDarkMode ? 'border-cyberpunk-blue/20' : 'border-gray-100'
                      }`}>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Welcome to BookLovers
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Join our community of readers
                        </p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-cyberpunk-blue/10 hover:text-cyberpunk-blue'
                              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={18} className="mr-3" />
                          <span>Your Profile</span>
                        </Link>
                        <Link
                          href="/login"
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-cyberpunk-blue/10 hover:text-cyberpunk-blue'
                              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex items-center justify-center w-full py-2 rounded-lg transition-colors duration-200 ${
                              isDarkMode
                                ? 'bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/30 text-cyberpunk-blue'
                                : 'bg-primary-100 hover:bg-primary-200 text-primary-600'
                            }`}
                          >
                            Log In
                          </motion.div>
                        </Link>
                        <Link
                          href="/signup"
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-cyberpunk-blue/10 hover:text-cyberpunk-blue'
                              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`flex items-center justify-center w-full py-2 rounded-lg transition-colors duration-200 ${
                              isDarkMode
                                ? 'bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue text-white hover:from-cyberpunk-purple/90 hover:to-cyberpunk-blue/90'
                                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                            }`}
                          >
                            Sign Up
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? 'hover:bg-dark-200/50 text-cyberpunk-blue'
                    : 'hover:bg-gray-100/50 text-gray-900'
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-16 z-40 md:hidden ${
              isDarkMode
                ? 'bg-dark-400/95 backdrop-blur-xl border-b border-cyberpunk-blue/20'
                : 'bg-white/95 backdrop-blur-xl border-b border-black/5'
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search Bar */}
              <div className="relative w-full mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full py-2 px-4 pr-10 rounded-full outline-none transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-dark-300/50 border border-cyberpunk-blue/20 text-white placeholder-gray-400 focus:border-cyberpunk-blue/50'
                      : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-primary-500/50'
                  }`}
                />
                <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>

              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 10 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`block text-base font-medium ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-cyberpunk-blue' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-1/4 ${
                    isDarkMode ? 'bg-cyberpunk-blue shadow-glow' : 'bg-primary-500'
                  }`} />
                </motion.div>
              ))}

              {/* Mobile Profile Links */}
              <div className="pt-4 space-y-3">
                <Link
                  href="/profile"
                  className={`block text-base font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyberpunk-blue' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className={`block text-base font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyberpunk-blue' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className={`block text-base font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyberpunk-blue' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-30 ${
              isDarkMode ? 'bg-dark-400/40' : 'bg-black/20'
            } backdrop-blur-sm md:hidden`}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;