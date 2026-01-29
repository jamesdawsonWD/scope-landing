'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import Models from '@/components/Models'
import Features from '@/components/Features'
import WorkflowGallery from '@/components/WorkflowGallery'
import Download from '@/components/Download'
import DaydreamProgram from '@/components/DaydreamProgram'
import Community from '@/components/Community'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      <Navigation />
      <Hero />
      <ProductShowcase />
      <Features />
      <Models />
      <WorkflowGallery />
      <Download />
      <DaydreamProgram />
      <Community />
      <Footer />
    </motion.main>
  )
}
