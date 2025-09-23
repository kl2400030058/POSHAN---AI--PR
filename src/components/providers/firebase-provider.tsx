
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Extend the User type to include our custom fields
export interface AppUser extends User {
    role?: 'user' | 'doctor';
}

interface AuthContextType {
    user: AppUser | null;
    loading: boolean;
    signIn: (email: string, pass: string) => Promise<any>;
    signOut: () => Promise<void>;
    signUp: (email: string, pass:string, fullName: string, role: 'user' | 'doctor') => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    // Combine Firebase user data with our custom data from Firestore
                    const appUser: AppUser = {
                        ...user,
                        ...userSnap.data(),
                        // Type assertion for role
                        role: userSnap.data().role as 'user' | 'doctor' | undefined,
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

    const value = {
        user,
        loading,
        signIn: (email: string, pass: string) => import('firebase/auth').then(({ signInWithEmailAndPassword }) => signInWithEmailAndPassword(auth, email, pass)),
        signOut: () => import('firebase/auth').then(({ signOut }) => signOut(auth)),
        signUp: async (email: string, pass: string, fullName: string, role: 'user' | 'doctor') => {
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
        }
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
