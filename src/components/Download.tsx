'use client'

import { motion, useInView } from 'framer-motion'
import { Download as DownloadIcon, Github, Globe, Terminal, Mail, Zap, Cloud, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ExternalVideo } from './ui/LazyVideo'
import { download } from '@/content/copy'
import { renderText } from '@/lib/renderText'
import { trackDownloadClick, trackDownloadModalOpened, trackExternalLink } from '@/lib/analytics'
import { posthog } from '@/lib/posthog'

// Windows Logo SVG
function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  )
}

export default function Download() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    setError('')
    
    // Track waitlist signup attempt
    posthog.capture('waitlist_signup_submitted', {
      product: 'browser_app',
      location: 'download',
    })
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setIsSubmitted(true)
      
      // Track successful signup
      posthog.capture('waitlist_signup_completed', {
        product: 'browser_app',
        $set: {
          waitlist_browser_app: true,
        },
      })
      
      // Reset after showing success
      setTimeout(() => {
        setIsModalOpen(false)
        setIsSubmitted(false)
        setEmail('')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      
      // Track signup failure
      posthog.capture('waitlist_signup_failed', {
        product: 'browser_app',
        error: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="download" className="py-16 md:py-24 lg:py-32 relative" ref={ref}>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-left min-[375px]:text-center">
            {renderText(download.heading)}
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto text-left min-[375px]:text-center">
            {renderText(download.description)}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {/* Windows App - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -4 }}
            className="relative group"
          >
            <div className="relative p-8 rounded-2xl border transition-all duration-300 bg-card border-card-border hover:border-white/30 cursor-pointer h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-400 to-neutral-600 flex items-center justify-center mb-6">
                  <WindowsIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{download.windows.title}</h3>
                <p className="text-sm text-muted mb-6 flex-grow">
                  {download.windows.description}
                </p>
                <motion.a
                  href={download.windows.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors min-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackDownloadClick('windows', '0.1.0-beta.3', 'download')}
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>{download.windows.cta}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Mac & Linux - Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="relative group"
          >
            <div className="relative p-8 rounded-2xl border transition-all duration-300 bg-card border-card-border hover:border-white/30 cursor-pointer h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-400 to-neutral-600 flex items-center justify-center mb-6">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{download.macLinux.title}</h3>
                <p className="text-sm text-muted mb-6 flex-grow">
                  {download.macLinux.description}
                </p>
                <motion.a
                  href={download.macLinux.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors min-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackExternalLink('Source Code', download.macLinux.href, 'download')}
                >
                  <Terminal className="w-4 h-4" />
                  <span>{download.macLinux.cta}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Browser App - Full Width Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group mb-12"
        >
          <div className="relative rounded-2xl border transition-all duration-300 bg-card border-card-border hover:border-white/30 overflow-hidden">
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {download.browser.badge}
              </span>
            </div>

            <div className="flex flex-col">
              {/* Video Section */}
              <div className="relative w-full h-48 md:h-64 overflow-hidden">
                <ExternalVideo
                  src="https://framerusercontent.com/assets/QEIs2ayJotuQ4U1kheYcb3gNc.mp4"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content Section */}
              <div className="relative w-full p-6 md:p-8 flex flex-col">
                {/* Icon and Title */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-400 to-neutral-600 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold">{download.browser.title}</h3>
                    <p className="text-sm text-muted">{download.browser.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
                  {download.browser.features.map((feature, index) => {
                    const icons = [Cloud, Zap, Sparkles]
                    const Icon = icons[index]
                    return (
                      <div key={index} className="flex flex-col items-center text-center p-2 md:p-3 rounded-xl bg-white/5">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/70 mb-1" />
                        <span className="text-[10px] md:text-xs font-medium">{feature.label}</span>
                        <span className="text-[10px] md:text-xs text-muted hidden md:block">{feature.sublabel}</span>
                      </div>
                    )
                  })}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => {
                    setIsModalOpen(true)
                    trackDownloadModalOpened('download')
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  <span>{download.browser.cta}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.a
            href={download.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-card-border hover:bg-card-hover transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => trackExternalLink('GitHub Repository', download.github.href, 'download')}
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">{download.github.label}</span>
            <span className="text-muted group-hover:text-foreground transition-colors">→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 gap-0 overflow-hidden max-w-lg">
          {/* Video with gradient fades */}
          <div className="relative h-48 overflow-hidden">
            <ExternalVideo
              src="https://framerusercontent.com/assets/QEIs2ayJotuQ4U1kheYcb3gNc.mp4"
              className="w-full h-full object-cover"
              paused={!isModalOpen}
            />
            {/* Gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            {/* Gradient fade at top */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent" />
            {/* Gradient fade on sides */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0a]/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="px-8 pb-8 -mt-4 relative">
            {/* Badge */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {download.browser.badge}
              </span>
            </div>

            <DialogTitle className="text-2xl font-bold text-center mb-2">
              {renderText(download.browser.modal.title)}
            </DialogTitle>
            <DialogDescription className="text-muted text-center mb-6">
              {download.browser.modal.description}
            </DialogDescription>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {download.browser.features.map((feature, index) => {
                const icons = [Cloud, Zap, Sparkles]
                const Icon = icons[index]
                return (
                  <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                    <Icon className="w-6 h-6 text-white/70 mb-2" />
                    <span className="text-sm font-medium">{feature.label}</span>
                    <span className="text-xs text-muted">{feature.sublabel}</span>
                  </div>
                )
              })}
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="Enter your email"
                    required
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border focus:outline-none transition-colors text-white placeholder:text-muted ${
                      error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                    }`}
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-400 text-center">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? download.browser.modal.submittingLabel : download.browser.modal.submitLabel}
                </motion.button>
                <p className="text-xs text-muted text-center">
                  {download.browser.modal.disclaimer}
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium text-white">{download.browser.modal.successTitle}</p>
                <p className="text-sm text-muted">{download.browser.modal.successDescription}</p>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
