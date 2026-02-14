import { projects } from "@/content/projects"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProjectDetail } from "@/components/projects/project-detail"
import en from "@/locales/en.json"

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Project Not Found" }
  const projectStrings = en.projects[slug as keyof typeof en.projects]
  return {
    title: projectStrings?.title ?? slug,
    description: projectStrings?.shortDescription ?? "",
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}
