"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { type Locale, defaultLocale } from "./settings"

import en from "@/locales/en.json"
import sq from "@/locales/sq.json"

const messages: Record<Locale, Record<string, unknown>> = { en, sq }

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  ta: (key: string) => string[]
  tObj: <T = unknown>(key: string) => T
}

const LocaleContext = createContext<LocaleContextType | null>(null)

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved && (saved === "en" || saved === "sq")) {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }, [])

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(messages[locale], key)
      if (typeof value === "string") return value
      return key
    },
    [locale]
  )

  const ta = useCallback(
    (key: string): string[] => {
      const value = getNestedValue(messages[locale], key)
      if (Array.isArray(value)) return value as string[]
      return []
    },
    [locale]
  )

  const tObj = useCallback(
    <T = unknown,>(key: string): T => {
      const value = getNestedValue(messages[locale], key)
      return value as T
    },
    [locale]
  )

  if (!mounted) {
    return (
      <LocaleContext.Provider value={{ locale: defaultLocale, setLocale, t, ta, tObj }}>
        {children}
      </LocaleContext.Provider>
    )
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, ta, tObj }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useTranslation must be used within a LocaleProvider")
  }
  return context
}
