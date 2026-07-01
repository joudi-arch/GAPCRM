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

  // Arrow keys are the primary controller: buttery glides between section
  // "stops". Tall pinned sections (the Big Idea) get per-viewport beats so the
  // presenter can step through their internal timeline.
  useEffect(() => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const stops = () => {
      const secs = Array.from(document.querySelectorAll('#pitch-content section[id]')).sort(
        (a, b) => a.offsetTop - b.offsetTop
      )
      const vh = window.innerHeight
      const ys = []
      secs.forEach((s) => {
        ys.push(s.offsetTop)
        if (s.offsetHeight > vh * 1.5) {
          const beats = Math.floor(s.offsetHeight / vh)
          for (let b = 1; b < beats; b++) ys.push(Math.round(s.offsetTop + b * vh * 0.92))
        }
      })
      ys.sort((a, b) => a - b)
      return ys.filter((y, i) => i === 0 || y - ys[i - 1] > 12)
    }

    const glideTo = (y) => {
      if (window.__lenis) {
        window.__lenis.scrollTo(y, { duration: 1.1, easing: easeOutCubic, lock: true })
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }

    const step = (dir) => {
      const ys = stops()
      if (!ys.length) return
      const mark = window.scrollY + 6
      let idx = 0
      ys.forEach((y, i) => {
        if (y <= mark) idx = i
      })
      glideTo(ys[Math.max(0, Math.min(ys.length - 1, idx + dir))])
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
          const ys = stops()
          glideTo(ys[ys.length - 1])
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
