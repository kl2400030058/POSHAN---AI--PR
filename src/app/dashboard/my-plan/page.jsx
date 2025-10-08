
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, Droplet, Flame, Zap } from 'lucide-react';

export default function MyPlanPage() {
    // This data will eventually come from the user's generated plan
    const waterIntake = {
        goal: 3, // Liters
        consumed: 1.5,
    };
    const waterTimetable = [
        { time: '8:00 AM', amount: '500ml', completed: true },
        { time: '11:00 AM', amount: '500ml', completed: true },
        { time: '2:00 PM', amount: '500ml', completed: true },
        { time: '5:00 PM', amount: '500ml', completed: false },
        { time: '8:00 PM', amount: '500ml', completed: false },
        { time: '10:00 PM', amount: '500ml', completed: false },
    ];
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">My Personalized Plan</h1>
        <p className="text-muted-foreground">Your daily guide to diet, fitness, and well-being, powered by AI.</p>
      </div>

       <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today's Plan</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><Droplet className="text-primary"/>Water Intake</CardTitle>
                        <CardDescription>Stay hydrated to fuel your day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-2xl">{waterIntake.consumed}L / {waterIntake.goal}L</span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {waterTimetable.map(item => (
                                <li key={item.time} className={`flex items-center justify-between ${item.completed ? 'text-foreground' : ''}`}>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4"/>
                                        {item.time}
                                    </span>
                                    <span>{item.amount}</span>
                                    {item.completed ? <CheckCircle2 className="w-5 h-5 text-green-500"/> : <div className="w-5 h-5"/>}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><Flame className="text-primary"/>Today's Meals</CardTitle>
                         <CardDescription>Your AI-curated meal plan for the day.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>Meal recommendations will be shown here.</p>
                        <p>Coming Soon!</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><Zap className="text-primary"/>Today's Workout</CardTitle>
                        <CardDescription>Your personalized fitness routine.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>Workout routines will be shown here.</p>
                        <p>Coming Soon!</p>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="weekly">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Week at a Glance</CardTitle>
                    <CardDescription>Review your upcoming meal and fitness schedule.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-20">
                    <p>A weekly calendar view of your plan will be displayed here.</p>
                    <p>Coming Soon!</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="progress">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Progress Path</CardTitle>
                    <CardDescription>Visualize your journey and track improvements.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-20">
                    <p>Charts and stats comparing your progress over time will be shown here.</p>
                    <p>Coming Soon!</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
