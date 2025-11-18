'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KycApprovalQueue from "@/components/admin/kyc-approval-queue"
import PropertyApprovalQueue from "@/components/admin/property-approval-queue"
import AdminOverview from "@/components/admin/admin-overview"

export default function AdminApprovalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Review submissions, monitor platform activity, and manage users.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kyc">KYC Requests</TabsTrigger>
          <TabsTrigger value="properties">Property Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <AdminOverview />
        </TabsContent>
        <TabsContent value="kyc" className="mt-6">
          <KycApprovalQueue />
        </TabsContent>
        <TabsContent value="properties" className="mt-6">
          <PropertyApprovalQueue />
        </TabsContent>
      </Tabs>
    </div>
  )
}
