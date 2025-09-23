
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function SignupDoctorPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, fullName, 'doctor');
      router.push('/doctor/dashboard'); // Redirect to doctor dashboard
    } catch (error: any) {
      toast({
        title: 'Sign-up Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-gradient p-4">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Doctor Registration</CardTitle>
            <CardDescription>Create a professional account to manage your patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Dr. Alex Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="dr@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Doctor Account'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/" className="underline">
                Login
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Not a doctor?{' '}
              <Link href="/signup" className="underline">
                Create a user account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
