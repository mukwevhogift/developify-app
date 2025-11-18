
'use client'

import HeroSection from '@/components/landing/hero-section'
import AboutSection from '@/components/landing/about-section'
import CtaSection from '@/components/landing/cta-section'
import Footer from '@/components/landing/footer'
import BackToTopButton from '@/components/landing/back-to-top-button'
import LandingHeader from '@/components/landing/header'

export default function SplashPage() {
  return (
    <div className="bg-background text-foreground">
      <LandingHeader />
      <HeroSection />
      <main>
        <AboutSection />
        <CtaSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
