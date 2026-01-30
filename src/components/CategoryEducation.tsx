'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Drama, Gamepad2, Clapperboard, Bot, FlaskConical, Globe } from 'lucide-react'

const categories = [
  {
    icon: Drama,
    title: 'Live performances',
    description: 'AI visuals that react to you, your audience, your music. No pre-renders.',
  },
  {
    icon: Gamepad2,
    title: 'Interactive stories',
    description: 'Choose-your-own-adventure experiences powered by world models.',
  },
  {
    icon: Clapperboard,
    title: 'Instant pre-viz',
    description: 'See AI VFX concepts instantly instead of waiting hours for a render.',
  },
  {
    icon: Bot,
    title: 'AI avatars',
    description: 'Characters that exist in real-time, not as pre-recorded clips.',
  },
  {
    icon: FlaskConical,
    title: 'Pure experimentation',
    description: 'Try the latest models the moment they drop. No gatekeepers.',
  },
  {
    icon: Globe,
    title: 'World models',
    description: 'AI that simulates physics and environments in real-time. Games that generate themselves.',
  },
]

export default function CategoryEducation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI video is going real-time.
            <br />
            <span className="gradient-text">Are you?</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Most AI video tools render clips after the fact. Scope works while you work — transforming video as it happens. That opens up things batch tools can&apos;t do.
          </p>
        </motion.div>

        {/* 3-column grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card border border-card-border hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className="p-3 rounded-xl bg-white/10 w-fit mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Subtle glow on hover */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
