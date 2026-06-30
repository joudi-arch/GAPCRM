import { useEffect, useState } from 'react'
import { enableAudio, disableAudio, setAudioWorld } from './three/audio'

// Opt-in ambient sound. Off by default; starts only on click (user gesture).
export default function SoundToggle({ world, accent = '#ffffff' }) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (on) setAudioWorld(world)
  }, [world, on])

  const toggle = () => {
    if (on) {
      disableAudio()
      setOn(false)
    } else {
      enableAudio()
      setAudioWorld(world)
      setOn(true)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
      style={{ '--accent': accent }}
      className="no-print fixed bottom-5 right-5 z-40 flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur transition-colors duration-200 hover:bg-black/50"
    >
      {/* equalizer-ish glyph */}
      <span className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full transition-all duration-300"
            style={{
              height: on ? `${[10, 6, 12][i]}px` : '3px',
              background: on ? 'var(--accent, #fff)' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </span>
      <span className="font-hanken text-[0.6rem] uppercase tracking-[0.25em] text-white/80">
        {on ? 'Sound on' : 'Sound'}
      </span>
    </button>
  )
}
