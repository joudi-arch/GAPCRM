import { useRef } from 'react'
import { motionValue, useReducedMotion, useScroll } from 'framer-motion'
import Section from '../Section'
import { worlds } from '../worlds'
import { BigIdeaScan } from '../three/scenes'
import { useSceneRuntime } from '../three/SceneRuntime'
import BigIdeaOverlay from './BigIdeaOverlay'

const FINAL_PROGRESS = motionValue(1)
const gap = worlds.gap

export default function BigIdeaExperience({ onActive }) {
  const runwayRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { mode } = useSceneRuntime()
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  })
  const staticMode = reducedMotion || mode === 'poster'
  const progress = staticMode ? FINAL_PROGRESS : scrollYProgress

  return (
    <div ref={runwayRef} className={staticMode ? 'relative min-h-screen' : 'relative min-h-[240vh]'}>
      <div className={staticMode ? 'relative' : 'sticky top-0 h-screen'}>
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
    </div>
  )
}
