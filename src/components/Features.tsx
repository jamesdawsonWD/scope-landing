'use client'

import { motion, useInView } from 'framer-motion'
import { Cpu, Cloud, Layers, Sliders, Zap, Box, Sparkles, ArrowUpRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { DotPattern, AnimatedBeam } from './ui/GridPattern'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-32 relative" ref={ref}>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Breakthrough Capabilities.
            <br />
            <span className="gradient-text">Creative Freedom.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Open tooling with state-of-the-art models, real-time control, and community-driven innovation.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Large Feature Card - Real-time Control */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 lg:row-span-2 group relative"
          >
            <div className="relative h-full p-8 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              {/* Animated particles background */}
              <ParticleField />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Sliders className="w-7 h-7 text-white" />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-white transition-colors">
                    Groundbreaking Creative Control
                  </h3>
                  <p className="text-muted leading-relaxed text-base lg:text-lg">
                    VACE for inpainting and editing, LoRAs and ControlNets for output conditioning, director-style timeline config for storytelling, and composable plugins to build unique workflows.
                  </p>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
            </div>
          </motion.div>

          {/* Remote Inference - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 group relative"
          >
            <div className="relative h-full p-6 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              <AnimatedBeam />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white/10">
                    <Cloud className="w-5 h-5 text-white" />
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white border border-white/20">
                    Coming Soon
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  Flexible API
                </h3>
                <p className="text-muted text-sm">
                  Your real-time AI video pipelines, hosted on infrastructure purpose-built for video streaming.
                </p>
              </div>
            </div>
          </motion.div>

          {/* SOTA Models */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative"
          >
            <div className="relative h-full p-6 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              <DotPattern className="opacity-50" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-3">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  Custom Pipelines
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Waypoint-1, Krea Real-Time, LongLive, MemFlow, and more.
                </p>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            </div>
          </motion.div>

          {/* Composable Workflows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:row-span-2 group relative"
          >
            <div className="relative h-full p-6 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              {/* Stacked layers visual */}
              <div className="absolute top-6 right-6 flex flex-col gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-1.5 rounded-full bg-white/10"
                    initial={{ scaleX: 1 - i * 0.15 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ delay: i * 0.05 }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-4">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  Composable Workflows
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Save entire workflows, share them with collaborators, and find inspiration from the Daydream community.
                </p>
                
                {/* Mini workflow preview */}
                <div className="mt-auto flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-12 rounded-lg bg-white/5 border border-white/10"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Local-First */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative"
          >
            <div className="relative h-full p-6 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              <div className="relative z-10 h-full flex flex-col">
                <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  Local-First
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Run everything locally with full control over your data.
                </p>
              </div>
              
              {/* Pulse effect */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Open Source - Wide */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2 group relative"
          >
            <div className="relative h-full p-6 rounded-3xl bg-card border border-card-border overflow-hidden transition-all duration-500 hover:border-white/20">
              {/* Code lines decoration */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
                {[80, 60, 90, 45, 70].map((width, i) => (
                  <div key={i} className="h-1 rounded-full bg-white" style={{ width: `${width}px` }} />
                ))}
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10">
                    <Box className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-white transition-colors">
                      Open Source
                    </h3>
                    <p className="text-muted text-sm">
                      Fully open source. Inspect, modify, and contribute to the codebase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Particle field effect for the main card
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const particleCount = 50
    
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }
    
    let animationId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fill()
      })
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 100)})`
            ctx.stroke()
          }
        })
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
    />
  )
}
