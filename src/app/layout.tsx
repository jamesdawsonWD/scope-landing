import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scope - A Composable Engine for Real-Time Video World Models',
  description: 'Scope is an open source and local-first tool for running and customizing real-time interactive video and world models.',
  keywords: ['video', 'AI', 'world models', 'real-time', 'open source', 'Livepeer', 'Daydream'],
  authors: [{ name: 'Livepeer' }],
  openGraph: {
    title: 'Scope - Real-Time Video World Models',
    description: 'Open source and local-first tool for running and customizing real-time interactive video and world models.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
