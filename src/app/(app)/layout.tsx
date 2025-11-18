import AppSidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <div className="flex flex-col h-screen">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <Suspense fallback={<div className="flex h-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary"/></div>}>
                  {children}
                </Suspense>
              </main>
            </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
