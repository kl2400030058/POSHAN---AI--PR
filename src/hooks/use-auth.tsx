'use client';
import { useAuthContext } from "@/components/providers/firebase-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!context.loading && !context.user) {
            router.push('/');
        }
    }, [context.loading, context.user, router]);

    return context;
}
