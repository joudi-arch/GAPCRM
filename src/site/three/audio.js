// Tiny opt-in ambient engine (WebAudio, no asset files). A soft detuned pad
// through a slowly-moving low-pass filter; retunes subtly per brand world.
// Off by default — only ever starts from a user gesture (the sound toggle).

let ctx = null
let master = null
let filter = null
const voices = []

const tuning = {
  gap: { f: 73.4, hz: 520 }, // D2 — denim cool
  zara: { f: 65.4, hz: 360 }, // C2 — austere
  uniqlo: { f: 87.3, hz: 760 }, // F2 — bright
  nike: { f: 82.4, hz: 900 }, // E2 — energetic
  harley: { f: 49.0, hz: 300 }, // G1 — low rumble
}

export function enableAudio() {
  if (ctx) {
    ctx.resume?.()
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2)
    return
  }
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 500
  filter.Q.value = 0.6
  filter.connect(master)

  // two slightly detuned triangle voices an octave apart = soft pad
  ;[
    [73.4, -6],
    [146.8, 6],
  ].forEach(([freq, detune]) => {
    const o = ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.value = freq
    o.detune.value = detune
    const g = ctx.createGain()
    g.gain.value = freq > 100 ? 0.35 : 0.6
    o.connect(g)
    g.connect(filter)
    o.start()
    voices.push(o)
  })

  // slow filter drift for life
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.06
  const lg = ctx.createGain()
  lg.gain.value = 140
  lfo.connect(lg)
  lg.connect(filter.frequency)
  lfo.start()

  master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5)
}

export function disableAudio() {
  if (ctx && master) master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
}

export function setAudioWorld(key) {
  if (!ctx) return
  const t = tuning[key] || tuning.gap
  voices.forEach((o, i) => o.frequency.linearRampToValueAtTime(i === 0 ? t.f : t.f * 2, ctx.currentTime + 1.0))
  filter.frequency.linearRampToValueAtTime(t.hz, ctx.currentTime + 1.0)
}
