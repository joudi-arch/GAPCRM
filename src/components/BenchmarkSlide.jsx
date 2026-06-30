import { motion } from 'framer-motion'
import SlideFrame from './SlideFrame'
import Reveal from './Reveal'
import BrandLogo from './BrandLogo'
import AnimatedNumber from './AnimatedNumber'
import { riseItem, fadeUp } from './motion'

// Shared benchmark template — one grid, themed per brand.
// `dark` renders an ink-panel takeover (used for Nike).
export default function BenchmarkSlide({
  theme,
  index,
  total,
  brandKey,
  presenter,
  eyebrow,
  signal, // { from, to }
  lede,
  strategies, // [{ title, body }]
  stats, // [{ value, prefix, suffix, decimals, label }]
  lesson,
  dark = false,
  accentText, // optional override for headline accent (e.g. volt)
}) {
  const bg = dark ? theme.accent : theme.paper
  const ink = dark ? '#F4F4F0' : theme.ink
  const rule = dark ? 'rgba(255,255,255,0.18)' : theme.rule
  const head = accentText || (dark ? theme.volt || theme.accent : theme.accent)

  return (
    <SlideFrame
      theme={theme}
      index={index}
      total={total}
      eyebrow={eyebrow}
      owner={presenter}
      label={theme.name}
      bg={bg}
      ink={ink}
    >
      {/* brand accent bar that draws in */}
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7 } } }}
        className="absolute left-0 top-0 h-1.5 w-full origin-left"
        style={{ background: head }}
      />

      <div className="grid h-full grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="col-span-5 flex flex-col">
          <motion.div variants={fadeUp} className="mb-7">
            <BrandLogo brand={brandKey} color={dark ? '#FFFFFF' : theme.accent} height={46} />
          </motion.div>

          <Reveal variants={riseItem}>
            <span className="label" style={{ color: head }}>
              Benchmark · {theme.vibe.split('·')[0].trim()}
            </span>
          </Reveal>

          <h2 className="mt-4 font-display text-h2 leading-tight">
            <Reveal variants={riseItem}>Turns {signal.from}</Reveal>
            <Reveal variants={riseItem}>
              into <span style={{ color: head }}>{signal.to}.</span>
            </Reveal>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[1.02rem] leading-relaxed"
            style={{ color: dark ? 'rgba(244,244,240,0.72)' : theme.muted }}
          >
            {lede}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-auto rounded-sm p-5"
            style={{
              background: dark ? 'rgba(255,255,255,0.06)' : theme.accent,
              color: dark ? ink : theme.onAccent,
              border: dark ? `1px solid ${rule}` : 'none',
            }}
          >
            <div className="label mb-1" style={{ color: dark ? head : 'rgba(255,255,255,0.75)' }}>
              The lesson for Gap
            </div>
            <p className="text-[1.05rem] leading-snug">{lesson}</p>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="col-span-7 flex flex-col">
          <div className="space-y-5">
            {strategies.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-5 border-t pt-4"
                style={{ borderColor: rule }}
              >
                <span className="font-mono text-sm" style={{ color: head }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p
                    className="mt-1 text-[0.98rem] leading-relaxed"
                    style={{ color: dark ? 'rgba(244,244,240,0.66)' : theme.muted }}
                  >
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* stat row */}
          <div className="mt-auto grid grid-cols-3 gap-6 border-t pt-5" style={{ borderColor: rule }}>
            {stats.map((st) => (
              <motion.div key={st.label} variants={fadeUp}>
                <div className="font-display text-4xl" style={{ color: head }}>
                  <AnimatedNumber
                    value={st.value}
                    prefix={st.prefix || ''}
                    suffix={st.suffix || ''}
                    decimals={st.decimals || 0}
                  />
                </div>
                <div
                  className="label mt-2"
                  style={{ color: dark ? 'rgba(244,244,240,0.6)' : theme.muted }}
                >
                  {st.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}
