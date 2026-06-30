import { motion } from 'framer-motion'
import { riseItem } from './motion'

// A masked line/element that rises into place. Wrap text or blocks.
// Use inside a parent with variants={stagger()} + initial="hidden" animate="show".
export default function Reveal({ children, as = 'div', className = '', variants = riseItem }) {
  const MotionTag = motion[as] || motion.div
  return (
    <span className={`block overflow-hidden ${className}`}>
      <MotionTag variants={variants} className="block">
        {children}
      </MotionTag>
    </span>
  )
}
