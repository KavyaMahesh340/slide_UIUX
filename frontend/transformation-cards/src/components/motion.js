const EASE = [0.22, 1, 0.36, 1]

// Choreography: main transform 700–900ms, image 500–750ms,
// text 350–500ms, control 200–300ms.
export const TRANSITIONS = {
  expand: { ease: EASE, duration: 0.8 },
  image: { ease: EASE, duration: 0.62 },
  text: { ease: EASE, duration: 0.4 },
  control: { ease: EASE, duration: 0.25 },
}

// Image fills the active card, starting slightly zoomed (1.04 -> 1).
export const imageVariants = {
  hidden: { scale: 1.04, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { ...TRANSITIONS.image, delay: 0.06 },
  },
}

// Text block: opacity + small translateY.
export const metaVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...TRANSITIONS.text, delay },
  }),
}

// Description body.
export const descriptionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...TRANSITIONS.text, delay },
  }),
}