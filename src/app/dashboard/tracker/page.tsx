'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  weight: {
    label: 'Weight (kg)',
    color: 'hsl(var(--primary))',
  },
};

export default function TrackerPage() {
    const weightTrackerData: any[] = []; // This will be replaced with real data from Firestore
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
                <CardTitle className="font-headline">Workout Recommendations</CardTitle>
                <CardDescription>Personalized routines based on your goals.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-10">
                    <p>Coming Soon!</p>
                </div>
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
