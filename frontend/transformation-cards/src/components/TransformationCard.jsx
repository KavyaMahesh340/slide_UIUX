import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function TransformationCard({ card }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10])

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const transition = { 
    duration: 0.45, 
    ease: [0.22, 1, 0.36, 1] // Custom quintic-out for a smooth, premium feel
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsExpanded(false);
      }}
      onMouseEnter={() => setIsExpanded(true)}
      style={{
        rotateX,
        rotateY,
        scale: isExpanded ? 1.02 : 1,
        transformStyle: 'preserve-3d',
      }}
      className="relative h-[750px] cursor-pointer overflow-hidden rounded-2xl bg-slate-200 border border-slate-300/50 isolate"
    >
      <div 
        className="absolute inset-0 rounded-2xl bg-slate-200"
        style={{ 
          transform: 'translateZ(0)', 
          boxShadow: isExpanded 
            ? '0 0 50px -5px rgba(0,0,0,0.3), inset 0 0 0 2px #e2e8f0' 
            : '0 10px 30px -10px rgba(0,0,0,0.2), 0 0 15px 0px rgba(0,0,0,0.05), inset 0 0 0 2px #e2e8f0' 
        }}
      />

      {/* BOTTOM LAYER: The Reveal */}
      <motion.div 
        className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl"
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ 
          y: isExpanded ? 0 : 20, 
          opacity: isExpanded ? 1 : 0, 
          scale: isExpanded ? 1 : 0.98, 
        }}
        transition={transition}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={card.image}
          alt={card.bottomLabel}
          className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white/60" />
        
        <AnimatePresence>
          {isExpanded && card.overlayText && (
            <motion.p
              key="overlay-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="relative z-10 max-w-[320px] px-8 text-center text-base leading-relaxed text-slate-900 font-normal tracking-wide"
            >
              {card.overlayText}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MIDDLE LAYER: The White Shutter */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          className="relative h-1/2 w-full bg-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
          initial={{ y: 0 }}
          animate={{ 
            y: isExpanded ? -297 : 0, 
            boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.1)' : '0 10px 20px rgba(0,0,0,0.05)'
          }}
          transition={transition}
          style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full shadow-sm border"
            animate={{ 
              backgroundColor: isExpanded ? '#ffffff' : '#f8fafc',
              borderColor: '#e2e8f0',
              color: '#94a3b8',
            }}
            style={{ transform: 'translateZ(20px)' }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <ArrowUp size={22} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* TOP LAYER: The Labels */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-between pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex h-[78px] w-full items-center justify-center" style={{ transform: 'translateZ(0)' }}>
          <span className="text-xl font-bold tracking-wide text-black drop-shadow-md text-center">
            {card.topLabel}
          </span>
        </div>

        <span className="mb-8 text-xl font-semibold tracking-wide text-black text-center">
          {card.bottomLabel}
        </span>
      </div>
    </motion.div>
  )
}