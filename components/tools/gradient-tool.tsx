"use client"

import { useState } from "react"
import { Copy, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/context"

export function GradientTool() {
  const { t } = useTranslation()
  const [color1, setColor1] = useState("#2563EB")
  const [color2, setColor2] = useState("#06B6D4")
  const [angle, setAngle] = useState(135)
  const [type, setType] = useState<"linear" | "radial">("linear")

  const gradientCSS =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`

  const fullCSS = `background: ${gradientCSS};`

  const copy = () => {
    navigator.clipboard.writeText(fullCSS)
    toast.success(t("tools.gradient.cssCopied"))
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {t("tools.gradient.title")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setType("linear")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              type === "linear"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("tools.gradient.linear")}
          </button>
          <button
            onClick={() => setType("radial")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              type === "radial"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("tools.gradient.radial")}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="mb-6 h-48 w-full rounded-lg border border-border"
        style={{ background: gradientCSS }}
      />

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {t("tools.gradient.color1")}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {t("tools.gradient.color2")}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        {type === "linear" && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              {t("tools.gradient.angle")}: {angle}deg
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setAngle((angle + 45) % 360)}
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span className="sr-only">Rotate angle</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* CSS output */}
      <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
        <code className="flex-1 text-xs text-foreground font-mono break-all">
          {fullCSS}
        </code>
        <Button variant="ghost" size="icon" onClick={copy} className="flex-shrink-0">
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy CSS</span>
        </Button>
      </div>
    </div>
  )
}
