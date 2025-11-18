'use client'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useFirebase } from "@/firebase"
import { collection, query, where, doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useCollection, useMemoFirebase } from "@/firebase"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Link as LinkIcon, Send, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import ChatInterface from "@/components/chat/chat-interface"
import { useToast } from "@/hooks/use-toast"
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
import { Textarea } from "@/components/ui/textarea"
import OwnerAnalytics from "@/components/owner/owner-analytics"

export default function OwnerDashboardPage() {
    const { user, firestore } = useFirebase();
    const { toast } = useToast();
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [broadcastMessage, setBroadcastMessage] = useState("");

    const propertiesQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'properties'), where('ownerId', '==', user.uid));
    }, [user, firestore]);

    const { data: properties, isLoading } = useCollection(propertiesQuery);

    const handleShare = (propertyId: string) => {
        const url = `${window.location.origin}/properties/${propertyId}`;
        navigator.clipboard.writeText(url);
        toast({
            title: "Link Copied!",
            description: "Property link copied to your clipboard.",
        });
    }

    const handleStatusUpdate = async (propertyId: string, currentStatus: string) => {
        if (!firestore) return;
        if (currentStatus === 'draft') {
            const propertyRef = doc(firestore, 'properties', propertyId);
            await updateDoc(propertyRef, { status: 'pending' });
            toast({
                title: "Property Submitted",
                description: "Your property has been submitted for review."
            });
        }
    }
    
    // Placeholder for sending broadcast
    const sendBroadcast = () => {
        if(!selectedPropertyId) return;
        console.log(`Broadcasting to investors of ${selectedPropertyId}: "${broadcastMessage}"`);
        toast({
            title: "Broadcast Sent",
            description: "Your message has been sent to all investors in this property."
        })
        setBroadcastMessage("");
    }

    const isUnderfunded = (property: any) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const fundingDeadline = property.createdAt?.toDate() > thirtyDaysAgo;
        const fundingProgress = (property.raisedAmount / property.targetAmount) * 100;
        return fundingDeadline && fundingProgress < 20 && property.status === 'approved';
    }


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Owner Dashboard</h1>
                    <p className="text-muted-foreground">Manage your property listings and communications.</p>
                </div>
                <Button asChild>
                    <Link href="/owner/properties/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Property
                    </Link>
                </Button>
            </div>

            <Tabs defaultValue="properties">
                <TabsList>
                    <TabsTrigger value="properties">My Properties</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="properties" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Properties</CardTitle>
                            <CardDescription>A list of all your properties on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading && <p>Loading properties...</p>}
                            {!isLoading && !properties?.length && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-semibold">No properties yet</h3>
                                    <p className="text-muted-foreground mt-2">Get started by creating your first property listing.</p>
                                </div>
                            )}
                             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {properties && properties.map(p => (
                                    <Card key={p.id} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{p.title}</CardTitle>
                                            <CardDescription>{p.location}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 space-y-2">
                                             <Badge variant={
                                                p.status === 'approved' ? 'default' : 
                                                p.status === 'draft' ? 'secondary' : 
                                                p.status === 'rejected' ? 'destructive' : 'outline'
                                            }>{p.status}</Badge>
                                            <p className="text-sm">R{p.raisedAmount.toLocaleString()} / R{p.targetAmount.toLocaleString()}</p>
                                            {isUnderfunded(p) && (
                                                <div className="flex items-center gap-2 text-yellow-500">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    <span className="text-xs">Low funding alert</span>
                                                </div>
                                            )}
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            {p.status === 'draft' && (
                                                <Button size="sm" onClick={() => handleStatusUpdate(p.id, p.status)}>Submit for Review</Button>
                                            )}
                                            {p.status === 'approved' && (
                                                <Button size="sm" variant="ghost" onClick={() => handleShare(p.id)}><LinkIcon className="mr-2 h-4 w-4" /> Share</Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                             </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="messages" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Property Communications</CardTitle>
                            <CardDescription>Select a property to view messages or send a broadcast.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 space-y-2">
                                    <h4 className="font-semibold">Your Properties</h4>
                                    {isLoading && <p>Loading...</p>}
                                    {properties && properties.map(p => (
                                        <Button 
                                            key={p.id} 
                                            variant={selectedPropertyId === p.id ? 'secondary' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setSelectedPropertyId(p.id)}
                                        >
                                            {p.title}
                                        </Button>
                                    ))}
                                </div>
                                <div className="md:col-span-2">
                                    {selectedPropertyId ? (
                                        <Tabs defaultValue="chat" className="w-full">
                                            <TabsList>
                                                <TabsTrigger value="chat">Discussion</TabsTrigger>
                                                <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="chat" className="mt-4">
                                                <ChatInterface propertyId={selectedPropertyId} />
                                            </TabsContent>
                                            <TabsContent value="broadcast" className="mt-4 space-y-4">
                                                <h4 className="font-semibold">Send update to investors</h4>
                                                <Textarea 
                                                    value={broadcastMessage}
                                                    onChange={e => setBroadcastMessage(e.target.value)}
                                                    placeholder="e.g., Construction is ahead of schedule! We expect to complete the foundation by next week."
                                                />
                                                <Button onClick={sendBroadcast} disabled={!broadcastMessage.trim()}>
                                                    <Send className="mr-2 h-4 w-4"/> Send Broadcast
                                                </Button>
                                            </TabsContent>
                                        </Tabs>
                                    ) : (
                                        <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                                            <p className="text-muted-foreground">Select a property to see messages</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="analytics" className="mt-6">
                    <OwnerAnalytics properties={properties || []} isLoading={isLoading} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
