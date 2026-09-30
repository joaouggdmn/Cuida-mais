import { useCallback, useMemo, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { fromISODate, isPastTime } from '@/utils/date'
import { cancelBooking, createBooking, listBookings } from '../services/bookingStorage'

const byDateTime = (a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)

export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState(() => listBookings(user.id))

  const book = useCallback(
    ({ caregiverId, date, time }) => {
      const booking = createBooking({ userId: user.id, caregiverId, date, time })
      setBookings((current) => [...current, booking])
      return booking
    },
    [user.id],
  )

  const cancel = useCallback((bookingId) => {
    cancelBooking(bookingId)
    setBookings((current) => current.filter((booking) => booking.id !== bookingId))
  }, [])

  // Atendimentos que ainda vão acontecer, do mais próximo para o mais distante.
  const upcoming = useMemo(
    () => bookings.filter((booking) => !isPastTime(fromISODate(booking.date), booking.time)).sort(byDateTime),
    [bookings],
  )

  return { bookings, upcoming, book, cancel }
}
