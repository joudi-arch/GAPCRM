import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion'
import useSmoothScroll from './useSmoothScroll'
import CursorGlow from './CursorGlow'
import { worlds } from './worlds'
import { Hero, GapToday, Problem, Gaps, Insight, BigIdea, Rollout, KPIs, WhyNow, CTA } from './sections/Narrative'
import { ZaraWorld, UniqloWorld, NikeWorld, HarleyWorld } from './sections/Benchmarks'
import { PerfProvider } from './three/usePerfGuard'
import SoundToggle from './SoundToggle'

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

  return (
    <MotionConfig reducedMotion="user">
      <PerfProvider>
      <CursorGlow glow={world.glow} />

      {/* scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
        style={{ scaleX: progress, background: world.accent }}
      />

      {/* persistent nav — mix-blend keeps it legible over any world */}
      <header className="no-print fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[5vw] py-6 mix-blend-difference">
        <span className="font-grotesk text-xl font-extrabold text-white">GAP — CRM</span>
        <span className="font-hanken hidden text-[0.7rem] uppercase tracking-[0.3em] text-white sm:block">
          The Brand That Knows Your Fit
        </span>
      </header>

      {/* current-world indicator */}
      <div
        className="no-print fixed bottom-5 left-[5vw] z-40 flex items-center gap-2 font-hanken text-[0.7rem] uppercase tracking-[0.3em]"
        style={{ color: world.accent }}
      >
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: world.accent }} />
        {world.name}
      </div>

      <SoundToggle world={active} accent={world.accent} />

      <main className="relative">
        <Hero onActive={setActive} />
        <GapToday onActive={setActive} />
        <Problem onActive={setActive} />
        <Gaps onActive={setActive} />
        <Insight onActive={setActive} />
        <ZaraWorld onActive={setActive} />
        <UniqloWorld onActive={setActive} />
        <NikeWorld onActive={setActive} />
        <HarleyWorld onActive={setActive} />
        <BigIdea onActive={setActive} />
        <Rollout onActive={setActive} />
        <KPIs onActive={setActive} />
        <WhyNow onActive={setActive} />
        <CTA onActive={setActive} />
      </main>
      </PerfProvider>
    </MotionConfig>
  )
}
