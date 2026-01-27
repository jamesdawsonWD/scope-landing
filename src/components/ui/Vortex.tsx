'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface VortexProps {
  className?: string
  particleCount?: number
  baseSpeed?: number
  rangeSpeed?: number
  baseRadius?: number
  rangeRadius?: number
  baseHue?: number
  rangeY?: number
}

export function Vortex({
  className = '',
  particleCount = 700,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  rangeY = 100,
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let tick = 0
    let center: [number, number] = [0, 0]

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      center = [canvas.width / 2, canvas.height / 2]
    }

    class Particle {
      x: number
      y: number
      originX: number
      originY: number
      speed: number
      radius: number
      angle: number
      rangeY: number
      opacity: number

      constructor() {
        const canvasWidth = canvas!.width
        const canvasHeight = canvas!.height
        
        this.originX = Math.random() * canvasWidth
        this.originY = center[1] + (Math.random() - 0.5) * rangeY * 2
        this.x = this.originX
        this.y = this.originY
        this.speed = baseSpeed + Math.random() * rangeSpeed
        this.radius = baseRadius + Math.random() * rangeRadius
        this.angle = Math.random() * Math.PI * 2
        this.rangeY = rangeY + Math.random() * 50
        this.opacity = 0.3 + Math.random() * 0.5
      }

      update(tick: number) {
        // Spiral motion
        const distFromCenter = Math.abs(this.originX - center[0])
        const maxDist = canvas!.width / 2
        const normalizedDist = distFromCenter / maxDist
        
        // Faster rotation near center
        const rotationSpeed = this.speed * (1 - normalizedDist * 0.5)
        
        this.angle += rotationSpeed * 0.02
        
        // Oscillating Y movement
        const yOffset = Math.sin(tick * 0.001 * this.speed + this.originX * 0.01) * this.rangeY
        
        // Spiral pull toward center
        const pullStrength = 0.0005
        this.originX += (center[0] - this.originX) * pullStrength
        
        // Reset if too close to center
        if (Math.abs(this.originX - center[0]) < 50) {
          this.originX = Math.random() < 0.5 ? -50 : canvas!.width + 50
        }
        
        this.x = this.originX + Math.cos(this.angle) * (30 * normalizedDist)
        this.y = this.originY + yOffset + Math.sin(this.angle) * 20
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Distance from center affects opacity - increased base opacity
        const distFromCenter = Math.sqrt(
          Math.pow(this.x - center[0], 2) + Math.pow(this.y - center[1], 2)
        )
        const maxDist = Math.sqrt(Math.pow(canvas!.width / 2, 2) + Math.pow(canvas!.height / 2, 2))
        const fadeOpacity = this.opacity * (0.5 + (distFromCenter / maxDist) * 0.5)
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${fadeOpacity})`
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'transparent'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      tick++

      particles.forEach((particle) => {
        particle.update(tick)
        particle.draw(ctx)
      })

      // Draw some connections for extra effect
      if (particleCount < 200) {
        drawConnections()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [particleCount, baseSpeed, rangeSpeed, baseRadius, rangeRadius, rangeY])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Radial gradient fade - reduced to show more particles */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      {/* Bottom fade for transition to next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      {/* Top fade */}
      <div 
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  )
}

// Alternative swirl effect with more dramatic spiral
export function WhirlpoolEffect({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const drawSpiral = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.8

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple spiral arms
      for (let arm = 0; arm < 3; arm++) {
        const armOffset = (arm * Math.PI * 2) / 3

        ctx.beginPath()
        
        for (let i = 0; i < 500; i++) {
          const angle = i * 0.05 + time * 0.5 + armOffset
          const radius = (i / 500) * maxRadius
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius * 0.6 // Flatten for perspective
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw particles along the spiral
      for (let i = 0; i < 200; i++) {
        const angle = i * 0.1 + time * 0.3
        const radius = (i / 200) * maxRadius * 0.9
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius * 0.6
        
        const opacity = 0.1 + (i / 200) * 0.3
        const size = 1 + (i / 200) * 2
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }
    }

    const animate = () => {
      time += 0.01
      drawSpiral()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Radial gradient fade */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 80%)',
        }}
      />
      {/* Bottom fade */}
      <div 
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)',
        }}
      />
    </div>
  )
}
