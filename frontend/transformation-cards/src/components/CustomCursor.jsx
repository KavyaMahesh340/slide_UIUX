import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [particles, setParticles] = useState([])
  const lastSpawn = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)

  // Primary star tracks the raw mouse position 1:1 for full control
  const starX = useMotionValue(-100)
  const starY = useMotionValue(-100)
  // Tail follows the star with a light, responsive spring
  const tailX = useSpring(starX, { stiffness: 500, damping: 35, mass: 0.6 })
  const tailY = useSpring(starY, { stiffness: 500, damping: 35, mass: 0.6 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      starX.set(e.clientX)
      starY.set(e.clientY)

      // Throttle particle spawns: one spark per burst, skip tiny movements
      const now = Date.now()
      const dist = Math.hypot(e.clientX - lastX.current, e.clientY - lastY.current)
      if (now - lastSpawn.current < 50 || dist < 10) return
      lastSpawn.current = now
      lastX.current = e.clientX
      lastY.current = e.clientY

      const spark = {
        id: `spark-${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 2.5 + 1.5,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: ['#FFD700', '#FFB800', '#FFFFFF'][Math.floor(Math.random() * 3)],
      }
      setParticles((prev) => [...prev.slice(-25), spark])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [starX, starY])

  return (
    <>
      {/* Primary Star Pointer - tracks mouse 1:1 */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[10000]"
        style={{
          x: starX,
          y: starY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
          willChange: 'transform',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 93%, 50% 71%, 21% 93%, 32% 57%, 2% 35%, 39% 35%)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 0 12px rgba(255, 200, 0, 0.9), 0 0 30px rgba(255, 200, 0, 0.45)',
        }}
      >
      </motion.div>

      {/* Trailing Star - follows behind with a spring */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9997]"
        style={{
          x: tailX,
          y: tailY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
          willChange: 'transform',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 93%, 50% 71%, 21% 93%, 32% 57%, 2% 35%, 39% 35%)',
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
        }}
      />

      {/* Sparkle layer */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {particles.map((p) => (
          <motion.svg
            key={p.id}
            className="fixed pointer-events-none"
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{
              x: p.x + p.vx * 40,
              y: p.y + p.vy * 40,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            width={p.size * 2}
            height={p.size * 2}
            viewBox="0 0 10 10"
            style={{ mixBlendMode: 'screen' }}
          >
            <polygon
              points="5,0 6.1,3.5 9.8,3.5 6.8,5.7 7.9,9.2 5,7.2 2.1,9.2 3.2,5.7 0.2,3.5 3.9,3.5"
              fill={p.color}
            />
          </motion.svg>
        ))}
      </div>
    </>
  )
}

export default CustomCursor