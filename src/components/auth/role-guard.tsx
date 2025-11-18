'use client';

import { useUser } from '@/firebase/provider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

const RoleGuard = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const role = (user?.stsTokenManager?.claims as { role?: string })?.role;
  
  useEffect(() => {
    if (isUserLoading) {
      return; // Wait for user to be loaded
    }

    if (!user) {
      router.push('/login');
      return;
    }

    // This is a simplified check. A real app might need more complex logic.
    if (role === 'investor' && pathname.startsWith('/owner-onboarding')) {
        router.push('/dashboard');
    } else if (role === 'property_owner' && (pathname === '/dashboard' || pathname.startsWith('/properties'))) {
        router.push('/owner-onboarding');
    }
  }, [user, isUserLoading, router, pathname, role]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
