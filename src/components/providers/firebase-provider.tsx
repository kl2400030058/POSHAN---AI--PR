'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, pass: string) => Promise<any>;
    signOut: () => Promise<void>;
    signUp: (email: string, pass:string, fullName: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUser({ ...user, ...userSnap.data() });
                } else {
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
        signUp: async (email: string, pass: string, fullName: string) => {
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
