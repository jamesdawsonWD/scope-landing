'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowingBorderProps {
  children: ReactNode
  className?: string
}

export function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      {children}
    </div>
  )
}

export function SpotlightCard({ children, className = '' }: GlowingBorderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Spotlight effect that follows mouse would go here - simplified version */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      {children}
    </div>
  )
}
