
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function PatientsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Manage Patients</h1>
        <p className="text-muted-foreground">View patient details and track their progress.</p>
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">All Patients</CardTitle>
                <CardDescription>A list of your registered patients.</CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add New Patient
            </Button>
        </CardHeader>
        <CardContent>
            <div className="text-center text-muted-foreground py-20">
                <p>Patient list and management features will be available here.</p>
                <p>Coming soon!</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
