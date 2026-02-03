'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Github, Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { navigation, urls } from '@/content/copy'
import { trackNavClick, trackMobileMenu, trackLogoClick, trackCTAClick, trackExternalLink } from '@/lib/analytics'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  
  const { scrollY } = useScroll()
  
  // Check if we're on mobile or tablet (below lg breakpoint)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
  
  // Detect mobile/tablet on mount and resize
  useEffect(() => {
    const checkMobileOrTablet = () => setIsMobileOrTablet(window.innerWidth < 1024)
    checkMobileOrTablet()
    window.addEventListener('resize', checkMobileOrTablet)
    return () => window.removeEventListener('resize', checkMobileOrTablet)
  }, [])
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // On mobile/tablet, always keep nav in compact state (no animation)
    if (isMobileOrTablet) {
      setIsScrolled(true)
      return
    }
    
    // Determine scroll direction
    if (latest > lastScrollY) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }
    setLastScrollY(latest)
    
    // Only shrink when scrolled down past 300px AND scrolling down
    // Expand when scrolling up OR near top
    if (latest < 100) {
      setIsScrolled(false)
    } else if (latest > 300 && scrollDirection === 'down') {
      setIsScrolled(true)
    } else if (scrollDirection === 'up') {
      setIsScrolled(false)
    }
  })

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
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
            href="/"
            className="flex items-center"
            onClick={() => trackLogoClick()}
          >
            {/* Full logo with text - shown on: 321px-1023px (min-[321px] to lg) and xl+ */}
            <motion.img 
              src={navigation.logo.src}
              alt={navigation.logo.alt}
              className="w-auto hidden min-[321px]:block lg:hidden xl:block"
              initial={false}
              animate={{
                height: isScrolled ? '20px' : '22px',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Icon-only logo - shown on: 320px and below, and lg (1024px-1279px) */}
            <img 
              src={navigation.logo.iconSrc}
              alt={navigation.logo.alt}
              className="w-auto h-6 block min-[321px]:hidden lg:block xl:hidden"
            />
          </a>

          {/* Desktop Navigation - Hidden when scrolled, only on large screens */}
          <motion.div 
            className="hidden lg:flex items-center gap-8"
            initial={false}
            animate={{
              opacity: isScrolled ? 0 : 1,
              width: isScrolled ? 0 : 'auto',
              pointerEvents: isScrolled ? 'none' : 'auto',
            }}
            transition={{ duration: 0.3 }}
          >
            {navigation.links.map((link) => (
              <NavLink 
                key={link.label} 
                href={link.href}
                external={link.external}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>

          {/* Desktop CTA Buttons - Hidden on tablet/mobile */}
          <div className="hidden lg:flex items-center gap-4">
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
              className={`btn-primary flex items-center gap-2 transition-all duration-300 whitespace-nowrap ${
                isScrolled ? 'px-4 py-1.5' : 'px-6 py-3'
              }`}
              onClick={() => trackCTAClick('Download', 'navigation', 'primary')}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{navigation.cta.label}</span>
            </a>
          </div>

          {/* Tablet/Mobile: Download button (tablet only) + Menu button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Download button - visible on tablet (md), hidden on mobile */}
            <a
              href={navigation.cta.href}
              className="hidden md:flex btn-primary items-center gap-2 px-4 py-2 text-sm"
              onClick={() => trackCTAClick('Download', 'navigation', 'primary')}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{navigation.cta.label}</span>
            </a>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="p-2"
              onClick={() => {
                const newState = !isOpen
                setIsOpen(newState)
                trackMobileMenu(newState ? 'opened' : 'closed')
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile/Tablet Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="glass mt-2 rounded-2xl p-4 flex flex-col gap-4">
            {navigation.links.map((link) => (
              <MobileNavLink 
                key={link.label} 
                href={link.href} 
                external={link.external}
                onClick={() => setIsOpen(false)}
              >
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

function NavLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const label = typeof children === 'string' ? children : 'nav_link'
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-sm text-muted hover:text-foreground transition-colors relative group whitespace-nowrap"
      whileHover={{ y: -2 }}
      onClick={() => trackNavClick(label, href)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

function MobileNavLink({ href, children, external, onClick }: { href: string; children: React.ReactNode; external?: boolean; onClick: () => void }) {
  const label = typeof children === 'string' ? children : 'nav_link'
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
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
