import { useState } from 'react'
import { LuBellRing, LuCalendarDays, LuCircleCheck, LuMessageCircle, LuUserRound } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoginPromptDialog } from './LoginPromptDialog'

const OPEN_CHAT_PROMPT = {
  title: 'Entre para conversar com a cuidadora',
  description:
    'Para falar com a Maria Silva sobre o seu atendimento de hoje, entre na sua conta ou crie uma. Assim a conversa fica guardada com segurança.',
}

export function ElderPanel({ onSeeCaregivers }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loginPrompt, setLoginPrompt] = useState(null)

  const requestQuickHelp = () => {
    toast.success('Pedido de ajuda registrado', {
      description: 'A equipe CUIDA+ foi avisada e entrará em contato.',
    })
  }

  // Quem já entrou vai direto para o chat; visitante recebe o convite para entrar.
  const openChat = () => {
    if (user) navigate('/chat')
    else setLoginPrompt(OPEN_CHAT_PROMPT)
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.75fr]">
      <LoginPromptDialog prompt={loginPrompt} onClose={() => setLoginPrompt(null)} />
      <div className="rounded-[1.8rem] bg-[#123f66] p-6 text-white sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b9d9f3]">
            <LuUserRound size={24} aria-hidden="true" />
          </span>
          <div>
            <p className="section-kicker">ÁREA DO IDOSO</p>
            <h3 className="font-display mt-2 text-3xl font-semibold">Olá, Antônio.</h3>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d7e7f5]">
          Sua rotina, suas escolhas e a ajuda que você quiser — tudo em um só lugar.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onSeeCaregivers}
            className="flex min-h-14 items-center justify-between rounded-2xl bg-white px-5 text-left text-[#123f66] transition hover:bg-[#e5f3ff]"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#5b748b]">
                Próximo cuidado
              </span>
              <span className="mt-1 block">Ver cuidadores</span>
            </span>
            <LuCalendarDays size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={requestQuickHelp}
            className="flex min-h-14 items-center justify-between rounded-2xl bg-[#2d7bbf] px-5 text-left text-white transition hover:bg-[#236596]"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#d7ecff]">
                Precisa agora?
              </span>
              <span className="mt-1 block">Pedir ajuda rápida</span>
            </span>
            <LuBellRing size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="rounded-[1.8rem] border bg-[#f7fbff] p-6 sm:p-8">
        <p className="section-kicker">MINHA AGENDA</p>
        <h3 className="font-display mt-3 text-3xl font-semibold text-[#12395a]">Hoje, 12 de outubro</h3>
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff1ff] font-bold text-[#1f5e8d]">
            MS
          </span>
          <span>
            <span className="block font-extrabold text-[#173f62]">Maria Silva</span>
            <span className="block text-sm text-[#5b748b]">Companhia e passeio · 14h</span>
          </span>
          <LuCircleCheck size={20} className="ml-auto text-[#2d7bbf]" aria-hidden="true" />
        </div>
        <button
          type="button"
          onClick={openChat}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border bg-white px-5 text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
        >
          <LuMessageCircle size={18} aria-hidden="true" />
          Abrir conversa
        </button>
      </div>
    </div>
  )
}
