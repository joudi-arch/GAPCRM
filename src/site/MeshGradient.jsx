// Animated mesh-gradient field for a brand world. GPU-friendly (transform/opacity).
// `world` = { base, blobs:[c1,c2,c3], glow }
export default function MeshGradient({ world, className = '' }) {
  const { base, blobs } = world
  const sizes = ['70vw', '60vw', '66vw']
  const pos = [
    { top: '-12%', left: '-10%' },
    { top: '8%', right: '-14%' },
    { bottom: '-22%', left: '18%' },
  ]
  const anim = ['blob-a', 'blob-b', 'blob-c']

  // A full-bleed brand-tinted base so the whole screen floods with colour
  // (never a dead-black floor) — the animated blobs then add depth on top.
  const baseField = {
    backgroundColor: base,
    backgroundImage: `
      radial-gradient(120% 130% at 22% 8%, ${blobs[0]}59 0%, transparent 55%),
      radial-gradient(110% 120% at 88% 18%, ${blobs[1]}4D 0%, transparent 52%),
      radial-gradient(130% 130% at 60% 112%, ${blobs[2]}66 0%, transparent 60%)
    `,
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={baseField}>
      <div className="mesh allow-motion">
        {blobs.map((c, i) => (
          <div
            key={i}
            className={`mesh-blob allow-motion ${anim[i % 3]}`}
            style={{
              width: sizes[i % 3],
              height: sizes[i % 3],
              background: `radial-gradient(circle at 50% 50%, ${c} 0%, ${c}00 70%)`,
              ...pos[i % 3],
            }}
          />
        ))}
      </div>
      {/* soft vignette for depth + legibility (kept light so the world floods) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(130% 100% at 50% 42%, transparent 62%, ${base}73 100%)` }}
      />
    </div>
  )
}
