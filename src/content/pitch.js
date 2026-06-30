import { sourceById } from './sources'

export const bigIdeaContent = Object.freeze({
  thesis: 'Make fit Gap’s identity—not its weakness.',
  explanation: 'Build a denim fit profile once. Use it to improve every recommendation, launch, and reward that follows.',
  profile: [
    ['Body shape', 'Straight'],
    ['Waist', '32'],
    ['Preferred fit', 'Slim taper'],
    ['Inseam', '30'],
  ],
  recommendations: [
    { name: '’90s Slim Taper', match: 98 },
    { name: 'SoftWear Slim', match: 94 },
    { name: 'GapFlex Taper', match: 91 },
  ],
  outcome: 'Right fit → fewer returns → richer data → stronger lifetime value',
})

export const presenters = Object.freeze({
  zara: 'Joudi Erfan',
  uniqlo: 'Olha Indilo',
  nike: 'Emma',
  harley: 'Andreas Radicchi',
})

export const rolloutPhases = Object.freeze([
  { months: '0–3', owner: 'Data + CRM', deliverable: 'Fit-profile foundation', gate: 'Profile data is complete enough to recommend confidently' },
  { months: '3–9', owner: 'Product + Digital', deliverable: 'Fit-led recommendations', gate: 'Conversion improves while denim returns trend down' },
  { months: '9–18', owner: 'Brand + Membership', deliverable: 'Fit-based access and rewards', gate: 'Repeat purchase and member value improve' },
])

export const finalAsk = 'Approve a 90-day fit-profile foundation phase led by Data + CRM, with Product + Digital, to establish the return-rate baseline and prove recommendation readiness.'

export const pitchSections = Object.freeze([
  { id: 'hero', world: 'gap', claim: 'Gap becomes the brand that knows your fit.' },
  { id: 'gap-today', world: 'gap', claim: 'The infrastructure exists. The intimacy does not.', claims: ['gap-members', 'gap-fy24-comp'] },
  { id: 'problem', world: 'gap', claim: 'Discounts can trigger purchase. They cannot create preference.' },
  { id: 'gaps', world: 'gap', claim: 'Three gaps prevent loyalty from compounding.' },
  { id: 'insight', world: 'gap', claim: 'The best brands turn one signal into a relationship.' },
  {
    id: 'zara',
    world: 'zara',
    claim: 'Demand data shapes product.',
    claims: ['zara-online-sales'],
    proof: { value: 10.2, prefix: '€', suffix: 'B', decimals: 1, label: 'online sales in FY24 — a +12% jump, all demand-led' },
    proof2: { value: 218, suffix: 'M', label: 'app users turning behaviour into merchandising' },
  },
  {
    id: 'uniqlo',
    world: 'uniqlo',
    claim: 'Feedback shapes LifeWear.',
    claims: ['uniqlo-comp'],
    proof: { value: 8.1, prefix: '+', suffix: '%', decimals: 1, label: 'same-store sales, FY25 — straight out of the Ariake feedback loop' },
    proof2: { value: 39.21, suffix: 'M', decimals: 2, label: 'customer interactions analysed every year' },
  },
  {
    id: 'nike',
    world: 'nike',
    claim: 'Membership becomes a daily lifestyle.',
    proof: { value: 200, suffix: '+', label: 'free guided workouts that keep members engaged between purchases' },
    proof2: { value: 3, label: 'owned DTC channels — apps, web and retail, one relationship' },
  },
  {
    id: 'harley',
    world: 'harley',
    claim: 'Ownership becomes belonging.',
    proof: { value: 0, label: 'discounts needed — community carries the loyalty and the price premium' },
    proof2: { value: 100, suffix: '%', label: 'community-led: the H.O.G. ecosystem drives renewals' },
  },
  { id: 'big-idea', world: 'gap', claim: bigIdeaContent.thesis },
  { id: 'rollout', world: 'gap', claim: 'Build the signal. Personalize the relationship. Earn belonging.' },
  {
    id: 'kpis',
    world: 'gap',
    claim: 'Measure the shift from volume to value.',
    items: [
      { label: 'Fit-profile adoption', value: 40, suffix: '%', horizon: '12 months', kind: 'proposal-target' },
      { label: 'Denim return rate', value: null, suffix: '↓', horizon: '12 months', kind: 'proposal-target' },
      { label: 'Fit-recommendation conversion', value: 25, suffix: '%', horizon: '12 months', kind: 'proposal-target' },
      { label: 'Repeat purchase', value: 15, prefix: '+', suffix: '%', horizon: '18 months', kind: 'proposal-target' },
      { label: 'Member spend advantage', value: 10, prefix: '+', suffix: '%', horizon: '18 months', kind: 'proposal-target' },
    ],
  },
  { id: 'why-now', world: 'gap', claim: 'Encore supplies the platform. Fit supplies the reason to return.', claims: ['encore-launch'] },
  { id: 'cta', world: 'gap', claim: 'Make fit Gap’s identity—not its weakness.' },
])

export function validatePitchContent() {
  const ids = pitchSections.map(({ id }) => id)
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  const unsourcedClaims = pitchSections
    .flatMap((section) => section.claims || [])
    .filter((claimId) => !sourceById[claimId])
  return { duplicateIds, unsourcedClaims }
}
