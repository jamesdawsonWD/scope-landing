'use client'

import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { LazyVideo } from './ui/LazyVideo'

// Layout pattern:
// Row 1-2: [2 cols] + [1 col] - both 2 rows tall
// Row 3-4: [1 col] + [2 cols] - both 2 rows tall
// Row 5-6: [2 cols] + [1 col] - both 2 rows tall
const workflows = [
  // Row 1-2
  {
    title: 'Chromatic Cosmic Jellyfish',
    video: '/videos/video-1.mp4',
    link: 'https://app.daydream.live/creators/viborc/chromatic-cosmic-jellyfish',
    colSpan: 2,
  },
  {
    title: 'Overworld Waypoint Prompt Guide',
    video: '/videos/video-2.mp4',
    link: 'https://app.daydream.live/creators/ericxtang/overworld-waypoint-prompt-guide',
    colSpan: 1,
  },
  // Row 3-4
  {
    title: 'Scope V2V Integration for Unity',
    video: '/videos/video-6.mp4',
    link: 'https://app.daydream.live/creators/hupey/scope-v2v-integration-for-unity',
    colSpan: 1,
  },
  {
    title: 'Jiggly Cubes — VACE Depth-Controlled Video',
    video: '/videos/video-3.mp4',
    link: 'https://app.daydream.live/creators/ddickinson/video-conductor',
    colSpan: 2,
  },
  // Row 5-6
  {
    title: 'The Ninth Door Game | Three.js-Scope',
    video: '/videos/video-4.mp4',
    link: 'https://app.daydream.live/creators/juan-goyret/the-ninth-door-game-threejs-scope',
    colSpan: 2,
  },
  {
    title: 'Origami Christmas Vibes',
    video: '/videos/video-5.mp4',
    link: 'https://app.daydream.live/creators/viborc/origami-christmas-vibes',
    colSpan: 1,
  },
]

export default function WorkflowGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="workflows" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explore <span className="gradient-text">Workflows</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Craft unique interactive experiences with the latest open-source real-time AI models 
            like Overworld Waypoint-1, Krea Real-Time, and LongLive.
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
          {workflows.map((workflow, index) => (
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
            href="https://app.daydream.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 px-8 py-4"
          >
            Discover More
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function WorkflowCard({ workflow, index }: { workflow: (typeof workflows)[0]; index: number }) {
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
