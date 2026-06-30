import BenchmarkSlide from '../components/BenchmarkSlide'
import { presenters } from '../deck.config'

export default function S07Uniqlo({ theme, index, total }) {
  return (
    <BenchmarkSlide
      theme={theme}
      index={index}
      total={total}
      brandKey="uniqlo"
      presenter={presenters.uniqlo}
      eyebrow="06 · Benchmark — Uniqlo (Fast Retailing)"
      signal={{ from: 'feedback', to: 'LifeWear' }}
      lede="Uniqlo closes the loop between customer feedback and product. Loyalty is earned through the product experience itself, not points."
      strategies={[
        {
          title: 'The membership app',
          body: 'Functional value over points — exclusive pricing, early access and digital checks tied to purchase history.',
        },
        {
          title: 'The Ariake Project',
          body: 'Real-time sales, inventory and feedback across 27 markets; 39.21M interactions analysed yearly become products like HEATTECH.',
        },
        {
          title: 'Omnichannel model',
          body: 'Unified stores + digital let customers check stock, scan and pay seamlessly — effort reduction as a retention engine.',
        },
      ]}
      stats={[
        { value: 8.1, decimals: 1, prefix: '+', suffix: '%', label: 'Same-store sales · FY25' },
        { value: 2519, label: 'Stores · 27 markets' },
        { value: 39.21, decimals: 2, suffix: 'M', label: 'Interactions analysed / yr' },
      ]}
      lesson="Close the loop: turn customer feedback into product decisions, so the relationship compounds at scale instead of resetting each season."
    />
  )
}
