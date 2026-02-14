"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/tools", label: t("nav.devTools") },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-sm font-semibold text-foreground">
            Menelaos
          </span>
          <span className="text-xs text-muted-foreground">
            {t("footer.role")}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:hello@menelaos.dev"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Menelaos. {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
