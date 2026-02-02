'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    // Session recording
    disable_session_recording: false,
    // Performance tracking
    capture_performance: true,
    // Respect Do Not Track
    respect_dnt: true,
    // Only load in production or if key is provided
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        // Uncomment to debug in development
        // posthog.debug()
      }
    },
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}

// Re-export posthog for direct usage
export { posthog }
