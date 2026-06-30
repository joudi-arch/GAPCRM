import BenchmarkSlide from '../components/BenchmarkSlide'
import { presenters } from '../deck.config'

export default function S06Zara({ theme, index, total }) {
  return (
    <BenchmarkSlide
      theme={theme}
      index={index}
      total={total}
      brandKey="zara"
      presenter={presenters.zara}
      eyebrow="05 · Benchmark — Zara (Inditex)"
      signal={{ from: 'demand data', to: 'product' }}
      lede="Zara treats everyday customer behaviour as live CRM data — feeding it straight into what gets made, kept and cut. Responsiveness is the relationship."
      strategies={[
        {
          title: 'Data-driven merchandising',
          body: 'RFID-tracked inventory and daily store + online feedback decide what stays and what goes, with fresh stock twice a week.',
        },
        {
          title: 'Omnichannel integration',
          body: 'App availability, reserve, digital try-on and real-time in-store location erase friction across channels.',
        },
        {
          title: 'Retention through newness',
          body: 'Small batches and constant drops drive frequent visits — but every customer is treated the same.',
        },
      ]}
      stats={[
        { value: 2040, label: 'Stores worldwide' },
        { value: 10.2, decimals: 1, prefix: '€', suffix: 'B', label: 'Online sales · +12% FY24' },
        { value: 218, suffix: 'M', label: 'App active users' },
      ]}
      lesson="Use customer data earlier — let what people buy, return and ignore actually shape the product, not just the next campaign."
    />
  )
}
