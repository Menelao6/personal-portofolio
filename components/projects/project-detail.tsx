"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  User,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { ProjectGallery } from "./project-gallery"
import type { Project } from "@/content/projects"
import { useTranslation } from "@/lib/i18n/context"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Single meta row in the sticky sidebar */
function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const { t, ta } = useTranslation()

  const title           = t(`${project.i18nKey}.title`)
  const longDescription = t(`${project.i18nKey}.longDescription`)
  const problem         = t(`${project.i18nKey}.problem`)
  const solution        = t(`${project.i18nKey}.solution`)
  const role            = t(`${project.i18nKey}.role`)
  const highlights      = ta(`${project.i18nKey}.highlights`)

  // Pull pdfUrl from project if it exists (extend your Project type if needed)
  const pdfUrl = (project as Project & { pdfUrl?: string }).pdfUrl

  const heroImage = project.images[0]

  return (
    <div className="pt-20 pb-20">

      {/* ── Bleed-edge hero ─────────────────────────────────────────────── */}
      <section className="relative mb-16 overflow-hidden">
        {/* Full-bleed image */}
        {heroImage && (
          <div
            className="relative w-full"
            style={{ height: "clamp(320px, 45vw, 560px)" }}
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized
            />
            {/* Gradient overlays */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, hsl(var(--background)) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)",
              }}
            />

            {/* Back link — floats over image */}
            <div className="absolute left-6 top-6 sm:left-10">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                {t("projectDetail.backToProjects")}
              </Link>
            </div>

            {/* Title overlay at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10">
              <div className="mx-auto max-w-5xl">
                {/* Year badge */}
                <span className="mb-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  {project.year}
                </span>
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* If no hero image — plain title section */}
        {!heroImage && (
          <div className="px-6 pt-6 sm:px-10">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/"
                className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                {t("projectDetail.backToProjects")}
              </Link>
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
            </div>
          </div>
        )}
      </section>

      {/* ── Content: two-column (main + sidebar) ────────────────────────── */}
      <div className="px-6 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:items-start">

            {/* ── Main column ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-14 min-w-0">

              {/* Lead paragraph + tech stack */}
              <AnimatedSection>
                <div className="flex flex-col gap-5">
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {longDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  {(project.liveUrl || project.repoUrl) && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {project.liveUrl && (
                        <Button asChild className="gap-2 rounded-xl">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            {t("projectDetail.liveDemo")}
                          </a>
                        </Button>
                      )}
                      {project.repoUrl && (
                        <Button asChild variant="outline" className="gap-2 rounded-xl">
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            {t("projectDetail.sourceCode")}
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Gallery */}
              <AnimatedSection delay={100}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary">
                      Media
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <ProjectGallery
                    images={project.images}
                    projectTitle={title}
                    pdfUrl={pdfUrl}
                  />
                </div>
              </AnimatedSection>

              {/* Challenge & Solution */}
              <AnimatedSection delay={150}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary">
                      Case Study
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Challenge */}
                    <div className="group relative rounded-2xl border border-border bg-card p-7 overflow-hidden transition-shadow hover:shadow-md">
                      {/* Large number accent */}
                      <span
                        className="pointer-events-none absolute -right-2 -top-4 select-none text-[72px] font-black leading-none text-border/40 transition-colors group-hover:text-border/60"
                        aria-hidden
                      >
                        01
                      </span>
                      <h2 className="relative mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("projectDetail.theChallenge")}
                      </h2>
                      <p className="relative text-sm leading-relaxed text-foreground">
                        {problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="group relative rounded-2xl border border-primary/25 bg-primary/5 p-7 overflow-hidden transition-shadow hover:shadow-md">
                      <span
                        className="pointer-events-none absolute -right-2 -top-4 select-none text-[72px] font-black leading-none text-primary/10 transition-colors group-hover:text-primary/20"
                        aria-hidden
                      >
                        02
                      </span>
                      <h2 className="relative mb-3 text-sm font-semibold uppercase tracking-wider text-primary/70">
                        {t("projectDetail.theSolution")}
                      </h2>
                      <p className="relative text-sm leading-relaxed text-foreground">
                        {solution}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Highlights */}
              {highlights.length > 0 && (
                <AnimatedSection delay={200}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary">
                        {t("projectDetail.keyHighlights")}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {highlights.map((h, i) => (
                        <div
                          key={h}
                          className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5"
                        >
                          {/* Bold index number */}
                          <span className="flex-shrink-0 font-black text-2xl leading-none text-primary/20 group-hover:text-primary/40 transition-colors tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="pt-0.5 text-sm leading-relaxed text-foreground">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* ── Sticky sidebar ──────────────────────────────────────────── */}
            <AnimatedSection delay={80} className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                {/* Meta card */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">
                  <MetaItem
                    icon={User}
                    label="Role"
                    value={role}
                  />
                  <div className="h-px bg-border" />
                  <MetaItem
                    icon={Calendar}
                    label="Year"
                    value={project.year}
                  />
                  <div className="h-px bg-border" />
                  <MetaItem
                    icon={Layers}
                    label="Stack"
                    value={
                      <div className="mt-1 flex flex-wrap gap-1">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    }
                  />
                </div>

                {/* Quick links */}
                {(project.liveUrl || project.repoUrl) && (
                  <div className="flex flex-col gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 text-primary" />
                        {t("projectDetail.liveDemo")}
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      >
                        <Github className="h-4 w-4 text-primary" />
                        {t("projectDetail.sourceCode")}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* ── Prev / Next navigation ──────────────────────────────────── */}
          <AnimatedSection delay={300}>
            <div className="mt-20 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:justify-between">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {t("projectDetail.previous")}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
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
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5 sm:text-right sm:flex-row-reverse"
                >
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {t("projectDetail.next")}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {t(`${nextProject.i18nKey}.title`)}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}