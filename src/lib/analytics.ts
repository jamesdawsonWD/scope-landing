import posthog from 'posthog-js'

// =============================================================================
// ANALYTICS EVENT TRACKING
// Comprehensive tracking for a high-quality landing page
// =============================================================================

// Type definitions for better DX
type Platform = 'windows' | 'mac' | 'linux' | 'unknown'
type Section = 'hero' | 'realtime-showcase' | 'use-cases' | 'models' | 'features' | 'workflows' | 'download' | 'community' | 'vision' | 'footer'

// =============================================================================
// PAGE & NAVIGATION TRACKING
// =============================================================================

/**
 * Track navigation link clicks
 */
export function trackNavClick(linkName: string, href: string) {
  posthog.capture('nav_link_clicked', {
    link_name: linkName,
    href,
    location: 'navigation',
  })
}

/**
 * Track mobile menu interactions
 */
export function trackMobileMenu(action: 'opened' | 'closed') {
  posthog.capture('mobile_menu_toggled', {
    action,
  })
}

/**
 * Track logo clicks
 */
export function trackLogoClick() {
  posthog.capture('logo_clicked', {
    location: 'navigation',
  })
}

// =============================================================================
// CTA & CONVERSION TRACKING
// =============================================================================

/**
 * Track primary CTA button clicks (Download, Get Started, etc.)
 */
export function trackCTAClick(
  ctaName: string, 
  location: Section | 'navigation',
  variant: 'primary' | 'secondary' = 'primary'
) {
  posthog.capture('cta_clicked', {
    cta_name: ctaName,
    location,
    variant,
  })
}

/**
 * Track download button clicks with platform info
 */
export function trackDownloadClick(platform: Platform, version: string, location: Section) {
  posthog.capture('download_initiated', {
    platform,
    version,
    location,
    $set: {
      last_download_platform: platform,
      last_download_version: version,
    },
  })
}

/**
 * Track when download dropdown/modal is opened
 */
export function trackDownloadModalOpened(location: Section) {
  posthog.capture('download_modal_opened', {
    location,
  })
}

// =============================================================================
// CONTENT ENGAGEMENT TRACKING
// =============================================================================

/**
 * Track section visibility (scroll into view)
 */
export function trackSectionViewed(section: Section) {
  posthog.capture('section_viewed', {
    section,
  })
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(percentage: number) {
  posthog.capture('scroll_depth_reached', {
    percentage,
    milestone: `${percentage}%`,
  })
}

/**
 * Track time spent on page before action
 */
export function trackEngagementTime(seconds: number, action: string) {
  posthog.capture('engagement_time', {
    seconds,
    action,
  })
}

// =============================================================================
// VIDEO TRACKING
// =============================================================================

/**
 * Track video playback started
 */
export function trackVideoPlay(videoId: string, location: Section) {
  posthog.capture('video_played', {
    video_id: videoId,
    location,
  })
}

/**
 * Track video progress milestones (25%, 50%, 75%, 100%)
 */
export function trackVideoProgress(videoId: string, percentage: number, location: Section) {
  posthog.capture('video_progress', {
    video_id: videoId,
    percentage,
    milestone: `${percentage}%`,
    location,
  })
}

/**
 * Track video paused
 */
export function trackVideoPause(videoId: string, currentTime: number, location: Section) {
  posthog.capture('video_paused', {
    video_id: videoId,
    current_time: currentTime,
    location,
  })
}

// =============================================================================
// INTERACTIVE ELEMENT TRACKING
// =============================================================================

/**
 * Track model card interactions (carousel)
 */
export function trackModelCardView(modelName: string, index: number) {
  posthog.capture('model_card_viewed', {
    model_name: modelName,
    card_index: index,
  })
}

/**
 * Track model card click (external link)
 */
export function trackModelCardClick(modelName: string, href: string) {
  posthog.capture('model_card_clicked', {
    model_name: modelName,
    href,
  })
}

/**
 * Track use case card interactions
 */
export function trackUseCaseViewed(useCaseId: string, title: string) {
  posthog.capture('use_case_viewed', {
    use_case_id: useCaseId,
    title,
  })
}

/**
 * Track use case card click
 */
export function trackUseCaseClick(useCaseId: string, title: string) {
  posthog.capture('use_case_clicked', {
    use_case_id: useCaseId,
    title,
  })
}

/**
 * Track feature card interactions
 */
export function trackFeatureViewed(featureId: string, title: string) {
  posthog.capture('feature_viewed', {
    feature_id: featureId,
    title,
  })
}

/**
 * Track workflow gallery interactions
 */
export function trackWorkflowViewed(workflowId: string, title: string) {
  posthog.capture('workflow_viewed', {
    workflow_id: workflowId,
    title,
  })
}

// =============================================================================
// EXTERNAL LINK TRACKING
// =============================================================================

/**
 * Track external link clicks (GitHub, Discord, Docs, etc.)
 */
export function trackExternalLink(linkName: string, href: string, location: Section | 'navigation' | 'footer') {
  posthog.capture('external_link_clicked', {
    link_name: linkName,
    href,
    location,
    domain: new URL(href).hostname,
  })
}

/**
 * Track social media link clicks
 */
export function trackSocialClick(platform: string, href: string, location: 'navigation' | 'footer') {
  posthog.capture('social_link_clicked', {
    platform,
    href,
    location,
  })
}

// =============================================================================
// FOOTER TRACKING
// =============================================================================

/**
 * Track footer link clicks
 */
export function trackFooterLink(linkName: string, href: string, column: string) {
  posthog.capture('footer_link_clicked', {
    link_name: linkName,
    href,
    column,
  })
}

// =============================================================================
// ERROR & FEEDBACK TRACKING
// =============================================================================

/**
 * Track errors (video loading failures, etc.)
 */
export function trackError(errorType: string, errorMessage: string, context?: Record<string, unknown>) {
  posthog.capture('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    ...context,
  })
}

// =============================================================================
// PERFORMANCE TRACKING
// =============================================================================

/**
 * Track page load performance
 */
export function trackPagePerformance() {
  if (typeof window !== 'undefined' && window.performance) {
    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (timing) {
      posthog.capture('page_performance', {
        dns_time: timing.domainLookupEnd - timing.domainLookupStart,
        connection_time: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - timing.requestStart,
        dom_interactive: timing.domInteractive - timing.startTime,
        dom_complete: timing.domComplete - timing.startTime,
        load_complete: timing.loadEventEnd - timing.startTime,
      })
    }
  }
}

/**
 * Track Core Web Vitals
 */
export function trackWebVitals(metric: { name: string; value: number; id: string }) {
  posthog.capture('web_vital', {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_id: metric.id,
  })
}

// =============================================================================
// USER PROPERTY TRACKING
// =============================================================================

/**
 * Identify user traits based on behavior
 */
export function identifyUserTraits(traits: Record<string, unknown>) {
  posthog.capture('$set', {
    $set: traits,
  })
}

/**
 * Track referral source
 */
export function trackReferralSource() {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')

    if (utmSource || utmMedium || utmCampaign || referrer) {
      posthog.capture('referral_tracked', {
        referrer,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        $set_once: {
          initial_referrer: referrer,
          initial_utm_source: utmSource,
          initial_utm_medium: utmMedium,
          initial_utm_campaign: utmCampaign,
        },
      })
    }
  }
}

// =============================================================================
// A/B TEST & EXPERIMENT TRACKING
// =============================================================================

/**
 * Track experiment variant viewed
 */
export function trackExperimentViewed(experimentName: string, variant: string) {
  posthog.capture('$experiment_viewed', {
    experiment_name: experimentName,
    variant,
  })
}

// =============================================================================
// SCROLL DEPTH TRACKER HOOK HELPER
// =============================================================================

const trackedDepths = new Set<number>()

/**
 * Check and track scroll depth (call this on scroll)
 */
export function checkAndTrackScrollDepth() {
  if (typeof window === 'undefined') return

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  const percentage = Math.round((scrolled / scrollHeight) * 100)

  const milestones = [25, 50, 75, 90, 100]
  for (const milestone of milestones) {
    if (percentage >= milestone && !trackedDepths.has(milestone)) {
      trackedDepths.add(milestone)
      trackScrollDepth(milestone)
    }
  }
}

/**
 * Reset tracked depths (for SPA navigation)
 */
export function resetScrollTracking() {
  trackedDepths.clear()
}
