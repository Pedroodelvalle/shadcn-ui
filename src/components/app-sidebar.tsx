"use client"

import * as React from "react"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home01Icon,
    },
    {
      title: "Contas",
      url: "#",
      icon: UserAccountIcon,
    },
    {
      title: "Campanhas",
      url: "#",
      icon: Target02Icon,
    },
    {
      title: "Vídeos",
      url: "#",
      icon: Video01Icon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
