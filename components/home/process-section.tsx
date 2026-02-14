"use client"

import { Search, Palette, Code2, Rocket } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

const stepIcons = [Search, Palette, Code2, Rocket]

export function ProcessSection() {
  const { t, tObj } = useTranslation()

  const steps = tObj<{ title: string; description: string }[]>("process.steps")

  return (
    <section className="px-6 py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-2 font-mono text-sm text-primary">
              {t("process.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("process.title")}
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              {t("process.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-border lg:block" />

          {steps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="mb-1 font-mono text-xs text-muted-foreground">
                    {t("process.stepLabel")} {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
