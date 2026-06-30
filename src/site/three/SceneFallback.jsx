import { useState } from 'react'

export function SceneFallback({ src, alt = '' }) {
  const [available, setAvailable] = useState(Boolean(src))

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {available && (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          decoding="async"
          onError={() => setAvailable(false)}
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,.82)_0%,rgba(5,7,13,.42)_48%,rgba(5,7,13,.08)_100%)]" />
    </div>
  )
}
