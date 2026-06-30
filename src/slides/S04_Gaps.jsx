import { motion } from 'framer-motion'
import SlideFrame from '../components/SlideFrame'
import Reveal from '../components/Reveal'
import { riseItem, fadeUp } from '../components/motion'

const gaps = [
  {
    n: '01',
    title: 'Data used too late',
    body: 'Customer data drives campaigns, not products. Behaviour never reaches the design and stocking decisions.',
    fix: 'Use fit & purchase data earlier — to shape what Gap makes and discontinues.',
  },
  {
    n: '02',
    title: 'Personalisation too general',
    body: 'Email, sales and loyalty offers treat the heritage shopper, the family, and the deal-seeker as one audience.',
    fix: 'Build real customer profiles; tailor sizes, recommendations and offers to the individual.',
  },
  {
    n: '03',
    title: 'Weak emotional connection',
    body: 'Recognition is not loyalty. Customers know Gap, but feel no reason to return beyond a discount.',
    fix: 'Use CRM to build community and lifestyle — belonging, not just buying.',
  },
]

export default function S04Gaps({ theme, index, total }) {
  return (
    <SlideFrame theme={theme} index={index} total={total} eyebrow="03 · Gap Analysis" label="Three Gaps">
      <Reveal variants={riseItem}>
        <span className="label" style={{ color: theme.accent }}>
          Three gaps define the position
        </span>
      </Reveal>
      <h2 className="mt-3 max-w-4xl font-display text-h1">
        <Reveal variants={riseItem}>The parts exist. They just don't</Reveal>
        <Reveal variants={riseItem}>connect into one relationship.</Reveal>
      </h2>

      <div className="mt-12 grid flex-1 grid-cols-3 gap-8">
        {gaps.map((g) => (
          <motion.div
            key={g.n}
            variants={fadeUp}
            className="group flex flex-col border-t-2 pt-5 transition-colors duration-300"
            style={{ borderColor: theme.accent }}
          >
            <span className="font-display text-6xl" style={{ color: theme.accent }}>
              {g.n}
            </span>
            <h3 className="mt-4 font-display text-2xl">{g.title}</h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{g.body}</p>
            <div
              className="mt-auto rounded-sm p-4"
              style={{ background: theme.accent, color: theme.onAccent }}
            >
              <div className="label mb-1 opacity-75">Recommendation</div>
              <p className="text-[0.98rem] leading-snug">{g.fix}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideFrame>
  )
}
