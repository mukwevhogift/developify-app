'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useMemo } from "react"
import { Loader2 } from "lucide-react"

const COLORS = ['#63B5FF', '#88D1FF', '#AEE7FF', '#D4F3FF'];

// Mock data, as we don't have an investment collection yet.
const mockInvestors = {
    '1': 15,
    '2': 25,
    '3': 5,
    '4': 10,
}

export default function OwnerAnalytics({ properties, isLoading }: { properties: any[], isLoading: boolean }) {

    const fundingData = useMemo(() => {
        if (!properties) return [];
        return properties.map(p => ({
            name: p.name.substring(0, 15) + (p.name.length > 15 ? '...' : ''),
            raised: p.currentAmount,
            target: p.targetAmount,
        }));
    }, [properties]);

    const investorData = useMemo(() => {
        if(!properties) return [];
        // @ts-ignore
        return properties.map(p => ({ name: p.name, value: mockInvestors[p.id] || 0 }))
            .filter(p => p.value > 0);
    }, [properties]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-semibold">No Data to Display</h3>
                <p className="text-muted-foreground mt-2">Analytics will appear here once you have properties with activity.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Funding Progress per Property</CardTitle>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={fundingData}>
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `R${value.toLocaleString()}`} />
                            <Bar dataKey="raised" stackId="a" fill="#63B5FF" name="Raised" />
                            <Bar dataKey="target" stackId="b" fill="#33363F" name="Target" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Investors per Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={investorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {investorData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
