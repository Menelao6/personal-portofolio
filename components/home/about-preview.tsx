"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"
import { useEffect, useRef } from "react"

// Replace with your actual image
const ABOUT_IMG = "/assets/photos/casual3.jpeg"

/** Parallax tilt on scroll */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewH   = window.innerHeight
      const progress = (center - viewH / 2) / (viewH / 2) // -1 to 1
      el.style.setProperty("--parallax", `${progress * 30}px`)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className="relative" style={{ overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-none"
        style={{ transform: "translateY(var(--parallax, 0px))", scale: "1.08" }}
      />
    </div>
  )
}

export function AboutPreview() {
  const { t, tObj } = useTranslation()

  const statsValue = tObj<unknown>("aboutPreview.stats")
  const stats = Array.isArray(statsValue)
    ? (statsValue as { value: string; label: string }[])
    : Object.values(
        (statsValue as Record<string, { value: string; label: string }>) ?? {}
      )

  return (
    <section className="relative px-6 py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* ── Left: image + floating stats ─────────────────────────────── */}
          <AnimatedSection delay={100}>
            <div className="relative">
              {/* Main image — slightly tilted */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/30"
                style={{
                  aspectRatio: "4/5",
                  maxHeight: 520,
                  transform: "rotate(-1.5deg)",
                }}
              >
                <ParallaxImage src={ABOUT_IMG} alt="Menelaos" />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)/0.12) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Floating stat cards — overlapping the image */}
              {stats.slice(0, 2).map((stat, i) => (
                <div
                  key={stat.label}
                  className="absolute rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-xl text-center"
                  style={
                    i === 0
                      ? { top: "12%", right: "-12%", minWidth: 110 }
                      : { bottom: "14%", left: "-10%", minWidth: 120 }
                  }
                >
                  <p className="text-2xl font-black text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}

              {/* Third stat — bottom right, rotated slightly */}
              {stats[2] && (
                <div
                  className="absolute -bottom-4 right-4 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-xl text-center"
                  style={{ minWidth: 110, transform: "rotate(1deg)" }}
                >
                  <p className="text-2xl font-black text-primary leading-none">
                    {stats[2].value}
                  </p>
                  <p className="mt-1 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    {stats[2].label}
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* ── Right: editorial text ─────────────────────────────────────── */}
          <AnimatedSection delay={200}>
            <div className="flex flex-col gap-6 lg:pl-6">
              {/* Eyebrow */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {t("aboutPreview.label")}
                </span>
                {/* Decorative rule */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/50" />
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance leading-[1.15]">
                {t("aboutPreview.title")}
              </h2>

              {/* Pull-quote style first paragraph */}
              <p className="relative pl-5 text-base leading-relaxed text-muted-foreground border-l-2 border-primary/30 italic">
                {t("aboutPreview.p1")}
              </p>

              {/* Second paragraph — regular */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("aboutPreview.p2")}
              </p>

              {/* Remaining stat(s) if more than 3 */}
              {stats.length > 3 && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {stats.slice(3).map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-0.5 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="text-xl font-black text-primary">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {t("aboutPreview.cta") ?? "Read more about me"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}