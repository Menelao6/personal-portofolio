"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/settings"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-semibold">{localeFlags[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[140px] overflow-hidden rounded-lg border border-border bg-card shadow-lg animate-fade-in">
          {locales.map((l: Locale) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                locale === l
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <span className="text-xs font-bold">{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
