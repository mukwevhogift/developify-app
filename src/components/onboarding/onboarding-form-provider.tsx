'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { useForm, FormProvider as RHFProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  // Step 1
  fullName: z.string().min(2, 'Full name is required'),
  companyName: z.string().optional(),
  phone: z.string().min(10, 'A valid phone number is required'),
  // Step 2
  documents: z.array(z.custom<File>()).min(1, 'At least one document is required').max(3, 'You can upload a maximum of 3 documents'),
});

type OnboardingFormData = z.infer<typeof formSchema>;

interface OnboardingFormContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  uploadedFileUrls: string[];
  setUploadedFileUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const OnboardingFormContext = createContext<OnboardingFormContextType | undefined>(undefined);

export const OnboardingFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
      fullName: '',
      companyName: '',
      phone: '',
      documents: [],
  });
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const contextValue = useMemo(() => ({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    uploadedFileUrls,
    setUploadedFileUrls,
  }), [currentStep, formData, uploadedFileUrls]);

  return (
    <OnboardingFormContext.Provider value={contextValue}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </OnboardingFormContext.Provider>
  );
};

export const useOnboardingForm = () => {
  const context = useContext(OnboardingFormContext);
  if (!context) {
    throw new Error('useOnboardingForm must be used within an OnboardingFormProvider');
  }
  return context;
};

export const useOnboardingRHF = () => useFormContext<OnboardingFormData>();
