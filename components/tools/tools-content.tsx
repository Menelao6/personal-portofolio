"use client"

import { useState } from "react"
import { Palette, Layers, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ColorTool } from "./color-tool"
import { GradientTool } from "./gradient-tool"
import { CodePreview } from "./code-preview"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"

const toolIds = ["color", "gradient", "code"] as const
const toolIcons = [Palette, Layers, Code2]
type ToolId = (typeof toolIds)[number]

export function ToolsContent() {
  const [activeTool, setActiveTool] = useState<ToolId>("color")
  const { t } = useTranslation()

  const toolLabels: Record<ToolId, string> = {
    color: t("tools.tabs.color"),
    gradient: t("tools.tabs.gradient"),
    code: t("tools.tabs.code"),
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary">
            {t("tools.label")}
          </span>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
            {t("tools.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("tools.subtitle")}
          </p>
        </AnimatedSection>

        {/* Tool tabs */}
        <AnimatedSection delay={100}>
          <div className="mt-10 flex flex-wrap gap-2">
            {toolIds.map((id, i) => {
              const Icon = toolIcons[i]
              return (
                <button
                  key={id}
                  onClick={() => setActiveTool(id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                    activeTool === id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {toolLabels[id]}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Tool content */}
        <AnimatedSection delay={200}>
          <div className="mt-8">
            {activeTool === "color" && <ColorTool />}
            {activeTool === "gradient" && <GradientTool />}
            {activeTool === "code" && <CodePreview />}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
