import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { riseItem, fadeUp } from '../components/motion'

function Stat({ children, label, theme, delay }) {
  return (
    <motion.div variants={fadeUp} className="border-t pt-4" style={{ borderColor: theme.rule }}>
      <div className="font-display text-5xl" style={{ color: theme.accent }}>
        {children}
      </div>
      <div className="label mt-2 opacity-65">{label}</div>
    </motion.div>
  )
}

export default function S02GapToday({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="01 · Where Gap Stands" label="Gap Today">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          The brand today
        </span>
      </Reveal>
      <h2 className="mt-3 max-w-4xl font-display text-h1">
        <Reveal variants={riseItem}>A heritage brand with the</Reveal>
        <Reveal variants={riseItem}>infrastructure — but not the intimacy.</Reveal>
      </h2>

      <div className="mt-10 grid flex-1 grid-cols-12 gap-12">
        <motion.div variants={fadeUp} className="col-span-5 flex flex-col justify-start">
          <p className="text-body text-muted">
            Gap reaches customers across stores, web, app, email and its loyalty programme. Its CRM
            engine, <span className="text-ink">Gap Good Rewards</span>, unifies four brands under one
            membership and collects rich purchase data.
          </p>
          <p className="mt-4 text-body text-muted">
            FY2024 returned <span className="text-ink">+4% comparable sales</span> — a real recovery.
            The foundation is here. What's missing is a relationship that runs deeper than the next
            promotion.
          </p>
          <div className="mt-6 border-l-2 pl-4" style={{ borderColor: theme.accent }}>
            <p className="font-serif-text text-lg italic">
              "Gap already has the infrastructure, the customer base, and the brand heritage."
            </p>
          </div>
        </motion.div>

        <div className="col-span-7 grid grid-cols-2 content-start gap-x-10 gap-y-8">
          <Stat theme={theme} label="Good Rewards members">
            <AnimatedNumber value={40} suffix="M" />
          </Stat>
          <Stat theme={theme} label="Comparable sales growth · FY2024">
            <AnimatedNumber value={4} prefix="+" suffix="%" />
          </Stat>
          <Stat theme={theme} label="Brands in one membership">
            <AnimatedNumber value={4} />
          </Stat>
          <Stat theme={theme} label="Core segments served">
            <AnimatedNumber value={3} />
          </Stat>
          <motion.div
            variants={fadeUp}
            className="col-span-2 mt-2 rounded-sm border p-5"
            style={{ borderColor: theme.rule, background: theme.accent, color: theme.onAccent }}
          >
            <div className="label opacity-80">Mission in practice</div>
            <p className="mt-2 font-display text-2xl leading-snug">
              Quality, accessible American style — for the heritage adult, the family shopper, and
              the deal-seeker alike.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  )
}
