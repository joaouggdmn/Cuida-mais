import { NavLink } from 'react-router-dom'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { UnreadBadge } from '@/layouts/app/UnreadBadge'
import { getCaregiver } from '@/mocks/caregivers'
import { formatMessageDate } from '@/utils/date'

export function ConversationList({ conversations }) {
  if (conversations.length === 0) {
    return (
      <p className="p-6 text-center text-[#5b748b]">
        Nenhuma conversa ainda. Abra a agenda e toque em “Conversar” em um cuidador.
      </p>
    )
  }

  return (
    <ul className="divide-y">
      {conversations.map(({ caregiverId, unread, messages }) => {
        const caregiver = getCaregiver(caregiverId)
        const last = messages.at(-1)
        if (!caregiver || !last) return null
        return (
          <li key={caregiverId}>
            <NavLink
              to={`/chat/${caregiverId}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-4 transition sm:px-5 ${isActive ? 'bg-[#e5f3ff]' : 'hover:bg-[#f7fbff]'}`
              }
            >
              <CaregiverAvatar caregiver={caregiver} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-extrabold text-[#173f62]">{caregiver.name}</span>
                  <span className={`shrink-0 text-xs ${unread > 0 ? 'font-extrabold text-[#2d7bbf]' : 'text-[#7190a8]'}`}>
                    {formatMessageDate(last.sentAt)}
                  </span>
                </span>
                <span className="mt-0.5 flex items-center justify-between gap-2">
                  <span className={`truncate text-sm ${unread > 0 ? 'font-bold text-[#245a82]' : 'text-[#5b748b]'}`}>
                    {last.from === 'me' ? 'Você: ' : ''}
                    {last.text}
                  </span>
                  <UnreadBadge count={unread} className="shrink-0" />
                </span>
              </span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
