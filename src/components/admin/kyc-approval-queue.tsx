'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"

// Mock data for KYC requests
const mockKycRequests = [
    { id: 'kyc-1', fullName: 'Alice Johnson', phone: '0821112222', companyName: 'Alice Props', userId: 'user-1', documentUrls: ['#', '#'], status: 'pending' },
    { id: 'kyc-2', fullName: 'Bob Williams', phone: '0833334444', companyName: '', userId: 'user-2', documentUrls: ['#'], status: 'pending' },
];

export default function KycApprovalQueue() {
    const { toast } = useToast();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [kycRequests, setKycRequests] = useState(mockKycRequests);

    const onAction = async (requestId: string, action: 'approve' | 'reject') => {
        setLoadingStates(prev => ({ ...prev, [requestId]: true }));
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            // Remove the request from the list to simulate completion
            setKycRequests(prev => prev.filter(req => req.id !== requestId));
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

    if (kycRequests.length === 0) {
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
                            onClick={() => onAction(request.id, 'reject')}
                            disabled={loadingStates[request.id]}
                        >
                            Reject
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={() => onAction(request.id, 'approve')}
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
