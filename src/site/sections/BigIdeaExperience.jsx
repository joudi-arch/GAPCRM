import { motionValue, useReducedMotion } from 'framer-motion'
import Section from '../Section'
import { worlds } from '../worlds'
import { BigIdeaScan } from '../three/scenes'
import { useSceneRuntime } from '../three/SceneRuntime'
import { bigIdeaProgress } from '../three/bigIdeaNav'
import BigIdeaOverlay from './BigIdeaOverlay'

const FINAL_PROGRESS = motionValue(1)
const gap = worlds.gap

// The "recommendation" slide is a single pinned viewport, driven by arrow keys
// rather than scroll (see three/bigIdeaNav). The first press plays the full
// body scan; each press after reveals the next block of copy. When motion is
// reduced or the scene is downgraded to its poster, everything is shown at once.
export default function BigIdeaExperience({ onActive }) {
  const reducedMotion = useReducedMotion()
  const { getMode } = useSceneRuntime()
  const staticMode = reducedMotion || getMode('big-idea') === 'poster'
  const progress = staticMode ? FINAL_PROGRESS : bigIdeaProgress

  return (
    <div className="relative min-h-screen">
      <Section
        world={gap}
        id="big-idea"
        onActive={onActive}
        parallax={false}
        scene={<BigIdeaScan progress={progress} quality={staticMode ? 'reduced' : 'high'} />}
        sceneOverlay="linear-gradient(90deg, rgba(5,7,13,0.94) 0%, rgba(5,7,13,0.72) 45%, rgba(5,7,13,0.08) 76%, rgba(5,7,13,0.2) 100%)"
        watermark={<span className="font-extrabold">FIT</span>}
        watermarkClass="bottom-[-6vh] left-[-2vw] text-[40vw]"
        contentClass="!max-w-[1500px]"
        flood
      >
        <BigIdeaOverlay progress={progress} reducedMotion={staticMode} />
      </Section>
    </div>
  )
}
