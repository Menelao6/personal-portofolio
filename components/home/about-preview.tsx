"use client"

import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

export function AboutPreview() {
  const { t } = useTranslation()

  const stats = [
    { value: "4+", label: t("aboutPreview.stats.projects") },
    { value: "2+", label: t("aboutPreview.stats.years") },
    { value: "React", label: t("aboutPreview.stats.focus") },
  ]

  return (
    <section className="px-6 py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <AnimatedSection className="flex-1">
            <span className="mb-2 block font-mono text-sm text-primary">
              {t("aboutPreview.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("aboutPreview.title")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("aboutPreview.p1")}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {t("aboutPreview.p2")}
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex-1" delay={200}>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-6 text-center"
                >
                  <span className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
