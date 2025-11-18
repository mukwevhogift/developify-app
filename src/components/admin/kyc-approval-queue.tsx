'use client'

import { useCollection, useFirebase, useMemoFirebase } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { handleKycRequest } from "@/firebase/server-actions/admin-actions"
import { Loader2 } from "lucide-react"

export default function KycApprovalQueue() {
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const kycRequestsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'kyc_requests'), where('status', '==', 'pending'));
    }, [firestore]);

    const { data: kycRequests, isLoading } = useCollection(kycRequestsQuery);

    const onAction = async (requestId: string, userId: string, action: 'approve' | 'reject') => {
        setLoadingStates(prev => ({ ...prev, [requestId]: true }));
        try {
            await handleKycRequest(requestId, userId, action);
            toast({
                title: 'Success',
                description: `KYC request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to process KYC request.',
            });
        } finally {
            setLoadingStates(prev => ({ ...prev, [requestId]: false }));
        }
    }

    if (isLoading) {
        return <p>Loading KYC requests...</p>
    }

    if (!kycRequests || kycRequests.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-semibold">No Pending KYC Requests</h3>
                <p className="text-muted-foreground mt-2">The queue is all clear!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kycRequests.map(request => (
                <Card key={request.id}>
                    <CardHeader>
                        <CardTitle>{request.fullName}</CardTitle>
                        <CardDescription>{request.phone} - {request.companyName || 'No company'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2">Documents</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {request.documentUrls.map((url: string, index: number) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Document {index + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onAction(request.id, request.userId, 'reject')}
                            disabled={loadingStates[request.id]}
                        >
                            Reject
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={() => onAction(request.id, request.userId, 'approve')}
                            disabled={loadingStates[request.id]}
                        >
                            {loadingStates[request.id] ? <Loader2 className="animate-spin" /> : 'Approve'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
