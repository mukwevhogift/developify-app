"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  getPersonalizedInvestmentSuggestions,
  type PersonalizedInvestmentSuggestionsOutput,
} from "@/ai/flows/personalized-investment-suggestions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  financialGoals: z.string().min(10, {
    message: "Please describe your financial goals in at least 10 characters.",
  }),
  riskTolerance: z.enum(["conservative", "moderate", "aggressive"]),
  investmentHistory: z.string().min(10, {
    message: "Please describe your investment history in at least 10 characters.",
  }),
})

export default function AdvisorClient() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PersonalizedInvestmentSuggestionsOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      financialGoals: "",
      riskTolerance: "moderate",
      investmentHistory: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setResult(null)
    try {
      const suggestions = await getPersonalizedInvestmentSuggestions(values)
      setResult(suggestions)
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get investment suggestions. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Tell Us About Yourself</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="financialGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Save for retirement, generate passive income, buy a house in 5 years..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What are you trying to achieve with your investments?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskTolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Invested in stocks, own a rental property, new to investing..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe your past investment experience.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full font-bold">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Get Suggestions
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border p-4">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI is analyzing your profile...</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-transparent shadow-none border-none">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-primary"/> AI-Powered Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Top Suggestions</h3>
                <ul className="list-disc space-y-2 pl-5 text-foreground">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reasoning</h3>
                <p className="text-sm text-muted-foreground">{result.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {!loading && !result && (
            <div className="text-center text-muted-foreground">
                <p>Your personalized investment suggestions will appear here.</p>
            </div>
        )}
      </div>
    </div>
  )
}
