'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Users,
  LayoutGrid,
  FileText,
  LogOut,
  BrainCircuit,
  ClipboardCheck,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

const menuItems = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/doctor/dashboard/patients', label: 'Patients', icon: Users },
  { href: '/doctor/dashboard/plans', label: 'Diet & Fitness Plans', icon: ClipboardCheck },
  { href: '/doctor/dashboard/insights', label: 'AI Insights', icon: BrainCircuit },
];

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  if (loading) {
      return (
          <div className="flex h-screen w-full items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                  <Logo />
                  <p className="text-muted-foreground">Loading your dashboard...</p>
              </div>
          </div>
      )
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2 flex justify-center">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut} asChild tooltip={{ children: 'Logout' }}>
                <Link href="/">
                  <LogOut />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:pt-4">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
                <span className="font-semibold">{user?.displayName || 'Doctor'}</span>
                <Avatar>
                    <AvatarImage src={user?.photoURL ?? ''} alt="Doctor avatar" />
                    <AvatarFallback>{user?.displayName?.charAt(0) ?? 'D'}</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
