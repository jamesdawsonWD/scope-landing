'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Microscope, Palette, Mic, Video } from 'lucide-react'

const audiences = [
  {
    icon: Microscope,
    title: 'Researchers & tinkerers',
    description: 'You want something to build on top of. Scope is your sandbox — break things, push boundaries, publish what you find.',
  },
  {
    icon: Palette,
    title: 'Creative technologists',
    description: 'You already live in TouchDesigner, ComfyUI, or custom code. Scope adds real-time AI video to what you\'re already doing.',
  },
  {
    icon: Mic,
    title: 'Performers & VJs',
    description: 'You need AI visuals that react live. No pre-renders, no canned loops. Scope transforms your set as it happens.',
  },
  {
    icon: Video,
    title: 'AI-native creators',
    description: 'You\'re making stuff with AI every day. Scope is the fastest way to iterate on video ideas.',
  },
]

export default function AudienceMirror() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find your <span className="gradient-text">lane</span>
          </h2>
        </motion.div>

        {/* 2-column grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-card-border hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className="p-3 rounded-xl bg-white/10 w-fit mb-5">
                  <audience.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  {audience.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {audience.description}
                </p>

                {/* Subtle glow on hover */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
