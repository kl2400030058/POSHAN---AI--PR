
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { mealLogs } from '@/lib/data'; // Import mealLogs

export default function MealLogPage() {

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Meal Log</h1>
        <p className="text-muted-foreground">Keep track of your daily food intake.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Your Meals</CardTitle>
                <CardDescription>A log of your recent meals.</CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Add Meal
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-headline">Log a New Meal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="meal-type">Meal Type</Label>
                            <Input id="meal-type" placeholder="e.g. Breakfast, Lunch, Snack"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="food-items">Food Items</Label>
                            <Textarea id="food-items" placeholder="List the food items and portion sizes..."/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Meal</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
            {mealLogs.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    <p>You haven&apos;t logged any meals yet.</p>
                    <p>Click &quot;Add Meal&quot; to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {mealLogs.map((log) => (
                        <Card key={log.id} className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-0 overflow-hidden card-glow">
                          <div className="md:col-span-1 relative h-full min-h-[200px] w-full">
                              <Image
                                  src={log.imageUrl}
                                  alt={log.items}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={log.imageHint}
                              />
                          </div>
                          <div className="md:col-span-2 p-4 flex flex-col justify-center">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <p className="text-sm text-muted-foreground">{log.date}</p>
                                      <p className="font-bold font-headline text-xl text-primary">{log.meal}</p>
                                  </div>
                                  <p className="font-bold text-lg">{log.calories} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
                              </div>
                              <p className="mt-2 text-muted-foreground">{log.items}</p>
                              <div className="flex justify-around mt-4 text-center text-sm">
                                  <div>
                                      <p className="font-bold">{log.protein}g</p>
                                      <p className="text-muted-foreground">Protein</p>
                                  </div>
                                  <div>
                                      <p className="font-bold">{log.carbs}g</p>
                                      <p className="text-muted-foreground">Carbs</p>
                                  </div>
                                  <div>
                                      <p className="font-bold">{log.fats}g</p>
                                      <p className="text-muted-foreground">Fats</p>
                                  </div>
                              </div>
                          </div>
                        </Card>
                    ))}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
