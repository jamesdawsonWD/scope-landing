'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Drama, Gamepad2, Clapperboard, Bot, FlaskConical, Globe, LucideIcon } from 'lucide-react'
import { realTimeShowcase, productShowcase } from '@/content/copy'
import { renderText } from '@/lib/renderText'

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Drama,
  Gamepad2,
  Clapperboard,
  Bot,
  FlaskConical,
  Globe,
}

// Build use cases with actual icon components
const useCases = realTimeShowcase.useCases.map(useCase => ({
  ...useCase,
  iconComponent: iconMap[useCase.icon] || Drama,
}))

export default function RealTimeShowcase() {
  const ref = useRef<HTMLDivElement>(null)
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
    <section ref={ref} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-left min-[375px]:text-center">
            {realTimeShowcase.heading.line1}
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto text-left min-[375px]:text-center">
            {renderText(realTimeShowcase.description)}
          </p>
        </motion.div>

        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 max-w-4xl mx-auto"
        >
     
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur-lg" />
            
            {/* Video wrapper */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50">
              <video
                ref={videoRef}
                src={productShowcase.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto"
                style={{ backgroundColor: '#0a0a0a' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 max-w-4xl mx-auto"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.iconComponent
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                className="relative p-4 lg:p-5 rounded-xl border bg-card/80 border-card-border hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2.5 lg:gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Icon className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-sm lg:text-base font-semibold text-white/90">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-white/50 hidden lg:block mt-3">
                  {useCase.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
