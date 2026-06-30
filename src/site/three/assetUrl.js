export function assetUrl(path, base = import.meta.env.BASE_URL) {
  const cleanPath = String(path).replace(/^\/+/, '')
  const cleanBase = String(base || './').endsWith('/') ? String(base || './') : `${base}/`
  return `${cleanBase}${cleanPath}`
}
