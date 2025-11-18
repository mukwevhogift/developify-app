import LandingHeader from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import BackToTopButton from '@/components/landing/back-to-top-button';

export const metadata = {
  title: 'Terms of Service | Developify',
  description: 'Read the Terms of Service for using the Developify platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground">
      <LandingHeader />
      <main className="container mx-auto max-w-4xl px-4 py-20 sm:py-32">
        <div className="space-y-8">
            <div className="text-center border-b border-border/50 pb-8">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl">Terms of Service</h1>
                <p className="mt-4 text-muted-foreground">Last updated: June 25, 2024</p>
            </div>

            <article className="prose prose-invert max-w-none text-muted-foreground space-y-6">
                <p>
                Welcome to Developify. These Terms of Service ("Terms") govern your access to and use of the Developify website, applications, and services (collectively, the "Service"). Please read these Terms carefully before using the Service.
                </p>

                <h2 id="acceptance">1. Acceptance of Terms</h2>
                <p>
                By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
                </p>

                <h2 id="eligibility">2. Eligibility & Account Registration</h2>
                <p>
                You must be at least 18 years old to use the Service. When you register for an account, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities that occur under your account.
                </p>

                <h2 id="wallet">3. Wallet & Payments</h2>
                <p>
                The Developify wallet allows you to deposit, hold, and withdraw funds. All transactions are processed through our secure payment partners. You agree to provide valid payment information and authorize us to charge your payment method for all transactions.
                </p>

                <h2 id="investments">4. Investments & Risks</h2>
                <p>
                Investing in property developments involves significant risk, including the potential loss of principal. Developify provides a platform for investment but does not offer financial advice. All investment decisions are made at your own risk. We do not guarantee any return on investment.
                </p>

                <h2 id="owner-responsibilities">5. Property Owner Responsibilities</h2>
                <p>
                If you are a property owner listing a project, you warrant that all information provided is accurate and not misleading. You are responsible for complying with all applicable laws and regulations regarding your property development.
                </p>

                <h2 id="fees">6. Fees & Withdrawals</h2>
                <p>
                Developify may charge fees for certain services, which will be disclosed to you prior to any transaction. Withdrawals are subject to processing times and may require additional verification.
                </p>

                <h2 id="prohibited">7. Prohibited Activities</h2>
                <p>
                You agree not to engage in any unlawful or fraudulent activities, including money laundering, impersonation, or infringing on intellectual property rights. Violation of these rules may result in immediate account termination.
                </p>

                <h2 id="termination">8. Termination & Suspension</h2>
                <p>
                We may terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties.
                </p>
                
                <h2 id="liability">9. Limitation of Liability</h2>
                <p>
                To the fullest extent permitted by law, Developify shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>

                <h2 id="law">10. Governing Law</h2>
                <p>
                These Terms shall be governed by the laws of the jurisdiction in which our company is incorporated, without regard to its conflict of law provisions.
                </p>

                <h2 id="changes">11. Changes to Terms</h2>
                <p>
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                </p>

                <div className="border-t border-border/50 pt-6">
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@developify.com" className="text-primary hover:underline">legal@developify.com</a>.</p>
                </div>
            </article>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
