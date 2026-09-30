import { getItem, setItem } from '@/lib/storage/storage'
import { buildInitialConversations } from '../mockConversations'

const key = (userId) => `chats:${userId}`

/** Conversas do usuário; na primeira vez, começa com as conversas de exemplo. */
export function loadConversations(userId) {
  const saved = getItem(key(userId))
  return Array.isArray(saved) ? saved : buildInitialConversations()
}

export function saveConversations(userId, conversations) {
  setItem(key(userId), conversations)
}
