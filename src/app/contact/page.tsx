import LandingHeader from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import BackToTopButton from '@/components/landing/back-to-top-button';
import { ContactForm } from '@/components/landing/contact-form';
import { Mail, Phone, Clock, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Developify',
  description: 'Get in touch with the Developify team for any questions about investing, listing properties, or technical support.',
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <LandingHeader />
      <main className="container mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="text-center h-[50vh] flex flex-col justify-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            We’re here to help you with any questions about investing or listing properties. Reach out and let us know how we can assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <ContactForm />
          </div>
          <div className="space-y-8 rounded-lg bg-card p-8">
            <h3 className="font-headline text-2xl font-bold text-white">
              Alternative Contacts
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:support@developify.com" className="hover:text-primary">
                  support@developify.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-primary" />
                <span>Mon – Fri, 9AM – 6PM UTC</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
