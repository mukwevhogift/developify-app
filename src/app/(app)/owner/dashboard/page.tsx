'use client'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useFirebase } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import Link from "next/link"
import { useCollection, useMemoFirebase } from "@/firebase"
import { PlusCircle } from "lucide-react"

export default function OwnerDashboardPage() {
    const { user, firestore } = useFirebase();

    const propertiesQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'properties'), where('ownerId', '==', user.uid));
    }, [user, firestore]);

    const { data: properties, isLoading } = useCollection(propertiesQuery);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Owner Dashboard</h1>
                <p className="text-muted-foreground">Manage your property listings and view their performance.</p>
            </div>
            
            <div className="flex justify-end">
                <Button asChild>
                    <Link href="/owner/properties/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Property
                    </Link>
                </Button>
            </div>

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
        </div>
    )
}