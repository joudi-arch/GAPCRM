import { motion, useTransform } from 'framer-motion'
import { bigIdeaContent } from '../../content/pitch'
import { worlds } from '../worlds'

const gap = worlds.gap
const EASE = [0.16, 1, 0.3, 1]

function stageStyle(reducedMotion, opacity, y) {
  return reducedMotion ? undefined : { opacity, y }
}

// Shared entrance for the intro copy — same language as every other slide.
// Static mode (reduced motion / poster) shows everything immediately.
const enter = (reducedMotion, delay = 0) => (reducedMotion ? {} : {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.7, delay, ease: EASE },
})

export default function BigIdeaOverlay({ progress, reducedMotion = false }) {
  // One copy block on stage at a time. Each beat fades the previous block up
  // and out first, then settles the next one in — a clean replace, never two
  // blocks half-visible on top of each other. (Stage targets live in
  // three/bigIdeaNav: 0.52 profile, 0.74 recommendations, 0.95 outcome.)
  const profileOpacity = useTransform(progress, [0.42, 0.51, 0.54, 0.62], [0, 1, 1, 0])
  const profileY = useTransform(progress, [0.42, 0.51, 0.54, 0.62], [20, 0, 0, -14])
  const recommendationsOpacity = useTransform(progress, [0.63, 0.73, 0.76, 0.84], [0, 1, 1, 0])
  const recommendationsY = useTransform(progress, [0.63, 0.73, 0.76, 0.84], [20, 0, 0, -14])
  const outcomeOpacity = useTransform(progress, [0.85, 0.94], [0, 1])
  const outcomeY = useTransform(progress, [0.85, 0.94], [20, 0])

  return (
    <div className="relative flex min-h-[72vh] w-full flex-col justify-center pb-12 pt-20 lg:min-h-[78vh] lg:max-w-[58rem]">
      <motion.p {...enter(reducedMotion)} className="font-hanken mb-5 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.28em]" style={{ color: gap.accent }}>
        <span className="h-px w-12" style={{ background: gap.accent }} />
        The recommendation
      </motion.p>

      <motion.h2 {...enter(reducedMotion, 0.1)} className="font-grotesk max-w-[12ch] text-balance font-extrabold uppercase leading-[0.9] tracking-[-0.035em]" style={{ fontSize: 'clamp(2.8rem, 6.4vw, 6rem)', color: gap.ink }}>
        Make fit Gap’s identity—<span style={{ color: gap.accent }}>not its weakness.</span>
      </motion.h2>

      <motion.p {...enter(reducedMotion, 0.22)} className="font-hanken mt-6 max-w-[46ch] text-pretty text-xl leading-relaxed" style={{ color: gap.sub }}>
        {bigIdeaContent.explanation}
      </motion.p>

      <div className={`mt-10 max-w-[34rem] ${reducedMotion ? 'grid gap-8' : 'relative min-h-[16rem]'}`}>
        <motion.dl
          aria-label="Example fit profile"
          className={reducedMotion ? '' : 'absolute inset-x-0 top-0'}
          style={stageStyle(reducedMotion, profileOpacity, profileY)}
        >
          <div className="font-hanken mb-3 flex items-center justify-between border-b border-white/25 pb-3 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: gap.accent }}>
            <span>Your fit profile</span>
            <span>Profile complete</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            {bigIdeaContent.profile.map(([label, value]) => (
              <div key={label} className="font-hanken flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5">
                <dt className="text-base" style={{ color: gap.sub }}>{label}</dt>
                <dd className="font-grotesk text-lg font-bold" style={{ color: gap.ink }}>{value}</dd>
              </div>
            ))}
          </div>
        </motion.dl>

        <motion.div
          className={reducedMotion ? '' : 'absolute inset-x-0 top-0'}
          style={stageStyle(reducedMotion, recommendationsOpacity, recommendationsY)}
        >
          <div className="font-hanken mb-2 border-b border-white/25 pb-3 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: gap.accent }}>
            Denim in your exact fit
          </div>
          <ol aria-label="Fit recommendations">
            {bigIdeaContent.recommendations.map((recommendation) => (
              <li key={recommendation.name} className="grid grid-cols-[1fr_auto] items-center gap-x-5 border-b border-white/10 py-3">
                <span className="font-grotesk text-xl font-bold" style={{ color: gap.ink }}>{recommendation.name}</span>
                <span className="font-hanken text-lg font-semibold tabular-nums" style={{ color: gap.accent }}>{recommendation.match}%</span>
                <span className="col-span-2 mt-2 h-px origin-left bg-white/15">
                  <span className="block h-px" style={{ width: `${recommendation.match}%`, background: gap.accent }} />
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className={reducedMotion ? '' : 'absolute inset-x-0 top-1'}
          style={stageStyle(reducedMotion, outcomeOpacity, outcomeY)}
        >
          <p className="font-hanken mb-3 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: gap.accent }}>The compounding loop</p>
          <p className="font-grotesk max-w-[30ch] text-balance text-3xl font-extrabold leading-tight" style={{ color: gap.ink }}>
            {bigIdeaContent.outcome}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
