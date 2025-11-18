import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { transactions } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

const walletBalance = 175000.00;

export default function WalletPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${walletBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="add">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Add Funds</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Add Funds</CardTitle>
                  <CardDescription>Enter amount to deposit into your wallet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-amount">Amount</Label>
                    <Input id="add-amount" type="number" placeholder="5000" />
                  </div>
                  <Button className="w-full font-bold">Add Funds</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="withdraw">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Transfer funds to your linked bank account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount</Label>
                    <Input id="withdraw-amount" type="number" placeholder="1000" />
                  </div>
                  <Button className="w-full font-bold">Withdraw</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(tx => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.amount > 0 ? <ArrowDownLeft className="h-4 w-4 text-green-400"/> : <ArrowUpRight className="h-4 w-4 text-red-400"/>}
                          <span className="font-medium">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{tx.description}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                      <TableCell>
                         <Badge variant={tx.status === 'Completed' ? 'secondary' : 'default'} className={
                            tx.status === 'Completed' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                         }>
                            {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
