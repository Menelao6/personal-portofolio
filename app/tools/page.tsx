import type { Metadata } from "next"
import { ToolsContent } from "@/components/tools/tools-content"

export const metadata: Metadata = {
  title: "Dev Tools",
  description:
    "A collection of handy developer tools: color converter, gradient generator, and live code preview.",
}

export default function ToolsPage() {
  return (
    <div className="pt-24">
      <ToolsContent />
    </div>
  )
}
