import { getItem, removeItem, setItem } from '@/lib/storage/storage'

const MAX_STORED_MESSAGES = 30
const key = (userId) => `support-chat:${userId}`

/** Conversa do usuário com o assistente virtual do suporte. */
export function loadSupportMessages(userId) {
  const saved = getItem(key(userId))
  return Array.isArray(saved) ? saved : []
}

export function saveSupportMessages(userId, messages) {
  setItem(key(userId), messages.slice(-MAX_STORED_MESSAGES))
}

export function clearSupportMessages(userId) {
  removeItem(key(userId))
}
