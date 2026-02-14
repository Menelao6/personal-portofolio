"use client"

import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

const skillGroups = [
  {
    titleKey: "skills.categories.frontend",
    skills: [
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "TypeScript",
    ],
  },
  {
    titleKey: "skills.categories.styling",
    skills: ["Tailwind CSS", "CSS3", "Responsive Design", "Mobile-first"],
  },
  {
    titleKey: "skills.categories.stateData",
    skills: [
      "Props & State",
      "CMS (Sanity)",
      "API Fetching",
      "Component Architecture",
    ],
  },
  {
    titleKey: "skills.categories.tools",
    skills: ["Git & GitHub", "Vercel", "npm", "Chrome DevTools", "VS Code"],
  },
]

export function SkillsSection() {
  const { t } = useTranslation()

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary">
            {t("skills.label")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("skills.title")}
          </h2>
        </AnimatedSection>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <AnimatedSection key={group.titleKey} delay={i * 100}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  {t(group.titleKey)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
