'use client'

import { motion } from 'framer-motion'
import { Award, BarChart, ShieldCheck, Wallet } from 'lucide-react'
import CountUp from 'react-countup'

const StatCard = ({ value, label, icon: Icon }: { value: number, label: string, icon: React.ElementType }) => (
  <motion.div
    className="flex items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <div className="rounded-lg bg-primary/10 p-3 text-primary">
      <Icon className="h-8 w-8" />
    </div>
    <div>
      <p className="text-3xl font-bold text-white">
        <CountUp end={value} duration={3} enableScrollSpy scrollSpyOnce />+
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </motion.div>
)

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="bg-background py-20 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 lg:grid-cols-5 lg:gap-16">
        <motion.div
          className="lg:col-span-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="font-headline text-3xl font-bold text-white sm:text-4xl">
            The Future of Property Investment is Here
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
            Developify empowers everyday investors and visionary landowners to collaboratively build the future. We break down the barriers to property development, offering a transparent, secure, and highly profitable ecosystem for all.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-8 space-y-4">
              <h3 className="font-semibold text-white">Our Story</h3>
              <p className="text-muted-foreground">
                Founded by a team of fintech and real estate experts, Developify was born from a simple idea: everyone deserves the opportunity to build wealth through property. We leverage technology to democratize access to an asset class that was once reserved for the few.
              </p>
          </motion.div>

          <motion.div variants={containerVariants} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <StatCard value={100} label="Projects Funded" icon={Award} />
            <StatCard value={10000} label="Active Users" icon={BarChart} />
          </motion.div>
        </motion.div>

        <motion.div 
            className="relative lg:col-span-2"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="aspect-w-9 aspect-h-16 h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                <video
                    className="h-full w-full object-cover"
                    src="/Developify__Investing_Reimagined.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://via.placeholder.com/1280x720.png?text=Developify%20Explainer"
                />
            </div>
        </motion.div>
      </div>
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-teal-500/50 to-transparent mt-20"></div>
    </section>
  )
}
