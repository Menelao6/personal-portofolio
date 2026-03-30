import type { Metadata } from "next"
import { ToolsContent } from "@/components/tools/tools-content"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, siteConfig } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Dev Tools",
  description:
    "Developer utilities by Menelaos Pone, including a color converter, gradient generator, and live code preview tool.",
  path: "/tools",
  keywords: [
    "developer tools",
    "gradient generator",
    "color converter",
    "live code preview",
  ],
})

export default function ToolsPage() {
  return (
    <div className="pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Developer Tools",
          description:
            "A collection of developer tools built by Menelaos Pone.",
          url: `${siteConfig.siteUrl}/tools`,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Dev Tools", path: "/tools" },
        ])}
      />
      <ToolsContent />
    </div>
  )
}
