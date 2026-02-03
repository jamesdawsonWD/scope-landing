'use client'

import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { LazyVideo } from './ui/LazyVideo'
import { workflowGallery, urls } from '@/content/copy'
import { renderText } from '@/lib/renderText'

export default function WorkflowGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="workflows" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-left min-[375px]:text-center">
            {renderText(workflowGallery.heading)}
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto text-left min-[375px]:text-center">
            {renderText(workflowGallery.description)}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gridAutoRows: '200px' }}
        >
          {workflowGallery.items.map((workflow, index) => (
            <WorkflowCard key={index} workflow={workflow} index={index} />
          ))}
        </motion.div>

        {/* Discover More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href={urls.discover}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 px-8 py-4"
          >
            {workflowGallery.cta}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function WorkflowCard({ workflow, index }: { workflow: (typeof workflowGallery.items)[0]; index: number }) {
  return (
    <motion.a
      href={workflow.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`group cursor-pointer row-span-2 ${workflow.colSpan === 2 ? 'md:col-span-2' : ''}`}
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-card border border-card-border hover:border-white/30 transition-colors">
        {/* Video */}
        <LazyVideo 
          src={workflow.video}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play/View overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <ExternalLink className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">View Workflow</span>
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
            {workflow.title}
          </h3>
        </div>
      </div>
    </motion.a>
  )
}
