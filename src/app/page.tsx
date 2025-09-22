'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const slideshowImages = [
  {
    src: 'https://images.unsplash.com/photo-1565557623262-b9a32c3d5216?w=1920&h=1080&fit=crop',
    alt: 'A table spread with a variety of colorful Indian dishes.',
    hint: 'indian thali',
  },
  {
    src: 'https://images.unsplash.com/photo-1598514983318-2f64f16340b2?w=1920&h=1080&fit=crop',
    alt: 'An Indian farmer working in a lush green paddy field.',
    hint: 'indian farmer',
  },
  {
    src: 'https://images.unsplash.com/photo-1547486894-33a5a70979a4?w=1920&h=1080&fit=crop',
    alt: 'A vibrant Indian market stall selling fresh vegetables.',
    hint: 'vegetable market',
  },
  {
    src: 'https://images.unsplash.com/photo-1606494248893-5473a3c8a9a4?w=1920&h=1080&fit=crop',
    alt: 'People sharing a community meal in a rural Indian village.',
    hint: 'community meal',
  },
  {
    src: 'https://images.unsplash.com/photo-1596797038531-27b24316667c?w=1920&h=1080&fit=crop',
    alt: 'A colorful array of Indian spices in bowls.',
    hint: 'indian spices',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 z-0 h-full w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-0 h-full">
          {slideshowImages.map((image, index) => (
            <CarouselItem key={index} className="relative h-full p-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                data-ai-hint={image.hint}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 z-10 bg-black/50" />

      <div className="z-20 w-full max-w-md p-4">
        <div className="mx-auto mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
