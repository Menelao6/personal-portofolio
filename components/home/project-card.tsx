"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/content/projects"
import { useTranslation } from "@/lib/i18n/context"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0
  const { t } = useTranslation()

  const title = t(`${project.i18nKey}.title`)
  const shortDescription = t(`${project.i18nKey}.shortDescription`)

  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Project visual */}
      <div className="flex-1">
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-video bg-muted/50 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="text-2xl font-bold font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="text-2xl font-bold text-foreground">{title}</h3>

        <p className="leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((techItem) => (
            <span
              key={techItem}
              className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {techItem}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button asChild variant="default" size="sm" className="gap-2">
            <Link href={`/projects/${project.slug}`}>
              {t("projectCard.viewDetails")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                {t("projectCard.live")}
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" />
                {t("projectCard.code")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
