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

const slideshowImages = [
  {
    src: 'https://picsum.photos/seed/food1/1920/1080',
    alt: 'A table spread with fresh, healthy food.',
    hint: 'healthy food',
  },
  {
    src: 'https://picsum.photos/seed/food2/1920/1080',
    alt: 'A person holding a basket of fresh vegetables from a farm.',
    hint: 'fresh vegetables',
  },
  {
    src: 'https://picsum.photos/seed/food3/1920/1080',
    alt: 'A colorful salad in a bowl.',
    hint: 'colorful salad',
  },
  {
    src: 'https://picsum.photos/seed/community/1920/1080',
    alt: 'People sharing food at a community gathering.',
    hint: 'community food',
  },
  {
    src: 'https://picsum.photos/seed/security/1920/1080',
    alt: 'A farmer tending to crops in a field.',
    hint: 'farming crops',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
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
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Login
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/signup">Sign up</Link>
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
