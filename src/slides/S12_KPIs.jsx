import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { riseItem, fadeUp, EASE } from '../components/motion'

const kpis = [
  { value: 40, suffix: '%', dir: 'up', label: 'Fit-Profile Sign-Up', measure: 'Members who build a profile', when: '12 mo · quarterly' },
  { value: 20, suffix: '%', dir: 'down', label: 'Denim Return Rate', measure: 'Returns from sizing / fit', when: '1 yr · monthly' },
  { value: 25, suffix: '%', dir: 'up', label: 'Fit-Rec Conversion', measure: 'Buy a recommended product', when: '1 yr · monthly' },
  { value: 15, suffix: '%', dir: 'up', label: 'Repeat Purchase', measure: 'Return after building a profile', when: '18 mo · quarterly' },
  { value: 10, prefix: '+', suffix: '%', dir: 'up', label: 'Member Spend Uplift', measure: 'Members vs non-members', when: '18 mo · quarterly' },
]

export default function S12KPIs({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="11 · Success Metrics" label="KPIs">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          How we measure the shift
        </span>
      </Reveal>
      <h2 className="mt-3 font-display text-h1">
        <Reveal variants={riseItem}>Five KPIs — from volume to value.</Reveal>
      </h2>

      <div className="mt-12 grid flex-1 grid-cols-5 gap-5">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            variants={fadeUp}
            className="flex flex-col rounded-lg border bg-paper-card p-5 shadow-sm transition-transform duration-300 ease-editorial hover:-translate-y-1"
            style={{ borderColor: theme.rule }}
          >
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl" style={{ color: theme.accent }}>
                <AnimatedNumber value={k.value} prefix={k.prefix || ''} suffix={k.suffix} delay={0.3 + i * 0.08} />
              </span>
            </div>
            <div className="mt-1 label flex items-center gap-1 opacity-60">
              {k.dir === 'up' ? 'target ↑' : 'target ↓'}
            </div>

            <div className="mt-4 font-display text-lg leading-tight">{k.label}</div>
            <p className="mt-1 text-[0.85rem] leading-snug text-muted">{k.measure}</p>

            {/* progress toward target */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full" style={{ background: `${theme.accent}1A` }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: theme.accent }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, k.value * (k.dir === 'down' ? 2 : 2.2))}%` }}
                transition={{ duration: 1, ease: EASE, delay: 0.4 + i * 0.08 }}
              />
            </div>
            <div className="mt-auto pt-4 label opacity-50">{k.when}</div>
          </motion.div>
        ))}
      </div>
    </SlideFrame>
  )
}
