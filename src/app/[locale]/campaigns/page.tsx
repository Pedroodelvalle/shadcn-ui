"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { IconTargetArrow, IconSparkles } from "@tabler/icons-react"
import { PlusIcon } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { DataTable } from "@/components/data-table"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

// Temporary mocked campaigns and videos
const campaignOptions = [
  { id: "fall", name: "UGC Fall Launch" },
  { id: "holiday", name: "Holiday UGC" },
]

const mockVideos = [
  { id: 1, campaignId: "fall", title: "Unboxing 01", thumbnail: "/window.svg", views: "12.3K", likes: "1.1K", comments: "210", shares: "86", engagement: "9.2%", duration: "0:30", postedDate: new Date().toISOString(), status: "posted", platform: "Instagram" },
  { id: 2, campaignId: "holiday", title: "Gift Tips", thumbnail: "/window.svg", views: "8.1K", likes: "650", comments: "122", shares: "41", engagement: "7.4%", duration: "0:20", postedDate: null, status: "pending", platform: "TikTok" },
  { id: 3, campaignId: "fall", title: "Try-on Haul", thumbnail: "/window.svg", views: "5.6K", likes: "420", comments: "88", shares: "30", engagement: "8.1%", duration: "0:25", postedDate: new Date().toISOString(), status: "posted", platform: "Instagram" },
]

export default function CampaignsPage() {
  const t = useTranslations("campaigns")
  const tGlobal = useTranslations()
  const [hasCampaigns, setHasCampaigns] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all")

  const filteredVideos = useMemo(() => {
    if (selectedCampaign === "all") return mockVideos
    return mockVideos.filter(v => v.campaignId === selectedCampaign)
  }, [selectedCampaign])

  function parseMetric(s: string | null | undefined) {
    if (!s) return 0
    const num = parseFloat(s.replace(/[^\d.]/g, ""))
    if (s.toUpperCase().includes("M")) return num * 1_000_000
    if (s.toUpperCase().includes("K")) return num * 1_000
    return num
  }

  const kpis = useMemo(() => {
    const views = filteredVideos.reduce((acc, v) => acc + parseMetric(v.views), 0)
    const likes = filteredVideos.reduce((acc, v) => acc + parseMetric(v.likes), 0)
    const comments = filteredVideos.reduce((acc, v) => acc + parseMetric(v.comments), 0)
    const videos = filteredVideos.length
    return { views, likes, comments, videos }
  }, [filteredVideos])

  const rightActions = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger size="sm" className="w-[220px]">
            <SelectValue placeholder={t("selectCampaign")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCampaigns")}</SelectItem>
            {campaignOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => setHasCampaigns((v) => !v)}>
          {hasCampaigns ? t("viewEmpty") : t("viewPopulated")}
        </Button>
        <Button size="sm">
          <PlusIcon className="h-4 w-4" />
          {t("newCampaign")}
        </Button>
      </div>
    ),
    [hasCampaigns, t, selectedCampaign]
  )

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
        <SiteHeader title={tGlobal("sidebar.campaigns")} rightContent={rightActions} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {!hasCampaigns ? (
                <div className="px-4 lg:px-6">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <IconTargetArrow />
                      </EmptyMedia>
                      <EmptyTitle>{t("emptyTitle")}</EmptyTitle>
                      <EmptyDescription>{t("emptyDescription")}</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <div className="flex gap-2">
                        <Button>
                          <PlusIcon className="h-4 w-4" />
                          {t("createFirst")}
                        </Button>
                        <Button variant="outline">
                          <IconSparkles className="h-4 w-4" />
                          {t("learnMore")}
                        </Button>
                      </div>
                    </EmptyContent>
                  </Empty>
                </div>
              ) : (
                <>
                  {/* KPIs for current selection */}
                  <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 lg:grid-cols-4">
                    <KpiCard label={t("kpis.videos")} value={kpis.videos.toLocaleString()} />
                    <KpiCard label={t("kpis.views")} value={Math.round(kpis.views).toLocaleString()} />
                    <KpiCard label={t("kpis.likes")} value={Math.round(kpis.likes).toLocaleString()} />
                    <KpiCard label={t("kpis.comments")} value={Math.round(kpis.comments).toLocaleString()} />
                  </div>
                  <DataTable data={[]} videoData={filteredVideos as any} />
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="text-muted-foreground text-sm">{label}</div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}


