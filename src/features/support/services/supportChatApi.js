// Fala com a função serverless /api/chat. A chave da IA fica lá, nunca no navegador.

export class SupportChatError extends Error {
  /** @param {'rate_limited' | 'unavailable'} kind */
  constructor(kind, message) {
    super(message)
    this.name = 'SupportChatError'
    this.kind = kind
  }
}

const FALLBACK_MESSAGE = 'O assistente virtual está indisponível no momento.'

/** Envia o histórico (`{ from, text }`) e devolve o texto da resposta do assistente. */
export async function askSupport(messages, role) {
  let response
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.map(({ from, text }) => ({ from, text })), role }),
    })
  } catch {
    throw new SupportChatError('unavailable', 'Sem conexão com o assistente. Verifique sua internet e tente de novo.')
  }

  const data = await response.json().catch(() => null)
  if (response.ok && typeof data?.reply === 'string') return data.reply

  const message = data?.error ?? FALLBACK_MESSAGE
  throw new SupportChatError(response.status === 429 ? 'rate_limited' : 'unavailable', message)
}
