import { slides, slideLabels } from '../deck.config'

// Thin clickable progress rail along the bottom of the stage.
export default function ProgressRail({ index, accent, onJump }) {
  return (
    <nav
      aria-label="Slide navigation"
      className="no-print pointer-events-auto absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5"
    >
      {slides.map((s, i) => {
        const active = i === index
        const label = slideLabels[s.id]
        return (
          <button
            key={s.id}
            onClick={() => onJump(i)}
            aria-label={`Go to slide ${i + 1}: ${label}`}
            aria-current={active ? 'true' : undefined}
            className="group relative flex h-6 cursor-pointer items-center"
          >
            <span
              className="block rounded-full transition-all duration-300 ease-editorial"
              style={{
                height: 4,
                width: active ? 30 : 8,
                background: active ? accent : '#14110E',
                opacity: active ? 1 : 0.22,
              }}
            />
            <span
              className="label pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[0.6rem] text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
