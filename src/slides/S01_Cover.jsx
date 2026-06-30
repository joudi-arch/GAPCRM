import { motion } from 'framer-motion'
import { stagger, riseItem, fadeUp, drawX } from '../components/motion'
import Reveal from '../components/Reveal'
import BrandLogo from '../components/BrandLogo'
import { team } from '../deck.config'

export default function S01Cover({ theme }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: theme.paper, color: theme.ink, '--accent': theme.accent }}
    >
      {/* masthead */}
      <motion.div
        variants={stagger(0.1, 0.06)}
        initial="hidden"
        animate="show"
        className="absolute inset-0 flex flex-col px-16 py-12"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <span className="label opacity-70">Customer Relationship Management · Group Pitch</span>
          <BrandLogo brand="gap" color={theme.accent} height={40} />
        </motion.div>

        <motion.div variants={drawX} className="mt-5 h-px origin-left" style={{ background: theme.rule }} />

        {/* Headline */}
        <div className="flex flex-1 flex-col justify-center">
          <Reveal variants={riseItem}>
            <span className="label mb-6 inline-block" style={{ color: theme.accent }}>
              A CRM Strategy for Gap
            </span>
          </Reveal>
          <h1 className="font-display text-hero">
            <Reveal variants={riseItem}>The Brand That</Reveal>
            <Reveal variants={riseItem}>
              <span style={{ color: theme.accent }}>Knows Your Fit.</span>
            </Reveal>
          </h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-body text-muted">
            Moving Gap from discount-driven acquisition to a fit-led loyalty relationship that
            compounds customer lifetime value.
          </motion.p>
        </div>

        {/* footer credits */}
        <motion.div variants={drawX} className="h-px origin-left" style={{ background: theme.rule }} />
        <motion.div variants={fadeUp} className="mt-5 flex items-end justify-between">
          <div>
            <div className="label mb-2 opacity-55">Prepared for Gap stakeholders by</div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-display text-lg">
              {team.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
          <div className="label text-right opacity-55">
            <div>BBA6 · N2 · 2026.1</div>
            <div className="mt-1">Les Roches</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
