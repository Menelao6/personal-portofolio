"use client"

import { MapPin, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { useTranslation } from "@/lib/i18n/context"
import { useEffect, useRef } from "react"

const HERO_IMAGE = "/assets/photos/main-profile.jpeg"
const FLOATING_IMAGE_1 = "/assets/photos/ass1.jpg"
const FLOATING_IMAGE_2 = "/assets/photos/casual.jpeg"

function FloatingImage({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame: number
    let startY = 0
    let mouseX = 0
    let mouseY = 0
    let currentRotateX = 0
    let currentRotateY = 0
    let currentTranslateY = startY

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX = (e.clientX - cx) / 20
      mouseY = -(e.clientY - cy) / 20
    }

    const animate = (t: number) => {
      const floatY = Math.sin(t / 1800) * 10
      currentTranslateY += (floatY - currentTranslateY) * 0.05
      currentRotateX += (mouseY - currentRotateX) * 0.06
      currentRotateY += (mouseX - currentRotateY) * 0.06

      el.style.transform = `
        perspective(800px)
        translateY(${currentTranslateY}px)
        rotateX(${currentRotateX}deg)
        rotateY(${currentRotateY}deg)
      `
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouse)
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouse)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        transition: "box-shadow 0.3s ease",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ display: "block" }}
      />
    </div>
  )
}

export function AboutHero() {
  const { t, tObj } = useTranslation()

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <AnimatedSection>
            <div className="flex flex-col items-start gap-6">
              {/* Status badge */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  {t("aboutHero.badge")}
                </span>
              </div>

              <div>
                <p className="font-mono text-sm text-primary mb-2 tracking-wider uppercase">
                  {t("aboutHero.eyebrow")}
                </p>
                <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance leading-[1.1]">
                  {t("aboutHero.title")}{" "}
                  <span className="relative inline-block text-primary">
                    Menelaos
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-primary/40"
                    />
                  </span>
                </h1>
              </div>

              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                {t("aboutHero.bio")}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t("aboutHero.location")}
                </div>

                <Button variant="outline" size="sm" className="gap-2 group">
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  {t("aboutHero.downloadCv")}
                </Button>
              </div>

              {/* Quick stat pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(tObj("aboutHero.stats") ?? []).map((s: any) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs"
                  >
                    <span className="font-semibold text-foreground">
                      {s.label}
                    </span>
                    <span className="text-muted-foreground">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: 3D floating image composition */}
          <AnimatedSection delay={200}>
            <div className="relative flex items-center justify-center h-[400px] lg:h-[480px]">
              {/* Main image — large, center */}
              <FloatingImage
                src={HERO_IMAGE}
                alt="Menelaos — main photo"
                className="absolute rounded-2xl overflow-hidden shadow-2xl border border-border/40"
                style={{
                  width: 290,
                  height: 350,
                  top: "50%",
                  left: "50%",
                  marginTop: -160,
                  marginLeft: -130,
                  zIndex: 2,
                }}
              />

              {/* Floating image top-left */}
              <FloatingImage
                src={FLOATING_IMAGE_1}
                alt="Menelaos working"
                className="absolute rounded-xl overflow-hidden border border-border/40 shadow-xl"
                style={{
                  width: 160,
                  height: 180,
                  top: "10%",
                  left: "2%",
                  zIndex: 3,
                  // slight extra translate offset so it floats differently
                }}
              />

              {/* Floating image bottom-right */}
              <FloatingImage
                src={FLOATING_IMAGE_2}
                alt="Menelaos casual"
                className="absolute rounded-xl overflow-hidden border border-border/40 shadow-xl"
                style={{
                  width: 150,
                  height: 165,
                  bottom: "6%",
                  right: "2%",
                  zIndex: 3,
                }}
              />

              {/* Decorative card — tech stack */}
              <div
                className="absolute rounded-xl border border-border bg-card/90 backdrop-blur-sm px-4 py-3 shadow-lg z-10 flex flex-col gap-1"
                style={{ bottom: "12%", left: "0%", minWidth: 150 }}
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1">
                  {(tObj("aboutHero.stack") ?? []).map((t: string) => (
                    <span
                      key={t}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative card — location */}
              <div
                className="absolute rounded-xl border border-border bg-card/90 backdrop-blur-sm px-4 py-3 shadow-lg z-10"
                style={{ top: "8%", right: "0%", minWidth: 140 }}
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {t("aboutHero.basedIn")}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {t("aboutHero.country")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}