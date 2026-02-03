'use client'

import { motion, useInView } from 'framer-motion'
import { Download } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { community, urls } from '@/content/copy'
import { renderText } from '@/lib/renderText'
import { trackCTAClick, trackSocialClick } from '@/lib/analytics'

// Discord Icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

// Video list for cycling
const videos = [
  '/videos/video-1.mp4',
  '/videos/video-2.mp4',
  '/videos/video-3.mp4',
  '/videos/video-4.mp4',
  '/videos/video-5.mp4',
  '/videos/video-6.mp4',
  '/videos/video-7.mp4',
]

const CYCLE_INTERVAL = 6000 // 6 seconds per video

// Single video component with crossfade
function CyclingVideo({ 
  side,
  sectionVisible,
}: { 
  side: 'left' | 'right'
  sectionVisible: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(side === 'left' ? 0 : 3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFirst, setShowFirst] = useState(true)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  // Cycle through videos
  useEffect(() => {
    if (!sectionVisible) return

    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true)
      
      // After transition completes, update the index and swap
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length)
        setShowFirst((prev) => !prev)
        setIsTransitioning(false)
      }, 1500) // Match transition duration
    }, CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [sectionVisible])

  // Play/pause based on visibility
  useEffect(() => {
    const video1 = video1Ref.current
    const video2 = video2Ref.current
    
    if (sectionVisible) {
      // Play both during transition for smooth crossfade
      video1?.play().catch(() => {})
      video2?.play().catch(() => {})
    } else {
      video1?.pause()
      video2?.pause()
    }
  }, [sectionVisible])

  // Preload next video into the hidden player
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % videos.length
    const nextVideoEl = showFirst ? video2Ref.current : video1Ref.current
    if (nextVideoEl && nextVideoEl.src !== videos[nextIndex]) {
      nextVideoEl.src = videos[nextIndex]
      nextVideoEl.load()
    }
  }, [currentIndex, showFirst])

  // Mouse tilt effect - cards tilt toward the center (header/text area)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      // Get the center of the viewport (where the text is)
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2
      
      // Calculate how far the mouse is from center
      const mouseFromCenterX = (e.clientX - viewportCenterX) / (window.innerWidth / 2)
      const mouseFromCenterY = (e.clientY - viewportCenterY) / (window.innerHeight / 2)
      
      const maxTilt = 15
      
      // Tilt cards toward the center text
      // X rotation: tilt forward/back based on mouse Y position
      const tiltX = Math.max(-maxTilt, Math.min(maxTilt, mouseFromCenterY * 20))
      
      // Y rotation: for left card, tilt more right (toward center) when mouse is right
      // for right card, tilt more left (toward center) when mouse is left
      const tiltY = side === 'left'
        ? Math.max(-maxTilt, Math.min(maxTilt, mouseFromCenterX * 20))
        : Math.max(-maxTilt, Math.min(maxTilt, mouseFromCenterX * 20))
      
      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [side])

  const currentVideo = videos[currentIndex]
  const nextVideoSrc = videos[(currentIndex + 1) % videos.length]
  const poster = currentVideo.replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')

  // Calculate opacity based on transition state
  const video1Opacity = showFirst ? (isTransitioning ? 0 : 1) : (isTransitioning ? 1 : 0)
  const video2Opacity = showFirst ? (isTransitioning ? 1 : 0) : (isTransitioning ? 0 : 1)

  // Base rotation plus mouse tilt
  const baseRotateY = side === 'left' ? -12 : 12

  return (
    <div 
      ref={containerRef}
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-0 pl-4 lg:pl-8' : 'right-0 pr-4 lg:pr-8'}`}
    >
      {/* Frame with gradient border */}
      <motion.div 
        className="relative p-[1px] rounded-2xl"
        animate={{
          rotateX: tilt.x,
          rotateY: baseRotateY + tilt.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          background: side === 'left'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.4) 100%)'
            : 'linear-gradient(-135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.4) 100%)',
        }}
      >
        {/* Inner frame */}
        <div className="relative w-[280px] h-[180px] lg:w-[380px] lg:h-[240px] rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
          {/* Video 1 */}
          <video
            ref={video1Ref}
            src={showFirst ? currentVideo : nextVideoSrc}
            poster={poster}
            loop
            muted
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out"
            style={{ 
              backgroundColor: '#0a0a0a',
              opacity: video1Opacity,
              transform: `scale(${video1Opacity === 1 ? 1 : 1.05})`,
            }}
          />
          
          {/* Video 2 */}
          <video
            ref={video2Ref}
            src={showFirst ? nextVideoSrc : currentVideo}
            poster={poster}
            loop
            muted
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out"
            style={{ 
              backgroundColor: '#0a0a0a',
              opacity: video2Opacity,
              transform: `scale(${video2Opacity === 1 ? 1 : 1.05})`,
            }}
          />

          {/* Light glow in corner closest to text */}
          <div 
            className={`absolute w-32 h-32 pointer-events-none ${
              side === 'left' ? 'top-0 right-0' : 'top-0 left-0'
            }`}
            style={{
              background: side === 'left'
                ? 'radial-gradient(ellipse at top right, rgba(255,255,255,0.15) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at top left, rgba(255,255,255,0.15) 0%, transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Single bottom video card component
function BottomVideoCard({ 
  sectionVisible, 
  position,
  startIndex 
}: { 
  sectionVisible: boolean
  position: 'left' | 'center' | 'right'
  startIndex: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  // Cycle through videos
  useEffect(() => {
    if (!sectionVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    }, CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [sectionVisible])

  // Play/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (sectionVisible) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [sectionVisible])

  // Update video source when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentIndex]
      videoRef.current.load()
      if (sectionVisible) {
        videoRef.current.play().catch(() => {})
      }
    }
  }, [currentIndex, sectionVisible])

  // Position and rotation styles
  const positionStyles = {
    left: {
      className: 'absolute bottom-0 left-0 translate-y-[50%] -translate-x-[15%] z-0',
      rotation: 'rotate-[8deg]',
      size: 'w-[320px] h-[200px] lg:w-[380px] lg:h-[240px]',
    },
    center: {
      className: 'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[45%] z-10',
      rotation: '',
      size: 'w-[400px] h-[250px] lg:w-[500px] lg:h-[280px]',
    },
    right: {
      className: 'absolute bottom-0 right-0 translate-y-[50%] translate-x-[15%] z-0',
      rotation: '-rotate-[8deg]',
      size: 'w-[320px] h-[200px] lg:w-[380px] lg:h-[240px]',
    },
  }

  const styles = positionStyles[position]

  return (
    <div className={`${styles.className} pointer-events-none`}>
      <div className={`relative rounded-2xl overflow-hidden ${styles.rotation} ${styles.size}`}>
        <video
          ref={videoRef}
          src={videos[startIndex]}
          poster={videos[startIndex].replace('/videos/', '/videos/posters/').replace('.mp4', '.jpg')}
          loop
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#0a0a0a' }}
        />
        {/* Gradient overlay - fades video to black at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" style={{ height: '70%' }} />
        {/* Left edge gradient */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent" />
        {/* Right edge gradient */}
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent" />
      </div>
    </div>
  )
}

// Bottom videos container for tablet/laptop
function BottomVideos({ sectionVisible }: { sectionVisible: boolean }) {
  return (
    <>
      <BottomVideoCard sectionVisible={sectionVisible} position="left" startIndex={0} />
      <BottomVideoCard sectionVisible={sectionVisible} position="center" startIndex={2} />
      <BottomVideoCard sectionVisible={sectionVisible} position="right" startIndex={4} />
    </>
  )
}

export default function Community() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sectionVisible = useInView(ref, { margin: '0px' })

  return (
    <section id="community" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Videos - Large desktop only (xl+) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none">
        {/* Single glow behind both videos */}
        <div className="absolute inset-0 flex justify-between items-center px-8">
          <div className="w-[450px] h-[300px] bg-white/[0.04] rounded-3xl blur-3xl" />
          <div className="w-[450px] h-[300px] bg-white/[0.04] rounded-3xl blur-3xl" />
        </div>
        
        <CyclingVideo side="left" sectionVisible={sectionVisible} />
        <CyclingVideo side="right" sectionVisible={sectionVisible} />
      </div>

      {/* Bottom Videos - Tablet and laptop (md to xl) */}
      <div className="hidden md:block xl:hidden">
        <BottomVideos sectionVisible={sectionVisible} />
      </div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="relative py-6 md:p-12 lg:p-16 md:text-center">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-left min-[375px]:text-center"
            >
              {community.heading.line1}
              <span className="gradient-text">{community.heading.line2}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-8 md:mb-10 text-left min-[375px]:text-center"
            >
              {renderText(community.description)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch md:items-center md:justify-center gap-4"
            >
              <a
                href={community.cta.primary.href}
                className="btn-primary flex items-center gap-2 px-8 py-4"
                onClick={() => trackCTAClick('Download Scope', 'community', 'primary')}
              >
                <Download className="w-5 h-5" />
                <span>{community.cta.primary.label}</span>
              </a>
              <a
                href={urls.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 px-8 py-4"
                onClick={() => trackSocialClick('discord', urls.discord, 'footer')}
              >
                <DiscordIcon className="w-5 h-5" />
                <span>{community.cta.secondary.label}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
