'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import Image from 'next/image'
import { ExternalVideo } from './ui/LazyVideo'

// Discord Icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

const prizes = [
  { place: '1st Place', amount: '$2,500', accent: 'bg-yellow-500' },
  { place: '2nd Place', amount: '$1,750', accent: 'bg-gray-400' },
  { place: '3rd Place', amount: '$750', accent: 'bg-amber-700' },
]

const mentors = [
  {
    name: 'Vibor Cipan',
    role: 'Community Growth',
    image: 'https://framerusercontent.com/images/eccuDtBYVtcuvj4lwhOLD1TaDGk.jpeg',
  },
  {
    name: 'Yondon Fu',
    role: 'R&D Lead',
    image: 'https://framerusercontent.com/images/ipsnW3dwDNzFenYO35Z7JL9k.jpg',
  },
]

export default function DaydreamProgram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Reduced parallax values - tighter on mobile
  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? [-30, 60] : [-60, 120])
  
  // Card parallax - reduced movement
  const cardsY = useTransform(scrollYProgress, [0, 0.5], isMobile ? [20, -15] : [40, -25])
  
  // Mentor card parallax - much subtler on mobile
  const mentorLeftY = useTransform(scrollYProgress, [0.3, 0.7], isMobile ? [15, -20] : [25, -35])
  const mentorRightY = useTransform(scrollYProgress, [0.3, 0.7], isMobile ? [20, -15] : [35, -25])

  return (
    <section 
      ref={containerRef}
      id="program" 
      className="relative overflow-hidden pt-24 md:pt-32"
      style={{ minHeight: isMobile ? '140vh' : '180vh' }}
    >
      {/* Background gradient orbs - smaller on mobile */}
      <div className="absolute top-1/4 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/[0.015] rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-white/[0.02] rounded-full blur-[80px] md:blur-[120px]" />

      {/* Hero Section Container */}
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-20">
        
        {/* Prize Cards Fanning Out - Behind Header */}
        <motion.div 
          style={{ y: cardsY }}
          className="absolute inset-x-0 top-6 md:top-12 z-0 flex justify-center"
        >
          {/* Container centered, cards fan out from center */}
          <div className="relative flex items-start justify-center">
            {/* 2nd Place - Fans out to the LEFT */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                rotate: isMobile ? -18 : -28, 
                x: isMobile ? -100 : -180, 
                y: isMobile ? 15 : 30 
              }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute z-0"
              style={{ 
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="p-3 md:p-5 rounded-xl border border-white/10 bg-[#141414] backdrop-blur-sm shadow-xl w-[110px] md:w-[160px]"
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${prizes[1].accent}`} />
                  <span className="text-[10px] md:text-xs font-medium text-white/50">{prizes[1].place}</span>
                </div>
                <p className="text-lg md:text-2xl font-bold text-white">{prizes[1].amount}</p>
              </div>
            </motion.div>

            {/* 3rd Place - Fans out to the RIGHT */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                rotate: isMobile ? 18 : 28, 
                x: isMobile ? 100 : 180, 
                y: isMobile ? 15 : 30 
              }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute z-0"
              style={{ 
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="p-3 md:p-5 rounded-xl border border-white/10 bg-[#141414] backdrop-blur-sm shadow-xl w-[110px] md:w-[160px]"
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${prizes[2].accent}`} />
                  <span className="text-[10px] md:text-xs font-medium text-white/50">{prizes[2].place}</span>
                </div>
                <p className="text-lg md:text-2xl font-bold text-white">{prizes[2].amount}</p>
              </div>
            </motion.div>

            {/* 1st Place - Center, on top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10"
            >
              <div 
                className="p-3 md:p-5 rounded-xl border border-white/10 bg-[#141414] backdrop-blur-sm shadow-xl w-[110px] md:w-[160px]"
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full ${prizes[0].accent}`} />
                  <span className="text-[10px] md:text-xs font-medium text-white/50">{prizes[0].place}</span>
                </div>
                <p className="text-lg md:text-2xl font-bold text-white">{prizes[0].amount}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Header Content - Above Cards (z-10) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center pt-16 md:pt-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 rounded-full glass mb-5 md:mb-8"
          >
            <span className="text-xs md:text-sm font-medium text-white/80">Daydream Interactive AI Video Program</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-center"
          >
            Build Real-Time AI Video
            <br />
            <span className="gradient-text">With the Best Creators</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-xl text-white/50 max-w-2xl mx-auto mb-6 md:mb-10 text-center px-2"
          >
            A curated <span className="font-semibold text-white/70">two-week creative lab</span> for AI artists and technologists defining the next medium for <span className="font-semibold text-white/70">live AI video</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <motion.a
              href="https://tally.so/r/kdbP8Z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Apply to Join</span>
              <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <a
              href="https://discord.gg/QXk48Jve"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <DiscordIcon className="w-4 md:w-5 h-4 md:h-5" />
              <span>Join Discord</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Video Layer - Parallaxed in background, sticky on desktop only */}
      <div className={`${isMobile ? 'relative' : 'sticky top-0'} h-auto md:h-screen w-full ${isMobile ? '' : '-mt-32'}`}>
        <motion.div 
          style={{ y: isMobile ? 0 : videoY }}
          className={`${isMobile ? 'relative' : 'absolute inset-0'} z-0`}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 w-full"
            >
              <div className="aspect-video relative">
                <ExternalVideo
                  src="https://framerusercontent.com/assets/Tp3NR1MomsQxNmIJKTUwpXRur7w.mp4"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/50" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Info Card - Scrolls over the video */}
      <div className="relative z-30">
        <div className="max-w-2xl mx-auto px-4 md:px-6 mt-6 md:-mt-20 pb-16 md:pb-32">
          {/* Floating Mentor Cards - parallax with badge */}
          <div className="relative flex justify-center mb-4 md:mb-6">
            {/* Vibor - Left, tilted inward (toward center) */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                x: isMobile ? -90 : -160, 
                rotate: isMobile ? 4 : 6 
              }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ 
                y: isMobile ? 0 : mentorLeftY,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className="absolute z-0"
            >
              <div 
                className="relative rounded-lg md:rounded-xl border border-white/10 bg-[#141414] backdrop-blur-sm shadow-xl w-[120px] md:w-[180px] overflow-hidden"
                style={{ transform: isMobile ? 'rotateY(-8deg)' : 'rotateY(-12deg)' }}
              >
                {/* Mentor Badge */}
                <div className="absolute top-1.5 md:top-2 right-1.5 md:right-2 z-10 px-1.5 md:px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-sm">
                  <span className="text-[8px] md:text-[10px] font-semibold text-black uppercase tracking-wide">Mentor</span>
                </div>
                {/* Full width image */}
                <div className="w-full aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={mentors[0].image}
                    alt={mentors[0].name}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name and role */}
                <div className="p-2 md:p-3">
                  <p className="text-xs md:text-sm font-medium text-white text-center">{mentors[0].name}</p>
                  <p className="text-[10px] md:text-xs text-white/40 text-center">{mentors[0].role}</p>
                </div>
              </div>
            </motion.div>

            {/* Yondon - Right, tilted inward (toward center) */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                x: isMobile ? 90 : 160, 
                rotate: isMobile ? -4 : -6 
              }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ 
                y: isMobile ? 0 : mentorRightY,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className="absolute z-0"
            >
              <div 
                className="relative rounded-lg md:rounded-xl border border-white/10 bg-[#141414] backdrop-blur-sm shadow-xl w-[120px] md:w-[180px] overflow-hidden"
                style={{ transform: isMobile ? 'rotateY(8deg)' : 'rotateY(12deg)' }}
              >
                {/* Mentor Badge */}
                <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 z-10 px-1.5 md:px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-sm">
                  <span className="text-[8px] md:text-[10px] font-semibold text-black uppercase tracking-wide">Mentor</span>
                </div>
                {/* Full width image */}
                <div className="w-full aspect-square overflow-hidden bg-white/5">
                  <Image
                    src={mentors[1].image}
                    alt={mentors[1].name}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name and role */}
                <div className="p-2 md:p-3">
                  <p className="text-xs md:text-sm font-medium text-white text-center">{mentors[1].name}</p>
                  <p className="text-[10px] md:text-xs text-white/40 text-center">{mentors[1].role}</p>
                </div>
              </div>
            </motion.div>

            {/* Spacer for the mentor cards - smaller on mobile */}
            <div className="h-40 md:h-48" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl"
          >
            {/* About */}
            <p className="text-xs md:text-base text-white/50 leading-relaxed text-center mb-4 md:mb-6">
              Experiment with <span className="font-medium text-white/70">real-time AI video</span> in TouchDesigner, Unity, and Unreal Engine. 
              Get support through <span className="font-medium text-white/70">workshops, office hours, and mentorship</span>.
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
              <div className="flex items-center gap-1 md:gap-1.5">
                <Trophy className="w-3.5 md:w-4 h-3.5 md:h-4 text-amber-500" />
                <span className="text-white font-medium">$5,000</span>
              </div>
              <span className="text-white/30">•</span>
              <span className="text-white/60">2 weeks</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">Feb 9-25</span>
            </div>

            {/* Timeline */}
            <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/[0.03] border border-white/5 mb-4 md:mb-6">
              <p className="text-[9px] md:text-[10px] font-medium text-white/30 uppercase tracking-wider mb-3 md:mb-5 text-center">Timeline</p>
              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-2 md:left-4 right-2 md:right-4 h-px bg-white/10 -translate-y-1/2" />
                
                {/* Timeline items */}
                <div className="relative flex justify-between items-center">
                  {[
                    { label: 'Apply', date: 'Feb 6' },
                    { label: 'Start', date: 'Feb 9' },
                    { label: 'Check-in', date: 'Feb 16' },
                    { label: 'Submit', date: 'Feb 20' },
                    { label: 'Demo', date: 'Feb 25' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {/* Label above */}
                      <span className="text-[8px] md:text-xs text-white/40 mb-1.5 md:mb-2">{item.label}</span>
                      {/* Dot */}
                      <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-white/20 border border-white/30 relative z-10" />
                      {/* Date below */}
                      <span className="text-[10px] md:text-sm text-white font-medium mt-1.5 md:mt-2">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="https://tally.so/r/kdbP8Z"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white hover:bg-white/90 text-black font-medium transition-colors text-sm md:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Apply Now</span>
              <svg className="w-3.5 md:w-4 h-3.5 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
