import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import { riseItem, fadeUp, EASE } from '../components/motion'

const stages = ['Acquisition', 'Development', 'Retention']

export default function S03Problem({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="02 · The Problem" label="The Problem">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          The diagnosis
        </span>
      </Reveal>
      <h2 className="mt-3 max-w-5xl font-display text-h1">
        <Reveal variants={riseItem}>Gap is stuck in the</Reveal>
        <Reveal variants={riseItem}>
          acquisition stage — buying loyalty with <span style={{ color: theme.accent }}>discounts.</span>
        </Reveal>
      </h2>

      {/* lifecycle visual */}
      <div className="mt-12 flex items-center gap-3">
        {stages.map((s, i) => {
          const stuck = i === 0
          return (
            <motion.div
              key={s}
              variants={fadeUp}
              className="relative flex-1"
            >
              <div
                className="flex h-24 items-center justify-center rounded-sm border text-center"
                style={{
                  borderColor: stuck ? theme.accent : theme.rule,
                  background: stuck ? theme.accent : 'transparent',
                  color: stuck ? theme.onAccent : theme.muted,
                  borderWidth: stuck ? 2 : 1,
                  borderStyle: stuck ? 'solid' : 'dashed',
                }}
              >
                <div>
                  <div className="font-display text-2xl">{s}</div>
                  {stuck && <div className="label mt-1 opacity-80">Gap is here</div>}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="label absolute -right-2 top-1/2 z-10 -translate-y-1/2 translate-x-full px-1 opacity-40">
                  →
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 grid grid-cols-12 gap-12">
        <motion.div variants={fadeUp} className="col-span-6 border-t pt-5" style={{ borderColor: theme.rule }}>
          <div className="label opacity-60">Negative retention</div>
          <p className="mt-2 text-body text-muted">
            Gap Cash campaigns condition customers to buy <span className="text-ink">only on
            discount</span>. The value exchange is one-directional: price out, revenue in, no
            relationship built. Margin erodes; churn stays high.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="col-span-6 border-t pt-5" style={{ borderColor: theme.rule }}>
          <div className="label opacity-60">What the theory says</div>
          <p className="mt-2 text-body text-muted">
            Buttle &amp; Maklan (2024) call this a <span className="text-ink">fragile, price-driven
            segment</span> — retention depends on the next promotion, not genuine preference. CLV says
            investment should follow value, not discount frequency.
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  )
}
