'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { userProfile, mealLogs } from '@/lib/data';
import { aiDeficiencyDetection, AIDeficiencyDetectionOutput } from '@/ai/flows/ai-deficiency-detection';
import { personalizedFoodRecommendations, PersonalizedFoodRecommendationsOutput } from '@/ai/flows/personalized-food-recommendations.ts';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HealthReportPage() {
  const [deficiencyReport, setDeficiencyReport] = useState<AIDeficiencyDetectionOutput | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedFoodRecommendationsOutput['recommendations'] | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const { toast } = useToast();

  const handleDeficiencyDetection = async () => {
    setIsDetecting(true);
    setDeficiencyReport(null);
    setRecommendations(null);
    try {
      const profileString = `Age: ${userProfile.age}, Weight: ${userProfile.weight}kg, Height: ${userProfile.height}cm, Gender: ${userProfile.gender}, Health Issues: ${userProfile.healthIssues}, Diet: ${userProfile.preferredDiet}`;
      const logsString = mealLogs.map(log => `${log.meal}: ${log.items}`).join('\n');
      const report = await aiDeficiencyDetection({ profile: profileString, mealLogs: logsString });
      setDeficiencyReport(report);
      handleRecommendations(report.deficiencies);
    } catch (error) {
      console.error(error);
      toast({ title: 'Error Detecting Deficiencies', description: 'Could not generate health report.', variant: 'destructive' });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleRecommendations = async (deficiencies: string) => {
    setIsRecommending(true);
    try {
      const nutrientIntake = 'Mock nutrient intake data'; // This can be derived from mealLogs in a real app
      const result = await personalizedFoodRecommendations({ 
        userProfile, 
        nutrientIntake, 
        identifiedDeficiencies: deficiencies 
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({ title: 'Error Getting Recommendations', description: 'Could not generate food recommendations.', variant: 'destructive' });
    } finally {
      setIsRecommending(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">AI Health Report</h1>
        <p className="text-muted-foreground">Analyze your diet for deficiencies and get personalized food recommendations.</p>
      </div>

      <Card>
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
        <Card>
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
                            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
