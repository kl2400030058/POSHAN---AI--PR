
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { analyzeMeal } from '@/ai/flows/ai-meal-analysis';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MealAnalyzerPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setIsLogged(false); // Reset log status on new image
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
        toast({
            title: 'No image selected',
            description: 'Please select an image of your meal to analyze.',
            variant: 'destructive',
        });
        return;
    }
    setIsLoading(true);
    setAnalysis(null);
    setIsLogged(false);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
        const base64data = reader.result;
        try {
            const result = await analyzeMeal({ photoDataUri: base64data });
            setAnalysis(result);
        } catch (error) {
            console.error('Error analyzing meal:', error);
            toast({
                title: 'Analysis Failed',
                description: 'There was an error analyzing your meal. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
  };

  const handleLogMeal = () => {
    if (!analysis) return;

    // In a real application, you would save this data to your database (e.g., Firestore)
    console.log('Logging meal:', {
      ...analysis,
      timestamp: new Date().toISOString(),
    });

    setIsLogged(true);
    toast({
      title: 'Meal Logged!',
      description: 'Your meal has been successfully added to your daily log.',
    });
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">AI Meal Analyzer</h1>
        <p className="text-muted-foreground">Take a picture of your meal to get an instant analysis of its contents and calories.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="font-headline">Upload Meal Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            {imagePreview ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image src={imagePreview} alt="Meal preview" fill style={{ objectFit: 'cover' }} data-ai-hint="meal photo" />
              </div>
            ) : (
                <div className="flex items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg">
                    <div className="text-center text-muted-foreground">
                        <Upload className="mx-auto h-12 w-12"/>
                        <p>Image preview will appear here</p>
                    </div>
                </div>
            )}
            <Button onClick={handleAnalyze} disabled={isLoading || !imagePreview} className="w-full">
              {isLoading ? 'Analyzing...' : 'Analyze Meal'}
            </Button>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="font-headline">Analysis Results</CardTitle>
            <CardDescription>Here is the nutritional breakdown of your meal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                </div>
            )}
            {analysis && (
              <div>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">Estimated Calories</h3>
                  <p className="text-4xl font-bold text-primary">{Math.round(analysis.calories)} kcal</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg">Meal Contents</h3>
                  <p className="text-muted-foreground">{analysis.contents}</p>
                </div>
                {isLogged ? (
                  <Button variant="outline" className="w-full" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Meal Logged Successfully
                  </Button>
                ) : (
                  <Button onClick={handleLogMeal} className="w-full">
                    Log This Meal
                  </Button>
                )}
              </div>
            )}
            {!isLoading && !analysis && (
                <div className="text-center text-muted-foreground py-10">
                    <p>Analysis results will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
