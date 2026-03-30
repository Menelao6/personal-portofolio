import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/tools"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [...staticRoutes, ...projectRoutes]
}
