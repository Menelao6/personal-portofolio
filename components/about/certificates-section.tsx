"use client"

import { Award, ChevronDown } from "lucide-react"
import { certificates } from "@/content/certificates"
import { AnimatedSection } from "@/components/animated-section"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/context"

export function CertificatesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { t, ta } = useTranslation()

  return (
    <section className="px-6 py-16 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary">
            {t("certificates.label")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("certificates.title")}
          </h2>
        </AnimatedSection>

        <div className="mt-10 flex flex-col gap-4">
          {certificates.map((cert, i) => {
            const title = t(`${cert.i18nKey}.title`)
            const issuer = t(`${cert.i18nKey}.issuer`)
            const courses = ta(`${cert.i18nKey}.courses`)

            return (
              <AnimatedSection key={cert.i18nKey} delay={i * 100}>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === i ? null : i)
                    }
                    className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("certificates.issuedBy")} {issuer}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform",
                        expandedIndex === i && "rotate-180"
                      )}
                    />
                  </button>

                  {expandedIndex === i && courses.length > 0 && (
                    <div className="border-t border-border px-6 pb-6 pt-4">
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        {t("certificates.completedCourses")}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {courses.map((course) => (
                          <div
                            key={course}
                            className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-sm text-foreground">
                              {course}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
