import { LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { SupportChat } from '@/features/support/components/SupportChat'

// Sem o balão AssistantGreeting aqui (ocupava espaço demais), a apresentação vai na própria conversa.
const HOME_WELCOME = 'Olá! Eu sou o Antônio. Posso ajudar com agendamentos, chat, planos e o uso do site.'

/** Suporte na tela de início: o chat com o Antônio e o atalho para a página de Suporte. */
export function SupportCard() {
  return (
    <SupportChat
      title="Precisa de ajuda?"
      welcome={HOME_WELCOME}
      className="h-[28rem]"
      footer={
        <Link
          to="/suporte"
          className="flex min-h-11 items-center justify-center gap-2 rounded-full font-extrabold text-[#2d7bbf] transition hover:bg-[#e5f3ff]"
        >
          Ir para a página de suporte
          <LuArrowRight size={17} aria-hidden="true" />
        </Link>
      }
    />
  )
}
