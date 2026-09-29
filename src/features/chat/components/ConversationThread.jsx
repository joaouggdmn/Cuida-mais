import { useEffect, useRef, useState } from 'react'
import { LuArrowLeft, LuCalendarDays, LuSend } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { formatMessageDate, formatTime } from '@/utils/date'
import { getFirstName } from '@/utils/name'
import { useChat } from '../hooks/useChat'

export function ConversationThread({ caregiver, conversation }) {
  const { sendMessage, markAsRead } = useChat()
  const [draft, setDraft] = useState('')
  const messagesRef = useRef(null)
  const messages = conversation?.messages ?? []
  const unread = conversation?.unread ?? 0

  // Conversa aberta = mensagens lidas, inclusive as que chegam enquanto ela está na tela.
  useEffect(() => {
    if (unread > 0) markAsRead(caregiver.id)
  }, [caregiver.id, unread, markAsRead])

  useEffect(() => {
    const list = messagesRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [caregiver.id, messages.length])

  const submit = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    sendMessage(caregiver.id, text)
    setDraft('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-5">
        <Link
          to="/chat"
          aria-label="Voltar para as conversas"
          className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#1f5e8d] transition hover:bg-[#e5f3ff] lg:hidden"
        >
          <LuArrowLeft size={20} aria-hidden="true" />
        </Link>
        <CaregiverAvatar caregiver={caregiver} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-extrabold text-[#173f62]">{caregiver.name}</h2>
          <p className="truncate text-sm text-[#5b748b]">{caregiver.role}</p>
        </div>
        <Link
          to="/agenda"
          aria-label="Ver agenda"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border bg-white px-4 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
        >
          <LuCalendarDays size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Ver agenda</span>
        </Link>
      </header>

      <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fbfdff] px-4 py-5 sm:px-6" aria-live="polite">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <CaregiverAvatar caregiver={caregiver} size="lg" />
            <p className="font-display mt-4 text-2xl font-semibold text-[#12395a]">
              Diga olá para {getFirstName(caregiver.name)}.
            </p>
            <p className="mt-2 max-w-xs text-[#5b748b]">Tire dúvidas e combine os detalhes do cuidado com segurança.</p>
          </div>
        ) : (
          messages.map((message) => {
            const mine = message.from === 'me'
            return (
              <div key={message.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed sm:max-w-[70%] ${
                    mine ? 'rounded-br-md bg-[#dff1ff] text-[#173f62]' : 'rounded-bl-md border bg-white text-[#34566f]'
                  }`}
                >
                  {message.text}
                </p>
                <span className="mt-1 px-1 text-xs text-[#7190a8]">
                  {formatMessageDate(message.sentAt) === formatTime(message.sentAt)
                    ? formatTime(message.sentAt)
                    : `${formatMessageDate(message.sentAt)}, ${formatTime(message.sentAt)}`}
                </span>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t bg-white p-3 sm:p-4">
        <label className="sr-only" htmlFor="chat-draft">
          Escreva uma mensagem para {caregiver.name}
        </label>
        <input
          id="chat-draft"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Escreva uma mensagem..."
          autoComplete="off"
          className="min-h-12 min-w-0 flex-1 rounded-full border bg-[#f7fbff] px-5 text-base outline-none focus:border-[#2d7bbf] focus:ring-2 focus:ring-[#b9d9f3]"
        />
        <button
          type="submit"
          aria-label="Enviar mensagem"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2d7bbf] text-white transition hover:bg-[#236596] active:scale-[0.96]"
        >
          <LuSend size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
