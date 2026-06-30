// Brand wordmarks rendered as clean SVG for an academic pitch.
// Magic/SVGL returned none of these five, so they are faithful typographic/
// geometric representations (not reproductions of intricate trademarked artwork),
// drawn in each brand's letterform spirit and themeable via `color`.
// source: typographic recreation — see PLAN.md §3.

export default function BrandLogo({ brand, color = 'currentColor', height = 44, className = '' }) {
  const common = { className, style: { height, width: 'auto', display: 'block' }, role: 'img' }

  switch (brand) {
    case 'gap':
      return (
        <svg {...common} viewBox="0 0 120 120" aria-label="Gap logo">
          <rect width="120" height="120" fill={color} />
          <text
            x="60"
            y="78"
            textAnchor="middle"
            fontFamily="Libre Caslon Display, Georgia, serif"
            fontSize="46"
            letterSpacing="1"
            fill="#FFFFFF"
          >
            GAP
          </text>
        </svg>
      )
    case 'zara':
      return (
        <svg {...common} viewBox="0 0 220 70" aria-label="Zara logo">
          <text
            x="0"
            y="54"
            fontFamily="Libre Caslon Display, Georgia, serif"
            fontSize="64"
            letterSpacing="-4"
            fill={color}
          >
            ZARA
          </text>
        </svg>
      )
    case 'uniqlo':
      return (
        <svg {...common} viewBox="0 0 130 130" aria-label="Uniqlo logo">
          <rect width="130" height="130" fill={color} />
          <text
            x="65"
            y="60"
            textAnchor="middle"
            fontFamily="Public Sans, sans-serif"
            fontWeight="800"
            fontSize="22"
            letterSpacing="1"
            fill="#FFFFFF"
          >
            UNIQLO
          </text>
          <text
            x="65"
            y="92"
            textAnchor="middle"
            fontFamily="Public Sans, sans-serif"
            fontWeight="600"
            fontSize="16"
            letterSpacing="3"
            fill="#FFFFFF"
            opacity="0.92"
          >
            ユニクロ
          </text>
        </svg>
      )
    case 'nike':
      // Simplified swoosh form.
      return (
        <svg {...common} viewBox="0 0 200 72" aria-label="Nike swoosh">
          <path
            d="M16 50 C 60 26, 150 -8, 192 4 C 150 12, 86 40, 40 62 C 30 66, 20 60, 16 50 Z"
            fill={color}
          />
        </svg>
      )
    case 'harley':
      // Simplified bar-&-shield silhouette with wordmark.
      return (
        <svg {...common} viewBox="0 0 240 120" aria-label="Harley-Davidson logo">
          <path
            d="M120 6 L196 24 C196 70, 168 100, 120 116 C72 100, 44 70, 44 24 Z"
            fill="none"
            stroke={color}
            strokeWidth="6"
          />
          <rect x="44" y="50" width="152" height="22" fill={color} />
          <text
            x="120"
            y="66"
            textAnchor="middle"
            fontFamily="Public Sans, sans-serif"
            fontWeight="800"
            fontSize="12"
            letterSpacing="1.5"
            fill="#FFFFFF"
          >
            HARLEY-DAVIDSON
          </text>
          <text
            x="120"
            y="40"
            textAnchor="middle"
            fontFamily="Public Sans, sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="2"
            fill={color}
          >
            MOTOR
          </text>
          <text
            x="120"
            y="92"
            textAnchor="middle"
            fontFamily="Public Sans, sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="2"
            fill={color}
          >
            CYCLES
          </text>
        </svg>
      )
    default:
      return null
  }
}
