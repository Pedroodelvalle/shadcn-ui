"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { IconCamera, IconUser, IconMail, IconSettings } from "@tabler/icons-react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

// Mock user data - in a real app this would come from your auth/user state
const mockUser = {
  id: "1",
  name: "Pedro Silva",
  email: "pedro.silva@example.com",
  avatar: "/avatars/pedro.jpg",
  username: "pedrosilva",
  bio: "Content creator and social media manager",
  location: "São Paulo, Brazil",
  website: "https://pedrosilva.com",
  joinDate: "January 2024",
  stats: {
    campaigns: 5,
    videos: 47,
    followers: "12.3K",
    engagement: "8.2%"
  }
}

export default function AccountPage() {
  const t = useTranslations("account")
  const tGlobal = useTranslations()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    username: mockUser.username,
    bio: mockUser.bio,
    location: mockUser.location,
    website: mockUser.website
  })

  // Show skeleton immediately, then content after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1700) // Show content after 1.7 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <AccountPageSkeleton />
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // In a real app, this would make an API call to update the user
    toast.success(t("profileUpdated"))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      username: mockUser.username,
      bio: mockUser.bio,
      location: mockUser.location,
      website: mockUser.website
    })
    setIsEditing(false)
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
        <SiteHeader title={tGlobal("sidebar.account")} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  {/* Profile Header */}
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                          <AvatarFallback className="text-2xl">
                            {mockUser.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          >
                            <IconCamera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="text-center md:text-left">
                        <h1 className="text-2xl font-semibold">{mockUser.name}</h1>
                        <p className="text-muted-foreground">@{mockUser.username}</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold">{mockUser.stats.campaigns}</div>
                            <p className="text-sm text-muted-foreground">{t("campaigns")}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold">{mockUser.stats.videos}</div>
                            <p className="text-sm text-muted-foreground">{t("videos")}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold">{mockUser.stats.followers}</div>
                            <p className="text-sm text-muted-foreground">{t("followers")}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold">{mockUser.stats.engagement}</div>
                            <p className="text-sm text-muted-foreground">{t("engagement")}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Profile Information */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <IconUser className="h-5 w-5" />
                            {t("profileInformation")}
                          </CardTitle>
                          <CardDescription>
                            {t("profileDescription")}
                          </CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button onClick={() => setIsEditing(true)}>
                            {t("editProfile")}
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={handleCancel}>
                              {t("cancel")}
                            </Button>
                            <Button onClick={handleSave}>
                              {t("saveChanges")}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("fullName")}</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                          ) : (
                            <p className="text-sm py-2 px-3 rounded-md bg-muted">{formData.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">{t("username")}</Label>
                          {isEditing ? (
                            <Input
                              id="username"
                              value={formData.username}
                              onChange={(e) => handleInputChange("username", e.target.value)}
                            />
                          ) : (
                            <p className="text-sm py-2 px-3 rounded-md bg-muted">@{formData.username}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <IconMail className="h-4 w-4" />
                          {t("email")}
                        </Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        ) : (
                          <p className="text-sm py-2 px-3 rounded-md bg-muted">{formData.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">{t("bio")}</Label>
                        {isEditing ? (
                          <Input
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                          />
                        ) : (
                          <p className="text-sm py-2 px-3 rounded-md bg-muted min-h-[2.5rem]">{formData.bio || t("noBio")}</p>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="location">{t("location")}</Label>
                          {isEditing ? (
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                            />
                          ) : (
                            <p className="text-sm py-2 px-3 rounded-md bg-muted">{formData.location || t("noLocation")}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">{t("website")}</Label>
                          {isEditing ? (
                            <Input
                              id="website"
                              type="url"
                              value={formData.website}
                              onChange={(e) => handleInputChange("website", e.target.value)}
                            />
                          ) : (
                            <p className="text-sm py-2 px-3 rounded-md bg-muted">
                              {formData.website ? (
                                <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {formData.website}
                                </a>
                              ) : (
                                t("noWebsite")
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconSettings className="h-5 w-5" />
                        {t("accountInformation")}
                      </CardTitle>
                      <CardDescription>
                        {t("accountDescription")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t("memberSince")}</p>
                          <p className="text-sm text-muted-foreground">{mockUser.joinDate}</p>
                        </div>
                        <Badge variant="secondary">{t("active")}</Badge>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t("accountStatus")}</p>
                          <p className="text-sm text-muted-foreground">{t("verifiedAccount")}</p>
                        </div>
                        <Badge variant="default">{t("verified")}</Badge>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t("lastLogin")}</p>
                          <p className="text-sm text-muted-foreground">{t("today")}</p>
                        </div>
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

function AccountPageSkeleton() {
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
        <SiteHeader title="Conta" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-6">
                  {/* Profile Header Skeleton */}
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                      <Skeleton className="h-24 w-24 rounded-full" />
                      <div className="text-center md:text-left space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>

                    {/* Quick Stats Skeleton */}
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <Skeleton className="h-8 w-12 mb-1" />
                              <Skeleton className="h-3 w-16" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Profile Information Card Skeleton */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-96" />
                        </div>
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Information Card Skeleton */}
                  <Card>
                    <CardHeader>
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-80" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
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
