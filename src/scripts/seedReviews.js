import { db } from '../firebaseConfig.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const reviews = [
  {
    bookTitle: "The Midnight Library",
    userName: "Emma Thompson",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80",
    rating: 4.8,
    content: "A beautiful exploration of life's infinite possibilities. This book made me reflect deeply on my own choices and the paths not taken. The writing is exquisite, and the concept is both unique and thought-provoking.",
    likes: 342,
    comments: 56,
    createdAt: Timestamp.fromDate(new Date('2024-02-15')),
    helpfulCount: 289,
    aiScore: 0.95,
    likedBy: [],
  },
  {
    bookTitle: "Project Hail Mary",
    userName: "James Wilson",
    userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80",
    rating: 4.9,
    content: "An absolute masterpiece of science fiction! The perfect blend of scientific accuracy and engaging storytelling. Andy Weir has outdone himself with this one. The plot twists kept me on the edge of my seat.",
    likes: 287,
    comments: 43,
    createdAt: Timestamp.fromDate(new Date('2024-02-14')),
    helpfulCount: 245,
    aiScore: 0.92,
    likedBy: [],
  },
  {
    bookTitle: "Klara and the Sun",
    userName: "Sophie Chen",
    userPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80",
    rating: 4.7,
    content: "A haunting and beautiful meditation on what it means to be human, told through the unique perspective of an artificial friend. Ishiguro's prose is as elegant as ever, and the themes resonate deeply.",
    likes: 256,
    comments: 38,
    createdAt: Timestamp.fromDate(new Date('2024-02-13')),
    helpfulCount: 198,
    aiScore: 0.88,
    likedBy: [],
  },
  {
    bookTitle: "The Seven Husbands of Evelyn Hugo",
    userName: "Maria Garcia",
    userPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80",
    rating: 4.9,
    content: "A stunning masterpiece that weaves together love, loss, and the price of fame. The character development is exceptional, and the story's twists and turns kept me captivated until the very end.",
    likes: 312,
    comments: 67,
    createdAt: Timestamp.fromDate(new Date('2024-02-12')),
    helpfulCount: 278,
    aiScore: 0.94,
    likedBy: [],
  },
  {
    bookTitle: "Dune",
    userName: "Alex Chen",
    userPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80",
    rating: 4.8,
    content: "A masterpiece of science fiction that has stood the test of time. The world-building is unparalleled, and the political intrigue keeps you engaged throughout. A must-read for any sci-fi fan.",
    likes: 298,
    comments: 52,
    createdAt: Timestamp.fromDate(new Date('2024-02-11')),
    helpfulCount: 256,
    aiScore: 0.91,
    likedBy: [],
  },
  {
    bookTitle: "The Silent Patient",
    userName: "Sarah Johnson",
    userPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80",
    rating: 4.6,
    content: "A psychological thriller that will keep you guessing until the very end. The pacing is perfect, and the twists are masterfully executed. A brilliant debut novel that lives up to the hype.",
    likes: 245,
    comments: 45,
    createdAt: Timestamp.fromDate(new Date('2024-02-10')),
    helpfulCount: 187,
    aiScore: 0.87,
    likedBy: [],
  },
];

const seedReviews = async () => {
  try {
    const reviewsCollection = collection(db, 'reviews');
    
    for (const review of reviews) {
      await addDoc(reviewsCollection, review);
      console.log(`Added review for ${review.bookTitle}`);
    }
    
    console.log('Successfully seeded all reviews!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
};

// Run the seeding function
seedReviews(); 