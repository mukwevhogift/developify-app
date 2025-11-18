'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Loader2 } from "lucide-react"
import { useMemo } from "react"

const COLORS = ['#63B5FF', '#88D1FF', '#AEE7FF'];

// Mock data since we are not connected to a backend
const mockUsers = [
    { role: 'investor' }, { role: 'investor' }, { role: 'investor' },
    { role: 'property_owner' }, { role: 'property_owner' },
    { role: 'admin' },
];

const mockProperties = [
    { status: 'approved', raisedAmount: 50000 },
    { status: 'pending', raisedAmount: 10000 },
    { status: 'approved', raisedAmount: 75000 },
    { status: 'draft', raisedAmount: 0 },
    { status: 'rejected', raisedAmount: 0 },
];

export default function AdminOverview() {
    const usersLoading = false;
    const propertiesLoading = false;

    const userRoleData = useMemo(() => {
        const roles = mockUsers.reduce((acc, user) => {
            const role = user.role || 'investor';
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(roles).map(([name, value]) => ({ name, value }));
    }, []);
    
    const propertyStatusData = useMemo(() => {
        const statuses = mockProperties.reduce((acc, prop) => {
            const status = prop.status || 'draft';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(statuses).map(([name, value]) => ({ name, value }));
    }, []);

    const totalFunding = useMemo(() => {
        return mockProperties.reduce((acc, prop) => acc + (prop.raisedAmount || 0), 0);
    }, []);
    
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
