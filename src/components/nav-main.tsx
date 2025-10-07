"use client"

import { type ComponentType } from "react"
import { usePathname } from "next/navigation"
import { Link } from "@/i18n/routing"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: ComponentType<any>
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              (item.title === "Dashboard" && pathname?.includes("/dashboard")) ||
              (item.title === "Accounts" && pathname?.includes("/accounts")) ||
              (item.title === "Contas" && pathname?.includes("/accounts"))

            return (
              <SidebarMenuItem key={item.title}>
                {item.url !== "#" ? (
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`h-10 ${isActive ? "bg-muted/50" : ""}`}
                    >
                      {item.icon && <item.icon className="size-5" />}
                      <span className="text-base">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`h-10 ${isActive ? "bg-muted/50" : ""}`}
                  >
                    {item.icon && <item.icon className="size-5" />}
                    <span className="text-base">{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
