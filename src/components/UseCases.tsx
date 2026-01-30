'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Drama, Gamepad2, Clapperboard, Bot, FlaskConical, Globe, Microscope, Palette, Mic, Video } from 'lucide-react'

const audiences = [
  {
    id: 'researchers',
    icon: Microscope,
    title: 'Researchers & tinkerers',
    handle: '@researcher',
    description: 'You want something to build on top of. Scope is your sandbox — break things, push boundaries, publish what you find.',
    quote: 'Scope is the fastest way to prototype new ideas in real-time AI video.',
    video: '/videos/video-4.mp4',
    favoriteFeature: {
      icon: FlaskConical,
      name: 'Pure experimentation',
      description: 'Try the latest models the moment they drop. No gatekeepers.',
    },
    topUseCase: {
      icon: Globe,
      name: 'World models',
      description: 'AI that simulates physics and environments in real-time.',
    },
  },
  {
    id: 'creative-tech',
    icon: Palette,
    title: 'Creative technologists',
    handle: '@creativecoder',
    description: 'You already live in TouchDesigner, ComfyUI, or custom code. Scope adds real-time AI video to what you\'re already doing.',
    quote: 'Scope integrates perfectly into my existing creative coding workflow.',
    video: '/videos/video-5.mp4',
    favoriteFeature: {
      icon: Clapperboard,
      name: 'Instant pre-viz',
      description: 'See AI VFX concepts instantly instead of waiting hours for a render.',
    },
    topUseCase: {
      icon: Gamepad2,
      name: 'Interactive stories',
      description: 'Choose-your-own-adventure experiences powered by world models.',
    },
  },
  {
    id: 'performers',
    icon: Mic,
    title: 'Performers & VJs',
    handle: '@livevj',
    description: 'You need AI visuals that react live. No pre-renders, no canned loops. Scope transforms your set as it happens.',
    quote: 'Finally, AI visuals that actually react to my set in real-time.',
    video: '/videos/video-7.mp4',
    favoriteFeature: {
      icon: Drama,
      name: 'Live performances',
      description: 'AI visuals that react to you, your audience, your music. No pre-renders.',
    },
    topUseCase: {
      icon: Bot,
      name: 'AI avatars',
      description: 'Characters that exist in real-time, not as pre-recorded clips.',
    },
  },
  {
    id: 'creators',
    icon: Video,
    title: 'AI-native creators',
    handle: '@aicreator',
    description: 'You\'re making stuff with AI every day. Scope is the fastest way to iterate on video ideas.',
    quote: 'Scope is incrementally turning my workflow into something entirely new.',
    video: '/videos/video-3.mp4',
    favoriteFeature: {
      icon: Clapperboard,
      name: 'Instant pre-viz',
      description: 'See AI VFX concepts instantly instead of waiting hours for a render.',
    },
    topUseCase: {
      icon: Drama,
      name: 'Live performances',
      description: 'AI visuals that react to you, your audience, your music.',
    },
  },
]

const AUTO_SCROLL_INTERVAL = 6000

export default function UseCases() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sectionVisible = useInView(ref, { margin: '0px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const activeAudience = audiences[activeIndex]

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = 420 // card width + gap
    const scrollPosition = index * cardWidth
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    setActiveIndex(index)
    setProgress(0)
  }, [])

  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % audiences.length
    scrollToIndex(nextIndex)
  }, [scrollToIndex])

  const goToPrev = useCallback(() => {
    const prevIndex = activeIndexRef.current === 0 ? audiences.length - 1 : activeIndexRef.current - 1
    scrollToIndex(prevIndex)
  }, [scrollToIndex])

  // Auto-scroll timer
  useEffect(() => {
    if (isPaused) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (AUTO_SCROLL_INTERVAL / 50))
        if (newProgress >= 100) {
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
    const cardWidth = 420
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < audiences.length) {
      setActiveIndex(newIndex)
      setProgress(0)
    }
  }

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            AI video is going real-time.
            <br />
            <span className="gradient-text">Are you?</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Most AI video tools render clips after the fact. Scope works while you work — transforming video as it happens.
          </p>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-white/50 mb-12"
        >
          Built for people like you.
        </motion.p>

        {/* Audience Cards Carousel */}
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
            className="overflow-x-auto pb-4 scrollbar-hide"
          >
            <div className="flex gap-5 px-[calc(50%-200px)]" style={{ width: 'max-content' }}>
              {audiences.map((audience, index) => (
                <AudienceCard 
                  key={audience.id} 
                  audience={audience} 
                  index={index} 
                  isActive={index === activeIndex}
                  sectionVisible={sectionVisible}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
        </motion.div>

        {/* Navigation Controls */}
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
            {audiences.map((_, index) => (
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

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 mb-16" />

        {/* Content area - changes based on active audience */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
          >
            {/* Left side - Features */}
            <div className="space-y-6">
              {/* Favorite Feature */}
              <div>
                <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                  Favorite Feature:
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 flex items-center gap-2">
                    <activeAudience.favoriteFeature.icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">{activeAudience.favoriteFeature.name}</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed pl-1">
                  {activeAudience.favoriteFeature.description}
                </p>
              </div>

              {/* Top Use Case */}
              <div>
                <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                  Top Use Case:
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white/10 flex items-center gap-2">
                    <activeAudience.topUseCase.icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">{activeAudience.topUseCase.name}</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed pl-1">
                  {activeAudience.topUseCase.description}
                </p>
              </div>
            </div>

            {/* Right side - Quote */}
            <div className="flex items-center">
              <div className="relative">
                {/* Quote marks */}
                <span className="absolute -top-4 -left-2 text-5xl text-white/10 font-serif">"</span>
                <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed pl-6">
                  {activeAudience.description}
                </blockquote>
                <span className="absolute -bottom-8 right-0 text-5xl text-white/10 font-serif">"</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function AudienceCard({ 
  audience, 
  index, 
  isActive,
  sectionVisible,
  onClick 
}: { 
  audience: (typeof audiences)[0]
  index: number
  isActive: boolean
  sectionVisible: boolean
  onClick: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play/pause video based on active state AND section visibility
  useEffect(() => {
    if (videoRef.current && audience.video) {
      const shouldPlay = isActive && sectionVisible
      
      if (shouldPlay) {
        if (!videoRef.current.src || !videoRef.current.src.includes(audience.video)) {
          videoRef.current.src = audience.video
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
  }, [isActive, sectionVisible, audience.video])

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
      onClick={onClick}
      className="group block flex-shrink-0 w-[400px] cursor-pointer"
    >
      <div className={`relative h-[450px] rounded-2xl bg-card border overflow-hidden transition-all duration-300 ${
        isActive ? 'border-white/30' : 'border-card-border hover:border-white/20'
      }`}>
        {/* Video background */}
        <AnimatePresence>
          {audience.video && isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                poster={audience.video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#0a0a0a' }}
              />
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inactive state gradient overlay */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        )}

        <div className="relative flex flex-col justify-between h-full p-8">
          {/* Top section - Icon and badge */}
          <div className="flex items-start justify-between">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/10'
            }`}>
              <audience.icon className="w-7 h-7 text-white" />
            </div>
            <motion.span 
              animate={{ 
                scale: isActive ? 1 : 0.95,
                opacity: isActive ? 1 : 0.7
              }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm"
            >
              {audience.handle}
            </motion.span>
          </div>

          {/* Bottom section - Title and description */}
          <div>
            <motion.h3 
              animate={{ 
                scale: isActive ? 1 : 0.98,
              }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white mb-3"
            >
              {audience.title}
            </motion.h3>
            <motion.p
              animate={{
                opacity: isActive ? 0.8 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="text-sm text-white/60 leading-relaxed line-clamp-3"
            >
              {audience.quote}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
