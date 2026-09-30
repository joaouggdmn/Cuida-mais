export function getFirstName(fullName) {
  return fullName.trim().split(/\s+/)[0] ?? ''
}

/** Iniciais do primeiro e do último nome: "João Pedro Silva" → "JS". */
export function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0][0]
  const last = parts.length > 1 ? parts.at(-1)[0] : ''
  return `${first}${last}`.toUpperCase()
}
