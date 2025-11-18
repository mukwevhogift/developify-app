import { OnboardingFormProvider } from '@/components/onboarding/onboarding-form-provider';
import OnboardingForm from '@/components/onboarding/onboarding-form';

export default function OwnerOnboardingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Property Owner Verification</h1>
        <p className="text-muted-foreground">
          Complete the following steps to get your account verified and start listing properties.
        </p>
      </div>
      <OnboardingFormProvider>
        <OnboardingForm />
      </OnboardingFormProvider>
    </div>
  );
}
