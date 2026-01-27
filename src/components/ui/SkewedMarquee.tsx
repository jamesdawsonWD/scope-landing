'use client'

import { motion } from 'framer-motion'

type BentoTile = {
  src: string
  colSpan: number
  rowSpan: 1 | 2 | 3
}

/**
 * A repeating "layout recipe" that packs perfectly into 3 rows.
 * Each "block" is 6 columns wide and fills all 3 rows with no gaps.
 * Order matters: place larger/taller tiles first so dense packing works correctly.
 */
const LAYOUT_RECIPE: Array<Pick<BentoTile, 'colSpan' | 'rowSpan'>> = [
  // Tall hero tile (2×3 = 6 cells)
  { colSpan: 2, rowSpan: 3 },
  // 2×2 block (4 cells)
  { colSpan: 2, rowSpan: 2 },
  // Two 1×2 tiles (2 cells each = 4 cells)
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 2 },
  // Bottom row fills: 2×1 + two 1×1 (2 + 1 + 1 = 4 cells)
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
]

function buildTiles(videos: string[], repeatBlocks: number): BentoTile[] {
  const tiles: BentoTile[] = []
  let i = 0

  for (let block = 0; block < repeatBlocks; block++) {
    for (const shape of LAYOUT_RECIPE) {
      tiles.push({
        src: videos[i % videos.length],
        colSpan: shape.colSpan,
        rowSpan: shape.rowSpan,
      })
      i++
    }
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
  // Build enough blocks to cover wide screens; duplicated strip gives seamless loop.
  const tiles = buildTiles(videos, 10)

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{
          willChange: 'transform',
        }}
      >
        {/* STRIP A */}
        <BentoStrip tiles={tiles} />

        {/* STRIP B (duplicate for seamless looping) */}
        <BentoStrip tiles={tiles} />
      </motion.div>
    </div>
  )
}

function BentoStrip({ tiles }: { tiles: BentoTile[] }) {
  return (
    <div
      className="grid gap-3 pr-6"
      style={{
        // 3 rows tall bento.
        ['--rowH' as string]: 'clamp(90px, 10vw, 140px)',
        ['--colW' as string]: 'clamp(90px, 9vw, 150px)',

        gridTemplateRows: 'repeat(3, var(--rowH))',
        gridAutoColumns: 'var(--colW)',

        // Key: dense packing tries to fill holes left by spanning tiles.
        gridAutoFlow: 'column dense',
      }}
    >
      {tiles.map((t, idx) => (
        <div
          key={`${t.src}-${idx}`}
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-background
            border border-card-border
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
          style={{
            gridColumn: `span ${t.colSpan}`,
            gridRow: `span ${t.rowSpan}`,
          }}
        >
          <video
            src={t.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
