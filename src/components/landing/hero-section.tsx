'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen min-h-[700px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-blue-900/40 to-teal-900/60" />
      
      <div className="container z-10 mx-auto flex flex-col items-center px-4 text-center lg:flex-row lg:items-center lg:text-left">
        <div className="w-full lg:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-headline text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Invest in Tomorrow's Properties Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-xl text-base text-gray-300 md:text-lg lg:mx-0"
          >
            Fractional ownership made simple—browse, fund, and grow your portfolio seamlessly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button asChild size="lg" className="w-full bg-gold font-bold text-background shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-gold/30 sm:w-auto">
              <Link href="/register">Start Investing</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12 w-full max-w-lg lg:mt-0 lg:w-1/2"
        >
            <div className="aspect-video w-full rounded-2xl bg-black/30 shadow-2xl backdrop-blur-sm">
                <video
                    className="h-full w-full rounded-2xl object-cover"
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://via.placeholder.com/1280x720.png?text=App+Walkthrough"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20">
                    <PlayCircle className="h-16 w-16 text-white/50" />
                </div>
            </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </motion.a>
    </section>
  )
}
