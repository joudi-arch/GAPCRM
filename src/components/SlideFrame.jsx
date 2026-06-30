import { motion } from 'framer-motion'
import { stagger, drawX } from './motion'

// Consistent editorial frame for every slide: the shared grid, side margins,
// running header (chapter label + slide index) and footer rule. Keeps ONE deck
// identity while the accent (--accent) is swapped per theme.
export default function SlideFrame({
  theme,
  index,
  total,
  eyebrow,
  owner,
  children,
  className = '',
  label = '',
  bg, // optional background override (e.g. ink panel for Nike)
  ink, // optional text color override
}) {
  const background = bg || theme.paper
  const textColor = ink || theme.ink
  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ background, color: textColor, '--accent': theme.accent }}
    >
      {/* Running header */}
      <div
        className="absolute left-0 right-0 top-0 flex items-center justify-between px-16 pt-9"
        style={{ color: textColor }}
      >
        <div className="label flex items-center gap-3 opacity-70">
          <span>{eyebrow || 'Gap · CRM Strategy'}</span>
        </div>
        <div className="label flex items-center gap-4 opacity-70">
          {owner && <span style={{ color: theme.accent }}>Presented by {owner}</span>}
          <span className="tnum">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Body — slides fill this; shared 16-unit horizontal margin */}
      <motion.div
        variants={stagger(0.15, 0.07)}
        initial="hidden"
        animate="show"
        className="absolute inset-0 flex flex-col px-16 pb-16 pt-24"
      >
        {children}
      </motion.div>

      {/* Footer rule */}
      <div className="absolute bottom-7 left-16 right-16">
        <motion.div
          variants={drawX}
          initial="hidden"
          animate="show"
          className="h-px origin-left"
          style={{ background: theme.rule }}
        />
        <div
          className="label mt-3 flex items-center justify-between opacity-60"
          style={{ color: textColor }}
        >
          <span>The Brand That Knows Your Fit</span>
          <span>{label}</span>
        </div>
      </div>
    </div>
  )
}
