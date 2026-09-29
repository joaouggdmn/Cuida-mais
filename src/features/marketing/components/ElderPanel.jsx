import { LuBellRing, LuCalendarDays, LuCircleCheck, LuMessageCircle, LuUserRound } from 'react-icons/lu'
import { toast } from 'sonner'

export function ElderPanel({ onSeeCaregivers }) {
  const requestQuickHelp = () => {
    toast.success('Pedido de ajuda registrado', {
      description: 'A equipe CUIDA+ foi avisada e entrará em contato.',
    })
  }

  const openChat = () => {
    toast.info('Chat em breve', {
      description: 'A conversa com o cuidador da sua agenda ficará disponível aqui.',
    })
  }

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
      <div className="rounded-[1.8rem] bg-[#123f66] p-8 text-white sm:p-10">
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

      <div className="rounded-[1.8rem] border bg-[#f7fbff] p-8">
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
