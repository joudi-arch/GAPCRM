import { slides as slideDefs } from '../deck.config'
import { getTheme } from '../themes/themes'
import { renderLegacySlide, totalSlides } from './LegacyDeckRoute'

export default function PrintRoute() {
  return (
    <div className="print-stack bg-white">
      <div className="no-print sticky top-0 z-50 flex items-center justify-between bg-ink px-6 py-3 text-paper">
        <span className="label">Print / PDF view · {totalSlides} slides</span>
        <span className="label opacity-70">
          Wait ~2s for charts to settle, then File → Print → Save as PDF (Landscape · margins None) · press P to return
        </span>
      </div>
      {slideDefs.map((def, i) => (
        <div key={def.id} className="print-slide mx-auto my-6 shadow-xl" style={{ width: 1280, height: 720 }}>
          {renderLegacySlide(def, i, getTheme(def.theme))}
        </div>
      ))}
    </div>
  )
}
