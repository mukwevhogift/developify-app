'use client'

import Link from 'next/link'
import { Rocket, Linkedin, Twitter, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/20 p-2">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-headline text-xl font-bold text-white">Developify</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Democratizing Property Investment.</p>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:support@developify.com" aria-label="Email"><Mail className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <Link href="/#about" className="text-muted-foreground hover:text-primary">About</Link>
          <Link href="/properties" className="text-muted-foreground hover:text-primary">Properties</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-white">Stay Updated</h3>
          <p className="text-sm text-muted-foreground">Join our newsletter to get the latest news and opportunities.</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" aria-label="Email for newsletter"/>
            <Button type="submit" variant="secondary">Subscribe</Button>
          </form>
          <div className="flex gap-4 pt-4">
            <Image src="/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} />
            <Image src="/google-play-badge.svg" alt="Get it on Google Play" width={135} height={40} />
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Developify. All rights reserved.</p>
      </div>
    </footer>
  )
}
