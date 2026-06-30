# The Brand That Knows Your Fit — Gap CRM Pitch

A maximalist, scroll-driven **brand-world website** that pitches our CRM strategy for **Gap (Brand X)**.
Scroll top-to-bottom and each section floods the screen with its own animated world — a Gap denim
hero, the problem, the three gaps, then four full-color benchmark takeovers (Zara · Uniqlo · Nike ·
Harley-Davidson), the big idea (the fit profile), the rollout, the KPIs, and the ask.

Built with **React + Vite + Tailwind + Framer Motion + GSAP/ScrollTrigger + Lenis** (smooth scroll).

---

## Run it locally

```bash
npm install
npm run dev          # → http://localhost:5173
```

## Build the static site (for submission)

```bash
npm run build        # → produces dist/
npm run preview      # preview the production build locally
```

`dist/` is fully static. The safest way to open it is via a tiny local server (so fonts and assets
resolve cleanly):

```bash
npx serve dist       # or:  python3 -m http.server --directory dist 8080
```

Double-clicking `dist/index.html` also works (the build uses relative paths), but a local server is
recommended for the live presentation.

---

## How to present

- **Just scroll.** The whole pitch is one vertical scroll. Each recommendation lands as its own
  full-screen moment (sections gently snap into place).
- **Buttery scroll** is on by default (Lenis). A thin **progress bar** (top) and a **world indicator**
  (bottom-left) show where you are; both recolor to the current brand.
- The hero's **"Enter the pitch ↓"** button jumps into the deck; the closing button returns to the top.
- **Fullscreen** for the room: press **F11** (Windows) or **⌃⌘F** (macOS Chrome/Safari) before you start.
- Move the mouse — a **cursor glow** and **magnetic buttons** make it feel alive. Numbers **count up**
  and headlines **wipe in** as each section enters.
- **Reduced motion:** if the presenter's OS has "reduce motion" on, all animation is automatically
  stilled (content still fully visible).

### Routes
- `/` — the canonical scroll presentation (the deliverable).
- `/?lite` — **forces 2D mode** (no live 3D). Use this if the presentation laptop is weak — it's the safe fallback that still looks great.
- `/?deck` — the legacy 16:9 editorial slide version (keyboard ←/→, retained as a compatibility path and loaded only on request).
- `/?print` — the stacked 16:9 print/PDF submission view, loaded only on request.
- `/?demo` — the Gap hero on its own (the art-direction sample).

### Presentation architecture

The scroll presentation is the primary runtime. Legacy deck and print surfaces are separate lazy route chunks, so their slide modules do not inflate the default route. React Three Fiber is the approved 3D engine; semantic HTML remains available over the progressive scene layer, with posters covering loading, lite, reduced-motion, errors, and WebGL context loss. See [`docs/architecture/presentation-runtime.md`](docs/architecture/presentation-runtime.md) for the locked runtime decisions.

## 3D brand worlds (Phase 1)

Four sections carry real-time 3D (React-Three-Fiber), each mounted **only while in view** and **only on capable machines**:
- **Gap hero** — flowing procedural denim (mouse-reactive).
- **Zara** — a backlit figure walking the runway.
- **Nike** — a sneaker on a volt-lit stage (drag to orbit it).
- **Harley** — a cinematic night ride-in (headlight + speed streaks + bloom).

**Safety built in — 3D never blocks the pitch:** on reduced-motion, mobile/touch, no-WebGL, or a weak first-second FPS sample, the site automatically falls back to the 2D brand worlds. You can also force that with `?lite`. The 3D code is lazy-loaded, so the initial page is light and fast.

**Sound** (bottom-right toggle): an optional ambient pad that retunes per world. **Off by default**; click to enable (browsers require a click to start audio).

> **Perf tip:** do a dry run on the actual presentation machine. If 3D ever stutters, present from `?lite`.

---

## Backup deliverable — screen recording

A scroll site doesn't export to PDF cleanly, so capture a **screen recording** as a backup to hand in
alongside the build:

- **macOS:** ⌘⇧5 → Record → scroll slowly from top to bottom (let each section's animation finish).
- **Windows:** Win+Alt+R (Xbox Game Bar) or OBS.
- Aim for ~60–90s, smooth, unhurried. Export MP4.

## Submission

1. `npm run build`
2. Zip the **`dist/`** folder → upload to Moodle (or email to jonathan.meehan@lesroches.edu if large).
3. Include the screen-recording MP4 as the backup.

---

## Notes

- **Content & figures** come from our group report and cited brand sources (Inditex FY2024,
  Fast Retailing FY2025, Nike, Harley-Davidson, Gap Inc.). No invented facts.
- **Brand palettes** are each company's real colors; per-company display fonts approximate each
  brand (Bodoni Moda → Zara, Anton → Nike, Archivo → Uniqlo, Oswald → Harley, Bricolage Grotesque →
  Gap). Logos are clean SVG representations for academic use.
- **Presenter credits** live in `src/site/sections/Benchmarks.jsx` (`presenter=` on each world). The
  Nike section is credited "Emma" per the report byline — change it there if needed.
- **3D model credits** (for the assignment's asset/AI appendix): sneaker — *MaterialsVariantsShoe*,
  Khronos glTF sample assets (royalty-free, Shopify); walking figure — three.js example `Soldier.glb`
  (Mixamo/Adobe, free use). Both recolored/relit in-engine. The Harley ride-in and Gap denim are
  procedural (no external model). Swap in a licensed Harley/Nike GLB anytime — drop the `.glb` in
  `public/3d/models/` and point a scene at it (`src/site/three/scenes/`).
- **Project map:** `src/site/` holds the site — `SiteScroll.jsx` (root), `Section.jsx` /
  `MeshGradient.jsx` (world wrapper + gradients), `Kinetic.jsx` / `CountUp.jsx` (motion type/numbers),
  `CursorGlow.jsx` / `Magnetic.jsx` (micro-interactions), `worlds.js` (per-brand palettes), and
  `sections/` (the narrative + the four benchmark worlds).
