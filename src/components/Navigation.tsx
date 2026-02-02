'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navigation, urls } from '@/content/copy'
import { trackNavClick, trackMobileMenu, trackLogoClick, trackCTAClick, trackExternalLink } from '@/lib/analytics'

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
            onClick={() => trackLogoClick()}
          >
            <motion.img 
              src={navigation.logo.src}
              alt={navigation.logo.alt}
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
            {navigation.links.map((link) => (
              <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href={urls.githubScope}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackExternalLink('GitHub', urls.githubScope, 'navigation')}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <a
              href={navigation.cta.href}
              className={`btn-primary flex items-center gap-2 transition-all duration-300 ${
                isScrolled ? 'px-4 py-1.5' : 'px-6 py-3'
              }`}
              onClick={() => trackCTAClick('Download', 'navigation', 'primary')}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{navigation.cta.label}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => {
              const newState = !isOpen
              setIsOpen(newState)
              trackMobileMenu(newState ? 'opened' : 'closed')
            }}
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
            {navigation.links.map((link) => (
              <MobileNavLink key={link.label} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </MobileNavLink>
            ))}
            <a
              href={navigation.cta.href}
              className="btn-primary text-center mt-2"
              onClick={() => {
                trackCTAClick('Download', 'navigation', 'primary')
                setIsOpen(false)
              }}
            >
              <span>{navigation.cta.label}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const label = typeof children === 'string' ? children : 'nav_link'
  return (
    <motion.a
      href={href}
      className="text-sm text-muted hover:text-foreground transition-colors relative group"
      whileHover={{ y: -2 }}
      onClick={() => trackNavClick(label, href)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  const label = typeof children === 'string' ? children : 'nav_link'
  return (
    <a
      href={href}
      onClick={() => {
        trackNavClick(label, href)
        onClick()
      }}
      className="text-muted hover:text-foreground transition-colors py-2 border-b border-card-border last:border-0"
    >
      {children}
    </a>
  )
}
