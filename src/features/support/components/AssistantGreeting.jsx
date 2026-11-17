import { ASSISTANT } from '../assistant'

/**
 * Balão de apresentação do Antônio, fixo acima do card do chat. É só parte do design:
 * fica fora da conversa e não muda com as mensagens. `className` define a distância até o card.
 */
export function AssistantGreeting({ className = '' }) {
  return (
    <div className={`flex items-end gap-4 ${className}`}>
      <img
        src={ASSISTANT.photo}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full object-cover shadow-[0_6px_18px_rgba(24,57,90,0.18)] ring-4 ring-white"
      />
      <p className="relative min-w-0 max-w-xl flex-1 rounded-2xl bg-[#e5f3ff] px-4 py-3 leading-relaxed text-[#173f62] sm:px-5">
        <span aria-hidden="true" className="absolute -left-1.5 bottom-6 h-3 w-3 rotate-45 bg-[#e5f3ff]" />
        <span className="relative">
          <strong className="font-extrabold">Olá! Eu sou o {ASSISTANT.name},</strong> seu assistente virtual. Estou aqui
          para tirar suas dúvidas. Como posso te ajudar?
        </span>
      </p>
    </div>
  )
}
