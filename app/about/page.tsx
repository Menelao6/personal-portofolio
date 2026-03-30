import type { Metadata } from "next"
import { CertificatesSection } from "@/components/about/certificates-section"
import { ExperienceTimeline } from "@/components/about/experience-timeline"
import { SkillsSection } from "@/components/about/skills-section"
import { ContactSection } from "@/components/about/contact-section"
import { AboutHero } from "@/components/about/about-hero"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, personSchema } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn more about Menelaos Pone, including frontend experience, React and Next.js skills, certifications, and contact details.",
  path: "/about",
  keywords: [
    "about Menelaos Pone",
    "frontend developer experience",
    "React developer Albania",
  ],
})

export default function AboutPage() {
  return (
    <div className="pt-24">
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutHero />
      <ExperienceTimeline />
      <SkillsSection />
      <CertificatesSection />
      <ContactSection />
    </div>
  )
}
