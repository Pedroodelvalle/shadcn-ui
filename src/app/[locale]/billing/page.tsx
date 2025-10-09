"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import {
  IconCreditCard,
  IconDownload,
  IconEye,
  IconCheck,
  IconX,
  IconClock,
  IconCrown,
  IconStar,
  IconTrendingUp
} from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

// Mock billing data
const mockCurrentPlan = {
  name: "Professional Plan",
  description: "Perfect for growing brands and content creators",
  price: "$79/month",
  billingCycle: "monthly",
  nextBilling: "December 15, 2024",
  features: [
    "Unlimited videos",
    "Advanced analytics",
    "AI assistant",
    "Priority support"
  ]
}

const mockPaymentHistory = [
  {
    id: "INV-001",
    date: "2024-11-15",
    amount: "$79.00",
    status: "paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "INV-002",
    date: "2024-10-15",
    amount: "$79.00",
    status: "paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "INV-003",
    date: "2024-09-15",
    amount: "$79.00",
    status: "paid",
    description: "Professional Plan - Monthly"
  }
]

const mockPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$29/month",
    description: "Perfect for small brands and individual creators",
    features: ["Up to 100 videos", "Basic analytics", "Email support"],
    current: false,
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: "$79/month",
    description: "Perfect for growing brands and content creators",
    features: ["Unlimited videos", "Advanced analytics", "AI assistant", "Priority support"],
    current: true,
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199/month",
    description: "For large brands with advanced needs",
    features: ["Everything in Professional", "Custom integrations", "Dedicated account manager", "24/7 phone support"],
    current: false,
    popular: false
  }
]

export default function BillingPage() {
  const t = useTranslations("billing")
  const tGlobal = useTranslations()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Show skeleton immediately, then content after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1700) // Show content after 1.7 seconds

    return () => clearTimeout(timer)
  }, [])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    toast.success(`Selected ${planId} plan`)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}`)
  }

  const handleViewInvoice = (invoiceId: string) => {
    toast.success(`Viewing invoice ${invoiceId}`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <IconCheck className="h-4 w-4 text-green-600" />
      case "pending":
        return <IconClock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <IconX className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">{t("paid")}</Badge>
      case "pending":
        return <Badge variant="secondary">{t("pending")}</Badge>
      case "failed":
        return <Badge variant="destructive">{t("failed")}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (isLoading) {
    return <BillingPageSkeleton />
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={tGlobal("sidebar.billing")} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  {/* Page Header */}
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{t("title")}</h1>
                    <p className="text-muted-foreground">{t("description")}</p>
                  </div>

                  {/* Current Plan Section */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <IconCreditCard className="h-5 w-5" />
                            {t("currentPlan")}
                          </CardTitle>
                          <CardDescription>
                            {t("planDescription")}
                          </CardDescription>
                        </div>
                        <Badge variant="default" className="bg-primary">
                          {t("currentPlanBadge")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold">{t("planName")}</h3>
                          <p className="text-muted-foreground">{t("professionalPrice")}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            {t("manageBilling")}
                          </Button>
                          <Button>
                            {t("upgradePlan")}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t("billingCycle")}</p>
                          <p className="text-sm text-muted-foreground">{t("monthlyBilling")}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t("nextBilling")}</p>
                          <p className="text-sm text-muted-foreground">{mockCurrentPlan.nextBilling}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">{t("planIncludes")}</h4>
                        <div className="grid gap-2 md:grid-cols-2">
                          {mockCurrentPlan.features.map((feature, index) => {
                            // Map feature names to translation keys
                            const featureKeyMap: Record<string, string> = {
                              "Unlimited videos": "videos",
                              "Advanced analytics": "analytics",
                              "AI assistant": "aiAssistant",
                              "Priority support": "support"
                            }
                            const translationKey = featureKeyMap[feature] || feature.toLowerCase().replace(/\s+/g, '')
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <IconCheck className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{t(`features.${translationKey}`)}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment History Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconTrendingUp className="h-5 w-5" />
                        {t("paymentHistory")}
                      </CardTitle>
                      <CardDescription>
                        View your payment history and download invoices
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {mockPaymentHistory.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t("invoice")}</TableHead>
                              <TableHead>{t("date")}</TableHead>
                              <TableHead>{t("amount")}</TableHead>
                              <TableHead>{t("status")}</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockPaymentHistory.map((payment) => (
                              <TableRow key={payment.id}>
                                <TableCell className="font-medium">{payment.id}</TableCell>
                                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                <TableCell>{payment.amount}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(payment.status)}
                                    {getStatusBadge(payment.status)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleViewInvoice(payment.id)}
                                    >
                                      <IconEye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDownloadInvoice(payment.id)}
                                    >
                                      <IconDownload className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8">
                          <IconCreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">{t("noChargesYet")}</h3>
                          <p className="text-muted-foreground">{t("noChargesDescription")}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Plan Upgrade Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconCrown className="h-5 w-5" />
                        {t("planUpgrade")}
                      </CardTitle>
                      <CardDescription>
                        {t("upgradeDescription")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        {mockPlans.map((plan) => (
                          <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
                            {plan.popular && (
                              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-primary text-primary-foreground">
                                  <IconStar className="h-3 w-3 mr-1" />
                                  {t("popularBadge")}
                                </Badge>
                              </div>
                            )}
                            {plan.current && (
                              <div className="absolute -top-3 right-4">
                                <Badge variant="secondary">
                                  {t("currentPlanBadge")}
                                </Badge>
                              </div>
                            )}
                            <CardHeader className="text-center pb-4">
                              <CardTitle className="text-xl">{t(plan.id)}</CardTitle>
                              <div className="text-3xl font-bold text-primary">
                                {t(`${plan.id}Price`)}
                              </div>
                              <CardDescription className="text-sm">
                                {plan.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm">
                                    <IconCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button
                                className="w-full"
                                variant={plan.current ? "outline" : "default"}
                                disabled={plan.current}
                                onClick={() => handlePlanSelect(plan.id)}
                              >
                                {plan.current ? t("currentPlanBadge") : t("selectPlan")}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function BillingPageSkeleton() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Cobrança" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  {/* Page Header Skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-4 w-96" />
                  </div>

                  {/* Current Plan Card Skeleton */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-8 w-48" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-32" />
                          <Skeleton className="h-9 w-32" />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Skeleton className="h-5 w-32" />
                        <div className="grid gap-2 md:grid-cols-2">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Skeleton className="h-4 w-4" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment History Card Skeleton */}
                  <Card>
                    <CardHeader>
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between py-2">
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                            <div className="flex items-center gap-4">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-6 w-12" />
                              <div className="flex gap-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Plan Upgrade Card Skeleton */}
                  <Card>
                    <CardHeader>
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-4 w-80" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Card key={i}>
                            <CardHeader className="text-center pb-4">
                              <Skeleton className="h-6 w-24 mx-auto mb-2" />
                              <Skeleton className="h-8 w-20 mx-auto mb-2" />
                              <Skeleton className="h-4 w-48 mx-auto" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                {Array.from({ length: 4 }).map((_, j) => (
                                  <div key={j} className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-32" />
                                  </div>
                                ))}
                              </div>
                              <Skeleton className="h-9 w-full" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
