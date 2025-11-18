import AppSidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

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
              {children}
            </main>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
