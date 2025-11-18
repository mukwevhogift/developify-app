
'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function LandingHeader() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-20 bg-background/50 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/20 p-2">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-headline text-xl font-bold text-white">Developify</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" className="text-white hover:bg-primary/10 hover:text-white">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-gold font-bold text-background shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-gold/30">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  )
}
