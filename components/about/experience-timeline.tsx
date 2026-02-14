"use client"

import { Briefcase, Code2 } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

const expIcons = [Code2, Briefcase]

const expSkills = [
  ["React", "Next.js", "Tailwind CSS", "Sanity CMS", "Vercel"],
  ["Problem-solving", "Communication", "Debugging", "Responsibility"],
]

export function ExperienceTimeline() {
  const { t, tObj } = useTranslation()

  const items = tObj<
    { title: string; company: string; type: string; description: string }[]
  >("experience.items")

  return (
    <section className="px-6 py-16 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary">
            {t("experience.label")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("experience.title")}
          </h2>
        </AnimatedSection>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

          <div className="flex flex-col gap-12">
            {items.map((exp, i) => {
              const Icon = expIcons[i]
              const skills = expSkills[i]
              return (
                <AnimatedSection key={i} delay={i * 150}>
                  <div
                    className={`relative flex flex-col gap-4 pl-16 md:w-1/2 ${
                      i % 2 === 0
                        ? "md:pl-0 md:pr-12"
                        : "md:ml-auto md:pl-12 md:pr-0"
                    }`}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:left-auto ${
                        i % 2 === 0 ? "md:-right-2.5" : "md:-left-2.5"
                      }`}
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {exp.company} &middot; {exp.type}
                          </p>
                        </div>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
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
      </div>
    </section>
  )
}
