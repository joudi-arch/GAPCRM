import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { slides as slideDefs, slideLabels } from '../deck.config'
import { getTheme } from '../themes/themes'
import { slideVariants, EASE } from './motion'
import ProgressRail from './ProgressRail'

const STAGE_W = 1280
const STAGE_H = 720

// Scales the fixed 1280×720 stage to fit the viewport, preserving 16:9.
function useStageScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export default function Deck({ renderSlide }) {
  const [[index, dir], setState] = useState([0, 0])
  const [isFs, setIsFs] = useState(false)
  const [hint, setHint] = useState(true)
  const scale = useStageScale()
  const reduce = useReducedMotion()
  const total = slideDefs.length
  const containerRef = useRef(null)

  // Jump to an absolute index. Functional update → never stale.
  const go = useCallback(
    (target, direction) => {
      setState(([cur]) => {
        const clamped = Math.max(0, Math.min(total - 1, target))
        return [clamped, direction ?? (clamped > cur ? 1 : -1)]
      })
    },
    [total]
  )

  // Relative step, also functional so the keyboard handler never captures a
  // stale index. Stable across renders (depends only on total).
  const step = useCallback(
    (delta) => {
      setState(([cur]) => {
        const clamped = Math.max(0, Math.min(total - 1, cur + delta))
        return [clamped, delta > 0 ? 1 : -1]
      })
    },
    [total]
  )

  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          go(0, -1)
          break
        case 'End':
          e.preventDefault()
          go(total - 1, 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        default:
          break
      }
      setHint(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total])

  const toggleFullscreen = () => {
    const el = document.documentElement
    if (!document.fullscreenElement) el.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.()
  }
  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // auto-dismiss the help hint
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4200)
    return () => clearTimeout(t)
  }, [])

  const theme = getTheme(slideDefs[index].theme)

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      {/* The scaled 16:9 stage */}
      <div
        ref={containerRef}
        className="relative shadow-2xl"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          background: theme.paper,
        }}
      >
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={reduce ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } } : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
            className="absolute inset-0"
          >
            {renderSlide(slideDefs[index], index, theme)}
          </motion.div>
        </AnimatePresence>

        {/* Click zones (don't cover the rail) */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="no-print absolute bottom-12 left-0 top-0 z-20 w-[18%] cursor-w-resize bg-transparent"
        />
        <button
          aria-label="Next slide"
          onClick={next}
          className="no-print absolute bottom-12 right-0 top-0 z-20 w-[18%] cursor-e-resize bg-transparent"
        />

        <ProgressRail index={index} accent={theme.accent} onJump={(i) => go(i)} />
      </div>

      {/* Fixed UI chrome (outside scale) */}
      <div className="no-print pointer-events-none fixed inset-0 z-40">
        {/* top-right controls */}
        <div className="pointer-events-auto absolute right-5 top-5 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="label flex h-9 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 text-white/80 backdrop-blur transition-colors duration-200 hover:bg-black/50 hover:text-white"
            aria-label="Toggle fullscreen"
          >
            {isFs ? 'Exit' : 'Present'} · F
          </button>
        </div>

        {/* help hint */}
        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-white/75 backdrop-blur"
            >
              <span className="label">← → / Space to navigate · F fullscreen</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
