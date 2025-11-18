import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Rocket } from "lucide-react"

export default function RegisterPage() {
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
          Join Developify and start your investment journey today.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" placeholder="John Doe" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button asChild className="w-full font-bold">
          <Link href="/dashboard">Create Account</Link>
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
