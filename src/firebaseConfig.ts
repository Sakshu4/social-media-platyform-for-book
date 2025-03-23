// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8cGT2hKGd_BfXeNWRXs2wHmwXbpECe7c",
  authDomain: "social-81300.firebaseapp.com",
  projectId: "social-81300",
  storageBucket: "social-81300.appspot.com",
  messagingSenderId: "907229419474",
  appId: "1:907229419474:web:1f9f8b3b34aa3cddc7a8da"
};

// Initialize Firebase singleton
let firebaseApp;
let db: Firestore | undefined;
let auth;
let storage;

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  try {
    // Initialize Firebase only once
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApp();
    }
    
    // Initialize services
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
    storage = getStorage(firebaseApp);
    
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.log("Firebase not initialized (server-side)");
}

// Analytics is only available in the browser
const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    try {
      const { getAnalytics } = await import('firebase/analytics');
      return getAnalytics(firebaseApp);
    } catch (error) {
      console.error('Analytics initialization error:', error);
      return null;
    }
  }
  return null;
};

// Export the stable instances
export { db, auth, storage };

// Analytics is exported as a function to be called on the client side
export const getAnalyticsInstance = initializeAnalytics;