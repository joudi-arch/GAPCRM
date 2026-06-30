import { motion } from 'framer-motion'
import { EASE } from './motion'
import AnimatedNumber from './AnimatedNumber'

// ---- Donut / gauge: single percentage target -------------------------------
export function Gauge({ value, label, sub, accent = 'var(--accent)', size = 168 }) {
  const r = size / 2 - 12
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="10" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * pct) / 100 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl" style={{ color: accent }}>
            <AnimatedNumber value={value} suffix="%" />
          </span>
        </div>
      </div>
      <div className="mt-3 font-display text-lg leading-tight">{label}</div>
      {sub && <div className="label mt-1 opacity-60">{sub}</div>}
    </div>
  )
}

// ---- Bullet: value vs target ----------------------------------------------
export function Bullet({ value, target, label, sub, accent = 'var(--accent)', suffix = '%' }) {
  const max = Math.max(value, target) * 1.25
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-display text-lg">{label}</span>
        <span className="font-mono text-sm" style={{ color: accent }}>
          <AnimatedNumber value={value} suffix={suffix} />
        </span>
      </div>
      <div className="relative mt-2 h-3 w-full rounded-sm" style={{ background: 'currentColor', opacity: 1 }}>
        <div className="absolute inset-0 rounded-sm bg-current opacity-10" />
        <motion.div
          className="absolute left-0 top-0 h-full rounded-sm"
          style={{ background: accent }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        />
        {/* target marker */}
        <div
          className="absolute top-[-3px] h-[18px] w-[2px]"
          style={{ left: `${(target / max) * 100}%`, background: 'currentColor' }}
          title={`Target ${target}${suffix}`}
        />
      </div>
      {sub && <div className="label mt-1.5 opacity-55">{sub}</div>}
    </div>
  )
}

// ---- Waffle: proportion of a 10x10 grid -----------------------------------
export function Waffle({ value, label, sub, accent = 'var(--accent)' }) {
  const filled = Math.round(value)
  const cells = Array.from({ length: 100 })
  return (
    <div>
      <div className="grid grid-cols-10 gap-[3px]" style={{ width: 150 }}>
        {cells.map((_, i) => {
          const on = i < filled
          return (
            <motion.span
              key={i}
              className="block aspect-square rounded-[1px]"
              style={{ background: on ? accent : 'currentColor' }}
              initial={{ opacity: on ? 0 : 0.1 }}
              animate={{ opacity: on ? 1 : 0.1 }}
              transition={{ duration: 0.25, delay: on ? 0.3 + i * 0.006 : 0 }}
            />
          )
        })}
      </div>
      <div className="mt-3 font-display text-lg leading-tight">{label}</div>
      {sub && <div className="label mt-1 opacity-60">{sub}</div>}
    </div>
  )
}

// ---- Compare bars: members vs non-members ---------------------------------
export function CompareBars({ a, b, accent = 'var(--accent)' }) {
  const max = Math.max(a.value, b.value)
  const Row = ({ item, isAccent, delay }) => (
    <div className="flex items-center gap-4">
      <span className="w-40 shrink-0 text-right font-display text-base">{item.name}</span>
      <div className="relative h-9 flex-1">
        <motion.div
          className="absolute left-0 top-0 flex h-full items-center justify-end rounded-sm pr-3"
          style={{ background: isAccent ? accent : 'currentColor', opacity: isAccent ? 1 : 0.18 }}
          initial={{ width: 0 }}
          animate={{ width: `${(item.value / max) * 100}%` }}
          transition={{ duration: 1, ease: EASE, delay }}
        >
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: isAccent ? '#fff' : 'currentColor' }}
          >
            {item.display}
          </span>
        </motion.div>
      </div>
    </div>
  )
  return (
    <div className="space-y-4">
      <Row item={a} isAccent delay={0.2} />
      <Row item={b} isAccent={false} delay={0.35} />
    </div>
  )
}
