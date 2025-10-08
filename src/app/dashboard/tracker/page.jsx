
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Sun, Shield, Bone } from 'lucide-react';

const chartConfig = {
  weight: {
    label: 'Weight (kg)',
    color: 'hsl(var(--primary))',
  },
};

const vitaminData = [
    { name: 'Vitamin D', current: 300, goal: 600, unit: 'IU', icon: <Sun className="w-5 h-5 text-yellow-500" /> },
    { name: 'Vitamin C', current: 70, goal: 90, unit: 'mg', icon: <Shield className="w-5 h-5 text-orange-500" /> },
    { name: 'Iron', current: 12, goal: 18, unit: 'mg', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 2L12 22"></path><path d="M17 7L12 2L7 7"></path></svg> },
    { name: 'Calcium', current: 800, goal: 1000, unit: 'mg', icon: <Bone className="w-5 h-5 text-gray-400" /> },
];

export default function TrackerPage() {
    const weightTrackerData = []; // This will be replaced with real data from Firestore
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Progress Tracker</h1>
        <p className="text-muted-foreground">Monitor your diet and weight changes over time.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Weight Journey</CardTitle>
          <CardDescription>Your weight progress over the last month.</CardDescription>
        </CardHeader>
        <CardContent>
            {weightTrackerData.length === 0 ? (
                <div className="text-center text-muted-foreground py-20">
                    <p>No weight data to display.</p>
                    <p>Start tracking your weight to see your progress.</p>
                </div>
            ) : (
                <ChartContainer config={chartConfig} className="w-full h-[400px]">
                    <LineChart
                    accessibilityLayer
                    data={weightTrackerData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                        bottom: 20,
                    }}
                    >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis
                        domain={['dataMin - 2', 'dataMax + 2']}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Line
                        dataKey="weight"
                        type="natural"
                        stroke="var(--color-weight)"
                        strokeWidth={2}
                        dot={{
                        fill: 'var(--color-weight)',
                        }}
                        activeDot={{
                        r: 6,
                        }}
                    />
                    </LineChart>
                </ChartContainer>
            )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Vitamin & Mineral Tracker</CardTitle>
                <CardDescription>Tracking essential micronutrients for your well-being.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {vitaminData.map(item => {
                    const percentage = (item.current / item.goal) * 100;
                    return (
                        <div key={item.name}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium flex items-center gap-2">{item.icon} {item.name}</span>
                                <span className="text-xs text-muted-foreground">{item.current} / {item.goal} {item.unit}</span>
                            </div>
                            <Progress value={percentage} aria-label={`${item.name} intake`} />
                        </div>
                    )
                })}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Meal Timing Reminders</CardTitle>
                <CardDescription>Notifications to help you stay on track.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-10">
                    <p>Coming Soon!</p>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
