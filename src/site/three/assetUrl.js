export function assetUrl(path, base = import.meta.env.BASE_URL) {
  const cleanPath = String(path).replace(/^\/+/, '')
  const requestedBase = base === '/' ? './' : String(base || './')
  const cleanBase = requestedBase.endsWith('/') ? requestedBase : `${requestedBase}/`
  return `${cleanBase}${cleanPath}`
}
