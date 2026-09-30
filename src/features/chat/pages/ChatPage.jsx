import { LuMessageSquareText } from 'react-icons/lu'
import { Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { getCaregiver } from '@/mocks/caregivers'
import { ConversationList } from '../components/ConversationList'
import { ConversationThread } from '../components/ConversationThread'
import { useChat } from '../hooks/useChat'

export function ChatPage() {
  const { caregiverId } = useParams()
  const { conversations } = useChat()
  const caregiver = caregiverId ? getCaregiver(caregiverId) : null

  if (caregiverId && !caregiver) return <Navigate to="/chat" replace />

  const conversation = conversations.find((item) => item.caregiverId === caregiverId)

  return (
    <>
      {/* No celular, a conversa aberta ocupa a tela toda; o título só aparece na lista. */}
      <div className={caregiver ? 'hidden lg:block' : undefined}>
        <PageHeader kicker="CHAT" title="Conversas" description="Fale com os cuidadores antes e depois de cada atendimento." />
      </div>

      {/* Alturas descontam a barra do topo, a barra inferior e o respiro do layout (no desktop, o cabeçalho). */}
      <div
        className={`overflow-hidden rounded-[1.6rem] border bg-white shadow-[0_9px_30px_rgba(24,57,90,0.06)] lg:mt-8 lg:grid lg:h-[calc(100dvh-17.5rem)] lg:min-h-[30rem] lg:grid-cols-[320px_1fr] ${
          caregiver ? 'h-[calc(100dvh-12rem)] min-h-[24rem] sm:h-[calc(100dvh-13rem)]' : 'mt-6'
        }`}
      >
        <div className={`lg:h-full lg:overflow-y-auto lg:border-r ${caregiver ? 'hidden lg:block' : ''}`}>
          <ConversationList conversations={conversations} />
        </div>

        <div className={`h-full min-h-0 ${caregiver ? '' : 'hidden lg:block'}`}>
          {caregiver ? (
            <ConversationThread key={caregiver.id} caregiver={caregiver} conversation={conversation} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f3ff] text-[#1f5e8d]">
                <LuMessageSquareText size={28} aria-hidden="true" />
              </span>
              <p className="font-display mt-4 text-2xl font-semibold text-[#12395a]">Escolha uma conversa</p>
              <p className="mt-2 max-w-xs text-[#5b748b]">As mensagens com os cuidadores aparecem aqui.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
