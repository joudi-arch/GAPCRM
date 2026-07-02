import { animate, motionValue } from 'framer-motion'

// The "recommendation" slide is key-driven, not scroll-scrubbed. Both the 3D
// scan scene and the copy overlay read one shared 0..1 timeline value. Each
// arrow press glides to the next stage target, so the presses read as beats:
//   0 → figure arrives, nothing scanned
//   1 → the scan beam sweeps the whole body (the "scan happens")
//   2 → the fit profile appears
//   3 → the fit profile hands off to the denim recommendations
//   4 → the recommendations hand off to the compounding-loop outcome
export const BIG_IDEA_STAGE_TARGETS = Object.freeze([0, 0.36, 0.52, 0.74, 0.95])
export const BIG_IDEA_STAGE_COUNT = BIG_IDEA_STAGE_TARGETS.length

export const bigIdeaProgress = motionValue(0)

let stage = 0
let controls = null
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(stage))
}

function glide(nextStage, { instant = false } = {}) {
  stage = Math.max(0, Math.min(BIG_IDEA_STAGE_COUNT - 1, nextStage))
  const target = BIG_IDEA_STAGE_TARGETS[stage]
  const distance = Math.abs(target - bigIdeaProgress.get())
  // The scan sweep is one long cinematic take; each copy beat after it is a
  // steady, unhurried crossfade (fade the old block out, settle the new one in).
  const duration = instant ? 0 : stage === 1 ? 1.6 : Math.max(0.9, distance * 2.2)
  controls?.stop()
  controls = animate(bigIdeaProgress, target, { duration, ease: [0.33, 0, 0.2, 1] })
  emit()
}

export const getBigIdeaStage = () => stage
export const bigIdeaAtStart = () => stage <= 0
export const bigIdeaAtEnd = () => stage >= BIG_IDEA_STAGE_COUNT - 1

// Advance/retreat one beat. Returns false at the edges so the page navigator
// knows to hand off to the neighbouring slide instead.
export function bigIdeaNext() {
  if (bigIdeaAtEnd()) return false
  glide(stage + 1)
  return true
}

export function bigIdeaPrev() {
  if (bigIdeaAtStart()) return false
  glide(stage - 1)
  return true
}

// Prime the slide for the direction the presenter arrives from: fresh (figure
// only) when entering from above, fully resolved when entering from below.
export function bigIdeaResetToStart() {
  glide(0)
}

export function bigIdeaResetToEnd() {
  // Arriving from below must not replay the take — land on the resolved frame.
  glide(BIG_IDEA_STAGE_COUNT - 1, { instant: true })
}

export function subscribeBigIdea(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
