import { motion, useTransform } from 'framer-motion'
import { bigIdeaContent } from '../../content/pitch'
import { worlds } from '../worlds'

const gap = worlds.gap

function stageStyle(reducedMotion, opacity, y) {
  return reducedMotion ? undefined : { opacity, y }
}

export default function BigIdeaOverlay({ progress, reducedMotion = false }) {
  const profileOpacity = useTransform(progress, [0.32, 0.4, 0.56, 0.62], [0, 1, 1, 0])
  const profileY = useTransform(progress, [0.32, 0.42], [24, 0])
  const recommendationsOpacity = useTransform(progress, [0.54, 0.62, 0.79, 0.84], [0, 1, 1, 0])
  const recommendationsY = useTransform(progress, [0.54, 0.66], [24, 0])
  const outcomeOpacity = useTransform(progress, [0.78, 0.86], [0, 1])
  const outcomeY = useTransform(progress, [0.78, 0.9], [24, 0])

  return (
    <div className="relative flex min-h-[72vh] w-full flex-col justify-center pb-12 pt-20 lg:min-h-[78vh] lg:max-w-[58rem]">
      <p className="font-hanken mb-5 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.28em]" style={{ color: gap.accent }}>
        <span className="h-px w-12" style={{ background: gap.accent }} />
        The recommendation
      </p>

      <h2 className="font-grotesk max-w-[12ch] text-balance font-extrabold uppercase leading-[0.9] tracking-[-0.035em]" style={{ fontSize: 'clamp(2.8rem, 6.4vw, 6rem)', color: gap.ink }}>
        Make fit Gap’s identity—<span style={{ color: gap.accent }}>not its weakness.</span>
      </h2>

      <p className="font-hanken mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed" style={{ color: gap.sub }}>
        {bigIdeaContent.explanation}
      </p>

      <div className={`mt-10 min-h-[12rem] max-w-[38rem] ${reducedMotion ? 'grid gap-8' : 'relative'}`}>
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
                <dt className="text-sm" style={{ color: gap.sub }}>{label}</dt>
                <dd className="font-grotesk font-bold" style={{ color: gap.ink }}>{value}</dd>
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
                <span className="font-grotesk text-lg font-bold" style={{ color: gap.ink }}>{recommendation.name}</span>
                <span className="font-hanken font-semibold tabular-nums" style={{ color: gap.accent }}>{recommendation.match}%</span>
                <span className="col-span-2 mt-2 h-px origin-left bg-white/15">
                  <span className="block h-px" style={{ width: `${recommendation.match}%`, background: gap.accent }} />
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className={reducedMotion ? '' : 'absolute inset-x-0 top-2'}
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
