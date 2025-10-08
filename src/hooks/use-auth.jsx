

'use client';
import { useAuthContext } from "@/components/providers/firebase-provider";
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
        
        // If user is not logged in
        if (!context.user) {
            // If they are on a protected route, redirect to login
            if (!isPublicRoute) {
                 router.push('/');
            }
            return;
        }

        // If user is logged in
        const { role } = context.user;
        
        // If user is on a protected route, ensure they have the correct role
        if (!isPublicRoute) {
            if (role === 'user' && !pathname.startsWith('/dashboard')) {
                router.push('/dashboard');
            } else if (role === 'doctor' && !pathname.startsWith('/doctor/dashboard')) {
                router.push('/doctor/dashboard');
            }
        }
        
    }, [context.loading, context.user, router, pathname]);

    return context;
}
