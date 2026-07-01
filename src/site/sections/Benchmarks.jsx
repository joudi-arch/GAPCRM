import BrandWorld from './BrandWorld'
import { worlds } from '../worlds'
import { ZaraWalk, HarleyRide, NIKE_SPLINE_SCENE } from '../three/scenes'
import { pitchSections, presenters } from '../../content/pitch'

const benchmarkById = Object.fromEntries(
  pitchSections.filter(({ world }) => world !== 'gap').map((section) => [section.id, section]),
)

export function ZaraWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.zara}
      onActive={onActive}
      idx={5}
      presenter={presenters.zara}
      signalLead="Zara turns"
      signalBig="demand data into product"
      accentIdx={[3]}
      lede="Zara treats everyday behaviour as live CRM data — feeding it straight into what gets made, kept and cut, with fresh stock twice a week."
      proof={benchmarkById.zara.proof}
      proof2={benchmarkById.zara.proof2}
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
      presenter={presenters.uniqlo}
      signalLead="Uniqlo turns"
      signalBig="feedback into LifeWear"
      accentIdx={[2]}
      lede="Uniqlo closes the loop between customer feedback and product. Loyalty is earned through the product experience itself — not points."
      proof={benchmarkById.uniqlo.proof}
      proof2={benchmarkById.uniqlo.proof2}
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
      presenter={presenters.nike}
      signalLead="Nike turns"
      signalBig="membership into a lifestyle"
      accentIdx={[3]}
      lede="Membership, customisation and fitness apps make Nike part of the customer's daily identity — interaction that runs far beyond the transaction."
      proof={benchmarkById.nike.proof}
      proof2={benchmarkById.nike.proof2}
      lesson="Anchor a lifestyle, not a promotional calendar. Give customers a reason to engage between purchases."
      logoColor={worlds.nike.accent}
      splineScene={NIKE_SPLINE_SCENE}
    />
  )
}

export function HarleyWorld({ onActive }) {
  return (
    <BrandWorld
      world={worlds.harley}
      onActive={onActive}
      idx={8}
      presenter={presenters.harley}
      signalLead="Harley-Davidson turns"
      signalBig="ownership into belonging"
      accentIdx={[2]}
      lede="Harley treats its database as a social network, not a sales pipeline. One purchase becomes lifelong membership in a subculture."
      proof={benchmarkById.harley.proof}
      proof2={benchmarkById.harley.proof2}
      lesson="Community drives premium loyalty. Belonging lets a brand command a premium and lean far less on discounting."
      logoColor={worlds.harley.ink}
      scene={(progress) => <HarleyRide progress={progress} />}
      sceneCamera={{ position: [0, 0, 7], fov: 48 }}
    />
  )
}
