import LandingHeader from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import BackToTopButton from '@/components/landing/back-to-top-button';

export const metadata = {
  title: 'Privacy Policy | Developify',
  description: 'Understand how Developify collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <LandingHeader />
      <main className="container mx-auto max-w-4xl px-4 py-20 sm:py-32">
        <div className="space-y-8">
            <div className="text-center border-b border-border/50 pb-8">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">Privacy Policy</h1>
                <p className="mt-4 text-muted-foreground">Last updated: June 25, 2024</p>
            </div>

            <article className="prose prose-invert max-w-none text-muted-foreground space-y-6">
                <p>
                Developify ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
                </p>

                <h2 id="collection">1. Information We Collect</h2>
                <p>
                We may collect personal information such as your name, email address, phone number, financial information, and government-issued identification. We also collect non-personal information, such as browser type, IP address, and pages visited, to improve our Service.
                </p>

                <h2 id="usage">2. How We Use Your Information</h2>
                <p>
                We use your information to: provide and manage your account; process transactions; communicate with you; comply with legal obligations; and improve our services. We do not sell your personal information to third parties.
                </p>

                <h2 id="kyc">3. KYC & Identity Verification</h2>
                <p>
                To comply with regulatory requirements, we perform Know Your Customer (KYC) checks. This requires the collection of sensitive information, including identity documents. This data is securely stored and used solely for verification purposes.
                </p>

                <h2 id="sharing">4. Sharing with Third Parties</h2>
                <p>
                We may share your information with trusted third-party service providers for functions such as payment processing, data analysis, and email delivery. These third parties are obligated to maintain the confidentiality and security of your information.
                </p>

                <h2 id="security">5. Data Security & Encryption</h2>
                <p>
                We use administrative, technical, and physical security measures to help protect your personal information. This includes encryption of data in transit and at rest, and access controls to our systems. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                </p>

                <h2 id="cookies">6. Cookies & Tracking</h2>
                <p>
                We use cookies to enhance your experience, remember your preferences, and analyze our traffic. You can control the use of cookies at the individual browser level.
                </p>
                
                <h2 id="rights">7. Your Rights (GDPR/CCPA)</h2>
                <p>
                Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, please contact us.
                </p>

                <h2 id="children">8. Children’s Privacy</h2>
                <p>
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>

                <h2 id="changes">9. Changes to Policy</h2>
                <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>

                <div className="border-t border-border/50 pt-6">
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@developify.com" className="text-primary hover:underline">privacy@developify.com</a>.</p>
                </div>
            </article>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
