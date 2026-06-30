import { motion } from 'framer-motion'
import MeshGradient from './MeshGradient'
import CursorGlow from './CursorGlow'
import Magnetic from './Magnetic'
import useSmoothScroll from './useSmoothScroll'
import AnimatedNumber from '../components/AnimatedNumber'
import { worlds } from './worlds'

const w = worlds.gap

const EASE = [0.16, 1, 0.3, 1]
const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

function Kinetic({ text, className, accentIdx = [] }) {
  return (
    <motion.span variants={line} initial="hidden" animate="show" className={`block ${className}`}>
      {text.split(' ').map((wd, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
          <motion.span
            variants={word}
            className="inline-block"
            style={
              accentIdx.includes(i)
                ? {
                    backgroundImage: `linear-gradient(100deg, ${w.grad[0]}, ${w.grad[1]})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }
                : undefined
            }
          >
            {wd}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function DemoHero() {
  useSmoothScroll(true)

  return (
    <div
      className="brandworld grain relative h-screen w-screen overflow-hidden"
      style={{ color: w.ink }}
    >
      <MeshGradient world={w} />
      <CursorGlow glow={w.glow} />

      {/* giant drifting logo watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.05, scale: 1, y: [0, -18, 0] }}
        transition={{ opacity: { duration: 1.4 }, y: { duration: 14, repeat: Infinity, ease: 'easeInOut' } }}
        className="font-grotesk allow-motion pointer-events-none absolute -right-[6vw] top-[6vh] select-none text-[44vw] font-extrabold leading-none"
        style={{ color: '#fff' }}
      >
        GAP
      </motion.div>

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[5vw] py-7">
        <div className="font-grotesk text-xl font-extrabold tracking-tight">GAP</div>
        <div className="font-hanken text-[0.7rem] uppercase tracking-[0.3em] opacity-70">
          CRM Strategy · Brand X · 2026
        </div>
      </div>

      {/* hero copy */}
      <div className="relative z-10 flex h-full flex-col justify-center px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 font-hanken text-[0.72rem] uppercase tracking-[0.35em]"
          style={{ color: w.accent }}
        >
          <span className="inline-block h-px w-12" style={{ background: w.accent }} />
          The Pitch
        </motion.div>

        <h1 className="font-grotesk font-extrabold uppercase leading-[0.86] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.8rem, 8.5vw, 9.5rem)' }}>
          <Kinetic text="Gap becomes" />
          <Kinetic text="the brand that" />
          <Kinetic text="knows your fit" accentIdx={[2]} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-hanken mt-8 max-w-xl text-lg leading-relaxed"
          style={{ color: w.sub }}
        >
          From discount-driven acquisition to a fit-led loyalty relationship that compounds customer
          lifetime value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-7"
        >
          <Magnetic strength={0.5}>
            <button
              className="font-hanken group relative flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold"
              style={{ background: w.accent, color: '#05070D' }}
            >
              Enter the pitch
              <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </button>
          </Magnetic>

          <div className="font-hanken flex items-baseline gap-3">
            <span className="font-grotesk text-5xl font-extrabold" style={{ color: w.ink }}>
              <AnimatedNumber value={40} suffix="M" duration={1.8} delay={1.2} />
            </span>
            <span className="max-w-[12rem] text-sm leading-tight" style={{ color: w.sub }}>
              members — one signal they're all missing
            </span>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="font-hanken absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em]"
        style={{ color: w.sub }}
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="allow-motion block h-8 w-px"
          style={{ background: w.accent }}
        />
      </motion.div>
    </div>
  )
}
