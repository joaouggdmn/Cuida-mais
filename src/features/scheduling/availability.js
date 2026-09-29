import { isPastTime, toISODate } from '@/utils/date'

/** Horários livres do cuidador no dia: os da semana, menos os já agendados e os que já passaram. */
export function getAvailableSlots(caregiver, date, bookings) {
  const isoDate = toISODate(date)
  const taken = new Set(
    bookings
      .filter((booking) => booking.caregiverId === caregiver.id && booking.date === isoDate)
      .map((booking) => booking.time),
  )
  const slots = caregiver.availability[date.getDay()] ?? []
  return slots.filter((time) => !taken.has(time) && !isPastTime(date, time))
}
