import { assetUrl } from '../site/three/assetUrl'

export const LOGO_ASSETS = Object.freeze({
  gap: assetUrl('brand/logos/gap.svg'),
  zara: assetUrl('brand/logos/zara.svg'),
  uniqlo: assetUrl('brand/logos/uniqlo.svg'),
  nike: assetUrl('brand/logos/nike.svg'),
  harley: assetUrl('brand/logos/harley-davidson.svg'),
})

const LABELS = Object.freeze({
  gap: 'Gap logo',
  zara: 'Zara logo',
  uniqlo: 'Uniqlo logo',
  nike: 'Nike swoosh',
  harley: 'Harley-Davidson logo',
})

const MASKABLE = new Set(['zara', 'nike', 'harley'])

export default function BrandLogo({ brand, color, height = 44, className = '', tone = color ? 'mono' : 'brand' }) {
  const src = LOGO_ASSETS[brand]
  if (!src) return null

  const common = { height, width: 'auto', display: 'block' }
  if (tone === 'mono' && MASKABLE.has(brand)) {
    const aspect = brand === 'zara' ? 2.38 : brand === 'nike' ? 2.81 : 1.23
    return (
      <span
        className={className}
        role="img"
        aria-label={LABELS[brand]}
        style={{ ...common, width: height * aspect, backgroundColor: color || 'currentColor', mask: `url(${src}) center / contain no-repeat`, WebkitMask: `url(${src}) center / contain no-repeat` }}
      />
    )
  }

  return <img className={className} src={src} alt={LABELS[brand]} style={common} />
}
