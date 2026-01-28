'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function LazyVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Generate poster path from video src if not provided
  const posterSrc = poster || src.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
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

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isInView) return

    // Set the src and load the video
    video.src = src
    video.load()

    const handleCanPlay = () => {
      setHasLoaded(true)
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay was prevented, that's okay
        })
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    return () => video.removeEventListener('canplay', handleCanPlay)
  }, [isInView, src, autoPlay])

  return (
    <video
      ref={videoRef}
      poster={posterSrc}
      className={className}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none"
      style={{
        backgroundColor: '#0a0a0a', // Fallback color while loading
      }}
    />
  )
}

// For the hero marquee - priority videos load immediately, others lazy load
export function MarqueeVideo({
  src,
  className = '',
  priority = false,
}: {
  src: string
  className?: string
  priority?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(priority)

  const posterSrc = src.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')

  useEffect(() => {
    // Priority videos load immediately, skip observer
    if (priority) return

    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [priority])

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.src = src
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [shouldLoad, src])

  return (
    <video
      ref={videoRef}
      poster={posterSrc}
      className={className}
      loop
      muted
      playsInline
      preload={priority ? 'auto' : 'none'}
      style={{ backgroundColor: '#0a0a0a' }}
    />
  )
}
