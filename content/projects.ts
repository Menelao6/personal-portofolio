export interface Project {
  slug: string
  /** i18n key prefix: projects.<slug> */
  i18nKey: string
  tech: string[]
  year: string
  images: string[]
  liveUrl?: string
  repoUrl?: string
  pdfUrl?: string
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
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
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
    images: [
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
    ],
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
    images: [
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
    ],
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
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
      "/assets/screenshot_1.png",
      "/assets/screenshot_2.png",
    ],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ai-learning-platform",
    i18nKey: "projects.ai-learning-platform",
    tech: [
      "Next.js",
      "TypeScript",
      "CSS",
      "AI Integration",
      "Interactive Learning",
    ],
    year: "2025",
    images: [
      "/assets/projects/knowledge/1.webp",
      "/assets/projects/knowledge/2.webp",
      "/assets/projects/knowledge/3.webp",
      "/assets/projects/knowledge/4.webp",
      "/assets/projects/knowledge/5.webp",
      "/assets/projects/knowledge/6.webp",
      "/assets/projects/knowledge/7.webp",
      "/assets/projects/knowledge/8.webp",
      "/assets/projects/knowledge/9.webp",
      "/assets/projects/knowledge/10.webp",
    ],
    liveUrl: "https://knowledge-flow-ai.vercel.app/",
    repoUrl: "https://github.com/Menelao6/knowledgeflow",
  },
  {
    slug: "ai-next-earth",
    i18nKey: "projects.ai-next-earth",
    tech: [
      "Next.js",
      "TypeScript",
      "CSS",
      "AI Integration",
      "AWS Datasets",
      "Data Visualization",
    ],
    year: "2025",
    images: [
      "/assets/projects/earth/1.webp",
      "/assets/projects/earth/2.webp",
      "/assets/projects/earth/3.webp",
      "/assets/projects/earth/4.webp",
      "/assets/projects/earth/5.webp",
      "/assets/projects/earth/6.webp",
      "/assets/projects/earth/7.webp",
    ],
    liveUrl: "https://next-earth.vercel.app/",
    repoUrl: "https://github.com/Menelao6/next-earth",
    pdfUrl: "/assets/projects/NextEarth-AI.pdf",
  },
]