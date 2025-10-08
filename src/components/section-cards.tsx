import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function SectionCards() {
  const t = useTranslations("dashboard")

  const data = [
    {
      name: t("publishedVideos"),
      stat: "30",
      change: "+5",
      changeType: "positive",
    },
    {
      name: t("totalViews"),
      stat: "31k",
      change: "+15%",
      changeType: "positive",
    },
    {
      name: t("totalComments"),
      stat: "20",
      change: "+8",
      changeType: "positive",
    },
    {
      name: t("totalLikes"),
      stat: "400",
      change: "+25",
      changeType: "positive",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 lg:grid-cols-4">
      {data.map((item) => (
        <Card key={item.name} className="p-6 py-4">
          <CardContent className="p-0">
            <dt className="text-sm font-medium text-muted-foreground">
              {item.name}
            </dt>
            <dd className="mt-2 flex items-baseline space-x-2.5">
              <span className="text-3xl font-semibold text-foreground">
                {item.stat}
              </span>
              <span
                className={cn(
                  item.changeType === "positive"
                    ? "text-green-800 dark:text-green-400"
                    : "text-red-800 dark:text-red-400",
                  "text-sm font-medium"
                )}
              >
                {item.change}
              </span>
            </dd>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
