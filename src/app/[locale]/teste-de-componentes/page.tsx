import { useTranslations } from "next-intl"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { CalendarIcon, TrendingUp } from "lucide-react"
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BackgroundGradient } from "@/components/ui/background-gradient"

// Cards atuais do dashboard (exatamente o SectionCards)
function CurrentCards() {
  const t = useTranslations("dashboard")

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cards Atuais (Dashboard)</h2>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 lg:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>{t("publishedVideos")}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              30
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +5
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>{t("totalViews")}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              31k
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +15%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>{t("totalComments")}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              20
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +8
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>{t("totalLikes")}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              400
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +25
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

// Cards do dashboard-01 (exatamente como fornecido pelo shadcn)
function Dashboard01Cards() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cards Dashboard-01 (shadc n registry)</h2>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,234
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              45,678
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              4.5%
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance increase <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Meets growth projections</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Card com form (exatamente como fornecido pelo shadcn)
function CardWithForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Card with Form (shadcn registry)</h2>
      <div className="px-4 lg:px-6">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework" className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Card demo (exatamente como fornecido pelo shadcn)
function CardDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Card Demo (shadcn registry)</h2>
      <div className="px-4 lg:px-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Hover card demo (exatamente como fornecido pelo shadcn)
function HoverCardDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hover Card Demo (shadcn registry)</h2>
      <div className="px-4 lg:px-6">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

// Background Gradient Demo (@aceternity/background-gradient)
function BackgroundGradientDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Background Gradient Demo (@aceternity/background-gradient)</h2>
      <div className="px-4 lg:px-6">
        <div className="flex flex-wrap gap-6">
          {/* Card básico com gradiente */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-1 bg-white dark:bg-zinc-900">
            <div className="flex h-full bg-white dark:bg-zinc-900 rounded-[22px] p-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Card Básico
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Um card simples com efeito de gradiente animado ao redor.
                </p>
                <Button>Ver mais</Button>
              </div>
            </div>
          </BackgroundGradient>

          {/* Botão com gradiente */}
          <BackgroundGradient className="rounded-full max-w-xs p-1 bg-white dark:bg-zinc-900">
            <Button className="bg-white dark:bg-zinc-900 text-black dark:text-white border-0 rounded-full h-12 px-8">
              Botão Especial
            </Button>
          </BackgroundGradient>

          {/* Card maior */}
          <BackgroundGradient className="rounded-[22px] max-w-md p-1 bg-white dark:bg-zinc-900">
            <div className="flex h-full bg-white dark:bg-zinc-900 rounded-[22px] p-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                  Card Premium
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Este card demonstra um efeito de gradiente mais pronunciado com bordas arredondadas maiores.
                </p>
                <div className="flex gap-3">
                  <Button size="sm">Ação 1</Button>
                  <Button size="sm" variant="outline">Ação 2</Button>
                </div>
              </div>
            </div>
          </BackgroundGradient>

          {/* Gradiente sem animação */}
          <BackgroundGradient
            animate={false}
            className="rounded-[22px] max-w-sm p-1 bg-white dark:bg-zinc-900"
          >
            <div className="flex h-full bg-white dark:bg-zinc-900 rounded-[22px] p-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Sem Animação
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Gradiente estático sem movimento.
                </p>
                <Button variant="outline" size="sm">Estático</Button>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  )
}

// Chart area default (exatamente como fornecido pelo shadcn)
// function ChartAreaDefault() { ... } // Temporariamente removido por problema com recharts

export default function TesteDeComponentesPage() {
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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-8 py-8">
            <div className="px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Teste de Componentes - Cards</h1>
                <p className="text-muted-foreground">
                  Comparação de cards exatos do shadcn registry (sem modificações)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-12 px-4 lg:px-6">
              <CurrentCards />
              <Dashboard01Cards />
              <CardDemo />
              <CardWithForm />
              <HoverCardDemo />
              <BackgroundGradientDemo />
              {/* <ChartAreaDefault /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}