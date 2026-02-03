'use client'

import { ArrowRight } from 'lucide-react'

interface TrailingButtonProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function TrailingButton({ href, children, onClick, className = '' }: TrailingButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`trailing-button-wrapper ${className}`}
    >
      {/* Animated gradient border */}
      <span className="trailing-button-border" />
      
      {/* Inner button content */}
      <span className="trailing-button-inner">
        <span className="trailing-button-text">{children}</span>
        <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
      </span>
    </a>
  )
}
