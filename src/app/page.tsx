'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import RealTimeShowcase from '@/components/RealTimeShowcase'
import UseCases from '@/components/UseCases'
import Models from '@/components/Models'
import Features from '@/components/Features'
import WorkflowGallery from '@/components/WorkflowGallery'
import Download from '@/components/Download'
import Community from '@/components/Community'
import VisionClose from '@/components/VisionClose'
import Footer from '@/components/Footer'
import { AnalyticsTracker, SectionTracker } from '@/components/Analytics'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      <AnalyticsTracker />
      <Navigation />
      <SectionTracker section="hero">
        <Hero />
      </SectionTracker>
      <SectionTracker section="realtime-showcase">
        <RealTimeShowcase />
      </SectionTracker>
      <SectionTracker section="models">
        <Models />
      </SectionTracker>
      <SectionTracker section="use-cases">
        <UseCases />
      </SectionTracker>
      <SectionTracker section="features">
        <Features />
      </SectionTracker>
      <SectionTracker section="workflows">
        <WorkflowGallery />
      </SectionTracker>
      <SectionTracker section="download">
        <Download />
      </SectionTracker>
      <SectionTracker section="community">
        <Community />
      </SectionTracker>
   
      <SectionTracker section="footer">
        <Footer />
      </SectionTracker>
    </motion.main>
  )
}
