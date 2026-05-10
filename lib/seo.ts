import type { Metadata } from "next"

const FALLBACK_SITE_URL = "http://localhost:30001"

function normalizeSiteUrl(url: string) {
  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`
  return withProtocol.replace(/\/+$/, "")
}

export const siteConfig = {
  name: "Menelaos",
  fullName: "Menelaos Pone",
  role: "Frontend Developer",
  description:
    "Menelaos Pone is a frontend developer building performant React, Next.js, and Angular websites, dashboards, and product interfaces.",
  email: "menelaos.pone1@gmail.com",
  github: "https://github.com/Menelao6",
  linkedIn: "https://al.linkedin.com/in/menelaos-pone-2390a41ab",
  location: "Tirana, Albania",
  locale: "en_US",
  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL
  ),
  defaultOgImage: "/assets/photos/main-profile.jpeg",
  keywords: [
    "Menelaos Pone",
    "Menelaos",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "Portfolio",
    "Web Developer Albania",
    "Frontend Engineer",
  ],
} as const

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return new URL(normalizedPath, siteConfig.siteUrl).toString()
}

type BuildMetadataInput = {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  type?: "website" | "article" | "profile"
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
  keywords = [],
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.fullName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Menelao6",
      images: [imageUrl],
    },
  }
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: siteConfig.email,
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.defaultOgImage),
    sameAs: [siteConfig.github, siteConfig.linkedIn],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirana",
      addressCountry: "Albania",
    },
    worksFor: {
      "@type": "Organization",
      name: "B2TECH",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
      "UI Engineering",
      "SEO",
    ],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.fullName} Portfolio`,
    alternateName: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
  }
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
