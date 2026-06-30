import { useEffect, useRef, useState } from 'react'

// True while the element is near/in the viewport. Used to mount a 3D canvas
// only for the active section and unmount it on exit (frees the WebGL context).
export default function useInViewport({ rootMargin = '10% 0px', amount = 0.2 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: amount }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, amount])

  return [ref, inView]
}
