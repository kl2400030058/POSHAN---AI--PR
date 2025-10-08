

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Extend the User type to include our custom fields


const AuthContext = createContext(undefined);

const DEMO_MODE = true; // Set to true to bypass login

const demoUser = {
    uid: 'demo-user-123',
    displayName: 'Demo User',
    email: 'user@example.com',
    role: 'user',
    photoURL: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop'
};

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (DEMO_MODE) {
            setUser(demoUser);
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    // Combine Firebase user data with our custom data from Firestore
                    const appUser = {
                        ...user,
                        ...userSnap.data(),
                        // Type assertion for role
                        role: userSnap.data().role,
                    };
                    setUser(appUser);
                } else {
                    // This might happen briefly on first signup before the doc is created
                    setUser(user);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email, pass) => {
        if (DEMO_MODE) {
            setUser(demoUser);
            return;
        }
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signOut = async () => {
        if (DEMO_MODE) {
            setUser(null);
            return;
        }
        const { signOut: firebaseSignOut } = await import('firebase/auth');
        return firebaseSignOut(auth);
    };

    const signUp = async (email, pass, fullName, role) => {
        if (DEMO_MODE) {
            setUser(role === 'doctor' ? {...demoUser, role: 'doctor' } : demoUser);
            return;
        }
        const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        
        if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: fullName });
            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: fullName,
                photoURL: userCredential.user.photoURL,
                createdAt: new Date().toISOString(),
                role: role, // Save the role to Firestore
            }, { merge: true });
        }

        return userCredential;
    };


    const value = {
        user,
        loading,
        signIn,
        signOut,
        signUp,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

export { AuthContext };
