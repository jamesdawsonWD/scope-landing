import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PostHogProvider } from '@/lib/posthog'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://scope.livepeer.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Scope - Real-Time AI Video Starts Here',
    template: '%s | Scope',
  },
  description: 'The open-source tool for running, remixing, and building with AI video models, live. No batch renders. No waiting. Just hit play.',
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
  authors: [{ name: 'Livepeer', url: 'https://livepeer.org' }],
  creator: 'Livepeer',
  publisher: 'Livepeer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Scope',
    title: 'Scope - Real-Time AI Video Starts Here',
    description: 'The open-source tool for running, remixing, and building with AI video models, live. No batch renders. No waiting. Just hit play.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scope real-time AI video generator interface showing live video transformation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scope - Real-Time AI Video Starts Here',
    description: 'The open-source tool for running, remixing, and building with AI video models, live. No batch renders. No waiting. Just hit play.',
    images: ['/og-image.jpg'],
    creator: '@Livepeer',
    site: '@Livepeer',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/daydream-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/daydream-logo.svg" />
        
        {/* Preconnect to video CDN for faster loading */}
        <link rel="preconnect" href="https://scope.livepeer.cloud" />
        <link rel="dns-prefetch" href="https://scope.livepeer.cloud" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Scope',
              applicationCategory: 'MultimediaApplication',
              applicationSubCategory: 'Video Editor',
              operatingSystem: 'Windows, macOS, Linux',
              description: 'Free, open source real-time AI video generator. Transform live video with AI models like Overworld Waypoint, Krea Realtime, and LongLive. No batch rendering required.',
              url: siteUrl,
              downloadUrl: 'https://github.com/daydreamlive/scope/tags',
              softwareVersion: '0.1.0-beta.3',
              author: {
                '@type': 'Organization',
                name: 'Livepeer',
                url: 'https://livepeer.org',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              featureList: [
                'Real-time AI video generation',
                'Local-first processing',
                'World model support',
                'LoRA and ControlNet integration',
                'Composable workflows',
                'Open source',
              ],
            }),
          }}
        />
        {/* FAQ Schema for featured snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is real-time AI video?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Real-time AI video is AI-generated or AI-transformed video that renders instantly as you work, rather than requiring batch processing. Unlike traditional AI video tools that take minutes or hours to render clips, real-time AI video responds immediately to inputs, enabling live performances, interactive experiences, and instant creative iteration.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Scope free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, Scope is completely free and open source. You can download it for Windows, run it from source on Mac or Linux, and modify the code as needed. There are no subscription fees or usage limits.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What GPU do I need to run Scope?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Scope runs locally on your GPU. For best performance, an NVIDIA GPU with at least 8GB VRAM is recommended. Different AI models have different requirements, with lighter models like StreamDiffusion working on lower-end hardware.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
