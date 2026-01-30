'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function ProductShowcase() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sectionVisible = useInView(ref, { margin: '0px' })

  // Play/pause video based on section visibility
  useEffect(() => {
    if (videoRef.current) {
      if (sectionVisible) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [sectionVisible])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real-time. <span className="gradient-text">Interactive.</span> Local-first.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Combine bleeding-edge AI capabilities into a controllable bespoke workflow for video, games, and beyond.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur-lg" />
          
          {/* Video wrapper */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <video
              ref={videoRef}
              src="/videos/video-8.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto"
              style={{ backgroundColor: '#0a0a0a' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
