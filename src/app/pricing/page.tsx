'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { trackCTAClick, trackExternalLink } from '@/lib/analytics'

const pricing = {
  heading: 'API Pricing',
  subheading: 'No seat licenses. No API key fees. You pay for what you stream.',
  plans: [
    {
      name: 'Pro',
      price: '10 hours free/month',
      priceSubtext: 'Then $1.50 per hour',
      features: [
        'Billed in 5-minute increments',
        'Unlimited concurrent streams',
        'Support in Discord',
      ],
      cta: {
        label: 'Get Started',
        href: 'https://app.daydream.live/',
      },
      highlighted: false,
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      priceSubtext: 'For volume discounts',
      features: [
        'Priority support',
        'Custom SLAs',
        'Design partnerships',
      ],
      cta: {
        label: 'Contact Us',
        href: 'mailto:hello@daydream.live',
      },
      highlighted: true,
    },
  ],
}

export default function PricingPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      <Navigation />
      
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-32 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-left md:text-center">
              {pricing.heading}
            </h1>
            <p className="text-base md:text-lg text-muted max-w-2xl mx-auto text-left md:text-center">
              {pricing.subheading}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {pricing.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-card/80 border-white/20 hover:border-white/30' 
                    : 'bg-card/60 border-card-border hover:border-white/20'
                }`}>
                  {/* Plan Name */}
                  <span className={`text-sm font-medium ${
                    plan.highlighted ? 'text-orange-400' : 'text-orange-400'
                  }`}>
                    {plan.name}
                  </span>

                  {/* Price */}
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
                    {plan.price}
                  </h2>
                  <p className="text-muted text-sm mb-8">
                    {plan.priceSubtext}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-muted flex-shrink-0" />
                        <span className="text-muted text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href={plan.cta.href}
                    target={plan.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={plan.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`block w-full py-3.5 rounded-full text-center font-medium transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (plan.cta.href.startsWith('http')) {
                        trackExternalLink(plan.cta.label, plan.cta.href, 'pricing')
                      } else {
                        trackCTAClick(plan.cta.label, 'pricing', 'primary')
                      }
                    }}
                  >
                    {plan.cta.label}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
