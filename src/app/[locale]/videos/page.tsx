"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { IconTrendingUp, IconTrendingDown, IconFilter } from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for videos
const mockVideos = [
  { id: 1, title: "Unboxing 01", thumbnail: "/window.svg", views: "12430", likes: "1100", comments: "210", shares: "86", engagement: "9.2%", duration: "0:30", postedDate: "2024-01-15", status: "posted", platform: "Instagram" },
  { id: 2, title: "Product Demo", thumbnail: "/window.svg", views: "8560", likes: "650", comments: "122", shares: "41", engagement: "7.4%", duration: "0:20", postedDate: "2024-01-10", status: "posted", platform: "TikTok" },
  { id: 3, title: "Try-on Haul", thumbnail: "/window.svg", views: "15200", likes: "1420", comments: "288", shares: "120", engagement: "11.1%", duration: "0:25", postedDate: "2024-01-12", status: "posted", platform: "Instagram" },
  { id: 4, title: "Behind the Scenes", thumbnail: "/window.svg", views: "3420", likes: "180", comments: "45", shares: "15", engagement: "5.9%", duration: "0:45", postedDate: "2024-01-08", status: "posted", platform: "YouTube" },
  { id: 5, title: "Customer Review", thumbnail: "/window.svg", views: "9870", likes: "890", comments: "156", shares: "67", engagement: "8.7%", duration: "0:18", postedDate: "2024-01-14", status: "posted", platform: "TikTok" },
  { id: 6, title: "Tutorial Video", thumbnail: "/window.svg", views: "20300", likes: "1850", comments: "320", shares: "145", engagement: "10.3%", duration: "1:15", postedDate: "2024-01-16", status: "posted", platform: "YouTube" },
  { id: 7, title: "Q&A Session", thumbnail: "/window.svg", views: "1560", likes: "95", comments: "28", shares: "8", engagement: "6.7%", duration: "0:40", postedDate: "2024-01-05", status: "posted", platform: "Instagram" },
  { id: 8, title: "Challenge Video", thumbnail: "/window.svg", views: "28100", likes: "2100", comments: "450", shares: "200", engagement: "8.9%", duration: "0:35", postedDate: "2024-01-18", status: "posted", platform: "TikTok" },
]

type Video = typeof mockVideos[0]

type SortOption = "views" | "likes" | "comments" | "shares" | "engagement" | "date"
type SortOrder = "asc" | "desc"

export default function VideosPage() {
  const t = useTranslations("videos")
  const tGlobal = useTranslations()
  const [sortBy, setSortBy] = useState<SortOption>("views")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [platformFilter, setPlatformFilter] = useState<string>("all")

  const filteredAndSortedVideos = useMemo(() => {
    let filtered = mockVideos

    // Filter by platform
    if (platformFilter !== "all") {
      filtered = filtered.filter(video => video.platform.toLowerCase() === platformFilter.toLowerCase())
    }

    // Sort videos
    return filtered.sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      switch (sortBy) {
        case "views":
          aValue = parseInt(a.views.replace(/[^\d]/g, ""))
          bValue = parseInt(b.views.replace(/[^\d]/g, ""))
          break
        case "likes":
          aValue = parseInt(a.likes.replace(/[^\d]/g, ""))
          bValue = parseInt(b.likes.replace(/[^\d]/g, ""))
          break
        case "comments":
          aValue = parseInt(a.comments.replace(/[^\d]/g, ""))
          bValue = parseInt(b.comments.replace(/[^\d]/g, ""))
          break
        case "shares":
          aValue = parseInt(a.shares.replace(/[^\d]/g, ""))
          bValue = parseInt(b.shares.replace(/[^\d]/g, ""))
          break
        case "engagement":
          aValue = parseFloat(a.engagement.replace("%", ""))
          bValue = parseFloat(b.engagement.replace("%", ""))
          break
        case "date":
          aValue = new Date(a.postedDate).getTime()
          bValue = new Date(b.postedDate).getTime()
          break
        default:
          return 0
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [mockVideos, sortBy, sortOrder, platformFilter])

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(option)
      setSortOrder("desc")
    }
  }

  const rightActions = useMemo(() => (
    <div className="flex items-center gap-2">
      <Select value={platformFilter} onValueChange={setPlatformFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={t("filterByPlatform")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("allPlatforms")}</SelectItem>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="youtube">YouTube</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ), [platformFilter, t])

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
        <SiteHeader title={tGlobal("sidebar.videos")} rightContent={rightActions} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold">{t("title")}</h1>
                      <p className="text-muted-foreground">
                        {t("description")}
                      </p>
                    </div>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sortBy === "views" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("views")}
                      className="flex items-center gap-2"
                    >
                      {t("sortBy.views")}
                      {sortBy === "views" && (
                        sortOrder === "desc" ? <IconTrendingDown className="h-4 w-4" /> : <IconTrendingUp className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant={sortBy === "engagement" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("engagement")}
                      className="flex items-center gap-2"
                    >
                      {t("sortBy.engagement")}
                      {sortBy === "engagement" && (
                        sortOrder === "desc" ? <IconTrendingDown className="h-4 w-4" /> : <IconTrendingUp className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant={sortBy === "likes" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("likes")}
                      className="flex items-center gap-2"
                    >
                      {t("sortBy.likes")}
                      {sortBy === "likes" && (
                        sortOrder === "desc" ? <IconTrendingDown className="h-4 w-4" /> : <IconTrendingUp className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant={sortBy === "date" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort("date")}
                      className="flex items-center gap-2"
                    >
                      {t("sortBy.date")}
                      {sortBy === "date" && (
                        sortOrder === "desc" ? <IconTrendingDown className="h-4 w-4" /> : <IconTrendingUp className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Videos Table */}
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                          <TableHead>{t("video")}</TableHead>
                          <TableHead className="text-right">{t("views")}</TableHead>
                          <TableHead className="text-right">{t("likes")}</TableHead>
                          <TableHead className="text-right">{t("comments")}</TableHead>
                          <TableHead className="text-right">{t("shares")}</TableHead>
                          <TableHead className="text-right">{t("engagement")}</TableHead>
                          <TableHead className="text-right">{t("date")}</TableHead>
                          <TableHead className="text-right">{t("platform")}</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedVideos.length ? (
                          filteredAndSortedVideos.map((video) => (
                            <TableRow key={video.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="h-12 w-20 rounded object-cover"
                                  />
                                  <div>
                                    <div className="font-medium">{video.title}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {video.duration}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-medium">{video.views}</TableCell>
                              <TableCell className="text-right">{video.likes}</TableCell>
                              <TableCell className="text-right">{video.comments}</TableCell>
                              <TableCell className="text-right">{video.shares}</TableCell>
                              <TableCell className="text-right font-medium">{video.engagement}</TableCell>
                              <TableCell className="text-right">
                                {new Date(video.postedDate).toLocaleDateString("pt-BR")}
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline">{video.platform}</Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">{t("openMenu")}</span>
                                      <IconFilter className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                                    <DropdownMenuItem>{t("viewAnalytics")}</DropdownMenuItem>
                                    <DropdownMenuItem>{t("edit")}</DropdownMenuItem>
                                    <DropdownMenuItem>{t("share")}</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      {t("delete")}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={9} className="h-24 text-center">
                              {t("noVideosFound")}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
