'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts';
import { useAuth } from '@/hooks/use-auth';
import { Droplet } from 'lucide-react';
import Image from 'next/image';
import { mealLogs } from '@/lib/data';

// NOTE: The data here will be replaced with real user data from Firestore
const dailyTotals = {
  calories: 1750,
  protein: 47,
  carbs: 215,
  fats: 71,
  water: 1.5, // in Liters
};

const recommendedDailyAllowances = {
  calories: 2000,
  protein: 55,
  carbs: 250,
  fats: 60,
  water: 3, // in Liters
};


const macroData = [
  { name: 'Protein', value: dailyTotals.protein * 4, fill: 'hsl(var(--chart-1))' },
  { name: 'Carbs', value: dailyTotals.carbs * 4, fill: 'hsl(var(--chart-2))' },
  { name: 'Fats', value: dailyTotals.fats * 9, fill: 'hsl(var(--chart-5))' },
];

const macroChartConfig = {
  protein: { label: 'Protein', color: 'hsl(var(--chart-1))' },
  carbs: { label: 'Carbs', color: 'hsl(var(--chart-2))' },
  fats: { label: 'Fats', color: 'hsl(var(--chart-5))' },
};

const nutrients = [
    { name: 'Calories', current: dailyTotals.calories, goal: recommendedDailyAllowances.calories, unit: 'kcal' },
    { name: 'Protein', current: dailyTotals.protein, goal: recommendedDailyAllowances.protein, unit: 'g' },
    { name: 'Carbs', current: dailyTotals.carbs, goal: recommendedDailyAllowances.carbs, unit: 'g' },
    { name: 'Fats', current: dailyTotals.fats, goal: recommendedDailyAllowances.fats, unit: 'g' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Welcome back, {user?.displayName || 'User'}!</h1>
        <p className="text-muted-foreground">Here&apos;s a summary of your nutrient intake for today.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {nutrients.map(nutrient => {
            const percentage = (nutrient.current / nutrient.goal) * 100;
            return (
                <Card key={nutrient.name} className="card-glow">
                    <CardHeader>
                        <CardTitle className="font-headline">{nutrient.name}</CardTitle>
                        <CardDescription>
                            {nutrient.current} / {nutrient.goal} {nutrient.unit}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={percentage} aria-label={`${nutrient.name} intake`} />
                    </CardContent>
                </Card>
            )
        })}
         <Card className="card-glow">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Droplet/> Water Intake</CardTitle>
                <CardDescription>
                    {dailyTotals.water} / {recommendedDailyAllowances.water} L
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={(dailyTotals.water / recommendedDailyAllowances.water) * 100} aria-label="Water intake" />
            </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
         <Card className="card-glow lg:col-span-1">
            <CardHeader>
                <CardTitle className="font-headline">Today&apos;s Meals</CardTitle>
                <CardDescription>A log of the food you have consumed today.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mealLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="flex items-center gap-4">
                        <Image
                            src={log.imageUrl}
                            alt={log.items}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-20 h-20"
                            data-ai-hint={log.imageHint}
                        />
                        <div className="flex-1">
                            <p className="font-bold font-headline text-primary">{log.meal}</p>
                            <p className="text-sm text-muted-foreground">{log.items}</p>
                            <p className="text-xs font-bold">{log.calories} kcal</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="card-glow lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Calorie Breakdown</CardTitle>
            <CardDescription>Calories from Protein, Carbs, and Fats</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={macroChartConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={macroData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} strokeWidth={2} labelLine={false}>
                    {macroData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
