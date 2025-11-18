'use client'

import { useState } from "react"
import { properties } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, DollarSign, MessageSquare, Target, TrendingUp, Info } from "lucide-react"
import { VerificationDialog } from "@/components/properties/verification-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatInterface from "@/components/chat/chat-interface"

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [isVerificationOpen, setVerificationOpen] = useState(false)
  const property = properties.find(p => p.id === params.id)

  if (!property) {
    notFound()
  }

  const fundingPercentage = (property.currentAmount / property.targetAmount) * 100
  const image = PlaceHolderImages.find(p => p.id === property.images[0])
  const galleryImages = property.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean)

  const handleInvestClick = () => {
    // In a real app, you'd check if the user is already verified.
    // For this prototype, we'll always show the verification dialog.
    setVerificationOpen(true)
  }

  return (
    <>
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold tracking-tight">{property.name}</h1>
        <p className="text-muted-foreground">{property.location}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                {image && <Image src={image.imageUrl} alt={property.name} fill className="object-cover" data-ai-hint={image.imageHint} />}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {galleryImages.map((img, index) => img && (
                    <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image src={img.imageUrl} alt={`${property.name} gallery image ${index + 1}`} fill className="object-cover" data-ai-hint={img.imageHint} />
                    </div>
                ))}
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description"><Info className="mr-2" />Description</TabsTrigger>
                <TabsTrigger value="discussion"><MessageSquare className="mr-2" />Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Property Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{property.description}</p>
                    </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="discussion" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Community Discussion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChatInterface propertyId={property.id} />
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Investment Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Est. ROI</span>
                        <span className="font-bold text-green-400 text-lg">{property.roi}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><DollarSign className="h-4 w-4" /> Target Amount</span>
                        <span className="font-bold">R{property.targetAmount.toLocaleString()}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Building className="h-4 w-4" /> Developer</span>
                        <span className="font-bold">{property.developer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Target className="h-4 w-4" /> Status</span>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">{property.status}</Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Invest Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="mb-2 flex justify-between text-sm">
                            <span>Funding Progress</span>
                            <span className="font-medium">R{property.currentAmount.toLocaleString()} / R{property.targetAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={fundingPercentage} className="h-3" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="investment-amount">Investment Amount</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                            <Input id="investment-amount" type="number" placeholder="90000" className="pl-8" />
                        </div>
                    </div>
                    <Button className="w-full font-bold" size="lg" onClick={handleInvestClick}>Invest</Button>
                    <p className="text-xs text-muted-foreground text-center">Minimum investment: R20,000</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
    <VerificationDialog open={isVerificationOpen} onOpenChange={setVerificationOpen} />
    </>
  )
}
