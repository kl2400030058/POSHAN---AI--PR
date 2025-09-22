'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { aiDeficiencyDetection, AIDeficiencyDetectionOutput } from '@/ai/flows/ai-deficiency-detection';
import { personalizedFoodRecommendations, PersonalizedFoodRecommendationsOutput } from '@/ai/flows/personalized-food-recommendations.ts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';

export default function HealthReportPage() {
  const [deficiencyReport, setDeficiencyReport] = useState<AIDeficiencyDetectionOutput | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedFoodRecommendationsOutput['recommendations'] | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    const rotateX = -y / (height / 2) * 10;
    const rotateY = x / (width / 2) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    }
  };


  const handleDeficiencyDetection = async () => {
    setIsDetecting(true);
    setDeficiencyReport(null);
    setRecommendations(null);
    
    // NOTE: This will be replaced with real user data from Firestore
    const userProfile = {
        age: 28,
        weight: 65,
        height: 160,
        gender: 'female' as 'male' | 'female',
        healthIssues: 'Anemia, Vitamin D deficiency',
        preferredDiet: 'Vegetarian',
    };
    const mealLogs = [
        { meal: 'Breakfast', items: '2 parathas with curd' },
        { meal: 'Lunch', items: 'Rajma chawal with a side of salad' },
        { meal: 'Dinner', items: 'Paneer butter masala with 2 rotis' },
    ];


    try {
      const profileString = `Age: ${userProfile.age}, Weight: ${userProfile.weight}kg, Height: ${userProfile.height}cm, Gender: ${userProfile.gender}, Health Issues: ${userProfile.healthIssues}, Diet: ${userProfile.preferredDiet}`;
      const logsString = mealLogs.map(log => `${log.meal}: ${log.items}`).join('\n');
      const report = await aiDeficiencyDetection({ profile: profileString, mealLogs: logsString });
      setDeficiencyReport(report);
      if (report.deficiencies) {
        // Assume userProfile is fetched and available
        const result = await personalizedFoodRecommendations({ 
            userProfile: {
                ...userProfile,
                // These fields are required by the schema, but may not be on the firebase user object
                weight: userProfile.weight || 0,
                height: userProfile.height || 0,
                healthIssues: userProfile.healthIssues || 'none',
                preferredDiet: userProfile.preferredDiet || 'none'
            },
            nutrientIntake: 'Not available', // This can be derived from mealLogs in a real app
            identifiedDeficiencies: report.deficiencies
        });
        setRecommendations(result.recommendations);
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error Detecting Deficiencies', description: 'Could not generate health report.', variant: 'destructive' });
    } finally {
      setIsDetecting(false);
      setIsRecommending(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">AI Health Report</h1>
        <p className="text-muted-foreground">Analyze your diet for deficiencies and get personalized food recommendations.</p>
      </div>

      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="font-headline">Nutrient Deficiency Detection</CardTitle>
          <CardDescription>Click the button to analyze your logged meals and profile for potential nutrient deficiencies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleDeficiencyDetection} disabled={isDetecting}>
            {isDetecting ? 'Analyzing...' : 'Analyze My Diet'}
          </Button>
          {isDetecting && (
            <div className="space-y-4 pt-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}
          {deficiencyReport && (
            <div className="pt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Identified Deficiencies</h3>
                <p className="text-muted-foreground">{deficiencyReport.deficiencies}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Recommendations</h3>
                <p className="text-muted-foreground">{deficiencyReport.recommendations}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {(isRecommending || recommendations) && (
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="font-headline">Personalized Food Recommendations</CardTitle>
            <CardDescription>Here are some foods to help with your deficiencies, presented in 3D.</CardDescription>
          </CardHeader>
          <CardContent>
            {isRecommending && (
                <div className="flex justify-center items-center h-64">
                    <Skeleton className="w-full h-full" />
                </div>
            )}
            {recommendations && (
              <Carousel opts={{ loop: true }} className="w-full max-w-xs sm:max-w-xl md:max-w-2xl mx-auto">
                <CarouselContent className="-ml-1">
                  {recommendations.map((item, index) => {
                    const placeholder = PlaceHolderImages[index % PlaceHolderImages.length] || { imageUrl: `https://picsum.photos/seed/${index + 50}/600/400`, imageHint: 'food' };
                    return (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <Card 
                                ref={el => cardRefs.current[index] = el}
                                className="card-3d"
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                                <Image
                                    src={placeholder.imageUrl}
                                    alt={item.foodItem}
                                    width={600}
                                    height={400}
                                    className="rounded-t-lg object-cover w-full h-1/2"
                                    data-ai-hint={placeholder.imageHint}
                                />
                                <div className="p-4 text-center flex-1 flex flex-col justify-center">
                                    <h4 className="font-bold text-lg font-headline">{item.foodItem}</h4>
                                    <p className="text-sm text-muted-foreground mt-2">{item.rationale}</p>
                                </div>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
