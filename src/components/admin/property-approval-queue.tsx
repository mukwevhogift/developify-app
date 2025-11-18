'use client'

import { useCollection, useFirebase, useMemoFirebase } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { handlePropertyRequest } from "@/firebase/server-actions/admin-actions"
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

export default function PropertyApprovalQueue() {
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [rejectionReason, setRejectionReason] = useState('');

    const propertiesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'properties'), where('status', '==', 'pending'));
    }, [firestore]);

    const { data: properties, isLoading } = useCollection(propertiesQuery);

    const onAction = async (propertyId: string, action: 'approve' | 'reject', reason?: string) => {
        setLoadingStates(prev => ({ ...prev, [propertyId]: true }));
        try {
            await handlePropertyRequest(propertyId, action, reason);
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

    if (isLoading) {
        return <p>Loading properties...</p>
    }

    if (!properties || properties.length === 0) {
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
                        <CardTitle>{property.title}</CardTitle>
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
