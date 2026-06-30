import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MeshGradient from './MeshGradient'
import SceneStage from './three/SceneStage'

// A full-viewport brand-world section. Paints the world (mesh gradient + grain),
// a parallax watermark wordmark, and reports itself active for the cursor/nav.
// Optionally hosts a 3D scene behind the content (mounts only when in view +
// capable; otherwise the mesh world shows through).
export default function Section({
  world,
  id,
  onActive,
  children,
  watermark,
  watermarkClass = '',
  flood = false,
  className = '',
  contentClass = '',
  scene = null,
  sceneCamera,
  sceneOverlay,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const wmY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <motion.section
      ref={ref}
      id={id}
      data-world={world.key}
      onViewportEnter={() => onActive?.(world.key)}
      viewport={{ amount: 0.55 }}
      className={`brandworld grain snap-section relative flex min-h-screen w-screen items-center overflow-hidden ${className}`}
      style={{ color: world.ink, '--accent': world.accent }}
    >
      <MeshGradient world={world} />

      {/* parallax watermark */}
      <motion.div
        aria-hidden
        style={{ y: wmY }}
        className={`pointer-events-none absolute select-none leading-none opacity-[0.06] ${world.font} ${watermarkClass}`}
      >
        {watermark ?? <span className="font-extrabold">{world.name}</span>}
      </motion.div>

      {/* optional 3D brand-world scene (behind content, in-view-only) */}
      {scene && <SceneStage camera={sceneCamera} overlay={sceneOverlay}>{scene}</SceneStage>}

      {/* world-flood curtain: a panel that wipes away as the world enters */}
      {flood && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ amount: 0.5, once: true }}
          transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          className="absolute inset-0 z-30 origin-top"
          style={{ background: world.blobs[0] }}
        />
      )}

      <motion.div
        style={{ y: contentY }}
        className={`relative z-10 mx-auto w-full max-w-[1400px] px-[6vw] ${contentClass}`}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
