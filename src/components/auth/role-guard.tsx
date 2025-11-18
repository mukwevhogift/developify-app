'use client';

import { useUser } from '@/firebase/provider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

const RoleGuard = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  const claims = (user?.stsTokenManager?.claims as { role?: string; status?: string });
  const role = claims?.role;
  const status = claims?.status;

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait for user to be loaded
    }

    if (!user) {
      router.push('/login');
      return;
    }

    // Admin routes
    if (role === 'admin' && !pathname.startsWith('/admin')) {
        router.push('/admin/approvals');
    }
    else if (role !== 'admin' && pathname.startsWith('/admin')) {
        router.push('/dashboard'); // Or some other default page
    }
    
    // Investor routes
    else if (role === 'investor' && (pathname.startsWith('/owner') || pathname.startsWith('/owner-onboarding'))) {
        router.push('/dashboard');
    } 
    // Property Owner routes
    else if (role === 'property_owner') {
        const isVerified = status === 'verified_owner';
        
        // If verified, but on onboarding, redirect to owner dashboard
        if (isVerified && pathname.startsWith('/owner-onboarding')) {
            router.push('/owner/dashboard');
        } 
        // If not verified, and trying to access owner areas, redirect to onboarding
        else if (!isVerified && pathname.startsWith('/owner')) {
            router.push('/owner-onboarding');
        }
        // If not verified and on general investor pages, redirect to onboarding
        else if (!isVerified && !pathname.startsWith('/owner-onboarding') && pathname !== '/settings') {
             router.push('/owner-onboarding');
        }
    }
  }, [user, isUserLoading, router, pathname, role, status]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flash of content before redirect
  if (!user || isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
