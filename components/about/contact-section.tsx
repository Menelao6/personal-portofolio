"use client"

import { useState } from "react"
import { Send, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/context"

export function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return // bot trap

    setSending(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(t("contact.form.success"))
    setFormData({ name: "", email: "", message: "", honeypot: "" })
    setSending(false)
  }

  return (
    <section id="contact" className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <span className="mb-2 block font-mono text-sm text-primary">
              {t("contact.label")}
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("contact.title")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("contact.subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:hello@menelaos.dev"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5 text-primary" />
                hello@menelaos.dev
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
                }
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t("contact.form.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t("contact.form.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <Button type="submit" className="gap-2" disabled={sending}>
                <Send className="h-4 w-4" />
                {sending ? t("contact.form.sending") : t("contact.form.send")}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
