"use client";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";
import {useTransition} from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onToggle(nextLocale: "en" | "pt") {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onToggle("en")}
        className={`text-sm underline-offset-4 hover:underline ${locale === "en" ? "font-semibold" : "opacity-70"}`}
        disabled={isPending}
      >
        EN
      </button>
      <span aria-hidden className="opacity-50">/</span>
      <button
        type="button"
        onClick={() => onToggle("pt")}
        className={`text-sm underline-offset-4 hover:underline ${locale === "pt" ? "font-semibold" : "opacity-70"}`}
        disabled={isPending}
      >
        PT
      </button>
    </div>
  );
}


