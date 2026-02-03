'use client'

import { motion } from 'framer-motion'
import { MarqueeVideo } from './LazyVideo'

// Number of videos to preload immediately (visible on initial load)
const PRIORITY_COUNT = 5

function buildTiles(videos: string[], repeat: number): string[] {
  const tiles: string[] = []
  for (let i = 0; i < repeat; i++) {
    tiles.push(...videos)
  }
  return tiles
}

export function MarqueeBento({
  videos,
  duration,
}: {
  videos: string[]
  duration: number
}) {
  // Build enough tiles to cover wide screens; duplicated strip gives seamless loop.
  const tiles = buildTiles(videos, 10)

  // Slow down the animation (multiply duration by 4)
  const slowDuration = duration * 2

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: slowDuration, repeat: Infinity, ease: 'linear' }}
        style={{
          willChange: 'transform',
        }}
      >
        {/* STRIP A - first strip has priority videos */}
        <FlexStrip tiles={tiles} isPrimaryStrip />

        {/* STRIP B (duplicate for seamless looping) - no priority */}
        <FlexStrip tiles={tiles} isPrimaryStrip={false} />
      </motion.div>

      {/* Bottom gradient fade into background */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />
    </div>
  )
}

function FlexStrip({ tiles, isPrimaryStrip }: { tiles: string[]; isPrimaryStrip: boolean }) {
  return (
    <div className="flex gap-3">
      {tiles.map((src, idx) => {
        // Only first PRIORITY_COUNT videos in the primary strip get priority loading
        const isPriority = isPrimaryStrip && idx < PRIORITY_COUNT
        
        return (
          <div
            key={`${src}-${idx}`}
            className="
              relative
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              bg-background
              border border-card-border
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            "
            style={{
              width: 'clamp(220px, 22vw, 360px)',
              height: 'clamp(280px, 32vw, 450px)',
            }}
          >
            <MarqueeVideo
              src={src}
              className="absolute inset-0 h-full w-full object-cover"
              priority={isPriority}
            />
          </div>
        )
      })}
    </div>
  )
}
