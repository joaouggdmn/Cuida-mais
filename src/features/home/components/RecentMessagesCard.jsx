import { LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { useChat } from '@/features/chat/hooks/useChat'
import { UnreadBadge } from '@/layouts/app/UnreadBadge'
import { getCaregiver } from '@/mocks/caregivers'
import { formatMessageDate } from '@/utils/date'

const MAX_ITEMS = 3

export function RecentMessagesCard() {
  const { conversations, unreadTotal } = useChat()
  const recent = conversations.filter(({ messages }) => messages.length > 0).slice(0, MAX_ITEMS)

  return (
    <Card aria-labelledby="ultimas-mensagens" className="flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">CHAT</p>
          <h2 id="ultimas-mensagens" className="font-display mt-2 text-2xl font-semibold text-[#12395a]">
            Últimas mensagens
          </h2>
        </div>
        {unreadTotal > 0 && (
          <span className="rounded-full bg-[#e5f3ff] px-3 py-1 text-sm font-bold text-[#1f5e8d]">
            {unreadTotal} nova{unreadTotal > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {recent.length === 0 ? (
        <p className="mt-5 text-[#5b748b]">Nenhuma conversa ainda.</p>
      ) : (
        <ul className="-mx-3 mt-4 space-y-1">
          {recent.map(({ caregiverId, unread, messages }) => {
            const caregiver = getCaregiver(caregiverId)
            const last = messages.at(-1)
            if (!caregiver) return null
            return (
              <li key={caregiverId}>
                <Link
                  to={`/chat/${caregiverId}`}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[#f7fbff]"
                >
                  <CaregiverAvatar caregiver={caregiver} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-extrabold text-[#173f62]">{caregiver.name}</span>
                      <span className="shrink-0 text-xs text-[#7190a8]">{formatMessageDate(last.sentAt)}</span>
                    </span>
                    <span className={`block truncate text-sm ${unread > 0 ? 'font-bold text-[#245a82]' : 'text-[#5b748b]'}`}>
                      {last.from === 'me' ? 'Você: ' : ''}
                      {last.text}
                    </span>
                  </span>
                  <UnreadBadge count={unread} className="shrink-0" />
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <Link
        to="/chat"
        className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline"
      >
        Ver todas as conversas
        <LuArrowRight size={17} aria-hidden="true" />
      </Link>
    </Card>
  )
}
