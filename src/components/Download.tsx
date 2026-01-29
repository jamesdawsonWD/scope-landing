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

// Windows Logo SVG
function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  )
}

// Apple Logo SVG
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

// Linux Logo SVG (Tux)
function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.002c-.06-.135-.12-.2-.184-.268h-.007c-.09-.135-.2-.2-.324-.268-.249-.135-.117-.2-.396-.2-.19 0-.33.065-.458.2-.14.134-.271.333-.37.466-.1.198-.141.398-.207.534-.067.135-.164.2-.267.2h-.024c-.106-.001-.16-.066-.265-.2a1.882 1.882 0 01-.177-.465c-.08-.267-.136-.535-.262-.8-.063-.135-.143-.2-.24-.268-.096-.065-.193-.133-.31-.2v.003a1.62 1.62 0 01-.04-.533 1.88 1.88 0 01.033-.468 1.362 1.362 0 00-.009-.333c-.017-.2-.041-.265-.134-.4-.096-.133-.21-.2-.373-.333-.21-.135-.4-.2-.6-.268-.2-.067-.398-.135-.521-.265-.122-.135-.177-.268-.098-.4.061-.133.166-.2.308-.268.182-.066.396-.196.526-.465.127-.268.09-.535.04-.735-.05-.2-.136-.4-.133-.535.003-.134.053-.2.16-.33.107-.135.26-.267.335-.334.088-.066.158-.133.23-.2a.676.676 0 00.172-.335c.032-.111.032-.2-.012-.333-.04-.133-.088-.2-.167-.333-.08-.135-.2-.2-.358-.268-.158-.065-.358-.133-.628-.133-.073 0-.143.004-.215.01-.043.006-.08.014-.117.02l-.081.02-.1.024c-.12.034-.247.072-.37.12-.49.2-1.095.399-1.57.266 0-.004-.003-.004-.003-.008.195-.066.33-.2.418-.334.088-.132.113-.266.077-.398-.036-.134-.104-.2-.2-.268a.96.96 0 00-.332-.132 1.5 1.5 0 01-.345-.134c-.114-.065-.223-.133-.282-.198-.06-.066-.053-.068.02-.07l.088.004c.045.002.09.003.136.003l.014-.001h.014c.01-.001.02-.002.028-.002h.014l.016-.001c.095-.003.2-.01.313-.017.246-.014.527-.03.807-.022.282.009.557.043.81.12.062.018.12.04.176.063.162.066.33.15.465.268.041.035.079.07.113.104.073.07.14.14.2.2.127.126.223.244.293.34.282.4.42.6.647.664.227.066.47.002.72-.135.251-.133.498-.332.716-.266a.59.59 0 01.315.199 1.14 1.14 0 01.197.388c.052.15.085.328.098.51z"/>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call - replace with actual endpoint
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsModalOpen(false)
      setIsSubmitted(false)
      setEmail('')
    }, 2000)
  }

  return (
    <section id="download" className="py-32 relative" ref={ref}>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get Started with <span className="gradient-text">Scope</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            An open source and local-first tool for running and customizing real-time interactive video models. 
            Choose the option that works best for your setup.
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
                <h3 className="text-xl font-semibold mb-2">Windows App</h3>
                <p className="text-sm text-muted mb-6 flex-grow">
                  Native desktop app with full local inference support
                </p>
                <motion.a
                  href="https://github.com/daydreamlive/scope/tags"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors min-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download</span>
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
                <h3 className="text-xl font-semibold mb-2">Mac & Linux</h3>
                <p className="text-sm text-muted mb-6 flex-grow">
                  Run locally from source with full customization
                </p>
                <motion.a
                  href="https://github.com/daydreamlive/scope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors min-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Run Locally</span>
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
                Coming Soon
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Video Section */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <ExternalVideo
                  src="https://framerusercontent.com/assets/QEIs2ayJotuQ4U1kheYcb3gNc.mp4"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
              </div>

              {/* Content Section */}
              <div className="relative w-full md:w-1/2 p-8 flex flex-col">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-400 to-neutral-600 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Browser App</h3>
                    <p className="text-sm text-muted">Real-time AI video in your browser</p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                    <Cloud className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs font-medium">No GPU</span>
                    <span className="text-xs text-muted">Required</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                    <Zap className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs font-medium">Instant</span>
                    <span className="text-xs text-muted">Model Access</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                    <Sparkles className="w-5 h-5 text-white/70 mb-1" />
                    <span className="text-xs font-medium">Any Device</span>
                    <span className="text-xs text-muted">Mac, PC, Mobile</span>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  <span>Join Waitlist</span>
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
            href="https://github.com/daydreamlive/scope"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-card-border hover:bg-card-hover transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">View on GitHub</span>
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
                Coming Soon
              </span>
            </div>

            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Scope <span className="gradient-text">Browser App</span>
            </DialogTitle>
            <DialogDescription className="text-muted text-center mb-6">
              Real-time AI video generation in your browser with remote inference.
            </DialogDescription>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                <Cloud className="w-6 h-6 text-white/70 mb-2" />
                <span className="text-sm font-medium">No GPU</span>
                <span className="text-xs text-muted">Required</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                <Zap className="w-6 h-6 text-white/70 mb-2" />
                <span className="text-sm font-medium">Instant</span>
                <span className="text-xs text-muted">Model Access</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5">
                <Sparkles className="w-6 h-6 text-white/70 mb-2" />
                <span className="text-sm font-medium">Any Device</span>
                <span className="text-xs text-muted">Mac, PC, Mobile</span>
              </div>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors text-white placeholder:text-muted"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </motion.button>
                <p className="text-xs text-muted text-center">
                  Be the first to know when the browser app launches.
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
                <p className="font-medium text-white">You&apos;re on the list!</p>
                <p className="text-sm text-muted">We&apos;ll notify you when we launch.</p>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
