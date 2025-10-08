
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Logo } from '@/components/logo.jsx';
import { ArrowRight, Bot, Target, Users, Rocket, Search, HandHeart, BrainCircuit, LayoutDashboard, Stethoscope, FileScan, Quote, Sparkles, Globe, BookHeart, UtensilsCrossed, Dumbbell, ShieldCheck, HeartPulse, Scale, BarChart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const impactData = [
  { stakeholder: 'Anganwadi Worker', problem: 'Manual recordkeeping, limited nutrition knowledge', impact: 'AI-based instant analysis + auto logging' },
  { stakeholder: 'ICDS Supervisor', problem: 'Delayed, inconsistent data from centers', impact: 'Live dashboards + real-time tracking' },
  { stakeholder: 'Mother / Child', problem: 'Lack of personalized guidance', impact: 'Customized, local diet and wellness plan' },
  { stakeholder: 'Govt / NGO', problem: 'Hard to measure actual progress', impact: 'Data-driven insights for targeted interventions' },
];

const comparisonData = [
    { feature: 'Meal Logging', generic: 'Manual search from a generic database', poshan: 'AI-powered image recognition of Indian & global dishes' },
    { feature: 'Cultural Context', generic: 'Western-centric food databases', poshan: 'Hyper-local focus on Indian cuisine & regional diets' },
    { feature: 'Nutritional Analysis', generic: 'Basic calorie and macro tracking', poshan: 'Advanced deficiency detection (Iron, Vitamin D, etc.)' },
    { feature: 'Personalization', generic: 'Based on simple goals like weight loss', poshan: 'Holistic personalization using meal data & health reports' },
    { feature: 'Recommendations', generic: 'Generic food suggestions (e.g., "eat more salad")', poshan: 'Culturally relevant suggestions (e.g., "add spinach to your dal")' },
    { feature: 'Data-Driven Insights', generic: 'Limited to personal trends', poshan: 'Analyzes medical reports (PDF/image) for deeper insights' }
];

const features = [
    {
        icon: <Bot className="h-8 w-8 text-primary" />,
        title: 'AI Meal Analyzer',
        description: 'Just snap a photo of your meal. Our powerful AI instantly recognizes food items, including a wide variety of Indian dishes, and provides a detailed breakdown of its nutritional content and estimated calories.'
    },
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: 'Nutrient Deficiency Detection',
        description: "Go beyond calorie counting. The app analyzes your meal patterns and health profile to pinpoint potential nutrient gaps, helping you address deficiencies like iron, Vitamin D, and B12 before they become a problem."
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: 'Personalized Recommendations',
        description: "Receive hyper-personalized food and fitness suggestions that are tailored to your unique body type, lifestyle, dietary preferences (including vegetarian and Jain), and specific health goals."
    },
    {
        icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
        title: 'Daily Progress Dashboard',
        description: "Your interactive dashboard provides an at-a-glance overview of your day. Easily track your intake of calories, macronutrients (protein, carbs, fats), and water to stay motivated and informed."
    },
    {
        icon: <FileScan className="h-8 w-8 text-primary" />,
        title: 'Health Report Analysis',
        description: "Gain deeper insights by uploading your existing medical reports (PDF or image). Our AI can extract key biomarkers to further customize your recommendations and track your health progress over time."
    },
    {
        icon: <Stethoscope className="h-8 w-8 text-primary" />,
        title: 'Doctor-Patient Collaboration',
        description: "Seamlessly connect with your doctor or dietician. Grant them access to view your progress, meal logs, and reports, allowing them to provide expert guidance and create tailored health plans directly within the app."
    }
];

const whyPoshanAIPoints = [
  { icon: <Globe className="h-6 w-6 text-primary" />, title: 'Built for India', description: 'Recommendations are culturally relevant, featuring local and seasonal Indian foods.' },
  { icon: <BookHeart className="h-6 w-6 text-primary" />, title: 'Holistic Approach', description: 'We go beyond diet to include hydration, fitness, and lifestyle for overall wellness.' },
  { icon: <UtensilsCrossed className="h-6 w-6 text-primary" />, title: 'Effortless Logging', description: 'Forget manual entry. Just snap a photo of your meal and our AI does the rest.' },
  { icon: <Dumbbell className="h-6 w-6 text-primary" />, title: 'Dynamic & Adaptive', description: 'Your plan evolves with you. The AI adjusts based on your progress and feedback.' },
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: 'Science-Backed', description: 'Powered by advanced AI and nutritional science for credible, effective advice.' },
  { icon: <HeartPulse className="h-6 w-6 text-primary" />, title: 'Proactive Health', description: 'Identify and address nutritional gaps before they lead to health issues.' },
  { icon: <Scale className="h-6 w-6 text-primary" />, title: 'Scalable Impact', description: 'Designed to support public health initiatives from the individual to the community level.' },
  { icon: <Users className="h-6 w-6 text-primary" />, title: 'Collaborative Care', description: 'Bridge the gap between you and your healthcare provider for better outcomes.' },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Snap Your Meal',
    description: 'Simply take a picture of your food. No manual typing or searching required.'
  },
  {
    step: 2,
    title: 'Get Instant Analysis',
    description: 'Our AI instantly identifies food items and estimates calories and nutrients.'
  },
  {
    step: 3,
    title: 'Receive Your Plan',
    description: 'Get a customized diet, hydration, and fitness plan tailored to your deficiencies and goals.'
  },
  {
    step: 4,
    title: 'Track & Improve',
    description: 'Monitor your weight, vitamin intake, and health metrics with easy-to-read charts and reports.'
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
            <Link href="#why-us" className="text-foreground/60 transition-colors hover:text-foreground/80">Why PoshanAI</Link>
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
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=800&fit=crop"
            alt="A beautiful arrangement of fresh vegetables and fruits"
            fill
            className="object-cover"
            priority
            data-ai-hint="fresh vegetables fruits"
          />
          <div className="relative z-20">
            <div className="container flex flex-col items-center justify-center text-center py-20 md:py-32 text-white">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                Smart Nutrition for Every Indian
              </span>
              <h1 className="text-4xl font-headline font-bold tracking-tight md:text-5xl lg:text-6xl">
                Meet PoshanAI: Your Smart Nutrition Partner
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-white/90">
                From effortless meal scans with a simple photo to hyper-personalized diet and fitness plans, PoshanAI is your all-in-one solution for a healthier life. We analyze your meals, track your nutrition, and provide actionable, AI-driven recommendations tailored to the Indian context.
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

        {/* Comparison Section */}
        <section id="comparison" className="py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-headline font-bold">The PoshanAI Difference</h2>
                    <p className="mt-4 text-lg text-muted-foreground">See how PoshanAI stacks up against generic health apps. We're not just different; we're designed for you.</p>
                </div>
                <Card className="mt-12 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] font-bold text-primary">Feature</TableHead>
                                <TableHead>Generic Health Apps</TableHead>
                                <TableHead className="text-primary font-bold">PoshanAI (The Winner)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparisonData.map((row) => (
                                <TableRow key={row.feature}>
                                    <TableCell className="font-medium">{row.feature}</TableCell>
                                    <TableCell className="text-muted-foreground">{row.generic}</TableCell>
                                    <TableCell className="font-semibold">{row.poshan}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted/50 container py-16 sm:py-24">
             <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-headline font-bold">Get Started in 4 Simple Steps</h2>
                <p className="mt-4 text-lg text-muted-foreground">Transform your health with a process that's as easy as it is effective. Your journey to better nutrition is just a photo away.</p>
            </div>
            <div className="relative mt-12">
                <div className="absolute left-0 right-0 top-6 hidden h-px -translate-y-1/2 bg-border md:block md:border-t-2 md:border-dashed"></div>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center">
                             <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background font-headline font-bold text-primary mb-4 lg:mb-0 flex-shrink-0">
                                {step.step}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-headline font-bold">{step.title}</h3>
                                <p className="mt-2 text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="container py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-headline font-bold">A Smarter Way to Manage Your Health</h2>
                <p className="mt-4 text-lg text-muted-foreground">PoshanAI integrates cutting-edge AI technology into your daily routine, making holistic health management simple, intuitive, and highly effective.</p>
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

        {/* Why PoshanAI Section */}
        <section id="why-us" className="relative bg-muted/50 py-16 sm:py-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&h=900&fit=crop"
            alt="Background of Indian spices"
            fill
            className="object-cover opacity-10"
            data-ai-hint="indian spices"
          />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-headline font-bold">Why Choose PoshanAI?</h2>
              <p className="mt-4 text-lg text-muted-foreground">PoshanAI is more than just a calorie counter. It's a comprehensive health ecosystem designed to provide you with actionable insights and sustainable habits for a healthier life.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whyPoshanAIPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section id="impact" className="py-16 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold">Empowering Health at Every Level</h2>
              <p className="mt-4 text-lg text-muted-foreground">From individual users to government initiatives, PoshanAI makes a measurable difference across the entire public health landscape.</p>
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
        <section id="vision" className="py-16 sm:py-24 bg-muted/30">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <HandHeart className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold">Our Vision: A Healthier India, for Everyone</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                    We are on a mission to build India’s first AI-powered public health ecosystem to combat malnutrition and promote wellness at a national scale. Our goal is to make personalized, scientific, and culturally relevant dietary guidance accessible and affordable for every single Indian.
                </p>
                <p className="text-muted-foreground">
                    By empowering individuals with personal insights, equipping anganwadi workers with smart tools, and providing actionable data to healthcare professionals and policymakers, we aim to create a virtuous cycle of health improvement. PoshanAI is more than an app; it's a movement towards a healthier, stronger, and more resilient future for all.
                </p>
            </div>
            <div className="relative flex items-center justify-center">
               <Image
                    src="https://images.unsplash.com/photo-1576104848937-7a5a78da5b4b?w=800&h=600&fit=crop"
                    alt="A mother happily feeding her young child a healthy meal"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="mother child food"
                />
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
