import { useEffect, useRef, useState } from 'react'

// True while the element is near/in the viewport. Used to mount a 3D canvas
// only for the active section and unmount it on exit (frees the WebGL context).
export default function useInViewport({ rootMargin = '10% 0px', amount = 0.2 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [ratio, setRatio] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        setRatio(entry.isIntersecting ? entry.intersectionRatio : 0)
      },
      { rootMargin, threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, amount])

  return { ref, inView, ratio }
}
