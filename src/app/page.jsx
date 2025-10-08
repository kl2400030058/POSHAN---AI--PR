

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Logo } from '@/components/logo.jsx';
import { ArrowRight, Bot, Target, BarChart3, Users, Rocket, Search, HandHeart, BrainCircuit, LayoutDashboard, Stethoscope, FileScan, Quote } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const impactData = [
  { stakeholder: 'Anganwadi Worker', problem: 'Manual recordkeeping', impact: 'Instant AI analysis' },
  { stakeholder: 'ICDS Supervisor', problem: 'Delayed reports', impact: 'Live dashboards' },
  { stakeholder: 'Mother/Child', problem: 'No diet guidance', impact: 'Personalized plan' },
  { stakeholder: 'Govt/NGO', problem: 'No real-time data', impact: 'AI-based insights' },
];

const features = [
    {
        icon: <Bot className="h-8 w-8 text-primary" />,
        title: 'AI Meal Analyzer',
        description: 'Snap a photo of your meal and get an instant breakdown of its nutritional content and calories.'
    },
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: 'Nutrient Deficiency Detection',
        description: 'Our AI analyzes your diet to pinpoint potential nutrient gaps and helps you address them effectively.'
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-primary" />,
        title: 'Personalized Recommendations',
        description: 'Receive tailored food and fitness suggestions based on your unique health profile and goals.'
    },
    {
        icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
        title: 'Daily Progress Dashboard',
        description: 'Track your daily intake of calories, macros, and water to stay on top of your health journey.'
    },
    {
        icon: <FileScan className="h-8 w-8 text-primary" />,
        title: 'Health Report Analysis',
        description: 'Upload your medical reports for deeper AI-driven insights and more accurate recommendations.'
    },
    {
        icon: <Stethoscope className="h-8 w-8 text-primary" />,
        title: 'Doctor-Patient Collaboration',
        description: 'Connect with your doctor, allowing them to monitor progress and create guided health plans.'
    }
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Upload Your Meal Photo',
    description: 'Simply take a picture of your food. No manual entry required.'
  },
  {
    step: 2,
    title: 'AI Analyzes Nutrition',
    description: 'Our advanced AI instantly identifies food items and estimates nutritional values.'
  },
  {
    step: 3,
    title: 'Get Your Personalized Plan',
    description: 'Receive a customized diet plan and view your progress on your personal dashboard.'
  }
];

const testimonials = [
  {
    name: 'Anjali Sharma',
    role: 'ICDS Supervisor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    avatarFallback: 'AS',
    review: "PoshanAI has revolutionized how we monitor nutritional data. The real-time dashboards give me an accurate picture of health trends across centers, allowing for timely interventions. It's a game-changer for public health management."
  },
  {
    name: 'Priya Mehta',
    role: 'Mother',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
    avatarFallback: 'PM',
    review: "As a new mother, I was always worried about my child's nutrition. With PoshanAI, I just snap a picture of our meals, and I get instant feedback and healthy, local recipes. It's like having a personal dietician in my pocket!"
  },
  {
    name: 'Sunita Verma',
    role: 'Anganwadi Worker',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    avatarFallback: 'SV',
    review: 'This app saves me hours of paperwork. I can log meals instantly and the AI helps me give better, more specific advice to the mothers in my village. The analysis is simple to understand and very effective.'
  }
];

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
            <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
            <Link href="#impact" className="text-foreground/60 transition-colors hover:text-foreground/80">Impact</Link>
            <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground/80">How It Works</Link>
            <Link href="#vision" className="text-foreground/60 transition-colors hover:text-foreground/80">About</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {user ? (
                <Button onClick={() => router.push(user.role === 'doctor' ? '/doctor/dashboard' : '/dashboard')}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button onClick={() => router.push('/signup')}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=800&fit=crop"
            alt="A beautiful arrangement of fresh vegetables and fruits"
            fill
            className="object-cover"
            priority
            data-ai-hint="fresh vegetables fruits"
          />
          <div className="relative z-10 bg-black/50">
            <div className="container flex flex-col items-center justify-center text-center py-20 md:py-32 text-white">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                Smart Nutrition for Every Indian
              </span>
              <h1 className="text-4xl font-headline font-bold tracking-tight md:text-5xl lg:text-6xl">
                Meet PoshanAI: Your Smart Nutrition Partner
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/90">
                From meal scans to personalized plans—health made simple. Analyze your meals, track nutrition, and get personalized recommendations instantly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="button-glow bg-primary hover:bg-primary/80 text-primary-foreground" onClick={() => router.push(user ? '/dashboard' : '/signup')}>
                  <Rocket className="mr-2 h-5 w-5" />
                  Start My Journey
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white" onClick={() => { const el = document.getElementById('features'); el?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Search className="mr-2 h-5 w-5" />
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-headline font-bold">A smarter way to manage your health</h2>
                <p className="mt-4 text-lg text-muted-foreground">PoshanAI brings cutting-edge technology to your daily health routine.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <Card key={index} className="card-glow text-center">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                                {feature.icon}
                            </div>
                            <CardTitle className="font-headline">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="bg-muted/50 py-16 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold">Empowering Health at Every Level</h2>
              <p className="mt-4 text-lg text-muted-foreground">From individual users to government initiatives, PoshanAI makes a measurable difference.</p>
            </div>
            <Card className="mt-12">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-primary">Stakeholder</TableHead>
                    <TableHead>Problem Today</TableHead>
                    <TableHead className="text-primary font-bold">PoshanAI’s Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impactData.map((row) => (
                    <TableRow key={row.stakeholder}>
                      <TableCell className="font-medium">{row.stakeholder}</TableCell>
                      <TableCell>{row.problem}</TableCell>
                      <TableCell className="font-medium text-primary">{row.impact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container py-16 sm:py-24">
             <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-headline font-bold">Get Started in 3 Simple Steps</h2>
                <p className="mt-4 text-lg text-muted-foreground">Transform your health with a process that's as easy as it is effective.</p>
            </div>
            <div className="relative mt-12">
                <div className="absolute left-1/2 top-4 hidden h-full w-px -translate-x-1/2 border-l-2 border-dashed border-border lg:block"></div>
                <div className="grid gap-12 lg:grid-cols-3">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:gap-8">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-headline font-bold text-primary mb-4 lg:mb-0 flex-shrink-0">
                                {step.step}
                            </div>
                            <div>
                                <h3 className="text-xl font-headline font-bold">{step.title}</h3>
                                <p className="mt-2 text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-muted/50 py-16 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold">What Our Users Are Saying</h2>
              <p className="mt-4 text-lg text-muted-foreground">Real stories from people transforming health in their communities.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-glow flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col">
                    <Quote className="w-8 h-8 text-primary/50 mb-4" />
                    <p className="text-muted-foreground flex-1">{testimonial.review}</p>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4 pt-4">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-base">{testimonial.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-16 sm:py-24">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <HandHeart className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold">Our Vision: A Healthier India</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                    We are building India’s first AI-powered nutrition ecosystem to combat malnutrition at scale. Our mission is to make personalized, scientific, and culturally relevant dietary guidance accessible to everyone.
                </p>
                <p className="text-muted-foreground">
                    By empowering individuals, anganwadi workers, and healthcare professionals with cutting-edge AI tools, we aim to create a sustainable, data-driven approach to public health. PoshanAI is more than an app; it's a movement towards a healthier future for all.
                </p>
            </div>
            <div className="relative flex items-center justify-center">
              <BrainCircuit className="w-48 h-48 lg:w-64 lg:h-64 text-primary/20" />
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 bg-card border-t">
          <div className="container text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} PoshanAI. Made with ❤️ for a healthier India.</p>
          </div>
      </footer>
    </div>
  );
}

    

    