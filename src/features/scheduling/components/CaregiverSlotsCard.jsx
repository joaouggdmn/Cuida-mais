import { LuMessageCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'

export function CaregiverSlotsCard({ caregiver, slots, onPickSlot }) {
  return (
    <Card as="li" className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <CaregiverAvatar caregiver={caregiver} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#173f62]">{caregiver.name}</h3>
          <p className="text-sm text-[#5b748b]">
            {caregiver.role} · {caregiver.city}
          </p>
          <p className="mt-1 text-sm font-bold text-[#1f5e8d]">
            ★ {caregiver.rating} <span className="font-medium text-[#5b748b]">({caregiver.reviews} avaliações)</span>
          </p>
        </div>
        <Link
          to={`/chat/${caregiver.id}`}
          aria-label={`Conversar com ${caregiver.name}`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border bg-white px-4 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
        >
          <LuMessageCircle size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Conversar</span>
        </Link>
      </div>

      <p className="mt-4 leading-relaxed text-[#4d6980]">{caregiver.bio}</p>

      <div className="mt-5 border-t pt-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#5b748b]">Horários livres</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {slots.map((time) => (
            <li key={time}>
              <button
                type="button"
                onClick={() => onPickSlot(caregiver, time)}
                aria-label={`Agendar com ${caregiver.name} às ${time}`}
                className="min-h-11 rounded-full border border-[#b9d9f3] bg-[#f7fbff] px-5 text-base font-extrabold text-[#1f5e8d] transition hover:border-[#2d7bbf] hover:bg-[#2d7bbf] hover:text-white active:scale-[0.97]"
              >
                {time}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
