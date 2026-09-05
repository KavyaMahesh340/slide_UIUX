import React from 'react'
import { motion } from 'framer-motion'

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. The Ambient Orbs - Soft, drifting light sources */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20"
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ backgroundColor: '#3b82f6' }} // Soft Blue
      />
      
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-10"
        animate={{ 
          x: [0, -150, 0], 
          y: [0, -100, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ backgroundColor: '#10b981' }} // Soft Emerald
      />

      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full blur-[100px] opacity-15"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ backgroundColor: '#6366f1' }} // Soft Indigo
      />

      {/* 2. The Precision Grid - Subtle dot matrix */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}
      />

      {/* 3. The Vignette - Softening the edges to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]" />
    </div>
  )
}

export default BackgroundEffects