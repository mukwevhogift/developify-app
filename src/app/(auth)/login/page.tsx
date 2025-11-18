'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Rocket } from "lucide-react"
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: 'investor' | 'owner' | 'admin') => {
    login(role);
    if (role === 'investor') router.push('/dashboard');
    if (role === 'owner') router.push('/owner/dashboard');
    if (role === 'admin') router.push('/admin/approvals');
  }


  return (
    <Card className="w-full max-w-sm border-2 border-primary/20 shadow-lg shadow-primary/10">
      <CardHeader className="items-center text-center">
        <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/20 p-2">
                <Rocket className="h-6 w-6 text-primary" />
            </div>
          <CardTitle className="font-headline text-2xl">Developify</CardTitle>
        </Link>
        <CardDescription>
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={() => handleLogin('investor')} className="w-full font-bold">
            Sign In as Investor
        </Button>
        <Button onClick={() => handleLogin('owner')} className="w-full font-bold" variant="secondary">
           Sign In as Property Owner
        </Button>
        <Button onClick={() => handleLogin('admin')} className="w-full font-bold" variant="outline">
            Sign In as Admin
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
