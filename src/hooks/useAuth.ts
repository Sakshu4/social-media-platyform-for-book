import { useState, useEffect } from 'react';

// Temporary mock implementation without Firebase
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  const login = async (email: string, password: string) => {
    // Mock implementation
    console.log('Login attempted:', { email, password });
  };

  const register = async (email: string, password: string) => {
    // Mock implementation
    console.log('Register attempted:', { email, password });
  };

  const logout = async () => {
    // Mock implementation
    console.log('Logout attempted');
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    register,
    logout,
  };
} 