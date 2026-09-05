import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Create a new particle on every move
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color: ['#ffffff', '#e2e8f0', '#cbd5e1'][Math.floor(Math.random() * 3)],
      }
      
      setParticles((prev) => [...prev.slice(-30), newParticle])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Particle animation helper
  const renderParticles = () => {
    return particles.map((p) => (
      <motion.div
        key={p.id}
        className="fixed pointer-events-none rounded-full z-[9999]"
        initial={{ 
          x: p.x, 
          y: p.y, 
          opacity: 1, 
          scale: 1 
        }}
        animate={{ 
          x: p.x + p.vx * 80, 
          y: p.y + p.vy * 80, 
          opacity: 0, 
          scale: 0 
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ 
          width: p.size, 
          height: p.size, 
          backgroundColor: p.color,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`
        }}
      />
    ))
  }

  return (
    <>
      {/* Main Liquid Glass Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[10000] flex items-center justify-center"
        animate={{ x: mousePos.x - 14, y: mousePos.y - 14 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(4px) saturate(150%)',
          WebkitBackdropFilter: 'blur(4px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 15px 0 rgba(0,0,0,0.05), inset 0 0 8px rgba(255,255,255,0.1)',
        }}
      >
        {/* Specular Reflection Highlight */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full blur-[0.5px]" />
        
        {/* Subtle Inner Core to enhance lens look */}
        <div className="w-1 h-1 bg-white/10 rounded-full blur-sm" />
      </motion.div>
      
      {/* Glitter Particles */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {renderParticles()}
      </div>
    </>
  )
}

export default CustomCursor