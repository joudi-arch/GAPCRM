import BrandWorld from './BrandWorld'
import { worlds } from '../worlds'
import { NikeShoe, ZaraWalk, HarleyRide } from '../three/scenes'

export function ZaraWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.zara}
      onActive={onActive}
      idx={5}
      presenter="Joudi Erfan"
      signalLead="Zara turns"
      signalBig="demand data into product"
      accentIdx={[3]}
      lede="Zara treats everyday behaviour as live CRM data — feeding it straight into what gets made, kept and cut, with fresh stock twice a week."
      proof={{ value: 10.2, prefix: '€', suffix: 'B', decimals: 1, label: 'online sales in FY24 — a +12% jump, all demand-led' }}
      proof2={{ value: 218, suffix: 'M', label: 'app users turning behaviour into merchandising' }}
      lesson="Use customer data earlier — let what people buy, return and ignore shape the product itself, not just the next campaign."
      logoColor={worlds.zara.ink}
      scene={<ZaraWalk />}
    />
  )
}

export function UniqloWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.uniqlo}
      onActive={onActive}
      idx={6}
      presenter="Olha Indilo"
      signalLead="Uniqlo turns"
      signalBig="feedback into LifeWear"
      accentIdx={[2]}
      lede="Uniqlo closes the loop between customer feedback and product. Loyalty is earned through the product experience itself — not points."
      proof={{ value: 8.1, prefix: '+', suffix: '%', decimals: 1, label: 'same-store sales, FY25 — straight out of the Ariake feedback loop' }}
      proof2={{ value: 39.21, suffix: 'M', decimals: 2, label: 'customer interactions analysed every year' }}
      lesson="Close the loop: turn feedback into product, so the relationship compounds instead of resetting each season."
      logoColor="#FFFFFF"
    />
  )
}

export function NikeWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.nike}
      onActive={onActive}
      idx={7}
      presenter="Emma"
      signalLead="Nike turns"
      signalBig="membership into a lifestyle"
      accentIdx={[3]}
      lede="Membership, customisation and fitness apps make Nike part of the customer's daily identity — interaction that runs far beyond the transaction."
      proof={{ value: 200, suffix: '+', label: 'free guided workouts that keep members engaged between purchases' }}
      proof2={{ value: 3, label: 'owned DTC channels — apps, web and retail, one relationship' }}
      lesson="Anchor a lifestyle, not a promotional calendar. Give customers a reason to engage between purchases."
      logoColor={worlds.nike.accent}
      scene={<NikeShoe />}
      sceneCamera={{ position: [0, 0, 6], fov: 42 }}
    />
  )
}

export function HarleyWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.harley}
      onActive={onActive}
      idx={8}
      presenter="Andreas Radicchi"
      signalLead="Harley-Davidson turns"
      signalBig="ownership into belonging"
      accentIdx={[2]}
      lede="Harley treats its database as a social network, not a sales pipeline. One purchase becomes lifelong membership in a subculture."
      proof={{ value: 0, label: 'discounts needed — community carries the loyalty and the price premium' }}
      proof2={{ value: 100, suffix: '%', label: 'community-led: the H.O.G. ecosystem drives renewals' }}
      lesson="Community drives premium loyalty. Belonging lets a brand command a premium and lean far less on discounting."
      logoColor={worlds.harley.ink}
      scene={<HarleyRide />}
      sceneCamera={{ position: [0, 0, 7], fov: 48 }}
    />
  )
}
