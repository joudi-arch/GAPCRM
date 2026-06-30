/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F3',
        'paper-card': '#FFFFFF',
        ink: '#14110E',
        muted: '#6B6457',
        hairline: '#D8D2C4',
        'gap-navy': '#002A5F',
        'gap-navy-deep': '#001F47',
        // benchmark accents
        zara: '#000000',
        uniqlo: '#FF0000',
        nike: '#111111',
        volt: '#CEFF00',
        harley: '#F47216',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(3rem, 6.5vw, 5.5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        h1: ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.08' }],
        h3: ['1.5rem', { lineHeight: '1.2' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        stage: '1280px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
