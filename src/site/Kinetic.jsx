import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const wordV = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
}

// Oversized headline that wipes up word-by-word when scrolled into view.
// Accent words use the world colour; weight and motion provide emphasis.
export default function Kinetic({
  text,
  className = '',
  world,
  accentIdx = [],
  once = true,
  amount = 0.6,
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={`block ${className}`}
    >
      {text.split(' ').map((wd, i) => (
        <span key={i} className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            variants={wordV}
            className="inline-block"
            style={
              accentIdx.includes(i) && world
                ? { color: world.accent }
                : undefined
            }
          >
            {wd}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
