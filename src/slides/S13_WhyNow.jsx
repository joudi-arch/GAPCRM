import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import { riseItem, fadeUp } from '../components/motion'

const assets = [
  ['The infrastructure', 'Gap Good Rewards already unifies four brands and collects first-party data.'],
  ['The customer base', '40 million members — and a heritage adult segment with the highest lifetime value.'],
  ['The brand heritage', 'Denim and casualwear are already what Gap is known for. Fit is the natural identity.'],
]

export default function S13WhyNow({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="12 · Why Now" label="Why Now">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          The timing is already in motion
        </span>
      </Reveal>
      <h2 className="mt-3 max-w-4xl font-display text-h1">
        <Reveal variants={riseItem}>This isn't a new programme.</Reveal>
        <Reveal variants={riseItem}>
          It's the <span style={{ color: theme.accent }}>next chapter of Encore.</span>
        </Reveal>
      </h2>

      <div className="mt-10 grid flex-1 grid-cols-12 gap-12">
        <motion.div variants={fadeUp} className="col-span-5 flex flex-col">
          <div
            className="rounded-lg p-6"
            style={{ background: theme.accent, color: theme.onAccent }}
          >
            <div className="label opacity-75">February 2026</div>
            <p className="mt-2 font-display text-2xl leading-snug">
              Gap Inc. launched <span className="font-serif-text italic">Encore</span> — a new, more
              rewarding loyalty experience.
            </p>
            <p className="mt-4 text-[0.95rem] opacity-85">
              The platform exists. Fit is the engine that makes it personal — turning a rewards
              programme into a relationship.
            </p>
          </div>
        </motion.div>

        <div className="col-span-7 flex flex-col justify-center">
          <div className="label mb-4 opacity-55">Gap already has everything it needs</div>
          <div className="space-y-5">
            {assets.map(([t, d]) => (
              <motion.div
                key={t}
                variants={fadeUp}
                className="grid grid-cols-[200px_1fr] gap-6 border-t pt-4"
                style={{ borderColor: theme.rule }}
              >
                <div className="font-display text-xl" style={{ color: theme.accent }}>
                  {t}
                </div>
                <p className="text-[1.02rem] leading-relaxed text-muted">{d}</p>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} className="mt-7 font-serif-text text-xl italic">
            The opportunity is to deploy all three with greater precision — and a clear commitment to
            relationships that outlast the last promotion.
          </motion.p>
        </div>
      </div>
    </SlideFrame>
  )
}
