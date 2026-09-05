import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Interactive 3D ring that tilts toward the cursor
function FloatRing({ sx, sy }) {
  const reduced = useReducedMotion()
  const rotateX = useTransform(sy, (v) => v * 26)
  const rotateY = useTransform(sx, (v) => v * -26)

  return (
    <motion.div
      className="absolute left-1/2 top-[56px] pointer-events-none"
      style={{
        translateX: '-50%',
        translateY: '-50%',
        x: sx,
        y: sy,
        perspective: 700,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative w-32 h-32"
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-white/50"
          style={{ boxShadow: '0 0 40px rgba(255,255,255,0.25), inset 0 0 40px rgba(255,255,255,0.12)' }} />
        <div className="absolute inset-5 rounded-full border border-white/25" />
        <div className="absolute inset-0 rounded-full border-t-4 border-amber-300/80"
          style={{ transform: 'translateZ(28px)', boxShadow: '0 0 20px rgba(255,215,0,0.35)' }} />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: 'translateZ(-28px)',
            border: '2px solid rgba(148,163,184,0.4)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Shimmering 4-point sparkle
function Spark({ sx, sy, depth, size, className, color, dur, delay }) {
  const reduced = useReducedMotion()
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth * 0.7)

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ x, y, width: size, height: size }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        animate={
          reduced
            ? undefined
            : { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6], rotate: [0, 45, 0] }
        }
        transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
          fill={color} />
      </motion.svg>
    </motion.div>
  )
}

const Floating3D = () => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Spark sx={sx} sy={sy} depth={34} size={46}
        className="right-[16%] top-[16%]" color="rgba(255,255,255,0.9)" dur={3.2} delay={0} />
      <Spark sx={sx} sy={sy} depth={44} size={32}
        className="left-[15%] bottom-[24%]" color="rgba(255,215,0,0.9)" dur={4} delay={0.6} />
      <Spark sx={sx} sy={sy} depth={28} size={26}
        className="right-[38%] top-[8%]" color="rgba(224,242,254,0.9)" dur={3.6} delay={1.2} />

      <FloatRing sx={sx} sy={sy} />
    </div>
  )
}

export default Floating3D