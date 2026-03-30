import { Hero } from "@/components/home/hero"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { AboutPreview } from "@/components/home/about-preview"
import { ProcessSection } from "@/components/home/process-section"
import { PagePreviews } from "@/components/home/page-previews"
import { JsonLd } from "@/components/json-ld"
import {
  breadcrumbSchema,
  buildMetadata,
  personSchema,
  websiteSchema,
} from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Menelaos Pone | Frontend Developer Portfolio",
  description:
    "Explore the portfolio of Menelaos Pone, a frontend developer building React, Next.js, and Angular websites, dashboards, and product experiences.",
  path: "/",
  keywords: [
    "Menelaos Pone portfolio",
    "frontend developer portfolio",
    "React portfolio",
    "Next.js portfolio",
  ],
  type: "profile",
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <ProcessSection />
      <PagePreviews />
    </>
  )
}
