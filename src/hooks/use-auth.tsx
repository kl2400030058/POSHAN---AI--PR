
'use client';
import { useAuthContext, AppUser } from "@/components/providers/firebase-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (context.loading) {
            return; // Wait until loading is finished
        }

        if (!context.user) {
            // If not logged in, and not on a public page, redirect to login
            if (pathname !== '/' && pathname !== '/signup' && pathname !== '/signup-doctor') {
                 router.push('/');
            }
            return;
        }

        // If logged in, redirect based on role
        const { role } = context.user as AppUser;
        
        if (role === 'doctor') {
            // If a doctor is not on a doctor path, redirect them
            if (!pathname.startsWith('/doctor')) {
                router.push('/doctor/dashboard');
            }
        } else if (role === 'user') {
            // If a user is not on a user path, redirect them
            if (!pathname.startsWith('/dashboard')) {
                router.push('/dashboard');
            }
        } else {
            // If role is not defined (edge case), sign out
             context.signOut().then(() => router.push('/'));
        }

    }, [context.loading, context.user, router, pathname, context]);

    return context;
}
