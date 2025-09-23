'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function DietPlansPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Diet & Fitness Plans</h1>
        <p className="text-muted-foreground">Create and manage personalized plans for your patients.</p>
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Your Plan Templates</CardTitle>
                <CardDescription>Reusable meal and workout plans.</CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Create New Plan
            </Button>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-20">
                <p>The ability to create, assign, and track adherence to diet and fitness plans will be here.</p>
                <p>Coming soon!</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
