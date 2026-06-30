import { motion } from 'framer-motion'
import Section from '../Section'
import Kinetic from '../Kinetic'
import CountUp from '../CountUp'
import Magnetic from '../Magnetic'
import { worlds } from '../worlds'
import { scrollToId } from '../useSmoothScroll'
import { GapDenim } from '../three/scenes'

const gap = worlds.gap

// small reveal helper
function Up({ children, delay = 0, y = 18, className = '', amount = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const eyebrow = (text, color = gap.accent) => (
  <Up className="font-hanken mb-6 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.35em]" amount={0.5}>
    <span className="inline-block h-px w-12" style={{ background: color }} />
    <span style={{ color }}>{text}</span>
  </Up>
)

/* ----------------------------------------------------------------- HERO */
export function Hero({ onActive }) {
  return (
    <Section
      world={gap}
      id="hero"
      onActive={onActive}
      scene={<GapDenim />}
      watermark={<span className="font-extrabold">GAP</span>}
      watermarkClass="top-[8vh] right-[-4vw] text-[42vw]"
    >
      {eyebrow('The Pitch · Brand X')}
      <h1
        className="font-grotesk font-extrabold uppercase leading-[0.86] tracking-[-0.04em]"
        style={{ fontSize: 'clamp(2.8rem, 8.5vw, 9rem)' }}
      >
        <Kinetic text="Gap becomes" world={gap} />
        <Kinetic text="the brand that" world={gap} />
        <Kinetic text="knows your fit" world={gap} accentIdx={[2]} />
      </h1>
      <Up delay={0.5} className="font-hanken mt-8 max-w-xl text-lg leading-relaxed" >
        <span style={{ color: gap.sub }}>
          From discount-driven acquisition to a fit-led loyalty relationship that compounds customer
          lifetime value.
        </span>
      </Up>
      <Up delay={0.65} className="mt-10 flex flex-wrap items-center gap-8">
        <Magnetic strength={0.5}>
          <button
            onClick={() => scrollToId('gap-today')}
            className="font-hanken group flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold"
            style={{ background: gap.accent, color: '#05070D' }}
          >
            Enter the pitch
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </button>
        </Magnetic>
        <div className="flex items-baseline gap-3">
          <span className="font-grotesk text-5xl font-extrabold" style={{ color: gap.ink }}>
            <CountUp value={40} suffix="M" duration={1.8} />
          </span>
          <span className="font-hanken max-w-[12rem] text-sm leading-tight" style={{ color: gap.sub }}>
            members — one signal they're all missing
          </span>
        </div>
      </Up>
    </Section>
  )
}

/* ------------------------------------------------------------- GAP TODAY */
export function GapToday({ onActive }) {
  return (
    <Section world={gap} id="gap-today" onActive={onActive} watermark={<span className="font-extrabold">01</span>} watermarkClass="bottom-[-8vh] left-[-2vw] text-[40vw]">
      {eyebrow('Where Gap stands')}
      <h2 className="font-grotesk max-w-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.2rem, 5.6vw, 5rem)' }}>
        <Kinetic text="A heritage brand with the" world={gap} />
        <Kinetic text="infrastructure — not the intimacy" world={gap} accentIdx={[4]} />
      </h2>
      <div className="mt-14 flex flex-wrap items-end gap-x-20 gap-y-10">
        <Up>
          <div className="font-grotesk font-extrabold leading-none" style={{ fontSize: 'clamp(3.5rem,9vw,8rem)', color: gap.accent }}>
            <CountUp value={40} suffix="M" />
          </div>
          <div className="font-hanken mt-2 max-w-[15rem] text-sm" style={{ color: gap.sub }}>
            Good Rewards members across four brands, one membership
          </div>
        </Up>
        <Up delay={0.1}>
          <div className="font-grotesk font-extrabold leading-none" style={{ fontSize: 'clamp(3.5rem,9vw,8rem)', color: gap.ink }}>
            <CountUp value={4} prefix="+" suffix="%" />
          </div>
          <div className="font-hanken mt-2 max-w-[15rem] text-sm" style={{ color: gap.sub }}>
            comparable sales growth in FY2024 — a real recovery to build on
          </div>
        </Up>
        <Up delay={0.2} className="max-w-sm">
          <p className="font-hanken text-lg leading-relaxed" style={{ color: gap.sub }}>
            The foundation is here. What's missing is a relationship that runs deeper than the next
            promotion.
          </p>
        </Up>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- PROBLEM */
export function Problem({ onActive }) {
  return (
    <Section world={gap} id="problem" onActive={onActive} watermark={<span className="font-extrabold">↺</span>} watermarkClass="top-[10vh] left-[6vw] text-[36vw]">
      {eyebrow('The diagnosis', '#7FA8FF')}
      <h2 className="font-grotesk max-w-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6rem)' }}>
        <Kinetic text="Gap is buying loyalty" world={gap} />
        <Kinetic text="with discounts" world={gap} accentIdx={[2]} />
      </h2>
      <Up delay={0.4} className="mt-10 grid max-w-5xl gap-x-16 gap-y-6 md:grid-cols-2">
        <p className="font-hanken text-lg leading-relaxed" style={{ color: gap.sub }}>
          Gap Cash campaigns condition customers to buy <span style={{ color: gap.ink }}>only on
          discount</span>. The value exchange runs one way — price out, revenue in, no relationship
          built.
        </p>
        <p className="font-hanken text-lg leading-relaxed" style={{ color: gap.sub }}>
          It's a fragile, price-driven segment: retention depends on the next promotion, not genuine
          preference. The brand is stuck in the <span style={{ color: gap.ink }}>acquisition stage</span>.
        </p>
      </Up>
    </Section>
  )
}

/* ------------------------------------------------------------------ GAPS */
const GAPS = [
  { n: '01', t: 'Data used too late', fix: 'Let fit & purchase data shape the product itself — not just the next campaign.' },
  { n: '02', t: 'Personalisation too general', fix: 'Build real fit profiles; tailor every size, rec and offer to the individual.' },
  { n: '03', t: 'Weak emotional connection', fix: 'Use CRM to build community and lifestyle — belonging, not just buying.' },
]
export function Gaps({ onActive }) {
  return (
    <>
      {GAPS.map((g, i) => (
        <Section
          key={g.n}
          world={gap}
          id={`gap-${g.n}`}
          onActive={onActive}
          watermark={<span className="font-extrabold">{g.n}</span>}
          watermarkClass="top-1/2 right-[2vw] -translate-y-1/2 text-[48vw]"
        >
          {i === 0 && eyebrow('Three gaps to close')}
          <div className="font-hanken mb-4 text-sm uppercase tracking-[0.3em]" style={{ color: gap.accent }}>
            Gap {g.n} of 03
          </div>
          <h2 className="font-grotesk max-w-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)' }}>
            <Kinetic text={g.t} world={gap} accentIdx={[g.t.split(' ').length - 1]} />
          </h2>
          <Up delay={0.35} className="mt-8 flex max-w-3xl items-start gap-5">
            <span className="font-hanken mt-1 shrink-0 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: gap.accent }}>
              The fix
            </span>
            <p className="font-hanken text-2xl leading-snug" style={{ color: gap.ink }}>
              {g.fix}
            </p>
          </Up>
        </Section>
      ))}
    </>
  )
}

/* --------------------------------------------------------------- INSIGHT */
const SIGNALS = [
  ['Zara', 'demand data'],
  ['Uniqlo', 'feedback'],
  ['Nike', 'membership'],
  ['Harley', 'ownership'],
]
export function Insight({ onActive }) {
  return (
    <Section world={gap} id="insight" onActive={onActive} watermark={<span className="font-extrabold">→</span>} watermarkClass="bottom-[2vh] right-[4vw] text-[30vw]">
      {eyebrow('What the best brands share')}
      <h2 className="font-grotesk max-w-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.6rem)' }}>
        <Kinetic text="Every brand we studied turns" world={gap} />
        <Kinetic text="one signal into a relationship" world={gap} accentIdx={[1]} />
      </h2>
      <Up delay={0.4} className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
        {SIGNALS.map(([brand, sig]) => (
          <div key={brand} className="font-hanken">
            <div className="text-sm uppercase tracking-[0.2em]" style={{ color: gap.sub }}>{brand}</div>
            <div className="font-grotesk text-2xl font-bold" style={{ color: gap.ink }}>{sig}</div>
          </div>
        ))}
      </Up>
      <Up delay={0.6}>
        <p className="font-grotesk mt-12 text-3xl font-bold" style={{ color: gap.ink }}>
          Gap's untapped signal is{' '}
          <span style={{ backgroundImage: `linear-gradient(100deg, ${gap.grad[0]}, ${gap.grad[1]})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            fit.
          </span>
        </p>
      </Up>
    </Section>
  )
}

/* -------------------------------------------------------------- BIG IDEA */
const RECS = ['’969 Slim Taper · 98%', 'Soft Wear Slim · 94%', 'GapFlex Taper · 91%']
export function BigIdea({ onActive }) {
  return (
    <Section world={gap} id="big-idea" onActive={onActive} watermark={<span className="font-extrabold">FIT</span>} watermarkClass="bottom-[-6vh] left-[-2vw] text-[40vw]" flood>
      {eyebrow('The recommendation · the Encore framework')}
      <h2 className="font-grotesk max-w-5xl font-extrabold uppercase leading-[0.88] tracking-[-0.035em]" style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7rem)' }}>
        <Kinetic text="Make fit Gap's" world={gap} />
        <Kinetic text="whole identity" world={gap} accentIdx={[1]} />
      </h2>
      <Up delay={0.4} className="mt-8 max-w-2xl">
        <p className="font-hanken text-lg leading-relaxed" style={{ color: gap.sub }}>
          Build a denim fit profile <span style={{ color: gap.ink }}>once</span> — and every
          recommendation, drop and reward is built around it. Gap's biggest weakness, sizing, becomes
          the thing it's known for.
        </p>
      </Up>

      {/* animated fit → recommendations flow */}
      <Up delay={0.5} className="mt-12 flex flex-wrap items-center gap-5">
        <div className="font-hanken rounded-2xl px-6 py-4" style={{ background: gap.accent, color: '#05070D' }}>
          <div className="text-[0.65rem] uppercase tracking-[0.25em] opacity-70">Your fit profile</div>
          <div className="font-grotesk text-2xl font-extrabold">Straight · 32W · Slim Taper</div>
        </div>
        <span className="font-grotesk text-3xl" style={{ color: gap.accent }}>→</span>
        <div className="flex flex-wrap gap-3">
          {RECS.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 18, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-hanken overflow-hidden rounded-2xl"
              style={{ border: `1px solid ${gap.accent}55` }}
            >
              <div className="h-14 w-44" style={{ background: `linear-gradient(160deg, ${gap.blobs[1]}, ${gap.blobs[2]})` }} />
              <div className="px-4 py-3 text-sm font-semibold" style={{ color: gap.ink }}>{r}</div>
            </motion.div>
          ))}
        </div>
      </Up>
    </Section>
  )
}

/* --------------------------------------------------------------- ROLLOUT */
const PHASES = [
  ['0–3', 'Build the foundation', 'Invest in the data platform + upgraded app. Launch the fit profile.'],
  ['3–9', 'Personalise & cut returns', 'Roll out fit-based recommendations. Sizing returns fall.'],
  ['9–18', 'Build belonging', 'Evolve into membership: early access to drops in your fit. Reward with exclusivity, not discounts.'],
]
export function Rollout({ onActive }) {
  return (
    <Section world={gap} id="rollout" onActive={onActive} watermark={<span className="font-extrabold">18</span>} watermarkClass="top-[6vh] right-[2vw] text-[40vw]">
      {eyebrow('An 18-month rollout')}
      <h2 className="font-grotesk mb-12 max-w-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}>
        <Kinetic text="From a tool to a habit to a membership" world={gap} accentIdx={[5]} />
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {PHASES.map(([span, title, body], i) => (
          <Up key={span} delay={i * 0.12}>
            <div className="font-hanken h-full rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${gap.accent}33` }}>
              <div className="font-grotesk text-6xl font-extrabold" style={{ color: gap.accent }}>{span}</div>
              <div className="font-hanken mt-1 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: gap.sub }}>months</div>
              <h3 className="font-grotesk mt-5 text-2xl font-bold" style={{ color: gap.ink }}>{title}</h3>
              <p className="font-hanken mt-3 text-[0.98rem] leading-relaxed" style={{ color: gap.sub }}>{body}</p>
            </div>
          </Up>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ KPIS */
const KPIS = [
  { v: 40, suf: '%', l: 'of members build a fit profile · 12 mo' },
  { v: 20, suf: '%', l: 'lower denim returns from better fit · 1 yr', down: true },
  { v: 25, suf: '%', l: 'fit-recommendation conversion · 1 yr' },
  { v: 15, suf: '%', l: 'repeat purchase rate · 18 mo' },
  { v: 10, pre: '+', suf: '%', l: 'member vs non-member spend · 18 mo' },
]
export function KPIs({ onActive }) {
  return (
    <Section world={gap} id="kpis" onActive={onActive} watermark={<span className="font-extrabold">KPI</span>} watermarkClass="bottom-[-4vh] right-[-2vw] text-[34vw]">
      {eyebrow('How we measure the shift')}
      <h2 className="font-grotesk mb-12 max-w-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}>
        <Kinetic text="Five numbers — volume to value" world={gap} accentIdx={[4]} />
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-5">
        {KPIS.map((k, i) => (
          <Up key={k.l} delay={i * 0.08}>
            <div className="font-grotesk flex items-start font-extrabold leading-none" style={{ fontSize: 'clamp(2.6rem,5vw,4.5rem)', color: gap.accent }}>
              {k.down && <span className="mr-1 text-3xl" style={{ color: gap.ink }}>↓</span>}
              <CountUp value={k.v} prefix={k.pre} suffix={k.suf} />
            </div>
            <div className="font-hanken mt-3 text-sm leading-snug" style={{ color: gap.sub }}>{k.l}</div>
          </Up>
        ))}
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- WHY NOW */
export function WhyNow({ onActive }) {
  return (
    <Section world={gap} id="why-now" onActive={onActive} watermark={<span className="font-bodoni font-extrabold italic">Encore</span>} watermarkClass="top-[12vh] left-[-2vw] text-[28vw]">
      {eyebrow('Why now')}
      <h2 className="font-grotesk max-w-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.4rem, 6vw, 5.6rem)' }}>
        <Kinetic text="This isn't a new programme." world={gap} />
        <Kinetic text="It's the next chapter of Encore" world={gap} accentIdx={[5]} />
      </h2>
      <Up delay={0.4} className="mt-10 max-w-2xl">
        <p className="font-hanken text-lg leading-relaxed" style={{ color: gap.sub }}>
          In <span style={{ color: gap.ink }}>February 2026</span>, Gap Inc. launched Encore — a new,
          more rewarding loyalty experience. The platform already exists. Fit is the engine that makes
          it personal — turning a rewards programme into a relationship.
        </p>
      </Up>
    </Section>
  )
}

/* ------------------------------------------------------------------- CTA */
const TEAM = ['Olha Indilo', 'Iman Chatila', 'Joudi Erfan', 'Andreas Radicchi']
export function CTA({ onActive }) {
  const flood = { ...gap, base: gap.accent, blobs: ['#2F6BE0', '#1E3A8A', '#0A2A6B'], ink: '#FFFFFF', sub: 'rgba(255,255,255,0.78)' }
  return (
    <Section world={flood} id="cta" onActive={() => onActive('gap')} watermark={<span className="font-extrabold">FIT</span>} watermarkClass="bottom-[-8vh] right-[-4vw] text-[44vw]">
      <div className="font-hanken mb-6 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.8)' }}>
        <span className="inline-block h-px w-12 bg-white/70" /> The ask
      </div>
      <h2 className="font-grotesk max-w-6xl font-extrabold uppercase leading-[0.86] tracking-[-0.035em] text-white" style={{ fontSize: 'clamp(2.8rem, 8vw, 8.5rem)' }}>
        <Kinetic text="Make fit Gap's identity" world={flood} />
        <Kinetic text="not its weakness" world={flood} accentIdx={[2]} />
      </h2>
      <Up delay={0.4} className="mt-10 flex flex-wrap items-center gap-7">
        <Magnetic strength={0.5}>
          <button
            onClick={() => scrollToId('hero')}
            className="font-hanken rounded-full bg-white px-9 py-4 text-base font-semibold"
            style={{ color: gap.accent }}
          >
            The brand that knows your fit ↑
          </button>
        </Magnetic>
        <span className="font-hanken text-sm uppercase tracking-[0.2em] text-white/70">Questions &amp; discussion to follow</span>
      </Up>
      <Up delay={0.5} className="mt-16 border-t border-white/20 pt-6">
        <div className="font-hanken flex flex-wrap items-center justify-between gap-4 text-white/80">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-lg">
            {TEAM.map((n) => <span key={n}>{n}</span>)}
          </div>
          <span className="text-sm uppercase tracking-[0.2em]">CRM Strategy · 2026 · Les Roches</span>
        </div>
      </Up>
    </Section>
  )
}
