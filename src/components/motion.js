// Shared Framer Motion variants + reduced-motion helper.
import { useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

// Direction-aware slide transition (set by Deck via custom prop).
export const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
}

// Staggered container for entrance reveals on the active slide.
export const stagger = (delay = 0.12, each = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: each } },
})

// A single line/element rising into place behind a mask.
export const riseItem = {
  hidden: { y: '0.6em', opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
}

export const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

// Hairline rule that draws in horizontally.
export const drawX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
}

export { useReducedMotion }
