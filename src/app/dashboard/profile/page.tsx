'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { userProfile } from '@/lib/data';

export default function ProfilePage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Personal Information</CardTitle>
          <CardDescription>Update your personal details here. This helps in personalizing your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userProfile.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={userProfile.email} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" defaultValue={userProfile.age} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" defaultValue={userProfile.weight} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" defaultValue={userProfile.height} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue={userProfile.gender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <div className="grid gap-2">
                <Label htmlFor="diet">Preferred Diet</Label>
                 <Select defaultValue={userProfile.preferredDiet}>
                  <SelectTrigger id="diet">
                    <SelectValue placeholder="Select diet preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="low-carb">Low-Carb</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="health-issues">Health Issues</Label>
              <Textarea id="health-issues" defaultValue={userProfile.healthIssues} placeholder="e.g., High cholesterol, pre-diabetic" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
