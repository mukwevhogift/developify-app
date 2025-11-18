'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PieChart,
  Wallet,
  Sparkles,
  Settings,
  Rocket,
  UserCheck,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { Skeleton } from '../ui/skeleton';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['investor'] },
  { href: '/properties', label: 'Properties', icon: Building2, roles: ['investor'] },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart, roles: ['investor'] },
  { href: '/wallet', label: 'Wallet', icon: Wallet, roles: ['investor'] },
  { href: '/advisor', label: 'AI Advisor', icon: Sparkles, roles: ['investor'] },
  { href: '/owner-onboarding', label: 'Get Verified', icon: UserCheck, roles: ['property_owner'] },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const userRole = (user?.stsTokenManager?.claims as { role?: string })?.role;

  const filteredNavItems = navItems.filter(item => userRole && item.roles.includes(userRole));

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 p-2">
            <div className="rounded-lg bg-primary/20 p-2">
                <Rocket className="h-6 w-6 text-primary" />
            </div>
          <h1 className="font-headline text-xl font-bold text-foreground group-data-[collapsible=icon]:hidden">
            Developify
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {isUserLoading ? (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </>
          ) : (
            filteredNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/settings')}
              tooltip={{ children: 'Settings', side: 'right' }}
            >
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
