export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function sanitizeUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `https://${url}`
}

export function sanitizeUsername(handle: string) {
  return handle.replace(/^@/, '')
}
