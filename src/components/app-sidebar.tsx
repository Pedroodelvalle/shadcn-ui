"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import {
  Home01Icon,
  UserAccountIcon,
  Target02Icon,
  Video01Icon,
} from "hugeicons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
        icon: Home01Icon,
      },
      {
        title: t("accounts"),
        url: "/accounts",
        icon: UserAccountIcon,
      },
      {
        title: t("campaigns"),
        url: "#",
        icon: Target02Icon,
      },
      {
        title: t("videos"),
        url: "#",
        icon: Video01Icon,
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
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <ModeToggle />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
