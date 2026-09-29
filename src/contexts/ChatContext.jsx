import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { CAREGIVER_AUTO_REPLIES } from '@/features/chat/mockConversations'
import { loadConversations, saveConversations } from '@/features/chat/services/chatStorage'

export const ChatContext = createContext(null)

const REPLY_DELAY_MS = 800

const lastSentAt = (conversation) => conversation.messages.at(-1)?.sentAt ?? ''

function newMessage(from, text) {
  return { id: window.crypto.randomUUID(), from, text, sentAt: new Date().toISOString() }
}

export function ChatProvider({ children }) {
  const { user } = useAuth()
  const [conversations, setConversations] = useState(() => loadConversations(user.id))
  const replyTimers = useRef([])

  useEffect(() => {
    saveConversations(user.id, conversations)
  }, [user.id, conversations])

  useEffect(() => () => replyTimers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const appendMessage = useCallback((caregiverId, message, countAsUnread) => {
    setConversations((current) => {
      const existing = current.find((conversation) => conversation.caregiverId === caregiverId)
      const updated = {
        caregiverId,
        unread: (existing?.unread ?? 0) + (countAsUnread ? 1 : 0),
        messages: [...(existing?.messages ?? []), message],
      }
      return [updated, ...current.filter((conversation) => conversation.caregiverId !== caregiverId)]
    })
  }, [])

  const sendMessage = useCallback(
    (caregiverId, text) => {
      appendMessage(caregiverId, newMessage('me', text), false)
      // Resposta automática enquanto não há chat de verdade.
      const reply = CAREGIVER_AUTO_REPLIES[Math.floor(Math.random() * CAREGIVER_AUTO_REPLIES.length)]
      const timer = window.setTimeout(() => appendMessage(caregiverId, newMessage('caregiver', reply), true), REPLY_DELAY_MS)
      replyTimers.current.push(timer)
    },
    [appendMessage],
  )

  const markAsRead = useCallback((caregiverId) => {
    setConversations((current) =>
      current.some((conversation) => conversation.caregiverId === caregiverId && conversation.unread > 0)
        ? current.map((conversation) =>
            conversation.caregiverId === caregiverId ? { ...conversation, unread: 0 } : conversation,
          )
        : current,
    )
  }, [])

  const value = useMemo(() => {
    const sorted = [...conversations].sort((a, b) => lastSentAt(b).localeCompare(lastSentAt(a)))
    const unreadTotal = conversations.reduce((total, conversation) => total + conversation.unread, 0)
    return { conversations: sorted, unreadTotal, sendMessage, markAsRead }
  }, [conversations, sendMessage, markAsRead])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
