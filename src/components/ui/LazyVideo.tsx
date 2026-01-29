'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  /** If true, video loads immediately without lazy loading (use for hero/above-fold content) */
  priority?: boolean
  /** External control to pause video */
  paused?: boolean
}

/**
 * Optimized video component that:
 * - Lazy loads videos when they approach the viewport
 * - Pauses videos when they leave the viewport (memory optimization)
 * - Resumes videos when they re-enter the viewport
 * - Supports priority loading for above-fold content
 */
export function OptimizedVideo({
  src,
  poster,
  className = '',
  loop = true,
  muted = true,
  playsInline = true,
  priority = false,
  paused = false,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(priority)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Generate poster path from video src if not provided
  const posterSrc = poster || src.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')

  // Intersection observer for lazy loading AND play/pause control
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0,
      }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  // Handle video loading when it comes into view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && !hasLoaded) {
      // Load the video source
      video.src = src
      video.load()
      setHasLoaded(true)
    }
  }, [isInView, hasLoaded, src])

  // Handle play/pause based on visibility and external control
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasLoaded) return

    if (isInView && !paused) {
      video.play().catch(() => {
        // Autoplay was prevented, that's okay
      })
    } else {
      video.pause()
    }
  }, [isInView, hasLoaded, paused])

  return (
    <video
      ref={videoRef}
      poster={posterSrc}
      className={className}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={priority ? 'auto' : 'none'}
      style={{
        backgroundColor: '#0a0a0a', // Fallback color while loading
      }}
    />
  )
}

/**
 * Video component for external URLs (like framerusercontent)
 * These can't use the same poster generation logic
 */
export function ExternalVideo({
  src,
  poster,
  className = '',
  loop = true,
  muted = true,
  playsInline = true,
  priority = false,
  paused = false,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(priority)
  const [hasLoaded, setHasLoaded] = useState(priority)

  // Intersection observer for play/pause control
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        rootMargin: '100px',
        threshold: 0,
      }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  // Handle video loading when it comes into view (for non-priority)
  useEffect(() => {
    const video = videoRef.current
    if (!video || priority) return

    if (isInView && !hasLoaded) {
      video.src = src
      video.load()
      setHasLoaded(true)
    }
  }, [isInView, hasLoaded, src, priority])

  // Handle play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasLoaded) return

    if (isInView && !paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView, hasLoaded, paused])

  return (
    <video
      ref={videoRef}
      src={priority ? src : undefined}
      poster={poster}
      className={className}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={priority ? 'auto' : 'none'}
      style={{
        backgroundColor: '#0a0a0a',
      }}
    />
  )
}

// Legacy exports for backwards compatibility
export { OptimizedVideo as LazyVideo }
export { OptimizedVideo as MarqueeVideo }
