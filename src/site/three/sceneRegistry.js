import { assetUrl } from './assetUrl'

export const sceneRegistry = Object.freeze({
  hero: Object.freeze({
    id: 'hero',
    poster: assetUrl('3d/posters/gap-denim.webp'),
    camera: { position: [0, 0, 6], fov: 40 },
    interactive: false,
  }),
  zara: Object.freeze({
    id: 'zara',
    poster: assetUrl('3d/posters/zara-runway.webp'),
    camera: { position: [0, 0, 6], fov: 40 },
    interactive: false,
  }),
  nike: Object.freeze({
    id: 'nike',
    poster: assetUrl('3d/posters/nike-shoe.webp'),
    camera: { position: [0, 0, 6], fov: 42 },
    interactive: true,
  }),
  harley: Object.freeze({
    id: 'harley',
    poster: assetUrl('3d/posters/harley-ride.webp'),
    camera: { position: [0, 0, 7], fov: 48 },
    interactive: false,
  }),
  'big-idea': Object.freeze({
    id: 'big-idea',
    poster: assetUrl('3d/posters/big-idea-scan.webp'),
    camera: { position: [0, 0, 6.5], fov: 38 },
    interactive: false,
  }),
})

export function getSceneConfig(id) {
  return sceneRegistry[id] || null
}
