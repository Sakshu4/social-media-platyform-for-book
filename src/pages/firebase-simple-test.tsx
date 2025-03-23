import { useEffect, useState } from 'react';
import { app, db } from '../firebaseConfig';

export default function FirebaseSimpleTest() {
  const [status, setStatus] = useState('Checking Firebase initialization...');

  useEffect(() => {
    // Just check if Firebase is initialized
    if (app && db) {
      setStatus('Firebase initialized successfully! App name: ' + app.name);
    } else {
      setStatus('Firebase initialization failed.');
    }
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      <h1>Simple Firebase Test</h1>
      
      <div style={{
        padding: '15px',
        backgroundColor: status.includes('successfully') ? '#d4edda' : '#f8d7da',
        color: status.includes('successfully') ? '#155724' : '#721c24',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <strong>Status:</strong> {status}
      </div>
      
      <div style={{
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        border: '1px solid #dee2e6'
      }}>
        <h2>Firebase Troubleshooting Steps</h2>
        <ol>
          <li>Check your Firebase configuration in <code>src/firebaseConfig.js</code></li>
          <li>Ensure you've created a Firebase project in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          <li>Verify that Firestore Database is enabled in your Firebase project</li>
          <li>Check that your Firebase security rules allow read/write access</li>
          <li>Make sure you're using the correct project ID and API keys</li>
        </ol>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', marginRight: '15px' }}>Home</a>
        <a href="/firebase-test" style={{ color: 'blue', marginRight: '15px' }}>Detailed Firebase Test</a>
        <a href="/admin/seed-simple" style={{ color: 'blue' }}>Simple Seed Test</a>
      </div>
    </div>
  );
} 