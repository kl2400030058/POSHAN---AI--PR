
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

// This is mock data and will be replaced with actual patient data from Firestore
const patients = [
  { id: '1', name: 'Rohan Sharma', age: 34, issue: 'High Cholesterol', lastActivity: '2 hours ago' },
  { id: '2', name: 'Priya Singh', age: 28, issue: 'Pre-diabetic', lastActivity: '5 hours ago' },
  { id: '3', name: 'Amit Patel', age: 45, issue: 'Hypertension', lastActivity: '1 day ago' },
  { id: '4', name: 'Sunita Devi', age: 52, issue: 'Anemia', lastActivity: '3 days ago' },
];

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Welcome back, {user?.displayName || 'Doctor'}!</h1>
        <p className="text-muted-foreground">Here’s a list of your registered patients.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Patients</CardTitle>
          <CardDescription>A list of all patients currently under your care.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Primary Issue</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{patient.issue}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastActivity}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
