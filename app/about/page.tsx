import type { Metadata } from "next"
import { CertificatesSection } from "@/components/about/certificates-section"
import { ExperienceTimeline } from "@/components/about/experience-timeline"
import { SkillsSection } from "@/components/about/skills-section"
import { ContactSection } from "@/components/about/contact-section"
import { AboutHero } from "@/components/about/about-hero"

export const metadata: Metadata = {
  title: "About",
  description:
    "Certificates, experience, skills, and contact information for Menelaos - Frontend Developer.",
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutHero />
      <ExperienceTimeline />
      <SkillsSection />
      <CertificatesSection />
      <ContactSection />
    </div>
  )
}
