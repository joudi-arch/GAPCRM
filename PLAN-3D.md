# PLAN-3D.md — 3D brand-world enhancement (Spline-led)

**Status:** Plan — awaiting approval before any build.
**Decisions locked:** Spline-led engine · phased (showpieces first) · brand-literal models.
**Prime directive:** 3D **enhances, never blocks**. The current 2D scroll site stays the guaranteed base layer; every 3D scene mounts *behind* the existing content and degrades to a static poster on any failure, low power, mobile, or reduced-motion. The pitch must never stutter on a projector.

---

## 1. Engine & stack additions

| Purpose | Tool | Notes |
|---|---|---|
| Primary 3D | **Spline** + `@splinetool/react-spline` (+ `@splinetool/runtime`) | Self-host the `.splinecode` + textures in `public/3d/` so the static `dist/` works offline. |
| Scene control | Spline runtime API | `onLoad(app)` → `app.setVariable()`, `app.emitEvent()`, `findObjectByName` — drive ride-in / scan / explode from our Lenis scroll + section-enter. |
| Cinematic fallback / hard cases | **Pre-rendered scrubbed clip** (Blender/Spline export → `webm`) | For rigged character motion Spline is weak at (Zara walk cycle), and as the universal poster/loop fallback. |
| Escape hatch (optional) | React-Three-Fiber + drei | Only if a moment needs realtime control Spline can't give; not required for Phase 1. |
| Post FX | In-Spline (bloom, DoF, grain) | Keep effects in the Spline scene to avoid a separate post pipeline. |

No change to React/Vite/Tailwind/Framer/GSAP/Lenis — 3D layers on top.

---

## 2. Architecture — how a scene mounts

A new `SceneStage` wrapper sits inside each `Section`, **behind** the content (`z-0`), content stays `z-10`:

```
<Section> (existing world: mesh gradient stays as the base/fallback bg)
  <SceneStage poster={...} sceneUrl={...} world={...}>   // z-0, absolute inset-0
      ↳ mounts <Spline> ONLY when section is in view (IntersectionObserver)
      ↳ unmounts on exit → frees the WebGL context (browsers cap ~8–16)
      ↳ shows poster image until onLoad fires (no pop-in)
      ↳ depth-blur + darken overlay so headlines stay ≥4.5:1 legible
  <content z-10>  // unchanged kinetic type, numbers, etc.
</Section>
```

- **One live 3D scene at a time.** Only the in-view section renders its Spline canvas; neighbours are posters. This is the single most important perf rule for a Spline-heavy site.
- **Scroll/mouse wiring:** on section enter, call `app.emitEvent('mouseHover'/custom, 'Trigger')` to fire the ride-in / walk-in / explode; map Lenis per-section progress → a Spline variable for scrubbed motion. Mouse-look is native to the Spline scene.
- **Preloader:** a branded denim-weave progress screen on first load (Phase-1 hero scene preloads; rest lazy-load with a poster).

---

## 3. Per-scene concepts (brand-literal models)

⭐ = Phase 1 showpiece.

| Scene | Model (brand-literal) | 3D behaviour |
|---|---|---|
| **Gap hero** | Gap selvedge jeans / denim cloth | Slow rotate in volumetric spotlight, mouse-parallax, threads hint "FIT" |
| **Problem** | Red "GAP CASH" discount tags | Tags multiply → churn vortex → sucked into void |
| **Insight** | Dress · tee · sneaker · fuel-tank | Orbit, then converge ("one signal each") |
| **Zara** | Runway model / mannequin | **Walk cycle** — *pre-rendered webm* (Spline weak at rigged characters), B&W editorial, walks in on enter |
| **Uniqlo** | Folded LifeWear + HEATTECH | Turntable; thermal-glow shader; modular grid assembles |
| **Nike** ⭐ | **Air Max / Nike sneaker (swoosh)** | Rotate on scroll → **exploded view**, volt accents + bloom, mouse-orbit |
| **Harley** ⭐ | **Harley cruiser (bar & shield)** | **Rides in** from right on transition — headlight bloom, motion blur, exhaust particles, optional rev (muted) |
| **Big Idea** | Body silhouette + denim | Scan line sweeps; denim materialises to "fit" the body |
| **Rollout** | 3D timeline ribbon | Camera flies along 0–3 / 3–9 / 9–18 on scroll |
| **KPIs** | Extruded 3D numerals | Numbers rise/extrude as they count up |
| **CTA** | All five brand objects | Converge; camera pulls back — finale |

Gap Today / the three Gaps / Why-Now stay primarily 2D (shader-gradient upgrade only) to control budget.

---

## 4. Performance budget & safeguards (non-negotiable)

- **In-view-only rendering** + unmount on exit (WebGL context hygiene).
- **Self-hosted `.splinecode`**, Draco/meshopt where models are imported; target ≤ ~2–3 MB per scene, textures ≤ 1k–2k.
- **DPR cap** (≤1.5), Spline "performance" export setting, limit lights, bake where possible.
- **Low-FPS detector:** sample FPS for ~1s on first scene; if < ~40, switch the whole site to **poster mode** (no live 3D) for the session.
- **Fallback matrix → static poster (or looping webm):** `prefers-reduced-motion`, mobile/touch, low-FPS, WebGL unavailable, or scene load error.
- **Lazy + preload:** Suspense per scene; preload the *next* section's scene; preloader for the hero.
- **Budget cap:** max ~3–4 realtime Spline scenes total in Phase 1–2; everything else poster/webm.

---

## 5. Asset pipeline (brand-literal)

1. **Source models:** Sketchfab (CC/CC-BY branded models — Harley cruiser, Nike Air), Spline community, or CGTrader; import GLB into Spline.
2. **Compose in Spline:** lighting (HDRI studio), materials, camera, states/events (ride-in, explode, scan), post FX (bloom/DoF/grain), mouse-look.
3. **Export:** self-hosted `.splinecode` + assets → `gap-crm-pitch/public/3d/<scene>/`.
4. **Posters:** export a high-res still of each scene → `public/3d/posters/` (the fallback + pre-load image).
5. **Credit:** model authors + licenses in an in-site appendix / README, and the assignment's GenAI/asset appendix.

> **Brand-literal note:** real swoosh/bar-&-shield models lean on academic fair-use (same posture as the logos already in the deck). If any specific model's license is unclear, we substitute a brand-styled generic for that one scene and flag it.

---

## 6. Awe extras (fold in as phases allow)
Branded **preloader**; **world-to-world handoffs** (Harley rides out → Nike drops in); in-Spline **bloom/DoF/chromatic aberration**; **HDRI reflections** on products; **3D extruded headlines** for 2–3 key lines; optional **muted audio** (Harley rev / shutter) behind a sound toggle; upgrade the CSS mesh background to a **WebGL fluid shader** on non-3D scenes for cohesion.

---

## 7. Fallback & submission strategy
- Poster images + short **webm loops** double as the static-build and reduced-motion experience — `dist/` stays self-contained and impressive even with JS/3D off.
- **Screen recording becomes the primary backup deliverable** (scroll-through capture with 3D running on a strong machine) — even more important than before.
- Keep `/?lite` route → forces poster mode (safe presentation fallback you can switch to live if a venue machine is weak).

---

## 8. Phased implementation (each phase independently shippable)

- **Phase 1 — Prove the awe (showpieces):** `SceneStage` infra + in-view mounting + poster fallback + low-FPS guard + preloader. Build **Nike exploded sneaker** ⭐ and **Harley ride-in** ⭐. Ship.
- **Phase 2 — Expand the worlds:** Gap denim hero, Zara walk (pre-rendered webm), Big-Idea fit-profile scan. Add world-to-world handoffs.
- **Phase 3 — Complete + delight:** Uniqlo thermal, Insight orbit-converge, Rollout fly-through, KPIs extrude, CTA finale, audio toggle, WebGL background upgrade.

Stop after any phase and still have a coherent, better site.

---

## 9. File/component additions
```
public/3d/<scene>/scene.splinecode (+ assets)   // self-hosted scenes
public/3d/posters/<scene>.webp                   // fallbacks/preload
public/3d/clips/<scene>.webm                     // pre-rendered cinematics
src/site/three/
  SceneStage.jsx        // in-view mount/unmount, poster, overlay, scroll/mouse wiring
  useInViewport.js      // IntersectionObserver gate
  usePerfGuard.js       // FPS sample → poster-mode switch
  Preloader.jsx
  scenes.js             // per-section scene config (url, poster, events, variables)
```

---

## 10. Risks & open questions
- **Live perf on the venue laptop** is the dominant risk — mitigated by in-view-only + low-FPS poster mode + `/?lite`. Worth a dry run on the actual presentation machine.
- **Spline + rigged characters** (Zara walk): planned as pre-rendered webm, not live Spline.
- **Brand-literal model licensing**: per-model check; generic-styled substitute when unclear.
- **Total weight**: posters/webm add MBs to `dist/` — fine for Moodle/zip, but note if there's an upload cap.
- **Open:** do you want **audio** at all (even muted-by-default)? Any scene you specifically want to lead Phase 1 besides Nike + Harley?

---

## Gate 🚧
Approve this plan (or tell me what to change), and I'll start **Phase 1**: the `SceneStage` infrastructure + the **Nike exploded sneaker** and **Harley ride-in** showpieces, with the poster fallback wired so nothing can break the existing site.
