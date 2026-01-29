'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              poster=""
            >
              <source 
                src="https://framerusercontent.com/assets/QEIs2ayJotuQ4U1kheYcb3gNc.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
