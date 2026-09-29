import { useState } from 'react'
import { LuMessageCircle, LuSend } from 'react-icons/lu'
import { CAREGIVER_AUTO_REPLY, INITIAL_CHAT_MESSAGES } from '../content'

export function CaregiverChat() {
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES)
  const [draft, setDraft] = useState('')

  const sendMessage = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setMessages((current) => [...current, { from: 'family', text }])
    setDraft('')
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'caregiver', text: CAREGIVER_AUTO_REPLY }])
    }, 500)
  }

  return (
    <div className="rounded-[1.6rem] border bg-[#123f66] p-6 text-white xl:col-span-3">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-[230px]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#b9d9f3]">
              <LuMessageCircle size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="section-kicker">CHAT COM O CUIDADOR</p>
              <h3 className="font-display mt-2 text-2xl font-semibold">Converse antes de agendar.</h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#d7e7f5]">
            Tire dúvidas e combine os detalhes do cuidado com segurança.
          </p>
        </div>

        <div className="flex-1 rounded-2xl bg-white p-4 text-[#183f61]">
          <div className="max-h-44 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`flex ${message.from === 'family' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.from === 'family'
                      ? 'rounded-br-md bg-[#dff1ff] text-[#173f62]'
                      : 'rounded-bl-md bg-[#f1f7fc] text-[#4d6980]'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-2 border-t pt-3">
            <label className="sr-only" htmlFor="chat-message">
              Escreva uma mensagem
            </label>
            <input
              id="chat-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escreva uma mensagem..."
              className="min-w-0 flex-1 rounded-full border bg-[#f7fbff] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#b9d9f3]"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2d7bbf] text-white transition hover:bg-[#236596]"
            >
              <LuSend size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
