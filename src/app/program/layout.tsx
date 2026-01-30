import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daydream Interactive AI Video Program',
  description: 'A curated two-week creative lab for AI artists and technologists defining the next medium for live AI video. $5,000 in prizes, workshops, mentorship, and more.',
  openGraph: {
    title: 'Daydream Interactive AI Video Program',
    description: 'A curated two-week creative lab for AI artists and technologists. $5,000 in prizes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daydream Interactive AI Video Program',
    description: 'A curated two-week creative lab for AI artists and technologists. $5,000 in prizes.',
  },
}

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
