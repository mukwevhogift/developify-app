'use client';

import { useOnboardingForm, useOnboardingRHF } from './onboarding-form-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Step3_Submit() {
  const { setCurrentStep, formData, uploadedFileUrls } = useOnboardingForm();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      console.log('Submitting KYC data:', {
        ...formData,
        documentUrls: uploadedFileUrls,
      });
      
      setIsSubmitted(true);
      toast({ title: 'Application Submitted', description: 'Your verification request has been sent to our team.' });
    } catch (error) {
      console.error('Error submitting KYC:', error);
      toast({ variant: 'destructive', title: 'Submission Failed', description: 'There was an error submitting your application.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
      return (
        <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Submission Successful!</h2>
            <p className="text-muted-foreground">
                Your application is now under review. We will notify you once the process is complete.
                This can take up to 2-3 business days.
            </p>
            <Button onClick={() => router.push('/owner/dashboard')}>Back to Dashboard</Button>
        </div>
      );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Full Name</p>
            <p className="text-muted-foreground">{formData.fullName}</p>
          </div>
          <div>
            <p className="font-semibold">Company Name</p>
            <p className="text-muted-foreground">{formData.companyName || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Phone Number</p>
            <p className="text-muted-foreground">{formData.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Documents</p>
            <ul className="list-disc list-inside text-muted-foreground">
                {uploadedFileUrls.map((url, i) => (
                    <li key={i} className="truncate">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Document {i+1}
                        </a>
                    </li>
                ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)} disabled={isSubmitting}>Back</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit for Verification'}
        </Button>
      </div>
    </div>
  );
}
