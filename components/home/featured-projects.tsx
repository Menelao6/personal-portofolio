"use client"

import { projects } from "@/content/projects"
import { ProjectCard } from "./project-card"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

export function FeaturedProjects() {
  const { t } = useTranslation()

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-2 font-mono text-sm text-primary">
              {t("featuredProjects.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("featuredProjects.title")}
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              {t("featuredProjects.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-20">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
