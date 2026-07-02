import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion'
import useSmoothScroll from './useSmoothScroll'
import CursorGlow from './CursorGlow'
import { worlds } from './worlds'
import { Hero, GapToday, Problem, Gaps, Insight, Rollout, KPIs, WhyNow, CTA } from './sections/Narrative'
import { ZaraWorld, UniqloWorld, NikeWorld, HarleyWorld } from './sections/Benchmarks'
import BigIdeaExperience from './sections/BigIdeaExperience'
import { PerfProvider } from './three/usePerfGuard'
import { SceneRuntimeProvider } from './three/SceneRuntime'
import {
  bigIdeaNext,
  bigIdeaPrev,
  bigIdeaResetToStart,
  bigIdeaResetToEnd,
} from './three/bigIdeaNav'

export default function SiteScroll() {
  useSmoothScroll(true)
  const [active, setActive] = useState('gap')
  const world = worlds[active] || worlds.gap
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  // Switch the document into scrollable + snap mode while the site is mounted.
  useEffect(() => {
    document.documentElement.classList.add('snap-y')
    return () => document.documentElement.classList.remove('snap-y')
  }, [])

  // Keep the page surround matching the active world (shows on overscroll).
  useEffect(() => {
    document.body.style.background = world.base
  }, [world])

  // Arrow keys are the primary controller: one press = one clean glide that
  // lands exactly on the next/previous section. The "recommendation" slide owns
  // its own internal beats (scan → copy → copy…), so while the presenter is on
  // it, presses drive that timeline before handing off to the next slide.
  useEffect(() => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Absolute top of every section, robust to differing offset parents.
    const sections = () =>
      Array.from(document.querySelectorAll('#pitch-content section[id]'))
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY }))
        .sort((a, b) => a.top - b.top)

    const currentIndex = (list) => {
      const mark = window.scrollY + window.innerHeight * 0.45
      let idx = 0
      list.forEach((s, i) => {
        if (s.top <= mark) idx = i
      })
      return idx
    }

    // While a glide is in flight, scroll position is mid-way between slides, so
    // deriving "where am I" from scrollY mis-resolves and a press can skip a
    // slide (or eat its internal beats). Remember the slide we're heading to
    // and treat it as the current one until the glide lands.
    let inFlightId = null
    let inFlightTimer = 0
    const glideTo = (y, id = null) => {
      inFlightId = id
      window.clearTimeout(inFlightTimer)
      inFlightTimer = window.setTimeout(() => { inFlightId = null }, 1250)
      if (window.__lenis) {
        window.__lenis.scrollTo(y, {
          duration: 1.15,
          easing: easeOutCubic,
          lock: true,
          onComplete: () => { inFlightId = null },
        })
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    const step = (dir) => {
      const list = sections()
      if (!list.length) return
      const flightIdx = inFlightId ? list.findIndex((s) => s.id === inFlightId) : -1
      const idx = flightIdx >= 0 ? flightIdx : currentIndex(list)
      const here = list[idx]

      // On the recommendation slide, spend key presses on its internal beats
      // first; only hand off to a neighbour once its timeline is exhausted.
      if (here.id === 'big-idea' && !prefersReduced) {
        if (dir > 0 ? bigIdeaNext() : bigIdeaPrev()) return
      }

      const target = list[Math.max(0, Math.min(list.length - 1, idx + dir))]
      // Prime the slide's internal timeline for the direction we arrive from.
      if (target.id === 'big-idea' && target.id !== here.id && !prefersReduced) {
        if (dir > 0) bigIdeaResetToStart()
        else bigIdeaResetToEnd()
      }
      glideTo(target.top, target.id)
    }

    const onKey = (e) => {
      const el = document.activeElement
      const tag = (el?.tagName || '').toUpperCase()
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          step(1)
          break
        case ' ':
          if (tag === 'BUTTON' || tag === 'A') return
          e.preventDefault()
          step(1)
          break
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          step(-1)
          break
        case 'Home':
          e.preventDefault()
          glideTo(0)
          break
        case 'End': {
          e.preventDefault()
          const list = sections()
          if (list.length) glideTo(list[list.length - 1].top)
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(inFlightTimer)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <PerfProvider>
        <SceneRuntimeProvider>
          <CursorGlow glow={world.glow} />

          <a href="#pitch-content" className="skip-link">Skip to presentation</a>

          {/* scroll progress */}
          <motion.div
            className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
            style={{ scaleX: progress, background: world.accent }}
          />

          {/* persistent nav — mix-blend keeps it legible over any world */}
          <header aria-label="Presentation header" className="no-print fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[5vw] py-6 mix-blend-difference">
            <span className="font-grotesk text-xl font-extrabold text-white">GAP — CRM</span>
            <span className="font-hanken hidden text-[0.7rem] uppercase tracking-[0.3em] text-white sm:block">
              The Brand That Knows Your Fit
            </span>
          </header>

          {/* current-world indicator */}
          <div
            aria-hidden="true"
            className="no-print fixed bottom-5 left-[5vw] z-40 flex items-center gap-2 font-hanken text-[0.7rem] uppercase tracking-[0.3em]"
            style={{ color: world.accent }}
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: world.accent }} />
            {world.name}
          </div>

          <main id="pitch-content" className="relative">
            <Hero onActive={setActive} />
            <GapToday onActive={setActive} />
            <Problem onActive={setActive} />
            <Gaps onActive={setActive} />
            <Insight onActive={setActive} />
            <ZaraWorld onActive={setActive} />
            <UniqloWorld onActive={setActive} />
            <NikeWorld onActive={setActive} />
            <HarleyWorld onActive={setActive} />
            <BigIdeaExperience onActive={setActive} />
            <Rollout onActive={setActive} />
            <KPIs onActive={setActive} />
            <WhyNow onActive={setActive} />
            <CTA onActive={setActive} />
          </main>
        </SceneRuntimeProvider>
      </PerfProvider>
    </MotionConfig>
  )
}
