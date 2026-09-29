// Camada única de acesso ao localStorage. Quando a API Spring Boot existir,
// só este módulo (e os services que o usam) precisa mudar.
const PREFIX = 'cuida:'

export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Armazenamento indisponível (modo privado, cota cheia): segue sem persistir.
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    // Idem setItem.
  }
}

export function getCollection(name) {
  const items = getItem(name, [])
  return Array.isArray(items) ? items : []
}

export function setCollection(name, items) {
  setItem(name, items)
}
