import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]
const revealT = { duration: 0.5, ease: EASE }

export default function TransformationCard({ card, onHover }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const rectRef = useRef(null)

  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 24, mass: 0.5 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 24, mass: 0.5 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8])

  // Cached rect so tilt never triggers layout during mousemove
  function handleMouseMove(event) {
    const rect = rectRef.current || event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    x.set((event.clientX - rect.left) / width - 0.5)
    y.set((event.clientY - rect.top) / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    rectRef.current = null
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsExpanded(false);
        onHover?.(false);
      }}
      onMouseEnter={(e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect()
        setIsExpanded(true);
        onHover?.(true);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      animate={{
        scale: isExpanded ? 1.02 : 1,
        boxShadow: isExpanded
          ? '0 35px 70px -18px rgba(0,0,0,0.65), 0 0 50px -12px rgba(0,0,0,0.45)'
          : '0 18px 45px -15px rgba(0,0,0,0.5)',
      }}
      transition={revealT}
      className="relative h-[750px] cursor-pointer overflow-hidden rounded-3xl bg-slate-200 border border-white/50 isolate"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl bg-slate-200"
        style={{ transform: 'translateZ(0)' }}
        animate={{
          boxShadow: isExpanded
            ? '0 0 50px -5px rgba(0,0,0,0.3), inset 0 0 0 2px #e2e8f0'
            : '0 10px 30px -10px rgba(0,0,0,0.2), 0 0 15px 0px rgba(0,0,0,0.05), inset 0 0 0 2px #e2e8f0',
        }}
        transition={revealT}
      />

      {/* BOTTOM LAYER: The Reveal */}
      <motion.div
        className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center overflow-hidden rounded-3xl"
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{
          y: isExpanded ? 0 : 24,
          opacity: isExpanded ? 1 : 0,
          scale: isExpanded ? 1 : 0.98,
        }}
        transition={revealT}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={card.image}
          alt={card.bottomLabel}
          className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-white/60" />

        <AnimatePresence>
          {isExpanded && card.overlayText && (
            <motion.p
              key="overlay-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: 0.35, ease: 'easeOut' }}
              className="relative z-10 max-w-[320px] px-8 text-center text-[16px] leading-relaxed text-slate-950 font-medium"
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
          initial={false}
          animate={{
            y: isExpanded ? -297 : 0,
            boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.1)' : '0 12px 24px rgba(0,0,0,0.05)',
          }}
          transition={revealT}
          style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-slate-200"
            animate={{ backgroundColor: isExpanded ? '#ffffff' : '#f1f5f9' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ transform: 'translateZ(20px)' }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ArrowUp size={22} className="text-slate-500" />
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