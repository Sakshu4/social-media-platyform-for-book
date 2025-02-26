'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Book, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    // Apply dark mode class to body
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Book Reviews', href: '/reviews' },
    { name: 'Book Clubs', href: '/clubs' },
    { name: 'Recommendations', href: '/recommendations' },
    { name: 'Profile', href: '/profile' },
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
              ? 'bg-dark-200/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-dark-500/10'
              : 'bg-white/70 backdrop-blur-xl border-b border-black/5 shadow-lg shadow-black/5'
            : isDarkMode
              ? 'bg-transparent'
              : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Book className={`w-8 h-8 ${
                isDarkMode 
                  ? 'text-purple-400 drop-shadow-[0_0_0.3rem_#a855f7]' 
                  : 'text-primary-500 drop-shadow-[0_0_0.3rem_#3b82f6]'
              }`} />
              <span className={`ml-2 text-xl font-bold ${
                isDarkMode
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400'
              }`}>
                BookLovers
              </span>
            </motion.div>

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
                    className={`relative text-sm font-medium group ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? 'bg-purple-400' : 'bg-primary-500'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-dark-300/50 text-yellow-400 hover:bg-dark-200/50 backdrop-blur-lg'
                    : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 backdrop-blur-lg'
                } hover:shadow-lg ${
                  isDarkMode
                    ? 'hover:shadow-purple-500/20'
                    : 'hover:shadow-primary-500/20'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="secondary">Log In</Button>
                <Button>Sign Up</Button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? 'hover:bg-dark-200/50'
                    : 'hover:bg-gray-100/50'
                }`}
              >
                {isMenuOpen ? (
                  <X className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                ) : (
                  <Menu className={isDarkMode ? 'text-white' : 'text-gray-900'} />
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
                ? 'bg-dark-200/95 backdrop-blur-xl border-b border-white/5'
                : 'bg-white/95 backdrop-blur-xl border-b border-black/5'
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 10 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`block text-base font-medium ${
                      isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-1/4 ${
                    isDarkMode ? 'bg-purple-400' : 'bg-primary-500'
                  }`} />
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="secondary" className="w-full">Log In</Button>
                <Button className="w-full">Sign Up</Button>
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
              isDarkMode ? 'bg-black/40' : 'bg-black/20'
            } backdrop-blur-sm md:hidden`}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;