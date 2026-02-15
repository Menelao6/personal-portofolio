"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
  projectTitle: string
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
        setIsZoomed(false)
      } else if (e.key === 'ArrowLeft' && !isZoomed) {
        handlePrevLightbox()
      } else if (e.key === 'ArrowRight' && !isZoomed) {
        handleNextLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, lightboxIndex, images.length, isZoomed])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLightboxOpen])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    setIsZoomed(false)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setIsZoomed(false)
  }

  if (images.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex aspect-video items-center justify-center bg-muted/30 p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <span className="text-3xl font-bold font-mono">
                {projectTitle.charAt(0)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Project screenshots coming soon
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="relative aspect-video bg-muted/30">
            <Image
              src={images[currentIndex]}
              alt={`${projectTitle} - Screenshot ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 shadow-xl backdrop-blur-sm transition-all hover:bg-background hover:scale-110 active:scale-95 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 shadow-xl backdrop-blur-sm transition-all hover:bg-background hover:scale-110 active:scale-95 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Expand button */}
            {/* <button
              onClick={() => openLightbox(currentIndex)}
              className="absolute right-4 top-4 rounded-full bg-background/80 p-2.5 shadow-xl backdrop-blur-sm transition-all hover:bg-background hover:scale-110 active:scale-95 group z-10"
              aria-label="Open fullscreen"
            >
              <Maximize2 className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button> */}



            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute left-4 top-4 rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm shadow-lg z-10">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip - ALWAYS visible on main gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                  index === currentIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                style={{ width: '120px', height: '80px' }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  unoptimized
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-primary/10" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* Top Controls Bar - ALWAYS visible */}
          <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2">
              {/* Zoom buttons */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              </button>
              
              {/* Counter */}
              {images.length > 1 && (
                <div className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {lightboxIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image Area */}
          <div className="absolute inset-0" style={{ paddingTop: '72px', paddingBottom: images.length > 1 ? '120px' : '20px' }}>
            {!isZoomed ? (
              // NOT ZOOMED - Image fits viewport nicely
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={images[lightboxIndex]}
                    alt={`${projectTitle} - Screenshot ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            ) : (
              // ZOOMED - Image is scrollable at full resolution
              <div className="w-full h-full overflow-auto">
                <div className="min-w-full inline-block">
                  <img
                    src={images[lightboxIndex]}
                    alt={`${projectTitle} - Screenshot ${lightboxIndex + 1}`}
                    className="w-auto"
                    style={{ minWidth: '200%', height: 'auto' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Arrows - Only when NOT zoomed */}
          {images.length > 1 && !isZoomed && (
            <>
              <button
                onClick={handlePrevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={handleNextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] rounded-full bg-white/10 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Bottom Thumbnail Strip - ALWAYS at bottom, OUTSIDE image area */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-[110] bg-gradient-to-t from-black/90 to-transparent pt-8 pb-4">
              <div className="flex gap-2 overflow-x-auto px-4 mx-auto max-w-full justify-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLightboxIndex(index)
                      setIsZoomed(false)
                    }}
                    className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                      index === lightboxIndex
                        ? 'border-white ring-2 ring-white/50'
                        : 'border-white/30 hover:border-white/70'
                    }`}
                    style={{ width: '80px', height: '60px' }}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                    {index === lightboxIndex && (
                      <div className="absolute inset-0 bg-white/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 z-[110] text-xs text-white/70 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg pointer-events-none">
            {isZoomed ? (
              <>Scroll to view • Click zoom to reset</>
            ) : (
              <>
                {images.length > 1 && (
                  <>
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">←</kbd>{' '}
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded">→</kbd>{' '}
                  </>
                )}
                <kbd className="px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd> Close
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}