'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts';
import { dailyTotals, recommendedDailyAllowances, userProfile } from '@/lib/data';

const macroData = [
  { name: 'Protein', value: dailyTotals.protein, fill: 'var(--color-protein)' },
  { name: 'Carbs', value: dailyTotals.carbs, fill: 'var(--color-carbs)' },
  { name: 'Fats', value: dailyTotals.fats, fill: 'var(--color-fats)' },
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
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Welcome back, {userProfile.name}!</h1>
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
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-glow">
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
                <Pie data={macroData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} strokeWidth={2}>
                    {macroData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="font-headline">Macronutrient Goals</CardTitle>
            <CardDescription>Your progress towards daily macro goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={macroChartConfig} className="w-full h-[300px]">
                <BarChart accessibilityLayer data={nutrients.slice(1)} layout="vertical" margin={{left: 10, right: 10}}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide />
                    <Bar dataKey="current" layout="vertical" radius={5} barSize={20}>
                        {nutrients.slice(1).map((nutrient, index) => (
                           <Cell key={`cell-${nutrient.name}`} fill={Object.values(macroChartConfig)[index].color} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
