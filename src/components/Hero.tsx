'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef } from 'react'
import { MarqueeBento } from './ui/SkewedMarquee'

const videos = [
  '/videos/video-1.mp4',
  '/videos/video-2.mp4',
  '/videos/video-3.mp4',
  '/videos/video-4.mp4',
  '/videos/video-5.mp4',
  '/videos/video-6.mp4',
  '/videos/video-7.mp4',
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-24 pb-20"
    >

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center px-3 py-1.5 rounded-full glass mb-8 mt-20"
        >
          <span className="px-2 py-0.5 text-xs font-mono rounded text-white/80">Scope v0.1.0-beta.3</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          <span className="block">The open stack for</span>
          <span className="gradient-text">real-time generative AI</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12"
        >
          The tools, APIs, and community to build interactive AI experiences — from video to games and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#download"
            className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
            </svg>
            <span>Download</span>
          </a>
          <a
            href="#workflows"
            className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
          >
            <Play className="w-5 h-5" />
            <span>Learn</span>
          </a>
        </motion.div>

      </motion.div>

      {/* Skewed Video Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="
          absolute top-[400px] lg:top-[530px]
          left-0 right-0
          h-[800px]
          overflow-hidden
          pointer-events-none
          z-10
        "
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center bottom',
        }}
      >
        {/* tilted plane */}
        <div
          className="
            absolute left-1/2
            top-[15%] md:top-[10%] lg:top-[0%]
            z-20
          "
          style={{
            transform: 'translateX(-50%) rotateX(22deg)',
            transformOrigin: 'center top',
          }}
        >
          <div className="opacity-80">
            <MarqueeBento videos={videos} duration={140} />
          </div>
        </div>

        {/* fade from background at top to transparent */}
        <div 
          className="absolute inset-x-0 top-0 h-32 z-30 backdrop-blur-sm" 
          style={{
            background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)'
          }}
        />
        
        {/* fade from background on left */}
        <div 
          className="absolute inset-y-0 left-0 w-80 z-30" 
          style={{
            background: 'linear-gradient(to right, var(--background) 0%, transparent 100%)'
          }}
        />
        
        {/* fade from background on right */}
        <div 
          className="absolute inset-y-0 right-0 w-80 z-30" 
          style={{
            background: 'linear-gradient(to left, var(--background) 0%, transparent 100%)'
          }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-muted"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
