// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { app, db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    // Basic Firebase initialization check
    const appInitialized = !!app;
    const dbInitialized = !!db;
    
    // Try to access Firestore
    let firestoreAccess = false;
    let collections = [];
    
    if (dbInitialized) {
      try {
        // Try to list collections
        const collectionsSnapshot = await getDocs(collection(db, 'test-collection'));
        firestoreAccess = true;
        
        // Check if our collections exist
        const booksSnapshot = await getDocs(collection(db, 'books'));
        const booksExist = !booksSnapshot.empty;
        
        if (booksExist) {
          collections.push('books');
        }
        
        const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
        if (!reviewsSnapshot.empty) {
          collections.push('reviews');
        }
        
        const authorsSnapshot = await getDocs(collection(db, 'authors'));
        if (!authorsSnapshot.empty) {
          collections.push('authors');
        }
      } catch (firestoreError) {
        console.error('Firestore access error:', firestoreError);
      }
    }
    
    // Return the status
    res.status(200).json({
      success: true,
      firebaseStatus: {
        appInitialized,
        dbInitialized,
        firestoreAccess,
        collections,
        projectId: app?.options?.projectId || null,
      }
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
} 