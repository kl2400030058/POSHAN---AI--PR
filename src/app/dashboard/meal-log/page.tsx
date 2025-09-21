import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mealLogs } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead className="w-[50%]">Items</TableHead>
                <TableHead className="text-right">Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell className="font-medium">{log.meal}</TableCell>
                  <TableCell>{log.items}</TableCell>
                  <TableCell className="text-right">{log.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
