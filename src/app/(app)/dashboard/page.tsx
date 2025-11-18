'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpRight, DollarSign, PieChart, type LucideIcon } from "lucide-react"
import { properties } from "@/lib/data"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const walletBalance = 3200000.00;
const portfolioValue = 3200000.00;
const portfolioGrowth = 15.2;

const portfolioPerformanceData = [
  { month: 'Jan', value: 2800000 },
  { month: 'Feb', value: 2900000 },
  { month: 'Mar', value: 3000000 },
  { month: 'Apr', value: 3200000 },
  { month: 'May', value: 3300000 },
  { month: 'Jun', value: 3200000 },
]
const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const featuredProperties = properties.slice(0, 3);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Welcome Back, Investor!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your investment portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{walletBalance.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              Available for new investments
            </p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/wallet">Manage Wallet</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R{portfolioValue.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">+{portfolioGrowth}%</span> since last month
            </p>
            <Button size="sm" variant="outline" className="mt-4" asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioPerformanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel indicator="line" />}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-value)"
                    radius={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Featured Properties</CardTitle>
          <CardDescription>
            Hot opportunities to diversify your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">ROI</TableHead>
                <TableHead>Funding Progress</TableHead>
                <TableHead><span className="sr-only">Link</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuredProperties.map((prop) => {
                const fundingPercentage = (prop.currentAmount / prop.targetAmount) * 100
                const image = PlaceHolderImages.find(p => p.id === prop.images[0])
                return (
                  <TableRow key={prop.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={prop.name}
                            width={64}
                            height={48}
                            className="hidden h-12 w-16 rounded-md object-cover sm:block"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <div>
                          <div className="font-medium">{prop.name}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {prop.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={prop.status === 'Funding' ? 'default' : 'secondary'} className="bg-primary/20 text-primary hover:bg-primary/30">
                        {prop.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden font-medium text-green-400 md:table-cell">{prop.roi}%</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">R{prop.currentAmount.toLocaleString()}</span>
                            <Progress value={fundingPercentage} className="mt-1 h-2 w-24" />
                        </div>
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/properties/${prop.id}`}>
                          <ArrowUpRight className="h-4 w-4"/>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
