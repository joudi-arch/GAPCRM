import { motion } from 'framer-motion'
import { stagger, riseItem, fadeUp, drawX } from '../components/motion'
import Reveal from '../components/Reveal'
import BrandLogo from '../components/BrandLogo'
import { bigIdeaContent, finalAsk } from '../content/pitch'

const [fitThesisLead, fitThesisClose] = bigIdeaContent.thesis.split('—')

export default function S14CTA({ theme }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: theme.accent, color: theme.onAccent, '--accent': theme.accent }}
    >
      <motion.div
        variants={stagger(0.12, 0.08)}
        initial="hidden"
        animate="show"
        className="absolute inset-0 flex flex-col px-16 py-12"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <span className="label opacity-70">The Ask</span>
          <BrandLogo brand="gap" color="#FFFFFF" height={36} />
        </motion.div>

        <div className="flex flex-1 flex-col justify-center">
          <Reveal variants={riseItem}>
            <span className="label mb-6 inline-block opacity-75">Our recommendation to Gap</span>
          </Reveal>
          <h1 className="font-display text-hero">
            <Reveal variants={riseItem}>{fitThesisLead}—</Reveal>
            <Reveal variants={riseItem}>
              <span className="font-serif-text italic">{fitThesisClose}</span>
            </Reveal>
          </h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-body opacity-85">
            {finalAsk}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-white px-7 py-3 font-display text-lg text-gap-navy">
              Let's build the brand that knows your fit.
            </span>
            <span className="label opacity-70">Make fit Gap’s identity—not its weakness.</span>
          </motion.div>
        </div>

        <motion.div variants={drawX} className="h-px origin-left bg-white/25" />
        <motion.div variants={fadeUp} className="mt-5 flex items-center justify-between">
          <span className="label opacity-65">Customer Relationship Management · 2026.1</span>
          <span className="label opacity-65">Thank you</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
