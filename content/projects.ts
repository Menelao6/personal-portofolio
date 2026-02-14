export interface Project {
  slug: string
  /** i18n key prefix: projects.<slug> */
  i18nKey: string
  tech: string[]
  year: string
  images: string[]
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    i18nKey: "projects.e-commerce-platform",
    tech: [
      "Next.js",
      "JavaScript",
      "Sanity CMS",
      "Tailwind CSS",
      "PostgreSQL",
      "API Integration",
    ],
    year: "2026",
    images: [
      "/assets/ecommerce/screenshot_1.png",
      "/assets/ecommerce/screenshot_2.png",
    ],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "carpentry-business-website",
    i18nKey: "projects.carpentry-business-website",
    tech: [
      "Next.js",
      "JavaScript",
      "CSS",
      "Responsive Design",
      "SEO Optimization",
    ],
    year: "2025",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "back-office-dashboard",
    i18nKey: "projects.back-office-dashboard",
    tech: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "CSS",
      "Component Architecture",
      "Admin Dashboard",
    ],
    year: "2025",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "cyber-security-blog",
    i18nKey: "projects.cyber-security-blog",
    tech: [
      "Next.js",
      "JavaScript",
      "Sanity CMS",
      "CSS",
      "Content Modeling",
      "Static Generation",
    ],
    year: "2026",
    images: [
      "/assets/cyber-blog/screenshot_1.png",
      "/assets/cyber-blog/screenshot_2.png",
    ],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ai-learning-platform",
    i18nKey: "projects.ai-learning-platform",
    tech: [
      "Next.js",
      "JavaScript",
      "CSS",
      "AI Integration",
      "Interactive Learning",
    ],
    year: "2025",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ai-next-earth",
    i18nKey: "projects.ai-next-earth",
    tech: [
      "Next.js",
      "JavaScript",
      "CSS",
      "AI Integration",
      "AWS Datasets",
      "Data Visualization",
    ],
    year: "2025",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
]