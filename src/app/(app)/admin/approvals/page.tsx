'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KycApprovalQueue from "@/components/admin/kyc-approval-queue"
import PropertyApprovalQueue from "@/components/admin/property-approval-queue"

export default function AdminApprovalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Approvals</h1>
        <p className="text-muted-foreground">Review and manage pending user and property submissions.</p>
      </div>

      <Tabs defaultValue="kyc">
        <TabsList>
          <TabsTrigger value="kyc">KYC Requests</TabsTrigger>
          <TabsTrigger value="properties">Property Submissions</TabsTrigger>
        </TabsList>
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
