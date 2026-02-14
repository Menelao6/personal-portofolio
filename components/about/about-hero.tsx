"use client"

import { MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

export function AboutHero() {
  const { t } = useTranslation()

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("aboutHero.badge")}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
              {t("aboutHero.title")} <span className="text-primary">Menelaos</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("aboutHero.bio")}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {t("aboutHero.location")}
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                {t("aboutHero.downloadCv")}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
