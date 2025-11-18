'use client'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useFirebase } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import Link from "next/link"
import { useCollection, useMemoFirebase } from "@/firebase"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import ChatInterface from "@/components/chat/chat-interface"

export default function OwnerDashboardPage() {
    const { user, firestore } = useFirebase();
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

    const propertiesQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'properties'), where('ownerId', '==', user.uid));
    }, [user, firestore]);

    const { data: properties, isLoading } = useCollection(propertiesQuery);

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
                             {/* Property list will be rendered here */}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="messages" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Property Messages</CardTitle>
                            <CardDescription>Select a property to view and send messages.</CardDescription>
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
                                        <ChatInterface propertyId={selectedPropertyId} />
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
            </Tabs>
        </div>
    )
}
