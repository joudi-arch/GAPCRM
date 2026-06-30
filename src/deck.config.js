// Single source of truth for deck ordering and per-slide theme.
// All facts/figures are drawn from the group report + cited brand sources.
export { presenters } from './content/pitch'

export const team = ['Olha Indilo', 'Iman Chatila', 'Joudi Erfan', 'Andreas Radicchi']

// Slide registry — components are imported in App.jsx. `theme` keys map to themes.js.
export const slides = [
  { id: 'cover', theme: 'gap' },
  { id: 'gap-today', theme: 'gap' },
  { id: 'problem', theme: 'gap' },
  { id: 'gaps', theme: 'gap' },
  { id: 'insight', theme: 'gap' },
  { id: 'zara', theme: 'zara' },
  { id: 'uniqlo', theme: 'uniqlo' },
  { id: 'nike', theme: 'nike' },
  { id: 'harley', theme: 'harley' },
  { id: 'big-idea', theme: 'gap' },
  { id: 'rollout', theme: 'gap' },
  { id: 'kpis', theme: 'gap' },
  { id: 'why-now', theme: 'gap' },
  { id: 'cta', theme: 'gap' },
]

// Short labels for the progress rail tooltip/aria.
export const slideLabels = {
  cover: 'Cover',
  'gap-today': 'Gap Today',
  problem: 'The Problem',
  gaps: 'Three Gaps',
  insight: 'The Insight',
  zara: 'Zara',
  uniqlo: 'Uniqlo',
  nike: 'Nike',
  harley: 'Harley-Davidson',
  'big-idea': 'The Big Idea',
  rollout: 'How It Rolls Out',
  kpis: 'KPIs',
  'why-now': 'Why Now',
  cta: 'The Ask',
}
