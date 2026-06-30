import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

// Smooth-scroll to an element id (or top). Falls back to native if Lenis is off.
export function scrollToId(id) {
  const target = id ? document.getElementById(id) : 0
  if (lenisInstance && target !== null) {
    lenisInstance.scrollTo(target, { duration: 1.2, offset: 0 })
  } else if (target && target.scrollIntoView) {
    target.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Buttery smooth scroll (Lenis) wired into GSAP ScrollTrigger so scrubbed
// animations stay in sync. Returns nothing; mount once near the root.
export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })
    lenisInstance = lenis
    if (typeof window !== 'undefined') window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}
