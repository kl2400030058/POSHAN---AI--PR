
'use client';
import { useAuthContext, AppUser } from "@/components/providers/firebase-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// List of routes that are publicly accessible
const publicRoutes = ['/', '/signup', '/signup-doctor'];

export const useAuth = () => {
    const context = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (context.loading) {
            return; // Wait until loading is finished
        }

        const isPublicRoute = publicRoutes.includes(pathname);

        if (!context.user) {
            // If not logged in and not on a public page, redirect to login
            if (!isPublicRoute) {
                 router.push('/');
            }
            return;
        }

        // If user is logged in, but on a public route, redirect to their dashboard
        const { role } = context.user as AppUser;
        if (isPublicRoute) {
            if (role === 'doctor') {
                router.push('/doctor/dashboard');
            } else if (role === 'user') {
                router.push('/dashboard');
            }
            return;
        }
        
        // If logged in and on a protected route, ensure they are on the correct one
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
            // If role is not defined (edge case), sign out and redirect to login
             context.signOut().then(() => router.push('/'));
        }

    }, [context.loading, context.user, router, pathname, context]);

    return context;
}
