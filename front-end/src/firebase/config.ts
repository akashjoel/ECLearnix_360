import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LggD6SrG6qhaPAli96fr977hAUvOHWk",
  authDomain: "learnoai-7df40.firebaseapp.com",
  projectId: "learnoai-7df40",
  storageBucket: "learnoai-7df40.firebasestorage.app",
  messagingSenderId: "181095462616",
  appId: "1:181095462616:web:bfff0ee6e774216b51c9ad",
  measurementId: "G-2WC504ZDNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

microsoftProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 