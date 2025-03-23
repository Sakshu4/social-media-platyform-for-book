import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Library, 
  Star, 
  Award, 
  Users, 
  BookOpen, 
  Clock, 
  TrendingUp,
  Settings,
  Edit3,
  BookMarked,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const ProfilePage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('reading');
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    username: "@bookworm_sarah",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80",
    bio: "Avid reader | Book Club Leader | Fantasy & Sci-Fi Enthusiast",
    joinDate: "January 2024",
    stats: {
      booksRead: 147,
      following: 234,
      followers: 512,
      reviews: 89,
    },
    achievements: [
      { name: "Bookworm", icon: Book, description: "Read 100 books" },
      { name: "Reviewer", icon: Star, description: "Write 50 reviews" },
      { name: "Social Reader", icon: Users, description: "Join 5 book clubs" },
    ],
    currentlyReading: [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        progress: 65,
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80"
      },
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        progress: 30,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80"
      }
    ],
    recentActivity: [
      {
        type: "review",
        book: "Dune",
        rating: 5,
        date: "2 days ago"
      },
      {
        type: "finished",
        book: "The Song of Achilles",
        date: "1 week ago"
      },
      {
        type: "joined",
        club: "Sci-Fi Explorers",
        date: "2 weeks ago"
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -1, 1, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2
        }
      }
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-b from-dark-400 via-dark-300 to-dark-400 text-white' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900'
    }`}>
      <Navbar />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base Layer with Gradient */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-dark-400 via-purple-900/20 to-dark-300' 
            : 'bg-gradient-to-br from-primary-50 via-purple-100/20 to-primary-100'
        } transition-all duration-1000`} />

        {/* Animated Nebula Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`nebula-${index}`}
              className={`absolute rounded-full filter blur-3xl mix-blend-soft-light ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600/30 via-cyan-500/30 to-pink-500/30' 
                  : 'bg-gradient-to-r from-primary-500/20 via-blue-400/20 to-purple-400/20'
              }`}
              style={{
                width: '70%',
                height: '70%',
                left: `${index * 20}%`,
                top: `${index * 15}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={`orb-${index}`}
              className={`absolute rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400/40 to-cyan-400/40' 
                  : 'bg-gradient-to-r from-primary-400/30 to-blue-400/30'
              } backdrop-blur-sm`}
              style={{
                width: Math.random() * 6 + 4 + 'px',
                height: Math.random() * 6 + 4 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 1, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated Light Rays */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        >
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={`ray-${index}`}
              className={`absolute ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-purple-500/10 via-cyan-500/10 to-transparent' 
                  : 'bg-gradient-to-b from-primary-500/10 via-blue-400/10 to-transparent'
              }`}
              style={{
                width: '1px',
                height: '100%',
                left: `${10 + index * 20}%`,
                transform: 'skewX(-20deg)',
                transformOrigin: 'top',
                filter: 'blur(1px)',
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleY: [0, 1, 0],
                top: ['0%', '100%'],
              }}
              transition={{
                duration: 4,
                delay: index * 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        {/* Subtle Grid Pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${
              isDarkMode ? 'rgba(139, 92, 246, 0.03)' : 'rgba(79, 70, 229, 0.02)'
            } 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ambient Glow */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-radial from-purple-500/5 via-transparent to-transparent' 
            : 'bg-gradient-radial from-primary-500/5 via-transparent to-transparent'
        } blur-3xl opacity-50`} />
      </div>

      {/* Main Content Container with improved backdrop blur */}
      <div className={`relative z-10 ${
        isDarkMode 
          ? 'bg-dark-400/50 backdrop-blur-[3px]' 
          : 'bg-white/50 backdrop-blur-[3px]'
      }`}>
        {/* Profile Header with Enhanced Animations */}
        <div className="relative pt-24 pb-16">
          <motion.div 
            className="absolute inset-0 h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-10" />
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 0% 0%, ${
                  isDarkMode ? 'rgba(147, 51, 234, 0.1)' : 'rgba(79, 70, 229, 0.1)'
                } 0%, transparent 50%)`,
              }}
            />
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pt-8">
              {/* Enhanced Avatar Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-32 h-32 rounded-full overflow-hidden ring-4 ${
                  isDarkMode ? 'ring-purple-500' : 'ring-primary-500'
                } shadow-xl relative group`}>
                  <motion.img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <motion.button
                  className={`absolute bottom-0 right-0 p-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-dark-200 text-purple-400 hover:bg-dark-300' 
                      : 'bg-white text-primary-500 hover:bg-gray-50'
                  } shadow-lg transition-all duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit3 size={16} />
                </motion.button>
              </motion.div>

              {/* Enhanced Profile Info */}
              <motion.div 
                className="flex-1 text-center md:text-left"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <motion.h1 
                    className="text-3xl font-bold mb-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    {userData.name}
                  </motion.h1>
                  <motion.p 
                    className={`text-lg ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } mb-2`}
                    whileHover={{ x: 5 }}
                  >
                    {userData.username}
                  </motion.p>
                  <motion.p 
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } mb-4`}
                    whileHover={{ x: 5 }}
                  >
                    {userData.bio}
                  </motion.p>
                </motion.div>

                {/* Enhanced Stats */}
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-6"
                  variants={containerVariants}
                >
                  {Object.entries(userData.stats).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="text-center relative group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-lg -z-10 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{ scale: [0.9, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                      />
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? 'text-purple-400' : 'text-primary-500'
                      }`}>
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {value}
                        </motion.span>
                      </p>
                      <p className={`text-sm capitalize ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{key}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Enhanced Actions */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="sm">
                    <Settings size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Achievements */}
            <motion.div
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {userData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  className={`p-4 rounded-xl ${
                    isDarkMode 
                      ? 'bg-dark-200' 
                      : 'bg-white'
                  } shadow-lg relative group cursor-pointer`}
                  variants={achievementVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onHoverStart={() => setHoveredAchievement(achievement.name)}
                  onHoverEnd={() => setHoveredAchievement(null)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="flex items-center gap-4 relative">
                    <motion.div
                      className={`p-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-purple-500/10 text-purple-400' 
                          : 'bg-primary-500/10 text-primary-500'
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <achievement.icon size={24} />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-semibold"
                        animate={{
                          color: hoveredAchievement === achievement.name
                            ? isDarkMode ? '#A855F7' : '#6366F1'
                            : isDarkMode ? '#FFFFFF' : '#111827'
                        }}
                      >
                        {achievement.name}
                      </motion.h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            className="flex gap-8 border-b border-gray-200 dark:border-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {['reading', 'reviews', 'clubs', 'favorites'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-sm font-medium capitalize transition-colors duration-200 relative ${
                  activeTab === tab
                    ? isDarkMode
                      ? 'text-purple-400'
                      : 'text-primary-500'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
                variants={tabVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isDarkMode ? 'bg-purple-400' : 'bg-primary-500'
                    }`}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Currently Reading Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {userData.currentlyReading.map((book, index) => (
                <motion.div
                  key={book.title}
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-dark-200' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow duration-300 group`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-6">
                    <motion.div 
                      className="w-24 h-36 rounded-lg overflow-hidden shadow-lg relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        className="text-lg font-semibold mb-2"
                        whileHover={{ x: 5 }}
                      >
                        {book.title}
                      </motion.h3>
                      <motion.p 
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        } mb-4`}
                        whileHover={{ x: 5 }}
                      >
                        {book.author}
                      </motion.p>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                              isDarkMode
                                ? 'bg-purple-500/20 text-purple-400'
                                : 'bg-primary-500/20 text-primary-500'
                            }`}>
                              In Progress
                            </span>
                          </motion.div>
                          <motion.div 
                            className={`text-right ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-sm font-semibold">
                              {book.progress}%
                            </span>
                          </motion.div>
                        </div>
                        <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded-full ${
                          isDarkMode ? 'bg-dark-300' : 'bg-gray-200'
                        }`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${book.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              isDarkMode ? 'bg-purple-500' : 'bg-primary-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Recent Activity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <motion.h2 
              className="text-xl font-bold mb-6"
              variants={itemVariants}
            >
              Recent Activity
            </motion.h2>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {userData.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-dark-200' : 'bg-white'
                  } shadow-lg cursor-pointer`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setExpandedActivity(expandedActivity === index ? null : index)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-primary-500/10 text-primary-500'
                      }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {activity.type === 'review' && <Star size={20} />}
                      {activity.type === 'finished' && <BookOpen size={20} />}
                      {activity.type === 'joined' && <Users size={20} />}
                    </motion.div>
                    <div className="flex-1">
                      <motion.p 
                        className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {activity.type === 'review' && (
                          <>Reviewed <span className="font-semibold">{activity.book}</span></>
                        )}
                        {activity.type === 'finished' && (
                          <>Finished reading <span className="font-semibold">{activity.book}</span></>
                        )}
                        {activity.type === 'joined' && (
                          <>Joined <span className="font-semibold">{activity.club}</span> book club</>
                        )}
                      </motion.p>
                      <motion.p 
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {activity.date}
                      </motion.p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedActivity === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedActivity === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        {activity.type === 'review' && (
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <Star
                                  size={16}
                                  className={i < (activity.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                                />
                              </motion.div>
                            ))}
                          </div>
                        )}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-2 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Click to see more details
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 