import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { investments, properties, type Investment } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const PortfolioTable = ({ investmentsToShow }: { investmentsToShow: Investment[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Invested Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead><span className="sr-only">Link</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investmentsToShow.map(investment => {
            const property = properties.find(p => p.id === investment.propertyId)
            if (!property) return null;

            const image = PlaceHolderImages.find(p => p.id === property.images[0])
            return (
                <TableRow key={investment.id}>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            {image && <Image src={image.imageUrl} alt={property.name} width={64} height={48} className="hidden h-12 w-16 rounded-md object-cover sm:block" data-ai-hint={image.imageHint} />}
                            <div>
                                <div className="font-medium">{property.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">{property.location}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="font-medium">${investment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{investment.date}</TableCell>
                    <TableCell>
                        <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'} className={
                            investment.status === 'Active' ? 'bg-primary/20 text-primary' : 
                            investment.status === 'Completed' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                        }>
                            {investment.status}
                        </Badge>
                    </TableCell>
                     <TableCell>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/properties/${property.id}`}>
                          <ArrowUpRight className="h-4 w-4"/>
                        </Link>
                      </Button>
                    </TableCell>
                </TableRow>
            )
        })}
      </TableBody>
    </Table>
)


export default function PortfolioPage() {
  const activeInvestments = investments.filter(i => i.status === 'Active')
  const completedInvestments = investments.filter(i => i.status === 'Completed')
  const underfundedInvestments = investments.filter(i => i.status === 'Underfunded')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">My Portfolio</h1>
        <p className="text-muted-foreground">Track your investments and returns.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="active">
            <div className="p-6 border-b">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="underfunded">Underfunded</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="p-0">
                <PortfolioTable investmentsToShow={activeInvestments} />
            </TabsContent>
            <TabsContent value="completed" className="p-0">
                <PortfolioTable investmentsToShow={completedInvestments} />
            </TabsContent>
            <TabsContent value="underfunded" className="p-0">
                 <PortfolioTable investmentsToShow={underfundedInvestments} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
