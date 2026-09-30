import { getCollection, setCollection } from '@/lib/storage/storage'

const BOOKINGS = 'bookings'

export function listBookings(userId) {
  return getCollection(BOOKINGS).filter((booking) => booking.userId === userId)
}

export function createBooking({ userId, caregiverId, date, time }) {
  const booking = {
    id: window.crypto.randomUUID(),
    userId,
    caregiverId,
    date,
    time,
    createdAt: new Date().toISOString(),
  }
  setCollection(BOOKINGS, [...getCollection(BOOKINGS), booking])
  return booking
}

export function cancelBooking(bookingId) {
  setCollection(
    BOOKINGS,
    getCollection(BOOKINGS).filter((booking) => booking.id !== bookingId),
  )
}
