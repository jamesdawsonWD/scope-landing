'use client'

import { motion, useInView } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useRef } from 'react'

// Discord Icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

// All available videos - 4 rows
const row1Videos = [
  '/videos/video-1.mp4',
  '/videos/video-2.mp4',
  '/videos/video-3.mp4',
  '/videos/video-4.mp4',
  '/videos/video-5.mp4',
]

const row2Videos = [
  '/videos/video-6.mp4',
  '/videos/video-7.mp4',
  '/videos/streamdiffusion-demo.mp4',
  '/videos/longlive-demo.mp4',
  '/videos/video-2.mp4',
]

const row3Videos = [
  '/videos/video-3.mp4',
  '/videos/video-5.mp4',
  '/videos/video-1.mp4',
  '/videos/video-7.mp4',
  '/videos/video-4.mp4',
]

const row4Videos = [
  '/videos/video-6.mp4',
  '/videos/streamdiffusion-demo.mp4',
  '/videos/video-2.mp4',
  '/videos/longlive-demo.mp4',
  '/videos/video-5.mp4',
]

// Video card with perspective tilt - gets smaller toward center
function PerspectiveVideo({ 
  src, 
  poster,
  index, 
  totalCount,
  side,
  row,
}: { 
  src: string
  poster: string
  index: number
  totalCount: number
  side: 'left' | 'right'
  row: 'top' | 'bottom'
}) {
  // Reverse the index so 0 is at the edge, higher is toward center
  const distanceFromEdge = index
  const distanceFromCenter = totalCount - 1 - index
  
  // Scale decreases toward center (closer to center = smaller)
  const scale = 1 - (distanceFromEdge * 0.12)
  // Blur increases toward center
  const blur = distanceFromEdge * 1.5
  // Opacity decreases toward center
  const opacity = 1 - (distanceFromEdge * 0.15)
  // Rotation - cards tilt toward center (facing inward)
  const rotateY = side === 'left' ? -(15 + (distanceFromEdge * 8)) : (15 + (distanceFromEdge * 8))
  // Vertical offset for depth - converge toward center
  const translateY = row === 'top' ? (distanceFromEdge * 6) : -(distanceFromEdge * 6)
  
  // Base size - outer cards are bigger
  const baseWidth = 180 - (distanceFromEdge * 25)
  const baseHeight = 110 - (distanceFromEdge * 15)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: opacity, scale: scale }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: distanceFromCenter * 0.08 }}
      className="flex-shrink-0 rounded-xl overflow-hidden"
      style={{
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
        transform: `perspective(1000px) rotateY(${rotateY}deg) translateY(${translateY}px)`,
        filter: `blur(${blur}px)`,
        zIndex: totalCount - distanceFromEdge,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  )
}

export default function Community() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="community" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Video Rows Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none gap-1">
        {/* Row 1 - Top */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-end flex-1 gap-1">
            {row1Videos.map((video, index) => (
              <PerspectiveVideo
                key={`row1-left-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={index}
                totalCount={row1Videos.length}
                side="left"
                row="top"
              />
            ))}
          </div>
          <div className="w-[400px] flex-shrink-0" />
          <div className="flex items-center justify-start flex-1 gap-1">
            {[...row1Videos].reverse().map((video, index) => (
              <PerspectiveVideo
                key={`row1-right-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={row1Videos.length - 1 - index}
                totalCount={row1Videos.length}
                side="right"
                row="top"
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-end flex-1 gap-1">
            {row2Videos.map((video, index) => (
              <PerspectiveVideo
                key={`row2-left-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={index}
                totalCount={row2Videos.length}
                side="left"
                row="top"
              />
            ))}
          </div>
          <div className="w-[400px] flex-shrink-0" />
          <div className="flex items-center justify-start flex-1 gap-1">
            {[...row2Videos].reverse().map((video, index) => (
              <PerspectiveVideo
                key={`row2-right-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={row2Videos.length - 1 - index}
                totalCount={row2Videos.length}
                side="right"
                row="top"
              />
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-end flex-1 gap-1">
            {row3Videos.map((video, index) => (
              <PerspectiveVideo
                key={`row3-left-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={index}
                totalCount={row3Videos.length}
                side="left"
                row="bottom"
              />
            ))}
          </div>
          <div className="w-[400px] flex-shrink-0" />
          <div className="flex items-center justify-start flex-1 gap-1">
            {[...row3Videos].reverse().map((video, index) => (
              <PerspectiveVideo
                key={`row3-right-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={row3Videos.length - 1 - index}
                totalCount={row3Videos.length}
                side="right"
                row="bottom"
              />
            ))}
          </div>
        </div>

        {/* Row 4 - Bottom */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-end flex-1 gap-1">
            {row4Videos.map((video, index) => (
              <PerspectiveVideo
                key={`row4-left-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={index}
                totalCount={row4Videos.length}
                side="left"
                row="bottom"
              />
            ))}
          </div>
          <div className="w-[400px] flex-shrink-0" />
          <div className="flex items-center justify-start flex-1 gap-1">
            {[...row4Videos].reverse().map((video, index) => (
              <PerspectiveVideo
                key={`row4-right-${index}`}
                src={video}
                poster={video.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
                index={row4Videos.length - 1 - index}
                totalCount={row4Videos.length}
                side="right"
                row="bottom"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Radial gradient overlay - completely black in center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(10,10,11,1) 0%, rgba(10,10,11,1) 40%, rgba(10,10,11,0.9) 60%, rgba(10,10,11,0.5) 75%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="relative p-12 md:p-16 text-center">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Join the real-time
              <br />
              <span className="gradient-text">AI video community</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted max-w-xl mx-auto mb-10"
            >
              Join creatives, builders, and researchers advancing the frontier.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://app.daydream.live/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 px-8 py-4"
              >
                <Compass className="w-5 h-5" />
                <span>Discover</span>
              </a>
              <a
                href="https://discord.gg/QXk48Jve"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 px-8 py-4"
              >
                <DiscordIcon className="w-5 h-5" />
                <span>Join Community</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
