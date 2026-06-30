import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import { riseItem, fadeUp, EASE } from '../components/motion'
import { rolloutPhases } from '../content/pitch'

const roles = [
  ['Data & CRM', 'Owns the fit profiles and the systems behind them'],
  ['Marketing', 'Turns profiles into tailored drops and content'],
  ['Product', 'Uses fit data to guide what denim Gap makes and stocks'],
]

export default function S11Rollout({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="10 · Implementation" label="How It Rolls Out">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          An 18-month rollout
        </span>
      </Reveal>
      <h2 className="mt-3 font-display text-h1">
        <Reveal variants={riseItem}>From a tool, to a habit, to a membership.</Reveal>
      </h2>

      {/* timeline */}
      <div className="relative mt-12">
        <motion.div
          className="absolute left-0 top-3 h-[2px] w-full origin-left"
          style={{ background: theme.rule }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        />
        <div className="grid grid-cols-3 gap-8">
          {rolloutPhases.map((p, i) => (
            <motion.div key={p.months} variants={fadeUp} className="relative pt-10">
              <span
                className="absolute left-0 top-0 grid h-7 w-7 -translate-y-[10px] place-items-center rounded-full font-mono text-xs"
                style={{ background: theme.accent, color: theme.onAccent }}
              >
                {i + 1}
              </span>
              <div className="label" style={{ color: theme.accent }}>
                {p.months} months
              </div>
              <h3 className="mt-2 font-display text-2xl">{p.deliverable}</h3>
              <p className="mt-2 text-sm uppercase tracking-wider" style={{ color: theme.accent }}>{p.owner}</p>
              <p className="mt-2 text-[0.94rem] leading-snug text-muted">Decision gate — {p.gate}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* roles */}
      <motion.div variants={fadeUp} className="mt-auto">
        <div className="label mb-3 opacity-55">One shared customer insight — three teams</div>
        <div className="grid grid-cols-3 gap-6">
          {roles.map(([r, d]) => (
            <div key={r} className="border-t pt-3" style={{ borderColor: theme.rule }}>
              <div className="font-display text-lg" style={{ color: theme.accent }}>
                {r}
              </div>
              <div className="mt-1 text-[0.92rem] leading-snug text-muted">{d}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SlideFrame>
  )
}
