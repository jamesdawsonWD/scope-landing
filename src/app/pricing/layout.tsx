import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Pricing',
  description: 'Simple, usage-based pricing for the Daydream API. No seat licenses. No API key fees. You pay for what you stream.',
  openGraph: {
    title: 'API Pricing | Scope',
    description: 'Simple, usage-based pricing for the Daydream API. 10 hours free per month.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Pricing | Scope',
    description: 'Simple, usage-based pricing for the Daydream API. 10 hours free per month.',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
