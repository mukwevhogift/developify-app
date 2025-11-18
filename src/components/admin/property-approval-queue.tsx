'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "../ui/textarea"
import { properties as allProperties } from "@/lib/data"

const mockPendingProperties = allProperties.map(p => ({...p, status: 'pending'})).slice(0, 2);

export default function PropertyApprovalQueue() {
    const { toast } = useToast();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [rejectionReason, setRejectionReason] = useState('');
    const [properties, setProperties] = useState(mockPendingProperties);

    const onAction = async (propertyId: string, action: 'approve' | 'reject', reason?: string) => {
        setLoadingStates(prev => ({ ...prev, [propertyId]: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            setProperties(prev => prev.filter(p => p.id !== propertyId));
            toast({
                title: 'Success',
                description: `Property has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to process property request.',
            });
        } finally {
            setLoadingStates(prev => ({ ...prev, [propertyId]: false }));
            setRejectionReason('');
        }
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-semibold">No Pending Properties</h3>
                <p className="text-muted-foreground mt-2">The queue is all clear!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map(property => (
                <Card key={property.id}>
                    <CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                        <CardDescription>{property.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{property.description}</p>
                        <div className="mt-4 font-bold">Target: R{property.targetAmount.toLocaleString()}</div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" disabled={loadingStates[property.id]}>
                                    Reject
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reason for Rejection</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Please provide a reason for rejecting this property. This will be sent to the property owner.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Textarea 
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="e.g., Missing legal documents, images are low quality..."
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onAction(property.id, 'reject', rejectionReason)}>
                                        Confirm Rejection
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        
                        <Button 
                            size="sm" 
                            onClick={() => onAction(property.id, 'approve')}
                            disabled={loadingStates[property.id]}
                        >
                            {loadingStates[property.id] ? <Loader2 className="animate-spin" /> : 'Approve'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
