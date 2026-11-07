import { useEffect, useRef, useState } from 'react'
import { LuArrowDown, LuBot, LuRotateCcw, LuSend } from 'react-icons/lu'
import { formatTime } from '@/utils/date'
import { SUPPORT_FAQ } from '../content'
import { useSupportChat } from '../hooks/useSupportChat'
import { ContactButtons } from './ContactButtons'

const MAX_LENGTH = 800
const DEFAULT_SUGGESTIONS = SUPPORT_FAQ.slice(0, 3).map(({ question }) => question)
const DEFAULT_WELCOME =
  'Olá! Sou o assistente virtual do CUIDA+. Posso ajudar com agendamentos, chat, planos e o uso do site. Como posso ajudar?'

/**
 * Chat com o assistente virtual (IA) do suporte. Funciona com ou sem login.
 * `className` define a altura. `humanContactHref` troca os botões de telefone/WhatsApp
 * da caixa de erro por um link para o atendimento humano (ex.: "#contato" na landing).
 * `footer` aparece abaixo do campo de mensagem (ex.: link para a página de Suporte).
 */
export function SupportChat({
  title = 'Tire sua dúvida agora',
  welcome = DEFAULT_WELCOME,
  suggestions = DEFAULT_SUGGESTIONS,
  humanContactHref,
  footer,
  className = 'h-[34rem]',
}) {
  const { messages, sending, error, canRetry, send, retry, reset } = useSupportChat()
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    // Conversa vazia mostra a saudação do topo; com mensagens, acompanha a última.
    if (list) list.scrollTop = messages.length === 0 && !error ? 0 : list.scrollHeight
  }, [messages.length, sending, error])

  const submit = (event) => {
    event.preventDefault()
    if (!draft.trim() || sending) return
    send(draft)
    setDraft('')
  }

  const ask = (question) => {
    send(question)
    inputRef.current?.focus()
  }

  const startOver = () => {
    reset()
    setDraft('')
    inputRef.current?.focus()
  }

  return (
    <section
      aria-labelledby="assistente-virtual"
      className={`flex max-h-[calc(100dvh-9rem)] min-h-[26rem] flex-col overflow-hidden rounded-[1.6rem] border bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)] ${className}`}
    >
      <header className="flex items-center gap-3 border-b px-4 py-4 sm:px-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
          <LuBot size={24} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="section-kicker">ASSISTENTE VIRTUAL</p>
          <h2 id="assistente-virtual" className="font-display mt-1 text-xl font-semibold text-[#12395a] sm:text-2xl">
            {title}
          </h2>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={startOver}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border bg-white px-4 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
          >
            <LuRotateCcw size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Nova conversa</span>
            <span className="sr-only sm:hidden">Começar uma nova conversa</span>
          </button>
        )}
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fbfdff] px-4 py-5 sm:px-6" aria-live="polite">
        {messages.length === 0 && (
          <div className="flex flex-col items-start">
            <p className="max-w-[85%] rounded-2xl rounded-bl-md border bg-white px-4 py-2.5 leading-relaxed text-[#34566f] sm:max-w-[70%]">
              {welcome}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="min-h-11 rounded-full border border-[#b9d9f3] bg-white px-4 py-2 text-left text-sm font-bold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const mine = message.from === 'me'
          return (
            <div key={message.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
              <p
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 leading-relaxed sm:max-w-[70%] ${
                  mine ? 'rounded-br-md bg-[#dff1ff] text-[#173f62]' : 'rounded-bl-md border bg-white text-[#34566f]'
                }`}
              >
                {message.text}
              </p>
              <span className="mt-1 px-1 text-xs text-[#7190a8]">
                {mine ? '' : 'Assistente · '}
                {formatTime(message.sentAt)}
              </span>
            </div>
          )
        })}

        {sending && (
          <div className="flex items-start">
            <p className="rounded-2xl rounded-bl-md border bg-white px-4 py-2.5 text-[#5b748b]">
              <span className="animate-pulse">Digitando…</span>
            </p>
          </div>
        )}

        {!error && canRetry && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm text-[#5b748b]">
            Esta pergunta ficou sem resposta.
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
            >
              <LuRotateCcw size={16} aria-hidden="true" />
              Tentar de novo
            </button>
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-2xl border border-[#f3d9b9] bg-[#fff8ef] p-4">
            <p className="font-bold text-[#7a4b12]">{error.message}</p>
            <p className="mt-1 text-sm text-[#8a6234]">Se preferir, fale com uma pessoa da equipe CUIDA+.</p>
            {canRetry && (
              <button
                type="button"
                onClick={retry}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border bg-white px-4 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
              >
                <LuRotateCcw size={16} aria-hidden="true" />
                Tentar de novo
              </button>
            )}
            {humanContactHref ? (
              <a
                href={humanContactHref}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#123f66] px-5 text-sm font-extrabold text-white transition hover:bg-[#0f3454]"
              >
                Falar com uma pessoa da equipe
                <LuArrowDown size={16} aria-hidden="true" />
              </a>
            ) : (
              <ContactButtons className="mt-3" />
            )}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t bg-white p-3 sm:p-4">
        <label className="sr-only" htmlFor="support-draft">
          Escreva sua dúvida para o assistente virtual
        </label>
        <input
          ref={inputRef}
          id="support-draft"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Escreva sua dúvida..."
          autoComplete="off"
          maxLength={MAX_LENGTH}
          className="min-h-12 min-w-0 flex-1 rounded-full border bg-[#f7fbff] px-5 text-base outline-none focus:border-[#2d7bbf] focus:ring-2 focus:ring-[#b9d9f3]"
        />
        <button
          type="submit"
          aria-label="Enviar dúvida"
          disabled={sending || !draft.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2d7bbf] text-white transition hover:bg-[#236596] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuSend size={18} aria-hidden="true" />
        </button>
      </form>

      {footer && <div className="border-t bg-white px-4 py-3 sm:px-6">{footer}</div>}
    </section>
  )
}
