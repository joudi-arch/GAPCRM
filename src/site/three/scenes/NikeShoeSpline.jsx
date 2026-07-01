import SplineStage from '../SplineStage'

export const NIKE_SPLINE_SCENE = 'https://prod.spline.design/ykVFV6NkmVBa7GqG/scene.splinecode'

export default function NikeShoeSpline() {
  return (
    <SplineStage
      scene={NIKE_SPLINE_SCENE}
      style={{ transform: 'translateX(20%) scale(0.85)', transformOrigin: 'center center' }}
    />
  )
}
