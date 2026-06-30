export const BIG_IDEA_PHASES = Object.freeze({
  arrive: [0, 0.12],
  scan: [0.12, 0.36],
  profile: [0.36, 0.58],
  recommend: [0.58, 0.82],
  outcome: [0.82, 1],
})

export const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0))

export function phaseProgress(progress, start, end) {
  return clamp01((clamp01(progress) - start) / (end - start))
}

export function getBigIdeaState(input) {
  const progress = clamp01(input)
  const entries = Object.entries(BIG_IDEA_PHASES)
  const phase = entries.find(([, [start, end]], index) => {
    return progress >= start && (progress < end || index === entries.length - 1)
  })?.[0] || 'arrive'

  return {
    progress,
    phase,
    arrival: phaseProgress(progress, ...BIG_IDEA_PHASES.arrive),
    scan: phaseProgress(progress, ...BIG_IDEA_PHASES.scan),
    profile: phaseProgress(progress, ...BIG_IDEA_PHASES.profile),
    recommendations: phaseProgress(progress, ...BIG_IDEA_PHASES.recommend),
    outcome: phaseProgress(progress, ...BIG_IDEA_PHASES.outcome),
  }
}
