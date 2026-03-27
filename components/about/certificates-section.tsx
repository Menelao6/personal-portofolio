"use client"

import { Award, X, ZoomIn, ExternalLink } from "lucide-react"
import { certificates } from "@/content/certificates"
import { AnimatedSection } from "@/components/animated-section"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/context"

// Extend the Certificate type to include image paths.
// Add `image` and optionally `credentialUrl` to your certificates.ts entries.
interface CertificateWithImage {
  i18nKey: string
  image?: string        // Path to certificate image, e.g. "/assets/certs/meta-frontend.jpg"
  credentialUrl?: string // Link to verify the credential
}

// ─── Certificate image lightbox ──────────────────────────────────────────────

function CertLightbox({
  src,
  title,
  onClose,
}: {
  src: string
  title: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl bg-card border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Certificate image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="w-full h-auto block"
          style={{ maxHeight: "80vh", objectFit: "contain" }}
        />

        {/* Title bar */}
        <div className="border-t border-border px-5 py-3">
          <p className="text-sm font-medium text-foreground">{title}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CertificatesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxTitle, setLightboxTitle] = useState<string>("")
  const { t, ta } = useTranslation()

  // Cast to our extended type — add image/credentialUrl to your certificates.ts
  const certsExtended = certificates as CertificateWithImage[]

  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <span className="mb-2 block font-mono text-sm text-primary uppercase tracking-wider">
            {t("certificates.label")}
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("certificates.title")}
          </h2>
        </AnimatedSection>

        <div className="mt-10 flex flex-col gap-4">
          {certsExtended.map((cert, i) => {
            const title = t(`${cert.i18nKey}.title`)
            const issuer = t(`${cert.i18nKey}.issuer`)
            const courses = ta(`${cert.i18nKey}.courses`)
            const isOpen = expandedIndex === i

            return (
              <AnimatedSection key={cert.i18nKey} delay={i * 100}>
                <div
                  className={cn(
                    "rounded-2xl border bg-card overflow-hidden transition-all duration-300",
                    isOpen
                      ? "border-primary/30 shadow-md"
                      : "border-border hover:border-border/80"
                  )}
                >
                  {/* Header row */}
                  <button
                    onClick={() =>
                      setExpandedIndex(isOpen ? null : i)
                    }
                    className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-muted/40"
                  >
                    {/* Icon / thumbnail */}
                    <div className="relative flex-shrink-0">
                      {cert.image ? (
                        <div
                          className="h-14 w-14 rounded-xl overflow-hidden border border-border group/thumb cursor-zoom-in"
                          onClick={(e) => {
                            e.stopPropagation()
                            setLightboxSrc(cert.image!)
                            setLightboxTitle(title)
                          }}
                          title="View certificate"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cert.image}
                            alt={`${title} certificate`}
                            className="w-full h-full object-cover transition-transform group-hover/thumb:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                            <ZoomIn className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Award className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground leading-snug">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {t("certificates.issuedBy")} {issuer}
                      </p>
                      {courses.length > 0 && (
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {courses.length} courses completed
                        </p>
                      )}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Verify
                        </a>
                      )}
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 4l4 4 4-4" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded: courses + full cert image preview */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-[600px]" : "max-h-0"
                    )}
                  >
                    <div className="border-t border-border/50 px-6 pb-6 pt-5 flex flex-col gap-5">
                      {/* Certificate image preview */}
                      {cert.image && (
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Certificate
                          </p>
                          <button
                            onClick={() => {
                              setLightboxSrc(cert.image!)
                              setLightboxTitle(title)
                            }}
                            className="group relative w-full max-w-sm rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cert.image}
                              alt={`${title} certificate`}
                              className="w-full h-auto block"
                              style={{ maxHeight: 200, objectFit: "cover" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-white text-sm font-medium">
                                <ZoomIn className="h-4 w-4" />
                                View full
                              </div>
                            </div>
                          </button>
                        </div>
                      )}

                      {/* Courses */}
                      {courses.length > 0 && (
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {t("certificates.completedCourses")}
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {courses.map((course) => (
                              <div
                                key={course}
                                className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
                              >
                                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                <span className="text-sm text-foreground">
                                  {course}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <CertLightbox
          src={lightboxSrc}
          title={lightboxTitle}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </section>
  )
}