"use client"

import Link from "next/link"
import { ArrowDown, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n/context"

export function Hero() {
  const { t, ta } = useTranslation()
  const roles = ta("hero.roles")
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (roles.length === 0) return
    const current = roles[roleIndex % roles.length]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 60)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, 35)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex, roles])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Status badge */}
        <div className="mb-8 animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm text-muted-foreground">
            {t("hero.badge")}
          </span>
        </div>

        {/* Name & title */}
        <h1
          className="animate-fade-in-up text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "100ms" }}
        >
          {t("hero.greeting")}{" "}
          <span className="text-primary">Menelaos</span>
        </h1>

        <div
          className="mt-4 flex h-10 items-center animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <span className="font-mono text-xl text-muted-foreground sm:text-2xl">
            {displayed}
          </span>
          <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-primary" />
        </div>

        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground animate-fade-in-up sm:text-lg"
          style={{ animationDelay: "300ms" }}
        >
          {t("hero.description")}
        </p>

        {/* CTA buttons */}
        <div
          className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up sm:flex-row"
          style={{ animationDelay: "400ms" }}
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/about#contact">
              <Mail className="h-4 w-4" />
              {t("hero.cta.contact")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/about">
              <FileText className="h-4 w-4" />
              {t("hero.cta.cv")}
            </Link>
          </Button>
        </div>

        {/* Tech badges */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  )
}
