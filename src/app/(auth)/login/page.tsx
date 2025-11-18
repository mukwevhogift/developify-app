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

export default function LoginPage() {
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
        <Button asChild className="w-full font-bold">
            <Link href="/dashboard">Sign In as Investor</Link>
        </Button>
        <Button asChild className="w-full font-bold" variant="secondary">
            <Link href="/owner-onboarding">Sign In as Property Owner</Link>
        </Button>
        <Button asChild className="w-full font-bold" variant="outline">
            <Link href="/admin/approvals">Sign In as Admin</Link>
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
