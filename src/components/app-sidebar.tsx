"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import {
  DashboardSquare01Icon,
  UserMultipleIcon,
  StrategyIcon,
  PlayIcon,
  AiBrain01Icon,
  PlusSignIcon,
} from "hugeicons-react"

import { CampaignBudget } from "@/components/stats-08"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sidebar")

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: t("dashboard"),
        url: "/dashboard",
        icon: DashboardSquare01Icon,
      },
      {
        title: t("campaigns"),
        url: "/campaigns",
        icon: StrategyIcon,
      },
      {
        title: t("videos"),
        url: "/videos",
        icon: PlayIcon,
      },
      {
        title: t("accounts"),
        url: "/accounts",
        icon: UserMultipleIcon,
      },
      {
        title: t("aiAssistant"),
        url: "/assistente-ia",
        icon: AiBrain01Icon,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:!bg-transparent hover:!text-sidebar-foreground"
            >
              <a href="#" className="flex items-center">
                <Image
                  src="/LOGO.svg"
                  alt="Logo"
                  width={120}
                  height={37}
                  className="h-8 w-auto ml-[-8px] brightness-0 dark:invert"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="bg-border/50" />
      </div>
      <SidebarContent className="gap-1">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/campaigns" prefetch>
                  <SidebarMenuButton
                    tooltip={t("newCampaign")}
                    className="h-10 bg-muted/50 text-foreground hover:bg-muted border border-border cursor-pointer"
                  >
                    <PlusSignIcon className="size-5" />
                    <span className="text-base font-medium">{t("newCampaign")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-0 py-2">
          <CampaignBudget />
        </div>
        {/* <div className="px-3 py-2">
          <ModeToggle />
        </div> */}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
