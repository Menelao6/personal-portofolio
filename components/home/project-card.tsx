"use client"

import { useState } from "react"
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isEven = index % 2 === 0
  const { t } = useTranslation()

  const title = t(`${project.i18nKey}.title`)
  const shortDescription = t(`${project.i18nKey}.shortDescription`)

  const minSwipeDistance = 50

  const handleNextImage = () => {
    if (isAnimating) return
    setDirection('next')
    setIsAnimating(true)
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      setIsAnimating(false)
    }, 600)
  }

  const handlePrevImage = () => {
    if (isAnimating) return
    setDirection('prev')
    setIsAnimating(true)
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
      setIsAnimating(false)
    }, 600)
  }

  const handleDotClick = (dotIndex: number) => {
    if (isAnimating || dotIndex === currentImageIndex) return
    setDirection(dotIndex > currentImageIndex ? 'next' : 'prev')
    setIsAnimating(true)
    
    setTimeout(() => {
      setCurrentImageIndex(dotIndex)
      setIsAnimating(false)
    }, 600)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
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

  // Calculate card positions in the stack
  const getCardStyle = (imgIndex: number) => {
    const position = imgIndex - currentImageIndex
    const totalCards = project.images.length
    
    // Normalize position to handle circular array
    let normalizedPos = position
    if (position > totalCards / 2) {
      normalizedPos = position - totalCards
    } else if (position < -totalCards / 2) {
      normalizedPos = position + totalCards
    }

    // Base styles
    let style: React.CSSProperties = {
      transformStyle: 'preserve-3d',
      transition: isAnimating ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 0.4s ease-out',
    }

    if (normalizedPos === 0) {
      // Active card - front and center
      style = {
        ...style,
        transform: isAnimating && direction === 'next' 
          ? 'translateX(120%) translateY(-20%) scale(0.85) rotateY(-15deg) rotateZ(5deg)'
          : isAnimating && direction === 'prev'
          ? 'translateX(-120%) translateY(-20%) scale(0.85) rotateY(15deg) rotateZ(-5deg)'
          : 'translateX(0) translateY(0) scale(1) rotateY(0deg) rotateZ(0deg)',
        zIndex: 50,
        opacity: isAnimating ? 0 : 1,
        filter: 'brightness(1) blur(0px)',
      }
    } else if (normalizedPos === 1) {
      // Next card - slightly to the right
      style = {
        ...style,
        transform: isAnimating && direction === 'next'
          ? 'translateX(0) translateY(0) scale(1) rotateY(0deg) rotateZ(0deg)'
          : 'translateX(20%) translateY(8%) scale(0.92) rotateY(-8deg) rotateZ(-3deg)',
        zIndex: 40,
        opacity: isAnimating && direction === 'next' ? 1 : 0.7,
        filter: 'brightness(0.9) blur(1px)',
      }
    } else if (normalizedPos === -1) {
      // Previous card - slightly to the left
      style = {
        ...style,
        transform: isAnimating && direction === 'prev'
          ? 'translateX(0) translateY(0) scale(1) rotateY(0deg) rotateZ(0deg)'
          : 'translateX(-20%) translateY(8%) scale(0.92) rotateY(8deg) rotateZ(3deg)',
        zIndex: 40,
        opacity: isAnimating && direction === 'prev' ? 1 : 0.7,
        filter: 'brightness(0.9) blur(1px)',
      }
    } else if (normalizedPos === 2) {
      // Second next card
      style = {
        ...style,
        transform: 'translateX(35%) translateY(16%) scale(0.84) rotateY(-12deg) rotateZ(-5deg)',
        zIndex: 30,
        opacity: 0.5,
        filter: 'brightness(0.8) blur(2px)',
      }
    } else if (normalizedPos === -2) {
      // Second previous card
      style = {
        ...style,
        transform: 'translateX(-35%) translateY(16%) scale(0.84) rotateY(12deg) rotateZ(5deg)',
        zIndex: 30,
        opacity: 0.5,
        filter: 'brightness(0.8) blur(2px)',
      }
    } else if (normalizedPos > 2) {
      // Far right cards
      style = {
        ...style,
        transform: 'translateX(50%) translateY(24%) scale(0.76) rotateY(-15deg) rotateZ(-8deg)',
        zIndex: 20,
        opacity: 0.3,
        filter: 'brightness(0.7) blur(3px)',
      }
    } else {
      // Far left cards
      style = {
        ...style,
        transform: 'translateX(-50%) translateY(24%) scale(0.76) rotateY(15deg) rotateZ(8deg)',
        zIndex: 20,
        opacity: 0.3,
        filter: 'brightness(0.7) blur(3px)',
      }
    }

    return style
  }

  return (
    <div
      className={`flex flex-col gap-36 lg:flex-row lg:items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Project visual - Stacked Card Carousel */}
      <div className="flex-1">
        <div className="group relative overflow-visible rounded-xl">
          <div 
            className="relative aspect-video select-none"
            style={{ perspective: '1200px' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Card stack container */}
            <div className="relative h-full w-full">
              {project.images.map((image, imgIndex) => {
                const cardStyle = getCardStyle(imgIndex)
                const isActive = imgIndex === currentImageIndex

                return (
                  <div
                    key={imgIndex}
                    className="absolute inset-0 will-change-transform"
                    style={cardStyle}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-border bg-card shadow-2xl">
                      <Image
                        src={image}
                        alt={`${title} - Screenshot ${imgIndex + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={imgIndex === 0}
                      />
                      
                      {/* Gradient overlay for better badge visibility */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Number badge on active card */}
                      {isActive && (
                        <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-500">
                          <span className="text-xl font-bold font-mono text-primary-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      
                      {/* Image counter */}
                      {isActive && project.images.length > 1 && (
                        <div className="absolute right-6 top-6 rounded-xl bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                          {imgIndex + 1} / {project.images.length}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  disabled={isAnimating}
                  className="absolute -left-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background p-3 shadow-xl transition-all hover:bg-accent hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-border"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  disabled={isAnimating}
                  className="absolute -right-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background p-3 shadow-xl transition-all hover:bg-accent hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-border"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {project.images.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 z-50 flex -translate-x-1/2 gap-2.5 rounded-full bg-background/80 px-4 py-3 backdrop-blur-md border border-border shadow-lg">
                {project.images.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => handleDotClick(dotIndex)}
                    disabled={isAnimating}
                    className={`h-2.5 rounded-full transition-all ${
                      dotIndex === currentImageIndex
                        ? "w-10 bg-primary"
                        : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                    } disabled:cursor-not-allowed`}
                    aria-label={`Go to image ${dotIndex + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Swipe hint for mobile */}
            {project.images.length > 1 && (
              <div className="absolute left-1/2 -bottom-12 z-50 -translate-x-1/2 text-xs text-muted-foreground md:hidden">
                ← Swipe →
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-1 flex-col gap-4 mt-8 lg:mt-0">
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