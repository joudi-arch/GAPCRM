import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import { riseItem, fadeUp } from '../components/motion'

const signals = [
  { brand: 'Zara', signal: 'demand data', accent: '#000000' },
  { brand: 'Uniqlo', signal: 'customer feedback', accent: '#FF0000' },
  { brand: 'Nike', signal: 'membership', accent: '#111111' },
  { brand: 'Harley-Davidson', signal: 'ownership', accent: '#F47216' },
]

export default function S05Insight({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="04 · The Insight" label="The Insight">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          What the best brands have in common
        </span>
      </Reveal>
      <h2 className="mt-3 max-w-5xl font-display text-h1">
        <Reveal variants={riseItem}>Every brand we studied turns</Reveal>
        <Reveal variants={riseItem}>
          <span style={{ color: theme.accent }}>one signal</span> into a relationship.
        </Reveal>
      </h2>

      <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-body text-muted">
        They don't win on price. They each found a single proprietary signal — and built their
        entire customer strategy around it.
      </motion.p>

      <div className="mt-auto grid grid-cols-4 gap-6">
        {signals.map((s) => (
          <motion.div
            key={s.brand}
            variants={fadeUp}
            className="border-t-2 pt-4"
            style={{ borderColor: s.accent }}
          >
            <div className="font-display text-2xl">{s.brand}</div>
            <div className="mt-2 label opacity-55">turns</div>
            <div className="font-display text-xl" style={{ color: s.accent }}>
              {s.signal}
            </div>
            <div className="mt-1 label opacity-55">into loyalty</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-8 rounded-sm px-6 py-4"
        style={{ background: theme.accent, color: theme.onAccent }}
      >
        <p className="font-display text-2xl">
          Gap's untapped signal is <span className="font-serif-text italic">fit.</span>
        </p>
      </motion.div>
    </SlideFrame>
  )
}
