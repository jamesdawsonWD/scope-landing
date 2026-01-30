'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import DaydreamProgram from '@/components/DaydreamProgram'
import Footer from '@/components/Footer'

export default function ProgramPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen"
    >
      <Navigation />
      <DaydreamProgram />
      <Footer />
    </motion.main>
  )
}
