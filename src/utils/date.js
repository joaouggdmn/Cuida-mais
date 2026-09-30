const weekdayFormat = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
const dayMonthFormat = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' })
const shortMonthFormat = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
const longDateFormat = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
const monthYearFormat = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
const timeFormat = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })

const stripDot = (text) => text.replace('.', '')

/** Data local no formato AAAA-MM-DD (sem converter para UTC). */
export function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function fromISODate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(date, amount) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  next.setDate(next.getDate() + amount)
  return next
}

/** Hoje e os próximos dias, à meia-noite. */
export function getNextDays(count, from = new Date()) {
  return Array.from({ length: count }, (_, index) => addDays(from, index))
}

export function isSameDay(a, b) {
  return toISODate(a) === toISODate(b)
}

/** "seg", "ter"... */
export function formatWeekday(date) {
  return stripDot(weekdayFormat.format(date))
}

/** "30 de set" */
export function formatDayMonth(date) {
  return stripDot(dayMonthFormat.format(date))
}

/** "set" */
export function formatShortMonth(date) {
  return stripDot(shortMonthFormat.format(date))
}

/** "Terça-feira, 29 de setembro" */
export function formatLongDate(date) {
  const text = longDateFormat.format(date)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** "setembro de 2026" */
export function formatMonthYear(date) {
  return monthYearFormat.format(date)
}

/** "Hoje", "Amanhã" ou "qua, 1 de out". */
export function formatRelativeDay(date) {
  const today = new Date()
  if (isSameDay(date, today)) return 'Hoje'
  if (isSameDay(date, addDays(today, 1))) return 'Amanhã'
  return `${formatWeekday(date)}, ${formatDayMonth(date)}`
}

/** Horário (HH:MM) de uma data ISO completa. */
export function formatTime(isoDateTime) {
  return timeFormat.format(new Date(isoDateTime))
}

/** Rótulo curto para a última mensagem de uma conversa: "14:32", "Ontem" ou "27 de set". */
export function formatMessageDate(isoDateTime) {
  const date = new Date(isoDateTime)
  const today = new Date()
  if (isSameDay(date, today)) return formatTime(isoDateTime)
  if (isSameDay(date, addDays(today, -1))) return 'Ontem'
  return formatDayMonth(date)
}

/** Se o horário "HH:MM" daquele dia já passou. */
export function isPastTime(date, time) {
  const [hours, minutes] = time.split(':').map(Number)
  const moment = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  return moment <= new Date()
}
