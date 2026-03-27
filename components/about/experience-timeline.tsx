"use client"

import { Briefcase, Code2, Layers, ArrowUpRight, type LucideIcon } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ExperienceItem {
  id: string
  title: string
  company: string
  type: string
  period: string
  description: string
  skills: string[]
  highlight?: boolean
}

const experienceMeta: Record<ExperienceItem["id"], {
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  accentColor: string
}> = {
  devx: {
    icon: Layers,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    accentColor: "#8b5cf6",
  },
  techsupport: {
    icon: Briefcase,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    accentColor: "#10b981",
  },
  freelance: {
    icon: Code2,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    accentColor: "hsl(var(--primary))",
  },
}

export function ExperienceTimeline() {
  const { t, tObj } = useTranslation()
  const [active, setActive] = useState<string | null>(null)

  const experiences = (tObj<ExperienceItem[]>("experience.items") ?? []).map((item) => ({
    ...item,
    ...experienceMeta[item.id],
  }))


  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary uppercase tracking-wider">
            {t("experience.label")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("experience.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl text-sm leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </AnimatedSection>

        {/* Desktop: side-by-side bento cards */}
        <div className="mt-12 hidden md:flex flex-col gap-4">
          {experiences.map((exp, i) => {
            const Icon = exp.icon
            const isOpen = active === exp.id

            return (
              <AnimatedSection key={exp.id} delay={i * 120}>
                <button
                  onClick={() => setActive(isOpen ? null : exp.id)}
                  className={cn(
                    "group w-full text-left rounded-2xl border transition-all duration-300",
                    "bg-card hover:bg-card/80",
                    exp.highlight
                      ? "border-violet-500/30 shadow-[0_0_0_1px_hsl(var(--primary)/0.08)]"
                      : "border-border",
                    isOpen && "shadow-lg"
                  )}
                  style={
                    isOpen
                      ? { boxShadow: `0 0 0 1.5px ${exp.accentColor}30` }
                      : undefined
                  }
                >
                  {/* Card header */}
                  <div className="flex items-start gap-5 p-6">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                        exp.bgColor
                      )}
                    >
                      <Icon className={cn("h-5 w-5", exp.color)} />
                    </div>

                    {/* Title block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground text-base">
                              {exp.title}
                            </h3>
                            {exp.highlight && (
                              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-500 uppercase tracking-wider">
                                Now
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} · {exp.type}
                          </p>
                        </div>
                        <span className="flex-shrink-0 font-mono text-xs text-muted-foreground pt-1">
                          {exp.period}
                        </span>
                      </div>

                      {/* Always-visible skill pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-muted/70 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-all duration-200 mt-1",
                        isOpen && "rotate-180 text-muted-foreground"
                      )}
                    />
                  </div>

                  {/* Expandable description */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="border-t border-border/50 px-6 pb-6 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-12 md:hidden">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const Icon = exp.icon

              return (
                <AnimatedSection key={exp.id} delay={i * 120}>
                  <div className="relative pl-14">
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background",
                        exp.highlight ? "border-violet-500" : "border-primary"
                      )}
                    >
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          exp.highlight ? "bg-violet-500" : "bg-primary"
                        )}
                      />
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
                            exp.bgColor
                          )}
                        >
                          <Icon className={cn("h-4 w-4", exp.color)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground text-sm">
                              {exp.title}
                            </h3>
                            {exp.highlight && (
                              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-500 uppercase tracking-wider">
                                Now
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {exp.company} · {exp.period}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>

        {/* Bottom note */}
        <AnimatedSection delay={400}>
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-border/50 bg-card/50 p-5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("experience.note")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}