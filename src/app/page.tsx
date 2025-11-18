import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function SplashPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/50 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-accent/50 blur-3xl delay-1000"></div>
      </div>
      <main className="z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-full bg-primary/20 p-4">
            <Rocket className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
          Developify
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Unlock the future of property investment. Fractional ownership, transparent deals, and AI-powered insights.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="font-bold">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="font-bold">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
