"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { IconBrandInstagram } from "@tabler/icons-react"
import { ArrowUpRightIcon, CheckCircleIcon, PlusIcon } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Mock data - in a real app this would come from your backend/state
const instagramAccount = {
  id: "instagram",
  name: "Instagram",
  username: "@johndoe",
  connected: true,
  icon: IconBrandInstagram,
}


export default function AccountsPage() {
  const t = useTranslations("accounts")
  const tGlobal = useTranslations()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // For demo purposes, we'll show connected state. In a real app, this would be based on actual account connections
  const hasConnectedAccounts = instagramAccount.connected

  const ConnectNewAccountButton = () => (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="sm" className="h-8 px-3">
          <PlusIcon className="h-4 w-4 mr-1.5" />
          <span className="text-sm">{t("connectNewAccount")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("connectNewAccountTitle")}</SheetTitle>
          <SheetDescription>
            {t("connectNewAccountDescription")}
          </SheetDescription>
          <p className="text-xs text-muted-foreground mt-2">
            {t("instagramNote")}
          </p>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-6">
          <div className="grid gap-3">
            <Label htmlFor="instagram-username">{t("instagramUsername")}</Label>
            <Input id="instagram-username" placeholder="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">{t("saveChanges")}</Button>
          <SheetClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )

  if (!instagramAccount.connected) {
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
        <SiteHeader title={tGlobal("sidebar.accounts")} />
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <IconBrandInstagram />
                      </EmptyMedia>
                      <EmptyTitle>{t("noAccountsYet")}</EmptyTitle>
                      <EmptyDescription>
                        {t("noAccountsDescription")}
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <div className="flex gap-2">
                        <Button>{t("connectAccount")}</Button>
                      </div>
                    </EmptyContent>
                    <Button
                      variant="link"
                      asChild
                      className="text-muted-foreground"
                      size="sm"
                    >
                      <a href="#">
                        {t("learnMore")} <ArrowUpRightIcon />
                      </a>
                    </Button>
                  </Empty>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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
        <SiteHeader
          title={tGlobal("sidebar.accounts")}
          rightContent={hasConnectedAccounts ? <ConnectNewAccountButton /> : undefined}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-semibold">{t("connectedAccounts")}</h1>
                    <p className="text-muted-foreground">
                      {t("manageAccountsDescription")}
                    </p>
                  </div>

                  <div className="max-w-md">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {instagramAccount.name}
                        </CardTitle>
                        <Badge
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <CheckCircleIcon className="h-3 w-3" />
                          {t("accountConnected")}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <IconBrandInstagram className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{instagramAccount.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {t("instagramAccount")}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                          <Button size="sm" variant="outline">
                            {t("disconnect")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
