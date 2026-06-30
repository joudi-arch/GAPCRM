import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Count-up that fires when scrolled into view (sections are all mounted at once
// on a long scroll page, so mount-triggered counting would fire too early).
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className = '',
  amount = 0.6,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf
    let start
    const dur = duration * 1000
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / dur, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
