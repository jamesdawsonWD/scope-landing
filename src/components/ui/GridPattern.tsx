'use client'

import { motion } from 'framer-motion'

interface GridPatternProps {
  className?: string
}

export function GridPattern({ className = '' }: GridPatternProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full stroke-white/[0.04]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      {/* Fading overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  )
}

export function DotPattern({ className = '' }: GridPatternProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dot-pattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}

export function AnimatedBeam({ className = '' }: GridPatternProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
    </motion.div>
  )
}
