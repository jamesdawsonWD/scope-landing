'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MarqueeBento } from './ui/SkewedMarquee'
import { TrailingButton } from './ui/TrailingButton'
import { hero, navigation } from '@/content/copy'
import { renderText } from '@/lib/renderText'
import { trackCTAClick } from '@/lib/analytics'

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
        className="relative z-20 max-w-4xl mx-auto px-4 md:px-6 min-[375px]:text-center flex flex-col min-[375px]:items-center"
      >
        {/* Program Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 mt-20"
        >
          <TrailingButton
            href={navigation.programBanner.href}
            onClick={() => trackCTAClick('Join Program Banner', 'hero', 'secondary')}
          >
            {navigation.programBanner.label}
          </TrailingButton>
        </motion.div>

        {/* Main Heading - H1 for SEO */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left min-[375px]:text-center"
        >
          <span className="gradient-text">{renderText(hero.heading)}</span>
        </motion.h1>

        {/* Description - keyword-rich intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-xl text-muted max-w-2xl min-[375px]:mx-auto mb-12 text-left min-[375px]:text-center"
        >
          {renderText(hero.description)}
        </motion.p>

        {/* CTA Button - always centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center mb-16 w-full"
        >
          <a
            href={hero.cta.primary.href}
            className="btn-primary flex items-center gap-3 text-lg px-8 py-4"
            onClick={() => trackCTAClick('Download Scope', 'hero', 'primary')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span>Download Scope</span>
              <span className="text-xs opacity-60 font-normal">v0.1.0-beta.3</span>
            </span>
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
          className="absolute inset-y-0 left-0 w-8 md:w-80 z-30" 
          style={{
            background: 'linear-gradient(to right, var(--background) 0%, transparent 100%)'
          }}
        />
        
        {/* fade from background on right */}
        <div 
          className="absolute inset-y-0 right-0 w-8 md:w-80 z-30" 
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
