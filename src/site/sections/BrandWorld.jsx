import { motion } from 'framer-motion'
import Section from '../Section'
import Kinetic from '../Kinetic'
import CountUp from '../CountUp'
import Magnetic from '../Magnetic'
import BrandLogo from '../../components/BrandLogo'

const EASE = [0.16, 1, 0.3, 1]

// A full-screen benchmark "brand world". One big logo, one headline (the signal),
// one supporting line, one animated proof number, and the lesson for Gap.
export default function BrandWorld({
  world,
  onActive,
  idx,
  presenter,
  signalLead, // small line, e.g. "Zara turns"
  signalBig, // huge headline, e.g. "demand data into product"
  accentIdx = [],
  lede,
  proof, // { value, prefix, suffix, decimals, label }
  proof2, // optional second stat
  lesson,
  logoColor,
  scene = null,
  sceneCamera,
}) {
  const reversed = world.key === 'uniqlo'

  return (
    <Section
      world={world}
      id={world.name.split('-')[0].toLowerCase()}
      onActive={onActive}
      flood
      scene={scene}
      sceneCamera={sceneCamera}
      watermark={<span className="font-extrabold uppercase">{world.name.split('-')[0]}</span>}
      watermarkClass="bottom-[-6vh] right-[-2vw] text-[34vw]"
    >
      {world.key === 'zara' && <div aria-hidden className="absolute bottom-0 right-[23%] top-0 w-px bg-white/15" />}
      {world.key === 'uniqlo' && (
        <div aria-hidden className="absolute left-[4vw] top-[14vh] grid grid-cols-2 gap-2 opacity-20">
          {[0, 1, 2, 3].map((cell) => <span key={cell} className="h-[11vw] max-h-32 w-[11vw] max-w-32 border-2 border-white" />)}
        </div>
      )}
      {world.key === 'nike' && <div aria-hidden className="absolute -right-[8vw] top-[18vh] h-5 w-[58vw] -rotate-12 bg-[#CEFF00] opacity-80" />}
      {world.key === 'harley' && <div aria-hidden className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-[#F47216]/70 to-transparent" />}

      <div className="relative grid grid-cols-12 items-center gap-8">
        {/* left: the argument */}
        <div className={`col-span-12 lg:col-span-7 ${reversed ? 'lg:col-start-6 lg:row-start-1' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="font-hanken mb-5 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.32em]"
            style={{ color: world.accent }}
          >
            <span>Benchmark · {String(idx).padStart(2, '0')}</span>
            <span className="h-px w-10" style={{ background: world.accent }} />
            <span style={{ color: world.sub }}>Read by {presenter}</span>
          </motion.div>

          <div
            className={`${world.font} font-semibold uppercase leading-[0.92]`}
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            <span
              className="font-hanken mb-2 block text-base font-medium normal-case tracking-normal"
              style={{ color: world.sub }}
            >
              {signalLead}
            </span>
            <Kinetic text={signalBig} world={world} accentIdx={accentIdx} className="tracking-[-0.02em]" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-hanken mt-7 max-w-xl text-lg leading-relaxed"
            style={{ color: world.sub }}
          >
            {lede}
          </motion.p>

          {/* lesson for Gap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex max-w-xl items-start gap-4 border-y py-4"
            style={{ borderColor: `${world.accent}66` }}
          >
            <span className="font-hanken text-[0.68rem] uppercase tracking-[0.25em]" style={{ color: world.accent }}>
              For&nbsp;Gap
            </span>
            <span className="font-hanken text-[0.98rem] leading-snug" style={{ color: world.ink }}>
              {lesson}
            </span>
          </motion.div>
        </div>

        {/* right: logo + proof */}
        <div className={`col-span-12 flex flex-col items-start gap-10 lg:col-span-5 ${reversed ? 'lg:col-start-1 lg:row-start-1 lg:items-start' : 'lg:items-end'}`}>
          <Magnetic strength={0.25}>
            <div className="opacity-95">
              <BrandLogo brand={world.logo} color={logoColor || world.ink} height={70} />
            </div>
          </Magnetic>

          <div className="lg:text-right">
            <div className={`${world.font} font-bold leading-none`} style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', color: world.accent }}>
              <CountUp value={proof.value} prefix={proof.prefix} suffix={proof.suffix} decimals={proof.decimals} />
            </div>
            <div className="font-hanken mt-2 max-w-[16rem] text-sm leading-snug lg:ml-auto" style={{ color: world.sub }}>
              {proof.label}
            </div>
          </div>

          {proof2 && (
            <div className="lg:text-right">
              <div className="font-grotesk text-4xl font-extrabold" style={{ color: world.ink }}>
                <CountUp value={proof2.value} prefix={proof2.prefix} suffix={proof2.suffix} decimals={proof2.decimals} />
              </div>
              <div className="font-hanken mt-1 max-w-[16rem] text-sm leading-snug lg:ml-auto" style={{ color: world.sub }}>
                {proof2.label}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
