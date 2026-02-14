"use client"

import { Hero } from "@/components/home/hero"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { AboutPreview } from "@/components/home/about-preview"
import { ProcessSection } from "@/components/home/process-section"
import { PagePreviews } from "@/components/home/page-previews"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <ProcessSection />
      <PagePreviews />
    </>
  )
}
