import { projects } from "@/content/projects"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProjectDetail } from "@/components/projects/project-detail"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, buildMetadata, siteConfig } from "@/lib/seo"
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
  return buildMetadata({
    title: `${projectStrings?.title ?? slug} Project`,
    description: projectStrings?.shortDescription ?? "",
    path: `/projects/${slug}`,
    image: project.images[0] ?? siteConfig.defaultOgImage,
    keywords: [
      projectStrings?.title ?? slug,
      ...project.tech,
      "frontend project",
      "portfolio project",
    ],
    type: "article",
  })
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
  const projectStrings = en.projects[slug as keyof typeof en.projects]
  const projectTitle = projectStrings?.title ?? project.slug
  const projectDescription = projectStrings?.shortDescription ?? ""

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: projectTitle,
          description: projectDescription,
          url: absoluteUrl(`/projects/${project.slug}`),
          image: project.images.map((image) => absoluteUrl(image)),
          creator: {
            "@type": "Person",
            name: siteConfig.fullName,
          },
          dateCreated: project.year,
          keywords: project.tech.join(", "),
          genre: "Portfolio Project",
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: projectTitle, path: `/projects/${project.slug}` },
        ])}
      />
      <ProjectDetail
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  )
}
