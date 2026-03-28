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
  /** Optional PDF path, e.g. "/assets/presentations/my-project.pdf" */
  pdfUrl?: string
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (active) {
      const scrollY = window.scrollY
      document.body.style.cssText = `overflow:hidden;position:fixed;top:-${scrollY}px;left:0;right:0;`
    } else {
      const scrollY = document.body.style.top
      document.body.style.cssText = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [active])
}

// ─── Fullscreen Lightbox ──────────────────────────────────────────────────────

interface LightboxProps {
  images: string[]
  index: number
  projectTitle: string
  onClose: () => void
  onNav: (i: number) => void
}

function Lightbox({ images, index, projectTitle, onClose, onNav }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imgRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && !zoomed) onNav((index - 1 + images.length) % images.length)
      if (e.key === "ArrowRight" && !zoomed) onNav((index + 1) % images.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, images.length, zoomed, onClose, onNav])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed || !imgRef.current) return
    const r = imgRef.current.getBoundingClientRect()
    setZoomPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }, [zoomed])

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/96 backdrop-blur-sm"
      style={{ animation: "lb-in 0.18s ease" }}
    >
      <style>{`
        @keyframes lb-in { from { opacity:0 } to { opacity:1 } }
        @keyframes lb-slide { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
            {projectTitle}
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="font-mono text-xs text-white/60 tabular-nums">
            {index + 1} / {images.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setZoomed(!zoomed); setZoomPos({ x: 50, y: 50 }) }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              zoomed
                ? "bg-primary/20 text-primary"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            )}
            title={zoomed ? "Zoom out (Z)" : "Zoom in (Z)"}
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            title="Close (ESC)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="relative flex flex-1 min-h-0 items-center justify-center overflow-hidden">
        {/* Prev */}
        {images.length > 1 && !zoomed && (
          <button
            onClick={() => onNav((index - 1 + images.length) % images.length)}
            className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onClick={() => { setZoomed(!zoomed); setZoomPos({ x: 50, y: 50 }) }}
          className={cn(
            "relative w-full h-full",
            zoomed ? "cursor-zoom-out overflow-auto" : "cursor-zoom-in flex items-center justify-center p-4"
          )}
          style={
            zoomed
              ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
              : undefined
          }
        >
          {!zoomed ? (
            <div
              className="relative max-w-5xl w-full"
              style={{ maxHeight: "calc(100vh - 160px)", animation: "lb-slide 0.2s ease" }}
            >
              <Image
                src={images[index]}
                alt={`${projectTitle} screenshot ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg object-contain shadow-2xl"
                style={{ maxHeight: "calc(100vh - 160px)" }}
                priority
                unoptimized
              />
            </div>
          ) : (
            <img
              src={images[index]}
              alt={`${projectTitle} screenshot ${index + 1}`}
              className="w-auto h-auto"
              style={{ minWidth: "160%", cursor: "zoom-out" }}
            />
          )}
        </div>

        {/* Next */}
        {images.length > 1 && !zoomed && (
          <button
            onClick={() => onNav((index + 1) % images.length)}
            className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 border-t border-white/10 bg-black/60 backdrop-blur-sm py-3 px-4">
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { onNav(i); setZoomed(false) }}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-md transition-all",
                  i === index
                    ? "ring-2 ring-primary opacity-100 scale-105"
                    : "opacity-40 hover:opacity-80 hover:scale-105"
                )}
                style={{ width: 72, height: 48 }}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="72px" unoptimized />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      {!zoomed && (
        <div className="absolute bottom-20 right-4 pointer-events-none flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-white/40 font-mono">
          <kbd className="rounded bg-white/10 px-1">←</kbd>
          <kbd className="rounded bg-white/10 px-1">→</kbd>
          <span className="mx-1">navigate</span>
          <kbd className="rounded bg-white/10 px-1">ESC</kbd>
          <span>close</span>
        </div>
      )}
    </div>
  )
}

// ─── PDF Viewer ───────────────────────────────────────────────────────────────

function PDFViewer({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Action bar */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{title} — Presentation</span>
        </div>
        <a
          href={url}
          download
          className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </a>
      </div>

      {/* Embedded PDF */}
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        style={{ height: "70vh", minHeight: 480 }}
      >
        <iframe
          src={`${url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
          className="w-full h-full"
          title={`${title} presentation PDF`}
          allowFullScreen
        />
        {/* Fallback overlay — shown only if iframe fails */}
        <noscript>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">PDF preview requires a modern browser.</p>
            <a
              href={url}
              download
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Download PDF
            </a>
          </div>
        </noscript>
      </div>
    </div>
  )
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────

type ViewMode = "grid" | "slideshow"
type Tab = "screenshots" | "presentation"

export function ProjectGallery({ images, projectTitle, pdfUrl }: ProjectGalleryProps) {
  const [tab, setTab]             = useState<Tab>("screenshots")
  const [viewMode, setViewMode]   = useState<ViewMode>("slideshow")
  const [current, setCurrent]     = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx]   = useState(0)
  const [playing, setPlaying]     = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  const hasPdf = Boolean(pdfUrl)
  const hasImages = images.length > 0

  // Slideshow autoplay
  useEffect(() => {
    if (playing && viewMode === "slideshow") {
      intervalRef.current = setInterval(() => {
        navigate((c: number) => (c + 1) % images.length)
      }, 3500)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, viewMode, images.length])

  const navigate = useCallback((updater: ((c: number) => number) | number) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(typeof updater === "function" ? updater : () => updater)
      setTransitioning(false)
    }, 180)
  }, [])

  const openLightbox = (i: number) => {
    setLightboxIdx(i)
    setLightboxOpen(true)
    setPlaying(false)
  }

  if (!hasImages && !hasPdf) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-card/50">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span className="text-2xl font-black font-mono">{projectTitle.charAt(0)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Media coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      {hasPdf && hasImages && (
        <div className="mb-4 flex gap-1 rounded-xl border border-border bg-muted/30 p-1 w-fit">
          {[
            { key: "screenshots", label: "Screenshots", icon: Monitor },
            { key: "presentation", label: "Presentation", icon: FileText },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as Tab)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tab === key
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── PDF Tab ───────────────────────────────────────────────────────── */}
      {tab === "presentation" && pdfUrl && (
        <PDFViewer url={pdfUrl} title={projectTitle} />
      )}

      {/* ── Screenshots Tab ───────────────────────────────────────────────── */}
      {tab === "screenshots" && hasImages && (
        <div className="flex flex-col gap-4">
          {/* View mode toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
              {[
                { key: "slideshow", icon: Monitor, label: "Slideshow" },
                { key: "grid",      icon: LayoutGrid, label: "Grid" },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => { setViewMode(key as ViewMode); setPlaying(false) }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                    viewMode === key
                      ? "bg-card text-foreground shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  title={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Counter */}
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── SLIDESHOW ─────────────────────────────────────────────────── */}
          {viewMode === "slideshow" && (
            <div className="flex flex-col gap-3">
              {/* Main stage */}
              <div
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                style={{ aspectRatio: "16/9" }}
              >
                {/* Image with crossfade */}
                <div
                  className="absolute inset-0 transition-opacity duration-200"
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

                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)",
                  }}
                />

                {/* Controls overlay — shown on hover */}
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => navigate((c) => (c - 1 + images.length) % images.length)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm hover:bg-background transition-all hover:scale-105"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigate((c) => (c + 1) % images.length)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm hover:bg-background transition-all hover:scale-105"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Top-right action buttons */}
                <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {images.length > 1 && (
                    <button
                      onClick={() => setPlaying(!playing)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm shadow transition-all hover:scale-105",
                        playing
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/80 text-foreground"
                      )}
                      title={playing ? "Pause" : "Play slideshow"}
                    >
                      {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                  )}
                  {/* <button
                    onClick={() => openLightbox(current)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur-sm transition-all hover:scale-105"
                    title="Fullscreen"
                  >
                    <Expand className="h-3.5 w-3.5" />
                  </button> */}
                </div>

                {/* Counter pill */}
                {images.length > 1 && (
                  <div className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-xs font-mono tabular-nums backdrop-blur-sm text-foreground shadow">
                    {current + 1} / {images.length}
                  </div>
                )}

                {/* Progress dots */}
                {images.length > 1 && images.length <= 10 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === current
                            ? "w-5 bg-primary"
                            : "w-1.5 bg-white/50 hover:bg-white/80"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Filmstrip thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => { navigate(i); setPlaying(false) }}
                      className={cn(
                        "relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105",
                        i === current
                          ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ width: 100, height: 64 }}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100px"
                        unoptimized
                      />
                      {i === current && (
                        <div className="absolute inset-0 bg-primary/10" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── GRID ──────────────────────────────────────────────────────── */}
          {viewMode === "grid" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card shadow transition-all hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5"
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/0 group-hover:bg-background/90 transition-all duration-300 scale-75 group-hover:scale-100">
                      <Maximize2 className="h-4 w-4 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  {/* Index */}
                  <div className="absolute left-2 top-2 rounded-md bg-background/70 px-1.5 py-0.5 text-[10px] font-mono text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          projectTitle={projectTitle}
          onClose={() => setLightboxOpen(false)}
          onNav={setLightboxIdx}
        />
      )}
    </>
  )
}