'use client';

import { useOnboardingForm, useOnboardingRHF } from './onboarding-form-provider';
import Step1_PersonalInfo from './step1-personal-info';
import Step2_DocumentUpload from './step2-document-upload';
import Step3_Submit from './step3-submit';
import { Stepper } from './stepper';
import { Card } from '@/components/ui/card';

const steps = [
  { name: 'Personal Info', component: Step1_PersonalInfo },
  { name: 'Documents', component: Step2_DocumentUpload },
  { name: 'Submit', component: Step3_Submit },
];

export default function OnboardingForm() {
  const { currentStep } = useOnboardingForm();
  const { formState } = useOnboardingRHF();

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card className="p-6">
        <Stepper steps={steps.map(s => s.name)} currentStep={currentStep} />
        <div className="mt-8">
            <CurrentStepComponent />
        </div>
    </Card>
  );
}
