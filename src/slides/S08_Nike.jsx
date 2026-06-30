import BenchmarkSlide from '../components/BenchmarkSlide'
import { presenters } from '../deck.config'

export default function S08Nike({ theme, index, total }) {
  return (
    <BenchmarkSlide
      theme={theme}
      index={index}
      total={total}
      brandKey="nike"
      presenter={presenters.nike}
      eyebrow="07 · Benchmark — Nike"
      dark
      signal={{ from: 'membership', to: 'a lifestyle' }}
      lede="Nike turns a retail brand into a lifestyle network. Membership, customisation and fitness apps make the brand part of the customer's daily identity."
      strategies={[
        {
          title: 'Membership ecosystem',
          body: 'Exclusive access, personalised recommendations, Nike By You customisation and SNKRS member-only drops.',
        },
        {
          title: 'Lifestyle network',
          body: 'Run Club and Training Club — 200+ free guided workouts — create regular interaction far beyond the transaction.',
        },
        {
          title: 'Direct-to-consumer',
          body: 'Owning apps, web and retail gives Nike first-party insight and a tighter, more personal connection.',
        },
      ]}
      stats={[
        { value: 200, suffix: '+', label: 'Free guided workouts' },
        { value: 3, label: 'DTC channels unified' },
        { value: 1, label: 'Lifestyle identity owned' },
      ]}
      lesson="Anchor a lifestyle, not a promotional calendar. Give customers a reason to engage between purchases — content, community, identity."
    />
  )
}
