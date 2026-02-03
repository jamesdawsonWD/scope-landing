'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { models } from '@/content/copy'
import { renderText } from '@/lib/renderText'
import { trackModelCardView, trackModelCardClick } from '@/lib/analytics'

const AUTO_SCROLL_INTERVAL = 5000 // 5 seconds

export default function Models() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  // Track if section is currently visible (not once, continuous)
  const sectionVisible = useInView(ref, { margin: '0px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    // On mobile: full viewport width - 32px padding + 16px gap
    // On desktop: 500px + 20px gap
    const isMobile = window.innerWidth < 768
    const cardWidth = isMobile ? (window.innerWidth - 32 + 16) : 520
    const scrollPosition = index * cardWidth
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    setActiveIndex(index)
    setProgress(0)
    // Track model card view
    trackModelCardView(models.items[index].name, index)
  }, [])

  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % models.items.length
    scrollToIndex(nextIndex)
  }, [scrollToIndex])

  const goToPrev = useCallback(() => {
    const prevIndex = activeIndexRef.current === 0 ? models.items.length - 1 : activeIndexRef.current - 1
    scrollToIndex(prevIndex)
  }, [scrollToIndex])

  // Auto-scroll timer - single interval that handles both progress and scrolling
  useEffect(() => {
    if (isPaused) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_SCROLL_INTERVAL / 50))
        if (newProgress >= 100) {
          // Trigger scroll when progress completes
          goToNext()
          return 0
        }
        return newProgress
      })
    }, 50)

    return () => {
      clearInterval(progressInterval)
    }
  }, [isPaused, goToNext])

  // Handle manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const isMobile = window.innerWidth < 768
    const cardWidth = isMobile ? (window.innerWidth - 32 + 16) : 520
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < models.items.length) {
      setActiveIndex(newIndex)
      setProgress(0)
    }
  }

  return (
    <section id="models" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Section Header - with normal padding */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-left min-[375px]:text-center">
            {models.heading.line1}
            <br />
            <span className="gradient-text">{models.heading.line2}</span>
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto text-left min-[375px]:text-center">
            {renderText(models.description)}
          </p>
        </motion.div>
      </div>

      {/* Models Horizontal Scroll - full width on mobile for proper centering */}
      <div className="relative max-w-5xl mx-auto md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:snap-none"
          >
            <div className="flex gap-4 md:gap-5 px-4 md:px-[calc(50%-250px)]" style={{ width: 'max-content' }}>
              {models.items.map((model, index) => (
                <ModelCard 
                  key={model.name} 
                  model={model} 
                  index={index} 
                  isActive={index === activeIndex}
                  sectionVisible={sectionVisible}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Fade edges - hidden on mobile */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none hidden md:block" />
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="p-3 rounded-full bg-card border border-card-border hover:border-white/30 transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
          </button>

          {/* Dots indicator */}
          <div className="flex items-center gap-2">
            {models.items.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow with Timer */}
          <button
            onClick={goToNext}
            className="relative p-3 rounded-full bg-card border border-card-border hover:border-white/30 transition-all duration-300 group"
          >
            {/* Progress circle */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/20"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-white transition-all duration-100"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
              />
            </svg>
            <ChevronRight className="relative w-5 h-5 text-muted group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function ModelCard({ 
  model, 
  index, 
  isActive,
  sectionVisible,
  onClick 
}: { 
  model: (typeof models.items)[0]
  index: number
  isActive: boolean
  sectionVisible: boolean
  onClick: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play/pause video based on active state AND section visibility
  useEffect(() => {
    if (videoRef.current && model.video) {
      const shouldPlay = isActive && sectionVisible
      
      if (shouldPlay) {
        // Load and play video when active and section is visible
        if (!videoRef.current.src || !videoRef.current.src.includes(model.video)) {
          videoRef.current.src = model.video
          videoRef.current.load()
        }
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        if (!isActive) {
          videoRef.current.currentTime = 0
        }
      }
    }
  }, [isActive, sectionVisible, model.video])

  const handleCardClick = () => {
    if (isActive) {
      trackModelCardClick(model.name, model.link)
      window.open(model.link, '_blank', 'noopener,noreferrer')
    } else {
      onClick()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        x: 0,
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
      }}
      onClick={handleCardClick}
      className="group block flex-shrink-0 w-[calc(100vw-32px)] md:w-[500px] cursor-pointer snap-center"
    >
      <div className={`relative h-[320px] md:h-[360px] rounded-2xl bg-card border overflow-hidden transition-all duration-300 ${
        isActive ? 'border-white/30' : 'border-card-border hover:border-white/20'
      }`}>
        {/* Video background */}
        <AnimatePresence>
          {model.video && isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                poster={model.video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#0a0a0a' }}
              />
              {/* Video overlay gradient - bottom only for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active glow (for cards without video) */}
        {!model.video && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`} />
        )}

        <div className="relative flex flex-col justify-between h-full p-8">
          {/* Model type badge */}
          <motion.span 
            animate={{ 
              scale: isActive ? 1 : 0.95,
              opacity: isActive ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
            className="inline-block self-start px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm"
          >
            {model.type}
          </motion.span>

          {/* Model name */}
          <div className="flex items-end justify-between gap-3">
            <motion.h3 
              animate={{ 
                scale: isActive ? 1 : 0.98,
              }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white transition-colors"
            >
              {model.name}
            </motion.h3>
            <a 
              href={model.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 mb-1"
            >
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -8,
                  scale: isActive ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-6 h-6 text-white" />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
