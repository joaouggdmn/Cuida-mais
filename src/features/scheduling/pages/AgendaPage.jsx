import { useMemo, useState } from 'react'
import { LuSearchX } from 'react-icons/lu'
import { toast } from 'sonner'
import { PageHeader } from '@/components/ui/PageHeader'
import { inputClassName } from '@/components/ui/TextField'
import { CAREGIVER_CITIES, CAREGIVERS, getCaregiver } from '@/mocks/caregivers'
import { formatLongDate, formatRelativeDay, fromISODate, getNextDays, toISODate } from '@/utils/date'
import { getAvailableSlots } from '../availability'
import { CaregiverSlotsCard } from '../components/CaregiverSlotsCard'
import { ConfirmBookingDialog } from '../components/ConfirmBookingDialog'
import { DayPicker } from '../components/DayPicker'
import { MyBookings } from '../components/MyBookings'
import { useBookings } from '../hooks/useBookings'

const DAYS_AHEAD = 7

export function AgendaPage() {
  const days = useMemo(() => getNextDays(DAYS_AHEAD), [])
  const { bookings, upcoming, book, cancel } = useBookings()
  // Abre no primeiro dia com alguém livre (à noite, por exemplo, hoje já não tem horários).
  const [dayIndex, setDayIndex] = useState(() =>
    Math.max(
      0,
      days.findIndex((day) => CAREGIVERS.some((caregiver) => getAvailableSlots(caregiver, day, bookings).length > 0)),
    ),
  )
  const [city, setCity] = useState('')
  const [pendingSlot, setPendingSlot] = useState(null)

  const caregivers = city ? CAREGIVERS.filter((caregiver) => caregiver.city === city) : CAREGIVERS

  const availabilityByDay = days.map((day) =>
    caregivers
      .map((caregiver) => ({ caregiver, slots: getAvailableSlots(caregiver, day, bookings) }))
      .filter(({ slots }) => slots.length > 0),
  )
  const selectedDay = days[dayIndex]
  const available = availabilityByDay[dayIndex]

  const confirmBooking = ({ caregiver, date, time }) => {
    book({ caregiverId: caregiver.id, date: toISODate(date), time })
    toast.success('Atendimento agendado', {
      description: `${caregiver.name} · ${formatRelativeDay(date)} às ${time}`,
    })
  }

  const cancelBooking = (booking) => {
    cancel(booking.id)
    toast('Agendamento cancelado', {
      description: `${getCaregiver(booking.caregiverId)?.name} · ${formatRelativeDay(fromISODate(booking.date))} às ${booking.time}`,
    })
  }

  return (
    <>
      <PageHeader
        kicker="AGENDA"
        title="Cuidadores disponíveis"
        description="Escolha o dia e toque em um horário livre para agendar."
      >
        <label className="block text-sm font-extrabold text-[#245a82] sm:w-60">
          Cidade
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={`${inputClassName} mt-2`}
          >
            <option value="">Todas as cidades</option>
            {CAREGIVER_CITIES.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      </PageHeader>

      <div className="mt-8">
        <DayPicker
          days={days}
          selectedIndex={dayIndex}
          onSelect={setDayIndex}
          freeCountByDay={availabilityByDay.map((list) => list.length)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="disponiveis-no-dia">
          <h2 id="disponiveis-no-dia" className="text-lg font-extrabold text-[#173f62]">
            {formatLongDate(selectedDay)}
          </h2>

          {available.length === 0 ? (
            <div className="mt-4 flex flex-col items-center rounded-[1.6rem] border border-dashed bg-white px-6 py-12 text-center">
              <LuSearchX size={32} className="text-[#7190a8]" aria-hidden="true" />
              <p className="font-display mt-4 text-2xl font-semibold text-[#12395a]">Ninguém livre neste dia.</p>
              <p className="mt-2 max-w-sm text-[#5b748b]">
                Tente outro dia{city ? ' ou outra cidade' : ''}. A agenda é atualizada o tempo todo.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {available.map(({ caregiver, slots }) => (
                <CaregiverSlotsCard
                  key={caregiver.id}
                  caregiver={caregiver}
                  slots={slots}
                  onPickSlot={(pickedCaregiver, time) => setPendingSlot({ caregiver: pickedCaregiver, date: selectedDay, time })}
                />
              ))}
            </ul>
          )}
        </section>

        <aside className="xl:sticky xl:top-8">
          <MyBookings bookings={upcoming} onCancel={cancelBooking} />
        </aside>
      </div>

      <ConfirmBookingDialog slot={pendingSlot} onConfirm={confirmBooking} onClose={() => setPendingSlot(null)} />
    </>
  )
}
