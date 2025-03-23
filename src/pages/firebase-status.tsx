import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function FirebaseStatusPage() {
  const { isDarkMode } = useTheme();
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkFirebaseStatus() {
      try {
        setLoading(true);
        const response = await fetch('/api/firebase-test');
        const data = await response.json();
        setStatus(data);
      } catch (err: any) {
        console.error('Error checking Firebase status:', err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    checkFirebaseStatus();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6,
      background: isDarkMode ? '#121212' : '#f9f9f9',
      color: isDarkMode ? '#e1e1e1' : '#333',
      minHeight: '100vh'
    }}>
      <h1>Firebase Status Check</h1>
      
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading Firebase status...
        </div>
      ) : error ? (
        <div style={{
          padding: '15px',
          backgroundColor: isDarkMode ? '#3d0000' : '#f8d7da',
          color: isDarkMode ? '#ff6b6b' : '#721c24',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      ) : status ? (
        <div>
          <div style={{
            padding: '15px',
            backgroundColor: isDarkMode ? '#002b00' : '#d4edda',
            color: isDarkMode ? '#7fff7f' : '#155724',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <strong>API Response:</strong> {status.success ? 'Success' : 'Failed'}
          </div>
          
          {status.firebaseStatus && (
            <div style={{
              padding: '15px',
              backgroundColor: isDarkMode ? '#202020' : '#f8f9fa',
              borderRadius: '5px',
              border: `1px solid ${isDarkMode ? '#333' : '#dee2e6'}`,
              marginBottom: '20px'
            }}>
              <h2>Firebase Status</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <strong>App Initialized:</strong> {status.firebaseStatus.appInitialized ? '✅ Yes' : '❌ No'}
                </li>
                <li>
                  <strong>Firestore Initialized:</strong> {status.firebaseStatus.dbInitialized ? '✅ Yes' : '❌ No'}
                </li>
                <li>
                  <strong>Firestore Access:</strong> {status.firebaseStatus.firestoreAccess ? '✅ Yes' : '❌ No'}
                </li>
                <li>
                  <strong>Project ID:</strong> {status.firebaseStatus.projectId || 'Unknown'}
                </li>
                <li>
                  <strong>Collections Found:</strong> {
                    status.firebaseStatus.collections.length > 0 
                      ? status.firebaseStatus.collections.join(', ') 
                      : 'None'
                  }
                </li>
              </ul>
            </div>
          )}
          
          <div style={{
            padding: '15px',
            backgroundColor: isDarkMode ? '#202020' : '#f8f9fa',
            borderRadius: '5px',
            border: `1px solid ${isDarkMode ? '#333' : '#dee2e6'}`
          }}>
            <h2>Next Steps</h2>
            <p>Based on the results above:</p>
            <ol>
              <li>
                <strong>If Firebase is not initialized:</strong> Check your firebaseConfig.js file for correct API keys
              </li>
              <li>
                <strong>If Firestore access fails:</strong> Check your Firebase security rules
              </li>
              <li>
                <strong>If no collections are found:</strong> You need to seed your database
              </li>
            </ol>
            
            <div style={{ marginTop: '20px' }}>
              <a href="/" style={{ 
                color: isDarkMode ? '#90caf9' : '#0d6efd', 
                marginRight: '15px' 
              }}>Home</a>
              <a href="/admin/seed" style={{ 
                color: isDarkMode ? '#90caf9' : '#0d6efd'
              }}>Go to Seed Page</a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
} 