'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useOnboardingForm, useOnboardingRHF } from './onboarding-form-provider';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  url?: string;
  error?: string;
}

export default function Step2_DocumentUpload() {
  const { setCurrentStep, setUploadedFileUrls } = useOnboardingForm();
  const { setValue } = useOnboardingRHF();
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    fileRejections.forEach((rejection: any) => {
      toast({
        variant: 'destructive',
        title: 'File Rejected',
        description: `${rejection.file.name}: ${rejection.errors[0].message}`,
      });
    });

    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles].slice(0, 3));
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'], 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 3,
  });

  const handleUpload = () => {
    if (files.some(f => f.progress > 0 && f.progress < 100)) {
        toast({ variant: 'destructive', title: 'Upload in Progress', description: 'Please wait for current uploads to complete.' });
        return;
    }

    setIsUploading(true);

    const uploadPromises = files.filter(f => !f.url).map((uploadedFile) => {
        return new Promise<string>((resolve) => {
            const interval = setInterval(() => {
                setFiles(prev => prev.map(f => {
                    if (f.file === uploadedFile.file) {
                        const newProgress = f.progress + 20;
                        if (newProgress >= 100) {
                            clearInterval(interval);
                            resolve(`https://mock-url.com/${f.file.name}`);
                            return { ...f, progress: 100, url: `https://mock-url.com/${f.file.name}` };
                        }
                        return { ...f, progress: newProgress };
                    }
                    return f;
                }));
            }, 200);
        });
    });

    Promise.all(uploadPromises)
        .then((urls) => {
            const allUrls = [...files.map(f => f.url).filter(Boolean) as string[], ...urls];
            setUploadedFileUrls(allUrls);
            setValue('documents', files.map(f => f.file)); // Update RHF state
            toast({ title: 'Success', description: 'All documents uploaded successfully.' });
            setIsUploading(false);
        })
        .catch(() => {
            toast({ variant: 'destructive', title: 'Upload Failed', description: 'Some documents failed to upload. Please try again.' });
            setIsUploading(false);
        });
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };
  
  const allUploaded = files.length > 0 && files.every(f => f.url);

  return (
    <div className="space-y-6">
      <div {...getRootProps()} className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 text-muted-foreground" />
        <p className="mt-4 text-center text-muted-foreground">
            {isDragActive ? 'Drop the files here...' : 'Drag & drop up to 3 documents, or click to select'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
            <h4 className="font-semibold">Uploaded Files</h4>
            {files.map((uploadedFile, index) => (
                <div key={index} className="flex items-center gap-4 p-2 border rounded-lg">
                    <File className="h-6 w-6 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                        {uploadedFile.progress < 100 && !uploadedFile.error && <Progress value={uploadedFile.progress} className="h-2 mt-1" />}
                        {uploadedFile.progress === 100 && <p className="text-xs text-green-500">Upload complete</p>}
                        {uploadedFile.error && <p className="text-xs text-red-500">{uploadedFile.error}</p>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(uploadedFile.file)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
      )}

      {files.length > 0 && !allUploaded && (
        <Button onClick={handleUpload} disabled={isUploading} className="w-full">
            {isUploading ? <Loader2 className="animate-spin" /> : 'Upload Documents'}
        </Button>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setCurrentStep(0)}>Back</Button>
        <Button onClick={() => setCurrentStep(2)} disabled={!allUploaded}>Next</Button>
      </div>
    </div>
  );
}
