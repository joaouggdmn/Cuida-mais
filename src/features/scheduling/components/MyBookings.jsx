import { LuCalendarOff, LuMessageCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { CaregiverAvatar } from '@/features/caregivers/components/CaregiverAvatar'
import { getCaregiver } from '@/mocks/caregivers'
import { formatRelativeDay, fromISODate } from '@/utils/date'

export function MyBookings({ bookings, onCancel }) {
  return (
    <Card aria-labelledby="meus-agendamentos">
      <p className="section-kicker">SEUS CUIDADOS</p>
      <h2 id="meus-agendamentos" className="font-display mt-2 text-2xl font-semibold text-[#12395a]">
        Meus agendamentos
      </h2>

      {bookings.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl bg-[#f7fbff] px-4 py-8 text-center">
          <LuCalendarOff size={28} className="text-[#7190a8]" aria-hidden="true" />
          <p className="mt-3 font-bold text-[#245a82]">Nada marcado ainda.</p>
          <p className="mt-1 text-sm text-[#5b748b]">Toque em um horário livre para agendar.</p>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {bookings.map((booking) => {
            const caregiver = getCaregiver(booking.caregiverId)
            if (!caregiver) return null
            return (
              <li key={booking.id} className="rounded-2xl border bg-[#f7fbff] p-4">
                <div className="flex items-center gap-3">
                  <CaregiverAvatar caregiver={caregiver} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-extrabold text-[#173f62]">{caregiver.name}</p>
                    <p className="text-sm font-bold text-[#1f5e8d]">
                      {formatRelativeDay(fromISODate(booking.date))} · {booking.time}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/chat/${caregiver.id}`}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border bg-white px-3 text-sm font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
                  >
                    <LuMessageCircle size={15} aria-hidden="true" />
                    Conversar
                  </Link>
                  <button
                    type="button"
                    onClick={() => onCancel(booking)}
                    className="min-h-10 flex-1 rounded-full px-3 text-sm font-extrabold text-[#b83c2d] transition hover:bg-[#fdf0ee]"
                  >
                    Cancelar
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
