import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://scope.livepeer.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Scope - Real-Time Generative AI Engine',
    template: '%s | Scope',
  },
  description: 'Scope is an open source, local-first engine for real-time generative AI. Build interactive video experiences with the latest AI models like Overworld Waypoint, Krea Realtime, and LongLive.',
  keywords: [
    'generative AI',
    'real-time AI',
    'video AI',
    'world models',
    'open source AI',
    'Livepeer',
    'Daydream',
    'Overworld Waypoint',
    'Krea Realtime',
    'LongLive',
    'AI video generation',
    'interactive AI',
    'local AI',
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
    title: 'Scope - Real-Time Generative AI Engine',
    description: 'Open source, local-first engine for real-time generative AI. Build interactive video experiences with cutting-edge AI models.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Scope - Real-Time Generative AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scope - Real-Time Generative AI Engine',
    description: 'Open source, local-first engine for real-time generative AI. Build interactive video experiences.',
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
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Windows, macOS, Linux',
              description: 'Open source, local-first engine for real-time generative AI video and world models.',
              url: siteUrl,
              author: {
                '@type': 'Organization',
                name: 'Livepeer',
                url: 'https://livepeer.org',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '1',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}
