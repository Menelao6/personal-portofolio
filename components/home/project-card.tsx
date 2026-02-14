"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/content/projects"
import { useTranslation } from "@/lib/i18n/context"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isEven = index % 2 === 0
  const { t } = useTranslation()

  const title = t(`${project.i18nKey}.title`)
  const shortDescription = t(`${project.i18nKey}.shortDescription`)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleNextImage = () => {
    setDirection('right')
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const handlePrevImage = () => {
    setDirection('left')
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const handleDotClick = (dotIndex: number) => {
    setDirection(dotIndex > currentImageIndex ? 'right' : 'left')
    setCurrentImageIndex(dotIndex)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0) // Reset touch end
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNextImage()
    } else if (isRightSwipe) {
      handlePrevImage()
    }
  }

  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Project visual - Interactive Image Gallery */}
      <div className="flex-1">
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
          <div 
            className="relative aspect-video bg-muted/50 select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Stacked images container */}
            <div className="relative h-full w-full p-4 perspective-1000">
              {project.images.map((image, imgIndex) => {
                const offset = imgIndex - currentImageIndex
                const isActive = imgIndex === currentImageIndex
                const isPrev = offset === -1 || (currentImageIndex === 0 && imgIndex === project.images.length - 1)
                const isNext = offset === 1 || (currentImageIndex === project.images.length - 1 && imgIndex === 0)
                
                // Calculate z-index and transformations for 3D stack effect
                let zIndex = 0
                let transform = ''
                let opacity = 0
                let filter = ''
                
                if (isActive) {
                  zIndex = 30
                  transform = 'translateX(0) translateZ(0) scale(1) rotateY(0deg)'
                  opacity = 1
                  filter = 'blur(0px) brightness(1)'
                } else if (isPrev) {
                  zIndex = 20
                  transform = 'translateX(-15%) translateZ(-40px) scale(0.88) rotateY(28deg)'
                  opacity = 0.6
                  filter = 'blur(1px) brightness(0.85)'
                } else if (isNext) {
                  zIndex = 20
                  transform = 'translateX(15%) translateZ(-40px) scale(0.88) rotateY(-28deg)'
                  opacity = 0.6
                  filter = 'blur(1px) brightness(0.85)'
                } else if (offset < -1 || (currentImageIndex === 0 && imgIndex > 1)) {
                  zIndex = 10
                  transform = 'translateX(-25%) translateZ(-80px) scale(0.75) rotateY(35deg)'
                  opacity = 0.3
                  filter = 'blur(2px) brightness(0.7)'
                } else {
                  zIndex = 10
                  transform = 'translateX(25%) translateZ(-80px) scale(0.75) rotateY(-35deg)'
                  opacity = 0.3
                  filter = 'blur(2px) brightness(0.7)'
                }

                return (
                  <div
                    key={imgIndex}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      zIndex,
                      transform,
                      opacity,
                      filter,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border/50 bg-background shadow-2xl">
                      <Image
                        src={image}
                        alt={`${title} - Screenshot ${imgIndex + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={imgIndex === 0}
                      />
                      {/* Number badge on active image */}
                      {isActive && (
                        <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/95 text-primary-foreground shadow-lg backdrop-blur-sm animate-in fade-in zoom-in duration-500">
                          <span className="text-lg font-bold font-mono">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      {/* Image counter */}
                      {isActive && project.images.length > 1 && (
                        <div className="absolute right-4 top-4 rounded-lg bg-background/95 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                          {imgIndex + 1} / {project.images.length}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation arrows - hidden on touch devices */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-background/90 p-2.5 shadow-xl backdrop-blur-sm transition-all hover:bg-background hover:scale-110 active:scale-95 md:block"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-background/90 p-2.5 shadow-xl backdrop-blur-sm transition-all hover:bg-background hover:scale-110 active:scale-95 md:block"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-full bg-background/60 px-3 py-2 backdrop-blur-sm">
                {project.images.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => handleDotClick(dotIndex)}
                    className={`h-2 rounded-full transition-all ${
                      dotIndex === currentImageIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-foreground/30 hover:bg-foreground/50"
                    }`}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Swipe hint for mobile */}
            {project.images.length > 1 && (
              <div className="absolute left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm md:hidden">
                Swipe to browse
              </div>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="text-2xl font-bold text-foreground">{title}</h3>

        <p className="leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((techItem) => (
            <span
              key={techItem}
              className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {techItem}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button asChild variant="default" size="sm" className="gap-2">
            <Link href={`/projects/${project.slug}`}>
              {t("projectCard.viewDetails")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                {t("projectCard.live")}
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" />
                {t("projectCard.code")}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}