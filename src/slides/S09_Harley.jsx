import BenchmarkSlide from '../components/BenchmarkSlide'
import { presenters } from '../deck.config'

export default function S09Harley({ theme, index, total }) {
  return (
    <BenchmarkSlide
      theme={theme}
      index={index}
      total={total}
      brandKey="harley"
      presenter={presenters.harley}
      eyebrow="08 · Benchmark — Harley-Davidson"
      signal={{ from: 'ownership', to: 'belonging' }}
      lede="Harley-Davidson treats its customer database as a social network, not a sales pipeline — turning a single purchase into lifelong membership in a subculture."
      strategies={[
        {
          title: 'The Harley Owners Group',
          body: 'A centralised CRM connected to local dealers converts one sale into a continuous community subscription.',
        },
        {
          title: 'Non-monetary value',
          body: 'Roadside assistance, navigation and curated experiences enhance ownership instead of discounting price.',
        },
        {
          title: 'Zero-party data',
          body: 'Riding preferences and histories power automated, personalised cross-sell of high-margin apparel and merchandise.',
        },
      ]}
      stats={[
        { value: 1, label: 'Subculture owned' },
        { value: 0, label: 'Reliance on discounting' },
        { value: 100, suffix: '%', label: 'Community-led loyalty' },
      ]}
      lesson="Community drives premium loyalty. Belonging lets a brand command a price premium and rely far less on promotional discounting."
    />
  )
}
