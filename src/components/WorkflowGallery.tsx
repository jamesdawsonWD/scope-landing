'use client'

import { motion, useInView } from 'framer-motion'
import { ExternalLink, User } from 'lucide-react'
import { useRef } from 'react'

// Layout pattern:
// Row 1-2: [2 cols] + [1 col] - both 2 rows tall
// Row 3-4: [1 col] + [2 cols] - both 2 rows tall
// Row 5-6: [2 cols] + [1 col] - both 2 rows tall
const workflows = [
  // Row 1-2
  {
    title: '3D Abstract Shape Transformation',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://clips.t3.storage.dev/assets/1763492560145-c354cace.mp4',
    colSpan: 2,
  },
  {
    title: 'Urban Battlefield',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://clips.t3.storage.dev/assets/1769500553761-3280e975.mp4',
    colSpan: 1,
  },
  // Row 3-4
  {
    title: 'Panda Park Walk',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://storage.googleapis.com/livepeer-ai-video-dev/creators/panda/panda.mp4',
    colSpan: 1,
  },
  {
    title: 'Factory Fire to Rain',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://clips.t3.storage.dev/assets/1769460782968-ae272f92.mp4',
    colSpan: 2,
  },
  // Row 5-6
  {
    title: 'Cyberpunk City',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://clips.t3.storage.dev/assets/1769216428640-db08573d.mp4',
    colSpan: 2,
  },
  {
    title: 'Neon Dreams',
    author: 'Yondon Fu',
    avatar: '/images/avatars/yondon-fu.jpg',
    video: 'https://clips.t3.storage.dev/assets/1766989249287-1e92ecc3.mp4',
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
            Scope builders are sharing workflows using the latest real-time video and world models. 
            Try one today, or contribute your own.
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
      </div>
    </section>
  )
}

function WorkflowCard({ workflow, index }: { workflow: (typeof workflows)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`group cursor-pointer row-span-2 ${workflow.colSpan === 2 ? 'md:col-span-2' : ''}`}
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-card border border-card-border">
        {/* Video */}
        <video 
          src={workflow.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play/View overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <ExternalLink className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">View</span>
          </div>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
            {workflow.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            {workflow.avatar ? (
              <img 
                src={workflow.avatar} 
                alt={workflow.author}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
            )}
            <span>{workflow.author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
