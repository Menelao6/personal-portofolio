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
    tech: ["React", "Next.js", "JavaScript", "Sanity CMS", "CSS3", "Vercel"],
    year: "2024",
    images: [
      "/assets/Screenshot_1.png",
      "/assets/Screenshot_2.png",
    ],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "carpentry-business-website",
    i18nKey: "projects.carpentry-business-website",
    tech: ["React", "Next.js", "JavaScript", "Tailwind CSS", "CMS"],
    year: "2024",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "back-office-dashboard",
    i18nKey: "projects.back-office-dashboard",
    tech: ["React", "JavaScript", "Sanity CMS", "CSS3"],
    year: "2024",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "multi-page-business-website",
    i18nKey: "projects.multi-page-business-website",
    tech: ["Next.js", "React", "Sanity CMS", "JavaScript", "CSS3"],
    year: "2023",
    images: [],
    liveUrl: "#",
    repoUrl: "#",
  },
  
]
