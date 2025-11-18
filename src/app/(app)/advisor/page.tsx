import AdvisorClient from "@/components/advisor/advisor-client"

export default function AdvisorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">AI Investment Advisor</h1>
        <p className="text-muted-foreground">Get personalized property investment suggestions powered by AI.</p>
      </div>
      <AdvisorClient />
    </div>
  )
}
