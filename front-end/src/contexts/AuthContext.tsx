import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { UserProfile, listenToAuthState, getUserProfile, signUpWithEmail, signInWithEmail } from '../firebase/auth';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: 'student' | 'mentor' | 'professional') => void;
  isAuthenticated: boolean;
  backendUser: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [backendUser, setBackendUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthState(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
          
          // Get or create backend user profile
          try {
            const backendProfile = await apiService.getProfile();
            setBackendUser(backendProfile.data);
          } catch (error) {
            console.log('Backend profile not found, will be created on first API call');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Create a basic profile from Firebase user data
          setUserProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            photoURL: firebaseUser.photoURL || undefined,
            role: 'student',
            createdAt: new Date(),
            lastLogin: new Date()
          });
        }
      } else {
        setUserProfile(null);
        setBackendUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (userData: any) => {
    try {
      // Try backend login first
      const response = await apiService.login(userData);
      if (response.success) {
        localStorage.setItem('authToken', response.data.token);
        setBackendUser(response.data.user);
      }
    } catch (error) {
      console.error('Backend login failed:', error);
      // Fallback to Firebase auth only
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      await signUpWithEmail(email, password, displayName || 'User', 'student');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Backend logout failed:', error);
    }
    
    localStorage.removeItem('authToken');
    setUser(null);
    setUserProfile(null);
    setBackendUser(null);
  };

  const switchRole = (role: 'student' | 'mentor' | 'professional') => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        role
      });
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    signIn,
    signUp,
    logout,
    switchRole,
    isAuthenticated: !!user,
    backendUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};