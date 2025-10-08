
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { CheckCircle2, Clock, Droplet, Flame, Zap, ArrowUp, ArrowDown } from 'lucide-react';

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

const weeklyAnalysisData = {
    '2024-07-29': {
        avgCalories: 1950,
        avgProtein: 50,
        avgCarbs: 250,
        avgFats: 80,
        calorieTrend: -5, // percentage change from last week
        chartData: [
            { day: 'Mon', calories: 2100 },
            { day: 'Tue', calories: 1900 },
            { day: 'Wed', calories: 2000 },
            { day: 'Thu', calories: 1850 },
            { day: 'Fri', calories: 2200 },
            { day: 'Sat', calories: 2300 },
            { day: 'Sun', calories: 1800 },
        ]
    }
};

const chartConfig = {
    calories: {
        label: 'Calories',
        color: 'hsl(var(--primary))',
    },
};

export default function MyPlanPage() {
    const [date, setDate] = useState(new Date());

    const analysis = weeklyAnalysisData['2024-07-29']; // Static mock data for now

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
            <div className="grid lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="w-full"
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Weekly Analysis</CardTitle>
                            <CardDescription>Your nutritional summary for the selected week.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {analysis ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Avg. Calories</p>
                                            <p className="text-2xl font-bold">{analysis.avgCalories}kcal</p>
                                            <p className={`text-xs flex items-center justify-center ${analysis.calorieTrend < 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {analysis.calorieTrend < 0 ? <ArrowDown className="w-3 h-3 mr-1"/> : <ArrowUp className="w-3 h-3 mr-1"/>}
                                                {Math.abs(analysis.calorieTrend)}% from last week
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Avg. Protein</p>
                                            <p className="text-2xl font-bold">{analysis.avgProtein}g</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Avg. Carbs</p>
                                            <p className="text-2xl font-bold">{analysis.avgCarbs}g</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Avg. Fats</p>
                                            <p className="text-2xl font-bold">{analysis.avgFats}g</p>
                                        </div>
                                    </div>
                                    <ChartContainer config={chartConfig} className="w-full h-[250px]">
                                        <BarChart accessibilityLayer data={analysis.chartData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                                            <YAxis hide/>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="calories" fill="var(--color-calories)" radius={8} />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-10">
                                    <p>No analysis available for the selected week.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
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
