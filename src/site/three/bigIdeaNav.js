import { animate, motionValue } from 'framer-motion'

// The "recommendation" slide is key-driven, not scroll-scrubbed. Both the 3D
// scan scene and the copy overlay read one shared 0..1 timeline value. Each
// arrow press glides between these stage targets, so the first press plays the
// full body scan as one smooth animation and every press after fades in the
// next block of copy on its own beat:
//   0 → figure arrives, nothing scanned
//   1 → the scan beam sweeps the whole body (the "scan happens")
//   2 → the fit profile appears (the first words)
//   3 → the denim recommendations appear
//   4 → the compounding-loop outcome appears
export const BIG_IDEA_STAGE_TARGETS = Object.freeze([0, 0.34, 0.48, 0.7, 0.93])
export const BIG_IDEA_STAGE_COUNT = BIG_IDEA_STAGE_TARGETS.length

export const bigIdeaProgress = motionValue(0)

let stage = 0
let controls = null
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(stage))
}

function glide(nextStage) {
  stage = Math.max(0, Math.min(BIG_IDEA_STAGE_COUNT - 1, nextStage))
  const target = BIG_IDEA_STAGE_TARGETS[stage]
  const distance = Math.abs(target - bigIdeaProgress.get())
  // the first sweep (the body scan) gets a longer, cinematic glide; the copy
  // beats after it are quick, proportional fades.
  const duration = stage === 1 ? 1.5 : Math.max(0.6, distance * 2.4)
  controls?.stop()
  controls = animate(bigIdeaProgress, target, { duration, ease: [0.33, 0, 0.2, 1] })
  emit()
}

export const getBigIdeaStage = () => stage
export const bigIdeaAtStart = () => stage <= 0
export const bigIdeaAtEnd = () => stage >= BIG_IDEA_STAGE_COUNT - 1

// Advance/retreat one internal beat. Returns false at the edges so the page
// navigator knows to hand off to the neighbouring slide instead.
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
  glide(BIG_IDEA_STAGE_COUNT - 1)
}

export function subscribeBigIdea(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
