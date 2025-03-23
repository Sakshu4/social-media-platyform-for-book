import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useReviewLike = (reviewId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Initial fetch of likes count
    const fetchLikesCount = async () => {
      try {
        const reviewRef = doc(db, 'reviews', reviewId);
        const reviewDoc = await getDoc(reviewRef);
        
        if (reviewDoc.exists()) {
          setLikesCount(reviewDoc.data().likes || 0);
          
          // Check if user has liked this review
          if (user) {
            const likedBy = reviewDoc.data().likedBy || [];
            setIsLiked(likedBy.includes(user.uid));
          }
        }
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    };

    fetchLikesCount();
  }, [reviewId, user]);

  const toggleLike = async () => {
    if (!user) {
      // If no user is logged in, we could redirect to login or show a modal
      alert('Please log in to like reviews');
      return;
    }

    setIsLoading(true);
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const reviewDoc = await getDoc(reviewRef);

      if (reviewDoc.exists()) {
        const likedBy = reviewDoc.data().likedBy || [];
        const hasLiked = likedBy.includes(user.uid);

        await updateDoc(reviewRef, {
          likes: increment(hasLiked ? -1 : 1),
          likedBy: hasLiked
            ? likedBy.filter((id: string) => id !== user.uid)
            : [...likedBy, user.uid],
        });

        setIsLiked(!hasLiked);
        setLikesCount(prev => prev + (hasLiked ? -1 : 1));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    isLoading,
    toggleLike,
  };
}; 