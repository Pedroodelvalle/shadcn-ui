import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getTranslations} from "next-intl/server";
import {ThemeProvider} from "@/components/theme-provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  try {
    const t = await getTranslations({locale, namespace: "seo"});
    return {
      title: t("title"),
      description: t("description"),
    };
  } catch {
    const messages = (await import(`../../../messages/${locale}.json`)).default as any;
    return {
      title: messages.seo?.title ?? "Brand",
      description: messages.seo?.description ?? "",
    };
  }
}

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "pt"}];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


