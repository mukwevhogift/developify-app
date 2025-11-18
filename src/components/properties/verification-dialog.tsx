'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

export function VerificationDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { toast } = useToast()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [idPhoto, setIdPhoto] = useState<string | null>(null)
  const [bankStatement, setBankStatement] = useState<File | null>(null)

  const getCameraPermission = useCallback(async () => {
    if (!open) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setHasCameraPermission(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      setHasCameraPermission(false)
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      })
    }
  }, [open, toast])

  useEffect(() => {
    if (open) {
      getCameraPermission()
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [open, getCameraPermission])

  const captureIdPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        const dataUrl = canvas.toDataURL('image/png')
        setIdPhoto(dataUrl)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankStatement(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (!idPhoto) {
        toast({ variant: 'destructive', title: 'Missing ID Photo', description: 'Please capture a photo of your ID.' });
        return;
    }
    if (!bankStatement) {
        toast({ variant: 'destructive', title: 'Missing Bank Statement', description: 'Please upload your bank account confirmation.' });
        return;
    }
    // Handle submission logic here
    toast({ title: 'Verification Submitted', description: 'Your documents are being reviewed.' });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Identity Verification</DialogTitle>
          <DialogDescription>
            As a first-time investor, we need to verify your identity. This is for security and compliance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="id-card">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="id-card">SA ID Document</TabsTrigger>
              <TabsTrigger value="bank-statement">Bank Confirmation</TabsTrigger>
            </TabsList>
            <TabsContent value="id-card" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use your camera to take a clear photo of your South African ID document.
                </p>
                <div className="relative aspect-video w-full rounded-md border bg-muted overflow-hidden">
                    <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                    {idPhoto && (
                        <img src={idPhoto} alt="ID capture" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
                 {!hasCameraPermission && (
                    <Alert variant="destructive">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to capture your ID.
                        </AlertDescription>
                    </Alert>
                )}
                {idPhoto ? (
                    <Button variant="outline" className="w-full" onClick={() => setIdPhoto(null)}>
                        <Camera className="mr-2" /> Retake Photo
                    </Button>
                ) : (
                    <Button className="w-full" onClick={captureIdPhoto} disabled={!hasCameraPermission}>
                        <Camera className="mr-2" /> Capture ID Photo
                    </Button>
                )}
              </div>
            </TabsContent>
            <TabsContent value="bank-statement" className="mt-4">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Upload a recent bank statement or a letter from your bank confirming your account details.
                    </p>
                    <div className="space-y-2">
                        <Label htmlFor="bank-statement-file">Bank Document</Label>
                        <Input id="bank-statement-file" type="file" accept="image/*,.pdf" onChange={handleFileChange} />
                    </div>
                    {bankStatement && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Upload className="h-4 w-4"/>
                            <span>{bankStatement.name}</span>
                        </div>
                    )}
                </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full font-bold">Submit for Verification</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
