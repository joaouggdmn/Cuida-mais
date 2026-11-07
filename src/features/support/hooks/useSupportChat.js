import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { askSupport } from '../services/supportChatApi'
import { clearSupportMessages, loadSupportMessages, saveSupportMessages } from '../services/supportChatStorage'

// Sem login (landing page), a conversa fica salva como visitante.
const GUEST_ID = 'guest'
const GUEST_ROLE = 'visitor'

function newMessage(from, text) {
  return { id: window.crypto.randomUUID(), from, text, sentAt: new Date().toISOString() }
}

/** Conversa com o assistente virtual do suporte, salva no localStorage por usuário (ou como visitante). */
export function useSupportChat() {
  const { user } = useAuth()
  const storageId = user?.id ?? GUEST_ID
  const role = user?.role ?? GUEST_ROLE

  const [loadedFor, setLoadedFor] = useState(storageId)
  const [messages, setMessages] = useState(() => loadSupportMessages(storageId))
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  // Identifica o pedido atual: respostas que chegam depois de "Nova conversa" (ou de trocar de conta) são ignoradas.
  const requestId = useRef(0)

  // Entrou ou saiu da conta com o chat na tela: carrega a conversa da nova pessoa.
  if (loadedFor !== storageId) {
    setLoadedFor(storageId)
    setMessages(loadSupportMessages(storageId))
    setSending(false)
    setError(null)
  }

  useEffect(() => {
    saveSupportMessages(storageId, messages)
  }, [storageId, messages])

  useEffect(
    () => () => {
      requestId.current += 1
    },
    [storageId],
  )

  const request = useCallback(
    async (history) => {
      const id = ++requestId.current
      setSending(true)
      setError(null)
      try {
        const reply = await askSupport(history, role)
        if (id === requestId.current) setMessages((current) => [...current, newMessage('assistant', reply)])
      } catch (err) {
        if (id === requestId.current) setError({ kind: err.kind ?? 'unavailable', message: err.message })
      } finally {
        if (id === requestId.current) setSending(false)
      }
    },
    [role],
  )

  const send = useCallback(
    (text) => {
      const trimmed = text.trim()
      if (!trimmed || sending) return
      const history = [...messages, newMessage('me', trimmed)]
      setMessages(history)
      request(history)
    },
    [messages, sending, request],
  )

  /** Tenta de novo a última pergunta que ficou sem resposta. */
  const retry = useCallback(() => {
    if (!sending && messages.at(-1)?.from === 'me') request(messages)
  }, [messages, sending, request])

  const reset = useCallback(() => {
    requestId.current += 1
    clearSupportMessages(storageId)
    setMessages([])
    setSending(false)
    setError(null)
  }, [storageId])

  // Última pergunta sem resposta (erro agora ou numa visita anterior): dá para reenviar.
  const canRetry = !sending && messages.at(-1)?.from === 'me'

  return { messages, sending, error, canRetry, send, retry, reset }
}
