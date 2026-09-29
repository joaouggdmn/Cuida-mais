import { LuArrowRight, LuCalendarDays } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { getAvailableSlots } from '@/features/scheduling/availability'
import { CAREGIVERS } from '@/mocks/caregivers'

const MAX_CAREGIVERS = 3
const MAX_SLOTS = 3

export function AvailableTodayCard({ bookings }) {
  const today = new Date()
  const available = CAREGIVERS.map((caregiver) => ({ caregiver, slots: getAvailableSlots(caregiver, today, bookings) }))
    .filter(({ slots }) => slots.length > 0)
    .slice(0, MAX_CAREGIVERS)

  return (
    <Card aria-labelledby="disponiveis-hoje">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">AGENDA</p>
          <h2 id="disponiveis-hoje" className="font-display mt-2 text-2xl font-semibold text-[#12395a]">
            Disponíveis hoje
          </h2>
        </div>
        <Link
          to="/agenda"
          className="inline-flex min-h-11 items-center gap-2 font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline"
        >
          Ver agenda completa
          <LuArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      {available.length === 0 ? (
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#f7fbff] p-5">
          <LuCalendarDays size={26} className="shrink-0 text-[#7190a8]" aria-hidden="true" />
          <p className="text-[#4d6980]">
            Hoje não há mais horários livres. <strong className="text-[#173f62]">Veja os próximos dias na agenda.</strong>
          </p>
        </div>
      ) : (
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {available.map(({ caregiver, slots }) => (
            <li key={caregiver.id}>
              <Link
                to="/agenda"
                className="flex h-full flex-col rounded-2xl border bg-[#f7fbff] p-4 transition hover:border-[#b9d9f3] hover:bg-white hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <CaregiverAvatar caregiver={caregiver} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate font-extrabold text-[#173f62]">{caregiver.name}</span>
                    <span className="block truncate text-sm text-[#5b748b]">
                      ★ {caregiver.rating} · {caregiver.role}
                    </span>
                  </span>
                </span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {slots.slice(0, MAX_SLOTS).map((time) => (
                    <span key={time} className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-[#1f5e8d] ring-1 ring-[#dbe8f5]">
                      {time}
                    </span>
                  ))}
                  {slots.length > MAX_SLOTS && (
                    <span className="px-1 py-1 text-sm font-bold text-[#5b748b]">+{slots.length - MAX_SLOTS}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
