// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Only initialize Firebase on the client side
const firebaseConfig = {
  apiKey: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_API_KEY : undefined,
  authDomain: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN : undefined,
  projectId: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID : undefined,
  storageBucket: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET : undefined,
  messagingSenderId: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID : undefined,
  appId: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID : undefined,
};

// Initialize Firebase only on client side
let app, auth, db;

if (typeof window !== 'undefined') {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Enable offline persistence
    try {
      enableIndexedDbPersistence(db);
    } catch (err) {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open.');
      } else if (err.code === 'unimplemented') {
        console.log('Firestore persistence is not available in this browser.');
      }
    }
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

export { app, auth, db };
