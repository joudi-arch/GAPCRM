// Brand "worlds" — each section floods the screen with the company's real
// palette. base = deep field colour; blobs = mesh-gradient glows; glow = cursor
// glow; accent = the kinetic accent; grad = gradient-text stops (one word only);
// font = display class; logo = BrandLogo key.

export const worlds = {
  gap: {
    key: 'gap',
    name: 'Gap',
    base: '#05070D',
    blobs: ['#1E3A8A', '#2563EB', '#0A2A6B'],
    glow: 'rgba(59,130,246,0.22)',
    accent: '#5B8DEF',
    grad: ['#9CC3FF', '#3B6CE7'],
    ink: '#F2F5FF',
    sub: 'rgba(226,234,255,0.66)',
    font: 'font-grotesk',
    logo: 'gap',
  },
  zara: {
    key: 'zara',
    name: 'Zara',
    base: '#0B0B0B',
    blobs: ['#3A3A3A', '#222222', '#0E0E0E'],
    glow: 'rgba(255,255,255,0.10)',
    accent: '#EDE7DA',
    grad: ['#FFFFFF', '#9A958B'],
    ink: '#F5F2EC',
    sub: 'rgba(238,233,224,0.6)',
    font: 'font-bodoni',
    logo: 'zara',
  },
  uniqlo: {
    key: 'uniqlo',
    name: 'Uniqlo',
    base: '#A60008',
    blobs: ['#FF0000', '#FF3B30', '#C8000A'],
    glow: 'rgba(255,90,80,0.30)',
    accent: '#FFFFFF',
    grad: ['#FFFFFF', '#FFD9D6'],
    ink: '#FFFFFF',
    sub: 'rgba(255,255,255,0.78)',
    font: 'font-archivo',
    logo: 'uniqlo',
  },
  nike: {
    key: 'nike',
    name: 'Nike',
    base: '#080808',
    blobs: ['#1E1E1E', '#2C2C2C', '#0F0F0F'],
    glow: 'rgba(206,255,0,0.22)',
    accent: '#CEFF00',
    grad: ['#E4FF63', '#A6D400'],
    ink: '#FFFFFF',
    sub: 'rgba(255,255,255,0.66)',
    font: 'font-anton',
    logo: 'nike',
  },
  harley: {
    key: 'harley',
    name: 'Harley-Davidson',
    base: '#0B0A09',
    blobs: ['#F47216', '#B5470A', '#3A220E'],
    glow: 'rgba(244,114,22,0.30)',
    accent: '#F9A03F',
    grad: ['#FFC06A', '#F47216'],
    ink: '#FBF4EC',
    sub: 'rgba(251,244,236,0.66)',
    font: 'font-oswald',
    logo: 'harley',
  },
}

export const getWorld = (k) => worlds[k] || worlds.gap
