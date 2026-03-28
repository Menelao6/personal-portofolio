"use client"

import Link from "next/link"
import { Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState, useCallback } from "react"
import { useTranslation } from "@/lib/i18n/context"

// ── Replace with your actual image paths ────────────────────────────────────
const HERO_IMG_FRONT = "/assets/photos/main-profile.jpeg"
const HERO_IMG_BACK   = "/assets/photos/casual.jpeg"
// ────────────────────────────────────────────────────────────────────────────

/** Live clock in the hero — shows current time in CET */
function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Tirane",
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="font-mono text-xs tabular-nums text-muted-foreground">
      TIA {time}
    </span>
  )
}

/** Text scramble on mount, cycling through roles */
function ScrambleRole({ roles }: { roles: string[] }) {
  const [text, setText] = useState("")
  const [roleIdx, setRoleIdx] = useState(0)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const frameRef = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const scramble = useCallback(
    (target: string, onDone: () => void) => {
      let iteration = 0
      cancelAnimationFrame(frameRef.current)
      const run = () => {
        setText(
          target
            .split("")
            .map((ch, i) =>
              i < iteration
                ? ch
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
        )
        if (iteration < target.length) {
          iteration += 0.4
          frameRef.current = requestAnimationFrame(run)
        } else {
          setText(target)
          onDone()
        }
      }
      frameRef.current = requestAnimationFrame(run)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (roles.length === 0) return
    const next = () => {
      setRoleIdx((prev) => {
        const idx = (prev + 1) % roles.length
        scramble(roles[idx], () => {
          timeoutRef.current = setTimeout(next, 2800)
        })
        return idx
      })
    }
    scramble(roles[0], () => {
      timeoutRef.current = setTimeout(next, 2800)
    })
    return () => {
      cancelAnimationFrame(frameRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [roles, scramble])

  return (
    <span className="font-mono text-base text-primary sm:text-lg">
      {text}
      <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-primary" />
    </span>
  )
}

/** 3D card stack with mouse tracking */
function HeroImageStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frontRef     = useRef<HTMLDivElement>(null)
  const backRef      = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number>(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const r  = el.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      target.current = {
        x: ((e.clientY - cy) / r.height) * -18,
        y: ((e.clientX - cx) / r.width)  *  18,
      }
    }
    const handleLeave = () => { target.current = { x: 0, y: 0 } }

    window.addEventListener("mousemove", handleMove)
    containerRef.current?.addEventListener("mouseleave", handleLeave)

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      current.current.x = lerp(current.current.x, target.current.x, 0.07)
      current.current.y = lerp(current.current.y, target.current.y, 0.07)

      const { x, y } = current.current
      if (frontRef.current) {
        frontRef.current.style.transform = `
          perspective(900px)
          rotateX(${x}deg) rotateY(${y}deg)
          translateZ(0)
        `
      }
      if (backRef.current) {
        backRef.current.style.transform = `
          perspective(900px)
          rotateX(${x * 0.6}deg) rotateY(${y * 0.6}deg)
          translate(-18px, 18px) translateZ(-40px)
        `
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: 340, height: 420, flexShrink: 0 }}
    >
      {/* Back card */}
      <div
        ref={backRef}
        className="absolute inset-0 rounded-2xl overflow-hidden border border-border/30 shadow-xl"
        style={{
          willChange: "transform",
          transform: "perspective(900px) translate(-18px, 18px) translateZ(-40px)",
          background: "hsl(var(--card))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG_BACK}
          alt=""
          className="w-full h-full object-cover opacity-90"
        />
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-background/10" />
      </div>

      {/* Front card */}
      <div
        ref={frontRef}
        className="absolute inset-0 rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
        style={{ willChange: "transform" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG_FRONT}
          alt="Menelaos"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)/0.7) 0%, transparent 50%)",
          }}
        />

        {/* Card label */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-mono text-white/70 uppercase tracking-widest">
              Frontend Dev
            </p>
            <p className="text-sm font-semibold text-white">Menelaos</p>
          </div>
          <div className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
        </div>
      </div>

      {/* Floating accent — top right */}
      <div
        className="absolute -top-5 -right-5 rounded-xl border border-border bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg text-center"
        style={{ zIndex: 10 }}
      >
        <p className="text-[10px] font-mono text-muted-foreground">projects</p>
        <p className="text-lg font-bold text-primary leading-none">10+</p>
      </div>

      {/* Floating accent — bottom left */}
      <div
        className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card/90 backdrop-blur-sm px-3 py-2 shadow-lg"
        style={{ zIndex: 10 }}
      >
        <p className="text-[10px] font-mono text-muted-foreground">open to</p>
        <p className="text-xs font-semibold text-foreground">new roles</p>
      </div>
    </div>
  )
}

// ── Main Hero ────────────────────────────────────────────────────────────────

export function Hero() {
  const { t, ta } = useTranslation()
  const roles     = ta("hero.roles")
  const techStack = ta("hero.tech")

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.04) 0%, transparent 65%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Top bar — status + clock */}
        <div className="mb-10 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {t("hero.badge")}
            </span>
          </div>
          <LiveClock />
        </div>

        {/* Main content — asymmetric split */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: editorial text block */}
          <div className="flex-1 min-w-0">
            {/* Thin rule + eyebrow */}
            <div
              className="mb-5 flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "80ms" }}
            >
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Frontend Developer
              </span>
              <div className="h-px w-8 bg-border" />
            </div>

            {/* Name — editorial large */}
            <h1
              className="animate-fade-in-up text-[clamp(3.5rem,10vw,6.5rem)] font-black leading-[0.88] tracking-tighter text-foreground"
              style={{ animationDelay: "150ms" }}
            >
              {t("hero.greeting")}{" "}
              <br />
              <span
                className="text-primary"
                style={{
                  WebkitTextStroke: "1px hsl(var(--primary))",
                }}
              >
                Menelaos
              </span>
            </h1>

            {/* Scramble role */}
            <div
              className="mt-5 animate-fade-in-up"
              style={{ animationDelay: "250ms" }}
            >
              <ScrambleRole roles={roles} />
            </div>

            {/* Description */}
            <p
              className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground animate-fade-in-up sm:text-base"
              style={{ animationDelay: "350ms" }}
            >
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: "450ms" }}
            >
              <Button asChild size="lg" className="gap-2 rounded-xl">
                <Link href="/about#contact">
                  <Mail className="h-4 w-4" />
                  {t("hero.cta.contact")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-xl"
              >
                <Link href="/about">
                  <FileText className="h-4 w-4" />
                  {t("hero.cta.cv")}
                </Link>
              </Button>
            </div>

            {/* Tech stack pills */}
            <div
              className="mt-8 flex flex-wrap gap-2 animate-fade-in-up"
              style={{ animationDelay: "550ms" }}
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 3D image stack — hidden on mobile, visible lg+ */}
          <div
            className="hidden lg:flex lg:items-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <HeroImageStack />
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="mt-16 flex items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="h-px flex-1 bg-border/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
            Scroll
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>
      </div>
    </section>
  )
}