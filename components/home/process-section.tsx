"use client"

import { Search, Palette, Code2, Rocket } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"
import { useEffect, useRef, useState } from "react"

const stepIcons = [Search, Palette, Code2, Rocket]

const stepColors = [
  { icon: "text-sky-500",    bg: "bg-sky-500/10",    border: "border-sky-500/20",    dot: "#0ea5e9" },
  { icon: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20", dot: "#8b5cf6" },
  { icon: "text-emerald-500",bg: "bg-emerald-500/10",border: "border-emerald-500/20",dot: "#10b981" },
  { icon: "text-primary",    bg: "bg-primary/10",    border: "border-primary/20",    dot: "hsl(var(--primary))" },
]

/**
 * Animated SVG river that flows vertically between N steps.
 * The path is a continuous organic cubic bezier snake.
 */
function RiverSVG({ steps }: { steps: number }) {
  const [dashOffset, setDashOffset] = useState(0)
  const rafRef = useRef<number>(0)

  // Animate the dash offset to create a flowing liquid feel
  useEffect(() => {
    let offset = 0
    const animate = () => {
      offset -= 1.2
      setDashOffset(offset)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Layout constants
  const W         = 80   // SVG width
  const stepH     = 168  // px per step (matches the step card spacing below)
  const topPad    = 40   // top padding before first step center
  const totalH    = topPad + (steps - 1) * stepH + 40

  // Build a snake path that passes through each step's center X, going side-to-side
  const cx = W / 2
  const points = Array.from({ length: steps }, (_, i) => ({
    x: cx,
    y: topPad + i * stepH,
  }))

  // Construct cubic bezier path between each pair of points
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const mid = (p0.y + p1.y) / 2
    // Alternate side-to-side meander for the "river" effect
    const sway = i % 2 === 0 ? 22 : -22
    d += ` C ${p0.x + sway} ${mid - 10}, ${p1.x - sway} ${mid + 10}, ${p1.x} ${p1.y}`
  }

  // Gradient stops — primary color
  return (
    <svg
      width={W}
      height={totalH}
      viewBox={`0 0 ${W} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="river-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.6" />
          <stop offset="33%"  stopColor="#8b5cf6" stopOpacity="0.7" />
          <stop offset="66%"  stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="river-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="50%"  stopColor="#8b5cf6" stopOpacity="0.10" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Wide glow path */}
      <path
        d={d}
        stroke="url(#river-glow)"
        strokeWidth={18}
        strokeLinecap="round"
        fill="none"
        style={{ filter: "blur(6px)" }}
      />

      {/* Solid base path */}
      <path
        d={d}
        stroke="hsl(var(--border))"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />

      {/* Animated flowing gradient path */}
      <path
        d={d}
        stroke="url(#river-grad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="12 8"
        strokeDashoffset={dashOffset}
        fill="none"
      />

      {/* Step dots on the river */}
      {points.map((p, i) => (
        <g key={i}>
          {/* Outer ring */}
          <circle
            cx={p.x}
            cy={p.y}
            r={10}
            fill="hsl(var(--card))"
            stroke={stepColors[i]?.dot ?? "hsl(var(--primary))"}
            strokeWidth={1.5}
            opacity={0.8}
          />
          {/* Inner filled dot */}
          <circle
            cx={p.x}
            cy={p.y}
            r={4}
            fill={stepColors[i]?.dot ?? "hsl(var(--primary))"}
          />
        </g>
      ))}
    </svg>
  )
}

export function ProcessSection() {
  const { t, tObj } = useTranslation()
  const steps = tObj<{ title: string; description: string }[]>("process.steps")

  return (
    <section className="relative px-6 py-24 overflow-hidden">
      {/* Subtle background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(var(--primary)/0.03) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t("process.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("process.title")}
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {t("process.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* River + steps */}
        <div className="flex items-start gap-6 sm:gap-10">
          {/* River SVG — vertically aligned with step cards */}
          <div
            className="sticky top-24 self-start mt-1"
            style={{ paddingTop: 32 }}
          >
            <RiverSVG steps={steps.length || 4} />
          </div>

          {/* Step cards column */}
          <div className="flex flex-col flex-1 gap-0">
            {steps.map((step, i) => {
              const Icon    = stepIcons[i]
              const palette = stepColors[i] ?? stepColors[0]

              return (
                <AnimatedSection key={i} delay={i * 130}>
                  <div
                    className="group relative pb-4"
                    style={{ minHeight: 168 }}
                  >
                    <div
                      className={`
                        relative rounded-2xl border bg-card p-6 transition-all duration-300
                        hover:shadow-md hover:-translate-y-0.5
                        ${palette.border}
                      `}
                    >
                      {/* Step label + number */}
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${palette.bg}`}
                        >
                          <Icon className={`h-5 w-5 ${palette.icon}`} />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {t("process.stepLabel")}{" "}
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mb-2 text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Subtle bottom accent line */}
                      <div
                        className={`
                          absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300
                          group-hover:opacity-100
                        `}
                        style={{ background: palette.dot }}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}