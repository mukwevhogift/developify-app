'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Loader2 } from "lucide-react"

const COLORS = ['#63B5FF', '#88D1FF', '#AEE7FF'];

export default function AdminOverview() {
    const { firestore } = useFirebase();

    const usersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'users') : null, [firestore]);
    const { data: users, isLoading: usersLoading } = useCollection(usersQuery);
    
    const propertiesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'properties') : null, [firestore]);
    const { data: properties, isLoading: propertiesLoading } = useCollection(propertiesQuery);

    const userRoleData = useMemoFirebase(() => {
        if (!users) return [];
        const roles = users.reduce((acc, user) => {
            const role = user.role || 'investor';
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(roles).map(([name, value]) => ({ name, value }));
    }, [users]);
    
    const propertyStatusData = useMemoFirebase(() => {
        if (!properties) return [];
        const statuses = properties.reduce((acc, prop) => {
            const status = prop.status || 'draft';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(statuses).map(([name, value]) => ({ name, value }));
    }, [properties]);

    const totalFunding = useMemoFirebase(() => {
        if (!properties) return 0;
        return properties.reduce((acc, prop) => acc + (prop.raisedAmount || 0), 0);
    }, [properties]);
    
    const isLoading = usersLoading || propertiesLoading;

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={userRoleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {userRoleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Property Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={propertyStatusData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#63B5FF" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card className="flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle>Total Funds Raised</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">R{totalFunding.toLocaleString()}</p>
                </CardContent>
            </Card>
        </div>
    )
}
