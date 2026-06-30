import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Count-up number. Animates from 0 → value on mount (slides remount when
// navigated to, so this fires exactly when the slide appears — and resolves
// to final state for print). Respects prefers-reduced-motion (snaps to value).
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.3,
  delay = 0.2,
  className = '',
}) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf
    let start
    const startMs = (delay || 0) * 1000
    const dur = duration * 1000
    const tick = (t) => {
      if (start === undefined) start = t
      const elapsed = t - start
      if (elapsed < startMs) {
        raf = requestAnimationFrame(tick)
        return
      }
      const p = Math.min((elapsed - startMs) / dur, 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration, delay, reduce])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={`tnum ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
