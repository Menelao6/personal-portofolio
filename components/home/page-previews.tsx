"use client"

import Link from "next/link"
import { ArrowRight, Award, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

const previewIcons = [Award, Wrench]
const previewHrefs = ["/about", "/tools"]

export function PagePreviews() {
  const { t, tObj } = useTranslation()

  const items = tObj<{ title: string; description: string; buttonLabel: string }[]>(
    "pagePreviews.items"
  )

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-2 font-mono text-sm text-primary">
              {t("pagePreviews.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("pagePreviews.title")}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((preview, i) => {
            const Icon = previewIcons[i]
            const href = previewHrefs[i]
            return (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {preview.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {preview.description}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-fit gap-2 px-0 text-primary hover:text-primary hover:bg-transparent"
                  >
                    <Link href={href}>
                      {preview.buttonLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
