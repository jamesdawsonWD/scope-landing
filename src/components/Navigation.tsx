'use client'

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Trigger shrink after scrolling past ~300px (roughly past the hero title)
    setIsScrolled(latest > 300)
  })

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <motion.div 
        className="mx-auto"
        initial={false}
        animate={{
          maxWidth: isScrolled ? '600px' : '1280px',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="glass rounded-2xl px-6 flex items-center justify-between"
          initial={false}
          animate={{
            paddingTop: isScrolled ? '8px' : '12px',
            paddingBottom: isScrolled ? '8px' : '12px',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <a 
            href="#"
            className="flex items-center gap-3"
          >
            <motion.img 
              src="/logo.jpeg" 
              alt="Scope" 
              className="rounded-lg object-cover"
              initial={false}
              animate={{
                width: isScrolled ? '28px' : '32px',
                height: isScrolled ? '28px' : '32px',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span 
              className="font-semibold"
              initial={false}
              animate={{
                fontSize: isScrolled ? '16px' : '20px',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Scope
            </motion.span>
          </a>

          {/* Desktop Navigation - Hidden when scrolled */}
          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={false}
            animate={{
              opacity: isScrolled ? 0 : 1,
              width: isScrolled ? 0 : 'auto',
              pointerEvents: isScrolled ? 'none' : 'auto',
            }}
            transition={{ duration: 0.3 }}
          >
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#workflows">Workflows</NavLink>
            <NavLink href="#download">Download</NavLink>
            <NavLink href="#community">Community</NavLink>
          </motion.div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <a
              href="#download"
              className={`btn-primary flex items-center gap-2 transition-all duration-300 ${
                isScrolled ? 'px-4 py-1.5' : 'px-6 py-3'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
              <span>Download</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="glass mt-2 rounded-2xl p-4 flex flex-col gap-4">
            <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#workflows" onClick={() => setIsOpen(false)}>Workflows</MobileNavLink>
            <MobileNavLink href="#download" onClick={() => setIsOpen(false)}>Download</MobileNavLink>
            <MobileNavLink href="#community" onClick={() => setIsOpen(false)}>Community</MobileNavLink>
            <a
              href="#download"
              className="btn-primary text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              <span>Download</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="text-sm text-muted hover:text-foreground transition-colors relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-muted hover:text-foreground transition-colors py-2 border-b border-card-border last:border-0"
    >
      {children}
    </a>
  )
}
