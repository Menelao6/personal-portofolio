"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  User,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import type { Project } from "@/content/projects"
import { useTranslation } from "@/lib/i18n/context"

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const { t, ta } = useTranslation()

  const title = t(`${project.i18nKey}.title`)
  const longDescription = t(`${project.i18nKey}.longDescription`)
  const problem = t(`${project.i18nKey}.problem`)
  const solution = t(`${project.i18nKey}.solution`)
  const role = t(`${project.i18nKey}.role`)
  const highlights = ta(`${project.i18nKey}.highlights`)

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("projectDetail.backToProjects")}
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {role}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.year}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
              {title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {longDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {techItem}
                </span>
              ))}
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-6 flex gap-3">
                {project.liveUrl && (
                  <Button asChild className="gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("projectDetail.liveDemo")}
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline" className="gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      {t("projectDetail.sourceCode")}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Project visual */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection delay={100}>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex aspect-video items-center justify-center bg-muted/30 p-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="text-3xl font-bold font-mono">
                      {title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("projectDetail.screenshotPlaceholder")}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection delay={150}>
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  {t("projectDetail.theChallenge")}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {problem}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={250}>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  {t("projectDetail.theSolution")}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {solution}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection delay={200}>
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              {t("projectDetail.keyHighlights")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{h}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Prev / Next nav */}
      <section className="px-6">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection delay={250}>
            <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 transition-colors hover:border-primary/30"
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
                  <div>
                    <span className="block text-xs text-muted-foreground">
                      {t("projectDetail.previous")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {t(`${prevProject.i18nKey}.title`)}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 transition-colors hover:border-primary/30 sm:text-right"
                >
                  <div>
                    <span className="block text-xs text-muted-foreground">
                      {t("projectDetail.next")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {t(`${nextProject.i18nKey}.title`)}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
