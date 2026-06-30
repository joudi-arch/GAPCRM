// Single source of truth for deck ordering, per-slide theme, and presenter credits.
// All facts/figures are drawn from the group report + cited brand sources.

export const presenters = {
  zara: 'Joudi Erfan',
  uniqlo: 'Olha Indilo',
  nike: 'Emma', // report §3.3 byline is "Emma" — edit here if a different name presents Nike
  harley: 'Andreas Radicchi',
}

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
