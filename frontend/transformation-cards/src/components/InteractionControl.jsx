import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, X } from 'lucide-react'
import { TRANSITIONS } from './motion'

// The tiny green column control, absolutely positioned exactly on the
// seam between the column's two cards. Its seam -> top movement is a
// plain CSS transition (top / margin-top) so Framer only animates the
// icon swap without transform conflicts.
export default function InteractionControl({ active, onClick, label }) {
  const reduced = useReducedMotion()

  return (
    <button
      type="button"
      className={['seam-control', active ? 'is-active' : ''].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-expanded={active}
      aria-label={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active ? 'close' : 'open'}
          className="seam-control__icon"
          initial={reduced ? false : { opacity: 0, scale: 0.5, rotate: active ? 45 : -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.5, rotate: active ? -45 : 45 }}
          transition={TRANSITIONS.control}
        >
          {active ? <X size={16} strokeWidth={2.4} /> : <ArrowDown size={18} strokeWidth={2.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}