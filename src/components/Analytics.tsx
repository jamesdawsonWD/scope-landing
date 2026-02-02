'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  checkAndTrackScrollDepth,
  trackPagePerformance,
  trackReferralSource,
  trackSectionViewed,
  resetScrollTracking,
} from '@/lib/analytics'

type Section = 'hero' | 'realtime-showcase' | 'use-cases' | 'models' | 'features' | 'workflows' | 'download' | 'community' | 'vision' | 'footer'

/**
 * Global analytics tracker - handles scroll depth, performance, referrals
 * Place this once in your main page component
 */
export function AnalyticsTracker() {
  useEffect(() => {
    // Track referral source on mount
    trackReferralSource()

    // Track page performance after load
    if (document.readyState === 'complete') {
      trackPagePerformance()
    } else {
      window.addEventListener('load', trackPagePerformance)
    }

    // Set up scroll depth tracking
    const handleScroll = () => {
      checkAndTrackScrollDepth()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', trackPagePerformance)
      resetScrollTracking()
    }
  }, [])

  return null
}

/**
 * Section visibility tracker - wraps a section and tracks when it comes into view
 */
export function SectionTracker({ 
  section, 
  children,
  className,
}: { 
  section: Section
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasTracked = useRef(false)

  useEffect(() => {
    if (isInView && !hasTracked.current) {
      hasTracked.current = true
      trackSectionViewed(section)
    }
  }, [isInView, section])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
