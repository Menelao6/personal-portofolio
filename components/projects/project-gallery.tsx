"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Play,
  Pause,
  LayoutGrid,
  Monitor,
  FileText,
  Download,
  Expand,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: string[]
  projectTitle: string
  pdfUrl?: string
}

// ─── Body scroll lock ─────────────────────────────────────────────────────────
// overflow:hidden only — position:fixed breaks Next.js scroll restoration

function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [active])
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[]
  index: number
  projectTitle: string
  onClose: () => void
  onNav: (i: number) => void
}

function Lightbox({ images, index, projectTitle, onClose, onNav }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false)

  // Stable refs — keyboard handler captures these without going stale
  const indexRef  = useRef(index)
  const zoomedRef = useRef(zoomed)
  indexRef.current  = index
  zoomedRef.current = zoomed

  useLockBodyScroll(true)

  // Reset zoom on image change
  useEffect(() => { setZoomed(false) }, [index])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return }
      if (zoomedRef.current) return
      if (e.key === "ArrowLeft")
        onNav((indexRef.current - 1 + images.length) % images.length)
      if (e.key === "ArrowRight")
        onNav((indexRef.current + 1) % images.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length])

  return (
    <>
      <style>{`
        @keyframes _lbin { from{opacity:0} to{opacity:1} }
        @keyframes _lbimg { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Full-viewport overlay */}
      <div
        className="fixed inset-0 z-[300] flex flex-col"
        style={{ background: "rgba(0,0,0,0.97)", animation: "_lbin 0.15s ease both" }}
      >
        {/* Top bar */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              {projectTitle}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="tabular-nums font-mono text-xs text-white/60">
              {index + 1} / {images.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed((z) => !z)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                zoomed
                  ? "bg-white/25 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              )}
              title={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
              title="Close (ESC)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          {/* Prev */}
          {images.length > 1 && !zoomed && (
            <button
              onClick={() => onNav((index - 1 + images.length) % images.length)}
              className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {!zoomed ? (
            // Normal view — contained, centered
            <div
              className="relative w-full cursor-zoom-in"
              style={{
                height: "calc(100vh - 180px)",
                maxWidth: "min(1280px, 100%)",
                animation: "_lbimg 0.18s ease both",
              }}
              onClick={() => setZoomed(true)}
            >
              <Image
                key={index}
                src={images[index]}
                alt={`${projectTitle} — ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>
          ) : (
            // Zoomed — 2× scrollable
            <div
              className="h-full w-full cursor-zoom-out overflow-auto"
              onClick={() => setZoomed(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`z-${index}`}
                src={images[index]}
                alt={`${projectTitle} — ${index + 1}`}
                style={{
                  width: "200%",
                  height: "auto",
                  display: "block",
                  animation: "_lbimg 0.18s ease both",
                }}
              />
            </div>
          )}

          {/* Next */}
          {images.length > 1 && !zoomed && (
            <button
              onClick={() => onNav((index + 1) % images.length)}
              className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex-shrink-0 border-t border-white/10 bg-black/60 px-4 py-3 backdrop-blur-sm">
            <div className="flex justify-center gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => onNav(i)}
                  className={cn(
                    "relative flex-shrink-0 overflow-hidden rounded-md transition-all",
                    i === index
                      ? "scale-105 ring-2 ring-primary ring-offset-1 ring-offset-black"
                      : "opacity-40 hover:opacity-80 hover:scale-105"
                  )}
                  style={{ width: 72, height: 48 }}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="72px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        {!zoomed && (
          <div className="pointer-events-none absolute bottom-20 right-4 flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 font-mono text-[10px] text-white/30">
            {images.length > 1 && (
              <>
                <kbd className="rounded bg-white/10 px-1">←</kbd>
                <kbd className="rounded bg-white/10 px-1">→</kbd>
                <span className="mx-1">navigate</span>
              </>
            )}
            <kbd className="rounded bg-white/10 px-1">ESC</kbd>
            <span>close</span>
          </div>
        )}
      </div>
    </>
  )
}

// ─── PDF Viewer ───────────────────────────────────────────────────────────────

function PDFViewer({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {title} — Presentation
          </span>
        </div>
        <a
          href={url}
          download
          className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </a>
      </div>
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        style={{ height: "70vh", minHeight: 480 }}
      >
        <iframe
          src={`${url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
          className="h-full w-full"
          title={`${title} presentation`}
          allowFullScreen
        />
      </div>
    </div>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────

type ViewMode = "slideshow" | "grid"
type Tab = "screenshots" | "presentation"

export function ProjectGallery({ images, projectTitle, pdfUrl }: ProjectGalleryProps) {
  const [tab, setTab]                     = useState<Tab>("screenshots")
  const [viewMode, setViewMode]           = useState<ViewMode>("slideshow")
  const [current, setCurrent]             = useState(0)
  const [lightboxOpen, setLightboxOpen]   = useState(false)
  const [lightboxIdx, setLightboxIdx]     = useState(0)
  const [playing, setPlaying]             = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hasPdf    = Boolean(pdfUrl)
  const hasImages = images.length > 0

  // Autoplay
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!playing || viewMode !== "slideshow" || images.length < 2) return
    intervalRef.current = setInterval(() => {
      goTo((c: number) => (c + 1) % images.length)
    }, 3500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, viewMode, images.length])

  const goTo = useCallback((updater: number | ((c: number) => number)) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrent((c) => typeof updater === "function" ? updater(c) : updater)
      setTransitioning(false)
    }, 150)
  }, [])

  const openLightbox  = useCallback((i: number) => {
    setLightboxIdx(i)
    setLightboxOpen(true)
    setPlaying(false)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  if (!hasImages && !hasPdf) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-card/50">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span className="font-mono text-2xl font-black">{projectTitle.charAt(0)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Media coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Tabs */}
      {hasPdf && hasImages && (
        <div className="mb-4 flex w-fit gap-1 rounded-xl border border-border bg-muted/30 p-1">
          {([
            { key: "screenshots",  label: "Screenshots",  Icon: Monitor  },
            { key: "presentation", label: "Presentation", Icon: FileText },
          ] as const).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tab === key
                  ? "border border-border bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* PDF */}
      {tab === "presentation" && pdfUrl && (
        <PDFViewer url={pdfUrl} title={projectTitle} />
      )}

      {/* Screenshots */}
      {tab === "screenshots" && hasImages && (
        <div className="flex flex-col gap-4">
          {/* View mode bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
              {([
                { key: "slideshow", Icon: Monitor,    label: "Slideshow" },
                { key: "grid",      Icon: LayoutGrid, label: "Grid"      },
              ] as const).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  onClick={() => { setViewMode(key); setPlaying(false) }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                    viewMode === key
                      ? "border border-border bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <span className="tabular-nums font-mono text-xs text-muted-foreground">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Slideshow */}
          {viewMode === "slideshow" && (
            <div className="flex flex-col gap-3">
              <div
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                style={{ aspectRatio: "16/9" }}
              >
                {/* Crossfade */}
                <div
                  className="absolute inset-0 transition-opacity duration-150"
                  style={{ opacity: transitioning ? 0 : 1 }}
                >
                  <Image
                    src={images[current]}
                    alt={`${projectTitle} — ${current + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                    unoptimized
                  />
                </div>

                {/* Vignette */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.15) 100%)" }}
                />

                {/* Prev/Next on hover */}
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={() => goTo((c) => (c - 1 + images.length) % images.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => goTo((c) => (c + 1) % images.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}

                {/* Top-right: play + expand */}
                <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {images.length > 1 && (
                    <button
                      onClick={() => setPlaying((p) => !p)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full shadow backdrop-blur-sm transition-all hover:scale-105",
                        playing ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground"
                      )}
                    >
                      {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                  )}
                  <button
                    onClick={() => openLightbox(current)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur-sm transition-all hover:scale-105"
                    title="Open fullscreen"
                  >
                    <Expand className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Counter */}
                {images.length > 1 && (
                  <div className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 font-mono text-xs tabular-nums text-foreground shadow backdrop-blur-sm">
                    {current + 1} / {images.length}
                  </div>
                )}

                {/* Progress dots */}
                {images.length > 1 && images.length <= 10 && (
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === current ? "w-5 bg-primary" : "w-1.5 bg-white/50 hover:bg-white/80"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Filmstrip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => { goTo(i); setPlaying(false) }}
                      className={cn(
                        "relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105",
                        i === current
                          ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ width: 100, height: 64 }}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="100px" unoptimized />
                      {i === current && <div className="absolute inset-0 bg-primary/10" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Grid */}
          {viewMode === "grid" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card shadow transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={img}
                    alt={`${projectTitle} — ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 448px"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-background/0 transition-all duration-300 group-hover:scale-100 group-hover:bg-background/90">
                      <Maximize2 className="h-4 w-4 text-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          projectTitle={projectTitle}
          onClose={closeLightbox}
          onNav={setLightboxIdx}
        />
      )}
    </>
  )
}