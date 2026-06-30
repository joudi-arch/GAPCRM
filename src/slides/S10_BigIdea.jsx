import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { riseItem, fadeUp, EASE } from '../components/motion'
import { bigIdeaContent } from '../content/pitch'

const [fitThesisLead, fitThesisClose] = bigIdeaContent.thesis.split('—')

export default function S10BigIdea({ theme, index, total }) {
  return (
    <SlideFrame
      theme={theme}
      index={index}
      total={total}
      eyebrow="09 · The Recommendation"
      label="The Big Idea"
    >
      <div className="flex items-start justify-between">
        <div>
          <Reveal variants={riseItem}>
            <span className="label" style={{ color: theme.accent }}>
              The Encore Loyalty Framework
            </span>
          </Reveal>
          <h2 className="mt-3 font-display text-h1">
            <Reveal variants={riseItem}>{fitThesisLead}—</Reveal>
            <Reveal variants={riseItem}>
              <span style={{ color: theme.accent }}>{fitThesisClose}</span>
            </Reveal>
          </h2>
        </div>
        <motion.p variants={fadeUp} className="mt-2 max-w-xs text-right text-[0.98rem] text-muted">
          {bigIdeaContent.explanation}
        </motion.p>
      </div>

      {/* Walkthrough */}
      <div className="mt-8 grid flex-1 grid-cols-[340px_auto_1fr] items-stretch gap-8">
        {/* STEP 1 — the fit profile builds */}
        <motion.div
          variants={fadeUp}
          className="relative flex flex-col rounded-lg border bg-paper-card p-6 shadow-sm"
          style={{ borderColor: theme.rule }}
        >
          <div className="label opacity-55">Step 01 · Build once</div>
          <div className="mt-1 font-display text-2xl">Your Fit Profile</div>

          {/* scanning shimmer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-24 h-12 rounded"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}14, transparent)` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          />

          <div className="mt-5 space-y-3">
            {bigIdeaContent.profile.map(([k, v], i) => (
              <motion.div
                key={k}
                className="flex items-center justify-between border-b pb-2"
                style={{ borderColor: theme.rule }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 0.4, ease: EASE }}
              >
                <span className="text-sm text-muted">{k}</span>
                <span className="font-mono text-sm" style={{ color: theme.accent }}>
                  {v}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-auto flex items-center gap-2 pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <span
              className="grid h-5 w-5 place-items-center rounded-full text-[11px]"
              style={{ background: theme.accent, color: theme.onAccent }}
            >
              ✓
            </span>
            <span className="label opacity-65">Profile complete</span>
          </motion.div>
        </motion.div>

        {/* connector */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="h-px w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            style={{ background: theme.accent, minWidth: 36, transformOrigin: 'left' }}
          />
          <span className="label mt-2 opacity-55">powers</span>
        </div>

        {/* STEP 2 — tailored recommendations fan in */}
        <div className="flex flex-col">
          <div className="label opacity-55">Step 02 · Personalised forever</div>
          <div className="mt-1 font-display text-2xl">Denim, in your exact fit</div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            {bigIdeaContent.recommendations.map((r, i) => (
              <motion.div
                key={r.name}
                className="flex flex-col rounded-lg border bg-paper-card p-4 shadow-sm"
                style={{ borderColor: theme.rule }}
                initial={{ opacity: 0, y: 24, rotate: i === 0 ? -2 : i === 2 ? 2 : 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2.2 + i * 0.2, duration: 0.5, ease: EASE }}
              >
                {/* denim swatch */}
                <div
                  className="mb-3 h-20 w-full rounded"
                  style={{
                    background: `linear-gradient(160deg, ${theme.accent}, ${theme.accentDeep})`,
                  }}
                />
                <div className="font-display text-[0.95rem] leading-tight">{r.name}</div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[11px]"
                    style={{ background: theme.accent, color: theme.onAccent }}
                  >
                    <AnimatedNumber value={r.match} suffix="% fit" delay={2.5 + i * 0.2} duration={0.9} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* flywheel outcome */}
          <motion.div
            variants={fadeUp}
            className="mt-auto grid grid-cols-4 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1 }}
          >
            <div className="col-span-4 rounded-sm px-3 py-2" style={{ border: `1px solid ${theme.rule}` }}>
              <span className="font-display text-sm" style={{ color: theme.ink }}>
                {bigIdeaContent.outcome}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  )
}
