/**
 * Centralized copy/content for the Scope landing page.
 * 
 * All text content is defined here and imported into components.
 * Next.js will inline these strings at build time, so there's no runtime overhead.
 * 
 * Benefits:
 * - Single source of truth for all copy
 * - Easy to update content without touching component logic
 * - Enables future localization
 * - SEO content is easily auditable
 */

// =============================================================================
// SITE METADATA (used in layout.tsx)
// =============================================================================
export const siteMetadata = {
  title: 'Scope - Free Open Source Real-Time AI Video Generator',
  titleTemplate: '%s | Scope',
  description: 'Generate AI video in real-time with no batch rendering. Free, open source desktop app for live AI effects, world models, and interactive video. Runs locally on your GPU.',
  keywords: [
    'real-time AI video generator',
    'live AI video',
    'AI video effects',
    'world models',
    'open source AI video',
    'local AI video',
    'Overworld Waypoint',
    'Krea Realtime',
    'LongLive',
    'AI video streaming',
    'interactive AI video',
  ],
  openGraph: {
    title: 'Scope - Free Open Source Real-Time AI Video Generator',
    description: 'Generate AI video in real-time with no batch rendering. Free desktop app for live AI effects and world models. Download for Windows, Mac, or Linux.',
    imageAlt: 'Scope real-time AI video generator interface showing live video transformation',
  },
  twitter: {
    title: 'Scope - Free Open Source Real-Time AI Video Generator',
    description: 'Generate AI video in real-time. No batch rendering, no waiting. Free and open source.',
  },
}

// =============================================================================
// HERO SECTION
// =============================================================================
export const hero = {
  badge: 'Scope v0.1.0-beta.3',
  heading: 'Real-time AI video<br>starts here.',
  tagline: 'Open Source. Runs Locally.',
  description: 'The open-source tool for running, remixing, and building with <highlight>AI video models</highlight>, live. No batch renders. No waiting. Just hit play.',
  cta: {
    primary: {
      label: 'Download',
      href: '#download',
    },
    secondary: {
      label: 'Learn',
      href: 'https://docs.daydream.live/',
    },
  },
}

// =============================================================================
// REAL-TIME SHOWCASE (Parallax Section)
// =============================================================================
export const realTimeShowcase = {
  heading: {
    line1: 'AI video is going real-time.',
  },
  description: 'Most AI video tools render clips <highlight>after the fact</highlight>. Scope works <highlight>while you work</highlight>, transforming video as it happens. That opens up workflows and pipelines batch tools can\'t do.',
  scrollHint: 'Scroll to explore',
  nowShowing: 'Now showing:',
  
  useCases: [
    {
      id: 'live-performances',
      icon: 'Drama',
      title: 'Live performances',
      description: 'AI visuals that react to you, your audience, your music. No pre-renders.',
      video: '/videos/video-1.mp4',
    },
    {
      id: 'interactive-stories',
      icon: 'Gamepad2',
      title: 'Interactive stories',
      description: 'Choose-your-own-adventure experiences powered by world models.',
      video: '/videos/video-2.mp4',
    },
    {
      id: 'instant-previz',
      icon: 'Clapperboard',
      title: 'Instant pre-viz',
      description: 'See AI VFX concepts instantly instead of waiting hours for a render.',
      video: '/videos/video-3.mp4',
    },
    {
      id: 'ai-avatars',
      icon: 'Bot',
      title: 'AI avatars',
      description: 'Characters that exist in real-time, not as pre-recorded clips.',
      video: '/videos/video-4.mp4',
    },
    {
      id: 'pure-experimentation',
      icon: 'FlaskConical',
      title: 'Pure experimentation',
      description: 'Try the latest models the moment they drop. No gatekeepers.',
      video: '/videos/video-5.mp4',
    },
    {
      id: 'world-models',
      icon: 'Globe',
      title: 'World models',
      description: 'AI that simulates physics and environments in real-time. Games that generate themselves.',
      video: '/videos/video-6.mp4',
    },
  ],
}

// =============================================================================
// FIND YOUR LANE (Audience Section)
// =============================================================================
export const findYourLane = {
  heading: 'Find your <gradient>lane</gradient>',
  subtitle: 'Real-time AI video is new territory. <br> Find <highlight>your people</highlight> and your inspiration in the Daydream community..',
  
  audiences: [
    {
      id: 'researchers',
      icon: 'Microscope',
      title: 'Researchers & tinkerers',
      description: 'You want something to build on top of. Scope is your sandbox — break things, push boundaries, publish what you find.',
      video: '/videos/video-4.mp4',
    },
    {
      id: 'creative-tech',
      icon: 'Palette',
      title: 'Creative technologists',
      description: 'You already live in TouchDesigner, ComfyUI, or custom code. Scope adds real-time AI video to what you\'re already doing.',
      video: '/videos/video-5.mp4',
    },
    {
      id: 'performers',
      icon: 'Mic',
      title: 'Performers & VJs',
      description: 'You need AI visuals that react live. No pre-renders, no canned loops. Scope transforms your set as it happens.',
      video: '/videos/video-7.mp4',
    },
    {
      id: 'creators',
      icon: 'Video',
      title: 'AI-native creators',
      description: 'You\'re making stuff with AI every day. Scope is the fastest way to iterate on video ideas.',
      video: '/videos/video-3.mp4',
    },
  ],
}

// =============================================================================
// PRODUCT SHOWCASE
// =============================================================================
export const productShowcase = {
  heading: 'See Scope\'s AI Video <br> Generation <gradient>in Action</gradient>',
  description: 'Watch how Scope transforms live video in real-time. Combine <highlight>cutting-edge AI models</highlight> into custom workflows for video, games, and interactive experiences.',
  video: '/videos/video-8.mp4',
}

// =============================================================================
// MODELS SECTION
// =============================================================================
export const models = {
  heading: {
    line1: 'Run the latest models',
    line2: '  the day they drop',
  },
  description: 'World models, video diffusion, real-time style transfer. <br> <highlight>New AI video models are added to Scope as soon as they release.</highlight>',
  
  items: [
    {
      name: 'Overworld/Waypoint-1-Small',
      type: 'World Model',
      description: 'Real-time world simulation and generation',
      link: 'https://github.com/daydreamlive/scope-overworld',
      video: '/videos/video-2.mp4',
    },
    {
      name: 'krea/krea-realtime-video',
      type: 'Autoregressive Video Diffusion Model',
      description: 'Ultra-fast real-time video generation',
      link: 'https://github.com/daydreamlive/scope/blob/main/src/scope/core/pipelines/krea_realtime_video/docs/usage.md',
      video: '/videos/video-1.mp4',
    },
    {
      name: 'NVlabs/LongLive-1.3B',
      type: 'Autoregressive Video Diffusion Model',
      description: 'Long-form coherent video synthesis',
      link: 'https://github.com/daydreamlive/scope/blob/main/src/scope/core/pipelines/longlive/docs/usage.md',
      video: '/videos/video-6.mp4',
    },
    {
      name: 'KlingTeam/MemFlow',
      type: 'Autoregressive Video Diffusion Model',
      description: 'Memory-efficient video flow generation',
      link: 'https://github.com/daydreamlive/scope/blob/main/src/scope/core/pipelines/memflow/docs/usage.md',
      video: '/videos/video-3.mp4',
    },
    {
      name: 'StreamDiffusionV2',
      type: 'Autoregressive Video Diffusion Model',
      description: 'Streaming real-time diffusion pipeline',
      link: 'https://github.com/daydreamlive/scope/blob/main/src/scope/core/pipelines/streamdiffusionv2/docs/usage.md',
      video: '/videos/streamdiffusion-demo.mp4',
    },
    {
      name: 'Reward-Forcing-T2V-1.3B',
      type: 'Autoregressive Video Diffusion Model',
      description: 'Text-to-video with reward optimization',
      link: 'https://github.com/daydreamlive/scope/blob/main/src/scope/core/pipelines/reward_forcing/docs/usage.md',
      video: '/videos/video-5.mp4',
    },
  ],
}

// =============================================================================
// FEATURES SECTION
// =============================================================================
export const features = {
  heading: {
    line1: 'What makes',
    line2: ' Scope different.',
  },
  description: '<highlight>Open source, local-first</highlight>, and built for creators <br> who want <highlight>full control</highlight> over AI video generation.',
  
  items: {
    creativeControl: {
      title: 'Full Creative Control Over AI Video',
      description: 'Use VACE for inpainting and editing, LoRAs and ControlNets for output conditioning, director-style timeline config for storytelling, and composable plugins to build unique real-time video workflows.',
    },
    cloudApi: {
      title: 'Cloud API for AI Video Streaming',
      description: 'Deploy your real-time AI video pipelines on infrastructure purpose-built for low-latency video streaming.',
      badge: 'Coming Soon',
    },
    models: {
      title: 'State-of-the-Art AI Video Models',
      description: 'Run Waypoint-1, Krea Real-Time, LongLive, MemFlow, StreamDiffusion, and more.',
    },
    workflows: {
      title: 'Shareable AI Video Workflows',
      description: 'Save complete workflows, share with collaborators, and discover community-created presets for real-time AI video.',
    },
    localFirst: {
      title: 'Local GPU Processing',
      description: 'Run AI video generation locally. Your data never leaves your machine.',
    },
    openSource: {
      title: '100% Open Source',
    },
  },
}

// =============================================================================
// WORKFLOWS GALLERY
// =============================================================================
export const workflowGallery = {
  heading: 'Explore Community <br> <gradient>Workflows</gradient>',
  description: 'Browse community-created projects built with Scope. See what\'s possible with <highlight>real-time AI video models</highlight> like Waypoint-1, Krea, and LongLive.',
  cta: 'Discover More',
  
  items: [
    {
      title: 'Chromatic Cosmic Jellyfish',
      video: '/videos/video-1.mp4',
      link: 'https://app.daydream.live/creators/viborc/chromatic-cosmic-jellyfish',
      colSpan: 2,
    },
    {
      title: 'Overworld Waypoint Prompt Guide',
      video: '/videos/video-2.mp4',
      link: 'https://app.daydream.live/creators/ericxtang/overworld-waypoint-prompt-guide',
      colSpan: 1,
    },
    {
      title: 'Scope V2V Integration for Unity',
      video: '/videos/video-6.mp4',
      link: 'https://app.daydream.live/creators/hupey/scope-v2v-integration-for-unity',
      colSpan: 1,
    },
    {
      title: 'Video Conductor',
      video: '/videos/video-3.mp4',
      link: 'https://app.daydream.live/creators/ddickinson/video-conductor',
      colSpan: 2,
    },
    {
      title: 'The Ninth Door Game | Three.js-Scope',
      video: '/videos/video-4.mp4',
      link: 'https://app.daydream.live/creators/juan-goyret/the-ninth-door-game-threejs-scope',
      colSpan: 2,
    },
    {
      title: 'Origami Christmas Vibes',
      video: '/videos/video-5.mp4',
      link: 'https://app.daydream.live/creators/viborc/origami-christmas-vibes',
      colSpan: 1,
    },
  ],
}

// =============================================================================
// DOWNLOAD SECTION
// =============================================================================
export const download = {
  heading: 'Download Scope <gradient>Now</gradient>',
  description: 'Free, open source, and local-first. Install Scope, pick an AI model, connect a video source, and hit play. <highlight>Start generating AI video in minutes.</highlight>',
  
  windows: {
    title: 'Windows App',
    description: 'Native desktop app with full local inference support',
    cta: 'Download',
    href: 'https://github.com/daydreamlive/scope/tags',
  },
  macLinux: {
    title: 'Mac & Linux',
    description: 'Run locally from source with full customization',
    cta: 'Run Locally',
    href: 'https://github.com/daydreamlive/scope',
  },
  browser: {
    title: 'Browser App',
    description: 'Real-time AI video in your browser',
    badge: 'Coming Soon',
    cta: 'Join Waitlist',
    features: [
      { label: 'No GPU', sublabel: 'Required' },
      { label: 'Instant', sublabel: 'Model Access' },
      { label: 'Any Device', sublabel: 'Mac, PC, Mobile' },
    ],
    modal: {
      title: 'Scope <gradient>Browser App</gradient>',
      description: 'Real-time AI video generation in your browser with remote inference.',
      submitLabel: 'Join the Waitlist',
      submittingLabel: 'Joining...',
      successTitle: 'You\'re on the list!',
      successDescription: 'We\'ll notify you when we launch.',
      disclaimer: 'Be the first to know when the browser app launches.',
    },
  },
  github: {
    label: 'View on GitHub',
    href: 'https://github.com/daydreamlive/scope',
  },
}

// =============================================================================
// COMMUNITY SECTION
// =============================================================================
export const community = {
  heading: {
    line1: 'This medium is being ',
    line2: 'invented right now',
  },
  description: 'Consumer-grade world models are arriving this year. Games that generate themselves. Video that responds to viewers. AI characters you can talk to in real-time.\n\n<highlight>The people experimenting today are the ones who\'ll define how this works tomorrow.</highlight> That\'s what Scope is for.',
  testimonial: {
    quote: 'Daydream is the only space where there\'s information, tutorials, and projects for real-time video AI.',
    attribution: '— Community member',
  },
  cta: {
    primary: {
      label: 'Download Scope',
      href: '#download',
    },
    secondary: {
      label: 'Join Community',
      href: 'https://discord.gg/QXk48Jve',
    },
  },
}

// =============================================================================
// VISION / CLOSING SECTION
// =============================================================================
export const visionClose = {
  heading: {
    line1: 'The Future of AI Video',
    line2: 'Is Being Built Now',
  },
  description: '<highlight>Consumer-grade world models are arriving this year.</highlight> Self-generating games. Video that responds to viewers in real-time. AI characters you can interact with live.',
  cta: {
    primary: {
      label: 'Download Scope',
      href: '#download',
    },
    secondary: {
      label: 'Join the community',
      href: 'https://discord.com/invite/mnfGR4Fjhp',
    },
  },
}

// =============================================================================
// FOOTER
// =============================================================================
export const footer = {
  brand: {
    description: 'A composable engine for real-time video world models.',
  },
  links: {
    Resources: [
      { label: 'Learn', href: 'https://docs.daydream.live/' },
      { label: 'Roadmap', href: 'https://roadmap.daydream.live/' },
      { label: 'Pricing', href: 'https://daydream.live/pricing' },
    ],
    Products: [
      { label: 'Scope', href: '#download' },
      { label: 'API', href: 'https://docs.daydream.live/introduction' },
      { label: 'Community Hub', href: 'https://app.daydream.live/discover' },
      { label: 'Hosted StreamDiffusionTD', href: 'https://daydream.live/streamdiffusiontd' },
    ],
    Company: [
      { label: 'Careers', href: 'https://jobs.ashbyhq.com/daydreamlive' },
      { label: 'Contact', href: 'mailto:hello@daydream.live' },
    ],
    Legal: [
      { label: 'Terms of Service', href: 'https://daydream.live/terms' },
      { label: 'Privacy Policy', href: 'https://daydream.live/privacy-policy' },
    ],
  },
  social: [
    { platform: 'github', href: 'https://github.com/daydreamlive', label: 'GitHub' },
    { platform: 'twitter', href: 'https://x.com/DaydreamLiveAI', label: 'X' },
    { platform: 'discord', href: 'https://discord.com/invite/mnfGR4Fjhp', label: 'Discord' },
    { platform: 'youtube', href: 'https://www.youtube.com/channel/UCviyh_-8H2vkYq9ROHMBffQ', label: 'YouTube' },
    { platform: 'instagram', href: 'https://www.instagram.com/daydreamlive_/', label: 'Instagram' },
  ],
  copyright: '© {year} Livepeer. All rights reserved.',
  builtBy: 'Built with ♥ by the Daydream team',
}

// =============================================================================
// NAVIGATION
// =============================================================================
export const navigation = {
  logo: {
    alt: 'Daydream - Real-time AI video',
    src: '/images/daydream-logo.svg',
    iconSrc: '/daydream-logo.svg', // Icon-only version for mobile/tablet
  },
  links: [
    { label: 'Documentation', href: 'https://docs.daydream.live/scope/getting-started/quickstart', external: true },
    { label: 'Learn', href: 'https://docs.daydream.live/', external: true },
    { label: 'Community', href: 'https://app.daydream.live/discover', external: true },
    { label: 'Creator Program', href: '/program', external: false },
    { label: 'Pricing', href: '/pricing', external: false },
  ],
  github: 'https://github.com/daydreamlive/scope',
  cta: {
    label: 'Download',
    href: '#download',
  },
  programBanner: {
    label: 'Join Scope Creator Program',
    href: '/program',
  },
}

// =============================================================================
// URLS / EXTERNAL LINKS
// =============================================================================
export const urls = {
  site: 'https://scope.livepeer.cloud',
  github: 'https://github.com/daydreamlive',
  githubScope: 'https://github.com/daydreamlive/scope',
  githubReleases: 'https://github.com/daydreamlive/scope/tags',
  docs: 'https://docs.daydream.live/',
  docsApi: 'https://docs.daydream.live/introduction',
  roadmap: 'https://roadmap.daydream.live/',
  pricing: 'https://daydream.live/pricing',
  discord: 'https://discord.com/invite/mnfGR4Fjhp',
  twitter: 'https://x.com/DaydreamLiveAI',
  youtube: 'https://www.youtube.com/channel/UCviyh_-8H2vkYq9ROHMBffQ',
  instagram: 'https://www.instagram.com/daydreamlive_/',
  discover: 'https://app.daydream.live/discover',
  careers: 'https://jobs.ashbyhq.com/daydreamlive',
  contact: 'mailto:hello@daydream.live',
  terms: 'https://daydream.live/terms',
  privacy: 'https://daydream.live/privacy-policy',
  streamdiffusiontd: 'https://daydream.live/streamdiffusiontd',
  livepeer: 'https://livepeer.org',
}
