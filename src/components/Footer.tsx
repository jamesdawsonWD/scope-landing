'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, MessageCircle } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Download', href: 'https://github.com/daydreamlive/scope/tags' },
    { label: 'Features', href: '#features' },
    { label: 'Workflows', href: '#workflows' },
    { label: 'Documentation', href: 'https://docs.daydream.live/' },
  ],
  Community: [
    { label: 'Discord', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'GitHub', href: 'https://github.com/daydreamlive/scope' },
    { label: 'Discover', href: 'https://app.daydream.live/' },
  ],
  Resources: [
    { label: 'Getting Started', href: 'https://docs.daydream.live/' },
    { label: 'Learn', href: 'https://docs.daydream.live/' },
    { label: 'Examples', href: 'https://app.daydream.live/' },
    { label: 'Changelog', href: 'https://github.com/daydreamlive/scope/tags' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/daydreamlive/scope', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-card-border">

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <motion.a 
              href="#"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/logo.jpeg" 
                alt="Scope" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-semibold">Scope</span>
            </motion.a>
            <p className="text-sm text-muted mb-6">
              A composable engine for real-time video world models.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-card border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/50 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-card-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Livepeer. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Built with{' '}
            <span className="gradient-text">♥</span>
            {' '}by the Daydream team
          </p>
        </div>
      </div>
    </footer>
  )
}
