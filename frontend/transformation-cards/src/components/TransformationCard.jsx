import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  TRANSITIONS,
  imageVariants,
  metaVariants,
  descriptionVariants,
} from './motion'

export default function TransformationCard({ card, active, hidden, onActivate }) {
  const reduced = useReducedMotion()

  return (
    <motion.button
      type="button"
      layout={!reduced}
      transition={TRANSITIONS.expand}
      className={['transformation-card', active ? 'is-active' : '', hidden ? 'is-hidden' : '']
        .filter(Boolean)
        .join(' ')}
      onClick={onActivate}
      aria-expanded={active}
      aria-label={active ? `Close ${card.title}` : `Open ${card.title}`}
    >
      {!active && <h2 className="transformation-card__title">{card.title}</h2>}

      <AnimatePresence>
        {active && (
          <motion.div
            className="active-image"
            initial={reduced ? false : 'hidden'}
            animate="visible"
            exit={reduced ? undefined : 'hidden'}
            variants={imageVariants}
          >
            <img
              src={card.image}
              alt={card.title}
              style={{ objectPosition: card.position }}
              draggable={false}
            />
            <div className="active-image__shade" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            className="active-content"
            initial={reduced ? false : 'hidden'}
            animate="visible"
            exit={reduced ? undefined : 'hidden'}
            variants={metaVariants}
            custom={0.45}
          >
            <h3 className="active-content__title">{card.title}</h3>
            <motion.p
              className="active-content__desc"
              initial={reduced ? false : 'hidden'}
              animate="visible"
              exit={reduced ? undefined : 'hidden'}
              variants={descriptionVariants}
              custom={0.62}
            >
              {card.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}