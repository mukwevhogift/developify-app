'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CtaSection() {
  return (
    <section id="cta" className="bg-secondary/30 py-20 sm:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Ready to Build Your Portfolio?
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          Join thousands of investors and property owners on Developify. Your journey to financial freedom through property starts here.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-8"
        >
          <Button asChild size="lg" className="bg-gold font-bold text-background shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-gold/30">
            <Link href="/register">Create Your Free Account</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
