# Gap Shareholder Pitch Masterpiece Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish and elevate the Gap CRM presentation into a production-ready shareholder pitch whose narrative, interaction, 3D direction, fallbacks, and technical execution feel authored, decisive, and unforgettable.

**Architecture:** The scroll presentation is the canonical product; the legacy slide/PDF view remains available but is route-split and subordinate. A shared scene runtime owns capability detection, exclusive scene activation, asset resolution, failure recovery, and performance fallback, while each section keeps semantic HTML and presentation copy outside WebGL. The Big Idea becomes the centerpiece: one deterministic progress model drives both the fit-scan scene and its UI narrative without coupling layout code to Three.js internals.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, Lenis, React Three Fiber 8, Three.js 0.169, drei 9, postprocessing 2, Vitest, Testing Library, Playwright.

## Global Constraints

- Audience: Gap executives, shareholders, and CRM decision-makers viewing a 12–15 minute live pitch in a darkened boardroom or auditorium.
- Core thesis: Gap turns fit from a sizing weakness into the customer signal that powers loyalty, conversion, lower returns, and lifetime value.
- The scroll site at `/` is canonical; `/?deck`, `/?print`, `/?lite`, and `/?demo` must continue to work.
- 3D enhances and never blocks: semantic content and the complete argument remain available when WebGL, motion, assets, or audio are unavailable.
- Exactly one live WebGL canvas may exist at a time.
- Reduced motion, coarse pointer, narrow screens below 820 px, forced `?lite`, scene error, context loss, or sustained rendered FPS below 42 must produce a designed poster/2D experience.
- No runtime network dependency: fonts, models, posters, and application assets ship inside `dist/` and resolve under both a relative base and a hosted subdirectory.
- WCAG 2.2 AA: body text contrast at least 4.5:1, large text at least 3:1, visible focus, semantic landmarks, keyboard-operable controls, and no information conveyed by color or motion alone.
- Initial JavaScript target: at most 135 kB gzip for `/`; Three/R3F remains lazy and excluded from the first route payload.
- Per-scene compressed model target: at most 3 MB; each poster at most 250 kB; DPR capped at 1.5.
- Projector target: median 50+ rendered FPS at 1920×1080 on the presentation machine; downgrade automatically before sustained stutter becomes visible.
- No invented evidence. Every external fact is mapped to the group report or an authoritative source; proposal targets are explicitly labeled as targets.
- No gradient text, generic glass panels, repeated eyebrow scaffolding, identical card grids, decorative grain filters, gratuitous bloom, or rounded “AI dashboard” cards.
- Motion must communicate narrative state. Use transform, opacity, material uniforms, camera, and light; never animate layout properties in the pitch path.
- Preserve the existing Gap dark-blue world and brand-specific takeovers, but replace generic “maximalism” with authored spatial rhythm and business clarity.
- Visual lane: Gap’s iconic denim portrait campaigns × Apple keynote argument clarity × Nike product-launch spatial drama. The result must not resemble a SaaS landing page or a faux editorial magazine.
- Brand voice: assured, tactile, cinematic.
- Do not initialize, rewrite, or discard Git history without explicit approval. The current workspace has no detected Git repository, so each task ends with a verification checkpoint and a ready-to-use commit command for execution inside an approved repository/worktree.

---

## Design Brief

### Feature Summary

This is a complete shareholder-facing presentation, not a decorative microsite. It must move the room from diagnosis to proof to a singular recommendation, then make implementation, measurement, and the ask feel inevitable.

### Primary Audience Outcome

By the end of the Big Idea sequence, the audience should be able to repeat one sentence without notes: **“Gap should own fit, because fit turns customer data into better product, fewer returns, and durable loyalty.”**

### Design Direction

- **Color strategy:** Drenched within each brand world, with Gap navy/denim blue as the narrative home base.
- **Physical scene:** Gap leadership sits in a dim room while a deep blue-black field, sharply lit denim surfaces, and controlled white typography make the recommendation feel like a product reveal rather than a student deck.
- **Reference behavior:** Gap portrait campaigns supply humanity and denim texture; Apple keynotes supply one-claim-at-a-time pacing; Nike launches supply object drama and precise lighting.
- **Anti-direction:** no template cards, fake dashboards, “future tech” cyan grids, illegible particle fog, magazine cosplay, or motion added merely to prove motion exists.

### Layout Strategy

- Give every viewport one dominant claim and one supporting proof.
- Alternate density: declarative statement → proof-rich benchmark → cinematic transition → decisive recommendation.
- Keep copy in a protected 5–7 column region and reserve the opposite field for spatial imagery.
- The Big Idea gets a longer scroll runway than ordinary sections so the scan, profile, recommendations, and business outcome land as four distinct beats.
- Use rows, rules, alignment, and negative space instead of card grids wherever the information is not genuinely a standalone object.

### Key States

- **Live 3D:** capable desktop, active section, asset loaded, frame health acceptable.
- **Poster loading:** poster visible immediately while the lazy scene and GLB resolve.
- **Lite:** full visual hierarchy and complete argument with posters and restrained CSS motion.
- **Reduced motion:** final visual state appears without scanning, parallax, count-up, or camera movement.
- **Scene failure/context loss:** poster remains visible; semantic content and navigation continue; failure is recorded once without an alarming user-facing error.
- **Print:** legacy 16:9 slides resolve to final states with no canvas dependency.

### Review Gates

1. **Foundation Gate:** runtime architecture, routes, assets, and fallbacks pass before scene artistry expands.
2. **Big Idea Gate:** the fit experience is reviewed in live, lite, and reduced-motion modes before changes spread across the deck.
3. **Shareholder Gate:** narrative, visual system, benchmark worlds, transitions, and evidence are reviewed as one pitch.
4. **Production Gate:** performance, accessibility, offline delivery, projector dry run, and backup recording all pass.

---

## File Responsibility Map

### Create

- `src/test/setup.js` — browser API shims and jest-dom matchers for unit/component tests.
- `src/routes/LegacyDeckRoute.jsx` — lazy compatibility route for the keyboard deck.
- `src/routes/PrintRoute.jsx` — lazy compatibility route for PDF output.
- `src/routes/SceneCaptureRoute.jsx` — internal deterministic route used only to capture scene posters.
- `src/fonts.js` — self-hosted Fontsource imports used by every route.
- `src/content/pitch.js` — canonical narrative copy, targets, presenters, source identifiers, and section order.
- `src/content/sources.js` — source metadata used by deck notes and audit tests.
- `src/site/three/assetUrl.js` — relative-safe public asset resolver.
- `src/site/three/SceneRuntime.jsx` — global capability, active-stage ownership, and downgrade state.
- `src/site/three/SceneErrorBoundary.jsx` — catches scene render/load errors without taking down the pitch.
- `src/site/three/SceneFallback.jsx` — poster and legibility treatment shared by live and lite modes.
- `src/site/three/FrameHealthProbe.jsx` — samples rendered frames inside R3F and requests downgrade.
- `src/site/three/scenes/bigIdeaTimeline.js` — pure progress-to-phase mapping.
- `src/site/sections/BigIdeaExperience.jsx` — owns section progress and composes 3D with semantic overlay.
- `src/site/sections/BigIdeaOverlay.jsx` — semantic fit-profile, recommendation, and outcome presentation.
- `src/site/three/scenes/SectionHandoff.jsx` — lightweight color/light handoff between Harley and Big Idea.
- `src/site/three/sceneRegistry.js` — scene metadata, camera, poster, and interaction policy.
- `scripts/audit-assets.mjs` — fails when asset size or absolute-path rules are violated.
- `scripts/capture-posters.mjs` — deterministic scene-poster capture.
- `playwright.config.js` — desktop, projector, lite, and mobile QA projects.
- `tests/e2e/pitch.spec.js` — route, fallback, navigation, overflow, and canvas-count checks.
- `tests/e2e/visual.spec.js` — approved screenshot checkpoints.
- `docs/architecture/presentation-runtime.md` — canonical architecture and lifecycle decisions.
- `docs/presentation-runbook.md` — live-room, lite fallback, recording, and submission procedure.
- `public/3d/posters/gap-denim.webp`
- `public/3d/posters/zara-runway.webp`
- `public/3d/posters/nike-shoe.webp`
- `public/3d/posters/harley-ride.webp`
- `public/3d/posters/big-idea-scan.webp`

### Modify

- `package.json` — test, QA, and asset-audit scripts; development dependencies only.
- `vite.config.js` — Vitest configuration and stable chunking.
- `index.html` — remove Google Fonts network dependency.
- `src/App.jsx` — route-level lazy loading for scroll, deck, print, and demo surfaces.
- `src/index.css` — self-hosted typography, motion tokens, z-index tokens, responsive rules, and removal of slop patterns.
- `src/site/SiteScroll.jsx` — provide scene runtime and canonical pitch content.
- `src/site/Section.jsx` — expose section ref/progress and explicit scene metadata.
- `src/site/sections/Narrative.jsx` — remove embedded Big Idea and consume canonical content.
- `src/site/sections/Benchmarks.jsx` — consume content and registry metadata.
- `src/site/sections/BrandWorld.jsx` — remove generic card treatment and improve protected content field.
- `src/site/three/SceneStage.jsx` — exclusive activation, fallback-first rendering, safe interaction, and error handling.
- `src/site/three/SceneCanvas.jsx` — frame probe, context configuration, and deterministic cleanup.
- `src/site/three/useInViewport.js` — report intersection ratio, not only a boolean.
- `src/site/three/usePerfGuard.jsx` — static capability only; rendered performance moves into the canvas probe.
- `src/site/three/scenes/index.js` — export Big Idea and handoff scenes.
- `src/site/three/scenes/BigIdeaScan.jsx` — deterministic timeline-driven scan and resource cleanup.
- `src/site/three/scenes/GapDenim.jsx` — seeded texture, disposal, and delta-correct motion.
- `src/site/three/scenes/ZaraWalk.jsx` — cloned model ownership and material cleanup; marginal devices use the runway poster.
- `src/site/three/scenes/NikeShoe.jsx` — interaction routing, delta-correct rotation, model compression, adaptive bloom.
- `src/site/three/scenes/HarleyRide.jsx` — section-progress ride-in and handoff cue instead of a six-second loop.
- `src/site/worlds.js` — semantic color roles and verified contrast pairs.
- `src/site/Kinetic.jsx` — solid emphasis instead of gradient text; visible reduced-motion default.
- `src/site/CursorGlow.jsx` — pause when hidden and disable when reduced motion is active.
- `src/site/useSmoothScroll.js` — remove GSAP if no ScrollTrigger consumer remains.
- `src/components/Deck.jsx` — preserve route behavior after lazy split.
- `src/slides/S10_BigIdea.jsx` — align the print/deck narrative with the canonical Big Idea content.
- `README.md` — reflect the R3F architecture and production delivery process.
- `PLAN-3D.md` — mark Spline architecture as superseded by the approved R3F runtime.

---

## Milestone A — Foundation Gate

### Task 1: Establish Automated Quality Harness and Baseline

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test/setup.js`
- Create: `src/site/three/assetUrl.test.js`
- Create: `playwright.config.js`

**Interfaces:**
- Consumes: existing Vite application and npm scripts.
- Produces: `npm run test`, `npm run test:e2e`, `npm run audit:assets`, and `npm run qa`.

- [ ] **Step 1: Add the test dependencies and scripts**

Run:

```bash
npm install --save-dev vitest@2.1.9 jsdom@25.0.1 @testing-library/react@16.1.0 @testing-library/jest-dom@6.6.3 @playwright/test@1.61.1 @gltf-transform/cli@4.4.0 sharp@0.35.2
npx playwright install chromium
```

Add these scripts to `package.json`:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "audit:assets": "node scripts/audit-assets.mjs",
  "qa": "npm run test && npm run audit:assets && npm run build && npm run test:e2e"
}
```

Expected: npm updates `package-lock.json` without changing runtime dependencies.

Create `playwright.config.js`:

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
```

- [ ] **Step 2: Configure Vitest in `vite.config.js`**

Add this property to `defineConfig`:

```js
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.js'],
  css: true,
  restoreMocks: true,
},
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock
globalThis.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() { return false },
})
```

- [ ] **Step 3: Write the failing public-asset resolver test**

Create `src/site/three/assetUrl.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { assetUrl } from './assetUrl'

describe('assetUrl', () => {
  it('removes a leading slash and prefixes the Vite base', () => {
    expect(assetUrl('/3d/models/shoe.glb', './')).toBe('./3d/models/shoe.glb')
  })

  it('preserves a hosted subdirectory', () => {
    expect(assetUrl('3d/posters/nike-shoe.webp', '/pitch/')).toBe('/pitch/3d/posters/nike-shoe.webp')
  })
})
```

- [ ] **Step 4: Run the test and verify the missing-module failure**

Run: `npm run test -- src/site/three/assetUrl.test.js`

Expected: FAIL because `src/site/three/assetUrl.js` does not exist.

- [ ] **Step 5: Create the minimal resolver**

Create `src/site/three/assetUrl.js`:

```js
export function assetUrl(path, base = import.meta.env.BASE_URL) {
  const cleanPath = String(path).replace(/^\/+/, '')
  const cleanBase = String(base || './').endsWith('/') ? String(base || './') : `${base}/`
  return `${cleanBase}${cleanPath}`
}
```

- [ ] **Step 6: Verify unit tests and the production build**

Run: `npm run test -- src/site/three/assetUrl.test.js && npm run build`

Expected: 2 tests PASS and Vite completes with no unresolved imports.

- [ ] **Step 7: Record the checkpoint**

```bash
git add package.json package-lock.json vite.config.js src/test/setup.js src/site/three/assetUrl.js src/site/three/assetUrl.test.js playwright.config.js
git commit -m "test: establish presentation quality harness"
```

### Task 2: Lock Canonical Architecture and Split Non-Primary Routes

**Files:**
- Create: `docs/architecture/presentation-runtime.md`
- Create: `src/routes/LegacyDeckRoute.jsx`
- Create: `src/routes/PrintRoute.jsx`
- Create: `src/routes/SceneCaptureRoute.jsx`
- Modify: `src/App.jsx`
- Modify: `vite.config.js`
- Modify: `README.md`
- Modify: `PLAN-3D.md`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: current query-string routes.
- Produces: `getPresentationRoute(search): 'site' | 'deck' | 'print' | 'demo' | 'capture'` and lazy route chunks.

- [ ] **Step 1: Write the failing route-selection test**

Create `src/App.test.jsx`:

```jsx
import { describe, expect, it } from 'vitest'
import { getPresentationRoute } from './App'

describe('getPresentationRoute', () => {
  it.each([
    ['', 'site'],
    ['?lite', 'site'],
    ['?deck', 'deck'],
    ['?print', 'print'],
    ['?demo', 'demo'],
    ['?scene=nike&capture', 'capture'],
  ])('maps %s to %s', (search, expected) => {
    expect(getPresentationRoute(search)).toBe(expected)
  })
})
```

- [ ] **Step 2: Verify the export does not exist**

Run: `npm run test -- src/App.test.jsx`

Expected: FAIL because `getPresentationRoute` is not exported.

- [ ] **Step 3: Extract route selection and lazy-load route surfaces**

Use this route contract in `src/App.jsx`:

```jsx
import { Suspense, lazy, useEffect } from 'react'

const SiteScroll = lazy(() => import('./site/SiteScroll'))
const DemoHero = lazy(() => import('./site/DemoHero'))
const LegacyDeckRoute = lazy(() => import('./routes/LegacyDeckRoute'))
const PrintRoute = lazy(() => import('./routes/PrintRoute'))
const SceneCaptureRoute = lazy(() => import('./routes/SceneCaptureRoute'))

export function getPresentationRoute(search = '') {
  const params = new URLSearchParams(search)
  if (params.has('demo')) return 'demo'
  if (params.has('capture') && params.has('scene')) return 'capture'
  if (params.has('print')) return 'print'
  if (params.has('deck')) return 'deck'
  return 'site'
}

function RouteFallback() {
  return <div className="min-h-screen bg-[#05070D]" aria-label="Loading presentation" />
}
```

Move the existing deck registry/render logic without semantic changes into `src/routes/LegacyDeckRoute.jsx`, and the existing `PrintView` into `src/routes/PrintRoute.jsx`. `SceneCaptureRoute.jsx` reads the `scene` query value, renders that registry scene full-viewport inside `SceneRuntimeProvider`, forces quality `high`, and sets `data-scene-ready="true"` only after the canvas reports ready. Render the selected lazy route inside `<Suspense fallback={<RouteFallback />}>`.

- [ ] **Step 4: Document the superseding decision**

Create `docs/architecture/presentation-runtime.md` with these decisions:

```md
# Presentation Runtime

The scroll presentation is the canonical delivery surface. The legacy deck and print views are retained as compatibility and submission paths, loaded only when their query route is requested.

React Three Fiber is the approved 3D engine. The earlier Spline-led proposal in PLAN-3D.md is historical context, not current architecture.

Every section is semantic HTML over a progressive scene layer. One runtime selects at most one live scene. Posters are the loading, lite, reduced-motion, error, and context-loss experience.

The Big Idea timeline is pure presentation state. The overlay and R3F scene consume the same normalized progress but never import one another.
```

Prefix `PLAN-3D.md` with `Status: Superseded in engine choice; narrative and fallback principles remain active.` Update README route and architecture wording to match.

- [ ] **Step 5: Verify route behavior and chunk separation**

Run: `npm run test -- src/App.test.jsx && npm run build`

Expected: all route cases PASS; build output contains separate `SiteScroll`, `LegacyDeckRoute`, and `PrintRoute` chunks; the default index chunk no longer statically contains all 14 slide modules.

- [ ] **Step 6: Record the checkpoint**

```bash
git add src/App.jsx src/routes docs/architecture/presentation-runtime.md README.md PLAN-3D.md vite.config.js src/App.test.jsx
git commit -m "refactor: make scroll presentation the canonical route"
```

### Task 3: Centralize Pitch Content and Evidence

**Files:**
- Create: `src/content/pitch.js`
- Create: `src/content/sources.js`
- Create: `src/content/pitch.test.js`
- Modify: `src/site/sections/Narrative.jsx`
- Modify: `src/site/sections/Benchmarks.jsx`
- Modify: `src/deck.config.js`
- Modify: `src/slides/S10_BigIdea.jsx`

**Interfaces:**
- Produces: `pitchSections`, `bigIdeaContent`, `presenters`, `sourceById`, and `validatePitchContent()`.
- Consumes: verified figures already present in the report and deck.

- [ ] **Step 1: Write failing content-integrity tests**

Create `src/content/pitch.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { bigIdeaContent, pitchSections, validatePitchContent } from './pitch'

describe('pitch content', () => {
  it('uses unique section ids and source ids for every factual claim', () => {
    const result = validatePitchContent()
    expect(result.duplicateIds).toEqual([])
    expect(result.unsourcedClaims).toEqual([])
  })

  it('keeps the fit thesis exact across presentation surfaces', () => {
    expect(bigIdeaContent.thesis).toBe('Make fit Gap’s identity—not its weakness.')
  })

  it('labels KPI values as proposal targets', () => {
    const kpis = pitchSections.find((section) => section.id === 'kpis')
    expect(kpis.items.every((item) => item.kind === 'proposal-target')).toBe(true)
  })
})
```

- [ ] **Step 2: Verify the content module is missing**

Run: `npm run test -- src/content/pitch.test.js`

Expected: FAIL because `src/content/pitch.js` does not exist.

- [ ] **Step 3: Create the canonical Big Idea and KPI content**

Define this exact shape in `src/content/pitch.js`:

```js
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

export const pitchSections = Object.freeze([
  { id: 'hero', world: 'gap', claim: 'Gap becomes the brand that knows your fit.' },
  { id: 'gap-today', world: 'gap', claim: 'The infrastructure exists. The intimacy does not.', claims: ['gap-members', 'gap-fy24-comp'] },
  { id: 'problem', world: 'gap', claim: 'Discounts can trigger purchase. They cannot create preference.' },
  { id: 'gaps', world: 'gap', claim: 'Three gaps prevent loyalty from compounding.' },
  { id: 'insight', world: 'gap', claim: 'The best brands turn one signal into a relationship.' },
  { id: 'zara', world: 'zara', claim: 'Demand data shapes product.', claims: ['zara-online-sales'] },
  { id: 'uniqlo', world: 'uniqlo', claim: 'Feedback shapes LifeWear.', claims: ['uniqlo-comp'] },
  { id: 'nike', world: 'nike', claim: 'Membership becomes a daily lifestyle.' },
  { id: 'harley', world: 'harley', claim: 'Ownership becomes belonging.' },
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
```

Create `src/content/sources.js`:

```js
export const sourceById = Object.freeze({
  'gap-members': {
    title: 'Customer Relationship Management Group Report',
    publisher: 'Les Roches group submission',
    year: 2026,
    locator: 'Gap analysis — Gap Good Rewards membership',
  },
  'gap-fy24-comp': {
    title: 'Customer Relationship Management Group Report',
    publisher: 'Les Roches group submission',
    year: 2026,
    locator: 'Gap analysis — FY2024 comparable sales',
  },
  'zara-online-sales': {
    title: 'Customer Relationship Management Group Report',
    publisher: 'Les Roches group submission',
    year: 2026,
    locator: 'Zara benchmark — FY2024 online sales',
  },
  'uniqlo-comp': {
    title: 'Customer Relationship Management Group Report',
    publisher: 'Les Roches group submission',
    year: 2026,
    locator: 'Uniqlo benchmark — FY2025 same-store sales',
  },
  'encore-launch': {
    title: 'Customer Relationship Management Group Report',
    publisher: 'Les Roches group submission',
    year: 2026,
    locator: 'Recommendation — February 2026 Encore launch',
  },
})
```

During execution, cross-check each locator against the supplied PDF before changing any displayed figure; if the report contradicts the current deck, the report wins and the test fixture changes in the same commit.

- [ ] **Step 4: Implement validation**

```js
import { sourceById } from './sources'

export function validatePitchContent() {
  const ids = pitchSections.map(({ id }) => id)
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  const unsourcedClaims = pitchSections
    .flatMap((section) => section.claims || [])
    .filter((claimId) => !sourceById[claimId])
  return { duplicateIds, unsourcedClaims }
}
```

- [ ] **Step 5: Replace duplicated content consumers**

Import `bigIdeaContent`, `pitchSections`, and `presenters` into the scroll and legacy surfaces. Remove the local `RECS`, `KPIS`, `TEAM`, and benchmark proof literals once the canonical values render identically.

- [ ] **Step 6: Verify content integrity**

Run: `npm run test -- src/content/pitch.test.js && npm run build`

Expected: all 3 tests PASS; no missing export or duplicate React key warnings.

- [ ] **Step 7: Record the checkpoint**

```bash
git add src/content src/site/sections src/slides/S10_BigIdea.jsx src/deck.config.js
git commit -m "refactor: centralize shareholder pitch narrative"
```

### Task 4: Build the Exclusive, Fallback-First Scene Runtime

**Files:**
- Create: `src/site/three/SceneRuntime.jsx`
- Create: `src/site/three/SceneRuntime.test.jsx`
- Create: `src/site/three/SceneErrorBoundary.jsx`
- Create: `src/site/three/SceneFallback.jsx`
- Create: `src/site/three/FrameHealthProbe.jsx`
- Create: `src/site/three/sceneRegistry.js`
- Modify: `src/site/three/useInViewport.js`
- Modify: `src/site/three/usePerfGuard.jsx`
- Modify: `src/site/three/SceneStage.jsx`
- Modify: `src/site/three/SceneCanvas.jsx`
- Modify: `src/site/SiteScroll.jsx`
- Modify: `src/site/Section.jsx`

**Interfaces:**
- Produces: `SceneRuntimeProvider`, `useSceneRuntime()`, `registerVisibility(id, ratio)`, `requestDowngrade(reason)`, and registry entries `{ id, poster, camera, interactive }`.
- Consumes: `assetUrl()` and normalized intersection ratios.

- [ ] **Step 1: Write the failing ownership test**

Create `src/site/three/SceneRuntime.test.jsx`:

```jsx
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SceneRuntimeProvider, useSceneRuntime } from './SceneRuntime'

describe('SceneRuntime', () => {
  it('selects exactly one stage with the greatest intersection ratio', () => {
    const wrapper = ({ children }) => <SceneRuntimeProvider>{children}</SceneRuntimeProvider>
    const { result } = renderHook(() => useSceneRuntime(), { wrapper })

    act(() => {
      result.current.registerVisibility('nike', 0.42)
      result.current.registerVisibility('harley', 0.71)
    })

    expect(result.current.activeSceneId).toBe('harley')
  })

  it('persists a downgrade reason for the session', () => {
    const wrapper = ({ children }) => <SceneRuntimeProvider>{children}</SceneRuntimeProvider>
    const { result } = renderHook(() => useSceneRuntime(), { wrapper })
    act(() => result.current.requestDowngrade('low-fps'))
    expect(result.current.mode).toBe('poster')
    expect(sessionStorage.getItem('gap-pitch-3d-mode')).toBe('poster:low-fps')
  })
})
```

- [ ] **Step 2: Run and verify the missing runtime failure**

Run: `npm run test -- src/site/three/SceneRuntime.test.jsx`

Expected: FAIL because `SceneRuntime.jsx` does not exist.

- [ ] **Step 3: Implement exclusive ownership**

Use a context with this public contract:

```jsx
const SceneRuntimeContext = createContext(null)

export function SceneRuntimeProvider({ children }) {
  const [visibility, setVisibility] = useState({})
  const [downgradeReason, setDowngradeReason] = useState(null)

  const registerVisibility = useCallback((id, ratio) => {
    setVisibility((current) => ({ ...current, [id]: Math.max(0, Math.min(1, ratio)) }))
  }, [])

  const activeSceneId = useMemo(() => {
    return Object.entries(visibility)
      .filter(([, ratio]) => ratio >= 0.15)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null
  }, [visibility])

  const requestDowngrade = useCallback((reason) => {
    sessionStorage.setItem('gap-pitch-3d-mode', `poster:${reason}`)
    setDowngradeReason(reason)
  }, [])

  const value = useMemo(() => ({
    activeSceneId,
    registerVisibility,
    requestDowngrade,
    mode: downgradeReason ? 'poster' : 'live',
    downgradeReason,
  }), [activeSceneId, registerVisibility, requestDowngrade, downgradeReason])

  return <SceneRuntimeContext.Provider value={value}>{children}</SceneRuntimeContext.Provider>
}
```

Initialize `downgradeReason` from forced lite, reduced motion, coarse pointer, viewport width, WebGL availability, and the session key. Subscribe to media-query changes so mode updates without reloading.

- [ ] **Step 4: Make intersection ratio explicit**

Change `useInViewport` to return `{ ref, inView, ratio }`. Its observer callback must set both `entry.isIntersecting` and `entry.intersectionRatio`; use thresholds `[0, 0.15, 0.35, 0.55, 0.75, 1]`.

- [ ] **Step 5: Create the fallback-first scene shell**

`SceneFallback` renders the poster at all times:

```jsx
export function SceneFallback({ src, alt = '' }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <img src={src} alt={alt} className="h-full w-full object-cover" decoding="async" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,.82)_0%,rgba(5,7,13,.42)_48%,rgba(5,7,13,.08)_100%)]" />
    </div>
  )
}
```

`SceneStage` must render the poster before the canvas, register its ratio, and mount a canvas only when `mode === 'live' && activeSceneId === sceneId`. Remove `AnimatePresence` around canvases so the outgoing WebGL context unmounts before the next canvas mounts. Fade only the canvas opacity after `onSceneReady`.

- [ ] **Step 6: Route pointer events by registry policy**

The stage wrapper remains `pointer-events-none`; only an interactive canvas receives `pointer-events-auto`. Registry entries for Nike use `interactive: true`; all other Phase 2 scenes use `false`. This preserves page scrolling while restoring Nike drag controls.

- [ ] **Step 7: Add error and frame-health downgrade**

`SceneErrorBoundary` calls `requestDowngrade('scene-error')` in `componentDidCatch` and returns `null`, leaving the poster beneath it. `FrameHealthProbe` counts `useFrame` callbacks for 2 seconds after a 1-second warmup; if average rendered FPS is below 42, call `requestDowngrade('low-fps')` exactly once.

- [ ] **Step 8: Verify ownership, fallback, and build**

Run: `npm run test -- src/site/three/SceneRuntime.test.jsx && npm run build`

Expected: tests PASS; no scene chunk is fetched on `?lite`; ownership state never exposes two active ids.

- [ ] **Step 9: Record the checkpoint**

```bash
git add src/site/three src/site/SiteScroll.jsx src/site/Section.jsx
git commit -m "feat: harden exclusive 3d scene runtime"
```

---

## Milestone B — Big Idea Gate

### Task 5: Define the Deterministic Big Idea Timeline

**Files:**
- Create: `src/site/three/scenes/bigIdeaTimeline.js`
- Create: `src/site/three/scenes/bigIdeaTimeline.test.js`

**Interfaces:**
- Produces: `BIG_IDEA_PHASES`, `clamp01(value)`, `phaseProgress(progress, start, end)`, and `getBigIdeaState(progress)`.
- Consumes: normalized section progress from 0 to 1.

- [ ] **Step 1: Write the failing timeline tests**

```js
import { describe, expect, it } from 'vitest'
import { getBigIdeaState } from './bigIdeaTimeline'

describe('getBigIdeaState', () => {
  it.each([
    [0.00, 'arrive'],
    [0.18, 'scan'],
    [0.43, 'profile'],
    [0.68, 'recommend'],
    [0.90, 'outcome'],
  ])('maps %s to %s', (progress, phase) => {
    expect(getBigIdeaState(progress).phase).toBe(phase)
  })

  it('clamps progress and all derived values', () => {
    expect(getBigIdeaState(-1).progress).toBe(0)
    expect(getBigIdeaState(2).progress).toBe(1)
    expect(Object.values(getBigIdeaState(0.5)).filter(Number.isFinite).every((value) => value >= 0 && value <= 1)).toBe(true)
  })
})
```

- [ ] **Step 2: Verify the missing module failure**

Run: `npm run test -- src/site/three/scenes/bigIdeaTimeline.test.js`

Expected: FAIL because the timeline module does not exist.

- [ ] **Step 3: Implement exact phase boundaries**

```js
export const BIG_IDEA_PHASES = Object.freeze({
  arrive: [0.00, 0.12],
  scan: [0.12, 0.36],
  profile: [0.36, 0.58],
  recommend: [0.58, 0.82],
  outcome: [0.82, 1.00],
})

export const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0))

export function phaseProgress(progress, start, end) {
  return clamp01((clamp01(progress) - start) / (end - start))
}

export function getBigIdeaState(input) {
  const progress = clamp01(input)
  const phase = Object.entries(BIG_IDEA_PHASES).find(([, [start, end]], index, entries) => {
    return progress >= start && (progress < end || index === entries.length - 1)
  })?.[0] || 'arrive'

  return {
    progress,
    phase,
    arrival: phaseProgress(progress, ...BIG_IDEA_PHASES.arrive),
    scan: phaseProgress(progress, ...BIG_IDEA_PHASES.scan),
    profile: phaseProgress(progress, ...BIG_IDEA_PHASES.profile),
    recommendations: phaseProgress(progress, ...BIG_IDEA_PHASES.recommend),
    outcome: phaseProgress(progress, ...BIG_IDEA_PHASES.outcome),
  }
}
```

- [ ] **Step 4: Verify deterministic behavior**

Run: `npm run test -- src/site/three/scenes/bigIdeaTimeline.test.js`

Expected: 7 cases PASS.

- [ ] **Step 5: Record the checkpoint**

```bash
git add src/site/three/scenes/bigIdeaTimeline.js src/site/three/scenes/bigIdeaTimeline.test.js
git commit -m "feat: define fit experience timeline"
```

### Task 6: Rebuild `BigIdeaScan` as a Production Scene

**Files:**
- Modify: `src/site/three/scenes/BigIdeaScan.jsx`
- Modify: `src/site/three/scenes/index.js`
- Modify: `src/site/three/sceneRegistry.js`
- Test: `src/site/three/scenes/BigIdeaScan.test.jsx`

**Interfaces:**
- Consumes: `progress` as a Framer `MotionValue<number>` or `{ get(): number }`, `assetUrl()`, and `getBigIdeaState()`.
- Produces: `<BigIdeaScan progress={progress} quality="high|reduced" />` with no React state updates inside `useFrame`.

- [ ] **Step 1: Write the failing component contract test**

Create `src/site/three/scenes/BigIdeaScan.test.jsx`:

```jsx
import { render } from '@testing-library/react'
import * as THREE from 'three'
import { describe, expect, it, vi } from 'vitest'
import BigIdeaScan from './BigIdeaScan'

const mocks = vi.hoisted(() => ({ useFrame: vi.fn(), preload: vi.fn() }))

vi.mock('@react-three/fiber', () => ({ useFrame: (callback) => mocks.useFrame(callback) }))
vi.mock('@react-three/drei', () => ({
  useGLTF: Object.assign(() => ({ scene: new THREE.Group(), animations: [] }), { preload: mocks.preload }),
  useAnimations: () => ({ actions: {}, names: [] }),
}))
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }) => <div>{children}</div>,
  Bloom: () => null,
}))

describe('BigIdeaScan', () => {
  it('registers a frame callback and accepts stable progress', () => {
    const progress = { get: () => 0.5 }
    render(<BigIdeaScan progress={progress} quality="reduced" />)
    expect(mocks.useFrame).toHaveBeenCalled()
  })

  it('preloads the model through the Vite base rather than the origin root', () => {
    expect(mocks.preload).toHaveBeenCalled()
    expect(mocks.preload.mock.calls.flat().join(' ')).not.toMatch(/^\/3d\//)
  })
})
```

Expected initial failure: the existing scene does not consume `progress`, and its preload call begins at `/3d/`.

- [ ] **Step 2: Clone model ownership and dispose only owned materials**

Create one cloned skeleton with `useMemo`. Traverse it once, assign one shared owned `MeshStandardMaterial` to its meshes, and return a cleanup that calls `material.dispose()`. Never dispose cached GLTF geometry.

Use this owned-material pattern:

```jsx
const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
  color: '#0B1F42',
  emissive: '#163C88',
  emissiveIntensity: 0.18,
  roughness: 0.56,
  metalness: 0.08,
}), [])

useEffect(() => {
  cloned.traverse((object) => {
    if (object.isMesh) object.material = bodyMaterial
  })
  return () => bodyMaterial.dispose()
}, [cloned, bodyMaterial])
```

- [ ] **Step 3: Drive scan position from shared progress**

Replace the elapsed-time sine loop with:

```jsx
useFrame((_, delta) => {
  const state = getBigIdeaState(progress.get())
  const targetY = THREE.MathUtils.lerp(-1.45, 1.55, state.scan)
  beam.current.position.y = THREE.MathUtils.damp(beam.current.position.y, targetY, 14, delta)
  glow.current.position.y = beam.current.position.y
  beamMaterial.current.opacity = state.phase === 'scan' ? 0.92 : 0
  glowMaterial.current.opacity = state.phase === 'scan' ? 0.14 : 0
  bodyMaterial.emissiveIntensity = THREE.MathUtils.lerp(0.18, 0.52, state.profile)
})
```

All vectors, colors, materials, and temporary objects are created outside `useFrame`.

- [ ] **Step 4: Add authored measurement geometry**

Use three reusable ring meshes at shoulder, waist, and inseam heights. Their scale and opacity derive from `state.profile`; labels remain HTML in the overlay. The visual must read as tailoring/fit intelligence, not a medical scanner.

- [ ] **Step 5: Make postprocessing quality-aware**

Render Bloom only for `quality === 'high'`, with `luminanceThreshold={0.65}` and `intensity={0.45}`. The scan must remain readable without bloom.

- [ ] **Step 6: Export and register the scene**

Add `BigIdeaScan` to `scenes/index.js`. Register:

```js
bigIdea: {
  id: 'big-idea',
  poster: assetUrl('3d/posters/big-idea-scan.webp'),
  camera: { position: [0, 0, 6.5], fov: 38 },
  interactive: false,
}
```

- [ ] **Step 7: Verify tests, build, and dead-code elimination reversal**

Run: `npm run test -- src/site/three/scenes/BigIdeaScan.test.jsx && npm run build`

Expected: tests PASS; build output now contains a `BigIdeaScan` lazy chunk; compiled code contains no `preload("/3d/` string.

- [ ] **Step 8: Record the checkpoint**

```bash
git add src/site/three/scenes/BigIdeaScan.jsx src/site/three/scenes/BigIdeaScan.test.jsx src/site/three/scenes/index.js src/site/three/sceneRegistry.js
git commit -m "feat: turn fit scan into a deterministic 3d scene"
```

### Task 7: Build and Integrate the Big Idea Experience

**Files:**
- Create: `src/site/sections/BigIdeaExperience.jsx`
- Create: `src/site/sections/BigIdeaOverlay.jsx`
- Create: `src/site/sections/BigIdeaOverlay.test.jsx`
- Modify: `src/site/sections/Narrative.jsx`
- Modify: `src/site/SiteScroll.jsx`
- Modify: `src/site/Section.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `bigIdeaContent`, `getBigIdeaState`, `BigIdeaScan`, scene registry, and a section-scoped MotionValue.
- Produces: one semantic `<section id="big-idea">` with a 240vh desktop runway and a single-screen lite/mobile layout.

- [ ] **Step 1: Write the failing semantic-overlay test**

```jsx
import { render, screen } from '@testing-library/react'
import { motionValue } from 'framer-motion'
import { describe, expect, it } from 'vitest'
import BigIdeaOverlay from './BigIdeaOverlay'

describe('BigIdeaOverlay', () => {
  it('keeps the complete recommendation in the DOM without WebGL', () => {
    render(<BigIdeaOverlay progress={motionValue(1)} reducedMotion />)
    expect(screen.getByRole('heading', { name: /make fit gap’s identity/i })).toBeVisible()
    expect(screen.getByText(/right fit.*fewer returns.*richer data/i)).toBeVisible()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Verify the missing component failure**

Run: `npm run test -- src/site/sections/BigIdeaOverlay.test.jsx`

Expected: FAIL because `BigIdeaOverlay.jsx` does not exist.

- [ ] **Step 3: Implement semantic overlay without card-grid styling**

Structure `BigIdeaOverlay` as:

```jsx
<div className="big-idea-copy">
  <p className="big-idea-chapter">The recommendation</p>
  <h2>Make fit Gap’s identity—not its weakness.</h2>
  <p className="big-idea-explanation">{bigIdeaContent.explanation}</p>
  <dl className="fit-readout">...</dl>
  <ol className="fit-recommendations">...</ol>
  <p className="fit-outcome">{bigIdeaContent.outcome}</p>
</div>
```

Use a single vertical rule and typographic alignment for the fit readout. Recommendation rows contain name, match percentage, and a thin horizontal match measure; they do not use rounded cards, product-placeholder rectangles, gradients, or shadows.

- [ ] **Step 4: Connect section progress once**

`BigIdeaExperience` owns a section ref and calls:

```jsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end'],
})
```

Pass the MotionValue directly to `<BigIdeaScan progress={scrollYProgress} />` and `<BigIdeaOverlay progress={scrollYProgress} />`. The R3F scene reads `.get()` inside `useFrame`; the overlay uses `useTransform`/`useMotionValueEvent`. Do not mirror frame progress into React state.

- [ ] **Step 5: Make reduced motion and lite mode final-state first**

When reduced motion or poster mode is active, use `motionValue(1)` for overlay content and render the section at `min-height: 100vh`. On live desktop, use `min-height: 240vh` with a sticky 100vh inner stage.

- [ ] **Step 6: Replace the embedded `BigIdea` export**

Remove the current Big Idea implementation and `RECS` constant from `Narrative.jsx`. Import `<BigIdeaExperience onActive={setActive} />` in `SiteScroll.jsx` at the same narrative position.

- [ ] **Step 7: Verify the centerpiece in all modes**

Run:

```bash
npm run test -- src/site/sections/BigIdeaOverlay.test.jsx src/site/three/scenes/bigIdeaTimeline.test.js
npm run build
```

Expected: tests PASS; live build includes BigIdeaScan; `?lite` does not mount canvas; all copy remains visible in reduced-motion tests.

- [ ] **Step 8: Human review at the Big Idea Gate**

Review at 1920×1080 live, 1366×768 live, 820×1180 lite, and 390×844 lite. Approve only if each of the four narrative beats is distinguishable and the audience can understand the recommendation with the sound muted and the canvas disabled.

- [ ] **Step 9: Record the checkpoint**

```bash
git add src/site/sections/BigIdeaExperience.jsx src/site/sections/BigIdeaOverlay.jsx src/site/sections/BigIdeaOverlay.test.jsx src/site/sections/Narrative.jsx src/site/SiteScroll.jsx src/site/Section.jsx src/index.css
git commit -m "feat: integrate the shareholder fit reveal"
```

---

## Milestone C — Shareholder Gate

### Task 8: Complete Phase 2 Scenes and World Handoff

**Files:**
- Modify: `src/site/three/scenes/GapDenim.jsx`
- Modify: `src/site/three/scenes/ZaraWalk.jsx`
- Modify: `src/site/three/scenes/NikeShoe.jsx`
- Modify: `src/site/three/scenes/HarleyRide.jsx`
- Create: `src/site/three/scenes/SectionHandoff.jsx`
- Modify: `src/site/three/scenes/index.js`
- Modify: `src/site/three/sceneRegistry.js`
- Modify: `src/site/sections/Benchmarks.jsx`

**Interfaces:**
- Consumes: scene progress, runtime quality, registry metadata, and relative-safe asset URLs.
- Produces: deterministic scene entry/exit, a Harley-orange-to-Gap-blue handoff, and no unmanaged Three resources.

- [ ] **Step 1: Add a scene lifecycle regression test**

Create `src/site/three/scenes/sceneContracts.test.js`:

```js
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const files = ['GapDenim.jsx', 'ZaraWalk.jsx', 'NikeShoe.jsx', 'HarleyRide.jsx', 'BigIdeaScan.jsx']

describe('scene source contracts', () => {
  it.each(files)('%s contains no origin-root 3d asset URL', (file) => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    expect(source).not.toMatch(/['"]\/3d\//)
  })

  it.each(files)('%s does not trigger React state from useFrame', (file) => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8')
    const frameBodies = source.match(/useFrame\([\s\S]*?\n\s*}\)/g) || []
    expect(frameBodies.join('\n')).not.toMatch(/\bset[A-Z][A-Za-z0-9_]*\(/)
  })

  it('disposes every explicitly owned procedural resource', () => {
    const denim = readFileSync(new URL('GapDenim.jsx', import.meta.url), 'utf8')
    const zara = readFileSync(new URL('ZaraWalk.jsx', import.meta.url), 'utf8')
    const scan = readFileSync(new URL('BigIdeaScan.jsx', import.meta.url), 'utf8')
    expect(denim).toContain('denim.dispose()')
    expect(zara).toContain('material.dispose()')
    expect(scan).toContain('bodyMaterial.dispose()')
  })
})
```

- [ ] **Step 2: Make Gap denim deterministic and disposable**

Replace `Math.random()` speckle with a small seeded generator so poster captures are stable. Set texture color space, cap anisotropy using renderer capability, and dispose the CanvasTexture on unmount. Use `MathUtils.damp(..., delta)` for pointer rotation so movement is refresh-rate independent.

- [ ] **Step 3: Protect Zara’s cached GLTF**

Clone the soldier scene with `SkeletonUtils.clone`, allocate one owned monochrome material, assign it only to the clone, and dispose that material on cleanup. If runtime quality is reduced, registry policy uses the runway poster instead of live animation.

- [ ] **Step 4: Correct Nike interaction and asset weight**

Compress `shoe.glb` with Meshopt/Draco using `gltf-transform` and verify the output is at most 3 MB with no visible silhouette or normal-map degradation. Drive idle rotation with `delta`, stop auto-rotation during drag, and reduce Environment resolution from 256 to 128 unless the projector comparison shows visible loss.

- [ ] **Step 5: Replace Harley’s loop with narrative progress**

Map section entry progress to ride-in position and headlight intensity. Once parked, keep only subtle engine vibration. During the last 15% of section progress, extend one orange light streak across the frame; the Big Idea begins with the same streak cooling to Gap blue and flattening into the scan beam.

- [ ] **Step 6: Verify no frame allocations**

Search: `rg -n "useFrame[\\s\\S]{0,500}new (THREE\\.)?(Vector|Matrix|Color|Object3D)" src/site/three/scenes`

Expected: no matches. Manually inspect every `useFrame` body for arrays, object literals assigned per frame, and React state setters.

- [ ] **Step 7: Verify scenes and handoff**

Run: `npm run test && npm run audit:assets && npm run build`

Expected: all tests PASS; each GLB meets its budget; only one canvas exists during the Harley-to-Big-Idea transition.

- [ ] **Step 8: Record the checkpoint**

```bash
git add public/3d/models src/site/three/scenes src/site/three/sceneRegistry.js src/site/sections/Benchmarks.jsx
git commit -m "feat: finish phase two brand-world choreography"
```

### Task 9: Replace AI-Slop Patterns with an Authored Visual System

**Files:**
- Modify: `src/index.css`
- Modify: `src/site/worlds.js`
- Modify: `src/site/Kinetic.jsx`
- Modify: `src/site/sections/Narrative.jsx`
- Modify: `src/site/sections/BrandWorld.jsx`
- Modify: `src/site/sections/Benchmarks.jsx`
- Test: `src/site/worlds.test.js`

**Interfaces:**
- Produces: semantic world roles `background`, `foreground`, `muted`, `accent`, `accentOn`, `sceneWash`; solid text emphasis; consistent spatial rhythm.

- [ ] **Step 1: Write contrast and token tests**

Create a test that calculates relative luminance and asserts each world’s `foreground/background`, `muted/background`, and `accentOn/accent` pairs meet the required ratio. Assert no world exposes a `grad` text-emphasis token.

- [ ] **Step 2: Replace gradient text**

Change `Kinetic` accent words to `color: world.accent`. Remove `backgroundClip`, `WebkitBackgroundClip`, transparent text, and `grad` from `worlds.js`. Use weight, scale, and timing for emphasis.

- [ ] **Step 3: Remove repeated eyebrow grammar**

Keep a chapter marker only for Hero, Insight, Big Idea, and CTA. Other sections begin directly with the claim or a meaningful sequence label. The three gaps and rollout retain numbers because order carries information.

- [ ] **Step 4: Remove decorative grain and generic glass**

Delete the SVG turbulence grain. Replace translucent bordered rounded panels in rollout and benchmark lessons with either a full-width rule-separated row or a solid color field. Keep border radii at 12 px or below for information containers; pills remain limited to controls/status.

- [ ] **Step 5: Enforce hierarchy limits**

Set display maximum to 6rem and minimum tracking to `-0.04em`. Add `text-wrap: balance` to headings and `text-wrap: pretty` to narrative paragraphs. Keep body measure between 45ch and 70ch.

- [ ] **Step 6: Create intentional world differences**

- Gap: deep denim, tactile cloth, calm authority.
- Zara: gallery-black, severe white space, walking silhouette.
- Uniqlo: red modular field, precise feedback loop, no 3D scene required in Phase 2.
- Nike: black/volt object theatre with direct manipulation.
- Harley: low orange horizon, motion and belonging.

Each world keeps shared navigation, content protection, and type rhythm so the presentation remains one argument.

- [ ] **Step 7: Run tests and detector**

Run:

```bash
npm run test -- src/site/worlds.test.js
node ../.agents/skills/impeccable/scripts/detect.mjs --json src/index.css src/site/Kinetic.jsx src/site/sections/Narrative.jsx src/site/sections/BrandWorld.jsx
```

Expected: contrast tests PASS; detector reports no gradient text, excessive rounding, decorative grain, or repeated generic card-grid findings.

- [ ] **Step 8: Record the checkpoint**

```bash
git add src/index.css src/site/worlds.js src/site/Kinetic.jsx src/site/sections
git commit -m "design: establish an authored Gap presentation system"
```

### Task 10: Strengthen the Shareholder Narrative and Ask

**Files:**
- Modify: `src/content/pitch.js`
- Modify: `src/site/sections/Narrative.jsx`
- Modify: `src/site/sections/BrandWorld.jsx`
- Modify: `src/slides/S10_BigIdea.jsx`
- Modify: `src/slides/S11_Rollout.jsx`
- Modify: `src/slides/S12_KPIs.jsx`
- Modify: `src/slides/S14_CTA.jsx`
- Test: `src/content/pitch.test.js`

**Interfaces:**
- Consumes: canonical content and sources.
- Produces: a shareholder argument with explicit value, risk, ownership, timing, and ask.

- [ ] **Step 1: Add narrative-order assertions**

Assert the section claims form this order: baseline → commercial problem → capability gaps → benchmark proof → fit recommendation → rollout → proposed targets → why now → ask.

- [ ] **Step 2: Tighten section claims**

Use one declarative claim per viewport. Remove repeated explanation that restates the heading. Change weak phrases such as “the fix” and “whole identity” to specific business language: product feedback, recommendation relevance, return-rate signal, retention, and member value.

- [ ] **Step 3: Make the rollout accountable**

For each rollout phase, show owner, deliverable, decision gate, and evidence of progress:

```js
[
  { months: '0–3', owner: 'Data + CRM', deliverable: 'Fit-profile foundation', gate: 'Profile data is complete enough to recommend confidently' },
  { months: '3–9', owner: 'Product + Digital', deliverable: 'Fit-led recommendations', gate: 'Conversion improves while denim returns trend down' },
  { months: '9–18', owner: 'Brand + Membership', deliverable: 'Fit-based access and rewards', gate: 'Repeat purchase and member value improve' },
]
```

- [ ] **Step 4: Clarify measurement honesty**

Label all KPI numbers `Proposed target`. Do not display a numeric denim-return reduction unless the report supports that exact target; show `↓` with “baseline in phase one” instead.

- [ ] **Step 5: Make the final ask concrete**

The CTA must request approval for a 90-day fit-profile foundation phase, named cross-functional ownership, and baseline measurement. Do not invent budget. End on the thesis, not “questions & discussion.”

- [ ] **Step 6: Verify copy and source integrity**

Run: `npm run test -- src/content/pitch.test.js && npm run build`

Expected: narrative-order, source, and target-label tests PASS.

- [ ] **Step 7: Human read-through**

Read the full pitch aloud at a deliberate pace. Target 12–15 minutes, with 90–120 seconds reserved for Big Idea and 45–60 seconds for the ask. Remove copy that requires reading paragraphs from the screen.

- [ ] **Step 8: Record the checkpoint**

```bash
git add src/content src/site/sections src/slides/S10_BigIdea.jsx src/slides/S11_Rollout.jsx src/slides/S12_KPIs.jsx src/slides/S14_CTA.jsx
git commit -m "content: sharpen the shareholder case for fit"
```

---

## Milestone D — Production Gate

### Task 11: Complete Accessibility, Reduced Motion, and Responsive Behavior

**Files:**
- Modify: `src/index.css`
- Modify: `src/site/SiteScroll.jsx`
- Modify: `src/site/Section.jsx`
- Modify: `src/site/CursorGlow.jsx`
- Modify: `src/site/SoundToggle.jsx`
- Modify: `src/site/Magnetic.jsx`
- Modify: `src/site/CountUp.jsx`
- Create: `tests/e2e/pitch.spec.js`

**Interfaces:**
- Produces: keyboard and screen-reader-safe controls, static reduced-motion content, and overflow-free layouts.

- [ ] **Step 1: Write failing browser checks**

In `tests/e2e/pitch.spec.js`, assert:

```js
test('lite mode contains the full pitch and no canvas', async ({ page }) => {
  await page.goto('/?lite')
  await expect(page.getByRole('heading', { name: /brand that knows your fit/i })).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', await page.locator('html').evaluate((el) => el.clientWidth))
})

test('sound control exposes state and a 44px target', async ({ page }) => {
  await page.goto('/?lite')
  const sound = page.getByRole('button', { name: /enable ambient sound/i })
  await expect(sound).toHaveAttribute('aria-pressed', 'false')
  expect((await sound.boundingBox()).height).toBeGreaterThanOrEqual(44)
})
```

- [ ] **Step 2: Implement semantic landmarks and navigation**

Give persistent chrome a descriptive label, add a skip link to `#pitch-content`, and ensure every interactive element is a real button/link. Mark the rapidly changing current-world indicator `aria-hidden="true"`; the section headings already provide the meaningful reading order without repeated announcements.

- [ ] **Step 3: Make reduced motion deterministic**

When `useReducedMotion()` is true: Kinetic words render at final transform; CountUp renders the final number immediately; cursor glow and Magnetic are disabled; smooth scroll is not created; Big Idea receives final progress; all canvas stages stay in poster mode.

- [ ] **Step 4: Fix responsive composition**

At widths below 820 px: use poster mode, allow natural section height, reduce fixed display sizes, keep headings within viewport, stack proof content, and restore the system cursor. At short desktop heights below 760 px: reduce vertical gaps before reducing type.

- [ ] **Step 5: Verify keyboard and overflow**

Run: `npm run test:e2e -- tests/e2e/pitch.spec.js`

Expected: desktop, projector, tablet, and mobile projects PASS; no horizontal overflow; all controls meet 44×44 px.

- [ ] **Step 6: Record the checkpoint**

```bash
git add src/index.css src/site tests/e2e/pitch.spec.js
git commit -m "fix: make the pitch accessible in every presentation mode"
```

### Task 12: Make Delivery Fully Offline and Budgeted

**Files:**
- Modify: `index.html`
- Create: `src/fonts.js`
- Modify: `src/main.jsx`
- Modify: `src/index.css`
- Modify: `package.json`
- Create: `scripts/audit-assets.mjs`
- Create: `scripts/capture-posters.mjs`
- Create: `public/3d/posters/*.webp`
- Modify: all GLTF URL consumers under `src/site/three/scenes/`

**Interfaces:**
- Consumes: `assetUrl()` and scene registry.
- Produces: a self-contained `dist/` with enforced file budgets.

- [ ] **Step 1: Install and import self-hosted fonts**

Run:

```bash
npm install @fontsource-variable/bricolage-grotesque@5.2.10 @fontsource-variable/hanken-grotesk@5.2.8 @fontsource/anton@5.2.7 @fontsource-variable/bodoni-moda@5.2.7 @fontsource-variable/archivo@5.2.8 @fontsource-variable/oswald@5.2.8 @fontsource-variable/jetbrains-mono@5.2.8 @fontsource-variable/public-sans@5.2.7 @fontsource/libre-caslon-display@5.2.7 @fontsource/libre-caslon-text@5.2.7
```

Create `src/fonts.js`:

```js
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource/anton/400.css'
import '@fontsource-variable/bodoni-moda'
import '@fontsource-variable/archivo'
import '@fontsource-variable/oswald'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/public-sans'
import '@fontsource/libre-caslon-display/400.css'
import '@fontsource/libre-caslon-text/400.css'
```

Import `./fonts.js` before `./index.css` in `src/main.jsx`. Delete both Google Fonts `<link>` tags from `index.html`. Retain system fallbacks in CSS and verify computed fonts after the build.

- [ ] **Step 2: Implement asset audit**

`scripts/audit-assets.mjs` recursively inspects `public/3d`. Fail with exit code 1 when a `.glb` exceeds 3,145,728 bytes, a `.webp` exceeds 256,000 bytes, or source files contain a quoted URL beginning with `/3d/`. Print exact offending paths and byte sizes.

- [ ] **Step 3: Capture deterministic posters**

Use Playwright at 1920×1080 with `?scene=<id>&capture` to wait for a `data-scene-ready="true"` marker, capture PNG, and convert to WebP quality 82. Each final poster must preserve the content-protection region and visually match its live world.

- [ ] **Step 4: Verify relative deployment**

Build, serve `dist/` under both `/` and `/pitch/`, and verify every model, poster, font, JS, and CSS request returns 200. Open `dist/index.html` through a local static server; direct `file://` is a convenience target, not the only submission strategy.

- [ ] **Step 5: Verify budgets**

Run: `npm run audit:assets && npm run build`

Expected: zero violations; initial route at most 135 kB gzip; no build chunk warning except the intentionally lazy Three/R3F vendor chunk.

- [ ] **Step 6: Record the checkpoint**

```bash
git add index.html package.json package-lock.json src/fonts.js src/main.jsx src/index.css scripts public/3d/posters src/site/three
git commit -m "perf: ship the presentation fully offline"
```

### Task 13: Add Production Visual and Runtime QA

**Files:**
- Create: `tests/e2e/visual.spec.js`
- Modify: `playwright.config.js`
- Create: `tests/e2e/visual.spec.js-snapshots/*`
- Modify: `docs/presentation-runbook.md`

**Interfaces:**
- Produces: repeatable screenshots, canvas-count checks, runtime-error checks, and a presentation dry-run checklist.

- [ ] **Step 1: Configure exact QA projects**

Define Playwright projects:

```js
projects: [
  { name: 'projector-1080p', use: { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 } },
  { name: 'laptop-768p', use: { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 } },
  { name: 'tablet-lite', use: { viewport: { width: 820, height: 1180 }, hasTouch: true } },
  { name: 'mobile-lite', use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
]
```

- [ ] **Step 2: Add visual checkpoints**

Capture Hero, Insight, each benchmark world, all four Big Idea phases, Rollout, KPIs, and CTA. Disable screenshot animations only for layout regression captures; keep a separate live-motion dry run.

- [ ] **Step 3: Add runtime assertions**

During an automated top-to-bottom scroll, collect `pageerror`, failed requests, console errors, maximum simultaneous canvas count, and section ids reached. Assert zero errors, zero failed local assets, canvas count at most one, and every canonical section visited.

- [ ] **Step 4: Run full QA**

Run: `npm run qa`

Expected: unit, asset, build, e2e, and visual suites PASS.

- [ ] **Step 5: Perform the presentation-machine dry run**

On the actual venue laptop/projector: test `/`, `/?lite`, sound opt-in, fullscreen, scroll input, sleep/wake, external display, and a complete 15-minute run. Record median FPS and note whether auto-downgrade activates.

- [ ] **Step 6: Record the checkpoint**

```bash
git add playwright.config.js tests/e2e docs/presentation-runbook.md
git commit -m "test: certify the shareholder presentation"
```

### Task 14: Final Polish, Print, Backup, and Release

**Files:**
- Modify: `src/slides/*.jsx`
- Modify: `src/components/Deck.jsx`
- Modify: `src/components/SlideFrame.jsx`
- Modify: `README.md`
- Modify: `docs/presentation-runbook.md`
- Create: `release/manifest.json`

**Interfaces:**
- Consumes: approved content, production assets, and QA baselines.
- Produces: final `dist/`, PDF, screen recording, release manifest, and operator runbook.

- [ ] **Step 1: Align print with canonical content**

Verify the 14 legacy slides use the same thesis, KPI labels, rollout owners, presenter names, and final ask as the scroll site. Resolve all animations to final state in print mode and keep every page inside 1280×720 without clipping.

- [ ] **Step 2: Run the anti-slop inspection**

Inspect every viewport for gradient text, repeated eyebrow grammar, generic rounded cards, tiny low-contrast labels, fake product placeholders, decorative blur, and arbitrary animation. Remove any occurrence that does not carry narrative meaning.

- [ ] **Step 3: Run the full production suite twice**

Run: `npm run qa && npm run qa`

Expected: both runs PASS, proving deterministic posters, screenshots, tests, and build output.

- [ ] **Step 4: Produce deliverables**

Create:

- `dist/` from the passing build.
- landscape PDF from `/?print` after fonts settle.
- 60–90 second MP4 backup showing the full scroll experience.
- zipped `dist/` with no source maps, caches, or development files.

- [ ] **Step 5: Write release manifest**

`release/manifest.json` records build date, commit hash when available, test result, asset-audit result, routes, fallback instructions, model credits, font licenses, and SHA-256 hashes of the ZIP, PDF, and MP4.

- [ ] **Step 6: Final review in the room’s mindset**

Approve only if the first 30 seconds establish confidence, the benchmark worlds prove rather than distract, the Big Idea is the unmistakable emotional and strategic peak, the rollout feels executable, and the final ask is clear without presenter explanation.

- [ ] **Step 7: Record the release checkpoint**

```bash
git add src/slides src/components README.md docs/presentation-runbook.md release/manifest.json
git commit -m "release: certify the Gap shareholder pitch"
```

---

## Acceptance Checklist

### Strategy

- [ ] The audience can repeat the fit thesis after one viewing.
- [ ] Every benchmark visibly contributes one lesson to the Gap recommendation.
- [ ] The rollout names owners, deliverables, gates, and horizons.
- [ ] KPI figures are honest proposal targets, not implied historical results.
- [ ] The final ask requests a concrete 90-day decision without inventing budget.

### Art Direction

- [ ] Each brand world feels authored and distinct while remaining part of one presentation.
- [ ] The Big Idea is the visual and narrative peak.
- [ ] Typography never overflows and never relies on gradient fill.
- [ ] No generic dashboard/card-grid language survives.
- [ ] Motion has a narrative verb: enter, scan, assemble, recommend, converge, or resolve.

### Engineering

- [ ] Production build succeeds.
- [ ] Initial JavaScript is at most 135 kB gzip.
- [ ] Only one canvas is ever live.
- [ ] No model exceeds 3 MB and no poster exceeds 250 kB.
- [ ] No absolute `/3d/` asset URL remains.
- [ ] No owned material, texture, audio node, RAF, observer, or event listener leaks after unmount.
- [ ] Live 3D downgrades below 42 rendered FPS.

### Resilience

- [ ] `?lite` is complete and presentation-worthy.
- [ ] Reduced motion is complete and presentation-worthy.
- [ ] Scene load failure leaves the argument intact.
- [ ] WebGL context loss leaves the poster and navigation intact.
- [ ] Offline/subdirectory serving loads all assets.

### Delivery

- [ ] `/`, `/?lite`, `/?deck`, `/?print`, and `/?demo` pass.
- [ ] PDF contains 14 unclipped pages.
- [ ] MP4 backup exists and plays with no external codec dependency.
- [ ] ZIP, PDF, and MP4 hashes are recorded.
- [ ] Presentation-machine dry run is complete.

## Self-Review Result

- **Spec coverage:** architecture, Big Idea completion, Phase 2 scene work, visual differentiation, shareholder narrative, performance, fallbacks, accessibility, print, and delivery each map to explicit tasks and acceptance checks.
- **Scope discipline:** Phase 3 scenes such as 3D KPI numerals, rollout camera fly-through, Uniqlo thermal cloth, and CTA object convergence are excluded until the Production Gate passes. They are not required to make Phase 2 complete or the pitch excellent.
- **Type consistency:** scene ids, route names, runtime methods, content exports, Big Idea phase names, and progress contracts are defined once and consumed consistently.
- **Quality stance:** awe is earned through narrative timing, material behavior, spatial composition, and resilience—not through visual noise or unbounded effects.
