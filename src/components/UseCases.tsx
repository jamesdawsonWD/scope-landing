'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Microscope, Palette, Mic, Video, LucideIcon } from 'lucide-react'
import { findYourLane } from '@/content/copy'
import { renderText } from '@/lib/renderText'
import { trackUseCaseViewed, trackUseCaseClick } from '@/lib/analytics'

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Microscope,
  Palette,
  Mic,
  Video,
}

// Build audiences with icon components
const audiences = findYourLane.audiences.map(audience => ({
  ...audience,
  iconComponent: iconMap[audience.icon] || Video,
}))

const AUTO_PLAY_INTERVAL = 5000 // 5 seconds per card

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sectionVisible = useInView(ref, { margin: '0px' })
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % audiences.length
    setActiveIndex(nextIndex)
    setProgress(0)
    // Track use case view when auto-advancing
    trackUseCaseViewed(audiences[nextIndex].id, audiences[nextIndex].title)
  }, [activeIndex])

  // Auto-play timer - runs continuously
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_PLAY_INTERVAL / 50))
        if (newProgress >= 100) {
          goToNext()
          return 0
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [goToNext])

  // Reset progress when manually selecting
  const handleSelect = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
    // Track manual use case selection
    trackUseCaseClick(audiences[index].id, audiences[index].title)
  }

  return (
    <section 
      className="py-24 md:py-32 relative overflow-hidden" 
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {renderText(findYourLane.heading)}
          </h2>
          <p className="text-base md:text-lg text-muted max-w-xl mx-auto">
            {renderText(findYourLane.subtitle)}
          </p>
        </motion.div>

        {/* 2x2 Grid of Audience Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {audiences.map((audience, index) => (
            <AudienceCard 
              key={audience.id} 
              audience={audience} 
              index={index}
              isInView={isInView}
              isActive={index === activeIndex}
              sectionVisible={sectionVisible}
              onSelect={() => handleSelect(index)}
              progress={index === activeIndex ? progress : 0}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AudienceCard({ 
  audience, 
  index,
  isInView,
  isActive,
  sectionVisible,
  onSelect,
  progress,
}: { 
  audience: (typeof audiences)[0]
  index: number
  isInView: boolean
  isActive: boolean
  sectionVisible: boolean
  onSelect: () => void
  progress: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const Icon = audience.iconComponent

  // Get card dimensions for SVG
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Play video when active and section visible
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const shouldPlay = isActive && sectionVisible

    if (shouldPlay) {
      // Load and play video
      if (!video.src || !video.src.includes(audience.video)) {
        video.src = audience.video
        video.load()
      }
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isActive, sectionVisible, audience.video])

  // Calculate perimeter for stroke-dasharray
  const radius = 16
  const perimeter = dimensions.width && dimensions.height 
    ? 2 * (dimensions.width + dimensions.height) - 8 * radius + 2 * Math.PI * radius
    : 1000

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onClick={onSelect}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer min-h-[280px] md:min-h-[320px] ${
        !isActive ? 'border border-card-border hover:border-white/20' : ''
      }`}
    >
      {/* Animated SVG border that traces around the card */}
      {isActive && dimensions.width > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          {/* Background border (dim) */}
          <rect
            x="0.5"
            y="0.5"
            width={dimensions.width - 1}
            height={dimensions.height - 1}
            rx={radius}
            ry={radius}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Animated border (bright) */}
          <rect
            x="0.5"
            y="0.5"
            width={dimensions.width - 1}
            height={dimensions.height - 1}
            rx={radius}
            ry={radius}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: perimeter,
              strokeDashoffset: perimeter - (progress / 100) * perimeter,
              transition: 'stroke-dashoffset 0.05s linear',
            }}
          />
        </svg>
      )}

      {/* Video Background - full visibility */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          poster={audience.video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
          muted
          loop
          playsInline
          preload="none"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#0a0a0a' }}
        />
        {/* Gradient only at bottom for text readability */}
        <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Inactive state background */}
      {!isActive && (
        <div className="absolute inset-0 bg-card z-0" />
      )}

      {/* Content - positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
            isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/5'
          }`}>
            <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-white/60'
            }`} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {audience.title}
          </h3>
        </div>
        <p className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
          isActive ? 'text-white/90' : 'text-white/50'
        }`}>
          {audience.description}
        </p>
      </div>
    </motion.div>
  )
}
